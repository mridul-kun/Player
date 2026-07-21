// ============================================================================
// PARTICLE TEXT ANIMATION  
// ============================================================================

const ParticleMessage = (() => {

  // ── tunables ──────────────────────────────────────────────────────────────
  const CFG = {
    numParticles : 320000,   // particle count — 320 k gives dense "millions" look

    gatherMs     : 1000,     // ms: random scatter  →  forms the typed text
    holdMs       :  350,     // ms: text stays fully formed
    dissolveMs   :  500,     // ms: text explodes outward and fades to nothing

    bgAlpha      : 210,      // opacity of the black overlay  (0 – 255)

    // Player AI purple / blue / pink palette
    palette : [
      [123, 104, 238],   // #7b68ee  — accent purple
      [192, 132, 252],   // #c084fc
      [ 96, 165, 250],   // #60a5fa  — blue
      [167, 139, 250],   // #a78bfa
      [232, 121, 249],   // #e879f9
      [ 56, 189, 248],   // #38bdf8
      [255, 180, 230],   // soft pink
      [200, 220, 255],   // sky white
    ],
  };

  let _canvas = null;
  let _raf    = null;

  // easing helpers
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const easeInQuad   = t => t * t;
  const easeOutExpo  = t => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

  // Render text to an offscreen canvas and collect every lit pixel coordinate.
  // Returns a flat Float32Array: [x0,y0, x1,y1, …]
  function _sampleText(text, cw, ch) {
    const off = document.createElement('canvas');
    off.width  = cw;
    off.height = ch;
    const c = off.getContext('2d');

    let fs = Math.min(68, (cw * 0.85) / Math.max(text.length * 0.55, 1));
    fs = Math.max(fs, 16);
    c.font         = `700 ${fs}px 'Segoe UI', system-ui, sans-serif`;
    c.fillStyle    = '#ffffff';
    c.textAlign    = 'center';
    c.textBaseline = 'middle';

    // word-wrap long messages
    const maxW = cw * 0.88;
    const words = text.split(' ');
    const lines = [];
    let cur = '';
    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w;
      if (c.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; }
      else cur = test;
    }
    if (cur) lines.push(cur);

    const lineH  = fs * 1.35;
    const totalH = lines.length * lineH;
    lines.forEach((ln, i) =>
      c.fillText(ln, cw / 2, ch / 2 - totalH / 2 + lineH * (i + 0.5))
    );

    const img  = c.getImageData(0, 0, cw, ch);
    const tmp  = [];
    const step = 2;   // sample every 2 px
    for (let y = 0; y < ch; y += step)
      for (let x = 0; x < cw; x += step)
        if (img.data[(y * cw + x) * 4 + 3] > 90) { tmp.push(x); tmp.push(y); }

    return new Float32Array(tmp);
  }

  // ── main API ─────────────────────────────────────────────────────────────
  function play(text) {
    return new Promise(resolve => {

      const W = window.innerWidth;
      const H = window.innerHeight;

      // full-screen blocking overlay
      _canvas = document.createElement('canvas');
      _canvas.width  = W;
      _canvas.height = H;
      _canvas.style.cssText =
        'position:fixed;inset:0;z-index:999999;pointer-events:all;cursor:default;';
      document.body.appendChild(_canvas);

      const ctx = _canvas.getContext('2d', { alpha: false });

      // centre the text area inside the viewport
      const tW    = Math.min(W * 0.82, 900);
      const tH    = Math.min(H * 0.48, 260);
      const offX  = (W - tW) / 2;
      const offY  = (H - tH) / 2;

      const relPts  = _sampleText(text, tW, tH);
      const ptCount = relPts.length / 2;

      if (ptCount === 0) { _cleanup(); resolve(); return; }

      const N = CFG.numParticles;

      // typed arrays — one slot per particle (cache-friendly)
      const SX  = new Float32Array(N);   // initial (scatter) x
      const SY  = new Float32Array(N);   // initial (scatter) y
      const TX  = new Float32Array(N);   // text-target x
      const TY  = new Float32Array(N);   // text-target y
      const EX  = new Float32Array(N);   // dissolve-end x
      const EY  = new Float32Array(N);   // dissolve-end y
      const SPD = new Float32Array(N);   // individual speed factor (0.55–1.0)
      const DEL = new Float32Array(N);   // individual delay factor (0.0–0.35)
      const CR  = new Uint8Array(N);
      const CG  = new Uint8Array(N);
      const CB  = new Uint8Array(N);

      const cx = W / 2;
      const cy = H / 2;
      const pal = CFG.palette;

      for (let i = 0; i < N; i++) {
        // scatter start — random position all around the screen
        const a1 = Math.random() * Math.PI * 2;
        const d1 = 40 + Math.random() * Math.max(W, H) * 0.8;
        SX[i] = cx + Math.cos(a1) * d1;
        SY[i] = cy + Math.sin(a1) * d1;

        // text target — cycle through sampled pixels + tiny jitter
        const pi  = (i % ptCount) * 2;
        TX[i] = relPts[pi]     + offX + (Math.random() - 0.5) * 1.5;
        TY[i] = relPts[pi + 1] + offY + (Math.random() - 0.5) * 1.5;

        // dissolve end — scatter in a fresh random direction
        const a2 = Math.random() * Math.PI * 2;
        const d2 = 120 + Math.random() * Math.max(W, H) * 1.15;
        EX[i] = cx + Math.cos(a2) * d2;
        EY[i] = cy + Math.sin(a2) * d2;

        SPD[i] = 0.55 + Math.random() * 0.45;
        DEL[i] = Math.random() * 0.35;

        // colour: palette colour + slight brightness variation for depth
        const col = pal[i % pal.length];
        const bv  = 0.8 + Math.random() * 0.2;
        CR[i] = Math.min(255, (col[0] * bv) | 0);
        CG[i] = Math.min(255, (col[1] * bv) | 0);
        CB[i] = Math.min(255, (col[2] * bv) | 0);
      }

      // pixel buffer (putImageData is ~100× faster than N arc() calls)
      const imgData = ctx.createImageData(W, H);
      const D       = imgData.data;

      const GATHER   = CFG.gatherMs;
      const HOLD     = CFG.holdMs;
      const DISSOLVE = CFG.dissolveMs;
      const TOTAL    = GATHER + HOLD + DISSOLVE;
      const t0       = performance.now();

      function frame() {
        const elapsed = performance.now() - t0;

        let phase, phaseT;
        if      (elapsed < GATHER)             { phase = 0; phaseT = elapsed / GATHER; }
        else if (elapsed < GATHER + HOLD)       { phase = 1; phaseT = (elapsed - GATHER) / HOLD; }
        else                                   { phase = 2; phaseT = Math.min((elapsed - GATHER - HOLD) / DISSOLVE, 1); }

        // fade-in the black background overlay
        const bgA = Math.min(CFG.bgAlpha,
          (CFG.bgAlpha * easeOutExpo(Math.min(elapsed / 380, 1))) | 0);

        // fill background to black
        for (let j = 0; j < D.length; j += 4) {
          D[j] = D[j + 1] = D[j + 2] = 0;
          D[j + 3] = bgA;
        }

        // paint every particle
        for (let i = 0; i < N; i++) {
          let px, py, alpha;

          if (phase === 0) {
            // ── GATHER ──  particles fly in from the edges, staggered
            const raw = Math.max(0, (phaseT - DEL[i]) / (1.0 - DEL[i]));
            const t   = easeOutCubic(Math.min(raw * SPD[i] + (1 - SPD[i]) * 0.5, 1));
            px    = SX[i] + (TX[i] - SX[i]) * t;
            py    = SY[i] + (TY[i] - SY[i]) * t;
            alpha = (t * 255) | 0;

          } else if (phase === 1) {
            // ── HOLD ──  micro-jitter keeps the cloud feeling "alive"
            const jit = Math.sin(elapsed * 0.022 + i * 0.0031) * 0.55;
            px    = TX[i] + jit;
            py    = TY[i] + jit;
            alpha = 255;

          } else {
            // ── DISSOLVE ──  particles explode outward and vanish
            const t = easeInQuad(phaseT);
            px    = TX[i] + (EX[i] - TX[i]) * t;
            py    = TY[i] + (EY[i] - TY[i]) * t;
            alpha = ((1 - t) * 255) | 0;
          }

          if (alpha <= 0) continue;

          const ix = px | 0;
          const iy = py | 0;
          if (ix < 0 || ix >= W - 1 || iy < 0 || iy >= H) continue;

          // ADDITIVE blending: overlapping particles bloom into a bright glow
          const idx = (iy * W + ix) * 4;
          D[idx]     = Math.min(255, D[idx]     + ((CR[i] * alpha) >> 8));
          D[idx + 1] = Math.min(255, D[idx + 1] + ((CG[i] * alpha) >> 8));
          D[idx + 2] = Math.min(255, D[idx + 2] + ((CB[i] * alpha) >> 8));
          D[idx + 3] = Math.max(D[idx + 3], bgA);

          // every 4th particle also fills the right-neighbour pixel → extra density
          if ((i & 3) === 0) {
            const idx2 = idx + 4;
            D[idx2]     = Math.min(255, D[idx2]     + ((CR[i] * alpha) >> 9));
            D[idx2 + 1] = Math.min(255, D[idx2 + 1] + ((CG[i] * alpha) >> 9));
            D[idx2 + 2] = Math.min(255, D[idx2 + 2] + ((CB[i] * alpha) >> 9));
            D[idx2 + 3] = Math.max(D[idx2 + 3], bgA);
          }
        }

        ctx.putImageData(imgData, 0, 0);

        if (elapsed >= TOTAL) { _cleanup(); resolve(); return; }

        _raf = requestAnimationFrame(frame);
      }

      _raf = requestAnimationFrame(frame);
    });
  }

  function _cleanup() {
    if (_raf)    { cancelAnimationFrame(_raf); _raf = null; }
    if (_canvas) { _canvas.remove(); _canvas = null; }
  }

  function cancel() { _cleanup(); }

  return { play, cancel };

})();


// ============================================================================
// AUTO-PATCH: wraps App.execute() with the animation.
// Retries every 150 ms until App is ready (it loads after the startup anim).
// ============================================================================
(function patchAppExecute() {

  function tryPatch() {
    if (typeof App === 'undefined' || typeof App.execute !== 'function') {
      setTimeout(tryPatch, 150);
      return;
    }

    // ── wrap App.execute ──────────────────────────────────────────────────
    const _origExec = App.execute.bind(App);

    App.execute = async function () {
      const inp  = document.getElementById('cmd-input');
      if (!inp)              { _origExec(); return; }

      const text = inp.value.trim();
      if (!text)             { _origExec(); return; }

      inp.value = '';                         // clear input immediately

      await ParticleMessage.play(text);       // ← THE ANIMATION

      inp.value = text;                       // restore so _origExec can read it
      _origExec();
    };

    // ── re-wire the Enter key handler ────────────────────────────────────
    // Clone the input element to strip ALL existing keydown listeners,
    // then add a single clean one that calls our patched App.execute().
    const inp = document.getElementById('cmd-input');
    if (inp) {
      const clone = inp.cloneNode(true);
      inp.parentNode.replaceChild(clone, inp);
      clone.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (App && App.execute) App.execute();
        }
      });
    }

    console.log('[ParticleMessage] ✓  App.execute() patched — animation active');
  }

  // start patching after DOM + App.init() have had time to run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(tryPatch, 1200));
  } else {
    setTimeout(tryPatch, 1200);
  }

})();