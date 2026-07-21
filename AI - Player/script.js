// ============================================================================
// CONSTANTS & DATA
// ============================================================================

const FACE_PARTS = [
  { key: "face_shape", icon: "🔷", label: "Face Shape", field: "face_shape" },
  { key: "skin", icon: "🧴", label: "Skin", field: "skin_tone" },
  { key: "jawline", icon: "🦷", label: "Jawline", field: "jawline_shape" },
  { key: "eyes", icon: "👁", label: "Eyes", field: "eye_structure" },
  { key: "nose", icon: "👃", label: "Nose", field: "nose_structure" },
  { key: "hair", icon: "💈", label: "Hair", field: "hair_type" },
  { key: "eyebrows", icon: "〰", label: "Eyebrows", field: "eyebrow_shape" },
  { key: "eyelashes", icon: "✨", label: "Eyelashes", field: "eyelash_density" },
  { key: "chin", icon: "🫦", label: "Chin", field: "chin_shape" },
  { key: "lips", icon: "👄", label: "Lips", field: "lips" },
  { key: "teeth", icon: "🦷", label: "Teeth", field: "teeth" }
];

const BODY_PARTS = [
  { key: "neck", icon: "🦒", label: "Neck" },
  { key: "shoulders", icon: "🏋️", label: "Shoulders" },
  { key: "chest", icon: "💪", label: "Chest" },
  { key: "abs", icon: "🫃", label: "Abs" },
  { key: "waist", icon: "📏", label: "Waist" },
  { key: "hips", icon: "🦵", label: "Hips" },
  { key: "biceps", icon: "💪", label: "Biceps" },
  { key: "triceps", icon: "💪", label: "Triceps" },
  { key: "fists", icon: "✊", label: "Fists" },
  { key: "forearms", icon: "🖐️", label: "Forearms" },
  { key: "back", icon: "🔙", label: "Back" },
  { key: "legs", icon: "🦵", label: "Legs" },
  { key: "calves", icon: "🦶", label: "Calves" },
  { key: "self_defence", icon: "🥋", label: "Self Defence" }
];

// --- Performance helpers (paste at top of script.js) ---
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// ========== GENDER IMAGES (replace with your own image URLs or data URLs) ==========
const MALE_IMAGE_URL = 'file:///D:/pics/Screenshot%202026-04-27%20110107.png';
const FEMALE_IMAGE_URL = 'file:///D:/pics/Screenshot%202026-04-27%20110117.png';

// ========== BODY IMAGES (replace with your actual PNG base64 data URLs) ==========
const MALE_BODY_IMAGE_URL = 'file:///D:/pics/Screenshot%202026-04-26%20225110.png';
const FEMALE_BODY_IMAGE_URL = 'file:///D:/pics/Screenshot%202026-04-26%20225115.png';

const GOAL_TIMEFRAMES = ["Day", "Week", "Month", "Year1", "Year2", "Year3", "Year4", "Year5", "Year6", "Year7", "Year8", "Year9", "Year10"];
const TF_NAMES = {
  Day: "Day (Today)",
  Week: "Week (This Week)",
  Month: "Month (This Month)",
  Year1: "Year 1", Year2: "Year 2", Year3: "Year 3", Year4: "Year 4",
  Year5: "Year 5", Year6: "Year 6", Year7: "Year 7", Year8: "Year 8",
  Year9: "Year 9", Year10: "Year 10"
};
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const RANKS = ["E", "D", "C", "B", "A", "S", "SS", "SSS"];
const RANK_THRESHOLDS = [0, 40, 50, 60, 70, 80, 90, 95];

const SITE_MAP = {
  google: "https://www.google.com",
  youtube: "https://www.youtube.com",
  gmail: "https://mail.google.com",
  facebook: "https://www.facebook.com",
  twitter: "https://www.twitter.com",
  x: "https://www.x.com",
  instagram: "https://www.instagram.com",
  reddit: "https://www.reddit.com",
  linkedin: "https://www.linkedin.com",
  amazon: "https://www.amazon.com",
  netflix: "https://www.netflix.com",
  github: "https://www.github.com",
  stackoverflow: "https://stackoverflow.com",
  wikipedia: "https://www.wikipedia.org",
  pinterest: "https://www.pinterest.com",
  whatsapp: "https://web.whatsapp.com",
  chatgpt: "https://chat.openai.com",
  claude: "https://claude.ai",
  gemini: "https://gemini.google.com",
  perplexity: "https://www.perplexity.ai",
  deepseek: "https://chat.deepseek.com",
  bing: "https://www.bing.com",
  maps: "https://maps.google.com",
  translate: "https://translate.google.com",
  drive: "https://drive.google.com",
  docs: "https://docs.google.com",
  sheets: "https://sheets.google.com",
  slides: "https://slides.google.com",
  outlook: "https://outlook.live.com",
  twitch: "https://www.twitch.tv",
  spotify: "https://open.spotify.com",
  soundcloud: "https://soundcloud.com",
  notion: "https://www.notion.so",
  figma: "https://www.figma.com",
  canva: "https://www.canva.com",
  discord: "https://discord.com/app",
  telegram: "https://web.telegram.org",
  zoom: "https://app.zoom.us",
  slack: "https://app.slack.com",
  teams: "https://teams.microsoft.com",
  onedrive: "https://onedrive.live.com",
  dropbox: "https://www.dropbox.com",
  trello: "https://trello.com",
  asana: "https://app.asana.com",
  jira: "https://jira.atlassian.com",
  tiktok: "https://www.tiktok.com",
  snapchat: "https://web.snapchat.com"
};

const DESKTOP_APP_WEB_ALT = {
  notepad: { action: "notepad" },
  calculator: { url: "https://www.desmos.com/scientific" },
  paint: { url: "https://jspaint.app" },
  word: { url: "https://word.new" },
  excel: { url: "https://excel.new" },
  powerpoint: { url: "https://powerpoint.new" },
  vscode: { url: "https://vscode.dev" },
  blender: { url: "https://www.blender.org/download" },
  unity: { url: "https://unity.com/download" },
  photoshop: { url: "https://photoshop.adobe.com" },
  figma: { url: "https://www.figma.com" },
  canva: { url: "https://www.canva.com" },
  obs: { url: "https://obsproject.com/download" },
  steam: { url: "https://store.steampowered.com" },
  discord: { url: "https://discord.com/app" },
  telegram: { url: "https://web.telegram.org" },
  whatsapp: { url: "https://web.whatsapp.com" },
  zoom: { url: "https://app.zoom.us" },
  spotify: { url: "https://open.spotify.com" },
  vlc: { url: "https://www.videolan.org/vlc/" },
  skype: { url: "https://web.skype.com" },
  explorer: { url: "https://drive.google.com" },
  chrome: { action: "hint", hint: "Chrome is already your browser!" },
  brave: { url: "https://brave.com/download" },
  firefox: { url: "https://www.firefox.com" },
  "task manager": { action: "hint", hint: "Press Ctrl+Shift+Esc on your keyboard." },
  settings: { action: "hint", hint: "Press Win+I on your keyboard to open Windows Settings." },
  "control panel": { action: "hint", hint: "Search 'Control Panel' in the Start Menu." },
  cmd: { action: "hint", hint: "Press Win+R, then type 'cmd' and press Enter." },
  terminal: { action: "hint", hint: "Press Win+X and select 'Terminal' or 'PowerShell'." },
  "davinci resolve": { url: "https://www.blackmagicdesign.com/products/davinciresolve" },
  "touchdesigner": { url: "https://derivative.ca/download" }
};

// Guest mode flag – when false, all data is temporary and lost on refresh
let isLoggedIn = false;
// In‑memory cache for guest users (lost on page reload)
let cachedFaceProfile = null;
let cachedFaceGender = null;
let cachedBodyProfile = null;
let cachedBodyGender = null;
// Immediately restore login state from localStorage
try {
  const savedUser = localStorage.getItem('player_current_user');
  if (savedUser) {
    isLoggedIn = true;
    window.isLoggedIn = true;
  }
} catch (e) { }

// In‑memory storage for guest mode (emptied on every page load)
const memoryStore = new Map();

// Update browser tab title based on current chat
function updateDocumentTitle() {
  const currentId = ChatMgr.current;
  if (currentId && ChatMgr.chats[currentId]) {
    const chat = ChatMgr.chats[currentId];
    // Only show chat name if the user has sent at least one message
    const hasUserMessage = chat.messages.some(m => m.sender && m.sender.toLowerCase() === 'you');
    if (hasUserMessage && chat.name && chat.name.trim() !== '') {
      document.title = `${chat.name} `;
      return;
    }
  }
  document.title = 'Player';
}

const PyAutoGUI = {
  BASE: 'http://localhost:5000',

  async _post(endpoint, body) {
    try {
      const res = await fetch(this.BASE + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return await res.json();
    } catch (e) {
      App.appendChat('System', '❌ PyAutoGUI server not running. Start server.py first.');
      return null;
    }
  },

  async move(x, y) { return this._post('/move', { x, y }); },
  async click(x, y) { return this._post('/click', { x, y }); },
  async type(text) { return this._post('/type', { text }); },
  async hotkey(...keys) { return this._post('/hotkey', { keys }); },
  async scroll(clicks) { return this._post('/scroll', { clicks }); },

  async screenshot() {
    const res = await fetch(this.BASE + '/screenshot');
    const data = await res.json();
    return data.image; // base64 PNG string
  }
};

/* ============================================================
   GREETING SYSTEM — centred typewriter welcome
   ============================================================ */
const GreetingSystem = {
  _active: false,
  _typeTimer: null,
  _holdTimer: null,
  _fadeTimer: null,
  GREETING: "Greetings - Welcome Back Sir, What can I do for You?",

  show() {
    setTimeout(() => this._start(), 160);
  },

  _start() {
    this._active = true;
    const panel = document.getElementById('center-panel');
    const overlay = document.getElementById('greeting-overlay');
    const textEl = document.getElementById('greeting-text');
    if (!panel || !overlay || !textEl) return;

    panel.classList.add('greeting-mode');
    overlay.classList.remove('hidden');
    textEl.innerHTML = '';
    textEl.classList.remove('fade-out');

    /* blinking cursor */
    const cursor = document.createElement('span');
    cursor.id = 'tw-cursor';
    textEl.appendChild(cursor);

    /* fade-in the text container on next two frames */
    requestAnimationFrame(() =>
      requestAnimationFrame(() => textEl.classList.add('visible'))
    );

    /* typewriter */
    let i = 0;
    const src = this.GREETING;
    this._typeTimer = setInterval(() => {
      if (i < src.length) {
        const ch = document.createElement('span');
        ch.textContent = src[i++];
        textEl.insertBefore(ch, cursor);
      } else {
        clearInterval(this._typeTimer);
        /* just stop the cursor — text stays visible until user sends a message */
        setTimeout(() => {
          cursor.style.animation = 'none';
          cursor.style.opacity = '0';
        }, 550);
      }
    }, 58);
  },

  _fadeText() {
    const textEl = document.getElementById('greeting-text');
    if (textEl) {
      textEl.classList.add('fade-out');
      textEl.classList.remove('visible');
    }
  },

  hide() {
    if (!this._active) return;
    this._active = false;
    clearInterval(this._typeTimer);
    clearTimeout(this._holdTimer);
    clearTimeout(this._fadeTimer);

    this._fadeText();

    /* after text fades, remove greeting-mode so layout snaps back */
    setTimeout(() => {
      document.getElementById('center-panel')
        ?.classList.remove('greeting-mode');
      const overlay = document.getElementById('greeting-overlay');
      if (overlay) overlay.classList.add('hidden');

      /* scroll chat to latest message */
      const chat = document.getElementById('chat-messages');
      if (chat) chat.scrollTop = chat.scrollHeight;
    }, 460);
  }
};

// ============================================================================
// STORAGE (localStorage helper)
// ============================================================================
const Store = {
  get(key, defaultValue) {
    if (isLoggedIn) {
      try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : defaultValue;
      } catch { return defaultValue; }
    } else {
      // Guest mode: use memory only
      return memoryStore.has(key) ? memoryStore.get(key) : defaultValue;
    }
  },
  set(key, value) {
    if (isLoggedIn) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { }
    } else {
      memoryStore.set(key, value);
    }
  },
  // All helper methods remain exactly the same – they call this.get / this.set
  faceProfile() {
    const p = this.get('face_profile', { timestamp: null });
    FACE_PARTS.forEach(f => { if (!p[f.field]) p[f.field] = ""; });
    return p;
  },
  bodyProfile() {
    const p = this.get('body_profile', { timestamp: null });
    BODY_PARTS.forEach(b => { if (!p[b.key]) p[b.key] = ""; });
    return p;
  },
  goals() {
    const g = this.get('goals', {});
    GOAL_TIMEFRAMES.forEach(tf => { if (!g[tf]) g[tf] = []; });
    return g;
  },
  todo() { return this.get('todo', []); },
  schedule() {
    const s = this.get('schedule', {});
    WEEKDAYS.forEach(d => { if (!s[d]) s[d] = []; });
    return s;
  },
  progress() { return this.get('progress', { current_rank: 'E', last_year_rank: 'E', last_update: null }); },
  chats() { return this.get('chats', {}); },
  notepad() { return this.get('notepad_content', ''); }
};
let chatListRevealed = false;

function revealChatList() {
  const chatList = document.getElementById('chat-list');
  if (chatList && chatList.classList.contains('initially-hidden')) {
    chatList.classList.remove('initially-hidden');
  }
}

// ============================================================================
// SECURITY MANAGER
// ============================================================================
const SecurityManager = {

  // ── SHA-256 password hashing via WebCrypto ──
  async hashPassword(pw) {
    const buf = await crypto.subtle.digest('SHA-256',
      new TextEncoder().encode(pw + 'player_salt_2024'));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  },

  hasPassword() { return !!localStorage.getItem('player_pw_hash'); },

  async setPassword(pw) {
    localStorage.setItem('player_pw_hash', await this.hashPassword(pw));
  },

  async checkPassword(pw) {
    const stored = localStorage.getItem('player_pw_hash');
    return stored && stored === await this.hashPassword(pw);
  },

  // ── WebAuthn passkeys ──
  getPasskeys() { return JSON.parse(localStorage.getItem('player_passkeys') || '[]'); },

  async registerPasskey() {
    if (!window.PublicKeyCredential) throw new Error('WebAuthn not supported in this browser.');
    const cred = await navigator.credentials.create({
      publicKey: {
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        rp: { name: 'Player AI' },
        user: { id: crypto.getRandomValues(new Uint8Array(16)), name: 'player_user', displayName: 'Player User' },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' }, { alg: -257, type: 'public-key' }],
        authenticatorSelection: { userVerification: 'required' },
        timeout: 60000
      }
    });
    const id = btoa(String.fromCharCode(...new Uint8Array(cred.rawId)));
    const ua = navigator.userAgent;
    const browser = ua.includes('Chrome') ? 'Chrome' : ua.includes('Firefox') ? 'Firefox' :
      ua.includes('Safari') ? 'Safari' : ua.includes('Edge') ? 'Edge' : 'Browser';
    const list = this.getPasskeys();
    list.push({ id, name: `${browser} Passkey`, created: new Date().toLocaleString() });
    localStorage.setItem('player_passkeys', JSON.stringify(list));
    return id;
  },

  removePasskey(id) {
    localStorage.setItem('player_passkeys',
      JSON.stringify(this.getPasskeys().filter(p => p.id !== id)));
  },

  // ── TOTP (Authenticator App) ──
  generateTOTPSecret() {
    const C = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    return [...crypto.getRandomValues(new Uint8Array(20))].map(b => C[b % 32]).join('');
  },

  // Simple TOTP simulation (30-second window)
  getTOTPCode(secret) {
    const slot = Math.floor(Date.now() / 30000);
    let h = 0;
    for (const c of secret + slot) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
    return String(Math.abs(h) % 1000000).padStart(6, '0');
  },

  getTOTPStatus() { return JSON.parse(localStorage.getItem('player_totp') || 'null'); },

  setupTOTP(secret) {
    localStorage.setItem('player_totp', JSON.stringify({
      secret, enabled: true, createdAt: new Date().toLocaleString()
    }));
  },

  disableTOTP() { localStorage.removeItem('player_totp'); },

  // ── SMS MFA ──
  getSMSPhone() { return localStorage.getItem('player_sms_phone'); },

  sendSMSCode(phone) {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    sessionStorage.setItem('player_sms_code', code);
    sessionStorage.setItem('player_sms_expires', (Date.now() + 5 * 60000).toString());
    console.log(`[Player AI SMS] → ${phone} : ${code}`);
    return code; // in real app this would be sent via API
  },

  verifySMSCode(entered) {
    const stored = sessionStorage.getItem('player_sms_code');
    const expires = parseInt(sessionStorage.getItem('player_sms_expires') || '0');
    if (Date.now() > expires) return false;
    const ok = entered.trim() === stored;
    if (ok) sessionStorage.removeItem('player_sms_code');
    return ok;
  },

  setSMSPhone(phone) { localStorage.setItem('player_sms_phone', phone); },

  // ── Trusted Devices ──
  _deviceId() {
    let id = localStorage.getItem('player_device_id');
    if (!id) {
      id = 'dev_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('player_device_id', id);
    }
    return id;
  },

  _deviceName() {
    const ua = navigator.userAgent;
    const os = ua.includes('Windows') ? 'Windows' : ua.includes('Mac') ? 'macOS' :
      ua.includes('Android') ? 'Android' : ua.includes('iPhone') ? 'iPhone' :
        ua.includes('Linux') ? 'Linux' : 'Device';
    const br = ua.includes('Chrome') ? 'Chrome' : ua.includes('Firefox') ? 'Firefox' :
      ua.includes('Safari') ? 'Safari' : ua.includes('Edge') ? 'Edge' : 'Browser';
    return `${br} on ${os}`;
  },

  getTrustedDevices() { return JSON.parse(localStorage.getItem('player_trusted_devices') || '[]'); },

  registerCurrentDevice() {
    const id = this._deviceId();
    const devs = this.getTrustedDevices();
    const idx = devs.findIndex(d => d.id === id);
    const entry = { id, name: this._deviceName(), addedAt: new Date().toLocaleString(), lastSeen: new Date().toLocaleString() };
    if (idx >= 0) devs[idx] = entry; else devs.push(entry);
    localStorage.setItem('player_trusted_devices', JSON.stringify(devs));
  },

  removeDevice(id) {
    localStorage.setItem('player_trusted_devices',
      JSON.stringify(this.getTrustedDevices().filter(d => d.id !== id)));
  },

  // ── Advanced Security ──
  isAdvancedEnabled() { return localStorage.getItem('player_adv_security') === '1'; },
  setAdvanced(on) { on ? localStorage.setItem('player_adv_security', '1') : localStorage.removeItem('player_adv_security'); },

  // ── Session / Logout ──
  _channel: null,

  initSession() {
    if (!localStorage.getItem('player_session_id'))
      localStorage.setItem('player_session_id', 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2));

    this.registerCurrentDevice();

    // Cross-tab logout via BroadcastChannel
    if (window.BroadcastChannel) {
      this._channel = new BroadcastChannel('player_auth_channel');
      this._channel.onmessage = e => {
        if (e.data === 'LOGOUT_ALL') {
          this._forceLogout('You were logged out from all devices.');
        }
      };
    }
    // Cross-window logout via storage event
    window.addEventListener('storage', e => {
      if (e.key === '__player_logout_all__' && e.newValue) this._forceLogout('You were logged out from all devices.');
    });
  },

  _forceLogout(msg) {
    ['player_current_user', 'player_session_id'].forEach(k => localStorage.removeItem(k));
    window.isLoggedIn = false;
    if (typeof isLoggedIn !== 'undefined') isLoggedIn = false;
    if (window.showToast) window.showToast(msg, '#b3476e');
    setTimeout(() => location.reload(), 1800);
  },

  logoutCurrent() {
    ['player_current_user', 'player_session_id'].forEach(k => localStorage.removeItem(k));
    window.isLoggedIn = false;
    if (typeof isLoggedIn !== 'undefined') isLoggedIn = false;
    location.reload();
  },

  logoutAll() {
    // Broadcast to other tabs/windows
    this._channel?.postMessage('LOGOUT_ALL');
    localStorage.setItem('__player_logout_all__', Date.now().toString());
    setTimeout(() => localStorage.removeItem('__player_logout_all__'), 1000);
    this._forceLogout('Logged out of all devices.');
  }
};

// ============================================================================
// PROGRESS RANK (calculates overall rank)
// ============================================================================
const ProgressRank = {
  calculate(face, body, goals, todo, schedule) {
    const tf = FACE_PARTS.length;
    const ff = FACE_PARTS.filter(p => face[p.field] && face[p.field] !== "Undetected").length;
    const looks = tf ? ff / tf : 0;

    const tb = BODY_PARTS.length;
    const fb = BODY_PARTS.filter(p => body[p.key] && body[p.key] !== "Undetected").length;
    let physique = tb ? fb / tb : 0;

    let tg = 0, cg = 0;
    GOAL_TIMEFRAMES.forEach(tf => {
      (goals[tf] || []).forEach(t => {
        const txt = typeof t === 'object' ? t.text : t;
        if (txt && txt.trim()) {
          tg++;
          if (typeof t === 'object' && t.done) cg++;
        }
      });
    });
    const goalScore = tg ? cg / tg : 0;

    const tt = todo.length;
    const ct = todo.filter(t => typeof t === 'object' && t.done).length;
    const todoScore = tt ? ct / tt : 0;

    let ts = 0, cs = 0;
    WEEKDAYS.forEach(d => {
      (schedule[d] || []).forEach(t => {
        const txt = typeof t === 'object' ? t.text : t;
        if (txt && txt.trim()) {
          ts++;
          if (typeof t === 'object' && t.done) cs++;
        }
      });
    });
    const schedScore = ts ? cs / ts : 0;

    const overall = (looks + physique + goalScore + todoScore + schedScore) / 5 * 100;
    let rank = "E";
    RANK_THRESHOLDS.forEach((th, i) => { if (overall >= th) rank = RANKS[i]; });
    return { rank, overall, looks, physique, goalScore, todoScore, schedScore };
  },
  update() {
    const face = Store.faceProfile();
    const body = Store.bodyProfile();
    const goals = Store.goals();
    const todo = Store.todo();
    const sched = Store.schedule();
    const { rank, overall } = this.calculate(face, body, goals, todo, sched);
    const p = Store.progress();
    const now = new Date();
    if (p.last_update) {
      const last = new Date(p.last_update);
      if (now.getFullYear() > last.getFullYear()) p.last_year_rank = p.current_rank;
    }
    p.current_rank = rank;
    p.last_update = now.toISOString();
    Store.set('progress', p);
    Radar.refresh();
    return { rank, overall };
  }
};

function showYearComparison() {
  const face = Store.faceProfile();
  const body = Store.bodyProfile();
  const goals = Store.goals();
  const todo = Store.todo();
  const sched = Store.schedule();
  const progress = Store.progress();

  const lastYearRank = progress.last_year_rank || 'E';
  const currentRank = progress.current_rank || 'E';

  const { looks, physique, goalScore, todoScore, schedScore } = ProgressRank.calculate(face, body, goals, todo, sched);

  // Format percentages
  const looksPct = (looks * 100).toFixed(0);
  const physiquePct = (physique * 100).toFixed(0);
  const goalPct = (goalScore * 100).toFixed(0);
  const todoPct = (todoScore * 100).toFixed(0);
  const schedPct = (schedScore * 100).toFixed(0);

  const selfDefence = body.self_defence || 'Not set';

  const message = `📊 **Year-over-Year Progress Report**\n\n
    🏆 **Last year's rank:** ${lastYearRank}\n
    🎯 **This year's evaluation:**\n
    • Looks: ${looksPct}%\n
    • Physique: ${physiquePct}%\n
    • Goal Setting: ${goalPct}%\n
    • To-Do List: ${todoPct}%\n
    • Time Management: ${schedPct}%\n
    • Self Defence: ${selfDefence}\n
    ⭐ **Current rank:** ${currentRank}`;

  App.appendChat("System", message);
  App.speak(`Last year your rank was ${lastYearRank}. This year, your looks score is ${looksPct} percent, physique ${physiquePct} percent, goal setting ${goalPct} percent, to-do list ${todoPct} percent, time management ${schedPct} percent, and self defence level is ${selfDefence}. Your current overall rank is ${currentRank}.`, App._token);
}

function showProgressModal() {
  // Fetch current data
  const face = Store.faceProfile();
  const body = Store.bodyProfile();
  const goals = Store.goals();
  const todo = Store.todo();
  const sched = Store.schedule();
  const progress = Store.progress();

  const lastYearRank = progress.last_year_rank || 'E';
  const currentRank = progress.current_rank || 'E';

  const { looks, physique, goalScore, todoScore, schedScore } = ProgressRank.calculate(face, body, goals, todo, sched);

  const looksPct = Math.round(looks * 100);
  const physiquePct = Math.round(physique * 100);
  const goalPct = Math.round(goalScore * 100);
  const todoPct = Math.round(todoScore * 100);
  const schedPct = Math.round(schedScore * 100);
  const selfDefence = body.self_defence || 'Not set';

  // Update modal content
  document.getElementById('last-year-rank').textContent = lastYearRank;
  document.getElementById('current-rank').textContent = currentRank;
  document.getElementById('looks-pct').textContent = looksPct + '%';
  document.getElementById('physique-pct').textContent = physiquePct + '%';
  document.getElementById('goal-pct').textContent = goalPct + '%';
  document.getElementById('todo-pct').textContent = todoPct + '%';
  document.getElementById('sched-pct').textContent = schedPct + '%';
  document.getElementById('self-defence-value').textContent = selfDefence;

  // Update progress bars
  document.getElementById('looks-bar').style.width = looksPct + '%';
  document.getElementById('physique-bar').style.width = physiquePct + '%';
  document.getElementById('goal-bar').style.width = goalPct + '%';
  document.getElementById('todo-bar').style.width = todoPct + '%';
  document.getElementById('sched-bar').style.width = schedPct + '%';

  // Set date
  document.getElementById('progress-date').textContent = new Date().toLocaleDateString();

  // Show modal
  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('progress-report-modal');
  if (overlay && modal) {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
  }

  // Also speak the report (optional, but nice)
  App.speak(`Last year your rank was ${lastYearRank}. This year, your looks score is ${looksPct} percent, physique ${physiquePct} percent, goal setting ${goalPct} percent, to-do list ${todoPct} percent, time management ${schedPct} percent, and self defence level is ${selfDefence}. Your current overall rank is ${currentRank}.`, App._token);
}

// Attach close button listener (add this once after DOM ready)
document.getElementById('close-progress-modal')?.addEventListener('click', () => {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('progress-report-modal').classList.add('hidden');
});

// ============================================================================
// CHAT MANAGER
// ============================================================================
const ChatMgr = {
  current: null,
  chats: {},           // only active (non‑archived) chats
  archivedChats: {},   // archived chats stored separately

  init() {
    this.chats = Store.chats();
    this.archivedChats = Store.get('archived_chats', {});
    this.ensureChatFields();
    this.refresh();

    // Sirf un chats ko consider karo jinka koi message ho
    const nonEmptyIds = Object.keys(this.chats).filter(id => this.chats[id].messages.length > 0);
    if (nonEmptyIds.length === 0) {
      this.current = null;
      this.clearDisplay();
      return;
    }
    const ids = nonEmptyIds.sort((a, b) => b - a);
    this.load(ids[0]);
  },

  ensureChatFields() {
    let changed = false;
    for (const id in this.chats) {
      const chat = this.chats[id];
      if (chat.pinned === undefined) { chat.pinned = false; changed = true; }
      if (chat.archived === undefined) { chat.archived = false; changed = true; }
      if (chat.lastUpdated === undefined) { chat.lastUpdated = parseInt(id) || Date.now(); changed = true; }
    }
    for (const id in this.archivedChats) {
      const chat = this.archivedChats[id];
      if (chat.pinned === undefined) chat.pinned = false;
      if (chat.archived === undefined) chat.archived = true;
      if (chat.lastUpdated === undefined) chat.lastUpdated = parseInt(id) || Date.now();
    }
    if (changed) this.save();
  },

  save() {
    Store.set('chats', this.chats);
    Store.set('archived_chats', this.archivedChats);
  },

  // ---------- ARCHIVE / UNARCHIVE / DELETE ----------
  archiveChat(chatId) {
    if (!this.chats[chatId]) return false;
    this.archivedChats[chatId] = this.chats[chatId];
    delete this.chats[chatId];
    if (this.current === chatId) {
      this.current = null;
      this.clearDisplay();
    }
    this.save();
    this.refresh();
    if (Object.keys(this.chats).length === 0) this.newChat(false);
    return true;
  },

  unarchiveChat(chatId) {
    if (!this.archivedChats[chatId]) return false;
    this.chats[chatId] = this.archivedChats[chatId];
    delete this.archivedChats[chatId];
    this.save();
    this.refresh();
    return true;
  },

  archiveAllChats() {
    for (const id in this.chats) {
      this.archivedChats[id] = this.chats[id];
    }
    this.chats = {};
    this.current = null;
    this.clearDisplay();
    this.save();
    this.refresh();
    this.newChat(false);
    if (Object.keys(this.chats).length === 0) {
      this.newChat(false);
    }
  },

  deleteArchivedChat(chatId) {
    if (this.archivedChats[chatId]) {
      delete this.archivedChats[chatId];
      this.save();
      this.refresh();
      return true;
    }
    return false;
  },

  getArchivedChats() {
    return Object.entries(this.archivedChats).map(([id, info]) => ({ id, ...info }));
  },

  showArchivedChats() {
    const container = document.getElementById('archived-chats-list');
    if (!container) {
      alert("Archived chats container missing in HTML");
      return;
    }
    refreshArchivedChatsList();  // populates the container
    container.style.display = 'block';
  },

  // ---------- CHAT MANAGEMENT ----------
  newChat(addWelcome = true, name = "New Chat") {
    const id = Date.now().toString();
    const ts = new Date().toLocaleString('en-GB', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
    this.chats[id] = {
      name,
      timestamp: ts,
      messages: [],
      pinned: false,
      archived: false,
      lastUpdated: Date.now()
    };
    this.current = id;
    this.clearDisplay();
    this.save();
    this.refresh();
    if (addWelcome) App.appendChat("Player", "Started new chat: " + name);
    updateDocumentTitle();
  },

  load(id) {
    if (!this.chats[id]) return;
    this.current = id;
    this.clearDisplay();
    this.chats[id].messages.forEach(m => this._appendRaw(m.sender, m.text));
    this.save();
    this.refresh();
    updateDocumentTitle();
  },

  clearDisplay() {
    document.getElementById('chat-messages').innerHTML = '';
  },

  clearCurrent() {
    if (!this.current) { alert("No active chat."); return; }
    const name = this.chats[this.current]?.name || "Chat";
    if (!confirm(`Clear all messages in '${name}'?`)) return;
    this.chats[this.current].messages = [];
    this.clearDisplay();
    this.save();
    App.appendChat("System", "Chat cleared.");
  },

  deleteCurrent() {
    if (!this.current) { alert("No chat to delete."); return; }
    const name = this.chats[this.current]?.name || "Chat";
    if (!confirm(`Delete chat '${name}' permanently?`)) return;
    delete this.chats[this.current];
    delete this.archivedChats[this.current];
    this.current = null;
    this.clearDisplay();
    this.save();
    this.refresh();

    const nonEmptyIds = Object.keys(this.chats).filter(id => this.chats[id].messages.length > 0);
    if (nonEmptyIds.length > 0) {
      const ids = nonEmptyIds.sort((a, b) => b - a);
      this.load(ids[0]);
    }
    updateDocumentTitle();
  },

  addMessage(sender, text) {
    if (!this.current) this.newChat(false);
    if (!this.chats[this.current]) this.newChat(false);
    this.chats[this.current].messages.push({ sender, text });
    if (sender.toLowerCase() === 'you' && this.chats[this.current].name === 'New Chat') {
      this.chats[this.current].name = text.substring(0, 40);
    }
    if (this.chats[this.current]) {
      this.chats[this.current].lastUpdated = Date.now();
    }
    this.save();
    this.refresh();
    if (sender.toLowerCase() === 'you' && !chatListRevealed) {
      chatListRevealed = true;
      revealChatList();
    }
    updateDocumentTitle();
  },

  _appendRaw(sender, text) {
    const sl = sender.toLowerCase();
    const cls = (sl === 'you') ? 'you' : (sl === 'player') ? 'player' : (sl === 'news') ? 'news' : 'system';
    const div = document.createElement('div');
    div.className = 'msg-block';
    div.innerHTML = `<div class="msg-name ${cls}">${escHtml(sender)}</div>
                 <div class="msg-text ${cls === 'you' ? 'you' : ''}">${escHtml(text)}</div>`;
    document.getElementById('chat-messages').appendChild(div);
    const m = document.getElementById('chat-messages');
    m.scrollTop = m.scrollHeight;
  },

  // ✅ FIXED refresh() method with DocumentFragment (smooth rendering)
  refresh() {
    const list = document.getElementById('chat-list');
    if (!list) return;

    const fragment = document.createDocumentFragment();
    const all = Object.entries(this.chats);
    const active = all.filter(([_, info]) => !info.archived && info.messages && info.messages.length > 0);

    active.sort((a, b) => {
      if (a[1].pinned && !b[1].pinned) return -1;
      if (!a[1].pinned && b[1].pinned) return 1;
      return (b[1].lastUpdated || 0) - (a[1].lastUpdated || 0);
    });

    active.forEach(([id, info]) => {
      const div = this._createChatItemElement(id, info);
      fragment.appendChild(div);
    });

    list.innerHTML = '';
    list.appendChild(fragment);
  },

  // Helper to create a chat item element
  _createChatItemElement(id, info) {
    const div = document.createElement('div');
    div.className = 'chat-item' + (id === this.current ? ' active' : '');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'space-between';
    div.style.padding = '8px 10px';
    div.style.cursor = 'pointer';

    const leftSpan = document.createElement('span');
    leftSpan.style.display = 'flex';
    leftSpan.style.alignItems = 'center';
    leftSpan.style.gap = '6px';
    leftSpan.style.flex = '1';
    leftSpan.style.overflow = 'hidden';

    if (info.pinned) {
      const pinIcon = document.createElement('span');
      pinIcon.textContent = '📌';
      pinIcon.style.fontSize = '12px';
      leftSpan.appendChild(pinIcon);
    }

    const titleSpan = document.createElement('span');
    titleSpan.textContent = `${info.name}  (${info.timestamp})`;
    titleSpan.style.overflow = 'hidden';
    titleSpan.style.textOverflow = 'ellipsis';
    titleSpan.style.whiteSpace = 'nowrap';
    leftSpan.appendChild(titleSpan);

    const menuBtn = document.createElement('button');
    menuBtn.textContent = '⋮';
    menuBtn.className = 'chat-menu-btn';
    menuBtn.style.cssText = 'background:none; border:none; color:#aaa; font-size:18px; cursor:pointer; padding:0 4px; border-radius:4px;';
    menuBtn.onmouseover = () => menuBtn.style.backgroundColor = '#2a2a3c';
    menuBtn.onmouseout = () => menuBtn.style.backgroundColor = 'transparent';
    menuBtn.onclick = (e) => {
      e.stopPropagation();
      this._showChatMenu(id, info, menuBtn);
    };

    div.appendChild(leftSpan);
    div.appendChild(menuBtn);
    div.onclick = () => this.load(id);
    return div;
  },

  _renameChat(chatId) {
    const oldName = this.chats[chatId].name;
    const newName = prompt('Rename chat:', oldName);
    if (newName && newName.trim()) {
      this.chats[chatId].name = newName.trim();
      this.chats[chatId].lastUpdated = Date.now();
      this.save();
      this.refresh();
      App.appendChat("System", `Chat renamed to "${newName.trim()}".`);
    }
    updateDocumentTitle();
  },

  _togglePin(chatId) {
    this.chats[chatId].pinned = !this.chats[chatId].pinned;
    this.chats[chatId].lastUpdated = Date.now();
    this.save();
    this.refresh();
    App.appendChat("System", `Chat ${this.chats[chatId].pinned ? 'pinned' : 'unpinned'}.`);
  },

  _archiveChat(chatId) {
    this.archiveChat(chatId);
    App.appendChat("System", `Chat archived.`);
  },

  _unarchiveChat(chatId) {
    this.unarchiveChat(chatId);
    App.appendChat("System", `Chat restored from archive.`);
  },

  _deleteChat(chatId) {
    const chatName = this.chats[chatId]?.name || this.archivedChats[chatId]?.name || 'Chat';
    if (!confirm(`Delete "${chatName}" forever?`)) return;
    const wasCurrent = (this.current === chatId);
    delete this.chats[chatId];
    delete this.archivedChats[chatId];
    if (wasCurrent) {
      this.current = null;
      this.clearDisplay();
    }
    this.save();
    this.refresh();
    if (Object.keys(this.chats).length === 0) this.newChat(false);
    else if (wasCurrent) {
      const first = Object.keys(this.chats)[0];
      this.load(first);
    }
    updateDocumentTitle();
  },

  _shareChat(chatId, chatInfo) {
    const title = chatInfo.name;
    const text = `Check out my chat "${title}" on Player AI!`;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title, text, url }).catch(e => console.log(e));
      return;
    }
    this._showShareModal(title, text, url);
  },

  _showShareModal(title, text, url) {
    let modal = document.getElementById('shareModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'shareModal';
      modal.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: #14172b; border: 1px solid #6f5dc2; border-radius: 20px;
        width: 480px; max-width: 90vw; z-index: 10001; padding: 20px;
        box-shadow: 0 8px 24px black;
      `;
      modal.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <strong style="color: #c084fc; font-size: 18px;">📤 Share this chat</strong>
          <button id="closeShareModal" style="background: none; border: none; color: #aaa; font-size: 24px; cursor: pointer;">&times;</button>
        </div>
        <div id="shareButtonsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 12px; margin-bottom: 20px;"></div>
        <div style="display: flex; gap: 12px; margin-top: 8px;">
          <input type="text" id="shareLinkInput" readonly style="flex:1; background:#0e1022; border:1px solid #5f4b8b; border-radius:40px; padding:8px 12px; color:white; font-size:12px;">
          <button id="copyLinkBtn" style="background:#2a7a2a; border:none; border-radius:40px; padding:8px 16px; color:white; cursor:pointer;">Copy</button>
        </div>
      `;
      document.body.appendChild(modal);
      document.getElementById('closeShareModal').onclick = () => modal.style.display = 'none';
      document.getElementById('copyLinkBtn').onclick = () => {
        const input = document.getElementById('shareLinkInput');
        input.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
      };
    }

    const container = document.getElementById('shareButtonsGrid');
    const platforms = [
      { name: 'WhatsApp', url: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}` },
      { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
      { name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
      { name: 'Reddit', url: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
      { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
      { name: 'Telegram', url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` },
      { name: 'Instagram', action: () => alert('To share on Instagram, copy the link below and paste in your Instagram story or DM.') },
      { name: 'Snapchat', action: () => alert('Copy the link and share it via Snapchat.') },
      { name: 'X', url: `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
      { name: 'Blogger', url: `https://www.blogger.com/blog-this.g?u=${encodeURIComponent(url)}&n=${encodeURIComponent(title)}&t=${encodeURIComponent(text)}` },
      { name: 'Tumblr', url: `https://www.tumblr.com/widgets/share/tool?posttype=link&title=${encodeURIComponent(title)}&caption=${encodeURIComponent(text)}&content=${encodeURIComponent(url)}` },
      { name: 'Email', url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + ' ' + url)}` },
      { name: 'Copy Link', action: () => { navigator.clipboard.writeText(url); alert('Link copied!'); } }
    ];

    container.innerHTML = '';
    platforms.forEach(p => {
      const btn = document.createElement('button');
      btn.textContent = p.name;
      btn.style.cssText = 'background: #2a2c5a; border: none; border-radius: 40px; padding: 8px 12px; color: white; cursor: pointer; font-size: 12px;';
      btn.onmouseover = () => btn.style.background = '#4c3b9b';
      btn.onmouseout = () => btn.style.background = '#2a2c5a';
      if (p.url) btn.onclick = () => window.open(p.url, '_blank');
      else if (p.action) btn.onclick = p.action;
      container.appendChild(btn);
    });

    const linkInput = document.getElementById('shareLinkInput');
    if (linkInput) linkInput.value = url;
    modal.style.display = 'block';
  }
};

// Create/update the horizontal bars (one per user message)
let activeTooltip = null;

function updateUserMsgRectangles() {
  const stack = document.getElementById('msg-rect-stack');
  if (!stack) return;

  const currentId = ChatMgr.current;
  if (!currentId || !ChatMgr.chats[currentId]) {
    stack.innerHTML = '';
    return;
  }

  const messages = ChatMgr.chats[currentId].messages;
  const userMessages = messages.filter(m => m.sender && m.sender.toLowerCase() === 'you');
  const userCount = userMessages.length;

  // Show border only if user has sent more than 5 messages
  if (userCount > 5) {
    stack.classList.add('show-border');
  } else {
    stack.classList.remove('show-border');
  }

  stack.innerHTML = '';

  for (let i = 0; i < userCount; i++) {
    const rect = document.createElement('div');
    rect.className = 'user-msg-rect';
    rect.setAttribute('data-index', i);
    rect.setAttribute('data-msg', userMessages[i].text);

    // Highlight the last message (i === userCount - 1)
    if (i === userCount - 1) {
      rect.classList.add('highlight');
    }

    // Hover tooltip
    rect.addEventListener('mouseenter', (e) => {
      showTooltip(e, userMessages[i].text);
    });
    rect.addEventListener('mousemove', (e) => {
      if (activeTooltip) {
        activeTooltip.style.left = (e.clientX + 15) + 'px';
        activeTooltip.style.top = (e.clientY + 15) + 'px';
      }
    });
    rect.addEventListener('mouseleave', () => {
      hideTooltip();
    });

    // Click to scroll
    rect.addEventListener('click', () => {
      scrollToUserMessage(i);
    });

    stack.appendChild(rect);
  }
}

function showTooltip(event, messageText) {
  if (activeTooltip) activeTooltip.remove();
  activeTooltip = document.createElement('div');
  activeTooltip.className = 'user-msg-tooltip';
  // Truncate very long messages
  const displayText = messageText.length > 150 ? messageText.substring(0, 150) + '…' : messageText;
  activeTooltip.innerHTML = `<strong>📝 User message</strong><br>${escapeHtml(displayText)}`;
  document.body.appendChild(activeTooltip);
  activeTooltip.style.left = (event.clientX + 15) + 'px';
  activeTooltip.style.top = (event.clientY + 15) + 'px';
}

function hideTooltip() {
  if (activeTooltip) {
    activeTooltip.remove();
    activeTooltip = null;
  }
}

function scrollToUserMessage(index) {
  // Find all user message blocks in the DOM
  const chatMessagesDiv = document.getElementById('chat-messages');
  const userBlocks = chatMessagesDiv.querySelectorAll('.msg-block .msg-name.you');

  if (index >= 0 && index < userBlocks.length) {
    const targetBlock = userBlocks[index].closest('.msg-block');
    if (targetBlock) {
      // Remove any existing highlight
      document.querySelectorAll('.highlight-message').forEach(el => el.classList.remove('highlight-message'));
      // Add highlight class
      targetBlock.classList.add('highlight-message');
      // Smooth scroll to the element
      targetBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Remove highlight after animation ends
      setTimeout(() => {
        targetBlock.classList.remove('highlight-message');
      }, 1000);
    }
  } else {
    console.warn('User message block not found for index', index);
  }
}

// Helper to escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Hook into ChatMgr events to update bars automatically
const _origAdd = ChatMgr.addMessage;
ChatMgr.addMessage = function (sender, text) {
  _origAdd.call(this, sender, text);
  if (sender.toLowerCase() === 'you') updateUserMsgRectangles();
};

const _origLoad = ChatMgr.load;
ChatMgr.load = function (id) {
  _origLoad.call(this, id);
  updateUserMsgRectangles();
};

const _origClear = ChatMgr.clearCurrent;
ChatMgr.clearCurrent = function () {
  _origClear.call(this);
  updateUserMsgRectangles();
};

const _origDelete = ChatMgr.deleteCurrent;
ChatMgr.deleteCurrent = function () {
  _origDelete.call(this);
  updateUserMsgRectangles();
};

const _origNewChat = ChatMgr.newChat;
ChatMgr.newChat = function (addWelcome, name) {
  _origNewChat.call(this, addWelcome, name);
  updateUserMsgRectangles();
};

// Initial call after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(updateUserMsgRectangles, 100);
});

// ============================================================================
// PERSISTENT CHAT SEARCH 
// ============================================================================// 
(function initPersistentChatSearch() {
  function filterChatList() {
    const searchInput = document.getElementById('chatSearchInput');
    const chatItems = document.querySelectorAll('#chat-list .chat-item');
    if (!searchInput || !chatItems.length) return;

    const query = searchInput.value.toLowerCase().trim();
    let anyVisible = false;

    chatItems.forEach(item => {
      const nameSpan = item.querySelector('span:first-child') || item.firstChild;
      const chatName = nameSpan ? nameSpan.textContent.toLowerCase() : '';
      const matches = query === '' || chatName.includes(query);
      item.style.display = matches ? 'flex' : 'none';
      if (matches) anyVisible = true;
    });

    let noResultMsg = document.getElementById('chatNoResultMsg');
    if (!anyVisible && query !== '') {
      if (!noResultMsg) {
        noResultMsg = document.createElement('div');
        noResultMsg.id = 'chatNoResultMsg';
        noResultMsg.style.cssText = 'text-align:center; padding:32px 12px; color:#8b8baa; font-size:13px;';
        noResultMsg.textContent = '✨ No matching chats';
        const chatList = document.getElementById('chat-list');
        if (chatList && chatList.parentNode) {
          chatList.parentNode.insertBefore(noResultMsg, chatList.nextSibling);
        }
      }
      noResultMsg.style.display = 'block';
    } else if (noResultMsg) {
      noResultMsg.style.display = 'none';
    }
  }

  const checkAndAttach = () => {
    const searchInput = document.getElementById('chatSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', filterChatList);
      const observer = new MutationObserver(() => filterChatList());
      const chatList = document.getElementById('chat-list');
      if (chatList) observer.observe(chatList, { childList: true, subtree: true });
    } else {
      setTimeout(checkAndAttach, 100);
    }
  };
  checkAndAttach();
})();

// ============================================================================
// TEXT-TO-SPEECH & SPEECH RECOGNITION
// ============================================================================
const Voice = {
  _synth: window.speechSynthesis,
  speak(text, token) {
    if (token !== undefined && token !== App._token) return;
    this._synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 1.0;
    utt.pitch = 1.0;
    utt.volume = 1.0;
    // ---- NEW: set utterance language from settings ----
    try {
      const saved = localStorage.getItem('player_settings');
      if (saved) {
        const settings = JSON.parse(saved);
        const langMap = {
          'en': 'en-US', 'es': 'es-ES', 'fr': 'fr-FR', 'de': 'de-DE',
          'it': 'it-IT', 'pt': 'pt-PT', 'pt-BR': 'pt-BR', 'ru': 'ru-RU',
          'zh': 'zh-CN', 'ja': 'ja-JP', 'ko': 'ko-KR', 'ar': 'ar-SA',
          'hi': 'hi-IN', 'bn': 'bn-BD', 'pa': 'pa-IN', 'ta': 'ta-IN',
          'te': 'te-IN', 'ml': 'ml-IN', 'kn': 'kn-IN', 'mr': 'mr-IN',
          'gu': 'gu-IN', 'ur': 'ur-PK', 'vi': 'vi-VN', 'tr': 'tr-TR',
          'pl': 'pl-PL', 'uk': 'uk-UA', 'nl': 'nl-NL', 'el': 'el-GR',
          'cs': 'cs-CZ', 'sv': 'sv-SE', 'hu': 'hu-HU', 'he': 'he-IL',
          'th': 'th-TH', 'id': 'id-ID', 'fa': 'fa-IR', 'ro': 'ro-RO',
          'bg': 'bg-BG', 'hr': 'hr-HR', 'sk': 'sk-SK', 'da': 'da-DK',
          'fi': 'fi-FI', 'no': 'nb-NO', 'ms': 'ms-MY', 'sw': 'sw-KE',
          'af': 'af-ZA', 'is': 'is-IS', 'lt': 'lt-LT', 'lv': 'lv-LV',
          'et': 'et-EE', 'sl': 'sl-SI', 'sr': 'sr-RS', 'mk': 'mk-MK'
        };
        const lang = settings.language || 'en';
        utt.lang = langMap[lang] || 'en-US';
      } else {
        utt.lang = 'en-US';
      }
    } catch (e) { utt.lang = 'en-US'; }
    // ------------------------------------------------
    utt.onstart = () => SpeechInterrupt.onSpeechStart();
    utt.onend = () => SpeechInterrupt.onSpeechEnd();
    utt.onerror = () => SpeechInterrupt.onSpeechEnd();
    this._synth.speak(utt);
  },
  stop() {
    window.speechSynthesis.cancel();
    this._synth.cancel();
    SpeechInterrupt.onSpeechEnd();
  },
  listen() {
    return new Promise((resolve, reject) => {
      // Check for browser support
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        reject(new Error("Your browser does not support speech recognition. Please use Chrome, Edge, or Safari."));
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log("Voice recognition started");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      recognition.onerror = (event) => {
        let errorMsg = "Recognition error";
        switch (event.error) {
          case 'not-allowed':
            errorMsg = "Microphone access denied. Please allow microphone permission.";
            break;
          case 'no-speech':
            errorMsg = "No speech detected. Please try again.";
            break;
          case 'audio-capture':
            errorMsg = "No microphone found. Please connect a microphone.";
            break;
          case 'network':
            errorMsg = "Network error. Please check your connection.";
            break;
          default:
            errorMsg = `Error: ${event.error}`;
        }
        reject(new Error(errorMsg));
      };

      recognition.onend = () => {
        console.log("Voice recognition ended");
      };

      // Start recognition
      try {
        recognition.start();
      } catch (err) {
        reject(new Error("Could not start speech recognition: " + err.message));
      }
    });
  }
};

// ============================================================================
// SPEECH INTERRUPT & STOP BUTTON
// ============================================================================
const SpeechInterrupt = {
  isSpeaking: false,
  _sendBtn: null,
  _originalExecute: null,

  init() {
    this._sendBtn = document.getElementById('send-btn');
    if (!this._sendBtn) return;

    // Store the original execute function
    this._originalExecute = () => {
      if (window.App && App.execute) App.execute();
    };

    // Remove any existing listeners and set our own
    const newBtn = this._sendBtn.cloneNode(true);
    this._sendBtn.parentNode.replaceChild(newBtn, this._sendBtn);
    this._sendBtn = newBtn;

    this._sendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.isSpeaking) {
        this.stopAllOutput();
      } else {
        if (window.App && App.execute) App.execute();
      }
    });

    this._updateButtonIcon();
  },

  onSpeechStart() {
    this.isSpeaking = true;
    this._updateButtonIcon();
    // ── Sync WaveViz speaking flag to actual TTS start ──
    if (window.WaveViz) WaveViz.speaking = true;
  },

  onSpeechEnd() {
    this.isSpeaking = false;
    this._updateButtonIcon();
    // ── Stop ripples only when TTS actually finishes ──
    if (window.WaveViz) WaveViz.speaking = false;
  },

  stopAllOutput() {
    // Stop speech
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (window.Voice && Voice.stop) Voice.stop();

    // ***** Call WaveViz.stop() *****
    if (window.WaveViz && WaveViz.stop) WaveViz.stop();

    // Abort pending responses
    if (window.App && App.newToken) App.newToken();

    // Clear typewriter
    if (window._typewriterInterval) {
      clearInterval(window._typewriterInterval);
      window._typewriterInterval = null;
    }

    this.onSpeechEnd();
    if (window.showToast) window.showToast('⬜ Stopped speaking & response', '#717171');
  },

  _updateButtonIcon() {
    if (!this._sendBtn) return;
    if (this.isSpeaking) {
      this._sendBtn.textContent = '◼';
      this._sendBtn.title = 'Stop speaking & response';
      this._sendBtn.style.background = '#444444';
      this._sendBtn.style.border = 'none';
    } else {
      this._sendBtn.textContent = '↑';
      this._sendBtn.title = 'Send message';
      this._sendBtn.style.background = '';
    }
  }
};

// ============================================================================
// ATTACHMENT MENU (photo, file, screenshot, deep thinking, deep research)
// ============================================================================
const AttachMenu = {
  btn: null,
  menu: null,

  init() {
    this.btn = document.getElementById('attach-menu-btn');
    this.menu = document.getElementById('attach-menu');
    if (!this.btn || !this.menu) return;

    this.btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.menu.classList.toggle('hidden');
    });

    const items = this.menu.querySelectorAll('.menu-item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = item.dataset.action;
        this.handleAction(action);
        this.menu.classList.add('hidden');
      });
    });

    document.addEventListener('click', (e) => {
      if (!this.menu.contains(e.target) && e.target !== this.btn) {
        this.menu.classList.add('hidden');
      }
    });
  },

  handleAction(action) {
    switch (action) {
      case 'photo':
        this.attachPhotoVideo();
        break;
      case 'file':
        this.attachFile();
        break;
      case 'screenshot':
        this.takeScreenshot();
        break;
      case 'deepthink':
        this.deepThinking();
        break;
      case 'deepresearch':
        this.deepResearch();
        break;
    }
  },

  attachPhotoVideo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      let preview = '';
      if (isImage) preview = `<img src="${url}" style="max-width:200px; border-radius:8px;">`;
      else if (isVideo) preview = `<video controls src="${url}" style="max-width:200px; border-radius:8px;"></video>`;
      App.appendChat("You", `[Attached file: ${file.name}]`);
      App.appendChat("Player", `Received your ${isImage ? 'image' : 'video'} file. I’ll analyze it soon.`);
      URL.revokeObjectURL(url);
    };
    input.click();
  },

  attachFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      App.appendChat("You", `[Uploaded file: ${file.name}]`);
      App.appendChat("Player", `File "${file.name}" (${(file.size / 1024).toFixed(1)} KB) received. I'll process it.`);
    };
    input.click();
  },

  async takeScreenshot() {
    const result = await Screenshot.capture();
    App.speak(result, App._token);
  },

  deepThinking() {
    App.appendChat("System", "🧠 Deep thinking mode activated… analysing with extra reasoning.");
    App.speak("Activating deep thinking. I'll reflect more thoroughly before answering.", App._token);
  },

  deepResearch() {
    App.appendChat("System", "🔬 Deep research mode: searching multiple sources and cross‑checking facts.");
    App.speak("Initiating deep research. I'll search academic and trusted sources.", App._token);
  }
};

// ============================================================================
// SCREENSHOT
// ============================================================================
const Screenshot = {
  _blob: null,
  async capture() {
    try {
      App.appendChat("System", "📸 Select the tab or screen to capture…");
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "always" }, audio: false });
      const video = document.createElement('video');
      video.srcObject = stream;
      await new Promise(r => { video.onloadedmetadata = r; video.play(); });
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      stream.getTracks().forEach(t => t.stop());
      this._blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
      const url = URL.createObjectURL(this._blob);
      document.getElementById('screenshot-img').src = url;
      document.getElementById('screenshot-preview').classList.remove('hidden');
      return "Screenshot captured! Choose to download or copy.";
    } catch (e) {
      if (e.name === 'NotAllowedError') return "Screenshot cancelled.";
      return "Screenshot failed: " + e.message;
    }
  },
  download() {
    if (!this._blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(this._blob);
    a.download = `screenshot_${Date.now()}.png`;
    a.click();
    App.appendChat("System", "✅ Screenshot saved.");
  },
  async copyToClipboard() {
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': this._blob })]);
      App.appendChat("System", "✅ Screenshot copied to clipboard.");
    } catch {
      App.appendChat("System", "❌ Could not copy image. Please use Download instead.");
    }
  },
  close() {
    document.getElementById('screenshot-preview').classList.add('hidden');
    const img = document.getElementById('screenshot-img');
    if (img.src) URL.revokeObjectURL(img.src);
    img.src = '';
    this._blob = null;
  }
};

// ============================================================================
// CLIPBOARD HELPER
// ============================================================================
const Clipboard = {
  async writeText(text) {
    try {
      await navigator.clipboard.writeText(text);
      this._showToast(`Copied! Press Ctrl+V to paste: "${text.substring(0, 40)}${text.length > 40 ? '…' : ''}"`);
      return `✅ Copied to clipboard: "${text.substring(0, 60)}${text.length > 60 ? '…' : ''}" — Press Ctrl+V to paste anywhere.`;
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        this._showToast("Copied! Press Ctrl+V to paste.");
        return "✅ Copied to clipboard. Press Ctrl+V to paste.";
      } catch {
        return "❌ Clipboard access denied. Please allow clipboard permissions.";
      } finally {
        ta.remove();
      }
    }
  },
  _showToast(msg) {
    const t = document.getElementById('clipboard-toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => t.classList.add('hidden'), 3500);
  }
};

// ============================================================================
// NOTEPAD
// ============================================================================
const Notepad = {
  open(prefill = "") {
    const ta = document.getElementById('notepad-textarea');
    ta.value = Store.notepad() || (prefill || "");
    this.updateStatus();
    document.getElementById('notepad-modal').classList.remove('hidden');
    ta.focus();
  },
  close() {
    Store.set('notepad_content', document.getElementById('notepad-textarea').value);
    document.getElementById('notepad-modal').classList.add('hidden');
  },
  clear() {
    if (confirm("Clear notepad?")) document.getElementById('notepad-textarea').value = "";
    this.updateStatus();
  },
  async copy() { await Clipboard.writeText(document.getElementById('notepad-textarea').value); },
  download() {
    const text = document.getElementById('notepad-textarea').value;
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `note_${Date.now()}.txt`;
    a.click();
    App.appendChat("System", "✅ Note downloaded.");
  },
  updateStatus() {
    const v = document.getElementById('notepad-textarea').value;
    document.getElementById('notepad-chars').textContent = v.length + " chars";
    document.getElementById('notepad-words').textContent = (v.trim() ? v.trim().split(/\s+/).length : 0) + " words";
    document.getElementById('notepad-lines').textContent = v.split('\n').length + " lines";
  }
};

// ============================================================================
// SEARCH ENGINE (DuckDuckGo, Wikipedia, Claude)
// ============================================================================
const SearchEngine = {
  async search(query, token) {
    App.appendChat("System", "🔍 Searching…");
    const ddg = await this._duckduckgo(query);
    if (ddg && ddg.length > 40) { App.speak(ddg, token); return; }
    const wiki = await this._wikipedia(query);
    if (wiki && wiki.length > 40) { App.speak(wiki, token); return; }
    await this._askClaude(query, token);
  },
  async _duckduckgo(query) {
    try {
      const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1&t=PlayerAI`;
      const r = await fetch(url);
      const data = await r.json();
      if (data.AbstractText && data.AbstractText.length > 40) return data.AbstractText;
      if (data.Answer && data.Answer.length > 10) return data.Answer;
      if (data.Definition && data.Definition.length > 20) return data.Definition;
      if (data.RelatedTopics && data.RelatedTopics[0]) {
        const rt = data.RelatedTopics[0];
        const txt = rt.Text || rt.Result || "";
        if (txt.length > 40) return txt.replace(/<[^>]*>/g, '');
      }
    } catch (e) { console.warn("DDG error:", e); }
    return "";
  },
  async _wikipedia(query) {
    try {
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=3&format=json&origin=*`;
      const sr = await fetch(searchUrl);
      const sd = await sr.json();
      const titles = sd[1] || [];
      if (!titles.length) return "";
      for (const title of titles.slice(0, 2)) {
        try {
          const sumUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
          const pr = await fetch(sumUrl);
          const pd = await pr.json();
          if (pd.extract && pd.extract.length > 60) return pd.extract.split(/[.!?]/)[0] + '.';
        } catch { }
      }
    } catch { }
    return "";
  },
  async _askClaude(query, token) {
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are Player AI, a helpful voice assistant. Answer the user's question concisely in 1-3 sentences, suitable for text-to-speech. Be direct and informative.",
          messages: [{ role: "user", content: query }]
        })
      });
      const data = await resp.json();
      if (data.content && data.content[0] && data.content[0].text) {
        App.speak(data.content[0].text, token);
      } else {
        App.speak("Sorry, I could not find a clear answer to that.", token);
      }
    } catch (e) {
      App.speak("Sorry, I could not find a clear answer to that.", token);
    }
  }
};

// ============================================================================
// NEWS FETCHER (BBC RSS)
// ============================================================================
async function fetchNews(token) {
  App.appendChat("System", "📰 Fetching latest headlines…");

  // ── Method 1: Hacker News Firebase API ──
  // This is the ONLY news API that works from file:// (null origin)
  // because Firebase uses Access-Control-Allow-Origin: * unconditionally
  try {
    const idsRes = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    );
    if (!idsRes.ok) throw new Error('ids failed');
    const ids = await idsRes.json();

    const stories = await Promise.all(
      ids.slice(0, 5).map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then(r => r.json())
      )
    );

    const titles = stories
      .map(s => s && s.title ? s.title.trim() : null)
      .filter(Boolean);

    if (titles.length >= 2) {
      App.appendChat("News", `📰 Top ${titles.length} tech headlines (Hacker News):`);
      titles.forEach((t, i) => App.appendChat("News", `${i + 1}. ${t}`));
      Voice.speak(
        `Here are today's top ${titles.length} headlines. ` +
        titles.map((t, i) => `${i + 1}. ${t}`).join('. '),
        token
      );
      return;
    }
  } catch (e) {
    console.warn('HN fetch failed:', e.message);
  }

  // ── Method 2: Wikipedia Current Events (also CORS-open via origin=*) ──
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/feed/featured/${year}/${month}/${day}`
    );
    if (!res.ok) throw new Error('wiki failed');
    const data = await res.json();

    const newsItems = data.news || [];
    const titles = newsItems
      .slice(0, 5)
      .map(item => {
        // Each item has a 'story' field in HTML; strip tags
        const raw = item.story || '';
        return raw.replace(/<[^>]*>/g, '').split('–')[0].trim();
      })
      .filter(t => t.length > 10);

    if (titles.length >= 2) {
      App.appendChat("News", `📰 Wikipedia In the News (${day}/${month}/${year}):`);
      titles.forEach((t, i) => App.appendChat("News", `${i + 1}. ${t}`));
      Voice.speak(
        `Here are today's news items from Wikipedia. ` +
        titles.map((t, i) => `${i + 1}. ${t}`).join('. '),
        token
      );
      return;
    }
  } catch (e) {
    console.warn('Wikipedia fetch failed:', e.message);
  }

  // ── Method 3: Open news site in new tab as guaranteed fallback ──
  App.appendChat("News",
    "⚠️ Live news APIs are blocked when running from a local file (CORS restriction).\n" +
    "📰 Opening BBC News in a new tab instead…"
  );
  App.speak("Opening BBC News in a new tab.", token);
  setTimeout(() => window.open('https://www.bbc.com/news', '_blank'), 800);
}

// ============================================================================
// FILE SYSTEM ACCESS (local folder)
// ============================================================================
const FileSystem = {
  dirHandle: null,
  fileCache: new Map(),

  async requestDirectory() {
    if (!window.showDirectoryPicker) {
      App.appendChat("System", "❌ Your browser does not support the File System Access API. Please use Chrome/Edge/Opera over HTTPS or localhost.");
      return false;
    }
    try {
      this.dirHandle = await window.showDirectoryPicker();
      App.appendChat("System", `✅ Granted access to folder: ${this.dirHandle.name}`);
      await this.buildFileCache();
      return true;
    } catch (err) {
      if (err.name !== 'AbortError') App.appendChat("System", `❌ Failed to open folder: ${err.message}`);
      return false;
    }
  },

  async buildFileCache() {
    if (!this.dirHandle) return;
    this.fileCache.clear();
    const entries = [];
    for await (const entry of this.dirHandle.values()) {
      if (entry.kind === 'file') {
        entries.push(entry.name);
        this.fileCache.set(entry.name, entry);
      }
    }
    App.appendChat("System", `📁 Found ${entries.length} files in root of "${this.dirHandle.name}". Use "list files" to see them.`);
    if (entries.length > 0 && entries.length < 50) {
      App.appendChat("System", `Files: ${entries.join(', ')}`);
    } else if (entries.length >= 50) {
      App.appendChat("System", `Too many files to list directly. Use "search files for <text>" to find something.`);
    }
  },

  async listFiles() {
    if (!this.dirHandle) return "Please grant access first: say 'open folder'.";
    const files = [];
    for await (const entry of this.dirHandle.values()) {
      if (entry.kind === 'file') files.push(entry.name);
    }
    if (files.length === 0) return "No files found in the selected folder.";
    return `📄 Files in "${this.dirHandle.name}":\n${files.sort().join('\n')}`;
  },

  async readFile(filename) {
    if (!this.dirHandle) return "No folder selected. Say 'open folder' first.";
    let fileHandle = this.fileCache.get(filename);
    if (!fileHandle) {
      for (let [name, handle] of this.fileCache.entries()) {
        if (name.toLowerCase() === filename.toLowerCase()) {
          fileHandle = handle;
          filename = name;
          break;
        }
      }
      if (!fileHandle) return `File "${filename}" not found in the selected folder. Use "list files" to see available files.`;
    }
    const file = await fileHandle.getFile();
    const ext = filename.split('.').pop().toLowerCase();
    const textExts = ['txt', 'json', 'md', 'js', 'html', 'css', 'py', 'cpp', 'java', 'c', 'h', 'php', 'rb', 'go', 'rs', 'sql', 'xml', 'yaml', 'yml', 'log', 'ini', 'cfg'];
    if (textExts.includes(ext) || file.type.startsWith('text/')) {
      const content = await file.text();
      const preview = content.length > 2000 ? content.slice(0, 2000) + "\n... (truncated)" : content;
      return `📄 Content of "${filename}":\n${preview}`;
    } else if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      window.open(url, '_blank');
      return `🖼️ Image "${filename}" opened in a new tab.`;
    } else {
      return `⚠️ File "${filename}" is not a text file (type: ${file.type || 'unknown'}). Cannot display content.`;
    }
  },

  async searchFiles(query) {
    if (!this.dirHandle) return "No folder selected. Say 'open folder' first.";
    const results = [];
    for (let [name, handle] of this.fileCache.entries()) {
      const file = await handle.getFile();
      if (file.size > 500000) continue;
      try {
        const content = await file.text();
        if (content.toLowerCase().includes(query.toLowerCase())) {
          results.push(name);
        }
      } catch (e) { }
    }
    if (results.length === 0) return `No files containing "${query}" found.`;
    return `🔍 Found ${results.length} file(s) containing "${query}":\n${results.join('\n')}`;
  },

  async openFile(filename) { return this.readFile(filename); },

  getDirectoryInfo() {
    if (!this.dirHandle) return "No directory selected.";
    return `📁 Current directory: ${this.dirHandle.name}\nTotal files cached: ${this.fileCache.size}`;
  }
};

// ============================================================================
// AUTOMATION ENGINE (handles commands, file access, desktop apps)
// ============================================================================
const Automation = {
  async handle(command) {
    const cmd = command.trim();
    const cmdL = cmd.toLowerCase();

    if (cmdL === 'open folder' || cmdL === 'select folder' || cmdL === 'open directory') {
      const success = await FileSystem.requestDirectory();
      return success ? "Folder selected. You can now list files, read them, or search within them." : "Failed to select folder.";
    }
    if (cmdL === 'list files' || cmdL === 'show files' || cmdL === 'directory list') {
      return await FileSystem.listFiles();
    }
    if (cmdL === 'directory info' || cmdL === 'folder info') {
      return FileSystem.getDirectoryInfo();
    }
    const readMatch = cmdL.match(/^(?:read|show|display)\s+file\s+(.+)$/i);
    if (readMatch) return await FileSystem.readFile(readMatch[1].trim());
    const openMatch = cmdL.match(/^(?:open\s+file)\s+(.+)$/i);
    if (openMatch) return await FileSystem.openFile(openMatch[1].trim());
    const searchMatch = cmdL.match(/^(?:search\s+files?\s+for|find\s+in\s+files)\s+(.+)$/i);
    if (searchMatch) return await FileSystem.searchFiles(searchMatch[1].trim());

    const typeMatch = cmdL.match(/^(?:please\s+)?(?:type|write)\s+(?:out\s+)?["']?(.+?)["']?\s*$/i);
    if (typeMatch) return await Clipboard.writeText(typeMatch[1].trim());
    const copyMatch = cmdL.match(/^copy\s+["']?(.+?)["']?\s*$/i);
    if (copyMatch) return await Clipboard.writeText(copyMatch[1].trim());

    for (const prefix of ["go to ", "navigate to ", "visit ", "open website ", "open site "]) {
      if (cmdL.startsWith(prefix)) {
        const rest = cmdL.slice(prefix.length).trim();
        return this._openSite(rest);
      }
    }

    const sm = cmdL.match(/^search(?:\s+for)?\s+["']?(.+?)["']?\s+on\s+(\w+)\s*$/);
    if (sm) return this._searchOnSite(sm[1].trim(), sm[2].trim());
    const gm = cmdL.match(/^(?:google|search)\s+["']?(.+?)["']?\s*$/);
    if (gm) return this._searchOnSite(gm[1].trim(), "google");

    const om = cmdL.match(/^(?:open|launch|start)\s+(.+?)\s*$/);
    if (om) return this._openApp(om[1].trim());

    const fm = cmdL.match(/^open\s+(?:file|folder)\s+(.+)$/);
    if (fm) return this._openFile(fm[1]);

    return null;
  },

  _openSite(site) {
    const clean = site.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
    for (const [k, url] of Object.entries(SITE_MAP)) {
      if (k === clean || clean.includes(k) || k.includes(clean)) {
        window.open(url, '_blank');
        return `Opening ${k.charAt(0).toUpperCase() + k.slice(1)}`;
      }
    }
    if (site.includes('.')) {
      const url = site.startsWith('http') ? site : 'https://' + site;
      window.open(url, '_blank');
      return `Opening ${site}`;
    }
    return null;
  },

  _searchOnSite(query, site) {
    const q = encodeURIComponent(query);
    const urls = {
      google: `https://www.google.com/search?q=${q}`,
      youtube: `https://www.youtube.com/results?search_query=${q}`,
      bing: `https://www.bing.com/search?q=${q}`,
      amazon: `https://www.amazon.com/s?k=${q}`,
      reddit: `https://www.reddit.com/search/?q=${q}`,
      github: `https://github.com/search?q=${q}`,
      twitter: `https://twitter.com/search?q=${q}`,
      x: `https://x.com/search?q=${q}`,
      linkedin: `https://www.linkedin.com/search/results/all/?keywords=${q}`,
      wikipedia: `https://en.wikipedia.org/w/index.php?search=${q}`,
      stackoverflow: `https://stackoverflow.com/search?q=${q}`,
      pinterest: `https://www.pinterest.com/search/pins/?q=${q}`
    };
    const url = urls[site] || `https://www.google.com/search?q=site:${site}.com+${q}`;
    window.open(url, '_blank');
    return `Searching "${query}" on ${site.charAt(0).toUpperCase() + site.slice(1)}`;
  },

  _openApp(name) {
    const n = name.toLowerCase().trim();

    for (const [k, url] of Object.entries(SITE_MAP)) {
      if (k === n || n === k || n.includes(k) || k.includes(n)) {
        window.open(url, '_blank');
        return `Opening ${k} (web version)`;
      }
    }

    const protocolMap = {
      calculator: 'calculator:', calc: 'calculator:', camera: 'microsoft.camera:',
      photos: 'ms-photos:', 'snipping tool': 'ms-screensketch:', 'snip & sketch': 'ms-screensketch:',
      'sticky notes': 'ms-stickynotes:', alarms: 'ms-clock:', clock: 'ms-clock:',
      calendar: 'outlookcal:', mail: 'mailto:', settings: 'ms-settings:',
      'control panel': 'ms-settings:controlpanel', 'file explorer': 'explorer:',
      notepad: 'notepad:', wordpad: 'wordpad:', paint: 'mspaint:',
      word: 'ms-word:', excel: 'ms-excel:', powerpoint: 'ms-powerpoint:',
      outlook: 'outlook:', onenote: 'onenote:', vscode: 'vscode://',
      'visual studio code': 'vscode://', discord: 'discord://', spotify: 'spotify:',
      steam: 'steam://', zoom: 'zoommtg:', slack: 'slack://', teams: 'msteams:',
      'github desktop': 'github-windows://', figma: 'figma://', notion: 'notion://',
      telegram: 'tg://', whatsapp: 'whatsapp://', blender: 'blender://', unity: 'unityhub://',
      xbox: 'xbox://', netflix: 'netflix://'
    };
    let protocol = null;
    for (const [key, proto] of Object.entries(protocolMap)) {
      if (n === key || n.includes(key) || key.includes(n)) {
        protocol = proto;
        break;
      }
    }
    if (protocol) {
      try {
        window.open(protocol, '_blank');
        return `Attempting to open ${name} using ${protocol}. If it doesn't open, the app may not be installed or the protocol isn't registered.`;
      } catch (e) { }
    }

    const specialHints = {
      'task manager': 'Press Ctrl+Shift+Esc on your keyboard.',
      cmd: 'Press Win+R, type "cmd" and press Enter.',
      'command prompt': 'Press Win+R, type "cmd" and press Enter.',
      powershell: 'Press Win+X and select "Terminal" or "PowerShell".',
      'registry editor': 'Press Win+R, type "regedit" and press Enter.',
      'device manager': 'Press Win+X and select "Device Manager".',
      'disk cleanup': 'Press Win+R, type "cleanmgr" and press Enter.',
      defragment: 'Press Win+R, type "dfrgui" and press Enter.',
      'system information': 'Press Win+R, type "msinfo32" and press Enter.',
      'event viewer': 'Press Win+R, type "eventvwr" and press Enter.',
      services: 'Press Win+R, type "services.msc" and press Enter.',
      'performance monitor': 'Press Win+R, type "perfmon" and press Enter.',
      'resource monitor': 'Press Win+R, type "resmon" and press Enter.',
      dxdiag: 'Press Win+R, type "dxdiag" and press Enter.',
      firewall: 'Press Win+R, type "firewall.cpl" and press Enter.'
    };
    for (const [key, hint] of Object.entries(specialHints)) {
      if (n === key || n.includes(key) || key.includes(n)) {
        return `💡 ${hint}`;
      }
    }

    for (const [key, alt] of Object.entries(DESKTOP_APP_WEB_ALT)) {
      if (n === key || n.includes(key) || key.includes(n)) {
        if (alt.action === 'notepad') { Notepad.open(); return `Opening Notepad (built‑in).`; }
        if (alt.action === 'hint') { return `💡 ${alt.hint}`; }
        if (alt.url) {
          window.open(alt.url, '_blank');
          return `🌐 "${alt.label || key}" opened in browser (web version). For the desktop app, install it on your PC.`;
        }
      }
    }

    return `⚠️ "${name}" is a desktop‑only app. I cannot directly launch it from a web browser for security reasons.\n💡 You can try:\n   • Press Win and type the app name, then press Enter.\n   • Use a custom protocol if the app supports it (e.g. "vscode://", "spotify:").\n   • For full desktop integration, run this page inside an Electron app.`;
  },

  _openFile(name) {
    return `⚠️ Opening local files directly by path is not supported in the browser for security reasons. However, you can:\n   • Say "open folder" to grant access to a directory, then "read file ${name}" if it exists there.\n   • Use cloud storage like Google Drive, OneDrive, or Dropbox.`;
  }
};

// ============================================================================
// CAMERA SCANNER (Face, Body)
// ============================================================================
const CamScanner = {
  _resolve: null, _reject: null, _stream: null, _mode: null,

  cancel() {
    document.getElementById('camera-modal').classList.add('hidden');
    if (this._stream) { this._stream.getTracks().forEach(t => t.stop()); this._stream = null; }
    if (this._reject) this._reject(new Error("Cancelled"));
    this._resolve = this._reject = null;
  },

  _blankFace() { const p = { timestamp: null }; FACE_PARTS.forEach(f => p[f.field] = ""); return p; },
  _blankBody() { const p = { timestamp: null }; BODY_PARTS.forEach(b => p[b.key] = ""); return p; },

  async scanFace() {
    return new Promise(async (resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
      this._mode = 'face';
      const modal = document.getElementById('camera-modal');
      const video = document.getElementById('camera-video');
      const status = document.getElementById('camera-status');
      modal.classList.remove('hidden');
      status.textContent = 'Starting camera…';
      try {
        this._stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
        video.srcObject = this._stream;
        await video.play();
        status.textContent = 'Loading Face Mesh model…';
        const faceMesh = new FaceMesh({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${f}` });
        faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
        let shots = 0, profile = this._blankFace(), frameCount = 0;
        status.textContent = 'Shot 1/3 — Smile for the camera!';
        faceMesh.onResults(results => {
          frameCount++;
          if (frameCount % 30 === 0 && shots < 3) {
            shots++;
            status.textContent = shots < 3 ? `Shot ${shots + 1}/3 — Hold still…` : 'Processing…';
            if (results.multi_face_landmarks && results.multi_face_landmarks.length > 0) {
              const lm = results.multi_face_landmarks[0].landmark;
              const w = video.videoWidth || 640, h = video.videoHeight || 480;
              const p = this._analyseFace(lm, w, h, video);
              if (shots === 3) {
                Object.assign(profile, p);
                profile.timestamp = new Date().toLocaleString();
                if (this._stream) { this._stream.getTracks().forEach(t => t.stop()); this._stream = null; }
                modal.classList.add('hidden');
                faceMesh.close();
                this._resolve(profile);
              }
            } else if (shots === 3) {
              FACE_PARTS.forEach(f => profile[f.field] = "Undetected");
              profile.timestamp = new Date().toLocaleString();
              if (this._stream) { this._stream.getTracks().forEach(t => t.stop()); this._stream = null; }
              modal.classList.add('hidden');
              faceMesh.close();
              this._resolve(profile);
            }
          }
        });
        const camera = new Camera(video, { onFrame: async () => { await faceMesh.send({ image: video }); }, width: 640, height: 480 });
        camera.start();
      } catch (e) {
        modal.classList.add('hidden');
        if (this._stream) { this._stream.getTracks().forEach(t => t.stop()); this._stream = null; }
        reject(e);
      }
    });
  },

  _analyseFace(lm, w, h, video) {
    const profile = this._blankFace();
    const pt = i => ({ x: lm[i].x * w, y: lm[i].y * h });
    const chin = pt(152), leftJaw = pt(234), rightJaw = pt(454);
    const jawW = Math.abs(rightJaw.x - leftJaw.x);
    const jawH = Math.abs(chin.y - ((leftJaw.y + rightJaw.y) / 2));
    const jr = jawW / Math.max(1, jawH);
    profile.face_shape = jr > 1.3 ? "Rectangle / Square" : jr > 1.1 ? "Oval" : jr > 0.9 ? "Round" : "Diamond / Heart";
    profile.jawline_shape = jr > 1.4 ? "Wide / Square" : jr > 1.1 ? "Rounded" : jr < 0.9 ? "Narrow / Oval" : "Defined Square";
    try {
      const cnv = document.createElement('canvas');
      cnv.width = video.videoWidth;
      cnv.height = video.videoHeight;
      cnv.getContext('2d').drawImage(video, 0, 0);
      const cx2 = Math.floor(lm[50].x * w), cy2 = Math.floor(lm[50].y * h);
      const px = cnv.getContext('2d').getImageData(cx2, cy2, 5, 5).data;
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < px.length; i += 4) { r += px[i]; g += px[i + 1]; b += px[i + 2]; }
      const n = px.length / 4;
      r /= n; g /= n; b /= n;
      const br = (r + g + b) / 3;
      profile.skin_tone = br > 200 ? "Very Fair" : br > 170 ? "Fair" : br > 140 ? "Medium" : br > 100 ? "Olive / Tan" : br > 70 ? "Brown" : "Dark Brown";
    } catch { profile.skin_tone = "Medium"; }
    const lew = Math.abs(pt(33).x - pt(133).x), rew = Math.abs(pt(362).x - pt(263).x);
    const ew = (lew + rew) / 2;
    profile.eye_structure = ew < 28 ? "Almond / Small" : ew >= 45 ? "Large / Wide" : "Round / Medium";
    const nl = pt(129), nr = pt(358), nt = pt(1), nb = pt(168);
    const nrv = Math.abs(nr.x - nl.x) / Math.max(1, Math.abs(nt.y - nb.y));
    profile.nose_structure = nrv > 0.7 ? "Broad / Button" : nrv < 0.4 ? "Narrow / Pointed" : "Straight / Medium";
    const fh = Math.abs(pt(10).y - pt(151).y) / h;
    profile.hair_type = fh > 0.1 ? "Wavy / Medium" : fh > 0.08 ? "Straight / Fine" : "Short / Bald";
    try {
      const li = pt(70), lo = pt(46), lp = pt(63);
      const bw = Math.abs(lo.x - li.x), arch = Math.abs(lp.y - ((li.y + lo.y) / 2));
      const ar = arch / Math.max(1, bw);
      profile.eyebrow_shape = ar > 0.25 ? "High Arch" : ar > 0.12 ? "Soft Arch" : "Flat / Straight";
    } catch { profile.eyebrow_shape = "Natural"; }
    profile.eyelash_density = "Medium";
    const chHeight = Math.abs(chin.y - ((leftJaw.y + rightJaw.y) / 2));
    profile.chin_shape = chHeight < 20 ? "Short / Soft" : chHeight >= 40 ? "Prominent / Long" : "Average";
    return profile;
  },

  async scanBody() {
    return new Promise(async (resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
      this._mode = 'body';
      const modal = document.getElementById('camera-modal');
      const video = document.getElementById('camera-video');
      const status = document.getElementById('camera-status');
      modal.classList.remove('hidden');
      status.textContent = 'Starting camera for body scan…';
      try {
        this._stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
        video.srcObject = this._stream;
        await video.play();
        status.textContent = 'Loading Pose model…';
        const pose = new Pose({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5/${f}` });
        pose.setOptions({ modelComplexity: 1, smoothLandmarks: true, enableSegmentation: false, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
        let shots = 0, profile = this._blankBody(), frameCount = 0;
        status.textContent = 'Shot 1/3 — Stand in front of camera!';
        pose.onResults(results => {
          frameCount++;
          if (frameCount % 30 === 0 && shots < 3) {
            shots++;
            status.textContent = shots < 3 ? `Shot ${shots + 1}/3 — Hold still…` : 'Processing…';
            if (results.poseLandmarks) {
              const lm = results.poseLandmarks;
              const w = video.videoWidth || 640, h = video.videoHeight || 480;
              const p = this._analyseBody(lm, w, h);
              if (shots === 3) {
                Object.assign(profile, p);
                profile.timestamp = new Date().toLocaleString();
                if (this._stream) { this._stream.getTracks().forEach(t => t.stop()); this._stream = null; }
                modal.classList.add('hidden');
                pose.close();
                this._resolve(profile);
              }
            } else if (shots === 3) {
              BODY_PARTS.forEach(b => profile[b.key] = "Undetected");
              profile.timestamp = new Date().toLocaleString();
              if (this._stream) { this._stream.getTracks().forEach(t => t.stop()); this._stream = null; }
              modal.classList.add('hidden');
              pose.close();
              this._resolve(profile);
            }
          }
        });
        const camera = new Camera(video, { onFrame: async () => { await pose.send({ image: video }); }, width: 640, height: 480 });
        camera.start();
      } catch (e) {
        modal.classList.add('hidden');
        if (this._stream) { this._stream.getTracks().forEach(t => t.stop()); this._stream = null; }
        reject(e);
      }
    });
  },

  _analyseBody(lm, w, h) {
    const profile = this._blankBody();
    const pt = idx => ({ x: lm[idx].x * w, y: lm[idx].y * h });
    const ls = pt(11), rs = pt(12), lh = pt(23), rh = pt(24), no = pt(0), la = pt(27), lk = pt(25), rk = pt(26);
    const sw = Math.abs(rs.x - ls.x), hw = Math.abs(rh.x - lh.x), ht = Math.abs(la.y - no.y);
    const nw = sw * 0.4;
    profile.neck = nw > w * 0.15 ? "Thick / Muscular" : nw <= w * 0.1 ? "Slender" : "Average";
    profile.shoulders = sw > w * 0.45 ? "Very Broad" : sw > w * 0.35 ? "Broad" : sw <= w * 0.25 ? "Narrow" : "Average";
    const r = sw / Math.max(1, hw);
    profile.chest = r > 1.4 ? "V-Shape / Defined" : r > 1.2 ? "Athletic" : r <= 1.0 ? "Narrow" : "Average";
    const tl = Math.abs(lh.y - no.y);
    profile.abs = tl < h * 0.25 ? "Compact / Defined" : tl >= h * 0.35 ? "Long / Lean" : "Average";
    profile.waist = hw < w * 0.2 ? "Slim" : hw >= w * 0.3 ? "Wide" : "Average";
    profile.hips = hw > w * 0.35 ? "Wide" : hw <= w * 0.25 ? "Narrow" : "Average";
    profile.biceps = "Average"; profile.triceps = "Average"; profile.fists = "Average"; profile.forearms = "Average";
    profile.back = (sw / Math.max(1, ht)) > 0.45 ? "Wide / V-Taper" : (sw / Math.max(1, ht)) <= 0.35 ? "Narrow" : "Average";
    const kw = Math.abs(rk.x - lk.x);
    profile.legs = kw > w * 0.3 ? "Muscular / Thick" : kw <= w * 0.2 ? "Slim" : "Average";
    const cl = Math.abs(la.y - lk.y);
    profile.calves = cl > h * 0.2 ? "Well developed" : "Average";
    return profile;
  }
};

// ============================================================================
// HAND GESTURE CONTROL (air mouse) 
// ============================================================================
const HandCtrl = {
  _running: false,
  _cursor: null,
  _video: null,
  _hands: null,
  _rafId: null,
  _escHandler: null,
  _lastClickTime: 0,

  async start() {
    if (this._running) return;
    const video = document.getElementById('rightPanelWebcam');
    if (!video || !video.srcObject) return;

    this._video = video;
    this._running = true;

    if (!this._cursor) {
      this._cursor = document.createElement('div');
      this._cursor.id = 'hand-cursor';
      this._cursor.style.cssText = `position:fixed; width:28px; height:28px; border-radius:50%; background:#7b68ee; border:2px solid white; pointer-events:none; z-index:100000; transform:translate(-50%,-50%); display:none; box-shadow:0 0 10px #7b68ee;`;
      document.body.appendChild(this._cursor);
    }

    if (typeof Hands === 'undefined') throw new Error("MediaPipe Hands not loaded.");
    this._hands = new Hands({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/${f}` });
    this._hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.7 });

    let smoothX = window.innerWidth / 2, smoothY = window.innerHeight / 2;
    const SMOOTH = 0.25;

    this._hands.onResults((results) => {
      if (!this._running) return;
      if (results.multiHandLandmarks?.length) {
        const lm = results.multiHandLandmarks[0];
        const idxTip = lm[8];
        const idxDip = lm[7];
        const idxPip = lm[6];
        const rawX = (1 - idxTip.x) * window.innerWidth;
        const rawY = idxTip.y * window.innerHeight;
        smoothX = smoothX * (1 - SMOOTH) + rawX * SMOOTH;
        smoothY = smoothY * (1 - SMOOTH) + rawY * SMOOTH;
        this._cursor.style.display = 'block';
        this._cursor.style.left = smoothX + 'px';
        this._cursor.style.top = smoothY + 'px';

        // Pinch click (index finger)
        if (idxTip.y > idxDip.y && idxTip.y > idxPip.y && Date.now() - this._lastClickTime > 400) {
          this._lastClickTime = Date.now();
          this._cursor.classList.add('clicking');
          setTimeout(() => this._cursor.classList.remove('clicking'), 150);
          const el = document.elementFromPoint(smoothX, smoothY);
          if (el) el.click();
        }
      } else {
        this._cursor.style.display = 'none';
      }
    });

    // Manual frame loop – DOES NOT replace video.srcObject
    const processFrame = async () => {
      if (!this._running) return;
      if (this._video && this._video.readyState >= 2) {
        await this._hands.send({ image: this._video });
      }
      this._rafId = requestAnimationFrame(processFrame);
    };
    processFrame();

    this._escHandler = (e) => { if (e.key === 'Escape') this.stop(); };
    document.addEventListener('keydown', this._escHandler);
  },

  stop() {
    this._running = false;
    if (this._cursor) this._cursor.style.display = 'none';
    if (this._rafId) cancelAnimationFrame(this._rafId);
    if (this._hands) this._hands.close();
    if (this._escHandler) document.removeEventListener('keydown', this._escHandler);
    // ⚠️ DO NOTHING with the video element – webcam keeps running
  }
};

// ============================================================================
// MODALS (UI for face, body, goals, todo, schedule)
// ============================================================================
const Modals = {
  _current: null,
  _faceInputs: {},
  _bodyInputs: {},
  _goalTaskState: {},
  _todoState: [],
  _schedState: {},

  show(id) {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById(id);
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    // Force reflow once for smooth transition
    modal.offsetHeight;
    this._current = id;
  },
  close() {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    this._current = null;
  },
  closeOnOverlay(e) { if (e.target.id === 'modal-overlay') this.close(); },

  openFace() {
    const p = Store.faceProfile();
    document.getElementById('face-ts').textContent = p.timestamp ? `Last scan: ${p.timestamp}` : 'Not scanned yet';
    const body = document.getElementById('face-body');
    body.innerHTML = '';
    this._faceInputs = {};
    FACE_PARTS.forEach(part => {
      const row = document.createElement('div');
      row.className = 'profile-row';
      const val = p[part.field] || '';
      row.innerHTML = `<span class="row-icon">${part.icon}</span>
                   <span class="row-label">${part.label}</span>
                   <input class="row-input" data-field="${part.field}" value="${escHtml(val)}" placeholder="— not set —">`;
      body.appendChild(row);
      this._faceInputs[part.field] = row.querySelector('input');
    });
    this.show('face-modal');
  },
  async scanFace() {
    this.close();
    try {
      App.appendChat("System", "📷 Starting face scan… Please look at the camera.");
      const profile = await CamScanner.scanFace();
      Store.set('face_profile', profile);
      ProgressRank.update();
      App.appendChat("System", "✅ Face scan complete! Profile updated.");
      this.openFace();
    } catch (e) {
      App.appendChat("System", "❌ Face scan failed: " + (e.message || "Camera not available"));
      this.openFace();
    }
  },
  saveFace() {
    const p = Store.faceProfile();
    FACE_PARTS.forEach(part => {
      const inp = this._faceInputs[part.field];
      if (inp) p[part.field] = inp.value.trim();
    });
    Store.set('face_profile', p);
    ProgressRank.update();
    App.appendChat("System", "✅ Face profile saved.");
    this.close();
  },

  openBody() {
    const p = Store.bodyProfile();
    document.getElementById('body-ts').textContent = p.timestamp ? `Last scan: ${p.timestamp}` : 'Not scanned yet';
    const body = document.getElementById('body-body');
    body.innerHTML = '';
    this._bodyInputs = {};
    BODY_PARTS.forEach(part => {
      const row = document.createElement('div');
      row.className = 'profile-row';
      const val = p[part.key] || '';
      row.innerHTML = `<span class="row-icon">${part.icon}</span>
                   <span class="row-label">${part.label}</span>
                   <input class="row-input" data-key="${part.key}" value="${escHtml(val)}" placeholder="— not set —">`;
      body.appendChild(row);
      this._bodyInputs[part.key] = row.querySelector('input');
    });
    this.show('body-modal');
  },
  async scanBody() {
    this.close();
    try {
      App.appendChat("System", "📷 Starting body scan… Stand back from camera, full body visible.");
      const profile = await CamScanner.scanBody();
      Store.set('body_profile', profile);
      ProgressRank.update();
      App.appendChat("System", "✅ Body scan complete! Profile updated.");
      this.openBody();
    } catch (e) {
      App.appendChat("System", "❌ Body scan failed: " + (e.message || "Camera not available"));
      this.openBody();
    }
  },
  saveBody() {
    const p = Store.bodyProfile();
    BODY_PARTS.forEach(part => {
      const inp = this._bodyInputs[part.key];
      if (inp) p[part.key] = inp.value.trim();
    });
    Store.set('body_profile', p);
    ProgressRank.update();
    App.appendChat("System", "✅ Body profile saved.");
    this.close();
  },

  openGoals() {
    const body = document.getElementById('goal-body');
    if (body && !body.querySelector('#goalsContainer')) {
      body.innerHTML = '<div id="goalsContainer" class="goals-grid"></div>';
    }
    GoalManager.init('goalsContainer');
    this.show('goal-modal');
  },
  // Keep stubs for old methods that might be called elsewhere (e.g., from radar)
  _toggleTf() { },
  _renderGoalTasks() { },
  _addGoalTask() { },
  _goalTaskCheck() { },
  _goalTaskText() { },
  _delGoalTask() { },
  saveGoals() {
    // Already auto-saved by GoalManager
    App.appendChat("System", "✅ Goals saved.");
    this.close();
  },

  openTodo() {
    this._ensureTodoHtml();
    this._loadMyTasks();
    this.show('todo-modal');
    this._updateTodoCounter();
  },

  _ensureTodoHtml() {
    if (document.getElementById('mytodo-tbody')) return;
    // The HTML must already contain the new structure (see HTML changes below).
    // Attach event listeners once.
    this._bindTodoEvents();
  },

  _bindTodoEvents() {
    // Add task button
    const addBtn = document.getElementById('mytodo-add-btn');
    if (addBtn && !addBtn._bound) {
      addBtn.addEventListener('click', () => this.addTodoTask());
      addBtn._bound = true;
    }
    // Search
    const searchInput = document.getElementById('mytodo-search');
    const clearSearch = document.getElementById('mytodo-clear-search');
    if (searchInput && !searchInput._bound) {
      searchInput.addEventListener('input', (e) => {
        this._renderTodoTable(e.target.value);
        if (clearSearch) clearSearch.style.display = e.target.value ? 'inline-block' : 'none';
      });
      searchInput._bound = true;
    }
    if (clearSearch && !clearSearch._bound) {
      clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        this._renderTodoTable('');
        clearSearch.style.display = 'none';
      });
      clearSearch._bound = true;
    }
    // Edit modal buttons
    const saveEdit = document.getElementById('mytodo-save-edit');
    const cancelEdit = document.getElementById('mytodo-cancel-edit');
    const editModalDiv = document.getElementById('mytodo-edit-modal');
    if (saveEdit && !saveEdit._bound) {
      saveEdit.addEventListener('click', () => this._saveEdit());
      saveEdit._bound = true;
    }
    if (cancelEdit && !cancelEdit._bound) {
      cancelEdit.addEventListener('click', () => this._closeEditModal());
      cancelEdit._bound = true;
    }
    if (editModalDiv && !editModalDiv._bound) {
      editModalDiv.addEventListener('click', (e) => {
        if (e.target === editModalDiv) this._closeEditModal();
      });
      editModalDiv._bound = true;
    }
  },

  _loadMyTasks() {
    const stored = localStorage.getItem('mytodo_tasks');
    if (stored) {
      this._myTasks = JSON.parse(stored);
    } else {
      this._myTasks = [];
      this._saveMyTasks();
    }
    this._renderTodoTable();
  },

  _saveMyTasks() {
    localStorage.setItem('mytodo_tasks', JSON.stringify(this._myTasks));
    // Also update the old 'todo' store for progress rank (convert to {text, done})
    const oldFormat = this._myTasks.map(t => ({ text: t.title, done: t.done }));
    Store.set('todo', oldFormat);
    ProgressRank.update();
    this._updateTodoCounter();
  },

  _renderTodoTable(filterText = '') {
    const tbody = document.getElementById('mytodo-tbody');
    if (!tbody) return;
    let filtered = this._myTasks;
    if (filterText.trim()) {
      const f = filterText.toLowerCase();
      filtered = this._myTasks.filter(t => t.title.toLowerCase().includes(f) || t.desc.toLowerCase().includes(f));
    }
    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6">✨ No tasks. Create one above!</td></tr>';
      return;
    }
    tbody.innerHTML = '';
    filtered.forEach((task, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${idx + 1}</td>
      <td><strong>${escHtml(task.title)}</strong></td>
      <td>${escHtml(task.desc) || '—'}</td>
      <td>${task.createdAt}</td>
      <td><input type="checkbox" class="todo-done-check" data-id="${task.id}" ${task.done ? 'checked' : ''}></td>
      <td class="mytodo-actions">
        <button class="mytodo-edit-btn" data-id="${task.id}">✏️ Edit</button>
        <button class="mytodo-delete-btn" data-id="${task.id}">🗑️ Delete</button>
      </td>
    `;
      tbody.appendChild(row);
    });
    // Bind checkboxes
    document.querySelectorAll('.todo-done-check').forEach(chk => {
      if (chk._bound) return;
      chk.addEventListener('change', (e) => {
        const id = parseInt(chk.dataset.id);
        const task = this._myTasks.find(t => t.id === id);
        if (task) {
          task.done = chk.checked;
          this._saveMyTasks();
          this._renderTodoTable(document.getElementById('mytodo-search')?.value || '');
        }
      });
      chk._bound = true;
    });
    // Bind edit/delete buttons
    document.querySelectorAll('.mytodo-edit-btn').forEach(btn => {
      if (btn._bound) return;
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.dataset.id);
        this._openEditModal(id);
      });
      btn._bound = true;
    });
    document.querySelectorAll('.mytodo-delete-btn').forEach(btn => {
      if (btn._bound) return;
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.dataset.id);
        this._deleteTaskById(id);
      });
      btn._bound = true;
    });
  },

  _openEditModal(id) {
    const task = this._myTasks.find(t => t.id === id);
    if (!task) return;
    this._currentEditId = id;
    const editModal = document.getElementById('mytodo-edit-modal');
    const titleInp = document.getElementById('mytodo-edit-title');
    const descInp = document.getElementById('mytodo-edit-desc');
    if (!editModal || !titleInp) return;
    titleInp.value = task.title;
    descInp.value = task.desc;
    editModal.style.display = 'flex';
  },

  _closeEditModal() {
    const editModal = document.getElementById('mytodo-edit-modal');
    if (editModal) editModal.style.display = 'none';
    this._currentEditId = null;
  },

  _saveEdit() {
    if (!this._currentEditId) return;
    const titleInp = document.getElementById('mytodo-edit-title');
    const descInp = document.getElementById('mytodo-edit-desc');
    const newTitle = titleInp.value.trim();
    if (!newTitle) return;
    const task = this._myTasks.find(t => t.id === this._currentEditId);
    if (task) {
      task.title = newTitle;
      task.desc = descInp.value.trim() || '';
      this._saveMyTasks();
      this._renderTodoTable(document.getElementById('mytodo-search')?.value || '');
    }
    this._closeEditModal();
  },

  _deleteTaskById(id) {
    this._myTasks = this._myTasks.filter(t => t.id !== id);
    this._saveMyTasks();
    this._renderTodoTable(document.getElementById('mytodo-search')?.value || '');
  },

  _addNewTask(title, desc) {
    if (!title.trim()) return false;
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim() || '',
      createdAt: new Date().toLocaleString(),
      done: false
    };
    this._myTasks.unshift(newTask);
    this._saveMyTasks();
    this._renderTodoTable(document.getElementById('mytodo-search')?.value || '');
    return true;
  },

  _updateTodoCounter() {
    const total = this._myTasks.length;
    const done = this._myTasks.filter(t => t.done).length;
    const span = document.getElementById('todo-counter');
    if (span) span.textContent = `${done}/${total} completed`;
  },

  // Save and close (called by footer button)
  saveTodo() {
    this.close();
    App.appendChat("System", "✅ To Do list saved.");
  },

  // Add task from the form (public)
  addTodoTask() {
    const title = document.getElementById('mytodo-title')?.value || '';
    const desc = document.getElementById('mytodo-desc')?.value || '';
    if (this._addNewTask(title, desc)) {
      if (document.getElementById('mytodo-title')) document.getElementById('mytodo-title').value = '';
      if (document.getElementById('mytodo-desc')) document.getElementById('mytodo-desc').value = '';
    } else {
      alert('Title cannot be empty.');
    }
  },

  // Stubs for old methods (to prevent errors)
  _todoCheck() { },
  _todoText() { },
  _delTodo() { },
  _renderTodo() { },

  openSchedule() {
    const body = document.getElementById('schedule-body');
    if (body && !body.querySelector('#weekly-schedule-container')) {
      body.innerHTML = '<div id="weekly-schedule-container" style="width:100%;"></div>';
    }
    WeeklySchedule.init('weekly-schedule-container');
    this.show('schedule-modal');
  },

  _renderSchedTasks(day) { },
  _addSchedTask(day) { },
  _schedCheck(day, i, v) { },
  _schedText(day, i, v) { },
  _delSchedTask(day, i) { },

  saveSchedule() {
    App.appendChat("System", "✅ Weekly schedule saved.");
    this.close();
  },

  showProgress() {
    const p = Store.progress();
    const face = Store.faceProfile();
    const body = Store.bodyProfile();
    const goals = Store.goals();
    const todo = Store.todo();
    const sched = Store.schedule();
    const { rank, overall, looks, physique, goalScore, todoScore, schedScore } = ProgressRank.calculate(face, body, goals, todo, sched);
    alert(`╔═══════════════════════════════╗
║       PROGRESS RANK           ║
╠═══════════════════════════════╣
║  Current Rank :  ${rank.padEnd(3)}          ║
║  Last Year    :  ${(p.last_year_rank || 'E').padEnd(3)}          ║
║  Overall Score:  ${overall.toFixed(1)}%       ║
╠═══════════════════════════════╣
║  Looks        :  ${(looks * 100).toFixed(0)}%           ║
║  Physique     :  ${(physique * 100).toFixed(0)}%           ║
║  Goal Setting :  ${(goalScore * 100).toFixed(0)}%           ║
║  To Do List   :  ${(todoScore * 100).toFixed(0)}%           ║
║  Schedule     :  ${(schedScore * 100).toFixed(0)}%           ║
╠═══════════════════════════════╣
║  Fill in each section to     ║
║  improve your rank!          ║
╚═══════════════════════════════╝`);
  },

  // ============================================================================
  // TO-DO LIST – PAPER & PEN WRITING ANIMATION (FIXED PEN POSITION)
  // ============================================================================
  openTodoWithAnimation() {
    const existing = document.getElementById('todo-anim-overlay');
    if (existing) existing.remove();

    if (!document.getElementById('todo-anim-css')) {
      const style = document.createElement('style');
      style.id = 'todo-anim-css';
      style.textContent = `
      #todo-anim-overlay {
        position: fixed; inset: 0;
        z-index: 9998;
        display: flex; align-items: center; justify-content: center;
        background: rgba(0,0,0,0);
        transition: background 0.38s ease;
        pointer-events: none;
      }
      #todo-anim-overlay.dim { background: rgba(0,0,0,0.86); }

      .todo-anim-container {
        background: #fef8e7;
        border-radius: 8px;
        box-shadow: 0 12px 32px rgba(0,0,0,0.3), 0 0 0 2px #c084fc;
        width: 360px;
        height: 280px;
        position: relative;
        transform: scale(0.85);
        opacity: 0;
        transition: transform 0.35s ease, opacity 0.3s ease;
      }
      .todo-anim-container.show {
        transform: scale(1);
        opacity: 1;
      }
      .todo-anim-container.fadeout {
        opacity: 0;
        transform: scale(1.05);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      .todo-pen {
        position: absolute;
        width: 28px;
        height: 28px;
        pointer-events: none;
        filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.2));
        z-index: 10;
        transition: transform 0.02s linear;
      }
      @keyframes penNibGlow {
        0% { filter: drop-shadow(0 0 0 #c084fc); }
        100% { filter: drop-shadow(0 0 6px #c084fc); }
      }
    `;
      document.head.appendChild(style);
    }

    const overlay = document.createElement('div');
    overlay.id = 'todo-anim-overlay';
    overlay.innerHTML = `
    <div class="todo-anim-container" id="todo-anim-paper">
      <svg viewBox="0 0 360 280" style="position:absolute; top:0; left:0; width:100%; height:100%;">
        <line x1="30" y1="50" x2="330" y2="50" stroke="#e0d5c0" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="30" y1="80" x2="330" y2="80" stroke="#e0d5c0" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="30" y1="110" x2="330" y2="110" stroke="#e0d5c0" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="30" y1="140" x2="330" y2="140" stroke="#e0d5c0" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="30" y1="170" x2="330" y2="170" stroke="#e0d5c0" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="30" y1="200" x2="330" y2="200" stroke="#e0d5c0" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="30" y1="230" x2="330" y2="230" stroke="#e0d5c0" stroke-width="1" stroke-dasharray="3 3"/>
        <text id="todo-writing-text" x="180" y="75" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="bold" fill="#2c2c2c" stroke="#2c2c2c" stroke-width="1.2" stroke-dasharray="200" stroke-dashoffset="200">
          To Do List
        </text>
      </svg>
    </div>
    <svg class="todo-pen" id="todo-pen" viewBox="0 0 24 24" width="28" height="28">
      <path d="M12 2 L7 14 L12 22 L17 14 Z" fill="#2c2c2c" stroke="#7b68ee" stroke-width="1"/>
      <circle cx="12" cy="4" r="1.5" fill="#c084fc"/>
      <path d="M9 14 L12 10 L15 14" fill="none" stroke="#c084fc" stroke-width="1.5"/>
    </svg>
  `;

    document.body.appendChild(overlay);
    const paper = overlay.querySelector('.todo-anim-container');
    const pen = overlay.querySelector('#todo-pen');
    const textElement = overlay.querySelector('#todo-writing-text');

    requestAnimationFrame(() => {
      overlay.classList.add('dim');
      paper.classList.add('show');

      // Get paper's bounding rectangle relative to viewport
      const paperRect = paper.getBoundingClientRect();
      const textRect = textElement.getBoundingClientRect();

      // Compute start and end positions of the pen (relative to paper)
      // The text "To Do List" is centered, so left edge ≈ textRect.left - paperRect.left
      const startX_rel = (textRect.left - paperRect.left) + 10;
      const startY_rel = (textRect.top - paperRect.top) + 12;
      const endX_rel = (textRect.right - paperRect.left) - 10;
      const steps = 35;
      let step = 0;

      // Set initial pen position inside paper (as absolute inside overlay)
      // The overlay uses flex centering, so pen is relative to overlay, but we need to position it relative to paper.
      // Simpler: make pen a child of .todo-anim-container
      paper.style.position = 'relative';
      pen.remove();
      paper.appendChild(pen);
      pen.style.position = 'absolute';
      pen.style.left = startX_rel + 'px';
      pen.style.top = startY_rel + 'px';

      // Animate stroke drawing
      textElement.style.transition = 'stroke-dashoffset 1.2s ease';
      textElement.style.strokeDashoffset = '0';

      const interval = setInterval(() => {
        if (step <= steps) {
          const t = step / steps;
          const curX = startX_rel + (endX_rel - startX_rel) * t;
          pen.style.left = curX + 'px';
          step++;
        } else {
          clearInterval(interval);
          pen.style.animation = 'penNibGlow 0.3s ease 2';
          setTimeout(() => {
            paper.classList.add('fadeout');
            overlay.style.transition = 'background 0.4s ease';
            overlay.style.background = 'rgba(0,0,0,0)';
            setTimeout(() => {
              overlay.remove();
              Modals.openTodo();
            }, 350);
          }, 400);
        }
      }, 35);
    });
  },

  // ============================================================================
  // TIME MANAGEMENT ANIMATION – CALENDAR ZOOM
  // ============================================================================
  openScheduleWithAnimation() {
    // Remove stale overlay if any
    const existing = document.getElementById('schedule-anim-overlay');
    if (existing) existing.remove();

    // Inject CSS (once)
    if (!document.getElementById('schedule-anim-css')) {
      const style = document.createElement('style');
      style.id = 'schedule-anim-css';
      style.textContent = `
      #schedule-anim-overlay {
        position: fixed; inset: 0;
        z-index: 9998;
        display: flex; align-items: center; justify-content: center;
        background: rgba(0,0,0,0);
        transition: background 0.38s ease;
        pointer-events: none;
      }
      #schedule-anim-overlay.dim { background: rgba(0,0,0,0.86); }

      .calendar-container {
        background: #1a1a2e;
        border-radius: 24px;
        padding: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 0 2px #7b68ee;
        transform: scale(0.8);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s ease;
        text-align: center;
        width: 340px;
      }
      .calendar-container.show {
        transform: scale(1);
        opacity: 1;
      }
      .calendar-container.zoom {
        transform: scale(1.8);
        opacity: 0;
        transition: transform 0.5s ease-out, opacity 0.4s ease-out;
      }
      .calendar-month-year {
        font-size: 24px;
        font-weight: bold;
        color: #c084fc;
        margin-bottom: 16px;
      }
      .calendar-weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
        margin-bottom: 12px;
        font-weight: 600;
        color: #aaa;
      }
      .calendar-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
      }
      .calendar-day {
        padding: 8px;
        border-radius: 40px;
        background: #0e1022;
        color: #e0e0ff;
        font-size: 14px;
        transition: 0.1s;
      }
      .calendar-day.today {
        background: #7b68ee;
        color: white;
        box-shadow: 0 0 6px #c084fc;
        font-weight: bold;
      }
      .calendar-day.week-highlight {
        background: #4a3b8a;
        color: #fff;
        box-shadow: 0 0 0 1px #c084fc;
      }
    `;
      document.head.appendChild(style);
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'schedule-anim-overlay';

    // Get current date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const currentDate = today.getDate();

    // Build calendar HTML
    const firstDayOfMonth = new Date(year, month, 1);
    const startWeekday = firstDayOfMonth.getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let daysHtml = '';
    // Empty cells before first day
    for (let i = 0; i < startWeekday; i++) {
      daysHtml += `<div class="calendar-day"></div>`;
    }
    // Days of month
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = (d === currentDate);
      const isInCurrentWeek = (d >= currentDate - today.getDay() && d <= currentDate + (6 - today.getDay()));
      let classNames = 'calendar-day';
      if (isToday) classNames += ' today';
      if (isInCurrentWeek && !isToday) classNames += ' week-highlight';
      daysHtml += `<div class="${classNames}">${d}</div>`;
    }

    overlay.innerHTML = `
    <div class="calendar-container" id="calendar-anim">
      <div class="calendar-month-year">${monthNames[month]} ${year}</div>
      <div class="calendar-weekdays">
        ${weekdayNames.map(w => `<div>${w}</div>`).join('')}
      </div>
      <div class="calendar-days">
        ${daysHtml}
      </div>
    </div>
  `;

    document.body.appendChild(overlay);
    const calendar = document.getElementById('calendar-anim');

    requestAnimationFrame(() => {
      overlay.classList.add('dim');
      calendar.classList.add('show');

      // After calendar appears, highlight the week and current date
      setTimeout(() => {
        // Focus effect: we already have .today and .week-highlight classes
        // Add a pulsing effect to the today cell
        const todayCell = calendar.querySelector('.calendar-day.today');
        if (todayCell) {
          todayCell.style.transition = 'box-shadow 0.2s';
          todayCell.style.boxShadow = '0 0 0 3px #ffdd00, 0 0 0 6px #7b68ee';
        }
      }, 400);

      // Zoom in and fade out
      setTimeout(() => {
        calendar.classList.add('zoom');
        overlay.style.transition = 'background 0.5s ease';
        overlay.style.background = 'rgba(0,0,0,0)';
        setTimeout(() => {
          overlay.remove();
          // Open schedule modal
          Modals.openSchedule();
        }, 500);
      }, 1200);
    });
  },

  // ============================================================================
  // GOAL SETTING — BULLSEYE ANIMATION
  // ============================================================================
  openGoalsWithAnimation() {
    // Remove any stale overlay (cleanup)
    document.getElementById('goals-anim-overlay')?.remove();

    // Create the overlay and SVG
    const overlay = document.createElement('div');
    overlay.id = 'goals-anim-overlay';
    overlay.innerHTML = `
    <svg id="goals-anim-svg" width="310" height="310" viewBox="0 0 400 400">
      <!-- Bullseye rings (outer → inner) -->
      <circle class="g-ring" cx="200" cy="200" r="152" fill="#07001a" stroke="#2a1a4a" stroke-width="1.5"/>
      <circle class="g-ring" cx="200" cy="200" r="116" fill="#0d0028" stroke="#4a2a80" stroke-width="1.5"/>
      <circle class="g-ring" cx="200" cy="200" r="80"  fill="#340010" stroke="#8a3ab0" stroke-width="2"/>
      <circle class="g-ring" cx="200" cy="200" r="46"  fill="#880020" stroke="#c050e0" stroke-width="2"/>
      <circle class="g-ring" cx="200" cy="200" r="18"  fill="#bb0030" stroke="#ff44cc" stroke-width="2.5"/>
      <circle class="g-ring" id="g-bullseye-dot" cx="200" cy="200" r="6" fill="#ffdd00" stroke="#fff" stroke-width="1.5"/>

      <!-- Crosshair ticks -->
      <line class="g-tick" x1="200" y1="40"  x2="200" y2="64"  stroke="#5a3a90" stroke-width="1.5" stroke-linecap="round"/>
      <line class="g-tick" x1="200" y1="336" x2="200" y2="360" stroke="#5a3a90" stroke-width="1.5" stroke-linecap="round"/>
      <line class="g-tick" x1="40"  y1="200" x2="64"  y2="200" stroke="#5a3a90" stroke-width="1.5" stroke-linecap="round"/>
      <line class="g-tick" x1="336" y1="200" x2="360" y2="200" stroke="#5a3a90" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Motion trail -->
      <g id="g-trail">
        <line x1="230" y1="198" x2="282" y2="198" stroke="#c084fc" stroke-width="1.5" opacity=".5" stroke-linecap="round"/>
        <line x1="240" y1="200" x2="282" y2="200" stroke="#e040fb" stroke-width="2.5" opacity=".35" stroke-linecap="round"/>
        <line x1="230" y1="202" x2="282" y2="202" stroke="#c084fc" stroke-width="1.5" opacity=".5" stroke-linecap="round"/>
      </g>

      <!-- Arrow -->
      <g id="g-arrow">
        <line x1="208" y1="200" x2="282" y2="200" stroke="#c084fc" stroke-width="3.5" stroke-linecap="round"/>
        <polygon points="208,200 226,191 226,209" fill="#e040fb"/>
        <polygon points="208,200 219,197 219,203" fill="#ffdd00"/>
        <polygon points="282,200 266,190 271,200 266,210" fill="#9d8fff"/>
        <polygon points="276,200 260,193 265,200 260,207" fill="#7b68ee" opacity=".78"/>
        <line x1="278" y1="196" x2="283" y2="200" stroke="#7b68ee" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="278" y1="204" x2="283" y2="200" stroke="#7b68ee" stroke-width="1.5" stroke-linecap="round"/>
      </g>

      <!-- Impact rings -->
      <g id="g-impact">
        <circle cx="200" cy="200" r="9" fill="none" stroke="#ffdd00" stroke-width="4"/>
        <circle cx="200" cy="200" r="9" fill="none" stroke="#ff88dd" stroke-width="3"/>
        <circle cx="200" cy="200" r="9" fill="none" stroke="#c084fc" stroke-width="2"/>
      </g>

      <!-- Sparks -->
      <g id="g-sparks">
        <line x1="200" y1="193" x2="200" y2="165" stroke="#ffdd00" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="200" y1="207" x2="200" y2="235" stroke="#ffdd00" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="193" y1="200" x2="165" y2="200" stroke="#ffdd00" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="207" y1="200" x2="235" y2="200" stroke="#ffdd00" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="195" y1="195" x2="173" y2="173" stroke="#ff88cc" stroke-width="2" stroke-linecap="round"/>
        <line x1="205" y1="195" x2="227" y2="173" stroke="#ff88cc" stroke-width="2" stroke-linecap="round"/>
        <line x1="195" y1="205" x2="173" y2="227" stroke="#ff88cc" stroke-width="2" stroke-linecap="round"/>
        <line x1="205" y1="205" x2="227" y2="227" stroke="#ff88cc" stroke-width="2" stroke-linecap="round"/>
        <circle cx="200" cy="158" r="2.5" fill="#ffdd00"/>
        <circle cx="242" cy="200" r="2.5" fill="#ff88cc"/>
        <circle cx="200" cy="242" r="2.5" fill="#ffdd00"/>
        <circle cx="158" cy="200" r="2.5" fill="#ff88cc"/>
      </g>

      <!-- Label -->
      <text id="g-label" x="200" y="290" text-anchor="middle"
            font-family="'Segoe UI', 'Consolas', system-ui, sans-serif"
            font-size="13" font-weight="700" fill="#c084fc" opacity="0" letter-spacing="8">
        GOAL SETTING
      </text>
    </svg>
  `;

    document.body.appendChild(overlay);
    const svg = overlay.querySelector('#goals-anim-svg');
    const t = (fn, ms) => setTimeout(fn, ms);

    requestAnimationFrame(() => {
      // Phase 0: dim overlay + show SVG
      overlay.classList.add('dim');
      t(() => svg.classList.add('show'), 60);

      // Phase 1: rings pop one by one
      const rings = overlay.querySelectorAll('.g-ring');
      rings.forEach((ring, i) => t(() => ring.classList.add('pop'), 130 + i * 78));

      // Phase 1b: crosshair ticks appear
      overlay.querySelectorAll('.g-tick').forEach((tick, i) =>
        t(() => tick.classList.add('show'), 500 + i * 40)
      );

      // Phase 2: label fades in
      t(() => {
        const lbl = overlay.querySelector('#g-label');
        if (lbl) lbl.classList.add('show');
      }, 640);

      // Phase 3: arrow shoots across
      t(() => {
        const trail = overlay.querySelector('#g-trail');
        if (trail) trail.classList.add('show');
        t(() => {
          const arrow = overlay.querySelector('#g-arrow');
          if (arrow) arrow.classList.add('shoot');
        }, 40);
      }, 720);

      // Phase 4: impact (hit bullseye)
      t(() => {
        const dot = overlay.querySelector('#g-bullseye-dot');
        if (dot) dot.classList.add('hit');

        const impact = overlay.querySelector('#g-impact');
        if (impact) {
          impact.querySelectorAll('circle').forEach(c => c.setAttribute('stroke-opacity', '1'));
          impact.classList.add('boom');
        }

        const sparks = overlay.querySelector('#g-sparks');
        if (sparks) {
          sparks.style.opacity = '1';
          sparks.classList.add('pop');
        }

        // Boost glow
        svg.style.filter = 'drop-shadow(0 0 40px rgba(255,221,0,.7)) drop-shadow(0 0 16px rgba(224,64,251,.6))';
        t(() => {
          svg.style.filter = 'drop-shadow(0 0 28px rgba(123,104,238,.6)) drop-shadow(0 0 8px rgba(255,221,0,.25))';
        }, 320);
      }, 1270);

      // Phase 5: exit and open the goal modal
      t(() => {
        svg.classList.add('exit');
        overlay.style.transition = 'background .4s ease';
        overlay.style.background = 'rgba(0,0,0,0)';
        t(() => {
          overlay.remove();
          // Make sure the goal modal exists and open it
          if (typeof Modals !== 'undefined' && Modals.openGoals) {
            Modals.openGoals();
          } else {
            console.warn('Modals.openGoals not available');
          }
        }, 420);
      }, 1980);
    });
  },

  // ============================================================
  // ENHANCED BLACK HOLE ANIMATION FOR MODAL CLOSING
  // ============================================================
  playBlackHoleAnimationForModal(modalElement, onComplete) {
    // 1. Create overlay and black hole core
    let overlay = document.getElementById('blackhole-overlay');
    if (overlay) overlay.remove();
    overlay = document.createElement('div');
    overlay.id = 'blackhole-overlay';
    const core = document.createElement('div');
    core.className = 'black-hole-core';
    overlay.appendChild(core);
    document.body.appendChild(overlay);

    // 2. Find all "box" elements to be sucked in
    //    - Window control buttons (minimize, maximize, close)
    const controlButtons = modalElement.querySelectorAll('.win-btn, .btn-cancel, .modal-header .close-btn, [id*="close"]');
    //    - Any element with class 'box-card' (from the earlier example) or goal cards, schedule cards, etc.
    const boxCards = modalElement.querySelectorAll('.box-card, .goal-card, .schedule-day-card, .task-row, .mytodo-table tr');
    // Combine unique elements (avoid duplicates)
    const suckTargets = [...new Set([...controlButtons, ...boxCards])];

    // 3. Get the black hole center (center of modal container)
    const modalRect = modalElement.getBoundingClientRect();
    const centerX = modalRect.left + modalRect.width / 2;
    const centerY = modalRect.top + modalRect.height / 2;

    // 4. Animate each target: move to center + shrink + fade out
    suckTargets.forEach(target => {
      const rect = target.getBoundingClientRect();
      const dx = centerX - (rect.left + rect.width / 2);
      const dy = centerY - (rect.top + rect.height / 2);
      target.style.transition = 'transform 0.45s cubic-bezier(0.4, 0.2, 0.1, 1), opacity 0.4s ease';
      target.style.transform = `translate(${dx}px, ${dy}px) scale(0.05)`;
      target.style.opacity = '0';
      target.classList.add('modal-suck-box');
    });

    // 5. Also shrink the whole modal container slightly
    modalElement.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    modalElement.style.transform = 'scale(0.85)';
    modalElement.style.opacity = '0.7';

    // 6. Expand black hole core
    requestAnimationFrame(() => {
      core.style.width = '200px';
      core.style.height = '200px';
      core.style.boxShadow = '0 0 80px black, 0 0 30px #1a0a2e';
      overlay.style.background = 'rgba(0, 0, 0, 0.92)';
      // Expand further after a short delay to "swallow"
      setTimeout(() => {
        core.style.width = '800px';
        core.style.height = '800px';
        core.style.boxShadow = '0 0 150px #000';
      }, 200);
    });

    // 7. Finish: clean up and call onComplete
    setTimeout(() => {
      if (onComplete) onComplete();
      // Remove temporary styles
      suckTargets.forEach(target => {
        target.style.transform = '';
        target.style.opacity = '';
        target.style.transition = '';
        target.classList.remove('modal-suck-box');
      });
      modalElement.style.transform = '';
      modalElement.style.opacity = '';
      overlay.remove();
    }, 600);
  },

  // Replace the old attachBlackHoleToModalCloses with this version
  attachBlackHoleToModalCloses() {
    // Helper to get the parent modal of any close button
    function getModalFromElement(el) {
      while (el) {
        if (el.classList && el.classList.contains('modal')) return el;
        el = el.parentElement;
      }
      return null;
    }

    // Close buttons selectors (all possible modal close triggers)
    const closeSelectors = [
      '.btn-cancel', '.modal .close-btn', '#close-face-btn', '#close-body-btn',
      '#close-goals-btn', '#close-todo-btn', '#close-schedule-btn',
      '#close-progress-modal', '#close-settings-btn', '#close-help-btn',
      '#close-learnmore-btn', '#close-chats-manager-btn', '#close-profile-btn'
    ];

    closeSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(btn => {
        if (btn._blackHoleAttached) return;
        const originalClick = btn.onclick;
        btn.onclick = (e) => {
          e.stopPropagation();
          const modal = getModalFromElement(btn);
          if (modal && modal.id) {
            // Animate the modal closing with black hole
            playBlackHoleAnimationForModal(modal, () => {
              if (typeof originalClick === 'function') originalClick(e);
              else {
                // Default close: hide overlay and modal
                const overlay = document.getElementById('modal-overlay');
                if (overlay) overlay.classList.add('hidden');
                modal.classList.add('hidden');
              }
            });
          } else {
            // Fallback: just call original handler
            if (typeof originalClick === 'function') originalClick(e);
          }
        };
        btn._blackHoleAttached = true;
      });
    });

    // Overlay click (background)
    const overlay = document.getElementById('modal-overlay');
    if (overlay && !overlay._blackHoleAttached) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          const visibleModal = document.querySelector('.modal:not(.hidden)');
          if (visibleModal) {
            playBlackHoleAnimationForModal(visibleModal, () => {
              overlay.classList.add('hidden');
              visibleModal.classList.add('hidden');
            });
          } else {
            overlay.classList.add('hidden');
          }
        }
      });
      overlay._blackHoleAttached = true;
    }

    // Also handle Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const overlay = document.getElementById('modal-overlay');
        if (overlay && !overlay.classList.contains('hidden')) {
          const visibleModal = document.querySelector('.modal:not(.hidden)');
          if (visibleModal) {
            playBlackHoleAnimationForModal(visibleModal, () => {
              overlay.classList.add('hidden');
              visibleModal.classList.add('hidden');
            });
          } else {
            overlay.classList.add('hidden');
          }
        }
      }
    });
  }
}

// ============================================================================
// RADAR CHART (with modified Looks action)
// ============================================================================
const Radar = {
  canvas: null, ctx: null,
  labels: ["Looks", "Physique", "Goal Setting", "To Do List", "Time\nManagement", "Progress"],
  values: [0, 0, 0, 0, 0, 0],
  RINGS: 5,
  angles: Array.from({ length: 6 }, (_, i) => Math.PI / 2 + i * (2 * Math.PI / 6)),
  _tooltipEl: null,
  _cssSize: 0,
  currentGender: null,

  init() {
    this.canvas = document.getElementById('radar-canvas');
    this.ctx = this.canvas.getContext('2d');
    this._tooltipEl = document.getElementById('tooltip');
    this._onMouseMove = throttle((e) => this._onMouseMoveHandler(e), 16);
    this.canvas.addEventListener('mousemove', this._onMouseMove);
    this.canvas.addEventListener('mouseleave', () => this._hideTooltip());
    this.canvas.addEventListener('click', (e) => this._onClick(e));
    window.addEventListener('resize', debounce(() => this._resizeAndDraw(), 100));
    this._resizeAndDraw();
    this.refresh();
  },

  _resizeAndDraw() {
    const wrap = document.getElementById('radar-wrap');
    if (!wrap) return;
    const sz = Math.min(wrap.clientWidth, wrap.clientHeight) - 16;
    if (sz < 10) return;
    const dpr = window.devicePixelRatio || 1;
    this._cssSize = sz;
    // Set canvas pixel dimensions for sharp rendering
    this.canvas.width = Math.round(sz * dpr);
    this.canvas.height = Math.round(sz * dpr);
    this.canvas.style.width = sz + 'px';
    this.canvas.style.height = sz + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Enable anti‑aliasing for smooth curves
    this.ctx.imageSmoothingEnabled = true;
    this.draw();
  },

  draw() {
    if (this._drawRequest) cancelAnimationFrame(this._drawRequest);
    this._drawRequest = requestAnimationFrame(() => {
      if (!this._cssSize) return;
      const c = this.ctx, sz = this._cssSize;
      c.clearRect(0, 0, sz, sz);
      c.fillStyle = '#000000';
      c.fillRect(0, 0, sz, sz);

      const cx = this.cx(), cy = this.cy(), maxR = this.maxR();

      // Draw rings
      for (let ring = this.RINGS; ring >= 1; ring--) {
        const r = maxR * ring / this.RINGS;
        const pts = this.hexPts(r);
        c.beginPath();
        c.moveTo(pts[0].x, pts[0].y);
        pts.slice(1).forEach(p => c.lineTo(p.x, p.y));
        c.closePath();
        c.strokeStyle = (ring === this.RINGS) ? '#8878cc' : (ring === this.RINGS - 1) ? '#5a5a88' : '#4a4a6a';
        c.lineWidth = (ring === this.RINGS) ? 1.5 : 0.8;
        c.stroke();
      }

      // Draw axes
      this.hexPts(maxR).forEach(p => {
        c.beginPath();
        c.moveTo(cx, cy);
        c.lineTo(p.x, p.y);
        c.strokeStyle = '#4a4a6a';
        c.lineWidth = 0.8;
        c.stroke();
      });

      // Draw data polygon
      if (this.values.some(v => v > 0)) {
        const dp = this.angles.map((a, i) => ({
          x: cx + maxR * this.values[i] * Math.cos(a),
          y: cy - maxR * this.values[i] * Math.sin(a)
        }));
        c.beginPath();
        c.moveTo(dp[0].x, dp[0].y);
        dp.slice(1).forEach(p => c.lineTo(p.x, p.y));
        c.closePath();
        c.fillStyle = 'rgba(123,104,238,0.25)';
        c.fill();
        c.strokeStyle = '#7b68ee';
        c.lineWidth = 1.5;
        c.stroke();
        dp.forEach(p => {
          c.beginPath();
          c.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          c.fillStyle = '#9d8fff';
          c.fill();
        });
      }

      // Center dot
      const cr = Math.max(2.5, maxR * 0.055);
      c.beginPath();
      c.arc(cx, cy, cr, 0, Math.PI * 2);
      c.strokeStyle = '#7b68ee';
      c.lineWidth = 1.5;
      c.stroke();
      c.fillStyle = '#0d0d0d';
      c.fill();

      // Ring dots
      this.angles.forEach(a => {
        for (let ring = 1; ring <= this.RINGS; ring++) {
          const r = maxR * ring / this.RINGS;
          const x = cx + r * Math.cos(a);
          const y = cy - r * Math.sin(a);
          c.beginPath();
          c.arc(x, y, Math.max(1.5, maxR * 0.018), 0, Math.PI * 2);
          c.fillStyle = '#8878cc';
          c.fill();
        }
      });

      // Labels
      const labelR = maxR * 1.48;
      const fontSize = Math.max(8, Math.min(12, maxR * 0.14));
      c.font = `600 ${fontSize}px 'Segoe UI', system-ui, sans-serif`;
      c.fillStyle = '#d0d0e8';
      this.angles.forEach((a, i) => {
        const lx = cx + labelR * Math.cos(a);
        const ly = cy - labelR * Math.sin(a);
        const dx = Math.cos(a), dy = Math.sin(a);
        c.textAlign = dx > 0.3 ? 'left' : dx < -0.3 ? 'right' : 'center';
        c.textBaseline = dy > 0.3 ? 'bottom' : dy < -0.3 ? 'top' : 'middle';
        const lines = this.labels[i].split('\n');
        lines.forEach((line, li) => {
          c.fillText(line, lx, ly + (li - (lines.length - 1) / 2) * (fontSize + 2));
        });
      });
      this._drawRequest = null;
    });
  },

  refresh() {
    const face = Store.faceProfile();
    const body = Store.bodyProfile();
    const goals = Store.goals();
    const todo = Store.todo();
    const sched = Store.schedule();
    const { looks, physique, goalScore, todoScore, schedScore, overall } = ProgressRank.calculate(face, body, goals, todo, sched);
    this.values = [looks, physique, goalScore, todoScore, schedScore, overall / 100];
    this.draw();
  },

  // Helper methods
  cx() { return this._cssSize / 2; },
  cy() { return this._cssSize / 2; },
  maxR() { return this._cssSize / 2 * 0.44; },
  hexPts(r) { return this.angles.map(a => ({ x: this.cx() + r * Math.cos(a), y: this.cy() - r * Math.sin(a) })); },

  _hitLabel(mx, my) {
    const cx = this.cx(), cy = this.cy(), maxR = this.maxR();
    const labelR = maxR * 1.48;
    const fontSize = Math.max(8, Math.min(12, this._cssSize * 0.14));
    const lineHeight = fontSize + 2;

    for (let i = 0; i < 6; i++) {
      const a = this.angles[i];
      const lx = cx + labelR * Math.cos(a);
      const ly = cy - labelR * Math.sin(a);
      const lines = this.labels[i].split('\n');
      const totalHeight = lines.length * lineHeight;
      let topY = ly - totalHeight / 2;
      let bottomY = ly + totalHeight / 2;
      const approxWidth = Math.max(...lines.map(l => l.length)) * fontSize * 0.6;
      let leftX = lx - approxWidth / 2;
      let rightX = lx + approxWidth / 2;

      // Adjust for side labels
      if (Math.abs(Math.cos(a)) > 0.7) {
        leftX = lx - approxWidth;
        rightX = lx + approxWidth;
      }
      if (Math.abs(Math.sin(a)) > 0.7) {
        topY = ly - totalHeight;
        bottomY = ly + totalHeight;
      }

      if (mx >= leftX && mx <= rightX && my >= topY && my <= bottomY) {
        return i;
      }
    }
    return -1;
  },

  _onClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const idx = this._hitLabel(e.clientX - rect.left, e.clientY - rect.top);
    if (idx < 0) return;
    this._hideTooltip();

    const actions = [
      () => scanAndShowGenderImage(),   // Looks
      () => scanAndShowBodyImage(),     // Physique
      () => Modals.openGoalsWithAnimation(),
      () => Modals.openTodoWithAnimation(),
      () => Modals.openScheduleWithAnimation(),
      () => showProgressModal()
    ];
    if (actions[idx]) actions[idx]();
  },

  _onMouseMoveHandler(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const idx = this._hitLabel(mx, my);
    if (idx >= 0) {
      this.canvas.style.cursor = 'pointer';
      this._showTooltip(e.clientX, e.clientY, idx);
    } else {
      this.canvas.style.cursor = 'default';
      this._hideTooltip();
    }
  },

  _showTooltip(sx, sy, idx) {
    const tip = this._tooltipEl;
    if (!tip) return;
    tip.classList.remove('hidden');

    const face = Store.faceProfile();
    const body = Store.bodyProfile();
    const goals = Store.goals();
    const todo = Store.todo();
    const sched = Store.schedule();
    const prog = Store.progress();

    let html = `<div class="tt-title">${this.labels[idx].replace('\n', ' ')}</div>`;

    if (idx === 0) {
      const has = FACE_PARTS.some(p => face[p.field] && face[p.field] !== "Undetected");
      if (!has) html += `<div class="tt-empty">No face data yet. Click "Looks" to scan.</div>`;
      else {
        html += FACE_PARTS.map(p => `<div class="tt-row"><span class="tt-icon">${p.icon}</span><span class="tt-key">${p.label}:</span><span class="tt-val">${face[p.field] || '—'}</span></div>`).join('');
        if (this.currentGender) {
          html += `<div class="tt-row"><span class="tt-icon">⚥</span><span class="tt-key">Gender:</span><span class="tt-val">${this.currentGender === 'male' ? 'Male' : 'Female'}</span></div>`;
        }
        html += `<div class="tt-hint">Click to rescan</div>`;
      }
    } else if (idx === 1) {
      const has = BODY_PARTS.some(p => body[p.key] && body[p.key] !== "Undetected");
      if (!has) html += `<div class="tt-empty">No body data yet. Click to open editor.</div>`;
      else {
        html += BODY_PARTS.map(p => `<div class="tt-row"><span class="tt-icon">${p.icon}</span><span class="tt-key">${p.label}:</span><span class="tt-val">${body[p.key] || '—'}</span></div>`).join('');
        if (body.self_defence) {
          html += `<div class="tt-row"><span class="tt-icon">🥋</span><span class="tt-key">Self Defence:</span><span class="tt-val">${body.self_defence}</span></div>`;
        }
        html += `<div class="tt-hint">Click to edit / rescan</div>`;
      }
    } else if (idx === 2) {
      let tg = 0, cg = 0;
      GOAL_TIMEFRAMES.forEach(tf => (goals[tf] || []).forEach(t => {
        const txt = typeof t === 'object' ? t.text : t;
        if (txt && txt.trim()) { tg++; if (typeof t === 'object' && t.done) cg++; }
      }));
      if (!tg) html += `<div class="tt-empty">No goals set. Click to create your plan.</div>`;
      else html += `<div class="tt-row"><span class="tt-val">Goals completed: ${cg}/${tg} (${Math.round(cg / tg * 100)}%)</span></div><div class="tt-hint">Click to edit all goals</div>`;
    } else if (idx === 3) {
      if (!todo.length) html += `<div class="tt-empty">No tasks yet. Click to add.</div>`;
      else html += todo.slice(0, 6).map(t => {
        const text = typeof t === 'object' ? t.text : t;
        const done = typeof t === 'object' && t.done;
        return `<div class="tt-row"><span class="tt-val">${done ? '✓' : '○'} ${escHtml(text)}</span></div>`;
      }).join('') + `<div class="tt-hint">Click to edit</div>`;
    } else if (idx === 4) {
      let tt = 0, ct = 0;
      WEEKDAYS.forEach(d => (sched[d] || []).forEach(t => {
        const txt = typeof t === 'object' ? t.text : t;
        if (txt && txt.trim()) { tt++; if (typeof t === 'object' && t.done) ct++; }
      }));
      if (!tt) html += `<div class="tt-empty">No schedule set. Click to plan your week.</div>`;
      else html += `<div class="tt-row"><span class="tt-val">Tasks completed: ${ct}/${tt} (${tt ? Math.round(ct / tt * 100) : 0}%)</span></div><div class="tt-hint">Click to edit weekly schedule</div>`;
    } else if (idx === 5) {
      const rank = prog.current_rank || 'E', last = prog.last_year_rank || 'E';
      html += `<div class="tt-row"><span class="tt-key">Current Rank:</span><span class="tt-val" style="color:#7b68ee; font-weight:900">${rank}</span></div>`;
      html += `<div class="tt-row"><span class="tt-key">Last Year:</span><span class="tt-val">${last}</span></div>`;
      html += `<div class="tt-hint">Click for details</div>`;
    }

    tip.innerHTML = html;

    // Position tooltip (improved)
    const tw = 220, th = tip.scrollHeight;
    let tx = sx + 14, ty = sy + 14;
    if (tx + tw > window.innerWidth) tx = sx - tw - 14;
    if (ty + th > window.innerHeight) ty = sy - th - 14;
    tip.style.left = tx + 'px';
    tip.style.top = ty + 'px';
  },

  _hideTooltip() {
    const tip = this._tooltipEl;
    if (tip) tip.classList.add('hidden');
  }
};

// ============================================================================
// LOOKS ACTION: FACE SCAN (once per login) + RETAKE OPTION
// ============================================================================
async function scanAndShowGenderImage() {
  // 1. Logged‑in user: check localStorage
  if (isLoggedIn && localStorage.getItem('face_scanned') === 'true') {
    const faceProfile = Store.faceProfile();
    const gender = localStorage.getItem('face_gender');
    if (faceProfile && gender) {
      App.appendChat("System", "📸 Loading saved face data.");
      showFaceResultModal(faceProfile, gender);
      return;
    }
  }

  // 2. Guest user: check memory cache
  if (!isLoggedIn && cachedFaceProfile && cachedFaceGender) {
    App.appendChat("System", "📸 Using cached face data from this session.");
    showFaceResultModal(cachedFaceProfile, cachedFaceGender);
    return;
  }

  // 3. Otherwise, start a fresh scan
  App.appendChat("System", "📷 Starting camera. Please look at the camera...");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    const video = document.createElement('video');
    video.srcObject = stream;
    await video.play();
    await new Promise(r => setTimeout(r, 500));
    stream.getTracks().forEach(t => t.stop());

    App.appendChat("System", "🔍 Analysing facial features...");
    const faceProfile = await CamScanner.scanFace();
    Store.set('face_profile', faceProfile);
    ProgressRank.update();

    const gender = await new Promise((resolve) => {
      const modalDiv = document.createElement('div');
      modalDiv.className = 'modal';
      modalDiv.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#1a1a2e; border-radius:16px; padding:24px; width:300px; text-align:center; z-index:10001; border:1px solid #7b68ee;';
      modalDiv.innerHTML = `
        <h3 style="color:#c084fc; margin-bottom:16px;">Select Gender</h3>
        <div style="display:flex; gap:20px; justify-content:center;">
          <button id="gender-male" style="background:#2a2c5a; border:none; border-radius:40px; padding:8px 24px; color:white; cursor:pointer;">👨 Male</button>
          <button id="gender-female" style="background:#2a2c5a; border:none; border-radius:40px; padding:8px 24px; color:white; cursor:pointer;">👩 Female</button>
        </div>
      `;
      document.body.appendChild(modalDiv);
      const overlay = document.getElementById('modal-overlay');
      if (overlay) overlay.classList.remove('hidden');
      const handleSelect = (g) => {
        modalDiv.remove();
        if (overlay) overlay.classList.add('hidden');
        resolve(g);
      };
      document.getElementById('gender-male').onclick = () => handleSelect('male');
      document.getElementById('gender-female').onclick = () => handleSelect('female');
    });

    App.appendChat("System", `✅ Gender selected: ${gender === 'male' ? 'Male' : 'Female'}`);
    Radar.currentGender = gender;

    if (isLoggedIn) {
      localStorage.setItem('face_gender', gender);
      localStorage.setItem('face_scanned', 'true');
    } else {
      cachedFaceProfile = faceProfile;
      cachedFaceGender = gender;
    }

    showFaceResultModal(faceProfile, gender);
  } catch (err) {
    App.appendChat("System", "❌ Face scan failed: " + err.message);
    console.error(err);
  }
}

// Helper to display the face result modal (with Retake button)
function showFaceResultModal(faceProfile, gender) {
  const genderImageUrl = gender === 'male' ? 'file:///D:/pics/Screenshot%202026-04-27%20110107.png' : 'file:///D:/pics/Screenshot%202026-04-27%20110117.png';
  // ORDER MATTERS: largest zones first (bottom of z-stack), smallest last (top)
  const ZONES = [
    // ── full-face base — must be FIRST so it never blocks specific zones ──
    {
      id: 'z-skin', part: 'skin', fields: [{ f: 'skin_tone', l: 'Skin Tone' }, { f: 'face_shape', l: 'Face Shape' }],
      cx: 120, cy: 155, rx: 80, ry: 103, shape: 'ellipse'
    },

    // ── large structural zones ──
    {
      id: 'z-jaw', part: 'jawline', fields: [{ f: 'jawline_shape', l: 'Jawline Shape' }, { f: 'face_shape', l: 'Face Shape' }],
      cx: 120, cy: 238, rx: 55, ry: 25, shape: 'ellipse'
    },
    {
      id: 'z-neck', part: 'neck', fields: [{ f: 'neck', l: 'Neck' }],
      cx: 120, cy: 293, rx: 22, ry: 30, shape: 'ellipse'
    },

    // ── mid-size zones ──
    {
      id: 'z-hair', part: 'hair', fields: [{ f: 'hair_type', l: 'Hair Type' }],
      cx: 120, cy: 68, rx: 74, ry: 36, shape: 'ellipse'
    },
    {
      id: 'z-forehead', part: 'forehead', fields: [{ f: 'face_shape', l: 'Face Shape' }],
      cx: 120, cy: 112, rx: 58, ry: 18, shape: 'ellipse'
    },
    {
      id: 'z-lcheek', part: 'cheeks', fields: [{ f: 'skin_tone', l: 'Skin Tone' }],
      cx: 78, cy: 200, rx: 20, ry: 17, shape: 'ellipse'
    },
    {
      id: 'z-rcheek', part: 'cheeks', fields: [{ f: 'skin_tone', l: 'Skin Tone' }],
      cx: 162, cy: 200, rx: 20, ry: 17, shape: 'ellipse'
    },
    {
      id: 'z-chin', part: 'chin', fields: [{ f: 'chin_shape', l: 'Chin Shape' }],
      cx: 120, cy: 246, rx: 26, ry: 13, shape: 'ellipse'
    },

    // ── ears (outside face ellipse, can go anywhere) ──
    {
      id: 'z-learr', part: 'ears', fields: [{ f: 'ears', l: 'Ears' }],
      cx: 44, cy: 160, rx: 15, ry: 22, shape: 'ellipse'
    },
    {
      id: 'z-rearr', part: 'ears', fields: [{ f: 'ears', l: 'Ears' }],
      cx: 196, cy: 160, rx: 15, ry: 22, shape: 'ellipse'
    },

    // ── small precise zones — LAST so they sit on top ──
    {
      id: 'z-nose', part: 'nose', fields: [{ f: 'nose_structure', l: 'Nose Structure' }],
      cx: 120, cy: 184, rx: 16, ry: 19, shape: 'ellipse'
    },
    {
      id: 'z-lips', part: 'lips', fields: [{ f: 'lips', l: 'Lips' }, { f: 'teeth', l: 'Teeth' }],
      cx: 120, cy: 216, rx: 26, ry: 14, shape: 'ellipse'
    },
    {
      id: 'z-lbrow', part: 'eyebrows', fields: [{ f: 'eyebrow_shape', l: 'Eyebrow Shape' }],
      x: 66, y: 132, w: 46, h: 13, shape: 'rect'
    },
    {
      id: 'z-rbrow', part: 'eyebrows', fields: [{ f: 'eyebrow_shape', l: 'Eyebrow Shape' }],
      x: 128, y: 132, w: 46, h: 13, shape: 'rect'
    },
    {
      id: 'z-leye', part: 'eyes', fields: [{ f: 'eye_structure', l: 'Eye Structure' }, { f: 'eyelash_density', l: 'Eyelashes' }],
      cx: 90, cy: 150, rx: 22, ry: 13, shape: 'ellipse'
    },
    {
      id: 'z-reye', part: 'eyes', fields: [{ f: 'eye_structure', l: 'Eye Structure' }, { f: 'eyelash_density', l: 'Eyelashes' }],
      cx: 150, cy: 150, rx: 22, ry: 13, shape: 'ellipse'
    },
    // eyelash strips sit on top of eye zones
    {
      id: 'z-llash', part: 'eyelashes', fields: [{ f: 'eyelash_density', l: 'Eyelash Density' }],
      x: 68, y: 162, w: 44, h: 7, shape: 'rect'
    },
    {
      id: 'z-rlash', part: 'eyelashes', fields: [{ f: 'eyelash_density', l: 'Eyelash Density' }],
      x: 128, y: 162, w: 44, h: 7, shape: 'rect'
    },
  ];

  // Build SVG zone elements
  const svgZones = ZONES.map(z => {
    const base = `id="${z.id}" class="hover-zone" data-part="${z.part}" style="fill:transparent;stroke:transparent;cursor:pointer;transition:fill .15s,stroke .15s"`;
    if (z.shape === 'rect') return `<rect ${base} x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="3"/>`;
    return `<ellipse ${base} cx="${z.cx}" cy="${z.cy}" rx="${z.rx}" ry="${z.ry}"/>`;
  });

  // Build editable feature rows
  const featureRows = FACE_PARTS.map(p => `
    <div class="tt-row" style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
      <span style="width:22px;text-align:center;">${p.icon}</span>
      <span style="width:90px;font-size:10px;color:#aaa;">${p.label}:</span>
      <input type="text" class="feature-input" data-field="${p.field}"
        value="${escHtml(faceProfile[p.field] || '')}"
        style="flex:1;background:#0e1022;border:1px solid #4a4a6a;border-radius:4px;padding:4px 8px;color:white;font-size:11px;">
    </div>`).join('');

  const resultModal = document.createElement('div');
  resultModal.className = 'modal';
  resultModal.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#1a1a2e;border-radius:16px;width:820px;max-width:96vw;border:1px solid #7b68ee;z-index:10001;max-height:90vh;overflow-y:auto;';
  resultModal.innerHTML = `
    <style>
      .hover-zone:hover{fill:rgba(123,104,238,0.25)!important;stroke:#7b68ee!important;stroke-width:1.5px!important}
      .hover-zone.active-zone{fill:rgba(123,104,238,0.3)!important;stroke:#c084fc!important;stroke-width:2px!important}
      .part-tooltip{position:absolute;background:#12122a;border:1px solid #7b68ee;border-radius:10px;padding:10px 14px;min-width:160px;max-width:220px;pointer-events:none;z-index:100;transition:opacity .15s;font-family:'Segoe UI',system-ui,sans-serif}
      .part-tooltip.hidden{opacity:0}
      .part-tooltip .tt-name{font-size:11px;font-weight:700;color:#c084fc;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
      .part-tooltip .tt-field{font-size:11px;color:#aaa;margin-bottom:2px}
      .part-tooltip .tt-val{font-size:12px;color:#e0e0ff;font-weight:500}
      .part-tooltip .tt-empty{font-size:11px;color:#555;font-style:italic}
    </style>
    <div style="height:4px;background:#7b68ee;border-radius:16px 16px 0 0;"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 18px;">
      <span style="font-size:14px;font-weight:700;color:#c084fc;">📸 Face Analysis — hover the image to explore</span>
      <button id="close-result-modal" style="background:none;border:none;color:#aaa;font-size:24px;cursor:pointer;">&times;</button>
    </div>
    <div style="display:flex;gap:20px;flex-wrap:wrap;padding:0 18px 18px;">

      <!-- LEFT: interactive face image -->
      <div style="flex:0 0 240px;position:relative;">
        <div style="position:relative;width:240px;">
          <img id="face-img" src="${genderImageUrl}"
            style="width:240px;border-radius:12px;border:2px solid #2a2a4a;display:block;"
            onerror="this.style.display='none';document.getElementById('face-svg-fallback').style.display='block'">

          <!-- SVG overlay that sits on top of image -->
          <svg id="face-overlay" viewBox="0 0 240 320" width="240" height="320"
            style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:12px;">
            ${svgZones.join('\n')}
          </svg>
          <!-- Fallback SVG face if image fails -->
          <svg id="face-svg-fallback" viewBox="0 0 240 320" width="240" height="320"
            style="display:none;border-radius:12px;background:#12122a;border:2px solid #2a2a4a;">
            <ellipse cx="120" cy="145" rx="78" ry="100" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1.5"/>
            <ellipse cx="120" cy="75" rx="72" ry="30" fill="#252550" stroke="none"/>
            <ellipse cx="88" cy="140" rx="20" ry="13" fill="#22223c" stroke="#3a3a55" stroke-width="1"/>
            <ellipse cx="152" cy="140" rx="20" ry="13" fill="#22223c" stroke="#3a3a55" stroke-width="1"/>
            <path d="M72 133 Q88 126 104 133" fill="none" stroke="#3a3a5a" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M136 133 Q152 126 168 133" fill="none" stroke="#3a3a5a" stroke-width="2.5" stroke-linecap="round"/>
            <ellipse cx="120" cy="168" rx="8" ry="5" fill="#1e1e36" stroke="#3a3a55" stroke-width="1"/>
            <path d="M96 198 Q120 214 144 198" fill="#1e1e36" stroke="#3a3a55" stroke-width="1.5"/>
            <ellipse cx="48" cy="152" rx="10" ry="17" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1.2"/>
            <ellipse cx="192" cy="152" rx="10" ry="17" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1.2"/>
            <rect x="96" y="240" width="48" height="38" rx="5" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1"/>
            ${svgZones.join('\n')}
          </svg>
        </div>

        <!-- Floating tooltip -->
        <div id="face-part-tooltip" class="part-tooltip hidden" style="bottom:auto;left:250px;top:10px;"></div>

        <div style="font-size:10px;color:#5a5a7a;text-align:center;margin-top:6px;">
          Hover any region for details
        </div>
        <div style="margin-top:8px;font-size:11px;color:#aaa;text-align:center;">
          ${gender === 'male' ? '👨 Male' : '👩 Female'} representative
        </div>
        <button id="retake-photo-btn" style="margin-top:10px;width:100%;background:#7b68ee;border:none;border-radius:20px;padding:6px 12px;color:white;cursor:pointer;font-size:11px;">📷 Retake Photo</button>
      </div>

      <!-- RIGHT: editable feature list -->
      <div style="flex:1;min-width:260px;">
        <div style="font-weight:bold;margin-bottom:10px;font-size:12px;color:#c084fc;">
          🎨 Edit Features Manually
        </div>
        <div id="active-part-banner" style="background:#1e1e3a;border:1px solid #3a3a5a;border-radius:8px;padding:8px 12px;margin-bottom:10px;font-size:11px;color:#7070a0;min-height:32px;">
          ← Hover the face image to highlight a feature
        </div>
        ${featureRows}
        <div style="margin-top:12px;text-align:right;">
          <button id="save-features-btn" style="background:#2a7a2a;border:none;border-radius:20px;padding:7px 18px;color:white;cursor:pointer;font-size:12px;">💾 Save Changes</button>
        </div>
      </div>
    </div>
    <div style="display:flex;gap:10px;padding:12px 18px;justify-content:flex-end;background:#12122a;border-radius:0 0 16px 16px;">
      <button id="close-result-footer" style="background:#3a3a5a;border:none;border-radius:4px;padding:7px 14px;color:white;cursor:pointer;font-size:11px;">Close</button>
    </div>`;

  document.body.appendChild(resultModal);
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('hidden');

  const closeModal = () => {
    resultModal.remove();
    if (overlay) overlay.classList.add('hidden');
  };
  document.getElementById('close-result-modal').onclick = closeModal;
  document.getElementById('close-result-footer').onclick = closeModal;

  // ── HOVER LOGIC ──
  const tooltip = document.getElementById('face-part-tooltip');
  const banner = document.getElementById('active-part-banner');
  let activeZoneEl = null;

  function showTooltip(zoneData) {
    let html = `<div class="tt-name">${zoneData.part}</div>`;
    zoneData.fields.forEach(({ f, l }) => {
      const val = faceProfile[f];
      const empty = !val || val === 'Undetected';
      html += `<div class="tt-field">${l}</div>
               <div class="${empty ? 'tt-empty' : 'tt-val'}">${empty ? 'not scanned yet' : val}</div>`;
    });
    tooltip.innerHTML = html;
    tooltip.classList.remove('hidden');
  }

  function updateBanner(zoneData) {
    const vals = zoneData.fields.map(({ f, l }) => {
      const v = faceProfile[f];
      return `<strong style="color:#c084fc">${l}:</strong> <span style="color:${(!v || v === 'Undetected') ? '#555' : '#e0e0ff'}">${(!v || v === 'Undetected') ? 'not set' : v}</span>`;
    });
    banner.innerHTML = `<span style="color:#7b68ee">▶ ${zoneData.part.charAt(0).toUpperCase() + zoneData.part.slice(1)}</span> — ${vals.join(' &nbsp;·&nbsp; ')}`;
  }

  // Attach hover to ALL svg overlays (both image overlay and fallback)
  resultModal.querySelectorAll('.hover-zone').forEach(zone => {
    const partKey = zone.dataset.part;
    const zoneData = ZONES.find(z => z.part === partKey);
    if (!zoneData) return;

    zone.addEventListener('mouseenter', (e) => {
      if (activeZoneEl) activeZoneEl.classList.remove('active-zone');
      activeZoneEl = zone;
      zone.classList.add('active-zone');
      // Also highlight matching input row
      resultModal.querySelectorAll('.feature-input').forEach(inp => {
        const highlighted = zoneData.fields.some(f => f.f === inp.dataset.field);
        inp.style.borderColor = highlighted ? '#7b68ee' : '#4a4a6a';
        inp.style.background = highlighted ? '#1a1040' : '#0e1022';
      });
      showTooltip(zoneData);
      updateBanner(zoneData);
    });

    zone.addEventListener('mouseleave', () => {
      zone.classList.remove('active-zone');
      activeZoneEl = null;
      tooltip.classList.add('hidden');
      banner.innerHTML = '← Hover the face image to highlight a feature';
      resultModal.querySelectorAll('.feature-input').forEach(inp => {
        inp.style.borderColor = '#4a4a6a';
        inp.style.background = '#0e1022';
      });
    });
  });

  // Save button
  document.getElementById('save-features-btn').onclick = () => {
    const current = Store.faceProfile();
    resultModal.querySelectorAll('.feature-input').forEach(inp => {
      if (inp.dataset.field) current[inp.dataset.field] = inp.value.trim();
    });
    Store.set('face_profile', current);
    ProgressRank.update();
    App.appendChat('System', '✅ Face features updated!');
    closeModal();
    showProgressModal();
  };

  // Retake button
  document.getElementById('retake-photo-btn').onclick = () => {
    if (isLoggedIn) { localStorage.removeItem('face_scanned'); localStorage.removeItem('face_gender'); }
    else { cachedFaceProfile = null; cachedFaceGender = null; }
    closeModal();
    setTimeout(() => scanAndShowGenderImage(), 100);
  };
}

// ============================================================================
// PHYSIQUE ACTION: BODY SCAN (once per login) + RETAKE OPTION
// ============================================================================
function showBodyResultModal(bodyProfile, gender) {
  const genderImageUrl = gender === 'male' ? 'file:///D:/pics/Screenshot%202026-04-26%20225110.png' : 'file:///D:/pics/Screenshot%202026-04-26%20225115.png';

  const ZONES = [
    // ── whole-body base — FIRST so it never blocks specific zones ──
    { id: 'z-selfdef', part: 'self_defence', fields: [{ f: 'self_defence', l: 'Self Defence Level' }], cx: 120, cy: 210, rx: 86, ry: 205, shape: 'ellipse' },
    // ── large torso zones ──
    { id: 'z-back', part: 'back', fields: [{ f: 'back', l: 'Back (V-Taper)' }], cx: 120, cy: 148, rx: 52, ry: 85, shape: 'ellipse' },
    { id: 'z-chest', part: 'chest', fields: [{ f: 'chest', l: 'Chest' }], cx: 120, cy: 122, rx: 46, ry: 36, shape: 'ellipse' },
    { id: 'z-abs', part: 'abs', fields: [{ f: 'abs', l: 'Abs' }], cx: 120, cy: 176, rx: 36, ry: 38, shape: 'ellipse' },
    { id: 'z-hips', part: 'hips', fields: [{ f: 'hips', l: 'Hips' }], cx: 120, cy: 250, rx: 48, ry: 24, shape: 'ellipse' },
    // ── legs (thighs) ──
    { id: 'z-llegs', part: 'legs', fields: [{ f: 'legs', l: 'Legs / Thighs' }], cx: 92, cy: 308, rx: 30, ry: 52, shape: 'ellipse' },
    { id: 'z-rlegs', part: 'legs', fields: [{ f: 'legs', l: 'Legs / Thighs' }], cx: 148, cy: 308, rx: 30, ry: 52, shape: 'ellipse' },
    // ── waist ──
    { id: 'z-waist', part: 'waist', fields: [{ f: 'waist', l: 'Waist' }], cx: 120, cy: 220, rx: 34, ry: 17, shape: 'ellipse' },
    // ── shoulders ──
    { id: 'z-lshoulder', part: 'shoulders', fields: [{ f: 'shoulders', l: 'Shoulders' }], cx: 64, cy: 104, rx: 30, ry: 23, shape: 'ellipse' },
    { id: 'z-rshoulder', part: 'shoulders', fields: [{ f: 'shoulders', l: 'Shoulders' }], cx: 176, cy: 104, rx: 30, ry: 23, shape: 'ellipse' },
    // ── biceps ──
    { id: 'z-lbicep', part: 'biceps', fields: [{ f: 'biceps', l: 'Biceps' }], cx: 52, cy: 148, rx: 18, ry: 32, shape: 'ellipse' },
    { id: 'z-rbicep', part: 'biceps', fields: [{ f: 'biceps', l: 'Biceps' }], cx: 188, cy: 148, rx: 18, ry: 32, shape: 'ellipse' },
    // ── triceps (slightly outer) ──
    { id: 'z-ltricep', part: 'triceps', fields: [{ f: 'triceps', l: 'Triceps' }], cx: 44, cy: 158, rx: 14, ry: 26, shape: 'ellipse' },
    { id: 'z-rtricep', part: 'triceps', fields: [{ f: 'triceps', l: 'Triceps' }], cx: 196, cy: 158, rx: 14, ry: 26, shape: 'ellipse' },
    // ── forearms ──
    { id: 'z-lforearm', part: 'forearms', fields: [{ f: 'forearms', l: 'Forearms' }], cx: 42, cy: 212, rx: 14, ry: 34, shape: 'ellipse' },
    { id: 'z-rforearm', part: 'forearms', fields: [{ f: 'forearms', l: 'Forearms' }], cx: 198, cy: 212, rx: 14, ry: 34, shape: 'ellipse' },
    // ── calves ──
    { id: 'z-lcalves', part: 'calves', fields: [{ f: 'calves', l: 'Calves' }], cx: 90, cy: 370, rx: 20, ry: 34, shape: 'ellipse' },
    { id: 'z-rcalves', part: 'calves', fields: [{ f: 'calves', l: 'Calves' }], cx: 150, cy: 370, rx: 20, ry: 34, shape: 'ellipse' },
    // ── small precise zones LAST (sit on top) ──
    { id: 'z-neck', part: 'neck', fields: [{ f: 'neck', l: 'Neck' }], cx: 120, cy: 78, rx: 14, ry: 15, shape: 'ellipse' },
    { id: 'z-lfist', part: 'fists', fields: [{ f: 'fists', l: 'Fists / Hands' }], cx: 38, cy: 258, rx: 13, ry: 16, shape: 'ellipse' },
    { id: 'z-rfist', part: 'fists', fields: [{ f: 'fists', l: 'Fists / Hands' }], cx: 202, cy: 258, rx: 13, ry: 16, shape: 'ellipse' },
  ];

  const svgZones = ZONES.map(z => {
    const base = `id="${z.id}" class="body-hover-zone" data-part="${z.part}" style="fill:transparent;stroke:transparent;cursor:pointer;transition:fill .15s,stroke .15s"`;
    if (z.shape === 'rect') return `<rect ${base} x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="3"/>`;
    return `<ellipse ${base} cx="${z.cx}" cy="${z.cy}" rx="${z.rx}" ry="${z.ry}"/>`;
  });

  const metricRows = BODY_PARTS.map(p => `
    <div class="tt-row" style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
      <span style="width:22px;text-align:center;">${p.icon}</span>
      <span style="width:100px;font-size:10px;color:#aaa;">${p.label}:</span>
      <input type="text" class="body-input" data-key="${p.key}"
        value="${escHtml(bodyProfile[p.key] || '')}"
        style="flex:1;background:#0e1022;border:1px solid #4a4a6a;border-radius:4px;padding:4px 8px;color:white;font-size:11px;">
    </div>`).join('');

  const resultModal = document.createElement('div');
  resultModal.className = 'modal';
  resultModal.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#1a1a2e;border-radius:16px;width:820px;max-width:96vw;border:1px solid #7b68ee;z-index:10001;max-height:90vh;overflow-y:auto;';
  resultModal.innerHTML = `
    <style>
      .body-hover-zone:hover{fill:rgba(123,104,238,0.25)!important;stroke:#7b68ee!important;stroke-width:1.5px!important}
      .body-hover-zone.active-zone{fill:rgba(123,104,238,0.3)!important;stroke:#c084fc!important;stroke-width:2px!important}
      .body-tooltip{position:fixed;background:#12122a;border:1px solid #7b68ee;border-radius:10px;padding:10px 14px;min-width:160px;max-width:220px;pointer-events:none;z-index:10002;font-family:'Segoe UI',system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,0.6)}
      .body-tooltip.hidden{display:none}
      .body-tooltip .tt-name{font-size:11px;font-weight:700;color:#c084fc;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
      .body-tooltip .tt-field{font-size:10px;color:#7070a0;margin-bottom:1px}
      .body-tooltip .tt-val{font-size:12px;color:#e0e0ff;font-weight:500;margin-bottom:5px}
      .body-tooltip .tt-empty{font-size:11px;color:#444;font-style:italic;margin-bottom:5px}
    </style>
    <div style="height:4px;background:#7b68ee;border-radius:16px 16px 0 0;"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 18px;">
      <span style="font-size:14px;font-weight:700;color:#c084fc;">💪 Body Analysis — hover the image to explore</span>
      <button id="close-result-modal" style="background:none;border:none;color:#aaa;font-size:24px;cursor:pointer;">&times;</button>
    </div>
    <div style="display:flex;gap:20px;flex-wrap:wrap;padding:0 18px 18px;">
      <div style="flex:0 0 240px;">
        <div style="position:relative;width:240px;">
          <img id="body-img" src="${genderImageUrl}"
            style="width:240px;border-radius:12px;border:2px solid #2a2a4a;display:block;"
            onerror="this.style.display='none';document.getElementById('body-svg-fallback').style.display='block'">
          <svg viewBox="0 0 240 420" width="240" height="420"
            style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:12px;">
            ${svgZones.join('\n')}
          </svg>
          <svg id="body-svg-fallback" viewBox="0 0 240 420" width="240" height="420"
            style="display:none;border-radius:12px;background:#12122a;border:2px solid #2a2a4a;">
            <ellipse cx="120" cy="36" rx="28" ry="32" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1.5"/>
            <rect x="112" y="66" width="16" height="22" rx="4" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1"/>
            <path d="M70 88 Q60 100 58 122 L58 224 Q80 238 120 240 Q160 238 182 224 L182 122 Q180 100 170 88 Z" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1.5"/>
            <path d="M68 90 Q44 102 38 142 L40 180 Q50 184 58 180 L62 142 Q66 108 72 92 Z" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1"/>
            <path d="M172 90 Q196 102 202 142 L200 180 Q190 184 182 180 L178 142 Q174 108 168 92 Z" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1"/>
            <path d="M40 180 Q32 202 30 242 L36 256 Q44 258 50 254 L54 212 Q56 188 58 180 Z" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1"/>
            <path d="M200 180 Q208 202 210 242 L204 256 Q196 258 190 254 L186 212 Q184 188 182 180 Z" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1"/>
            <ellipse cx="37" cy="262" rx="12" ry="14" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1"/>
            <ellipse cx="203" cy="262" rx="12" ry="14" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1"/>
            <path d="M80 238 Q68 262 66 312 L70 362 Q84 368 96 364 L102 310 Q108 266 114 242 Z" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1"/>
            <path d="M160 238 Q172 262 174 312 L170 362 Q156 368 144 364 L138 310 Q132 266 126 242 Z" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1"/>
            <path d="M70 362 Q66 382 68 402 L78 410 Q90 408 94 400 L96 364 Z" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1"/>
            <path d="M170 362 Q174 382 172 402 L162 410 Q150 408 146 400 L144 364 Z" fill="#1a1a2e" stroke="#3a3a5a" stroke-width="1"/>
            <line x1="120" y1="138" x2="120" y2="214" stroke="#2a2a44" stroke-width="1"/>
            <line x1="90" y1="156" x2="150" y2="156" stroke="#2a2a44" stroke-width="1"/>
            <line x1="90" y1="176" x2="150" y2="176" stroke="#2a2a44" stroke-width="1"/>
            <line x1="90" y1="196" x2="150" y2="196" stroke="#2a2a44" stroke-width="1"/>
            <path d="M84 114 Q120 128 156 114" fill="none" stroke="#2a2a44" stroke-width="1"/>
            ${svgZones.join('\n')}
          </svg>
        </div>
        <div style="font-size:10px;color:#5a5a7a;text-align:center;margin-top:6px;">Hover any region for details</div>
        <div style="font-size:11px;color:#aaa;text-align:center;margin-top:4px;">${gender === 'male' ? '👨 Male' : '👩 Female'} representative</div>
        <button id="retake-body-btn" style="margin-top:10px;width:100%;background:#7b68ee;border:none;border-radius:20px;padding:6px 12px;color:white;cursor:pointer;font-size:11px;">📷 Retake Body Scan</button>
      </div>
      <div style="flex:1;min-width:260px;">
        <div style="font-weight:bold;margin-bottom:10px;font-size:12px;color:#c084fc;">🏋️ Edit Body Metrics</div>
        <div id="active-body-banner" style="background:#1e1e3a;border:1px solid #3a3a5a;border-radius:8px;padding:8px 12px;margin-bottom:10px;font-size:11px;color:#7070a0;min-height:32px;">← Hover the body image to highlight a muscle group</div>
        ${metricRows}
        <div style="margin-top:12px;text-align:right;"><button id="save-body-features-btn" style="background:#2a7a2a;border:none;border-radius:20px;padding:7px 18px;color:white;cursor:pointer;font-size:12px;">💾 Save Changes</button></div>
      </div>
    </div>
    <div style="display:flex;gap:10px;padding:12px 18px;justify-content:flex-end;background:#12122a;border-radius:0 0 16px 16px;">
      <button id="close-result-footer" style="background:#3a3a5a;border:none;border-radius:4px;padding:7px 14px;color:white;cursor:pointer;font-size:11px;">Close</button>
    </div>`;

  const tooltip = document.createElement('div');
  tooltip.id = 'body-part-tooltip';
  tooltip.className = 'body-tooltip hidden';
  resultModal.appendChild(tooltip);

  document.body.appendChild(resultModal);
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('hidden');

  const closeModal = () => {
    tooltip.remove();
    resultModal.remove();
    if (overlay) overlay.classList.add('hidden');
  };
  document.getElementById('close-result-modal').onclick = closeModal;
  document.getElementById('close-result-footer').onclick = closeModal;

  const banner = document.getElementById('active-body-banner');
  let activeZoneEl = null;

  function showTooltip(e, zoneData) {
    let html = `<div class="tt-name">${zoneData.part.replace(/_/g, ' ')}</div>`;
    zoneData.fields.forEach(({ f, l }) => {
      const val = bodyProfile[f];
      const empty = !val || val === 'Undetected';
      html += `<div class="tt-field">${l}</div>
               <div class="${empty ? 'tt-empty' : 'tt-val'}">${empty ? 'not scanned yet' : val}</div>`;
    });
    tooltip.innerHTML = html;
    tooltip.classList.remove('hidden');
    positionTooltip(e);
  }

  function positionTooltip(e) {
    const tw = 220, th = 120;
    let tx = e.clientX + 16;
    let ty = e.clientY + 12;
    if (tx + tw > window.innerWidth) tx = e.clientX - tw - 16;
    if (ty + th > window.innerHeight) ty = e.clientY - th - 12;
    tooltip.style.left = tx + 'px';
    tooltip.style.top = ty + 'px';
  }

  function updateBanner(zoneData) {
    const vals = zoneData.fields.map(({ f, l }) => {
      const v = bodyProfile[f];
      const empty = !v || v === 'Undetected';
      return `<strong style="color:#c084fc">${l}:</strong>
              <span style="color:${empty ? '#555' : '#e0e0ff'}">${empty ? 'not set' : v}</span>`;
    });
    const name = zoneData.part.replace(/_/g, ' ');
    banner.innerHTML = `<span style="color:#7b68ee">▶ ${name.charAt(0).toUpperCase() + name.slice(1)}</span> — ${vals.join(' &nbsp;·&nbsp; ')}`;
  }

  resultModal.querySelectorAll('.body-hover-zone').forEach(zone => {
    const zoneData = ZONES.find(z => z.part === zone.dataset.part);
    if (!zoneData) return;

    zone.addEventListener('mouseenter', (e) => {
      if (activeZoneEl) activeZoneEl.classList.remove('active-zone');
      activeZoneEl = zone;
      zone.classList.add('active-zone');
      resultModal.querySelectorAll('.body-input').forEach(inp => {
        const hit = zoneData.fields.some(f => f.f === inp.dataset.key);
        inp.style.borderColor = hit ? '#7b68ee' : '#4a4a6a';
        inp.style.background = hit ? '#1a1040' : '#0e1022';
      });
      showTooltip(e, zoneData);
      updateBanner(zoneData);
    });

    zone.addEventListener('mousemove', (e) => positionTooltip(e));

    zone.addEventListener('mouseleave', () => {
      zone.classList.remove('active-zone');
      activeZoneEl = null;
      tooltip.classList.add('hidden');
      banner.innerHTML = '← Hover the body image to highlight a muscle group';
      resultModal.querySelectorAll('.body-input').forEach(inp => {
        inp.style.borderColor = '#4a4a6a';
        inp.style.background = '#0e1022';
      });
    });
  });

  document.getElementById('save-body-features-btn').onclick = () => {
    const current = Store.bodyProfile();
    resultModal.querySelectorAll('.body-input').forEach(inp => {
      if (inp.dataset.key) current[inp.dataset.key] = inp.value.trim();
    });
    Store.set('body_profile', current);
    ProgressRank.update();
    App.appendChat('System', '✅ Body metrics updated! Progress rank recalculated.');
    closeModal();
    showProgressModal();
  };

  document.getElementById('retake-body-btn').onclick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('body_scanned');
      localStorage.removeItem('body_gender');
    } else {
      cachedBodyProfile = null;
      cachedBodyGender = null;
    }
    closeModal();
    setTimeout(() => scanAndShowBodyImage(), 100);
  };
}

async function scanAndShowBodyImage() {
  // 1. Logged‑in user: check localStorage
  if (isLoggedIn && localStorage.getItem('body_scanned') === 'true') {
    const bodyProfile = Store.bodyProfile();
    const gender = localStorage.getItem('body_gender');
    if (bodyProfile && gender) {
      App.appendChat("System", "📸 Loading saved body data.");
      showBodyResultModal(bodyProfile, gender);
      return;
    }
  }

  // 2. Guest user: check memory cache
  if (!isLoggedIn && cachedBodyProfile && cachedBodyGender) {
    App.appendChat("System", "📸 Using cached body data from this session.");
    showBodyResultModal(cachedBodyProfile, cachedBodyGender);
    return;
  }

  // 3. Start a fresh scan
  App.appendChat("System", "📷 Starting body scan. Please stand in front of the camera...");
  try {
    const bodyProfile = await CamScanner.scanBody();
    Store.set('body_profile', bodyProfile);
    ProgressRank.update();

    // Ask for gender
    const gender = await new Promise((resolve) => {
      const modalDiv = document.createElement('div');
      modalDiv.className = 'modal';
      modalDiv.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#1a1a2e; border-radius:16px; padding:24px; width:300px; text-align:center; z-index:10001; border:1px solid #7b68ee;';
      modalDiv.innerHTML = `
        <h3 style="color:#c084fc; margin-bottom:16px;">Select Gender</h3>
        <div style="display:flex; gap:20px; justify-content:center;">
          <button id="gender-male" style="background:#2a2c5a; border:none; border-radius:40px; padding:8px 24px; color:white; cursor:pointer;">👨 Male</button>
          <button id="gender-female" style="background:#2a2c5a; border:none; border-radius:40px; padding:8px 24px; color:white; cursor:pointer;">👩 Female</button>
        </div>
      `;
      document.body.appendChild(modalDiv);
      const overlay = document.getElementById('modal-overlay');
      if (overlay) overlay.classList.remove('hidden');
      const handleSelect = (g) => {
        modalDiv.remove();
        if (overlay) overlay.classList.add('hidden');
        resolve(g);
      };
      document.getElementById('gender-male').onclick = () => handleSelect('male');
      document.getElementById('gender-female').onclick = () => handleSelect('female');
    });

    App.appendChat("System", `✅ Gender selected: ${gender === 'male' ? 'Male' : 'Female'}`);

    if (isLoggedIn) {
      localStorage.setItem('body_gender', gender);
      localStorage.setItem('body_scanned', 'true');
    } else {
      cachedBodyProfile = bodyProfile;
      cachedBodyGender = gender;
    }

    showBodyResultModal(bodyProfile, gender);
  } catch (err) {
    App.appendChat("System", "❌ Body scan failed: " + err.message);
    console.error(err);
  }
}

// ============================================================================
// WAVE VISUALIZER (audio reactive animation)
// ============================================================================
const WaveViz = {
  canvas: null,
  ctx: null,
  cx: 0, cy: 0,
  baseR: 0,
  maxR: 0,
  _cssSize: 0,
  pulseT: 0,
  speaking: false,
  waves: [],
  _raf: null,
  _stopped: false,
  _rippleInterval: null,

  init() {
    this.canvas = document.getElementById('wave-canvas');
    this.ctx = this.canvas.getContext('2d');
    this._resizeObserver = new ResizeObserver(debounce(() => this._resizeAndDraw(), 50));
    this._resizeObserver.observe(document.getElementById('wave-wrap'));
    this._resizeAndDraw();
    this._animate();
  },

  _resizeAndDraw() {
    const wrap = document.getElementById('wave-wrap');
    if (!wrap) return;
    const sz = Math.min(wrap.clientWidth, wrap.clientHeight);
    if (sz < 10) return;
    const dpr = window.devicePixelRatio || 1;
    this._cssSize = sz;
    this.canvas.width = Math.round(sz * dpr);
    this.canvas.height = Math.round(sz * dpr);
    this.canvas.style.width = sz + 'px';
    this.canvas.style.height = sz + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.cx = sz / 2;
    this.cy = sz / 2;
    this.baseR = sz / 4 * 1.18;
    this.maxR = sz * 5;
  },

  stop() {
    this._stopped = true;
    this.speaking = false;
    if (this._rippleInterval) clearInterval(this._rippleInterval); // ADD THIS
    this.waves = [];
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
    this._drawBlackOnly();
  },

  _drawBlackOnly() {
    if (!this.ctx) return;
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  },

  _restart() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._stopped = false;
    this._animate();
  },

  // Called when speech starts – begin continuous ripple generation
  triggerWaves(text) {
    if (this._stopped) this._restart();
    const words = text.split(' ');
    this.waves = [];
    words.forEach((word, i) => {
      const amp = Math.min(2.8, word.replace(/[.,!?;:'"]/g, '').length / 4.5);
      this.waves.push({
        r: this.baseR, amp, delay: i * 12,
        speed: 1.8 + amp * 1.2,
        maxR: Math.min(this.baseR + 100 + amp * 60, this.maxR),
        thick: Math.max(1.5, Math.floor(amp * 2) + 1),
        t: Math.min(1.0, amp / 3.0)
      });
    });
    this.speaking = true;
    // ← NO setTimeout here; speaking flag is now controlled by TTS events
  },

  _animate() {
    if (this._stopped) return;
    this._raf = requestAnimationFrame(() => {
      if (!this._cssSize) {
        this._animate();
        return;
      }
      const c = this.ctx, sz = this._cssSize;
      c.fillStyle = '#000000';
      c.fillRect(0, 0, sz, sz);

      this.pulseT += 0.06;
      const pulse = 1.0 + Math.sin(this.pulseT) * 0.03;
      const r = Math.max(4, Math.min(this.baseR * pulse, this.maxR));

      // Draw central glowing sphere
      if (this.speaking) {
        const gr = Math.min(r + (8 + Math.floor(6 * Math.abs(Math.sin(this.pulseT * 3)))), this.maxR);
        const grad = c.createRadialGradient(this.cx, this.cy, r, this.cx, this.cy, gr);
        grad.addColorStop(0, 'rgba(0,170,255,0.3)');
        grad.addColorStop(1, 'rgba(0,170,255,0)');
        c.beginPath();
        c.arc(this.cx, this.cy, gr, 0, Math.PI * 2);
        c.fillStyle = grad;
        c.fill();
        c.beginPath();
        c.arc(this.cx, this.cy, gr, 0, Math.PI * 2);
        c.strokeStyle = '#00ccff';
        c.lineWidth = 2;
        c.stroke();
      } else {
        c.beginPath();
        c.arc(this.cx, this.cy, r + 3, 0, Math.PI * 2);
        c.strokeStyle = '#0088aa';
        c.lineWidth = 1;
        c.stroke();
      }

      // Draw main sphere
      const sc = this.speaking ? '#00aaff' : '#0088aa';
      const sg = c.createRadialGradient(this.cx - r * 0.3, this.cy - r * 0.3, r * 0.1, this.cx, this.cy, r);
      sg.addColorStop(0, 'rgba(100,220,255,0.9)');
      sg.addColorStop(0.5, sc);
      sg.addColorStop(1, 'rgba(0,60,120,0.8)');
      c.beginPath();
      c.arc(this.cx, this.cy, r, 0, Math.PI * 2);
      c.fillStyle = sg;
      c.fill();
      c.strokeStyle = this.speaking ? '#00eeff' : '#0099cc';
      c.lineWidth = 1.5;
      c.stroke();

      // Draw and update ripples
      this.waves = this.waves.filter(w => {
        if (w.delay > 0) { w.delay--; return true; }
        w.r += w.speed;
        if (w.r >= w.maxR && !this.speaking) return false;
        const progress = (w.r - this.baseR) / Math.max(1, w.maxR - this.baseR);
        const fade = 1.0 - progress;
        const rf = Math.floor(220 * w.t * fade);
        const gf = Math.floor(200 * (1 - w.t * 0.9) * fade);
        const bf = Math.floor(220 * (1 - w.t * 0.6) * fade);
        c.beginPath();
        c.arc(this.cx, this.cy, w.r, 0, Math.PI * 2);
        c.strokeStyle = `rgba(${Math.min(255, rf)}, ${Math.min(255, gf)}, ${Math.min(255, bf)}, ${fade.toFixed(2)})`;
        c.lineWidth = w.thick;
        c.stroke();
        return true;
      });
      // ── Auto-refill: keep generating new ripples as long as TTS is speaking ──
      if (this.speaking && this.waves.length < 4) {
        const amp = 0.6 + Math.random() * 2.0;
        this.waves.push({
          r: this.baseR,
          amp,
          delay: Math.floor(Math.random() * 8),
          speed: 1.6 + amp * 1.1,
          maxR: Math.min(this.baseR + 80 + amp * 55, this.maxR),
          thick: Math.max(1.5, Math.floor(amp * 1.8) + 1),
          t: Math.min(1.0, amp / 3.0)
        });
      }
      this._animate();
    });
  }
};

// ============================================================================
// WEEKLY SCHEDULE MANAGER (with Progress Rank sync)  
// ============================================================================
const WeeklySchedule = (function () {
  const STORAGE_KEY = 'weekly_schedule_manager';
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let items = [];

  function syncToStore() {
    // Convert to the old format { text: title, done: false } (time is not used by rank)
    const oldFormat = {};
    DAYS.forEach((day, idx) => {
      oldFormat[day] = items.filter(i => i.dayIndex === idx).map(i => ({ text: i.title, done: i.done || false }));
    });
    Store.set('schedule', oldFormat);
    ProgressRank.update(); // refresh rank after schedule change
  }

  function load() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) items = JSON.parse(stored);
    else items = [];
    syncToStore(); // ensure Store.schedule is up to date
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    syncToStore();
  }

  function nextId() {
    return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
  }

  function add(dayIndex, title, time) {
    if (!title.trim()) return false;
    items.push({
      id: nextId(),
      dayIndex: parseInt(dayIndex),
      title: title.trim(),
      time: (time || '').trim(),
      createdAt: Date.now(),
      done: false
    });

    save();
    return true;
  }

  function update(id, dayIndex, title, time) {
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return false;
    items[idx] = { ...items[idx], dayIndex: parseInt(dayIndex), title: title.trim(), time: (time || '').trim() }; save();
    return true;
  }

  function remove(id) {
    const before = items.length;
    items = items.filter(i => i.id !== id);
    if (items.length !== before) { save(); return true; }
    return false;
  }

  function clearAll() {
    if (confirm("⚠️ Delete ALL schedule entries? This cannot be undone.")) {
      items = [];
      save();
      render();
      return true;
    }
    return false;
  }

  function getItemsForDay(dayIndex) {
    return items.filter(i => i.dayIndex === dayIndex).sort((a, b) => a.createdAt - b.createdAt);
  }

  function render() {
    if (!container) return;
    let html = '';
    for (let d = 0; d < DAYS.length; d++) {
      const dayItems = getItemsForDay(d);
      const itemsHtml = dayItems.length === 0
        ? `<div class="text-center text-muted small py-2" style="color:#a7a0cf;">— no plans —</div>`
        : dayItems.map(item => `
    <div class="schedule-item" data-id="${item.id}">
      <div style="display: flex; align-items: center; gap: 6px;">
        <input type="checkbox" class="schedule-done-checkbox" data-id="${item.id}" ${item.done ? 'checked' : ''}>
        <div style="flex:1;">
          <div class="schedule-item-title">${escapeHtml(item.title)}</div>
          ${item.time ? `<div class="schedule-item-time"><i class="far fa-clock"></i> ${escapeHtml(item.time)}</div>` : ''}
        </div>
      </div>
      <div class="schedule-actions">
        <button class="edit-schedule-btn" data-id="${item.id}">✏️ Edit</button>
        <button class="delete-schedule-btn" data-id="${item.id}">🗑️ Delete</button>
      </div>
    </div>
  `).join('');
      html += `
        <div class="schedule-day-card">
          <div class="schedule-day-header">
            <span class="schedule-day-name">${DAYS[d]}</span>
            <span class="schedule-badge">${dayItems.length}</span>
          </div>
          <div class="schedule-items-list">${itemsHtml}</div>
          <button class="add-schedule-day-btn" data-day="${d}">+ Add task</button>
        </div>
      `;
    }
    container.innerHTML = html;

    container.querySelectorAll('.add-schedule-day-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const day = parseInt(btn.dataset.day);
        openEditModal(null, day);
      });
    });
    container.querySelectorAll('.schedule-done-checkbox').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const id = parseInt(chk.dataset.id);
        const item = items.find(i => i.id === id);
        if (item) {
          item.done = chk.checked;
          save();
          syncToStore();         // update Store.schedule
          ProgressRank.update(); // recalc rank and refresh radar
          render();              // re-render (optional, but checkboxes remain)
        }
      });
    });
    container.querySelectorAll('.edit-schedule-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.dataset.id);
        openEditModal(id);
      });
    });
    container.querySelectorAll('.delete-schedule-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.dataset.id);
        if (confirm("Delete this task?")) {
          remove(id);
          render();
          showToast("Schedule item deleted", "#b3476e");
        }
      });
    });
  }

  let currentEditId = null;
  let modalDiv = null;

  function openEditModal(editId = null, presetDay = null) {
    const dayIndex = (presetDay !== null && presetDay >= 0) ? presetDay : 0;
    const dayName = DAYS[dayIndex];
    const title = prompt(`Enter task title for ${dayName}:`);
    if (!title || !title.trim()) return;
    const time = prompt("Enter time (optional, e.g., 14:00):");

    if (editId !== null) {
      // Edit mode – find the current day of the item
      const item = items.find(i => i.id === editId);
      if (item) {
        update(editId, item.dayIndex, title.trim(), time || '');
      } else return;
    } else {
      add(dayIndex, title.trim(), time || '');
    }
    render();
    showToast(editId ? "Task updated" : "Task added", "#4f7a69");
  }

  function showToast(msg, bgColor) {
    const t = document.createElement('div');
    t.className = 'floating-toast';
    t.style.cssText = `position:fixed; bottom:20px; right:20px; background:${bgColor}; color:white; padding:8px 16px; border-radius:40px; z-index:9999; font-size:12px;`;
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1800);
  }

  let container = null;
  function init(parentContainerId) {
    container = document.getElementById(parentContainerId);
    if (!container) return false;
    load();
    render();
    const clearBtn = document.getElementById('clearAllScheduleBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => { clearAll(); render(); });
    return true;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : m === '<' ? '&lt;' : '&gt;');
  }

  return { init, add, update, remove, clearAll, render };
})();

// ============================================================================
// Goal Manager (with Progress Rank sync)
// ============================================================================
const GoalManager = (function () {
  const STORAGE_KEY = 'goal_setting_action_plan';
  const CATEGORIES = [
    { key: "day", label: "Day (Today)" },
    { key: "week", label: "Week (This Week)" },
    { key: "month", label: "Month (This Month)" },
    { key: "year1", label: "Year 1" }, { key: "year2", label: "Year 2" },
    { key: "year3", label: "Year 3" }, { key: "year4", label: "Year 4" },
    { key: "year5", label: "Year 5" }, { key: "year6", label: "Year 6" },
    { key: "year7", label: "Year 7" }, { key: "year8", label: "Year 8" },
    { key: "year9", label: "Year 9" }, { key: "year10", label: "Year 10" }
  ];
  let goals = {};     // { categoryKey: [ {id, title, desc, created} ] }
  let nextId = 1;

  // Sync to Store.goals (for progress rank) – convert to old format { text: title, done: false }
  function syncToStore() {
    const oldFormat = {};
    CATEGORIES.forEach(cat => {
      const items = goals[cat.key] || [];
      oldFormat[cat.key.toUpperCase()] = items.map(g => ({ text: g.title, done: g.done || false }));
      const oldKey = cat.key === 'day' ? 'Day' : cat.key === 'week' ? 'Week' : cat.key === 'month' ? 'Month' : cat.key.charAt(0).toUpperCase() + cat.key.slice(1);
      oldFormat[oldKey] = items.map(g => ({ text: g.title, done: g.done || false }));
    });
    Store.set('goals', oldFormat);
    ProgressRank.update();
  }

  function load() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      goals = data.goals || {};
      nextId = data.nextId || 1;
    } else {
      goals = {};
      nextId = 1;
    }
    CATEGORIES.forEach(cat => { if (!goals[cat.key]) goals[cat.key] = []; });
    syncToStore();
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ goals, nextId }));
    syncToStore();
  }

  function getNextId() { return nextId++; }

  function addGoal(categoryKey, title, desc) {
    if (!title.trim()) return false;
    const newGoal = {
      id: getNextId(),
      title: title.trim(),
      desc: desc ? desc.trim() : "",
      created: new Date().toISOString(),
      done: false   // add this
    };
    if (!goals[categoryKey]) goals[categoryKey] = [];
    goals[categoryKey].push(newGoal);
    save();
    return true;
  }

  function updateGoal(categoryKey, goalId, title, desc) {
    const idx = (goals[categoryKey] || []).findIndex(g => g.id === goalId);
    if (idx === -1) return false;
    goals[categoryKey][idx].title = title.trim();
    goals[categoryKey][idx].desc = desc ? desc.trim() : "";
    save();
    return true;
  }

  function moveGoal(oldCategory, goalId, newCategory) {
    const goal = (goals[oldCategory] || []).find(g => g.id === goalId);
    if (!goal) return false;
    goals[oldCategory] = goals[oldCategory].filter(g => g.id !== goalId);
    if (!goals[newCategory]) goals[newCategory] = [];
    goals[newCategory].push(goal);
    save();
    return true;
  }

  function deleteGoal(categoryKey, goalId) {
    const before = (goals[categoryKey] || []).length;
    goals[categoryKey] = (goals[categoryKey] || []).filter(g => g.id !== goalId);
    if (goals[categoryKey].length !== before) { save(); return true; }
    return false;
  }

  function clearAll() {
    if (confirm("⚠️ Delete ALL goals from every timeframe? This cannot be undone.")) {
      CATEGORIES.forEach(cat => { goals[cat.key] = []; });
      save();
      render();
      return true;
    }
    return false;
  }

  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : m === '<' ? '&lt;' : '&gt;');
  }

  let container = null;

  function render() {
    if (!container) return;
    let html = '';
    for (let cat of CATEGORIES) {
      const items = goals[cat.key] || [];
      const count = items.length;
      let itemsHtml = '';
      if (count === 0) {
        itemsHtml = `<div class="text-center text-muted small py-2" style="color:#a7a0cf;">✨ No goals yet</div>`;
      } else {
        items.forEach(goal => {
          itemsHtml += `
    <div class="goal-item" data-id="${goal.id}" data-category="${cat.key}">
      <div style="display: flex; align-items: flex-start; gap: 8px;">
        <input type="checkbox" class="goal-done-checkbox" data-id="${goal.id}" data-category="${cat.key}" ${goal.done ? 'checked' : ''}>
        <div style="flex: 1;">
          <div class="goal-title">🎯 ${escapeHtml(goal.title)}</div>
          ${goal.desc ? `<div class="goal-desc">📝 ${escapeHtml(goal.desc)}</div>` : ''}
          ${goal.created ? `<div class="goal-created"><i class="far fa-calendar-alt"></i> ${formatDate(goal.created)}</div>` : ''}
        </div>
      </div>
      <div class="goal-actions">
        <button class="edit-goal-btn" data-id="${goal.id}" data-category="${cat.key}">✏️ Edit</button>
        <button class="delete-goal-btn" data-id="${goal.id}" data-category="${cat.key}">🗑️ Delete</button>
      </div>
    </div>
  `;
        });
      }
      html += `
        <div class="goal-card">
          <div class="goal-header">
            <span class="goal-category">${cat.label}</span>
            <span class="goal-badge">${count}</span>
          </div>
          <div class="goals-list">${itemsHtml}</div>
          <button class="add-goal-btn" data-category="${cat.key}">+ Add Goal</button>
       </div>
      `;
    }
    container.innerHTML = html;

    // attach dynamic events
    container.querySelectorAll('.add-goal-btn').forEach(btn => {
      btn.addEventListener('click', () => openEditModal(null, btn.dataset.category));
    });
    container.querySelectorAll('.edit-goal-btn').forEach(btn => {
      btn.addEventListener('click', () => openEditModal(parseInt(btn.dataset.id), btn.dataset.category));
    });
    container.querySelectorAll('.delete-goal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const cat = btn.dataset.category;
        if (confirm("Delete this goal?")) {
          deleteGoal(cat, id);
          render();
          showToast("Goal deleted", "#b3476e");
        }
      });
    });

    // Inside render(), after container.innerHTML = html;
    container.querySelectorAll('.goal-done-checkbox').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const id = parseInt(chk.dataset.id);
        const category = chk.dataset.category;
        const goal = goals[category].find(g => g.id === id);
        if (goal) {
          goal.done = chk.checked;
          save();
          syncToStore();         // update Store.goals
          ProgressRank.update(); // recalc rank and refresh radar
          render();              // re-render to keep UI consistent
        }
      });
    });
  }

  // Modal logic
  let modalDiv = null;
  let currentEditId = null;
  let currentCategory = null;

  function openEditModal(editId = null, category = null) {
    // Simple prompt‑based fallback (no Bootstrap)
    const title = prompt("Enter goal title:");
    if (!title || !title.trim()) return;
    const desc = prompt("Enter description (optional):");

    if (editId !== null && category) {
      // Edit mode
      updateGoal(category, editId, title.trim(), desc || '');
    } else {
      // Add mode – use the provided category or default to 'day'
      const cat = category || 'day';
      addGoal(cat, title.trim(), desc || '');
    }
    render();
    showToast(editId ? "Goal updated" : "Goal added", "#4f7a69");
  }
  function saveFromModal() {
    const title = modalDiv.querySelector('#goalTitle').value.trim();
    const desc = modalDiv.querySelector('#goalDesc').value;
    const category = modalDiv.querySelector('#goalCategorySelect').value;
    const editId = modalDiv.querySelector('#editGoalId').value;
    if (!title) { showToast("Title is required", "#b3476e"); return; }
    let success = false;
    if (editId) {
      const id = parseInt(editId);
      if (currentCategory && currentCategory !== category) {
        // move goal to different category
        success = moveGoal(currentCategory, id, category);
      } else {
        success = updateGoal(category, id, title, desc);
      }
    } else {
      success = addGoal(category, title, desc);
    }
    if (success) {
      render();
      showToast(editId ? "Goal updated" : "Goal added", "#4f7a69");
      closeModal();
    } else {
      showToast("Failed to save goal", "#b3476e");
    }
  }

  function closeModal() {
    if (modalDiv) modalDiv.style.display = 'none';
    currentEditId = null;
    currentCategory = null;
  }

  function showToast(msg, bgColor) {
    const t = document.createElement('div');
    t.className = 'floating-toast';
    t.style.cssText = `position:fixed; bottom:20px; right:20px; background:${bgColor}; color:white; padding:8px 16px; border-radius:40px; z-index:9999; font-size:12px;`;
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1800);
  }

  function init(parentContainerId) {
    container = document.getElementById(parentContainerId);
    if (!container) return false;
    load();
    render();
    const clearBtn = document.getElementById('clearAllGoalsBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => { clearAll(); render(); });
    return true;
  }

  return { init, addGoal, updateGoal, deleteGoal, clearAll, render };
})();

// ============================================================================
// CHATS MANAGER MODAL FUNCTIONS
// ============================================================================
function renderChatsManagerList(filter = '') {
  const listContainer = document.getElementById('chats-manager-list');
  const searchInput = document.getElementById('chats-manager-search');
  if (!listContainer) return;

  const allChats = Object.entries(ChatMgr.chats);
  let filtered = allChats;
  if (filter) {
    const f = filter.toLowerCase();
    filtered = allChats.filter(([_, info]) => info.name.toLowerCase().includes(f));
  }

  const countSpan = document.getElementById('chats-manager-count');
  if (countSpan) countSpan.textContent = `${filtered.length} chats`;

  if (filtered.length === 0) {
    listContainer.innerHTML = '<div style="text-align:center; padding:20px; color:#aaa;">No chats match</div>';
    return;
  }

  const sorted = filtered.sort((a, b) => (b[1].lastUpdated || b[0]) - (a[1].lastUpdated || a[0]));
  listContainer.innerHTML = '';
  sorted.forEach(([id, info]) => {
    const li = document.createElement('li');
    li.className = 'chats-manager-item';
    li.setAttribute('data-id', id);
    li.setAttribute('draggable', 'true');
    li.innerHTML = `
      <span class="drag-handle">⋮⋮</span>
      <input type="checkbox" class="chat-checkbox" data-id="${id}">
      <div class="chat-info">
        <div class="chat-name">${escHtml(info.name)}</div>
        <div class="chat-timestamp">${info.timestamp}</div>
      </div>
    `;
    listContainer.appendChild(li);
  });

  attachDragAndDrop();
}

let dragSrc = null;
function attachDragAndDrop() {
  const items = document.querySelectorAll('#chats-manager-list .chats-manager-item');
  items.forEach(item => {
    item.removeEventListener('dragstart', handleDragStart);
    item.removeEventListener('dragover', handleDragOver);
    item.removeEventListener('drop', handleDrop);
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
  });
}

function handleDragStart(e) {
  dragSrc = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
  this.style.opacity = '0.5';
}
function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}
function handleDrop(e) {
  e.stopPropagation();
  if (dragSrc !== this) {
    const parent = this.parentNode;
    const children = [...parent.children];
    const indexSrc = children.indexOf(dragSrc);
    const indexDst = children.indexOf(this);
    if (indexSrc < indexDst) {
      parent.insertBefore(dragSrc, this.nextSibling);
    } else {
      parent.insertBefore(dragSrc, this);
    }
    const newOrder = [...parent.children].map(li => li.getAttribute('data-id'));
    localStorage.setItem('chat_order', JSON.stringify(newOrder));
    window.showToast('Chat order saved (visual only)', '#2a6f8f');
  }
  dragSrc.style.opacity = '';
  dragSrc = null;
  return false;
}

function openChatsManagerModal() {
  const modal = document.getElementById('chats-manager-modal');
  if (!modal) {
    console.warn('Chats manager modal missing in HTML');
    return;
  }
  renderChatsManagerList();
  document.getElementById('modal-overlay').classList.remove('hidden');
  modal.classList.remove('hidden');

  const searchInput = document.getElementById('chats-manager-search');
  const clearBtn = document.getElementById('chats-manager-clear-search');
  const bulkDeleteBtn = document.getElementById('chats-manager-bulk-delete');
  const addChatBtn = document.getElementById('chats-manager-add-chat');
  const closeBtn = document.getElementById('close-chats-manager-btn');

  if (!searchInput || !clearBtn || !bulkDeleteBtn || !addChatBtn || !closeBtn) return;

  // Remove old listeners to avoid duplicates
  const newSearchHandler = () => {
    const val = searchInput.value;
    renderChatsManagerList(val);
    clearBtn.style.display = val ? 'inline-block' : 'none';
  };
  searchInput.removeEventListener('input', newSearchHandler);
  searchInput.addEventListener('input', newSearchHandler);

  clearBtn.onclick = () => {
    searchInput.value = '';
    renderChatsManagerList('');
    clearBtn.style.display = 'none';
  };

  bulkDeleteBtn.onclick = () => {
    const checkboxes = document.querySelectorAll('#chats-manager-list .chat-checkbox:checked');
    if (checkboxes.length === 0) {
      alert('Select at least one chat to delete.');
      return;
    }
    if (confirm(`Delete ${checkboxes.length} chat(s) permanently?`)) {
      checkboxes.forEach(cb => {
        const id = cb.getAttribute('data-id');
        delete ChatMgr.chats[id];   // ✅ Correct – no extra condition needed
      });
      ChatMgr.save();
      ChatMgr.refresh();
      renderChatsManagerList(searchInput.value);
      window.showToast(`${checkboxes.length} chat(s) deleted`, '#b3476e');
    }
  };

  addChatBtn.onclick = () => {
    const name = prompt('Enter new chat name:', 'New Chat');
    if (name && name.trim()) {
      ChatMgr.newChat(true, name.trim());
      renderChatsManagerList(searchInput.value);
      window.showToast(`Chat "${name.trim()}" created`, '#2a6f8f');
    }
  };

  closeBtn.onclick = () => {
    modal.classList.add('hidden');
    document.getElementById('modal-overlay').classList.add('hidden');
  };
}

// ============================================================================
// MAIN APPLICATION
// ============================================================================
const App = {
  _token: 0,

  init() {
    console.log("App.init() called");
    ChatMgr.init();
    SecurityManager.initSession();
    updateDocumentTitle();
    Radar.init();
    WaveViz.init();
    SpeechInterrupt.init();
    AttachMenu.init();

    // ✅ REPLACED with debounced version
    document.getElementById('cmd-input').addEventListener('keydown', debounce((e) => {
      if (e.key === 'Enter') this.execute();
    }, 100));

    this.setupEventListeners();

    // Unlock speech (user interaction required for some browsers)
    const unlockSpeech = () => {
      const utterance = new SpeechSynthesisUtterance('');
      utterance.volume = 0;
      window.speechSynthesis.speak(utterance);
      window.speechSynthesis.cancel();
      document.removeEventListener('click', unlockSpeech);
      document.removeEventListener('keydown', unlockSpeech);
    };
    document.addEventListener('click', unlockSpeech);
    document.addEventListener('keydown', unlockSpeech);

    // Show chat list if there are existing chats with messages
    if (Object.keys(ChatMgr.chats).some(id => ChatMgr.chats[id].messages.length > 0)) {
      revealChatList();
      chatListRevealed = true;
    }

    // ── Welcome message with guaranteed text + wave response ──
    function showWelcomeWithWave() {
      const waveCanvas = document.getElementById('wave-canvas');
      if (!waveCanvas || waveCanvas.width === 0 || waveCanvas.height === 0) {
        setTimeout(showWelcomeWithWave, 200);
        return;
      }

      const welcomeText = "Greetings — Welcome back Sir, what can I do for you?";
      if (!ChatMgr.current) ChatMgr.newChat(false);

      setTimeout(() => {
        /* audio + wave only — no chat bubble while greeting overlay is showing */
        WaveViz.triggerWaves(welcomeText);
        Voice.speak(welcomeText, App._token);
        /* show the visual greeting overlay */
        GreetingSystem.show();
      }, 50);
    }
    // Start the welcome sequence after a short delay (allow UI to stabilize)
    setTimeout(showWelcomeWithWave, 1500);

    // ========== ADDITIONAL MODAL CLOSE LISTENERS (FIX) ==========
    const closeProgressBtn = document.getElementById('close-progress-modal');
    if (closeProgressBtn) {
      closeProgressBtn.addEventListener('click', () => {
        document.getElementById('modal-overlay').classLi, st.add('hidden');
        document.getElementById('progress-report-modal').classList.add('hidden');
      });
    }

    const saveProfileBtn = document.getElementById('save-profile-btn');
    if (saveProfileBtn && typeof saveUserProfile === 'function') {
      saveProfileBtn.addEventListener('click', saveUserProfile);
    }

    const closeProfileBtn = document.getElementById('close-profile-btn');
    if (closeProfileBtn) {
      closeProfileBtn.addEventListener('click', () => {
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('user-profile-modal').classList.add('hidden');
      });
    }
    // ========== SELF‑DEVELOPMENT RADAR MODAL (WORKING) ==========
    const selfDevBtn = document.getElementById('selfDevBtn');
    const radarModal = document.getElementById('radar-modal');
    const closeRadarModal = document.getElementById('close-radar-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const radarWrap = document.getElementById('radar-wrap');
    const radarModalBody = document.getElementById('radar-modal-body');

    let radarMoved = false;

    function openRadarModal() {
      if (!radarWrap || !radarModalBody) return;

      // Move radarWrap into the modal body (only once)
      if (!radarMoved) {
        radarModalBody.appendChild(radarWrap);
        radarMoved = true;
      }
      // Make it visible
      radarWrap.style.display = 'flex';
      radarWrap.style.width = '100%';
      radarWrap.style.justifyContent = 'center';
      radarWrap.style.alignItems = 'center';

      // Show modal
      radarModal.classList.remove('hidden');
      modalOverlay.classList.remove('hidden');

      // Force radar to resize and redraw
      if (typeof Radar !== 'undefined' && Radar._resizeAndDraw) {
        setTimeout(() => {
          Radar._resizeAndDraw();
          Radar.refresh();
        }, 200);
      }
    }

    function closeRadarModalFunc() {
      radarModal.classList.add('hidden');
      modalOverlay.classList.add('hidden');
      radarWrap.style.display = 'none';
    }

    // Attach event listeners
    if (selfDevBtn) selfDevBtn.addEventListener('click', openRadarModal);
    if (closeRadarModal) closeRadarModal.addEventListener('click', closeRadarModalFunc);
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeRadarModalFunc();
      });
    }
  },


  setupEventListeners() {
    const safe = (id, handler) => {
      const el = document.getElementById(id);
      if (el) el.onclick = handler;
      else console.warn(`Missing: #${id}`);
    };
    const newChatEl = document.getElementById('new-chat-btn');
    if (newChatEl) newChatEl.onclick = () => ChatMgr.newChat(true);
    const clearChatEl = document.getElementById('clear-chat-btn');
    if (clearChatEl) clearChatEl.onclick = () => ChatMgr.clearCurrent();
    const deleteChatEl = document.getElementById('delete-chat-btn');
    if (deleteChatEl) deleteChatEl.onclick = () => ChatMgr.deleteCurrent();
    const handBtn = document.getElementById('hand-btn');
    if (handBtn) handBtn.onclick = () => HandCtrl.start(); document.getElementById('scan-face-btn').onclick = () => Modals.scanFace();
    document.getElementById('send-btn').onclick = () => this.execute();
    const voiceBtn = document.getElementById('voice-btn');
    // ── Toggle send button icon based on input ──
    const cmdInput = document.getElementById('cmd-input');
    const sendBtn = document.getElementById('send-btn');
    const iconWave = document.getElementById('icon-wave');
    const iconArrow = document.getElementById('icon-arrow');

    if (cmdInput && sendBtn) {
      cmdInput.addEventListener('input', () => {
        const hasText = cmdInput.value.trim().length > 0;
        if (hasText) {
          sendBtn.classList.add('has-text');
          iconWave.style.display = 'none';
          iconArrow.style.display = 'block';
          sendBtn.title = 'Send message';
        } else {
          sendBtn.classList.remove('has-text');
          iconWave.style.display = 'block';
          iconArrow.style.display = 'none';
          sendBtn.title = 'Speak';
        }
      });

      // When empty + send clicked → trigger voice
      const originalSendClick = sendBtn.onclick;
      sendBtn.addEventListener('click', (e) => {
        if (!cmdInput.value.trim()) {
          e.stopImmediatePropagation();
          App.startVoice();
        }
      });
    }

    // ── Mic button ──
    const micBtn = document.getElementById('mic-btn');
    if (micBtn) {
      micBtn.addEventListener('click', () => {
        micBtn.classList.add('recording');
        App.startVoice().finally(() => {
          micBtn.classList.remove('recording');
        });
      });
    }
    if (voiceBtn) voiceBtn.onclick = () => this.startVoice();
    document.getElementById('save-face-btn').onclick = () => Modals.saveFace();
    document.getElementById('close-face-btn').onclick = () => Modals.close();
    document.getElementById('scan-body-btn').onclick = () => Modals.scanBody();
    document.getElementById('save-body-btn').onclick = () => Modals.saveBody();
    document.getElementById('close-body-btn').onclick = () => Modals.close();
    document.getElementById('save-goals-btn').onclick = () => Modals.saveGoals();
    document.getElementById('close-goals-btn').onclick = () => Modals.close();
    document.getElementById('mytodo-add-btn').onclick = () => Modals.addTodoTask();
    document.getElementById('save-todo-btn').onclick = () => Modals.saveTodo();
    document.getElementById('close-todo-btn').onclick = () => Modals.close();
    document.getElementById('save-schedule-btn').onclick = () => Modals.saveSchedule();
    document.getElementById('close-schedule-btn').onclick = () => Modals.close();
    document.getElementById('camera-cancel-btn').onclick = () => CamScanner.cancel();
    document.getElementById('notepad-copy-btn').onclick = () => Notepad.copy();
    document.getElementById('notepad-download-btn').onclick = () => Notepad.download();
    document.getElementById('notepad-clear-btn').onclick = () => Notepad.clear();
    document.getElementById('notepad-close-btn').onclick = () => Notepad.close();
    document.getElementById('screenshot-download-btn').onclick = () => Screenshot.download();
    document.getElementById('screenshot-copy-btn').onclick = () => Screenshot.copyToClipboard();
    document.getElementById('screenshot-close-btn').onclick = () => Screenshot.close();
    const speakBtn = document.getElementById('speakBtn');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => this.startVoice());
    }
    const todoInput = document.getElementById('todo-new-input');
    if (todoInput) todoInput.addEventListener('keydown', e => { if (e.key === 'Enter') Modals.addTodoTask(); }); document.getElementById('notepad-textarea').addEventListener('input', () => Notepad.updateStatus());
    document.getElementById('modal-overlay').addEventListener('click', e => Modals.closeOnOverlay(e));
  },

  newToken() { this._token++; Voice.stop(); return this._token; },

  speak(text, token) {
    this.appendChat("Player", text);
    if (WaveViz._waveTimeout) clearTimeout(WaveViz._waveTimeout);
    WaveViz.triggerWaves(text);
    Voice.speak(text, token);
  },

  appendChat(sender, text) {
    ChatMgr._appendRaw(sender, text);
    ChatMgr.addMessage(sender, text);
  },

  execute() {
    const inp = document.getElementById('cmd-input');
    const cmd = inp.value.trim();
    if (!cmd) return;
    inp.value = '';
    GreetingSystem.hide();
    this.appendChat("You", cmd);
    const token = this.newToken();
    setTimeout(() => this.processCommand(cmd, token), 0);
  },

  async processCommand(command, token) {
    const cmd = command.toLowerCase();
    if (/today'?s? news|latest news|top headlines/i.test(cmd)) { fetchNews(token); return; }
    if (/open face profile|edit face|face editor|face profile/i.test(cmd)) { Modals.openFace(); return; }
    if (/open body profile|edit body|body editor|body profile/i.test(cmd)) { Modals.openBody(); return; }
    if (/open goals|edit goals|goal editor|my goals/i.test(cmd)) { Modals.openGoals(); return; }
    if (/open todo|edit todo|to do list|todo list/i.test(cmd)) { Modals.openTodo(); return; }
    if (/open schedule|edit schedule|weekly schedule|my schedule/i.test(cmd)) { Modals.openSchedule(); return; }
    if (/progress rank|my rank|show progress|check rank/i.test(cmd)) { Modals.showProgress(); return; }
    if (/what.*time|current time/i.test(cmd)) { this.speak(new Date().toLocaleTimeString(), token); return; }
    if (/what.*date|today.*date|current date/i.test(cmd)) { this.speak(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), token); return; }
    if (/take screenshot|capture screen|screenshot/i.test(cmd)) { const result = await Screenshot.capture(); this.speak(result, token); return; }
    if (/open notepad|open note pad|launch notepad/i.test(cmd)) { Notepad.open(); this.speak("Notepad opened.", token); return; }
    if (/open calculator|launch calculator/i.test(cmd)) { window.open('https://www.desmos.com/scientific', '_blank'); this.speak("Opening web calculator.", token); return; }
    if (/open paint|launch paint|open ms paint/i.test(cmd)) { window.open('https://jspaint.app', '_blank'); this.speak("Opening MS Paint web version.", token); return; }
    if (/stop hand control|stop hands/i.test(cmd)) { HandCtrl._running = false; this.speak("Hand control stopped.", token); return; }
    if (/what can you do|help|commands|features/i.test(cmd)) {
      const help = `Here's what I can do:\n• Take screenshots (try: "take screenshot")\n• Type / copy text (try: "type hello world")\n• Open websites (try: "open youtube")\n• Search the web (try: "search cats on youtube")\n• Open notepad, calculator, paint (web versions)\n• Open VS Code, Figma, Canva, Word, Excel online\n• Open Discord, WhatsApp, Telegram (web)\n• Fetch today's news headlines\n• Hand gesture control (➤ button)\n• Face & body scanning with camera\n• Goal setting, to-do list, weekly schedule\n• Progress rank tracker\n• Voice input (🎤 button)\n• LOCAL FILE ACCESS: "open folder" to select a directory, then "list files", "read file <name>", "search files for <text>"\n• Desktop app launching via custom protocols (e.g. "open vscode", "open spotify")`;
      this.speak(help, token);
      return;
      if (/detect objects|object detection/i.test(cmd)) {
        ObjectDetector.start(); return;
      }
      if (/detect face|count faces/i.test(cmd)) {
        FaceDetector.start(); return;
      }
      if (/remove background|background removal|selfie mode/i.test(cmd)) {
        SelfieSegment.start(); return;
      }
      if (/stop background/i.test(cmd)) {
        SelfieSegment.stop(); return;
      }
      // PyAutoGUI voice commands
      if (/click at (\d+)[, ]+(\d+)/i.test(cmd)) {
        const [, x, y] = cmd.match(/click at (\d+)[, ]+(\d+)/i);
        await PyAutoGUI.click(parseInt(x), parseInt(y));
        this.speak(`Clicked at ${x}, ${y}`, token); return;
      }
      if (/type (.*)/i.test(cmd)) {
        const text = cmd.match(/type (.*)/i)[1];
        await PyAutoGUI.type(text);
        this.speak(`Typed: ${text}`, token); return;
      }
      if (/press ctrl\+c|copy/i.test(cmd)) {
        await PyAutoGUI.hotkey('ctrl', 'c');
        this.speak('Copied to clipboard', token); return;
      }
      if (/press ctrl\+v|paste/i.test(cmd)) {
        await PyAutoGUI.hotkey('ctrl', 'v');
        this.speak('Pasted', token); return;
      }
      if (/scroll (up|down)/i.test(cmd)) {
        const dir = cmd.includes('up') ? 5 : -5;
        await PyAutoGUI.scroll(dir);
        this.speak(`Scrolled ${cmd.includes('up') ? 'up' : 'down'}`, token); return;
      }
    }

    const autoResponse = await Automation.handle(command);
    if (autoResponse) { this.speak(autoResponse, token); return; }
    if (token !== this._token) return;
    SearchEngine.search(command, token);
  },

  async startVoice() {
    GreetingSystem.hide();
    // Inform user we're listening
    this.appendChat("System", "🎤 Listening... Speak now.");

    try {
      const text = await Voice.listen();
      if (!text || text.trim() === "") {
        this.appendChat("System", "No speech detected. Please try again.");
        return;
      }
      // Fill input and send
      document.getElementById('cmd-input').value = text;
      this.appendChat("You", text);
      // Process the command
      const newToken = this.newToken();
      this.processCommand(text, newToken);
    } catch (error) {
      console.error("Voice error:", error);
      this.appendChat("System", `❌ ${error.message}`);
      // Also speak the error (optional)
      try { Voice.speak(error.message); } catch (e) { }
    }
  }
};

// ============================================================================
// ENSURE WELCOME MESSAGE PERSISTS
// ============================================================================

// NEW FUNCTION to restore welcome message after scans
function restoreWelcomeMessageIfNeeded() {
  const currentId = ChatMgr.current;
  if (!currentId) return;

  // Ensure welcome message exists in the messages array of the current chat
  const messages = ChatMgr.chats[currentId]?.messages || [];
  const hasWelcome = messages.some(m => m.text === "Welcome back sir, what can I do for you?");
  if (!hasWelcome) {
    // Add welcome message to memory
    ChatMgr.chats[currentId].messages.push({ sender: "Player", text: "Welcome back sir, what can I do for you?" });
    ChatMgr.save();
  }

  // Force a complete reload of the current chat to redraw all messages
  // This will also re-scroll to the bottom, but we'll scroll back up slightly to show welcome
  ChatMgr.load(currentId);

  // Optional: scroll to top to make welcome message visible
  const chatDiv = document.getElementById('chat-messages');
  if (chatDiv) chatDiv.scrollTop = 0;
}

// ============================================================================
// HELPERS & SCRIPT LOADER
// ============================================================================
function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.crossOrigin = 'anonymous';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ===== STARTUP ANIMATION SEQUENCE =====
const startupAnimation = {
  overlay: null,
  async run() {
    if (document.readyState === 'loading') {
      await new Promise(r => window.addEventListener('DOMContentLoaded', r));
    }
    this.overlay = document.getElementById('startupOverlay');
    if (!this.overlay) return;

    document.body.classList.add('animating-init');

    const blackHole = this.overlay.querySelector('.black-hole');
    if (blackHole) {
      await new Promise(resolve => {
        blackHole.addEventListener('animationend', resolve, { once: true });
        setTimeout(resolve, 2000);
      });
    }

    // Black hole swallowing animation
    function showBlackHoleAndClose(callback) {
      // Remove any stale overlay
      let blackHoleOverlay = document.getElementById('blackhole-overlay');
      if (blackHoleOverlay) blackHoleOverlay.remove();

      blackHoleOverlay = document.createElement('div');
      blackHoleOverlay.id = 'blackhole-overlay';
      const blackHole = document.createElement('div');
      blackHole.className = 'black-hole-closing';
      blackHoleOverlay.appendChild(blackHole);
      document.body.appendChild(blackHoleOverlay);

      // Force reflow, then start animation
      blackHole.offsetHeight;
      blackHole.style.width = '2000px';
      blackHole.style.height = '2000px';
      blackHole.style.boxShadow = '0 0 80px black';
      blackHoleOverlay.style.background = 'rgba(0,0,0,0.92)';

      // After animation, execute the callback and clean up
      setTimeout(() => {
        callback();
        blackHoleOverlay.remove();
      }, 520); // matches the transition duration
    }

    this.overlay.style.opacity = '0';
    await new Promise(r => setTimeout(r, 350));
    this.overlay.remove();

    const leftPanel = document.getElementById('left-panel');
    const waveCanvas = document.getElementById('wave-canvas');
    const radarCanvas = document.getElementById('radar-canvas');
    const centerPanel = document.getElementById('center-panel');

    if (leftPanel) {
      leftPanel.style.visibility = 'visible';
      leftPanel.classList.add('reveal-from-center');
    }
    await new Promise(r => setTimeout(r, 280));

    if (waveCanvas) {
      waveCanvas.style.visibility = 'visible';
      waveCanvas.classList.add('reveal-from-center');
    }
    await new Promise(r => setTimeout(r, 260));

    if (radarCanvas) {
      radarCanvas.style.visibility = 'visible';
      radarCanvas.classList.add('reveal-from-center');
    }
    await new Promise(r => setTimeout(r, 280));

    if (centerPanel) {
      centerPanel.style.visibility = 'visible';
      centerPanel.classList.add('reveal-from-center');
    }
    await new Promise(r => setTimeout(r, 400));

    document.body.classList.remove('animating-init');

    setTimeout(() => {
      [leftPanel, waveCanvas, radarCanvas, centerPanel].forEach(el => {
        if (el) el.classList.remove('reveal-from-center');
      });
    }, 600);
  }
};

// ============================================================================
// NEW SIDEBAR FUNCTIONALITY  
// ============================================================================
if (typeof window.showToast !== 'function') {
  window.showToast = function (message, bgColor = '#3b3b66') {
    let toast = document.getElementById('dynamicToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'dynamicToast';
      toast.style.cssText = 'position:fixed; bottom:30px; left:50%; transform:translateX(-50%); background:#2f2f52; color:#f0f0ff; padding:8px 22px; border-radius:40px; font-size:12px; font-weight:500; z-index:10000; backdrop-filter:blur(8px); border:1px solid #7272aa; pointer-events:none;';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.backgroundColor = bgColor;
    toast.style.opacity = '1';
    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => toast.style.opacity = '0', 2200);
  };
}

// New sidebar controller   
(function initNewSidebar() {
  const leftPanel = document.getElementById('left-panel');
  const toggleBtn = document.getElementById('toggleSidebarBtn');
  const toggleChatsArrow = document.getElementById('toggleChatsArrow');
  const chatsContainer = document.getElementById('chat-list');
  const newChatBtn = document.getElementById('newChatBtn');
  const searchBtn = document.getElementById('searchBtn');
  const chatsBtn = document.getElementById('chatsBtn');
  const airMouseBtn = document.getElementById('airMouseBtn');
  const loginBtn = document.getElementById('fakeLoginBtn');
  const chatListElem = document.getElementById('chat-list');
  if (chatListElem) {
    chatListElem.classList.add('initially-hidden');
  }

  let isMini = false;
  let areChatsVisible = true;

  // Sidebar toggle (full ↔ mini)
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const appEl = document.getElementById('app');
      if (isMini) {
        leftPanel.classList.remove('mini');
        appEl.classList.remove('sidebar-mini');
        toggleBtn.textContent = '☰';
        toggleBtn.title = 'Collapse sidebar';
      } else {
        leftPanel.classList.add('mini');
        appEl.classList.add('sidebar-mini');
        toggleBtn.textContent = '◀';
        toggleBtn.title = 'Expand sidebar';
      }
      isMini = !isMini;
    });
  }

  // Recents chat list toggle (▼ / ▶)
  function updateArrowIcon() {
    if (toggleChatsArrow) {
      toggleChatsArrow.textContent = areChatsVisible ? '▼' : '▶';
      toggleChatsArrow.title = areChatsVisible ? 'Hide chat list' : 'Show chat list';
    }
  }
  function toggleChatsVisibility() {
    if (!chatsContainer) return;
    if (areChatsVisible) {
      chatsContainer.classList.add('hidden');
    } else {
      chatsContainer.classList.remove('hidden');
    }
    areChatsVisible = !areChatsVisible;
    updateArrowIcon();
  }
  if (toggleChatsArrow) {
    toggleChatsArrow.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleChatsVisibility();
    });
    updateArrowIcon();
  }

  // Keyboard support: ArrowDown / ArrowRight (only when sidebar not mini)
  document.addEventListener('keydown', (e) => {
    if (isMini) return;
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) return;
    if (e.key === 'ArrowDown' && areChatsVisible && chatsContainer && !chatsContainer.classList.contains('hidden')) {
      e.preventDefault();
      toggleChatsVisibility();
      window.showToast('↓ Chat list hidden', '#3b3b66');
    } else if (e.key === 'ArrowRight' && !areChatsVisible) {
      e.preventDefault();
      toggleChatsVisibility();
      window.showToast('→ Chat list visible', '#3b3b66');
    }
  });

  // New chat button
  if (newChatBtn) {
    newChatBtn.addEventListener('click', () => {
      if (typeof ChatMgr !== 'undefined' && ChatMgr.newChat) ChatMgr.newChat(true);
      else console.warn('ChatMgr not ready');
      window.showToast('✨ New conversation started', '#2f6e4f');
    });
  }

  // ========== SEARCH BUTTON: toggle inline search bar (FIXED) ==========
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      let searchBar = document.getElementById('chat-search-bar');

      // Create search bar if it doesn't exist
      if (!searchBar) {
        searchBar = document.createElement('input');
        searchBar.id = 'chat-search-bar';
        searchBar.type = 'text';
        searchBar.placeholder = '🔍 Search chats by name...';
        searchBar.style.cssText = `
          margin: 10px 0 15px 0;
          padding: 8px 12px;
          border-radius: 40px;
          border: 1px solid #4a4a6a;
          background: #0e1022;
          color: white;
          width: 100%;
          display: none;
          font-size: 12px;
          outline: none;
        `;
        const actionRow = document.querySelector('.action-row');
        if (actionRow && actionRow.parentNode) {
          actionRow.parentNode.insertBefore(searchBar, actionRow.nextSibling);
        }
      }

      const isVisible = searchBar.style.display === 'block';

      if (!isVisible) {
        // Show search bar
        searchBar.style.display = 'block';
        searchBar.focus();
        searchBar.value = '';

        // Filter function
        const filterChats = () => {
          const query = searchBar.value.toLowerCase();
          const chatItems = document.querySelectorAll('#chat-list .chat-item');
          let hasVisible = false;
          chatItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const match = text.includes(query);
            item.style.display = match ? 'flex' : 'none';
            if (match) hasVisible = true;
          });
          let noMsg = document.getElementById('chat-no-results');
          if (!hasVisible && query !== '') {
            if (!noMsg) {
              noMsg = document.createElement('div');
              noMsg.id = 'chat-no-results';
              noMsg.style.cssText = 'text-align:center; padding:20px; color:#aaa; font-size:12px;';
              noMsg.textContent = '✨ No matching chats. Create a new one!';
              const chatList = document.getElementById('chat-list');
              if (chatList && chatList.parentNode) {
                chatList.parentNode.insertBefore(noMsg, chatList.nextSibling);
              }
            }
            noMsg.style.display = 'block';
          } else if (noMsg) {
            noMsg.style.display = 'none';
          }
        };

        // Attach filter event
        if (searchBar._filterListener) {
          searchBar.removeEventListener('input', searchBar._filterListener);
        }
        searchBar._filterListener = filterChats;
        searchBar.addEventListener('input', filterChats);

        // Handle Escape key to close search
        const escapeHandler = (e) => {
          if (e.key === 'Escape') {
            searchBar.style.display = 'none';
            searchBar.value = '';
            document.querySelectorAll('#chat-list .chat-item').forEach(i => i.style.display = 'flex');
            const noMsg = document.getElementById('chat-no-results');
            if (noMsg) noMsg.style.display = 'none';
            document.removeEventListener('keydown', escapeHandler);
            searchBar._escapeHandler = null;
          }
        };
        if (searchBar._escapeHandler) {
          document.removeEventListener('keydown', searchBar._escapeHandler);
        }
        searchBar._escapeHandler = escapeHandler;
        document.addEventListener('keydown', escapeHandler);

        window.showToast('🔍 Search active — type to filter chats', '#3b3b66');
      } else {
        // Hide search bar and clear filter
        searchBar.style.display = 'none';
        searchBar.value = '';
        document.querySelectorAll('#chat-list .chat-item').forEach(i => i.style.display = 'flex');
        const noMsg = document.getElementById('chat-no-results');
        if (noMsg) noMsg.style.display = 'none';
        if (searchBar._escapeHandler) {
          document.removeEventListener('keydown', searchBar._escapeHandler);
          searchBar._escapeHandler = null;
        }
        window.showToast('Search closed', '#3b3b66');
      }
    });
  }

  // Chats button: open full chat manager modal
  if (chatsBtn) {
    chatsBtn.addEventListener('click', () => {
      openChatsManagerModal();
    });
  }

  // Air mouse button
  if (airMouseBtn) {
    airMouseBtn.addEventListener('click', () => {
      if (typeof HandCtrl !== 'undefined' && HandCtrl.start) HandCtrl.start();
      else alert('Air mouse: hand control not loaded yet.');
    });
  }

  // Fake login button
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      if (!isLoggedIn) {
        isLoggedIn = true;
        window.showToast('✅ Logged in! Your data will now be saved permanently.', '#2a6f8f');
        // Optional: reload the page to load any previously saved data from localStorage?
        // We do not reload automatically – new data will be saved from now on.
        const msgDiv = document.querySelector('.login-message');
        if (msgDiv) msgDiv.innerHTML = '✨ You are now logged in. All future data will be saved.';
      } else {
        window.showToast('🔒 Already logged in.', '#3b3b66');
      }
    });
  }
})();

// Main startup: animation → load MediaPipe → App.init()
(async () => {
  await startupAnimation.run();
  try {
    await Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1640029074/camera_utils.js'),
      loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/face_mesh.js'),
      loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/pose.js'),
      loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.js'),
      loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/objectron/objectron.js'),
    ]);
    const ObjectDetector = {
      _running: false,

      async start() {
        const video = document.getElementById('rightPanelWebcam');
        if (!video || !video.srcObject) {
          App.appendChat('System', '❌ Camera not active.');
          return;
        }

        const objectron = new Objectron({
          locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/objectron/${f}`
        });

        objectron.setOptions({
          modelName: 'Cup',          // 'Cup', 'Shoe', 'Chair', 'Camera'
          maxNumObjects: 3
        });

        objectron.onResults(results => {
          if (results.detectedObjects?.length) {
            results.detectedObjects.forEach(obj => {
              App.appendChat('System', `🎯 Detected: ${obj.id}`);
            });
          }
        });

        const camera = new Camera(video, {
          onFrame: async () => await objectron.send({ image: video }),
          width: 640, height: 480
        });
        camera.start();
        this._running = true;
        App.appendChat('System', '🎯 Object detection started.');
      }
    };
    const FaceDetector = {
      async start() {
        const video = document.getElementById('rightPanelWebcam');

        const faceDetection = new FaceDetection({
          locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${f}`
        });

        faceDetection.setOptions({
          model: 'short',             // 'short' (2m range) or 'full' (5m range)
          minDetectionConfidence: 0.5
        });

        faceDetection.onResults(results => {
          const count = results.detections?.length || 0;
          App.appendChat('System', `👤 ${count} face(s) detected`);

          results.detections?.forEach((det, i) => {
            const score = (det.score[0] * 100).toFixed(0);
            App.appendChat('System', `  Face ${i + 1}: confidence ${score}%`);
          });
        });

        const camera = new Camera(video, {
          onFrame: async () => await faceDetection.send({ image: video }),
          width: 640, height: 480
        });
        camera.start();
      }
    };
    const SelfieSegment = {
      canvas: null,

      async start() {
        const video = document.getElementById('rightPanelWebcam');
        this.canvas = document.createElement('canvas');
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.canvas.style.cssText = 'position:fixed; bottom:20px; right:20px; border-radius:12px; width:200px; z-index:1000;';
        document.body.appendChild(this.canvas);
        const ctx = this.canvas.getContext('2d');

        const seg = new SelfieSegmentation({
          locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${f}`
        });

        seg.setOptions({ modelSelection: 1 }); // 0 = general, 1 = landscape

        seg.onResults(results => {
          ctx.save();
          ctx.clearRect(0, 0, 640, 480);
          ctx.drawImage(results.segmentationMask, 0, 0, 640, 480);
          ctx.globalCompositeOperation = 'source-in';
          ctx.drawImage(results.image, 0, 0, 640, 480);
          ctx.restore();
        });

        const camera = new Camera(video, {
          onFrame: async () => await seg.send({ image: video }),
          width: 640, height: 480
        });
        camera.start();
        App.appendChat('System', '✂️ Background removal active — check bottom right.');
      },

      stop() {
        if (this.canvas) this.canvas.remove();
        App.appendChat('System', 'Segmentation stopped.');
      }
    };
  } catch (e) {
    console.warn('MediaPipe CDN load warning (non-fatal):', e);
  }
  App.init();
  Model.attachBlackHoleToModalCloses();
})();

// --- Reliable page refresh on logo click ---
(function ensureLogoRefresh() {
  const checkAndAttach = () => {
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.style.cursor = 'pointer';
      // Remove any previous listener to avoid duplicates
      logo.removeEventListener('click', window._logoRefreshHandler);
      window._logoRefreshHandler = () => {
        window.location.reload();
      };
      logo.addEventListener('click', window._logoRefreshHandler);
      console.log('Logo refresh enabled');
    } else {
      // Retry after a short delay if logo not found yet
      setTimeout(checkAndAttach, 100);
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndAttach);
  } else {
    checkAndAttach();
  }
})();
// =========================================================================
// FULL LOGIN MODULE (replaces fake login button)
// =========================================================================
(function fullLoginSystem() {
  // ----- Inject CSS (only once) -----
  if (!document.getElementById('loginSystemStyles')) {
    const style = document.createElement('style');
    style.id = 'loginSystemStyles';
    style.textContent = `
      .login-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.85);
        backdrop-filter: blur(8px);
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Segoe UI', system-ui, sans-serif;
      }
      .login-card {
        background: #1e1f2e;
        border-radius: 28px;
        width: 460px;
        max-width: 94vw;
        padding: 28px 26px;
        color: #f0f0ff;
        border: 1px solid #6f5dc2;
        box-shadow: 0 25px 45px rgba(0,0,0,0.5);
      }
      .login-card h2 { font-size: 28px; margin-bottom: 6px; font-weight: 600; }
      .login-card .subhead { font-size: 14px; color: #aaa; margin-bottom: 28px; line-height: 1.4; }
      .login-option {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #2a2c4a;
        padding: 12px 18px;
        border-radius: 60px;
        margin-bottom: 12px;
        cursor: pointer;
        transition: 0.1s;
        font-weight: 500;
      }
      .login-option:hover { background: #3a3c6a; }
      .login-option .icon { font-size: 22px; }
      .or-divider {
        text-align: center;
        margin: 22px 0 12px;
        color: #8b8baa;
        font-size: 12px;
        position: relative;
      }
      .or-divider::before, .or-divider::after {
        content: "";
        position: absolute;
        top: 50%;
        width: 40%;
        height: 1px;
        background: #4a4a6a;
      }
      .or-divider::before { left: 0; }
      .or-divider::after { right: 0; }
      .email-field {
        width: 100%;
        padding: 12px 18px;
        border-radius: 60px;
        border: 1px solid #4a4a6a;
        background: #0e1022;
        color: white;
        margin: 8px 0 18px;
        font-size: 14px;
        outline: none;
        box-sizing: border-box;
      }
      .continue-btn {
        width: 100%;
        background: #7b68ee;
        border: none;
        padding: 12px;
        border-radius: 60px;
        color: white;
        font-weight: bold;
        font-size: 15px;
        cursor: pointer;
        transition: 0.1s;
      }
      .continue-btn:hover { background: #9b88ff; }
      .footer-links {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        font-size: 13px;
      }
      .footer-links span {
        color: #7b68ee;
        cursor: pointer;
      }
      .footer-links span:hover { text-decoration: underline; }
      .account-list {
        max-height: 340px;
        overflow-y: auto;
        margin: 22px 0;
      }
      .account-item {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 16px;
        background: #2a2c4a;
        border-radius: 60px;
        margin-bottom: 10px;
        cursor: pointer;
        transition: 0.1s;
      }
      .account-item:hover { background: #4a3c8a; }
      .avatar-circle {
        width: 46px;
        height: 46px;
        background: #7b68ee;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 18px;
      }
      .phone-group {
        display: flex;
        gap: 8px;
        align-items: center;
        background: #0e1022;
        border: 1px solid #4a4a6a;
        border-radius: 60px;
        padding: 4px 18px;
        margin: 15px 0;
      }
      .phone-group span { font-size: 16px; color: #ddd; }
      .phone-group input {
        flex: 1;
        background: transparent;
        border: none;
        color: white;
        padding: 12px 0;
        outline: none;
        font-size: 14px;
      }
      .back-btn {
        background: transparent;
        border: none;
        color: #7b68ee;
        cursor: pointer;
        font-size: 14px;
        margin-bottom: 18px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .legal-note {
        font-size: 11px;
        color: #6b6b8a;
        margin-top: 20px;
        text-align: center;
      }
    `;
    document.getElementById('save-profile-btn')?.addEventListener('click', saveUserProfile);
    document.getElementById('close-profile-btn')?.addEventListener('click', () => {
      document.getElementById('modal-overlay').classList.add('hidden');
      document.getElementById('user-profile-modal').classList.add('hidden');
    });
    document.head.appendChild(style);
  }
  document.getElementById('close-help-btn')?.addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.getElementById('help-modal').classList.add('hidden');
  });
  document.getElementById('close-learnmore-btn')?.addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.getElementById('learnmore-modal').classList.add('hidden');
  });

  // ----- State -----
  let storedAccounts = [];
  let modalRoot = null;
  let _pendingVerification = null;

  function loadStoredAccounts() {
    const saved = localStorage.getItem('player_user_accounts');
    if (saved) {
      storedAccounts = JSON.parse(saved);
    } else {
      storedAccounts = [
        { type: 'google', email: 'mridulbansal4318@gmail.com', name: 'MRIDUL BANSAL', avatar: 'MB' },
        { type: 'google', email: 'mridul.kun@gmail.com', name: 'Mridul', avatar: 'MK' }
      ];
      saveAccounts();
    }
  }

  function saveAccounts() {
    localStorage.setItem('player_user_accounts', JSON.stringify(storedAccounts));
  }

  function completeLogin(account) {
    // --- Migrate guest data to localStorage ---
    if (!window.isLoggedIn && memoryStore.size > 0) {
      for (let [key, value] of memoryStore.entries()) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch (e) { console.warn('Failed to migrate', key, e); }
      }
      memoryStore.clear();

      // Force reload chat data from localStorage
      if (typeof ChatMgr !== 'undefined') {
        ChatMgr.chats = Store.chats();
        ChatMgr.archivedChats = Store.get('archived_chats', {});
        ChatMgr.refresh();
        if (ChatMgr.current && ChatMgr.chats[ChatMgr.current]) {
          ChatMgr.load(ChatMgr.current);
        } else {
          const ids = Object.keys(ChatMgr.chats);
          if (ids.length) ChatMgr.load(ids[0]);
        }
      }
    }

    // Now proceed with normal login
    window.isLoggedIn = true;
    isLoggedIn = true;
    localStorage.setItem('player_current_user', JSON.stringify(account));
    updateBottomPanel(account);
    closeModal();
    if (window.showToast) window.showToast(`Welcome, ${account.name}! Your previous chats have been saved.`, '#2a6f8f');
  }

  function logout() {
    // Global login flags
    window.isLoggedIn = false;
    isLoggedIn = false;

    // Remove user session from localStorage
    localStorage.removeItem('player_current_user');

    // Clear scan flags (prevents auto‑load after logout)
    localStorage.removeItem('face_scanned');
    localStorage.removeItem('face_gender');
    localStorage.removeItem('body_scanned');
    localStorage.removeItem('body_gender');

    // Clear guest in‑memory caches (if any)
    cachedFaceProfile = null;
    cachedFaceGender = null;
    cachedBodyProfile = null;
    cachedBodyGender = null;

    // Update UI (bottom panel shows login button)
    updateBottomPanel(null);

    // Show a toast notification
    if (window.showToast) window.showToast('Logged out. Data is now temporary.', '#3b3b66');

    // Clean up user menu dropdown close handler if present
    const container = document.querySelector('.user-menu-container');
    if (container && container._closeHandler) {
      document.removeEventListener('click', container._closeHandler);
      delete container._closeHandler;
    }
  }

  function updateBottomPanel(user) {
    const bottom = document.querySelector('.bottom-area');
    if (!bottom) return;

    if (user) {
      let avatarHtml = '';
      let hasPfp = false;
      const savedProfile = localStorage.getItem('user_profile');
      let profilePicData = null;
      let avatarValue = user.avatar || user.name?.charAt(0)?.toUpperCase() || 'P';

      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.avatarType === 'image' && profile.profilePicData) {
          profilePicData = profile.profilePicData;
          hasPfp = true;
        } else if (profile.avatarValue) {
          avatarValue = profile.avatarValue;
        }
      }

      if (profilePicData) {
        avatarHtml = `<img src="${profilePicData}" alt="avatar">`;
      } else {
        avatarHtml = avatarValue;
      }

      bottom.innerHTML = `
      <div class="user-menu-container">
        <div class="bottom-panel-logged" id="bottom-logged-panel">

          <!-- Animated canvas background -->
          <canvas id="avatar-anim-canvas"></canvas>

          <!-- Avatar -->
          <div class="bottom-avatar ${hasPfp ? 'has-pfp' : ''}" id="bottom-avatar-el">
            ${avatarHtml}
          </div>

          <!-- Name + plan -->
          <div class="bottom-user-info">
            <div class="bottom-user-name">${user.name || 'Player'}</div>
            <div class="bottom-user-plan">Free plan</div>
          </div>

          <!-- Action buttons -->
          <div class="bottom-actions">
            <button class="bottom-export-btn" id="bottom-export-btn" title="Settings">↓</button>
            <button class="bottom-chevron-btn" id="bottom-chevron-btn">▲</button>
          </div>
        </div>

        <!-- Dropdown -->
        <div class="user-menu-dropdown hidden" id="bottom-dropdown">
          <div class="menu-item" data-action="upgrade"><span class="menu-icon">⭐</span> Upgrade plan</div>
          <div class="menu-item" data-action="learnmore"><span class="menu-icon">📘</span> Learn More</div>
          <div class="menu-item" data-action="profile"><span class="menu-icon">👤</span> Profile</div>
          <div class="menu-item" data-action="settings"><span class="menu-icon">⚙️</span> Settings</div>
          <div class="menu-item" data-action="help"><span class="menu-icon">❓</span> Help</div>
          <div class="menu-divider"></div>
          <div class="menu-item" data-action="logout"><span class="menu-icon">🚪</span> Log out</div>
        </div>
      </div>
    `;

      // ── Start canvas animation ──
      setTimeout(() => {
        const canvas = document.getElementById('avatar-anim-canvas');
        const panel = document.getElementById('bottom-logged-panel');
        if (!canvas || !panel) return;

        const ctx = canvas.getContext('2d');
        canvas.width = panel.offsetWidth;
        canvas.height = panel.offsetHeight;

        // Particles
        const particles = [];
        const count = hasPfp ? 28 : 14;

        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.6,
            dy: (Math.random() - 0.5) * 0.6,
            alpha: Math.random() * 0.6 + 0.2,
            color: hasPfp
              ? `hsl(${Math.random() * 60 + 200}, 80%, 70%)`   // blue-purple if pfp
              : `hsl(0, 0%, ${Math.floor(Math.random() * 40 + 40)}%)`  // grey if no pfp
          });
        }

        // Flowing wave
        let waveT = 0;

        function drawFrame() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw subtle wave
          waveT += 0.018;
          ctx.beginPath();
          ctx.moveTo(0, canvas.height * 0.6);
          for (let x = 0; x <= canvas.width; x += 4) {
            const y = canvas.height * 0.6
              + Math.sin(x * 0.03 + waveT) * 6
              + Math.sin(x * 0.05 + waveT * 1.4) * 4;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.closePath();
          ctx.fillStyle = hasPfp
            ? 'rgba(60, 80, 180, 0.12)'
            : 'rgba(60, 60, 60, 0.12)';
          ctx.fill();

          // Second wave
          ctx.beginPath();
          ctx.moveTo(0, canvas.height * 0.75);
          for (let x = 0; x <= canvas.width; x += 4) {
            const y = canvas.height * 0.75
              + Math.sin(x * 0.04 + waveT * 1.2 + 1) * 5
              + Math.cos(x * 0.06 + waveT) * 3;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.closePath();
          ctx.fillStyle = hasPfp
            ? 'rgba(80, 40, 160, 0.08)'
            : 'rgba(40, 40, 40, 0.08)';
          ctx.fill();

          // Draw particles
          particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
          });

          requestAnimationFrame(drawFrame);
        }

        drawFrame();

        // Avatar pop animation
        const avatarEl = document.getElementById('bottom-avatar-el');
        if (avatarEl) {
          avatarEl.style.animation = 'none';
          avatarEl.offsetHeight;
          avatarEl.style.animation = 'avatarPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards';
        }
      }, 60);

      // ── Dropdown logic ──
      const chevron = document.getElementById('bottom-chevron-btn');
      const dropdown = document.getElementById('bottom-dropdown');
      const panelEl = bottom.querySelector('.bottom-panel-logged');

      function toggleDropdown() {
        const isHidden = dropdown.classList.contains('hidden');
        dropdown.classList.toggle('hidden');
        chevron.textContent = isHidden ? '▼' : '▲';
      }

      chevron.addEventListener('click', e => { e.stopPropagation(); toggleDropdown(); });
      panelEl.addEventListener('click', e => {
        if (e.target.closest('#bottom-export-btn') || e.target === chevron) return;
        toggleDropdown();
      });
      document.getElementById('bottom-export-btn').addEventListener('click', e => {
        e.stopPropagation();
        handleUserMenuAction('settings', user);
      });

      const closeHandler = e => {
        if (!bottom.contains(e.target)) {
          dropdown.classList.add('hidden');
          chevron.textContent = '▲';
        }
      };
      document.addEventListener('click', closeHandler);

      dropdown.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', e => {
          e.stopPropagation();
          handleUserMenuAction(item.dataset.action, user);
          dropdown.classList.add('hidden');
          chevron.textContent = '▲';
        });
      });

    } else {
      // ── Logged OUT state ──
      bottom.innerHTML = `
      <div class="login-message">Log in to get answers based on saved chats.</div>
      <button id="fakeLoginBtn" class="login-btn">Log in →</button>
    `;
      const newLoginBtn = document.getElementById('fakeLoginBtn');
      if (newLoginBtn) newLoginBtn.addEventListener('click', showMainModal);
    }
  }

  function handleUserMenuAction(action, user) {
    switch (action) {
      case 'upgrade': {
        alert('Upgrade plan: This feature is coming soon.\nYou would be able to subscribe for premium voice, unlimited chats, and advanced AI.');
        break;
      }
      case 'learnmore': {
        // Remove any existing popup first (toggle)
        if (document.getElementById('lr-popup')) {
          document.getElementById('lr-popup').remove();
          break;
        }

        const popup = document.createElement('div');
        popup.id = 'lr-popup';
        popup.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 14px;
    background: #1e1e1e;
    border-radius: 14px;
    padding: 6px 0;
    min-width: 230px;
    z-index: 100001;
    box-shadow: 0 12px 32px rgba(0,0,0,0.7);
    border: 1px solid #2e2e2e;
    font-family: 'Segoe UI', system-ui, sans-serif;
  `;

        const items = [
          {
            icon: '🔵', label: 'About Player', fn: () => {
              popup.remove();
              const o = document.getElementById('modal-overlay');
              const m = document.getElementById('learnmore-modal');
              document.querySelectorAll('.modal').forEach(x => x.classList.add('hidden'));
              if (o && m) { o.classList.remove('hidden'); m.classList.remove('hidden'); }
            }
          },
          { icon: '📋', label: 'Release notes', fn: () => { popup.remove(); window.showToast('Release notes coming soon', '#2a6f8f'); } },
          { icon: '📲', label: 'Download apps', fn: () => { popup.remove(); window.open('https://claude.ai', '_blank'); } },
          {
            icon: '⌨️', label: 'Keyboard shortcuts', fn: () => {
              popup.remove();
              const o = document.getElementById('modal-overlay');
              const h = document.getElementById('help-modal');
              document.querySelectorAll('.modal').forEach(x => x.classList.add('hidden'));
              if (o && h) { o.classList.remove('hidden'); h.classList.remove('hidden'); }
            }
          },
          { divider: true },
          { icon: '📄', label: 'Terms of Service', fn: () => { popup.remove(); window.open('https://www.anthropic.com/legal/consumer-terms', '_blank'); } },
          { icon: '🔒', label: 'Privacy Policy', fn: () => { popup.remove(); window.open('https://www.anthropic.com/legal/privacy', '_blank'); } },
          { icon: '🐞', label: 'Report a bug', fn: () => { popup.remove(); window.open('mailto:support@player.ai?subject=Bug Report', '_blank'); } },
        ];

        items.forEach(item => {
          if (item.divider) {
            const sep = document.createElement('div');
            sep.style.cssText = 'height:1px; background:#2e2e2e; margin:5px 0;';
            popup.appendChild(sep);
            return;
          }
          const row = document.createElement('div');
          row.style.cssText = `
      display: flex; align-items: center; gap: 12px;
      padding: 10px 16px; cursor: pointer; color: #d4d4d4;
      font-size: 13px; font-weight: 400;
      transition: background 0.12s;
      border-radius: 0;
    `;
          row.innerHTML = `<span style="font-size:15px; width:20px; text-align:center;">${item.icon}</span>
                     <span>${item.label}</span>`;
          row.onmouseenter = () => row.style.background = '#2a2a2a';
          row.onmouseleave = () => row.style.background = 'transparent';
          row.onclick = item.fn;
          popup.appendChild(row);
        });

        document.body.appendChild(popup);

        // Close when clicking outside
        setTimeout(() => {
          const close = (e) => {
            if (!popup.contains(e.target)) {
              popup.remove();
              document.removeEventListener('click', close);
            }
          };
          document.addEventListener('click', close);
        }, 10);
        break;
      }
      case 'profile': {
        openProfileEditor();
        break;
      }
      case 'settings': {
        openSettingsModal();
        break;
      }
      case 'help': {
        const helpModal = document.getElementById('help-modal');
        const overlay = document.getElementById('modal-overlay');
        if (helpModal && overlay) {
          overlay.classList.remove('hidden');
          helpModal.classList.remove('hidden');
        } else {
          if (window.App && App.processCommand) {
            App.processCommand('help', App._token);
          } else {
            alert('Help: Type "what can you do" in the chat.');
          }
        }
        break;
      }
      case 'logout': {
        if (typeof logout === 'function') logout();
        break;
      }
      default: {
        console.warn('Unknown action:', action);
      }
    }
  }
  // ========== SETTINGS MODAL ==========

  // Populate language dropdown with all real languages
  async function populateLanguages() {
    const select = document.getElementById('setting-language');
    if (!select) return;
    // Static list of ~180 languages (ISO 639-1)
    const languages = {
      'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German', 'it': 'Italian', 'pt': 'Portuguese',
      'ru': 'Russian', 'zh': 'Chinese', 'ja': 'Japanese', 'ko': 'Korean', 'ar': 'Arabic', 'hi': 'Hindi',
      'bn': 'Bengali', 'pa': 'Punjabi', 'jv': 'Javanese', 'ms': 'Malay', 'ta': 'Tamil', 'te': 'Telugu',
      'vi': 'Vietnamese', 'tr': 'Turkish', 'pl': 'Polish', 'uk': 'Ukrainian', 'ro': 'Romanian', 'nl': 'Dutch',
      'el': 'Greek', 'cs': 'Czech', 'sv': 'Swedish', 'hu': 'Hungarian', 'he': 'Hebrew', 'th': 'Thai',
      'id': 'Indonesian', 'fa': 'Persian', 'ur': 'Urdu', 'sw': 'Swahili', 'no': 'Norwegian', 'da': 'Danish',
      'fi': 'Finnish', 'sk': 'Slovak', 'bg': 'Bulgarian', 'sr': 'Serbian', 'hr': 'Croatian', 'lt': 'Lithuanian',
      'lv': 'Latvian', 'et': 'Estonian', 'sl': 'Slovenian', 'mk': 'Macedonian', 'sq': 'Albanian', 'hy': 'Armenian',
      'ka': 'Georgian', 'az': 'Azerbaijani', 'kk': 'Kazakh', 'uz': 'Uzbek', 'tk': 'Turkmen', 'af': 'Afrikaans',
      'am': 'Amharic', 'my': 'Burmese', 'km': 'Khmer', 'lo': 'Lao', 'ne': 'Nepali', 'si': 'Sinhala',
      'mn': 'Mongolian', 'ps': 'Pashto', 'sd': 'Sindhi', 'gu': 'Gujarati', 'kn': 'Kannada', 'ml': 'Malayalam',
      'mr': 'Marathi', 'or': 'Odia', 'be': 'Belarusian', 'bs': 'Bosnian', 'is': 'Icelandic', 'ga': 'Irish',
      'cy': 'Welsh', 'eo': 'Esperanto', 'la': 'Latin', 'mt': 'Maltese', 'tl': 'Tagalog', 'ca': 'Catalan',
      'eu': 'Basque', 'gl': 'Galician', 'fy': 'Frisian', 'lb': 'Luxembourgish', 'br': 'Breton', 'ku': 'Kurdish',
      'ky': 'Kyrgyz', 'tg': 'Tajik', 'ha': 'Hausa', 'ig': 'Igbo', 'yo': 'Yoruba', 'st': 'Sesotho',
      'tn': 'Tswana', 'xh': 'Xhosa', 'zu': 'Zulu', 'rw': 'Kinyarwanda', 'sn': 'Shona', 'sm': 'Samoan',
      'to': 'Tongan', 'fj': 'Fijian', 'mi': 'Maori', 'haw': 'Hawaiian', 'gd': 'Scottish Gaelic', 'gv': 'Manx'
    };
    for (const [code, name] of Object.entries(languages)) {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = `${name} (${code})`;
      select.appendChild(option);
    }
  }

  // ========== SETTINGS MODAL (FULLY WORKING) ==========

  // ============================================================================
  // 1.  ALL WORLD LANGUAGES  (BCP-47 codes + full speech map)
  // ============================================================================
  const ALL_LANGUAGES = [
    { code: 'af', speech: 'af-ZA', name: 'Afrikaans' },
    { code: 'sq', speech: 'sq-AL', name: 'Albanian' },
    { code: 'am', speech: 'am-ET', name: 'Amharic' },
    { code: 'ar', speech: 'ar-SA', name: 'Arabic' },
    { code: 'hy', speech: 'hy-AM', name: 'Armenian' },
    { code: 'as', speech: 'as-IN', name: 'Assamese' },
    { code: 'az', speech: 'az-AZ', name: 'Azerbaijani' },
    { code: 'eu', speech: 'eu-ES', name: 'Basque' },
    { code: 'be', speech: 'be-BY', name: 'Belarusian' },
    { code: 'bn', speech: 'bn-BD', name: 'Bengali' },
    { code: 'bs', speech: 'bs-BA', name: 'Bosnian' },
    { code: 'bg', speech: 'bg-BG', name: 'Bulgarian' },
    { code: 'my', speech: 'my-MM', name: 'Burmese' },
    { code: 'ca', speech: 'ca-ES', name: 'Catalan' },
    { code: 'ceb', speech: 'fil-PH', name: 'Cebuano' },
    { code: 'ny', speech: 'ny-MW', name: 'Chichewa' },
    { code: 'zh-CN', speech: 'zh-CN', name: 'Chinese (Simplified)' },
    { code: 'zh-TW', speech: 'zh-TW', name: 'Chinese (Traditional)' },
    { code: 'co', speech: 'it-IT', name: 'Corsican' },
    { code: 'hr', speech: 'hr-HR', name: 'Croatian' },
    { code: 'cs', speech: 'cs-CZ', name: 'Czech' },
    { code: 'da', speech: 'da-DK', name: 'Danish' },
    { code: 'nl', speech: 'nl-NL', name: 'Dutch' },
    { code: 'en', speech: 'en-US', name: 'English' },
    { code: 'eo', speech: 'eo', name: 'Esperanto' },
    { code: 'et', speech: 'et-EE', name: 'Estonian' },
    { code: 'tl', speech: 'fil-PH', name: 'Filipino' },
    { code: 'fi', speech: 'fi-FI', name: 'Finnish' },
    { code: 'fr', speech: 'fr-FR', name: 'French' },
    { code: 'gl', speech: 'gl-ES', name: 'Galician' },
    { code: 'ka', speech: 'ka-GE', name: 'Georgian' },
    { code: 'de', speech: 'de-DE', name: 'German' },
    { code: 'el', speech: 'el-GR', name: 'Greek' },
    { code: 'gu', speech: 'gu-IN', name: 'Gujarati' },
    { code: 'ht', speech: 'fr-HT', name: 'Haitian Creole' },
    { code: 'ha', speech: 'ha-NG', name: 'Hausa' },
    { code: 'haw', speech: 'en-US', name: 'Hawaiian' },
    { code: 'he', speech: 'he-IL', name: 'Hebrew' },
    { code: 'hi', speech: 'hi-IN', name: 'Hindi' },
    { code: 'hu', speech: 'hu-HU', name: 'Hungarian' },
    { code: 'is', speech: 'is-IS', name: 'Icelandic' },
    { code: 'ig', speech: 'ig-NG', name: 'Igbo' },
    { code: 'id', speech: 'id-ID', name: 'Indonesian' },
    { code: 'ga', speech: 'ga-IE', name: 'Irish' },
    { code: 'it', speech: 'it-IT', name: 'Italian' },
    { code: 'ja', speech: 'ja-JP', name: 'Japanese' },
    { code: 'jv', speech: 'jv-ID', name: 'Javanese' },
    { code: 'kn', speech: 'kn-IN', name: 'Kannada' },
    { code: 'kk', speech: 'kk-KZ', name: 'Kazakh' },
    { code: 'km', speech: 'km-KH', name: 'Khmer' },
    { code: 'rw', speech: 'rw-RW', name: 'Kinyarwanda' },
    { code: 'ko', speech: 'ko-KR', name: 'Korean' },
    { code: 'ku', speech: 'ku-TR', name: 'Kurdish' },
    { code: 'ky', speech: 'ky-KG', name: 'Kyrgyz' },
    { code: 'lo', speech: 'lo-LA', name: 'Lao' },
    { code: 'lv', speech: 'lv-LV', name: 'Latvian' },
    { code: 'lt', speech: 'lt-LT', name: 'Lithuanian' },
    { code: 'lb', speech: 'lb-LU', name: 'Luxembourgish' },
    { code: 'mk', speech: 'mk-MK', name: 'Macedonian' },
    { code: 'mg', speech: 'mg-MG', name: 'Malagasy' },
    { code: 'ms', speech: 'ms-MY', name: 'Malay' },
    { code: 'ml', speech: 'ml-IN', name: 'Malayalam' },
    { code: 'mt', speech: 'mt-MT', name: 'Maltese' },
    { code: 'mi', speech: 'mi-NZ', name: 'Maori' },
    { code: 'mr', speech: 'mr-IN', name: 'Marathi' },
    { code: 'mn', speech: 'mn-MN', name: 'Mongolian' },
    { code: 'ne', speech: 'ne-NP', name: 'Nepali' },
    { code: 'no', speech: 'nb-NO', name: 'Norwegian' },
    { code: 'or', speech: 'or-IN', name: 'Odia (Oriya)' },
    { code: 'ps', speech: 'ps-AF', name: 'Pashto' },
    { code: 'fa', speech: 'fa-IR', name: 'Persian' },
    { code: 'pl', speech: 'pl-PL', name: 'Polish' },
    { code: 'pt', speech: 'pt-PT', name: 'Portuguese' },
    { code: 'pt-BR', speech: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'pa', speech: 'pa-IN', name: 'Punjabi' },
    { code: 'ro', speech: 'ro-RO', name: 'Romanian' },
    { code: 'ru', speech: 'ru-RU', name: 'Russian' },
    { code: 'sm', speech: 'sm-WS', name: 'Samoan' },
    { code: 'gd', speech: 'gd-GB', name: 'Scottish Gaelic' },
    { code: 'sr', speech: 'sr-RS', name: 'Serbian' },
    { code: 'st', speech: 'st-ZA', name: 'Sesotho' },
    { code: 'sn', speech: 'sn-ZW', name: 'Shona' },
    { code: 'sd', speech: 'sd-PK', name: 'Sindhi' },
    { code: 'si', speech: 'si-LK', name: 'Sinhala' },
    { code: 'sk', speech: 'sk-SK', name: 'Slovak' },
    { code: 'sl', speech: 'sl-SI', name: 'Slovenian' },
    { code: 'so', speech: 'so-SO', name: 'Somali' },
    { code: 'es', speech: 'es-ES', name: 'Spanish' },
    { code: 'es-MX', speech: 'es-MX', name: 'Spanish (Mexico)' },
    { code: 'su', speech: 'su-ID', name: 'Sundanese' },
    { code: 'sw', speech: 'sw-KE', name: 'Swahili' },
    { code: 'sv', speech: 'sv-SE', name: 'Swedish' },
    { code: 'tg', speech: 'tg-TJ', name: 'Tajik' },
    { code: 'ta', speech: 'ta-IN', name: 'Tamil' },
    { code: 'tt', speech: 'tt-RU', name: 'Tatar' },
    { code: 'te', speech: 'te-IN', name: 'Telugu' },
    { code: 'th', speech: 'th-TH', name: 'Thai' },
    { code: 'ti', speech: 'ti-ET', name: 'Tigrinya' },
    { code: 'tr', speech: 'tr-TR', name: 'Turkish' },
    { code: 'tk', speech: 'tk-TM', name: 'Turkmen' },
    { code: 'uk', speech: 'uk-UA', name: 'Ukrainian' },
    { code: 'ur', speech: 'ur-PK', name: 'Urdu' },
    { code: 'ug', speech: 'ug-CN', name: 'Uyghur' },
    { code: 'uz', speech: 'uz-UZ', name: 'Uzbek' },
    { code: 'vi', speech: 'vi-VN', name: 'Vietnamese' },
    { code: 'cy', speech: 'cy-GB', name: 'Welsh' },
    { code: 'xh', speech: 'xh-ZA', name: 'Xhosa' },
    { code: 'yi', speech: 'yi', name: 'Yiddish' },
    { code: 'yo', speech: 'yo-NG', name: 'Yoruba' },
    { code: 'zu', speech: 'zu-ZA', name: 'Zulu' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  // Look up a language entry by code
  function _langEntry(code) {
    return ALL_LANGUAGES.find(l => l.code === code) || { code: 'en', speech: 'en-US', name: 'English' };
  }

  // ============================================================================
  // 2.  SETTINGS STORE
  // ============================================================================
  const Settings = {
    DEFAULTS: {
      language: 'en', theme: 'dark',
      playerCallYou: 'Sir', youCallPlayer: 'Player',
      work: '', customInstructions: '',
      notifyResponse: false, notifyDispatch: false
    },
    _data: null,

    load() {
      try {
        const s = localStorage.getItem('player_settings');
        this._data = s ? { ...this.DEFAULTS, ...JSON.parse(s) } : { ...this.DEFAULTS };
      } catch { this._data = { ...this.DEFAULTS }; }
      return this._data;
    },

    save(patch) {
      this._data = { ...this._data, ...patch };
      localStorage.setItem('player_settings', JSON.stringify(this._data));
      this._apply();
    },

    get(key) {
      if (!this._data) this.load();
      return this._data[key] ?? this.DEFAULTS[key];
    },

    getAll() {
      if (!this._data) this.load();
      return { ...this._data };
    },

    _apply() {
      this._applyTheme();
      this._applyLanguage();
      this._applyCustomNames();
    },

    _applyTheme() {
      const t = this.get('theme');
      const dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.body.classList.toggle('light-theme', !dark);
    },

    // ── Sets three globals consumed by TTS, STT and AI prompt ──
    _applyLanguage() {
      const e = _langEntry(this.get('language'));
      window._activeLang = e;          // full entry
      window._speechLang = e.speech;   // for SpeechRecognition.lang
      window._responseLang = e.name;     // human name → AI "respond in X"
      window._responseLangCode = e.speech;   // for SpeechSynthesisUtterance.lang
    },

    _applyCustomNames() {
      window._playerCallYou = this.get('playerCallYou') || 'Sir';
      window._youCallPlayer = this.get('youCallPlayer') || 'Player';
      window._customInstructions = this.get('customInstructions') || '';
    }
  };

  // ============================================================================
  // 3.  PATCH Voice.speak  →  uses selected language for TTS voice + lang
  // ============================================================================
  (function patchVoiceSpeak() {
    const tryPatch = () => {
      if (!window.Voice) { setTimeout(tryPatch, 200); return; }

      window.Voice.speak = function (text, token) {
        if (token !== undefined && token !== window.App?._token) return;
        window.speechSynthesis.cancel();

        const utt = new SpeechSynthesisUtterance(text);
        const lang = window._responseLangCode || 'en-US';
        utt.lang = lang;
        utt.rate = 1.0;
        utt.pitch = 1.0;
        utt.volume = 1.0;

        // Pick the best matching installed voice
        const assignVoice = () => {
          const voices = window.speechSynthesis.getVoices();
          if (!voices.length) return;
          // 1. exact BCP-47 match
          let v = voices.find(v => v.lang === lang);
          // 2. language prefix match  (e.g. "hi" inside "hi-IN")
          if (!v) {
            const prefix = lang.split('-')[0].toLowerCase();
            v = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
          }
          // 3. any voice for the same script family (fallback)
          if (!v && !lang.startsWith('en')) {
            v = voices.find(v => !v.lang.startsWith('en'));
          }
          if (v) utt.voice = v;
        };

        if (window.speechSynthesis.getVoices().length) {
          assignVoice();
          window.speechSynthesis.speak(utt);
        } else {
          // voices load async on first page interaction
          window.speechSynthesis.addEventListener('voiceschanged', function once() {
            window.speechSynthesis.removeEventListener('voiceschanged', once);
            assignVoice();
            window.speechSynthesis.speak(utt);
          });
        }

        utt.onstart = () => window.SpeechInterrupt?.onSpeechStart?.();
        utt.onend = () => window.SpeechInterrupt?.onSpeechEnd?.();
        utt.onerror = () => window.SpeechInterrupt?.onSpeechEnd?.();
      };

      window.Voice.stop = function () {
        window.speechSynthesis.cancel();
        window.SpeechInterrupt?.onSpeechEnd?.();
      };
    };
    tryPatch();
  })();

  // ============================================================================
  // 4.  PATCH Voice.listen  →  uses selected language for speech recognition
  // ============================================================================
  (function patchVoiceListen() {
    const tryPatch = () => {
      if (!window.Voice) { setTimeout(tryPatch, 200); return; }

      window.Voice.listen = function () {
        return new Promise((resolve, reject) => {
          const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (!SR) { reject(new Error('Speech recognition not supported.')); return; }

          const rec = new SR();
          rec.lang = window._speechLang || 'en-US';
          rec.continuous = false;
          rec.interimResults = false;
          rec.maxAlternatives = 1;

          rec.onresult = e => resolve(e.results[0][0].transcript);
          rec.onerror = e => {
            const m = {
              'not-allowed': 'Microphone access denied.',
              'no-speech': 'No speech detected.',
              'audio-capture': 'No microphone found.',
              'network': 'Network error.'
            };
            reject(new Error(m[e.error] || `Error: ${e.error}`));
          };
          try { rec.start(); } catch (err) {
            reject(new Error('Could not start recognition: ' + err.message));
          }
        });
      };
    };
    tryPatch();
  })();

  // ============================================================================
  // 5.  PATCH SearchEngine._askClaude  →  AI ALWAYS replies in selected language
  // ============================================================================
  (function patchAskClaude() {
    const tryPatch = () => {
      if (!window.SearchEngine) { setTimeout(tryPatch, 300); return; }

      window.SearchEngine._askClaude = async function (query, token) {
        const callYou = window._playerCallYou || 'Sir';
        const nameYou = window._youCallPlayer || 'Player';
        const langName = window._responseLang || 'English';
        const langCode = window._responseLangCode || 'en-US';
        const custom = window._customInstructions || '';
        const work = Settings.get('work');

        // Language instruction – empty for English, mandatory for everything else
        const langRule = langCode.startsWith('en')
          ? ''
          : `VERY IMPORTANT: You MUST reply ENTIRELY in ${langName}. ` +
          `Every word must be in ${langName}. ` +
          `Do NOT include any English unless the user wrote in English.`;

        const sysPrompt = [
          `You are ${nameYou}, a helpful voice assistant. Address the user as "${callYou}".`,
          `Give a concise answer in 1-3 sentences, suitable for text-to-speech.`,
          langRule,
          work ? `The user works as: ${work}.` : '',
          custom ? `Extra user instructions: ${custom}` : ''
        ].filter(Boolean).join(' ');

        try {
          const resp = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 1000,
              system: sysPrompt,
              messages: [{ role: 'user', content: query }]
            })
          });
          const data = await resp.json();
          const reply = data.content?.[0]?.text;

          if (reply) {
            window.App?.speak(reply, token);
            if (Settings.get('notifyResponse') && Notification.permission === 'granted')
              new Notification(`${nameYou} replied`, { body: reply.substring(0, 80) });
          } else {
            window.App?.speak('Sorry, I could not find a clear answer.', token);
          }
        } catch {
          window.App?.speak('Sorry, I could not reach the AI right now.', token);
        }
      };
    };
    tryPatch();
  })();

  function refreshArchivedChatsList() {
    const container = document.getElementById('archived-chats-list');
    if (!container) return;  // Silently exit if container doesn't exist

    const archived = ChatMgr.getArchivedChats();
    if (archived.length === 0) {
      container.innerHTML = '<div style="padding: 12px; text-align: center; color: #aaa;">No archived chats.</div>';
      return;
    }

    container.innerHTML = archived.map(chat => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-bottom: 1px solid #2a2a4a;">
      <div>
        <strong>${escapeHtml(chat.name)}</strong><br>
        <small style="color: #aaa;">Archived: ${chat.timestamp}</small>
      </div>
      <div>
        <button class="restore-chat-btn" data-id="${chat.id}" style="background: #2a7a2a; border: none; border-radius: 4px; padding: 4px 12px; color: white; cursor: pointer; margin-right: 4px;">Restore</button>
        <button class="delete-archived-chat-btn" data-id="${chat.id}" style="background: #d32f2f; border: none; border-radius: 4px; padding: 4px 12px; color: white; cursor: pointer;">Delete</button>
      </div>
    </div>
  `).join('');

    // Attach event listeners only if buttons exist
    container.querySelectorAll('.restore-chat-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        if (ChatMgr.unarchiveChat(id)) {
          refreshArchivedChatsList();
          if (window.showToast) window.showToast('Chat restored.', '#2a6f8f');
          ChatMgr.refresh();
        }
      };
    });

    container.querySelectorAll('.delete-archived-chat-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        if (confirm('Permanently delete this archived chat?')) {
          if (ChatMgr.deleteArchivedChat(id)) {
            refreshArchivedChatsList();
            if (window.showToast) window.showToast('Chat deleted permanently.', '#b3476e');
          }
        }
      };
    });
  }

  // ============================================================================
  // 6.  SETTINGS UI  (tabs, form, all button actions)
  // ============================================================================
  const SettingsUI = {

    open() {
      this._populateLanguages();
      this._loadFormValues();
      const overlay = document.getElementById('modal-overlay');
      const modal = document.getElementById('settings-modal');
      if (!overlay || !modal) return;
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
      overlay.classList.remove('hidden');
      modal.classList.remove('hidden');
      refreshArchivedChatsList();
    },

    close() {
      document.getElementById('modal-overlay')?.classList.add('hidden');
      document.getElementById('settings-modal')?.classList.add('hidden');
    },

    // Fill every #setting-language <select> with ALL world languages
    _populateLanguages() {
      document.querySelectorAll('#setting-language').forEach(sel => {
        if (sel.dataset.populated) return;
        sel.innerHTML = '';
        ALL_LANGUAGES.forEach(lang => {
          const opt = document.createElement('option');
          opt.value = lang.code;
          opt.textContent = `${lang.name}  (${lang.code})`;
          sel.appendChild(opt);
        });
        sel.dataset.populated = '1';
      });
      const saved = Settings.get('language');
      document.querySelectorAll('#setting-language').forEach(s => { s.value = saved; });
    },


    _loadFormValues() {
      const s = Settings.getAll();
      const set = (id, val) => document.querySelectorAll(`#${id}`).forEach(el => {
        if (el.type === 'checkbox') el.checked = !!val; else el.value = val ?? '';
      });
      set('setting-language', s.language);
      set('setting-theme', s.theme);
      set('setting-playerCallYou', s.playerCallYou);
      set('setting-youCallPlayer', s.youCallPlayer);
      set('setting-work', s.work);
      set('setting-customInstructions', s.customInstructions);
      set('setting-notifyResponse', s.notifyResponse);
      set('setting-notifyDispatch', s.notifyDispatch);
    },

    save() {
      const get = id => {
        const el = document.querySelector(`#${id}`);
        if (!el) return undefined;
        return el.type === 'checkbox' ? el.checked : el.value;
      };
      const patch = {
        language: get('setting-language') || 'en',
        theme: get('setting-theme') || 'dark',
        playerCallYou: get('setting-playerCallYou') || 'Sir',
        youCallPlayer: get('setting-youCallPlayer') || 'Player',
        work: get('setting-work') || '',
        customInstructions: get('setting-customInstructions') || '',
        notifyResponse: get('setting-notifyResponse') ?? false,
        notifyDispatch: get('setting-notifyDispatch') ?? false
      };

      Settings.save(patch);   // persists + calls _apply() → _applyLanguage()
      this.close();

      const entry = _langEntry(patch.language);
      const msg = `✅ Settings saved. Language: ${entry.name}. Player will now speak, listen and reply in ${entry.name}.`;
      _toast(msg, '#2a6f8f');
      window.App?.appendChat?.('System', msg);

      // Play a short greeting in the newly selected language
      setTimeout(() => {
        const demo = _langGreeting(entry.name);
        if (window.Voice?.speak) Voice.speak(demo, window.App?._token);
      }, 400);
    },

    initTabs() {
      document.querySelectorAll('#settings-sidebar .settings-menu-item').forEach(item => {
        item.addEventListener('click', () => {
          document.querySelectorAll('#settings-sidebar .settings-menu-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          const tabId = item.dataset.settingsTab;
          document.querySelectorAll('.settings-tab-content').forEach(c => c.classList.remove('active'));
          document.getElementById(`settings-${tabId}`)?.classList.add('active');
        });
      });
    },

    initDataControl() {
      document.getElementById('manageLocationBtn')?.addEventListener('click', () => {
        if (!navigator.geolocation) { _toast('Geolocation not supported.', '#b3476e'); return; }
        navigator.geolocation.getCurrentPosition(
          p => _toast(`📍 Lat: ${p.coords.latitude.toFixed(4)}, Lon: ${p.coords.longitude.toFixed(4)}`, '#2a6f8f'),
          e => _toast(`Location denied: ${e.message}`, '#b3476e')
        );
      });

      document.getElementById('showArchivedBtn')?.addEventListener('click', () => {
        const c = document.getElementById('archived-chats-container');
        if (!c) return;
        const isOpen = c.style.display !== 'none';
        c.style.display = isOpen ? 'none' : 'block';
        if (!isOpen) refreshArchivedChatsList();
        document.getElementById('showArchivedBtn').textContent =
          isOpen ? '📦 Show Archived Chats' : '📦 Hide Archived Chats';
      });

      document.getElementById('manageSharedLinksBtn')?.addEventListener('click', () => {
        const ids = Object.keys(window.ChatMgr?.chats || {});
        alert(ids.map(id => `"${ChatMgr.chats[id].name}" → ${location.href}?chat=${id}`).join('\n') || 'No chats yet.');
      });

      document.getElementById('manageArchivedBtn')?.addEventListener('click', () => {
        if (typeof openChatsManagerModal === 'function') openChatsManagerModal();
      });

      document.getElementById('archiveAllChatsBtn')?.addEventListener('click', () => {
        if (confirm('Archive ALL active chats? They will be moved to archive.')) {
          ChatMgr.archiveAllChats();
          refreshArchivedChatsList();
          if (window.showToast) window.showToast('All chats archived.', '#2a6f8f');
        }
      });

      document.getElementById('archiveAllChatsBtn')?.addEventListener('click', () => {
        if (!confirm('Archive ALL active chats?')) return;
        let n = 0;
        for (const id in (window.ChatMgr?.chats || {}))
          if (!ChatMgr.chats[id].archived) { ChatMgr.chats[id].archived = true; n++; }
        ChatMgr.save?.(); ChatMgr.refresh?.();
        _toast(`📦 ${n} chat(s) archived.`, '#2a6f8f');
      });

      document.getElementById('exportDataBtn')?.addEventListener('click', () => {
        const blob = new Blob([JSON.stringify({
          exportDate: new Date().toISOString(),
          settings: Settings.getAll(),
          chats: window.ChatMgr?.chats || {},
          faceProfile: window.Store?.faceProfile?.() || {},
          bodyProfile: window.Store?.bodyProfile?.() || {},
          goals: window.Store?.goals?.() || {},
          todo: window.Store?.todo?.() || [],
          schedule: window.Store?.schedule?.() || {},
          notepad: window.Store?.notepad?.() || ''
        }, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `player_export_${Date.now()}.json`;
        a.click(); URL.revokeObjectURL(a.href);
        _toast('📤 Data exported.', '#2a6f8f');
      });

      document.getElementById('clearMemoryBtn')?.addEventListener('click', () => {
        if (!confirm('Delete ALL memory (face, body, goals, todo, schedule, notepad)?')) return;
        ['face_profile', 'body_profile', 'goals', 'todo', 'schedule', 'notepad_content',
          'mytodo_tasks', 'weekly_schedule_manager', 'goal_setting_action_plan'].forEach(k => localStorage.removeItem(k));
        if (window.Store) {
          Store.set('face_profile', { timestamp: null }); Store.set('body_profile', { timestamp: null });
          Store.set('goals', {}); Store.set('todo', []); Store.set('schedule', {});
        }
        window.Radar?.refresh?.();
        _toast('🧠 Memory cleared.', '#b3476e');
        window.App?.appendChat?.('System', '🧠 All memory has been cleared.');
      });
    },

    initNotifications() {
      const askPerm = async el => {
        if (!el.checked) return;
        const p = await Notification.requestPermission?.().catch(() => 'denied');
        if (p !== 'granted') { el.checked = false; _toast('⚠️ Notifications denied in browser.', '#b3476e'); }
        else _toast('🔔 Notifications enabled.', '#2a6f8f');
      };
      document.getElementById('setting-notifyResponse')?.addEventListener('change', e => askPerm(e.target));
      document.getElementById('setting-notifyDispatch')?.addEventListener('change', e => askPerm(e.target));
    },


    initSecurity() {
      // helper: tiny inline modal dialog
      const dialog = (title, html, buttons) => new Promise(resolve => {
        const d = document.createElement('div');
        d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:99999;display:flex;align-items:center;justify-content:center;';
        d.innerHTML = `
      <div style="background:#1a1a2e;border:1px solid #7b68ee;border-radius:16px;padding:24px;width:380px;max-width:94vw;color:#e0e0ff;">
        <div style="font-size:15px;font-weight:700;color:#c084fc;margin-bottom:16px;">${title}</div>
        ${html}
        <div id="_dlg_btns" style="display:flex;gap:8px;margin-top:16px;justify-content:flex-end;"></div>
      </div>`;
        document.body.appendChild(d);
        const btnRow = d.querySelector('#_dlg_btns');
        buttons.forEach(b => {
          const el = document.createElement('button');
          el.textContent = b.label;
          el.style.cssText = `background:${b.color || '#2a2c5a'};border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;`;
          el.onclick = () => { document.body.removeChild(d); resolve(b.value); };
          btnRow.appendChild(el);
        });
        d.addEventListener('click', e => { if (e.target === d) { document.body.removeChild(d); resolve(null); } });
      });

      const toast = (msg, color = '#2a6f8f') => window.showToast?.(msg, color);

      // ── PASSWORD ──
      document.getElementById('addPasswordBtn')?.addEventListener('click', async () => {
        const isSet = SecurityManager.hasPassword();
        const title = isSet ? '🔑 Change Password' : '🔑 Set Password';
        const oldField = isSet ? `<input id="_old_pw" type="password" placeholder="Current password" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid #4a4a6a;background:#0e1022;color:#fff;margin-bottom:8px;box-sizing:border-box;">` : '';
        const val = await dialog(title, `
      ${oldField}
      <input id="_new_pw" type="password" placeholder="New password (min 8 chars)" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid #4a4a6a;background:#0e1022;color:#fff;margin-bottom:8px;box-sizing:border-box;">
      <input id="_conf_pw" type="password" placeholder="Confirm new password" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid #4a4a6a;background:#0e1022;color:#fff;box-sizing:border-box;">
      <div id="_pw_err" style="color:#ff6b6b;font-size:11px;margin-top:6px;min-height:16px;"></div>`,
          [{ label: 'Cancel', value: null, color: '#3a3a5a' }, { label: 'Save', value: 'save', color: '#2a7a2a' }]);
        if (val !== 'save') return;
        // re-read from DOM before dialog removed... we need to read values inside the dialog
        // use a different approach - read BEFORE closing
      });

      // Better approach: inline dialog with live validation
      document.getElementById('addPasswordBtn')?.removeEventListener('click', () => { });
      document.getElementById('addPasswordBtn')?.addEventListener('click', async () => {
        const isSet = SecurityManager.hasPassword();
        const d = document.createElement('div');
        d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99999;display:flex;align-items:center;justify-content:center;';
        d.innerHTML = `
      <div style="background:#1a1a2e;border:1px solid #7b68ee;border-radius:16px;padding:24px;width:380px;max-width:94vw;color:#e0e0ff;">
        <div style="font-size:15px;font-weight:700;color:#c084fc;margin-bottom:16px;">🔑 ${isSet ? 'Change' : 'Set'} Password</div>
        ${isSet ? `<input id="_old_pw" type="password" placeholder="Current password" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid #4a4a6a;background:#0e1022;color:#fff;margin-bottom:8px;box-sizing:border-box;">` : ''}
        <input id="_new_pw" type="password" placeholder="New password (min 8 chars)" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid #4a4a6a;background:#0e1022;color:#fff;margin-bottom:8px;box-sizing:border-box;">
        <input id="_conf_pw" type="password" placeholder="Confirm new password" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid #4a4a6a;background:#0e1022;color:#fff;box-sizing:border-box;">
        <div id="_pw_err" style="color:#ff6b6b;font-size:11px;margin-top:6px;min-height:16px;"></div>
        <div style="display:flex;gap:8px;margin-top:16px;justify-content:flex-end;">
          <button id="_pw_cancel" style="background:#3a3a5a;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">Cancel</button>
          <button id="_pw_save" style="background:#2a7a2a;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">💾 Save</button>
        </div>
      </div>`;
        document.body.appendChild(d);
        d.querySelector('#_pw_cancel').onclick = () => d.remove();
        d.querySelector('#_pw_save').onclick = async () => {
          const oldPw = d.querySelector('#_old_pw')?.value || '';
          const newPw = d.querySelector('#_new_pw').value;
          const confPw = d.querySelector('#_conf_pw').value;
          const err = d.querySelector('#_pw_err');
          if (isSet && !await SecurityManager.checkPassword(oldPw)) { err.textContent = '❌ Current password is wrong.'; return; }
          if (newPw.length < 8) { err.textContent = '❌ Password must be at least 8 characters.'; return; }
          if (newPw !== confPw) { err.textContent = '❌ Passwords do not match.'; return; }
          await SecurityManager.setPassword(newPw);
          d.remove();
          toast(`🔑 Password ${isSet ? 'changed' : 'set'} successfully.`, '#2a7a2a');
          document.getElementById('addPasswordBtn').textContent = 'Change';
        };
      });

      // ── SECURITY KEYS / PASSKEYS ──
      document.getElementById('addSecurityKeyBtn')?.addEventListener('click', async () => {
        const d = document.createElement('div');
        d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99999;display:flex;align-items:center;justify-content:center;';
        const passkeys = SecurityManager.getPasskeys();
        d.innerHTML = `
      <div style="background:#1a1a2e;border:1px solid #7b68ee;border-radius:16px;padding:24px;width:420px;max-width:94vw;color:#e0e0ff;">
        <div style="font-size:15px;font-weight:700;color:#c084fc;margin-bottom:16px;">🔐 Security Keys & Passkeys</div>
        <div id="_pk_list" style="max-height:200px;overflow-y:auto;margin-bottom:12px;">
          ${passkeys.length ? passkeys.map(p => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#12122a;border-radius:8px;margin-bottom:6px;">
              <div><div style="font-size:12px;font-weight:600;">🔑 ${p.name}</div><div style="font-size:10px;color:#888;">Added: ${p.created}</div></div>
              <button data-pkid="${p.id}" class="_rm_pk" style="background:#a1587e;border:none;border-radius:8px;padding:3px 10px;color:#fff;cursor:pointer;font-size:11px;">Remove</button>
            </div>`).join('')
            : '<div style="color:#888;font-size:12px;padding:8px;">No passkeys registered yet.</div>'}
        </div>
        <div style="font-size:11px;color:#aaa;margin-bottom:12px;">Passkeys use your device's biometrics (fingerprint, face ID) or PIN for secure sign-in.</div>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button id="_pk_close" style="background:#3a3a5a;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">Close</button>
          <button id="_pk_add" style="background:#7b68ee;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">➕ Register Passkey</button>
        </div>
      </div>`;
        document.body.appendChild(d);
        d.querySelector('#_pk_close').onclick = () => d.remove();
        d.querySelectorAll('._rm_pk').forEach(btn => {
          btn.onclick = () => {
            SecurityManager.removePasskey(btn.dataset.pkid);
            btn.closest('div[style]').remove();
            toast('Passkey removed.', '#b3476e');
          };
        });
        d.querySelector('#_pk_add').onclick = async () => {
          try {
            d.querySelector('#_pk_add').textContent = 'Registering…';
            await SecurityManager.registerPasskey();
            d.remove();
            toast('🔐 Passkey registered! You can now sign in with biometrics.', '#2a7a2a');
          } catch (e) {
            d.querySelector('#_pk_add').textContent = '➕ Register Passkey';
            toast('❌ ' + e.message, '#b3476e');
          }
        };
      });

      // ── MFA — AUTHENTICATOR APP ──
      document.getElementById('setupAuthenticatorBtn')?.addEventListener('click', () => {
        const existing = SecurityManager.getTOTPStatus();
        const d = document.createElement('div');
        d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99999;display:flex;align-items:center;justify-content:center;';

        if (existing?.enabled) {
          d.innerHTML = `
        <div style="background:#1a1a2e;border:1px solid #7b68ee;border-radius:16px;padding:24px;width:360px;max-width:94vw;color:#e0e0ff;">
          <div style="font-size:15px;font-weight:700;color:#c084fc;margin-bottom:12px;">🔒 Authenticator App</div>
          <div style="background:#1e3a2a;border:1px solid #2a7a2a;border-radius:8px;padding:10px;font-size:12px;margin-bottom:14px;">✅ MFA is currently <strong>ENABLED</strong><br><span style="color:#888;">Active since: ${existing.createdAt}</span></div>
          <div style="display:flex;gap:8px;justify-content:flex-end;">
            <button id="_totp_close" style="background:#3a3a5a;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">Close</button>
            <button id="_totp_disable" style="background:#a1587e;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">🗑️ Disable MFA</button>
          </div>
        </div>`;
          document.body.appendChild(d);
          d.querySelector('#_totp_close').onclick = () => d.remove();
          d.querySelector('#_totp_disable').onclick = () => {
            SecurityManager.disableTOTP();
            d.remove();
            toast('🔒 Authenticator MFA disabled.', '#b3476e');
            document.getElementById('setupAuthenticatorBtn').textContent = 'Set up';
          };
          return;
        }

        const secret = SecurityManager.generateTOTPSecret();
        const user = JSON.parse(localStorage.getItem('player_current_user') || '{}');
        const email = encodeURIComponent(user.email || 'user@player.ai');
        const qrUrl = `https://chart.googleapis.com/chart?chs=180x180&chld=M|0&cht=qr&chl=${encodeURIComponent(`otpauth://totp/PlayerAI:${email}?secret=${secret}&issuer=PlayerAI`)}`;

        d.innerHTML = `
      <div style="background:#1a1a2e;border:1px solid #7b68ee;border-radius:16px;padding:24px;width:400px;max-width:94vw;color:#e0e0ff;">
        <div style="font-size:15px;font-weight:700;color:#c084fc;margin-bottom:8px;">🔒 Set Up Authenticator</div>
        <div style="font-size:11px;color:#aaa;margin-bottom:12px;">1. Install Google Authenticator or Authy<br>2. Scan the QR code below<br>3. Enter the 6-digit code to confirm</div>
        <div style="text-align:center;margin-bottom:10px;">
          <img src="${qrUrl}" style="border-radius:8px;border:2px solid #7b68ee;" onerror="this.style.display='none'">
        </div>
        <div style="background:#12122a;border-radius:8px;padding:8px 12px;font-size:11px;margin-bottom:12px;word-break:break-all;">
          <span style="color:#888;">Manual key: </span><span style="color:#c084fc;font-family:monospace;">${secret}</span>
        </div>
        <input id="_totp_code" type="text" inputmode="numeric" maxlength="6" placeholder="Enter 6-digit code to verify" style="width:100%;padding:8px 12px;border-radius:8px;border:1px solid #4a4a6a;background:#0e1022;color:#fff;box-sizing:border-box;font-size:16px;letter-spacing:4px;text-align:center;">
        <div id="_totp_err" style="color:#ff6b6b;font-size:11px;margin-top:6px;min-height:14px;"></div>
        <div style="display:flex;gap:8px;margin-top:12px;justify-content:flex-end;">
          <button id="_totp_cancel" style="background:#3a3a5a;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">Cancel</button>
          <button id="_totp_verify" style="background:#2a7a2a;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">✅ Verify & Enable</button>
        </div>
      </div>`;
        document.body.appendChild(d);
        d.querySelector('#_totp_cancel').onclick = () => d.remove();
        d.querySelector('#_totp_verify').onclick = () => {
          const entered = d.querySelector('#_totp_code').value.trim();
          const expected = SecurityManager.getTOTPCode(secret);
          // Accept correct TOTP OR a demo bypass with "000000" for testing
          if (entered === expected || entered === '000000') {
            SecurityManager.setupTOTP(secret);
            d.remove();
            toast('✅ Authenticator MFA enabled! Your account is now more secure.', '#2a7a2a');
            document.getElementById('setupAuthenticatorBtn').textContent = 'Enabled ✓';
          } else {
            d.querySelector('#_totp_err').textContent = `❌ Wrong code. Expected: ${expected} (or use 000000 to test)`;
          }
        };
      });

      // ── MFA — SMS ──
      document.getElementById('setupSMSBtn')?.addEventListener('click', () => {
        const existingPhone = SecurityManager.getSMSPhone();
        const d = document.createElement('div');
        d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99999;display:flex;align-items:center;justify-content:center;';
        d.innerHTML = `
      <div style="background:#1a1a2e;border:1px solid #7b68ee;border-radius:16px;padding:24px;width:380px;max-width:94vw;color:#e0e0ff;" id="_sms_step1">
        <div style="font-size:15px;font-weight:700;color:#c084fc;margin-bottom:8px;">💬 SMS Verification</div>
        ${existingPhone ? `<div style="background:#1e3a2a;border:1px solid #2a7a2a;border-radius:8px;padding:8px 12px;font-size:12px;margin-bottom:12px;">✅ Phone: ${existingPhone}</div>` : ''}
        <div style="font-size:11px;color:#aaa;margin-bottom:10px;">Enter your phone number to receive a verification code.</div>
        <div style="display:flex;gap:8px;margin-bottom:8px;">
          <select id="_sms_cc" style="background:#0e1022;border:1px solid #4a4a6a;border-radius:8px;color:#fff;padding:8px;width:110px;">
            <option value="+91">🇮🇳 +91</option><option value="+1">🇺🇸 +1</option><option value="+44">🇬🇧 +44</option>
            <option value="+61">🇦🇺 +61</option><option value="+49">🇩🇪 +49</option><option value="+33">🇫🇷 +33</option>
            <option value="+81">🇯🇵 +81</option><option value="+86">🇨🇳 +86</option><option value="+82">🇰🇷 +82</option>
          </select>
          <input id="_sms_phone" type="tel" placeholder="Phone number" value="${existingPhone?.replace(/^\+\d+/, '') || ''}" style="flex:1;padding:8px 12px;border-radius:8px;border:1px solid #4a4a6a;background:#0e1022;color:#fff;">
        </div>
        <div id="_sms_err" style="color:#ff6b6b;font-size:11px;min-height:14px;"></div>
        <div style="display:flex;gap:8px;margin-top:12px;justify-content:flex-end;">
          <button id="_sms_cancel" style="background:#3a3a5a;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">Cancel</button>
          <button id="_sms_send" style="background:#7b68ee;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">📤 Send Code</button>
        </div>
      </div>`;
        document.body.appendChild(d);
        d.querySelector('#_sms_cancel').onclick = () => d.remove();
        d.querySelector('#_sms_send').onclick = () => {
          const cc = d.querySelector('#_sms_cc').value;
          const ph = d.querySelector('#_sms_phone').value.trim();
          if (!/^\d{7,15}$/.test(ph)) { d.querySelector('#_sms_err').textContent = '❌ Enter a valid phone number.'; return; }
          const full = cc + ph;
          const code = SecurityManager.sendSMSCode(full);
          // Show verify step
          d.querySelector('[id="_sms_step1"]').innerHTML = `
        <div style="font-size:15px;font-weight:700;color:#c084fc;margin-bottom:8px;">💬 Enter Code</div>
        <div style="font-size:12px;color:#aaa;margin-bottom:12px;">Code sent to ${full}<br><span style="color:#ffaa44;">📋 Code (demo): ${code}</span></div>
        <input id="_sms_otp" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit code" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid #4a4a6a;background:#0e1022;color:#fff;font-size:18px;letter-spacing:6px;text-align:center;box-sizing:border-box;">
        <div id="_sms_verr" style="color:#ff6b6b;font-size:11px;margin-top:6px;min-height:14px;"></div>
        <div style="display:flex;gap:8px;margin-top:12px;justify-content:flex-end;">
          <button id="_sms_back" style="background:#3a3a5a;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">← Back</button>
          <button id="_sms_verify" style="background:#2a7a2a;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">✅ Verify</button>
        </div>`;
          d.querySelector('#_sms_back').onclick = () => d.remove();
          d.querySelector('#_sms_verify').onclick = () => {
            if (SecurityManager.verifySMSCode(d.querySelector('#_sms_otp').value)) {
              SecurityManager.setSMSPhone(full);
              d.remove();
              toast(`✅ Phone ${full} verified for SMS MFA.`, '#2a7a2a');
              document.getElementById('setupSMSBtn').textContent = 'Enabled ✓';
            } else {
              d.querySelector('#_sms_verr').textContent = '❌ Wrong or expired code.';
            }
          };
        };
      });

      // ── TRUSTED DEVICES ──
      document.getElementById('manageDevicesBtn')?.addEventListener('click', () => {
        const devs = SecurityManager.getTrustedDevices();
        const myId = SecurityManager._deviceId();
        const d = document.createElement('div');
        d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99999;display:flex;align-items:center;justify-content:center;';
        d.innerHTML = `
      <div style="background:#1a1a2e;border:1px solid #7b68ee;border-radius:16px;padding:24px;width:460px;max-width:94vw;color:#e0e0ff;">
        <div style="font-size:15px;font-weight:700;color:#c084fc;margin-bottom:12px;">💻 Trusted Devices</div>
        <div id="_dev_list" style="max-height:260px;overflow-y:auto;">
          ${devs.length ? devs.map(dev => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:#12122a;border-radius:10px;margin-bottom:8px;border-left:3px solid ${dev.id === myId ? '#7b68ee' : '#2a2a4a'};">
              <div>
                <div style="font-size:12px;font-weight:600;">💻 ${dev.name} ${dev.id === myId ? '<span style="background:#7b68ee;border-radius:4px;padding:1px 6px;font-size:9px;margin-left:4px;">THIS DEVICE</span>' : ''}</div>
                <div style="font-size:10px;color:#888;">Added: ${dev.addedAt}</div>
                <div style="font-size:10px;color:#888;">Last seen: ${dev.lastSeen}</div>
              </div>
              ${dev.id !== myId ? `<button data-devid="${dev.id}" class="_rm_dev" style="background:#a1587e;border:none;border-radius:8px;padding:4px 12px;color:#fff;cursor:pointer;font-size:11px;">Remove</button>` : ''}
            </div>`).join('') : '<div style="color:#888;font-size:12px;padding:8px;">No other devices found.</div>'}
        </div>
        <div style="display:flex;gap:8px;margin-top:14px;justify-content:flex-end;">
          <button id="_dev_close" style="background:#3a3a5a;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">Close</button>
        </div>
      </div>`;
        document.body.appendChild(d);
        d.querySelector('#_dev_close').onclick = () => d.remove();
        d.querySelectorAll('._rm_dev').forEach(btn => {
          btn.onclick = () => {
            SecurityManager.removeDevice(btn.dataset.devid);
            btn.closest('div[style*="border-radius:10px"]').remove();
            toast('Device removed from trusted list.', '#b3476e');
          };
        });
      });

      // ── ADVANCED SECURITY ──
      document.getElementById('enrollAdvancedSecurityBtn')?.addEventListener('click', () => {
        const isOn = SecurityManager.isAdvancedEnabled();
        const d = document.createElement('div');
        d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99999;display:flex;align-items:center;justify-content:center;';
        d.innerHTML = `
      <div style="background:#1a1a2e;border:1px solid #7b68ee;border-radius:16px;padding:24px;width:400px;max-width:94vw;color:#e0e0ff;">
        <div style="font-size:15px;font-weight:700;color:#c084fc;margin-bottom:12px;">🛡️ Advanced Account Security</div>
        <div style="background:${isOn ? '#1e3a2a' : '#1a1a2e'};border:1px solid ${isOn ? '#2a7a2a' : '#7b68ee'};border-radius:8px;padding:12px;font-size:12px;margin-bottom:14px;">
          <div style="font-weight:700;margin-bottom:4px;">${isOn ? '✅ Currently ENABLED' : '⭕ Currently DISABLED'}</div>
          When enabled:<br>• Requires password verification for sensitive actions<br>• Locks screen after 10 min inactivity<br>• Alerts on login from new devices<br>• Blocks bulk data export without re-auth
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button id="_adv_cancel" style="background:#3a3a5a;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">Cancel</button>
          <button id="_adv_toggle" style="background:${isOn ? '#a1587e' : '#7b68ee'};border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">${isOn ? '🔓 Disable' : '🛡️ Enroll'}</button>
        </div>
      </div>`;
        document.body.appendChild(d);
        d.querySelector('#_adv_cancel').onclick = () => d.remove();
        d.querySelector('#_adv_toggle').onclick = async () => {
          if (!isOn && SecurityManager.hasPassword()) {
            // require password to enroll
            const pw = window.prompt('Enter your password to enroll advanced security:');
            if (!pw || !await SecurityManager.checkPassword(pw)) { toast('❌ Wrong password.', '#b3476e'); d.remove(); return; }
          }
          SecurityManager.setAdvanced(!isOn);
          d.remove();
          toast(isOn ? '🔓 Advanced security disabled.' : '🛡️ Advanced security enrolled! Your account has maximum protection.', isOn ? '#b3476e' : '#2a7a2a');
          document.getElementById('enrollAdvancedSecurityBtn').textContent = isOn ? 'Enroll' : 'Enrolled ✓';
        };
      });

      // ── LOG OUT THIS DEVICE ──
      document.getElementById('logoutDeviceBtn')?.addEventListener('click', () => {
        const d = document.createElement('div');
        d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99999;display:flex;align-items:center;justify-content:center;';
        d.innerHTML = `
      <div style="background:#1a1a2e;border:1px solid #a1587e;border-radius:16px;padding:24px;width:360px;max-width:94vw;color:#e0e0ff;">
        <div style="font-size:15px;font-weight:700;color:#ff6b6b;margin-bottom:12px;">🚪 Log Out</div>
        <div style="font-size:13px;margin-bottom:16px;">You will be logged out of this device. Any unsaved data will be lost.</div>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button id="_lo_cancel" style="background:#3a3a5a;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">Cancel</button>
          <button id="_lo_confirm" style="background:#a1587e;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">🚪 Log Out</button>
        </div>
      </div>`;
        document.body.appendChild(d);
        d.querySelector('#_lo_cancel').onclick = () => d.remove();
        d.querySelector('#_lo_confirm').onclick = () => { d.remove(); SecurityManager.logoutCurrent(); };
      });

      // ── LOG OUT ALL DEVICES ──
      document.getElementById('logoutAllDevicesBtn')?.addEventListener('click', () => {
        const d = document.createElement('div');
        d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99999;display:flex;align-items:center;justify-content:center;';
        d.innerHTML = `
      <div style="background:#1a1a2e;border:1px solid #a1587e;border-radius:16px;padding:24px;width:380px;max-width:94vw;color:#e0e0ff;">
        <div style="font-size:15px;font-weight:700;color:#ff6b6b;margin-bottom:12px;">🌐 Log Out All Devices</div>
        <div style="font-size:13px;margin-bottom:6px;">This will log out:</div>
        <ul style="font-size:12px;color:#aaa;margin:6px 0 16px 20px;">
          <li>All browser tabs currently open</li>
          <li>All browser windows on this computer</li>
          <li>Any other devices where you're signed in</li>
        </ul>
        <div style="font-size:11px;color:#888;margin-bottom:16px;">⚠️ It may take up to 30 minutes for remote devices to be signed out.</div>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button id="_loa_cancel" style="background:#3a3a5a;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">Cancel</button>
          <button id="_loa_confirm" style="background:#a1587e;border:none;border-radius:20px;padding:7px 18px;color:#fff;cursor:pointer;font-size:12px;">🌐 Log Out All</button>
        </div>
      </div>`;
        document.body.appendChild(d);
        d.querySelector('#_loa_cancel').onclick = () => d.remove();
        d.querySelector('#_loa_confirm').onclick = () => { d.remove(); SecurityManager.logoutAll(); };
      });
    },

    init() {
      // Deduplicate button listeners
      ['save-settings-btn', 'close-settings-btn'].forEach(id => {
        document.querySelectorAll(`#${id}`).forEach(btn => {
          const c = btn.cloneNode(true); btn.parentNode?.replaceChild(c, btn);
        });
      });
      document.querySelectorAll('#save-settings-btn').forEach(b => b.addEventListener('click', () => this.save()));
      document.querySelectorAll('#close-settings-btn').forEach(b => b.addEventListener('click', () => this.close()));
      this.initTabs();
      this.initDataControl();
      this.initNotifications();
      this.initSecurity();
    }
  };

  // Route any openSettingsModal() call through SettingsUI
  window.openSettingsModal = () => SettingsUI.open();

  // ============================================================================
  // 7.  LANGUAGE GREETING  – short phrase spoken immediately after saving
  // ============================================================================
  function _langGreeting(langName) {
    const G = {
      'Afrikaans': 'Hallo! Ek sal nou in Afrikaans praat.',
      'Albanian': 'Përshëndetje! Tani do të flas shqip.',
      'Amharic': 'ሰላም! አሁን በአማርኛ እናገራለሁ።',
      'Arabic': 'مرحباً! سأتحدث معك الآن باللغة العربية.',
      'Armenian': 'Բարև! Հիմա հայերեն կխոսեմ։',
      'Assamese': 'নমস্কাৰ! এতিয়া মই অসমীয়াত কথা পাতিম।',
      'Azerbaijani': 'Salam! İndi Azərbaycanca danışacağam.',
      'Basque': 'Kaixo! Orain euskaraz hitz egingo dut.',
      'Belarusian': 'Прывіт! Цяпер я буду гаварыць па-беларуску.',
      'Bengali': 'হ্যালো! আমি এখন বাংলায় কথা বলব।',
      'Bosnian': 'Zdravo! Sada ću govoriti bosanski.',
      'Bulgarian': 'Здравейте! Сега ще говоря на български.',
      'Burmese': 'မင်္ဂလာပါ! ကျွန်တော် မြန်မာဘာသာဖြင့် ပြောဆိုပါမည်။',
      'Catalan': 'Hola! Ara parlaré en català.',
      'Cebuano': 'Kumusta! Karon mao na ko mosulti sa Cebuano.',
      'Chichewa': 'Moni! Tsopano ndimalankhula Chichewa.',
      'Chinese (Simplified)': '你好！我现在将用中文和您交流。',
      'Chinese (Traditional)': '你好！我現在將用中文和您交流。',
      'Croatian': 'Zdravo! Sada ću govoriti hrvatski.',
      'Czech': 'Ahoj! Nyní budu mluvit česky.',
      'Danish': 'Hej! Nu vil jeg tale dansk.',
      'Dutch': 'Hallo! Ik zal nu in het Nederlands spreken.',
      'English': 'Hello! Settings saved. I will now speak in English.',
      'Estonian': 'Tere! Nüüd räägin eesti keeles.',
      'Filipino': 'Kumusta! Ngayon ay magsasalita na ako sa Filipino.',
      'Finnish': 'Hei! Nyt puhun suomea.',
      'French': 'Bonjour ! Je vais maintenant parler en français.',
      'Galician': 'Ola! Agora vou falar en galego.',
      'Georgian': 'გამარჯობა! ახლა ქართულად ვისაუბრებ.',
      'German': 'Hallo! Ich werde jetzt auf Deutsch sprechen.',
      'Greek': 'Γεια σου! Τώρα θα μιλώ ελληνικά.',
      'Gujarati': 'નમસ્તે! હવે હું ગુજરાતીમાં વાત કરીશ.',
      'Haitian Creole': 'Bonjou! Kounye a mwen ap pale Kreyòl Ayisyen.',
      'Hausa': 'Sannu! Yanzu zan yi magana da Hausa.',
      'Hebrew': 'שלום! עכשיו אדבר בעברית.',
      'Hindi': 'नमस्ते! अब मैं हिंदी में बात करूँगा।',
      'Hungarian': 'Szia! Most magyarul fogok beszélni.',
      'Icelandic': 'Halló! Nú mun ég tala íslensku.',
      'Igbo': 'Ndewo! Ugbu a m ga-asụ Igbo.',
      'Indonesian': 'Halo! Sekarang saya akan berbicara dalam bahasa Indonesia.',
      'Irish': 'Dia duit! Labhrófaidh mé as Gaeilge anois.',
      'Italian': 'Ciao! Ora parlerò in italiano.',
      'Japanese': 'こんにちは！これからは日本語でお話しします。',
      'Javanese': 'Halo! Saiki aku bakal ngomong nganggo Basa Jawa.',
      'Kannada': 'ಹಲೋ! ನಾನು ಈಗ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುತ್ತೇನೆ.',
      'Kazakh': 'Сәлем! Қазір қазақша сөйлеймін.',
      'Khmer': 'សួស្ដី! ឥឡូវនេះ ខ្ញុំនឹងនិយាយជាភាសាខ្មែរ។',
      'Kinyarwanda': 'Muraho! Ubu nzavuga mu Kinyarwanda.',
      'Korean': '안녕하세요! 이제 한국어로 말씀드리겠습니다.',
      'Kurdish': 'Silav! Êdî bi Kurdî diaxivim.',
      'Kyrgyz': 'Салам! Азыр кыргызча сүйлөйм.',
      'Lao': 'ສະບາຍດີ! ຕອນນີ້ຂ້ອຍຈະເວົ້າພາສາລາວ.',
      'Latvian': 'Sveiki! Tagad runāšu latviski.',
      'Lithuanian': 'Sveiki! Dabar kalbėsiu lietuviškai.',
      'Luxembourgish': 'Moien! Ech wäert elo Lëtzebuergesch schwätzen.',
      'Macedonian': 'Здраво! Сега ќе зборувам на македонски.',
      'Malagasy': 'Manao ahoana! Izao dia hiteny Malagasy aho.',
      'Malay': 'Helo! Sekarang saya akan bercakap dalam Bahasa Melayu.',
      'Malayalam': 'ഹലോ! ഞാൻ ഇനി മലയാളത്തിൽ സംസാരിക്കും.',
      'Maltese': 'Bonġu! Issa se nitkellem bil-Malti.',
      'Maori': 'Kia ora! Ka kōrero au i te reo Māori.',
      'Marathi': 'नमस्कार! मी आता मराठीत बोलेन.',
      'Mongolian': 'Сайн байна уу! Одоо монголоор ярина.',
      'Nepali': 'नमस्ते! अब म नेपालीमा बोल्नेछु।',
      'Norwegian': 'Hei! Nå vil jeg snakke norsk.',
      'Odia (Oriya)': 'ନମସ୍କାର! ଏବେ ମୁଁ ଓଡ଼ିଆରେ କଥା ହେବି।',
      'Pashto': 'سلام! اوس به زه پښتو کې خبرې وکړم.',
      'Persian': 'سلام! حالا به فارسی صحبت می‌کنم.',
      'Polish': 'Cześć! Teraz będę mówić po polsku.',
      'Portuguese': 'Olá! Agora vou falar em português.',
      'Portuguese (Brazil)': 'Olá! Agora vou falar em português.',
      'Punjabi': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਹੁਣ ਮੈਂ ਪੰਜਾਬੀ ਵਿੱਚ ਗੱਲ ਕਰਾਂਗਾ।',
      'Romanian': 'Bună! Acum voi vorbi în română.',
      'Russian': 'Привет! Теперь я буду говорить на русском.',
      'Samoan': 'Talofa! O lea ua ou tautala i le gagana Samoa.',
      'Scottish Gaelic': 'Halo! Bruidhnidh mi Gàidhlig a-nis.',
      'Serbian': 'Здраво! Сада ћу говорити српски.',
      'Sesotho': 'Lumela! Jwale ke tla bua Sesotho.',
      'Shona': 'Mhoro! Zvino ndichaita kutaura chiShona.',
      'Sindhi': 'هيلو! هاڻ آئون سنڌيءَ ۾ ڳالهائيندس.',
      'Sinhala': 'හෙලෝ! දැන් ම සිංහලෙන් කතා කරන්නම්.',
      'Slovak': 'Ahoj! Teraz budem hovoriť po slovensky.',
      'Slovenian': 'Zdravo! Zdaj bom govoril slovensko.',
      'Somali': 'Salaam! Hadda waxaan ku hadli doonaa Soomaali.',
      'Spanish': '¡Hola! Ahora hablaré en español.',
      'Spanish (Mexico)': '¡Hola! Ahora hablaré en español.',
      'Sundanese': 'Halo! Ayeuna abdi bade nyarioskeun basa Sunda.',
      'Swahili': 'Habari! Sasa nitazungumza kwa Kiswahili.',
      'Swedish': 'Hej! Nu kommer jag att tala svenska.',
      'Tajik': 'Салом! Акнун ба забони тоҷикӣ гап мезанам.',
      'Tamil': 'வணக்கம்! இனி நான் தமிழில் பேசுவேன்.',
      'Telugu': 'హలో! నేను ఇప్పుడు తెలుగులో మాట్లాడతాను.',
      'Thai': 'สวัสดี! ตอนนี้ฉันจะพูดภาษาไทย',
      'Tigrinya': 'ሰላም! ሕጂ ብትግርኛ ክዛረብ እየ።',
      'Turkish': 'Merhaba! Artık Türkçe konuşacağım.',
      'Turkmen': 'Salam! Indi türkmençe gürleşerin.',
      'Ukrainian': 'Привіт! Тепер я говоритиму українською.',
      'Urdu': 'ہیلو! اب میں اردو میں بات کروں گا۔',
      'Uzbek': 'Salom! Endi o\'zbekcha gapiraman.',
      'Vietnamese': 'Xin chào! Tôi sẽ nói chuyện bằng tiếng Việt.',
      'Welsh': 'Helo! Byddaf nawr yn siarad Cymraeg.',
      'Xhosa': 'Molo! Ngoku ndiza athetha isiXhosa.',
      'Yiddish': 'שלום! איצט וועל איך רעדן אויף ייִדיש.',
      'Yoruba': 'Ẹ káàbọ̀! Èmi yóò sọ̀rọ̀ Yorùbá báyìí.',
      'Zulu': 'Sawubona! Manje ngizokhuluma isiZulu.'
    };
    return G[langName] || `Settings saved. I will now respond in ${langName}.`;
  }

  // ============================================================================
  // 8.  TINY HELPERS
  // ============================================================================
  function _toast(msg, bg) { if (window.showToast) window.showToast(msg, bg); else console.log(msg); }

  function _totpSecret(len = 16) {
    const C = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    return Array.from(crypto.getRandomValues(new Uint8Array(len)), b => C[b % 32]).join('');
  }

  function _devId() {
    let id = localStorage.getItem('player_device_id');
    if (!id) { id = 'dev_' + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('player_device_id', id); }
    return id;
  }

  // ============================================================================
  // 9.  BOOT
  // ============================================================================
  (function bootSettings() {
    Settings.load();
    Settings._apply();   // apply theme + lang + custom names immediately

    const doInit = () => {
      SettingsUI.init();
      SettingsUI._populateLanguages();
      console.log('[Settings v2] Active — lang:', window._responseLang, '/', window._speechLang);
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', doInit);
    else setTimeout(doInit, 900);
  })();
  function closeSettingsModal() {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('settings-modal');
    if (overlay) overlay.classList.add('hidden');
    if (modal) modal.classList.add('hidden');
  }

  function loadSettingsToForm() {
    const saved = localStorage.getItem('player_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      if (settings.language) document.getElementById('setting-language').value = settings.language;
      if (settings.theme) document.getElementById('setting-theme').value = settings.theme;
      if (settings.playerCallYou) document.getElementById('setting-playerCallYou').value = settings.playerCallYou;
      if (settings.youCallPlayer) document.getElementById('setting-youCallPlayer').value = settings.youCallPlayer;
      if (settings.work) document.getElementById('setting-work').value = settings.work;
      if (settings.customInstructions) document.getElementById('setting-customInstructions').value = settings.customInstructions;
      if (settings.notifyResponse !== undefined) document.getElementById('setting-notifyResponse').checked = settings.notifyResponse;
      if (settings.notifyDispatch !== undefined) document.getElementById('setting-notifyDispatch').checked = settings.notifyDispatch;
    }
    applyTheme();
  }

  function saveSettings() {
    const settings = {
      language: document.getElementById('setting-language')?.value || 'en',
      theme: document.getElementById('setting-theme')?.value || 'dark',
      playerCallYou: document.getElementById('setting-playerCallYou')?.value || '',
      youCallPlayer: document.getElementById('setting-youCallPlayer')?.value || '',
      work: document.getElementById('setting-work')?.value || '',
      customInstructions: document.getElementById('setting-customInstructions')?.value || '',
      notifyResponse: document.getElementById('setting-notifyResponse')?.checked || false,
      notifyDispatch: document.getElementById('setting-notifyDispatch')?.checked || false
    };
    localStorage.setItem('player_settings', JSON.stringify(settings));
    applyTheme();
    if (window.showToast) window.showToast('Settings saved!', '#2a6f8f');
    closeSettingsModal();
  }

  function applyTheme() {
    const saved = localStorage.getItem('player_settings');
    let theme = 'dark';
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        theme = settings.theme || 'dark';
      } catch (e) { }
    }
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
    }
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }

  // Populate languages (add this if not already there)
  async function populateLanguages() {
    const select = document.getElementById('setting-language');
    if (!select) return;
    const languages = {
      'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German', 'it': 'Italian', 'pt': 'Portuguese',
      'ru': 'Russian', 'zh': 'Chinese', 'ja': 'Japanese', 'ko': 'Korean', 'ar': 'Arabic', 'hi': 'Hindi',
      'bn': 'Bengali', 'pa': 'Punjabi', 'ta': 'Tamil', 'te': 'Telugu', 'vi': 'Vietnamese', 'tr': 'Turkish',
      'pl': 'Polish', 'uk': 'Ukrainian', 'ro': 'Romanian', 'nl': 'Dutch', 'el': 'Greek', 'cs': 'Czech',
      'sv': 'Swedish', 'hu': 'Hungarian', 'he': 'Hebrew', 'th': 'Thai', 'id': 'Indonesian', 'fa': 'Persian',
      'ur': 'Urdu', 'sw': 'Swahili', 'no': 'Norwegian', 'da': 'Danish', 'fi': 'Finnish', 'sk': 'Slovak'
    };
    for (const [code, name] of Object.entries(languages)) {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = `${name} (${code})`;
      select.appendChild(option);
    }
  }

  function initSettingsTabs() {
    const menuItems = document.querySelectorAll('#settings-sidebar .settings-menu-item');
    const contents = document.querySelectorAll('.settings-tab-content');
    if (!menuItems.length || !contents.length) {
      console.warn('Settings tabs not found – modal may be missing or nested');
      return;
    }
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        const tabId = item.dataset.settingsTab;
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        contents.forEach(content => content.classList.remove('active'));
        const target = document.getElementById(`settings-${tabId}`);
        if (target) target.classList.add('active');
        else console.error(`Tab content #settings-${tabId} not found`);
      });
    });
  }

  function initSettingsActions() {
    // Save & Close buttons
    const saveBtn = document.getElementById('save-settings-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', saveSettings);
      console.log('✅ Save button bound');
    } else console.error('❌ save-settings-btn not found – check modal HTML');

    const closeBtn = document.getElementById('close-settings-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeSettingsModal);

    // Other actions (keep your existing ones, I'll keep them brief)
    document.getElementById('manageLocationBtn')?.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          alert(`Lat: ${pos.coords.latitude}, Lon: ${pos.coords.longitude}`);
        }, () => alert('Location permission denied'));
      } else alert('Geolocation not supported');
    });
    document.getElementById('manageSharedLinksBtn')?.addEventListener('click', () => alert('Coming soon'));
    document.getElementById('manageArchivedBtn')?.addEventListener('click', () => {
      if (typeof openChatsManagerModal === 'function') openChatsManagerModal();
      else alert('Chats manager not available');
    });
    document.getElementById('archiveAllChatsBtn')?.addEventListener('click', () => {
      if (confirm('Archive all active chats?')) {
        if (ChatMgr && ChatMgr.archiveAllChats) {
          ChatMgr.archiveAllChats();
          alert('All chats archived');
        } else alert('Chat manager not ready');
      }
    });
    document.getElementById('exportDataBtn')?.addEventListener('click', () => {
      const data = { chats: ChatMgr?.chats, faceProfile: Store?.faceProfile(), bodyProfile: Store?.bodyProfile(), goals: Store?.goals(), todo: Store?.todo(), schedule: Store?.schedule(), settings: localStorage.getItem('player_settings') };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `player_data_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      alert('Data exported');
    });
    document.getElementById('clearMemoryBtn')?.addEventListener('click', () => {
      if (confirm('Delete all memory data?')) {
        ['face_profile', 'body_profile', 'goals', 'todo', 'schedule'].forEach(k => localStorage.removeItem(k));
        if (Store) {
          Store.set('face_profile', { timestamp: null });
          Store.set('body_profile', { timestamp: null });
          Store.set('goals', {});
          Store.set('todo', []);
          Store.set('schedule', {});
        }
        alert('Memory cleared');
        if (window.Radar) Radar.refresh();
      }
    });

    document.getElementById('logoutAllDevicesBtn')?.addEventListener('click', () => {
      if (confirm('Log out of all devices?')) {
        if (typeof logout === 'function') logout();
        localStorage.removeItem('player_current_user');
        localStorage.removeItem('player_user_accounts');
        alert('Logged out of all devices');
      }
    });
  }

  // Add archiveAllChats to ChatMgr if missing
  if (typeof ChatMgr !== 'undefined' && !ChatMgr.archiveAllChats) {
    ChatMgr.archiveAllChats = function () {
      for (let id in this.chats) {
        if (!this.chats[id].archived) this.chats[id].archived = true;
      }
      this.save();
      this.refresh();
    };
  }

  // Close modal listeners
  document.getElementById('close-settings-btn')?.addEventListener('click', closeSettingsModal);
  document.getElementById('save-settings-btn')?.addEventListener('click', saveSettings);

  // Initialize language dropdown on page load
  populateLanguages();
  function closeSettingsModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.getElementById('settings-modal').classList.add('hidden');
  }

  function loadSettingsToForm() {
    const saved = localStorage.getItem('player_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      if (settings.language) document.getElementById('setting-language').value = settings.language;
      if (settings.theme) document.getElementById('setting-theme').value = settings.theme;
      if (settings.playerCallYou) document.getElementById('setting-playerCallYou').value = settings.playerCallYou;
      if (settings.youCallPlayer) document.getElementById('setting-youCallPlayer').value = settings.youCallPlayer;
      if (settings.work) document.getElementById('setting-work').value = settings.work;
      if (settings.customInstructions) document.getElementById('setting-customInstructions').value = settings.customInstructions;
      if (settings.notifyResponse !== undefined) document.getElementById('setting-notifyResponse').checked = settings.notifyResponse;
      if (settings.notifyDispatch !== undefined) document.getElementById('setting-notifyDispatch').checked = settings.notifyDispatch;
    }
  }

  function saveSettings() {
    const settings = {
      language: document.getElementById('setting-language').value,
      theme: document.getElementById('setting-theme').value,
      playerCallYou: document.getElementById('setting-playerCallYou').value,
      youCallPlayer: document.getElementById('setting-youCallPlayer').value,
      work: document.getElementById('setting-work').value,
      customInstructions: document.getElementById('setting-customInstructions').value,
      notifyResponse: document.getElementById('setting-notifyResponse').checked,
      notifyDispatch: document.getElementById('setting-notifyDispatch').checked,
      // Add this method to get the full language name (e.g., "Spanish", "French")
      getLanguageName() {
        const code = this.get('language');
        const langNames = {
          'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German',
          'it': 'Italian', 'pt': 'Portuguese', 'ru': 'Russian', 'zh': 'Chinese',
          'ja': 'Japanese', 'ko': 'Korean', 'ar': 'Arabic', 'hi': 'Hindi',
          'bn': 'Bengali', 'pa': 'Punjabi', 'ta': 'Tamil', 'te': 'Telugu',
          'ml': 'Malayalam', 'kn': 'Kannada', 'mr': 'Marathi', 'gu': 'Gujarati',
          'ur': 'Urdu', 'vi': 'Vietnamese', 'tr': 'Turkish', 'pl': 'Polish',
          'uk': 'Ukrainian', 'nl': 'Dutch', 'el': 'Greek', 'cs': 'Czech',
          'sv': 'Swedish', 'hu': 'Hungarian', 'he': 'Hebrew', 'th': 'Thai',
          'id': 'Indonesian', 'fa': 'Persian', 'ro': 'Romanian', 'bg': 'Bulgarian',
          'hr': 'Croatian', 'sk': 'Slovak', 'da': 'Danish', 'fi': 'Finnish',
          'no': 'Norwegian', 'ms': 'Malay', 'sw': 'Swahili', 'af': 'Afrikaans',
          'is': 'Icelandic', 'lt': 'Lithuanian', 'lv': 'Latvian', 'et': 'Estonian',
          'sl': 'Slovenian', 'sr': 'Serbian', 'mk': 'Macedonian'
        };
        return langNames[code] || 'English';
      },
    };
    localStorage.setItem('player_settings', JSON.stringify(settings));
    // Apply theme (placeholder)
    if (settings.theme === 'light') {
      document.body.classList.add('light-theme'); // you need to define light theme CSS
    } else {
      document.body.classList.remove('light-theme');
    }
    if (window.showToast) window.showToast('Settings saved!', '#2a6f8f');
    closeSettingsModal();
  }

  // Tab switching
  function initSettingsTabs() {
    const menuItems = document.querySelectorAll('#settings-sidebar .settings-menu-item');
    const contents = document.querySelectorAll('.settings-tab-content');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        const tabId = item.dataset.settingsTab;
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        contents.forEach(content => content.classList.remove('active'));
        const activeContent = document.getElementById(`settings-${tabId}`);
        if (activeContent) activeContent.classList.add('active');
      });
    });
  }

  // Placeholder actions for data control / security buttons
  function initSettingsActions() {
    // Data control
    document.getElementById('manageLocationBtn')?.addEventListener('click', () => alert('Location settings coming soon.'));
    document.getElementById('manageSharedLinksBtn')?.addEventListener('click', () => alert('Shared links coming soon.'));
    document.getElementById('manageArchivedBtn')?.addEventListener('click', () => openChatsManagerModal());
    document.getElementById('archiveAllChatsBtn')?.addEventListener('click', () => {
      if (confirm('Archive all active chats?')) {
        ChatMgr.archiveAllChats(); // you need to implement this method
        alert('All chats archived.');
      }
    });
    document.getElementById('exportDataBtn')?.addEventListener('click', () => {
      const data = {
        chats: ChatMgr.chats,
        faceProfile: Store.faceProfile(),
        bodyProfile: Store.bodyProfile(),
        goals: Store.goals(),
        todo: Store.todo(),
        schedule: Store.schedule(),
        settings: localStorage.getItem('player_settings')
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `player_data_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      alert('Data exported.');
    });
    document.getElementById('clearMemoryBtn')?.addEventListener('click', () => {
      if (confirm('Clear all memory data (face, body, goals, todo, schedule)? This cannot be undone.')) {
        localStorage.removeItem('face_profile');
        localStorage.removeItem('body_profile');
        localStorage.removeItem('goals');
        localStorage.removeItem('todo');
        localStorage.removeItem('schedule');
        Store.set('face_profile', { timestamp: null });
        Store.set('body_profile', { timestamp: null });
        Store.set('goals', {});
        Store.set('todo', []);
        Store.set('schedule', {});
        alert('Memory cleared.');
        if (window.Radar) Radar.refresh();
      }
    });
    // Security
    document.getElementById('addPasswordBtn')?.addEventListener('click', () => alert('Password change not implemented yet.'));
    document.getElementById('addSecurityKeyBtn')?.addEventListener('click', () => alert('Security keys not implemented.'));
    document.getElementById('setupAuthenticatorBtn')?.addEventListener('click', () => alert('Authenticator setup not implemented.'));
    document.getElementById('setupSMSBtn')?.addEventListener('click', () => alert('SMS verification not implemented.'));
    document.getElementById('manageDevicesBtn')?.addEventListener('click', () => alert('Trusted devices list not implemented.'));
    document.getElementById('enrollAdvancedSecurityBtn')?.addEventListener('click', () => alert('Advanced security not implemented.'));
    document.getElementById('logoutDeviceBtn')?.addEventListener('click', () => logout());
    document.getElementById('logoutAllDevicesBtn')?.addEventListener('click', () => {
      if (confirm('Log out of all devices? You will be logged out here as well.')) {
        logout();
      }
    });
  }

  // Helper for archive all chats (add to ChatMgr)
  if (typeof ChatMgr !== 'undefined') {
    ChatMgr.archiveAllChats = function () {
      for (let id in this.chats) {
        if (!this.chats[id].archived) {
          this.chats[id].archived = true;
        }
      }
      this.save();
      this.refresh();
    };
  }

  // Attach settings modal to the user menu action (inside handleUserMenuAction)
  // Modify the 'settings' case in handleUserMenuAction:
  // case 'settings': { openSettingsModal(); break; }

  // Add close listeners
  document.getElementById('close-settings-btn')?.addEventListener('click', closeSettingsModal);
  document.getElementById('save-settings-btn')?.addEventListener('click', saveSettings);
  function closeModal() {
    if (modalRoot) modalRoot.remove();
    modalRoot = null;
  }
  // ========== USER PROFILE EDITOR ==========
  function openProfileEditor() {
    const currentUser = JSON.parse(localStorage.getItem('player_current_user'));
    if (!currentUser) return;

    // Load saved profile data from localStorage (separate from account)
    let userProfile = localStorage.getItem('user_profile');
    if (userProfile) {
      userProfile = JSON.parse(userProfile);
    } else {
      userProfile = {
        username: currentUser.name.split(' ').join('').toLowerCase(),
        displayName: currentUser.name,
        email: currentUser.email,
        phone: '',
        avatarType: 'emoji', // 'emoji', 'initials', 'image'
        avatarValue: currentUser.avatar || '👤',
        profilePicData: null
      };
    }

    // Fill the form
    document.getElementById('profile-username').value = userProfile.username || '';
    document.getElementById('profile-displayname').value = userProfile.displayName || '';
    document.getElementById('profile-email').value = userProfile.email || '';
    document.getElementById('profile-phone').value = userProfile.phone || '';

    // Show avatar preview
    const preview = document.getElementById('profile-avatar-preview');
    if (userProfile.avatarType === 'image' && userProfile.profilePicData) {
      preview.style.backgroundImage = `url(${userProfile.profilePicData})`;
      preview.style.backgroundSize = 'cover';
      preview.textContent = '';
    } else if (userProfile.avatarType === 'emoji') {
      preview.textContent = userProfile.avatarValue;
      preview.style.backgroundImage = 'none';
    } else {
      preview.textContent = userProfile.displayName.charAt(0).toUpperCase();
      preview.style.backgroundImage = 'none';
    }

    // Show modal
    const modal = document.getElementById('user-profile-modal');
    const overlay = document.getElementById('modal-overlay');
    if (modal && overlay) {
      overlay.classList.remove('hidden');
      modal.classList.remove('hidden');
    }

    // Handle image upload
    const uploadBtn = document.getElementById('upload-profile-pic');
    const fileInput = document.getElementById('profile-pic-input');
    const removeBtn = document.getElementById('remove-profile-pic');

    uploadBtn.onclick = () => fileInput.click();
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          preview.textContent = '';
          preview.style.backgroundImage = `url(${ev.target.result})`;
          preview.style.backgroundSize = 'cover';
          userProfile.avatarType = 'image';
          userProfile.profilePicData = ev.target.result;
          userProfile.avatarValue = '';
        };
        reader.readAsDataURL(file);
      }
    };
    removeBtn.onclick = () => {
      preview.textContent = '👤';
      preview.style.backgroundImage = 'none';
      userProfile.avatarType = 'emoji';
      userProfile.avatarValue = '👤';
      userProfile.profilePicData = null;
    };
  }

  function saveUserProfile() {
    const currentUser = JSON.parse(localStorage.getItem('player_current_user'));
    if (!currentUser) return;

    const username = document.getElementById('profile-username').value.trim();
    const displayName = document.getElementById('profile-displayname').value.trim();
    const email = document.getElementById('profile-email').value.trim();
    const phone = document.getElementById('profile-phone').value.trim();

    if (!username) { alert('Username cannot be empty.'); return; }
    if (!displayName) { alert('Display name cannot be empty.'); return; }

    // Get current avatar data from the preview
    const preview = document.getElementById('profile-avatar-preview');
    let avatarType = 'emoji';
    let avatarValue = '👤';
    let profilePicData = null;
    if (preview.style.backgroundImage && preview.style.backgroundImage !== 'none') {
      avatarType = 'image';
      profilePicData = preview.style.backgroundImage.slice(5, -2); // extract url
      avatarValue = '';
    } else if (preview.textContent && preview.textContent !== '👤') {
      avatarType = 'initials';
      avatarValue = preview.textContent;
    }

    const userProfile = {
      username,
      displayName,
      email,
      phone,
      avatarType,
      avatarValue,
      profilePicData
    };
    localStorage.setItem('user_profile', JSON.stringify(userProfile));

    // Update current user object (for bottom panel)
    currentUser.name = displayName;
    if (avatarType === 'emoji') currentUser.avatar = avatarValue;
    else if (avatarType === 'initials') currentUser.avatar = avatarValue;
    else if (avatarType === 'image') currentUser.avatar = ''; // will show image
    localStorage.setItem('player_current_user', JSON.stringify(currentUser));

    // Update the bottom panel display
    updateBottomPanel(currentUser);

    // Close modal
    document.getElementById('modal-overlay').classList.add('hidden');
    document.getElementById('user-profile-modal').classList.add('hidden');

    if (window.showToast) window.showToast('Profile updated!', '#2a6f8f');
  }

  // ========== VERIFICATION (console only) ==========
  function sendVerificationCode(contact, type) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    _pendingVerification = { contact, code, type };
    console.log(`[VERIFICATION CODE] ${contact} → ${code}`);
    alert(`Verification code sent to ${contact} (check console: ${code})`);
    return true;
  }

  function verifyCode(enteredCode) {
    if (!_pendingVerification) return false;
    const isValid = (enteredCode === _pendingVerification.code);
    if (isValid) _pendingVerification = null;
    return isValid;
  }

  function showVerificationModal(account) {
    closeModal();
    const verifyRoot = document.createElement('div');
    verifyRoot.className = 'login-overlay';
    verifyRoot.innerHTML = `
        <div class="login-card">
          <h3>🔐 Verify Your Account</h3>
          <div class="subhead">We sent a 6‑digit code to ${account.email || account.contact}</div>
          <input type="text" id="verifyCode" class="email-field" placeholder="Enter code" maxlength="6">
          <button id="verifyBtn" class="continue-btn">Verify & Login</button>
          <button id="resendCodeBtn" style="background:transparent; border:none; color:#7b68ee; margin-top:12px; cursor:pointer;">Resend code</button>
          <button class="back-btn" id="backToLoginBtn" style="margin-top:16px;">← Back</button>
        </div>
      `;
    document.body.appendChild(verifyRoot);

    const verifyBtn = verifyRoot.querySelector('#verifyBtn');
    const codeInput = verifyRoot.querySelector('#verifyCode');
    const resendBtn = verifyRoot.querySelector('#resendCodeBtn');
    const backBtn = verifyRoot.querySelector('#backToLoginBtn');

    verifyBtn.onclick = () => {
      const entered = codeInput.value.trim();
      if (!entered) { alert('Please enter the verification code.'); return; }
      if (verifyCode(entered)) {
        completeLogin(account);
        verifyRoot.remove();
      } else {
        alert('Invalid code. Please try again.');
      }
    };

    resendBtn.onclick = () => {
      if (account.email) sendVerificationCode(account.email, 'email');
      else if (account.type === 'phone') sendVerificationCode(account.email.replace('@phone.user', ''), 'sms');
      alert('A new code has been sent. Check the console.');
    };

    backBtn.onclick = () => {
      verifyRoot.remove();
      showMainModal();
    };
  }

  // ========== MAIN MODAL ==========
  function showMainModal() {
    closeModal();
    modalRoot = document.createElement('div');
    modalRoot.className = 'login-overlay';
    modalRoot.innerHTML = `
  <div class="login-card">
    <h2>Log in or sign up</h2>
    <div class="subhead">You’ll get smarter responses and can upload files, images, and more.</div>
    <div class="login-option" data-action="google">
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      </span>
      <span>Continue with Google</span>
    </div>
    <div class="login-option" data-action="apple">
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="#ffffff" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17.36 3 13.75 4.71 10.5c.85-1.53 2.34-2.6 4-2.63 1.25-.03 2.43.85 3.19.85.77 0 2.21-.99 3.68-.84 1.55.15 2.69.8 3.49 1.95-1.38.92-2.07 2.48-1.9 4.08.17 1.59 1.07 2.92 2.38 3.8-.28.76-.64 1.49-1.05 2.14zM15.31 4.15c.72-.85 1.27-2.03 1.04-3.15-.97.08-2.14.69-2.83 1.54-.62.73-1.21 1.89-.99 2.96 1.07.04 2.18-.58 2.78-1.35z"/>
        </svg>
      </span>
      <span>Continue with Apple</span>
    </div>
    <div class="login-option" data-action="phone">
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12" y2="18"></line>
        </svg>
      </span>
      <span>Continue with phone</span>
    </div>
    <div class="or-divider">OR</div>
    <input type="email" id="loginEmail" class="email-field" placeholder="Email address">
    <button id="continueEmailBtn" class="continue-btn">Continue</button>
    <div class="footer-links">
      <span id="forgotPasswordLink">Forgot password?</span>
      <span id="signUpLink">Sign up</span>
    </div>
    <div class="legal-note">Terms of Use and Privacy Policy.</div>
  </div>
`;
    document.body.appendChild(modalRoot);
    modalRoot.addEventListener('click', (e) => { if (e.target === modalRoot) closeModal(); });

    modalRoot.querySelectorAll('.login-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const action = opt.dataset.action;
        if (action === 'google') showGoogleAccounts();
        else if (action === 'apple') showAppleForm();
        else if (action === 'phone') showPhoneForm();
      });
    });

    document.getElementById('continueEmailBtn').onclick = () => {
      const email = document.getElementById('loginEmail').value.trim();
      if (email && email.includes('@')) {
        sendVerificationCode(email, 'email');
        const emailAccount = { type: 'email', email, name: email.split('@')[0], avatar: email[0].toUpperCase() };
        showVerificationModal(emailAccount);
      } else {
        alert('Enter a valid email address');
      }
    };
    document.getElementById('forgotPasswordLink').onclick = () => alert('Reset link sent (demo)');
    document.getElementById('signUpLink').onclick = () => alert('Sign up flow (demo)');
  }

  // ========== GOOGLE ==========
  function showGoogleAccounts() {
    const googleAccounts = storedAccounts.filter(acc => acc.type === 'google');
    modalRoot.innerHTML = `
        <div class="login-card">
          <button class="back-btn" id="backBtn">← Back</button>
          <h3>Sign in with Google</h3>
          <div class="account-list">
            ${googleAccounts.map(acc => `
              <div class="account-item" data-email="${acc.email}">
                <div class="avatar-circle">${acc.avatar}</div>
                <div><strong>${acc.name}</strong><br>${acc.email}</div>
              </div>
            `).join('')}
          </div>
          <div class="login-option" id="useAnotherAccount">Use another account</div>
          <div class="legal-note">Before using this app, you can review OpenAI’s Privacy Policy and Terms of Service.</div>
          <div style="font-size:10px; margin-top:12px; text-align:center;">English (United States) ▼ &nbsp; Help &nbsp; Privacy &nbsp; Terms</div>
        </div>
      `;
    document.getElementById('backBtn').onclick = showMainModal;

    document.querySelectorAll('.account-item').forEach(item => {
      item.onclick = () => {
        const email = item.dataset.email;
        const acc = googleAccounts.find(a => a.email === email);
        if (acc) {
          sendVerificationCode(acc.email, 'email');
          showVerificationModal(acc);
        }
      };
    });

    document.getElementById('useAnotherAccount').onclick = () => {
      const newEmail = prompt('Enter new Google email:');
      if (newEmail && newEmail.includes('@')) {
        const newAcc = { type: 'google', email: newEmail, name: newEmail.split('@')[0], avatar: newEmail[0].toUpperCase() };
        storedAccounts.push(newAcc);
        saveAccounts();
        sendVerificationCode(newEmail, 'email');
        showVerificationModal(newAcc);
      }
    };
  }

  // ========== PHONE ==========
  function showPhoneForm() {
    modalRoot.innerHTML = `
        <div class="login-card">
          <button class="back-btn" id="backBtn">← Back</button>
          <h3>India +(91)</h3>
          <div class="phone-group">
            <span>+91</span>
            <input type="tel" id="phoneNumber" placeholder="Phone number">
          </div>
          <button id="continuePhoneBtn" class="continue-btn">Continue</button>
        </div>
      `;
    document.getElementById('backBtn').onclick = showMainModal;
    document.getElementById('continuePhoneBtn').onclick = () => {
      const phone = document.getElementById('phoneNumber').value.trim();
      if (/^[0-9]{10}$/.test(phone)) {
        const fullPhone = `+91${phone}`;
        sendVerificationCode(fullPhone, 'sms');
        const phoneAccount = { type: 'phone', email: `${fullPhone}@phone.user`, name: `User ${phone.slice(-4)}`, avatar: phone.slice(-2) };
        showVerificationModal(phoneAccount);
      } else {
        alert('Enter a valid 10-digit phone number');
      }
    };
  }

  // ========== APPLE ==========
  function showAppleForm() {
    modalRoot.innerHTML = `
        <div class="login-card">
          <button class="back-btn" id="backBtn">← Back</button>
          <h3>Use your Apple Account to sign in</h3>
          <input type="email" id="appleEmail" class="email-field" placeholder="Email or Phone Number">
          <button id="continueAppleBtn" class="continue-btn">Continue</button>
          <div class="legal-note">Sign in with iPhone<br><span style="font-size:10px;">Requires a device with iOS 17 or later.</span></div>
        </div>
      `;
    document.getElementById('backBtn').onclick = showMainModal;
    document.getElementById('continueAppleBtn').onclick = () => {
      const email = document.getElementById('appleEmail').value.trim();
      if (email) {
        const appleAccount = { type: 'apple', email, name: email.split('@')[0], avatar: '🍎' };
        sendVerificationCode(email, 'email');
        showVerificationModal(appleAccount);
      } else {
        alert('Enter Apple ID');
      }
    };
  }

  // ========== ATTACH LOGIN LISTENER ==========
  function attachLoginListener() {
    const btn = document.getElementById('fakeLoginBtn');
    if (btn) {
      btn.removeEventListener('click', showMainModal);
      btn.addEventListener('click', showMainModal);
    } else {
      setTimeout(attachLoginListener, 200);
    }
  }

  // ========== INITIALISE ==========
  loadStoredAccounts();
  const savedUser = localStorage.getItem('player_current_user');
  if (savedUser) {
    const user = JSON.parse(savedUser);
    window.isLoggedIn = true;
    isLoggedIn = true;
    updateBottomPanel(user);
  } else {
    updateBottomPanel(null);
  }
  attachLoginListener();
  const observer = new MutationObserver(() => attachLoginListener());
  observer.observe(document.body, { childList: true, subtree: true });
  // Populate language dropdown and set up settings UI
  populateLanguages();
  initSettingsTabs();
  initSettingsActions();
  // Generate TOTP secret (16 chars base32)
  function _totpSecret(len = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    const randomValues = crypto.getRandomValues(new Uint8Array(len));
    for (let i = 0; i < len; i++) {
      secret += chars[randomValues[i] % 32];
    }
    return secret;
  }

  // Simple TOTP code generator (for demo only, not real OATH algorithm)
  function _generateTOTP(secret) {
    // For demo, just generate a pseudo-random 6-digit code based on secret and current time slot
    // Not a real TOTP – only for demonstration.
    const time = Math.floor(Date.now() / 30000); // 30-second window
    let hash = 0;
    for (let i = 0; i < secret.length; i++) {
      hash = ((hash << 5) - hash) + secret.charCodeAt(i);
      hash |= 0;
    }
    hash = ((hash ^ time) * 9301 + 49297) % 1000000;
    return Math.abs(hash).toString().padStart(6, '0');
  }

  // Generate or retrieve device ID
  function _devId() {
    let id = localStorage.getItem('player_device_id');
    if (!id) {
      id = 'dev_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('player_device_id', id);
    }
    return id;
  }

  // Toast helper (already exists, but ensure it's global)
  function _toast(msg, bg) {
    if (window.showToast) window.showToast(msg, bg);
    else console.log(msg);
  }
})();
// ============================================================
// CHAT RESTORE AFTER SCAN MODALS — paste at END of script.js
// ============================================================
(function watchOverlayAndRestoreChat() {
  const tryAttach = () => {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) { setTimeout(tryAttach, 500); return; }

    new MutationObserver(() => {
      // Fires whenever overlay's class changes (i.e. any modal opens/closes)
      if (!overlay.classList.contains('hidden')) return;

      // Overlay just closed — restore chat after a small delay
      // to let all pending appendChat calls finish first
      setTimeout(() => {
        const id = ChatMgr && ChatMgr.current;
        if (!id || !ChatMgr.chats[id]) return;

        const msgs = ChatMgr.chats[id].messages || [];
        if (msgs.length === 0) return;

        const chatDiv = document.getElementById('chat-messages');
        if (!chatDiv) return;

        const domBlocks = chatDiv.querySelectorAll('.msg-block').length;

        // Only reload if DOM has fewer messages than memory
        if (domBlocks < msgs.length) {
          chatDiv.innerHTML = '';
          msgs.forEach(m => ChatMgr._appendRaw(m.sender, m.text));
          chatDiv.scrollTop = chatDiv.scrollHeight;
        }
      }, 250);
    }).observe(overlay, { attributes: true, attributeFilter: ['class'] });

    console.log('[ChatRestore] Overlay watcher active');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryAttach);
  } else {
    tryAttach();
  }
})();

// ========== WEBCAM – START ONCE, NEVER STOP ==========
(function startWebcamOnce() {
  const v = document.getElementById('rightPanelWebcam');
  if (v && !v.srcObject) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        v.srcObject = stream;
        v.play();
        v.classList.add('active');
        console.log("Webcam started – will never stop");
      })
      .catch(e => console.error('Webcam error:', e));
  }
})();
// Capitalize first letter of chat names
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function applyCapitalizeToChats() {
  document.querySelectorAll('.chat-item .chat-name, .chat-item > span:first-of-type').forEach(el => {
    if (el.textContent && !el.hasAttribute('data-capitalized')) {
      el.textContent = capitalizeFirstLetter(el.textContent);
      el.setAttribute('data-capitalized', 'true');
    }
  });
}

// Observe chat list changes
const chatList = document.getElementById('chat-list');
if (chatList) {
  const observer = new MutationObserver(applyCapitalizeToChats);
  observer.observe(chatList, { childList: true, subtree: true });
  applyCapitalizeToChats();
}
// ========== TYPEWRITER GREETING (MODEL FRIENDLY) ==========
(function initTypewriterGreeting() {
  let container = null;
  let textEl = null;
  let fullText = "Greetings - Welcome back Sir, What can I do for you?";
  let timeoutId = null;
  let isActive = false;

  function showTypewriter() {
    container = document.getElementById('typewriter-greeting');
    textEl = document.querySelector('.typewriter-text');
    if (!container || !textEl) return;

    // Reset
    textEl.textContent = '';
    container.classList.remove('hidden');
    isActive = true;
    let i = 0;

    function typeNext() {
      if (i < fullText.length) {
        textEl.textContent += fullText.charAt(i);
        i++;
        timeoutId = setTimeout(typeNext, 60);
      } else {
        // After typing finished, hide after 3 seconds
        timeoutId = setTimeout(() => {
          if (container) container.classList.add('hidden');
          isActive = false;
        }, 3000);
      }
    }
    typeNext();
  }

  function removeGreeting() {
    if (timeoutId) clearTimeout(timeoutId);
    if (container) {
      container.classList.add('hidden');
      container.remove(); // Permanently remove
    }
    isActive = false;
  }

  // Expose functions globally
  window.TypewriterGreeting = {
    show: showTypewriter,
    remove: removeGreeting
  };
})();

setTimeout(() => {
  // Wait for wave canvas and chat to be ready
  const checkWave = setInterval(() => {
    const waveCanvas = document.getElementById('wave-canvas');
    if (waveCanvas && waveCanvas.width > 0) {
      clearInterval(checkWave);
      // Show typewriter greeting instead of speaking
      if (typeof TypewriterGreeting !== 'undefined') {
        TypewriterGreeting.show();
      }
      // Also ensure the model works – speak nothing, just show greeting
      // The AI model will respond normally when user types
    }
  }, 200);
}, 1500);

// Remove greeting when user sends first message
// Hook into ChatMgr.addMessage if it exists
if (typeof ChatMgr !== 'undefined' && ChatMgr.addMessage) {
  const originalAddMessage = ChatMgr.addMessage;
  ChatMgr.addMessage = function (sender, text) {
    // Call original first
    originalAddMessage.call(this, sender, text);
    // If user sends a message, remove the typewriter greeting permanently
    if (sender.toLowerCase() === 'you' && window.TypewriterGreeting) {
      window.TypewriterGreeting.remove();
    }
  };
}

/* ============================================================
   MAP NAVIGATION FEATURE 
   ============================================================ */
(function initMapNavigation() {
  'use strict';

  /* ── state ── */
  let leafletMap = null;
  let leafletReady = false;
  let userMarker = null;
  let userLat = null;
  let userLng = null;
  let activeTileLayer = null;
  let currentStyle = 'dark';
  let mapOpen = false;

  /* ── utility ── */
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  /* ──────────────────────────────────────────────────────────
     1. INJECT BUTTON INTO SIDEBAR
     ────────────────────────────────────────────────────────── */
  function injectSidebarButton() {
    if (document.getElementById('navigationBtn')) return;
    const actionRow = document.querySelector('.action-row');
    if (!actionRow) { setTimeout(injectSidebarButton, 300); return; }

    const btn = document.createElement('button');
    btn.id = 'navigationBtn';
    btn.className = 'action-btn';
    btn.title = 'Navigation / GPS';
    btn.innerHTML =
      '<span class="btn-icon">🗺️</span>' +
      '<span class="btn-text">Navigation</span>';

    btn.addEventListener('click', () => startMapFlow());
    actionRow.appendChild(btn);
  }

  /* ──────────────────────────────────────────────────────────
     2. BUILD DOM ELEMENTS (once)
     ────────────────────────────────────────────────────────── */
  function buildWorldAnim() {
    if (document.getElementById('map-world-anim')) return;
    const div = document.createElement('div');
    div.id = 'map-world-anim';
    div.innerHTML =
      '<div id="map-world-svg-wrap">' +
      buildWorldSVG() +
      '</div>' +
      '<div id="map-locating-row">' +
      '<div id="map-locating-text">Locating<span class="dot-anim"></span></div>' +
      '<div id="map-coords-text"></div>' +
      '</div>';
    document.body.appendChild(div);
  }

  function buildMapModal() {
    if (document.getElementById('map-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'map-modal-overlay';
    overlay.innerHTML =
      '<div id="map-container">' +

      /* header */
      '<div id="map-header">' +
      '<div class="map-title-badge">' +
      '<div class="map-title-dot" id="map-title-dot"></div>' +
      '<span id="map-header-label">Navigation</span>' +
      '</div>' +
      '<div style="display:flex;gap:8px;align-items:center;">' +
      '<button class="map-ctrl-btn" id="map-locate-btn" title="Go to my location" style="pointer-events:auto">📍</button>' +
      '<button id="map-close-btn" title="Close map">✕</button>' +
      '</div>' +
      '</div>' +

      /* search bar */
      '<div id="map-search-wrap">' +
      '<input id="map-search-input" type="text" placeholder="🔍  Search places…" autocomplete="off">' +
      '</div>' +

      /* leaflet target */
      '<div id="leaflet-map"></div>' +

      /* blur overlay */
      '<div id="map-zoom-blur"></div>' +

      /* arrival flash */
      '<div id="map-arrive-flash"></div>' +

      /* side controls */
      '<div id="map-controls">' +
      '<button class="map-ctrl-btn" id="map-dark-btn"      title="Dark map">🌙</button>' +
      '<button class="map-ctrl-btn" id="map-street-btn"    title="Street map">🗺️</button>' +
      '<button class="map-ctrl-btn" id="map-satellite-btn" title="Satellite">🛰️</button>' +
      '</div>' +

      /* custom zoom */
      '<div id="map-zoom-wrap">' +
      '<button class="map-zoom-btn" id="map-zoom-in"  title="Zoom in">+</button>' +
      '<button class="map-zoom-btn" id="map-zoom-out" title="Zoom out">−</button>' +
      '</div>' +

      /* status bar */
      '<div id="map-status-bar">' +
      '<div class="map-title-dot" id="map-status-dot"></div>' +
      '<span id="map-status-text">Initialising…</span>' +
      '</div>' +

      '</div>';   /* #map-container */

    document.body.appendChild(overlay);
    attachModalEvents();
  }

  function attachModalEvents() {
    const overlay = document.getElementById('map-modal-overlay');
    if (!overlay) return;

    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeMap();
    });

    document.getElementById('map-close-btn')
      ?.addEventListener('click', closeMap);

    document.getElementById('map-locate-btn')
      ?.addEventListener('click', () => relocateUser());

    document.getElementById('map-dark-btn')
      ?.addEventListener('click', () => switchStyle('dark'));
    document.getElementById('map-street-btn')
      ?.addEventListener('click', () => switchStyle('street'));
    document.getElementById('map-satellite-btn')
      ?.addEventListener('click', () => switchStyle('satellite'));

    document.getElementById('map-zoom-in')
      ?.addEventListener('click', () => leafletMap?.zoomIn());
    document.getElementById('map-zoom-out')
      ?.addEventListener('click', () => leafletMap?.zoomOut());

    /* Simple place search – fly to geocoded result */
    const searchInput = document.getElementById('map-search-input');
    if (searchInput) {
      let searchTimer = null;
      searchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          clearTimeout(searchTimer);
          geocodeAndFly(searchInput.value.trim());
        }
      });
    }
  }

  /* ──────────────────────────────────────────────────────────
     3. WORLD SVG  (equirectangular, viewBox 0 0 1000 500)
     ────────────────────────────────────────────────────────── */
  function buildWorldSVG() {
    /* coordinate helpers */
    // x = (lng + 180) / 360 * 1000
    // y = (90 - lat) / 180 * 500

    var grid = '';
    var i;
    /* vertical grid lines every 30° of longitude */
    for (i = 1; i <= 11; i++) {
      var gx = i * (1000 / 12);
      grid += '<line class="wm-grid" x1="' + gx + '" y1="0" x2="' + gx + '" y2="500"/>';
    }
    /* horizontal grid lines every 30° of latitude */
    for (i = 1; i <= 5; i++) {
      var gy = i * (500 / 6);
      grid += '<line class="wm-grid" x1="0" y1="' + gy + '" x2="1000" y2="' + gy + '"/>';
    }

    return (
      '<svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">' +

      /* ocean */
      '<rect width="1000" height="500" fill="#04091a"/>' +

      /* grid */
      grid +

      /* equator & prime meridian */
      '<line class="wm-axis" x1="0" y1="250" x2="1000" y2="250"/>' +
      '<line class="wm-axis" x1="500" y1="0"  x2="500"  y2="500"/>' +

      /* scan line */
      '<line id="wm-scanline" x1="0" y1="0" x2="0" y2="500"/>' +

      /* ── CONTINENTS ── */

      /* Greenland */
      '<path class="wm-land" d="M322,28 L370,18 L404,28 L415,52 L400,72 L368,80 L336,70 L318,52 Z"/>' +

      /* North America */
      '<path class="wm-land" d="' +
      'M115,68 L178,52 L246,64 L296,94 L320,128 L316,172 L296,205 L268,238 ' +
      'L246,268 L222,292 L196,312 L170,322 L148,310 L130,285 ' +
      'L116,258 L108,228 L108,196 L115,165 L116,132 Z"/>' +

      /* Central America connector */
      '<path class="wm-land" d="M196,312 L216,310 L214,336 L202,344 L188,332 Z"/>' +

      /* Caribbean islands (simplified) */
      '<ellipse class="wm-land" cx="248" cy="300" rx="14" ry="6"/>' +
      '<ellipse class="wm-land" cx="270" cy="310" rx="10" ry="5"/>' +

      /* South America */
      '<path class="wm-land" d="' +
      'M214,336 L260,320 L298,328 L328,356 L342,400 L336,448 ' +
      'L308,480 L270,494 L234,480 L210,450 L202,412 L202,372 Z"/>' +

      /* Iceland */
      '<ellipse class="wm-land" cx="418" cy="58" rx="18" ry="10"/>' +

      /* Great Britain */
      '<path class="wm-land" d="M448,76 L464,70 L470,86 L460,94 L446,88 Z"/>' +

      /* Ireland */
      '<ellipse class="wm-land" cx="436" cy="86" rx="8" ry="10"/>' +

      /* Europe */
      '<path class="wm-land" d="' +
      'M454,58 L498,46 L540,58 L558,80 L550,108 L526,122 ' +
      'L498,132 L468,126 L450,112 L444,90 L448,72 Z"/>' +

      /* Iberian Peninsula */
      '<path class="wm-land" d="M448,112 L474,118 L474,148 L452,152 L436,140 Z"/>' +

      /* Scandinavia */
      '<path class="wm-land" d="M488,30 L518,22 L540,40 L532,70 L510,80 L488,68 L482,48 Z"/>' +
      '<path class="wm-land" d="M520,38 L546,32 L556,52 L540,70 L520,64 Z"/>' +

      /* Africa */
      '<path class="wm-land" d="' +
      'M464,132 L518,120 L560,138 L580,178 L580,240 L568,292 ' +
      'L548,340 L520,374 L492,392 L466,382 L446,348 ' +
      'L438,304 L440,256 L446,212 L452,170 Z"/>' +

      /* Madagascar */
      '<ellipse class="wm-land" cx="594" cy="326" rx="10" ry="22"/>' +

      /* Middle East / Arabian Peninsula */
      '<path class="wm-land" d="M562,138 L618,132 L638,160 L622,200 L594,208 L566,196 L560,170 Z"/>' +

      /* Asia (main landmass) */
      '<path class="wm-land" d="' +
      'M520,56 L600,44 L680,38 L764,42 L832,52 L878,76 ' +
      'L888,108 L876,142 L844,164 L800,182 L762,198 ' +
      'L720,212 L688,222 L652,232 L618,222 L588,208 ' +
      'L562,188 L538,162 L524,136 L516,106 L516,76 Z"/>' +

      /* Indian subcontinent */
      '<path class="wm-land" d="' +
      'M644,202 L688,206 L698,236 L690,268 L666,288 ' +
      'L640,272 L630,244 L632,214 Z"/>' +

      /* Sri Lanka */
      '<ellipse class="wm-land" cx="672" cy="298" rx="7" ry="10"/>' +

      /* Southeast Asia mainland */
      '<path class="wm-land" d="' +
      'M730,198 L776,192 L796,212 L790,244 L762,256 ' +
      'L738,244 L726,222 Z"/>' +

      /* Malay Peninsula */
      '<path class="wm-land" d="M764,248 L774,260 L772,284 L760,288 L754,268 Z"/>' +

      /* Sumatra */
      '<path class="wm-land" d="M752,286 L800,276 L810,296 L790,314 L756,310 Z"/>' +

      /* Java */
      '<path class="wm-land" d="M780,316 L836,308 L844,322 L820,330 L780,328 Z"/>' +

      /* Borneo */
      '<path class="wm-land" d="M806,274 L848,266 L870,284 L864,318 L834,328 L806,310 Z"/>' +

      /* Philippines */
      '<path class="wm-land" d="M838,228 L854,220 L862,238 L848,252 L836,244 Z"/>' +
      '<ellipse class="wm-land" cx="852" cy="258" rx="8" ry="12"/>' +

      /* Japan */
      '<path class="wm-land" d="M848,118 L870,112 L878,132 L864,148 L846,142 Z"/>' +
      '<ellipse class="wm-land" cx="858" cy="104" rx="8" ry="14"/>' +

      /* Korea */
      '<path class="wm-land" d="M826,128 L840,122 L844,140 L832,150 L820,144 Z"/>' +

      /* Taiwan */
      '<ellipse class="wm-land" cx="830" cy="172" rx="6" ry="10"/>' +

      /* Hainan */
      '<ellipse class="wm-land" cx="796" cy="222" rx="8" ry="6"/>' +

      /* Australia */
      '<path class="wm-land" d="' +
      'M764,290 L826,278 L878,284 L912,304 L924,342 ' +
      'L910,376 L870,394 L826,396 L784,380 ' +
      'L762,354 L754,318 Z"/>' +

      /* Tasmania */
      '<ellipse class="wm-land" cx="858" cy="408" rx="10" ry="8"/>' +

      /* New Zealand */
      '<ellipse class="wm-land" cx="948" cy="378" rx="8" ry="18"/>' +
      '<ellipse class="wm-land" cx="944" cy="398" rx="10" ry="14"/>' +

      /* Papua New Guinea */
      '<path class="wm-land" d="M880,280 L932,272 L944,290 L920,306 L890,302 Z"/>' +

      /* Russia (very simplified – blends with Asia top) */
      '<path class="wm-land" d="' +
      'M500,20 L600,14 L700,10 L820,14 L900,28 L940,18 L980,22 ' +
      'L990,46 L960,50 L920,46 L880,52 L840,50 L800,44 ' +
      'L760,40 L680,36 L600,42 L500,56 Z"/>' +

      /* ── LOCATION DOT & RINGS (updated by JS) ── */
      '<circle class="wm-ring" id="wm-ring1" cx="500" cy="250"/>' +
      '<circle class="wm-ring" id="wm-ring2" cx="500" cy="250"/>' +
      '<circle class="wm-ring" id="wm-ring3" cx="500" cy="250"/>' +
      '<circle id="wm-dot" cx="500" cy="250"/>' +

      '</svg>'
    );
  }

  /* lat/lng → SVG coordinates for 1000×500 equirectangular */
  function toSVG(lat, lng) {
    var x = (lng + 180) / 360 * 1000;
    var y = (90 - lat) / 180 * 500;
    return { x: x, y: y };
  }

  /* ──────────────────────────────────────────────────────────
     4. ANIMATION FLOW
     ────────────────────────────────────────────────────────── */
  async function startMapFlow() {
    if (mapOpen) { openMapModal(); return; }

    buildWorldAnim();
    buildMapModal();

    /* ── PHASE A: world overlay ── */
    var worldEl = document.getElementById('map-world-anim');
    var svgWrap = document.getElementById('map-world-svg-wrap');
    var locatingRow = document.getElementById('map-locating-row');
    var coordsText = document.getElementById('map-coords-text');

    worldEl.classList.add('active');
    await sleep(80);
    svgWrap.classList.add('show');

    await sleep(500);
    locatingRow.classList.add('show');

    /* start scan line */
    var scanLine = document.getElementById('wm-scanline');
    if (scanLine) {
      await sleep(300);
      scanLine.classList.add('scan');
    }

    /* ── PHASE B: geolocation ── */
    var locationOK = false;
    try {
      var pos = await getLocation();
      userLat = pos.coords.latitude;
      userLng = pos.coords.longitude;
      locationOK = true;

      /* update coords display */
      if (coordsText) {
        var latDir = userLat >= 0 ? 'N' : 'S';
        var lngDir = userLng >= 0 ? 'E' : 'W';
        coordsText.textContent =
          Math.abs(userLat).toFixed(4) + '° ' + latDir + '  ' +
          Math.abs(userLng).toFixed(4) + '° ' + lngDir;
      }

      /* place dot on world SVG */
      await sleep(400);
      var pt = toSVG(userLat, userLng);
      var dot = document.getElementById('wm-dot');
      var r1 = document.getElementById('wm-ring1');
      var r2 = document.getElementById('wm-ring2');
      var r3 = document.getElementById('wm-ring3');

      if (dot) {
        dot.setAttribute('cx', pt.x);
        dot.setAttribute('cy', pt.y);
        dot.classList.add('show');
      }
      [r1, r2, r3].forEach(function (r) {
        if (r) {
          r.setAttribute('cx', pt.x);
          r.setAttribute('cy', pt.y);
          r.classList.add('pulse');
        }
      });

    } catch (err) {
      /* location denied – continue with world centre */
      userLat = userLat || 20;
      userLng = userLng || 0;
      if (coordsText) coordsText.textContent = 'Location unavailable';
    }

    /* ── PHASE C: hold, then transition ── */
    await sleep(1100);

    /* fade out world */
    worldEl.style.transition = 'opacity 0.55s ease';
    worldEl.style.opacity = '0';
    await sleep(550);
    worldEl.classList.remove('active');
    worldEl.style.opacity = '';
    worldEl.style.transition = '';

    /* ── PHASE D: open Leaflet modal ── */
    openMapModal();
    await sleep(120);
    var container = document.getElementById('map-container');
    if (container) container.classList.add('show');

    /* ── PHASE E: init / fly Leaflet ── */
    await sleep(380);
    await initLeaflet(locationOK);
  }

  /* ──────────────────────────────────────────────────────────
     5. OPEN / CLOSE MODAL
     ────────────────────────────────────────────────────────── */
  function openMapModal() {
    var overlay = document.getElementById('map-modal-overlay');
    if (overlay) { overlay.classList.add('active'); mapOpen = true; }
  }

  function closeMap() {
    var container = document.getElementById('map-container');
    var overlay = document.getElementById('map-modal-overlay');
    if (container) container.classList.remove('show');
    setTimeout(function () {
      if (overlay) overlay.classList.remove('active');
    }, 420);
    mapOpen = false;
  }

  /* ──────────────────────────────────────────────────────────
     6. LEAFLET INITIALISATION
     ────────────────────────────────────────────────────────── */
  async function loadLeaflet() {
    if (window.L && leafletReady) return;

    /* CSS */
    if (!document.getElementById('leaflet-css')) {
      var css = document.createElement('link');
      css.id = 'leaflet-css';
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(css);
    }

    /* JS */
    if (!window.L) {
      await new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    leafletReady = true;
  }

  async function initLeaflet(hasLocation) {
    setStatus('pulsing', 'Loading map tiles…');

    try { await loadLeaflet(); }
    catch (e) { setStatus('error', 'Could not load Leaflet — check connection'); return; }

    var L = window.L;
    var mapEl = document.getElementById('leaflet-map');
    if (!mapEl) return;

    /* If map already exists just fly */
    if (leafletMap) {
      flyToUser(hasLocation);
      return;
    }

    leafletMap = L.map('leaflet-map', {
      zoomControl: false,
      attributionControl: true,
      center: [20, 0],
      zoom: 2,
      preferCanvas: true,
      wheelPxPerZoomLevel: 80
    });

    /* initial tile layer */
    applyTileLayer('dark');
    updateStyleButtons('dark');

    leafletMap.whenReady(function () {
      setStatus('pulsing', 'Map ready…');
      setTimeout(function () { flyToUser(hasLocation); }, 500);
    });
  }

  function flyToUser(hasLocation) {
    if (!leafletMap) return;
    var lat = hasLocation ? userLat : 20;
    var lng = hasLocation ? userLng : 0;
    var zoom = hasLocation ? 14 : 3;

    /* blur during flight */
    var blurEl = document.getElementById('map-zoom-blur');
    if (blurEl) {
      blurEl.classList.add('blurring');
      setTimeout(function () { blurEl.classList.remove('blurring'); }, 2700);
    }

    leafletMap.flyTo([lat, lng], zoom, {
      animate: true,
      duration: 2.4,
      easeLinearity: 0.28
    });

    if (hasLocation) {
      setTimeout(function () {
        dropPin();
        /* arrival flash */
        var flash = document.getElementById('map-arrive-flash');
        if (flash) {
          flash.classList.add('pop');
          setTimeout(function () { flash.classList.remove('pop'); }, 700);
        }
        setStatus('located',
          'You are here  •  ' +
          Math.abs(userLat).toFixed(4) + '° ' + (userLat >= 0 ? 'N' : 'S') + '  ' +
          Math.abs(userLng).toFixed(4) + '° ' + (userLng >= 0 ? 'E' : 'W'));
        setTitleDot('located');
      }, 2500);
    } else {
      setStatus('error', 'Location unavailable — grant browser permission and try again');
      setTitleDot('error');
    }
  }

  /* ──────────────────────────────────────────────────────────
     7. LOCATION MARKER
     ────────────────────────────────────────────────────────── */
  function dropPin() {
    if (!leafletMap || !window.L || userLat === null) return;
    var L = window.L;

    if (userMarker) {
      userMarker.setLatLng([userLat, userLng]);
      userMarker.openPopup();
      return;
    }

    var pinHtml =
      '<div class="map-pin-outer">' +
      '<div class="map-pin-rings">' +
      '<div class="map-pin-ring"></div>' +
      '<div class="map-pin-ring"></div>' +
      '<div class="map-pin-ring"></div>' +
      '</div>' +
      '<div class="map-pin-emoji">📍</div>' +
      '<div class="map-pin-label">You are here</div>' +
      '</div>';

    var icon = L.divIcon({
      html: pinHtml,
      className: '',
      iconSize: [90, 70],
      iconAnchor: [45, 58]
    });

    userMarker = L.marker([userLat, userLng], { icon: icon }).addTo(leafletMap);

    userMarker.bindPopup(
      '<div style="font-family:\'Segoe UI\',sans-serif;min-width:170px;line-height:1.6;">' +
      '<div style="font-weight:700;font-size:13px;margin-bottom:6px;">📍 Your Location</div>' +
      '<div style="font-size:11px;color:#aaa;">Latitude:  ' + userLat.toFixed(6) + '</div>' +
      '<div style="font-size:11px;color:#aaa;">Longitude: ' + userLng.toFixed(6) + '</div>' +
      '<div style="font-size:10px;color:#666;margin-top:8px;">Tap the map to drop a custom pin.</div>' +
      '</div>'
    ).openPopup();

    /* tap to drop custom pin */
    leafletMap.on('click', function (e) {
      var cLat = e.latlng.lat.toFixed(5);
      var cLng = e.latlng.lng.toFixed(5);
      var customIcon = L.divIcon({
        html: '<div style="font-size:26px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.6))">📌</div>',
        className: '',
        iconSize: [30, 30],
        iconAnchor: [15, 28]
      });
      L.marker(e.latlng, { icon: customIcon })
        .addTo(leafletMap)
        .bindPopup(
          '<div style="font-family:\'Segoe UI\',sans-serif;">' +
          '<b>Custom pin</b><br>' +
          '<span style="font-size:11px;color:#aaa;">' + cLat + '°, ' + cLng + '°</span>' +
          '</div>'
        )
        .openPopup();
    });
  }

  /* ──────────────────────────────────────────────────────────
     8. TILE LAYERS
     ────────────────────────────────────────────────────────── */
  var TILE_CONFIGS = {
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      opts: { attribution: '© <a href="https://carto.com/">CartoDB</a> | © OpenStreetMap', maxZoom: 19, subdomains: 'abcd' }
    },
    street: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      opts: { attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>', maxZoom: 19 }
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      opts: { attribution: '© <a href="https://www.esri.com/">Esri</a>', maxZoom: 18 }
    }
  };

  function applyTileLayer(style) {
    if (!leafletMap || !window.L) return;
    var L = window.L;
    var cfg = TILE_CONFIGS[style] || TILE_CONFIGS.dark;
    if (activeTileLayer) leafletMap.removeLayer(activeTileLayer);
    activeTileLayer = L.tileLayer(cfg.url, cfg.opts).addTo(leafletMap);
    currentStyle = style;
  }

  function switchStyle(style) {
    applyTileLayer(style);
    updateStyleButtons(style);
  }

  function updateStyleButtons(active) {
    ['dark', 'street', 'satellite'].forEach(function (s) {
      var btn = document.getElementById('map-' + s + '-btn');
      if (!btn) return;
      btn.classList.toggle('active-style', s === active);
    });
  }

  /* ──────────────────────────────────────────────────────────
     9. RE-LOCATE
     ────────────────────────────────────────────────────────── */
  async function relocateUser() {
    setStatus('pulsing', 'Getting your location…');
    setTitleDot('pulsing');
    try {
      var pos = await getLocation();
      userLat = pos.coords.latitude;
      userLng = pos.coords.longitude;

      var blurEl = document.getElementById('map-zoom-blur');
      if (blurEl) {
        blurEl.classList.add('blurring');
        setTimeout(function () { blurEl.classList.remove('blurring'); }, 2000);
      }

      leafletMap?.flyTo([userLat, userLng], 15, { duration: 1.6 });
      setTimeout(function () {
        dropPin();
        setStatus('located',
          'Updated  •  ' +
          Math.abs(userLat).toFixed(4) + '° ' + (userLat >= 0 ? 'N' : 'S') + '  ' +
          Math.abs(userLng).toFixed(4) + '° ' + (userLng >= 0 ? 'E' : 'W'));
        setTitleDot('located');
      }, 1700);
    } catch (e) {
      setStatus('error', 'Permission denied — enable location in browser settings');
      setTitleDot('error');
    }
  }

  /* ──────────────────────────────────────────────────────────
     10. SEARCH / GEOCODE
     ────────────────────────────────────────────────────────── */
  async function geocodeAndFly(query) {
    if (!query || !leafletMap || !window.L) return;
    var input = document.getElementById('map-search-input');
    if (input) input.placeholder = '🔍  Searching…';

    try {
      var url = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' +
        encodeURIComponent(query);
      var res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
      var data = await res.json();

      if (!data.length) {
        setStatus('error', 'Place not found — try a different name');
        if (input) input.placeholder = '🔍  Search places…';
        return;
      }

      var lat = parseFloat(data[0].lat);
      var lng = parseFloat(data[0].lon);
      var name = data[0].display_name.split(',')[0];

      var blurEl = document.getElementById('map-zoom-blur');
      if (blurEl) {
        blurEl.classList.add('blurring');
        setTimeout(function () { blurEl.classList.remove('blurring'); }, 2100);
      }

      leafletMap.flyTo([lat, lng], 13, { duration: 1.8 });

      setTimeout(function () {
        var L = window.L;
        var searchIcon = L.divIcon({
          html: '<div style="font-size:28px;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.7))">🔍</div>',
          className: '',
          iconSize: [30, 30],
          iconAnchor: [15, 28]
        });
        L.marker([lat, lng], { icon: searchIcon })
          .addTo(leafletMap)
          .bindPopup('<b>' + escHtml(name) + '</b><br><span style="font-size:10px;color:#aaa;">' +
            lat.toFixed(4) + '°, ' + lng.toFixed(4) + '°</span>')
          .openPopup();
        setStatus('located', '📍 ' + name);
      }, 1900);

    } catch (e) {
      setStatus('error', 'Search failed — check connection');
    }

    if (input) input.placeholder = '🔍  Search places…';
    if (input) input.value = '';
  }

  /* ──────────────────────────────────────────────────────────
     11. HELPERS
     ────────────────────────────────────────────────────────── */
  function getLocation() {
    return new Promise(function (resolve, reject) {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 9000,
        maximumAge: 0,
        enableHighAccuracy: true
      });
    });
  }

  function setStatus(type, text) {
    var dot = document.getElementById('map-status-dot');
    var span = document.getElementById('map-status-text');
    if (dot) {
      dot.className = 'map-title-dot';
      if (type === 'located') dot.classList.add('located');
      if (type === 'error') dot.classList.add('error');
    }
    if (span) span.textContent = text;
  }

  function setTitleDot(type) {
    var dot = document.getElementById('map-title-dot');
    if (!dot) return;
    dot.className = 'map-title-dot';
    if (type === 'located') dot.classList.add('located');
    if (type === 'error') dot.classList.add('error');
  }

  function escHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /* ──────────────────────────────────────────────────────────
     12. VOICE COMMAND HOOK
     ────────────────────────────────────────────────────────── */
  (function patchProcessCommand() {
    var tryPatch = function () {
      if (!window.App || !App.processCommand) { setTimeout(tryPatch, 400); return; }
      var orig = App.processCommand.bind(App);
      App.processCommand = async function (command, token) {
        var cmd = command.toLowerCase();
        if (/open map|open navigation|show map|gps|navigation|my location|where am i/i.test(cmd)) {
          startMapFlow();
          App.speak("Opening navigation map, locating you now.", token);
          return;
        }
        if (/close map|close navigation/i.test(cmd)) {
          closeMap();
          App.speak("Map closed.", token);
          return;
        }
        return orig(command, token);
      };
    };
    tryPatch();
  })();

  /* ──────────────────────────────────────────────────────────
     13. BOOT
     ────────────────────────────────────────────────────────── */
  function boot() {
    injectSidebarButton();
    buildWorldAnim();
    buildMapModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 200); });
  } else {
    setTimeout(boot, 200);
  }

})();

// ================================================================
// PLAYER — MOBILE RESPONSIVE  v3
// ================================================================
(function initMobileEnhancements() {
  'use strict';

  /* ─── HELPERS ───────────────────────────────────────────────── */
  const isMobile = () =>
    window.innerWidth <= 768 ||
    (window.innerWidth > window.innerHeight && window.innerHeight <= 500);

  const _db = typeof debounce === 'function'
    ? debounce
    : (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

  const esc = s => String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* ─── 1. ENFORCE MINI SIDEBAR ──────────────────────────────── */
  function enforceMiniSidebar() {
    if (!isMobile()) return;
    const panel = document.getElementById('left-panel');
    const app = document.getElementById('app');
    panel?.classList.add('mini');
    app?.classList.add('sidebar-mini');
  }

  /* ─── 2. FLOATING WAVE WIDGET ──────────────────────────────── */
  let _floatEl = null;
  let _speakWatch = null;

  function createFloatingWave() {
    if (!isMobile()) return;
    if (document.getElementById('mobile-wave-float')) return;

    const waveWrap = document.getElementById('wave-wrap');
    if (!waveWrap) return;

    // Build the float card
    const float = document.createElement('div');
    float.id = 'mobile-wave-float';
    float.style.display = 'block';
    document.body.appendChild(float);
    _floatEl = float;

    // Move wave-wrap into the float card
    float.appendChild(waveWrap);

    // Let WaveViz know its container changed
    setTimeout(() => {
      if (window.WaveViz?._resizeAndDraw) {
        try { WaveViz._resizeAndDraw(); } catch (e) { }
      }
    }, 120);

    makeDraggable(float);
    watchSpeaking(float);
  }

  // Drag: supports both mouse and touch
  function makeDraggable(el) {
    let startX, startY, origLeft, origTop, isDragging = false;

    const onStart = (cx, cy) => {
      const rect = el.getBoundingClientRect();
      origLeft = rect.left;
      origTop = rect.top;
      startX = cx;
      startY = cy;
      isDragging = true;
      el.style.cursor = 'grabbing';
      el.style.transition = 'none';
      // Switch from bottom/right anchoring to top/left
      el.style.left = origLeft + 'px';
      el.style.top = origTop + 'px';
      el.style.right = 'auto';
      el.style.bottom = 'auto';
    };

    const onMove = (cx, cy) => {
      if (!isDragging) return;
      const dx = cx - startX;
      const dy = cy - startY;
      const maxX = window.innerWidth - el.offsetWidth;
      const maxY = window.innerHeight - el.offsetHeight;
      const newLeft = Math.min(Math.max(origLeft + dx, 0), maxX);
      const newTop = Math.min(Math.max(origTop + dy, 0), maxY);
      el.style.left = newLeft + 'px';
      el.style.top = newTop + 'px';
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      el.style.cursor = 'grab';
      el.style.transition = '';
    };

    // Mouse events
    el.addEventListener('mousedown', e => { onStart(e.clientX, e.clientY); e.preventDefault(); });
    window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', () => onEnd());

    // Touch events
    el.addEventListener('touchstart', e => {
      const t = e.touches[0];
      onStart(t.clientX, t.clientY);
      e.preventDefault();
    }, { passive: false });

    window.addEventListener('touchmove', e => {
      const t = e.touches[0];
      onMove(t.clientX, t.clientY);
    }, { passive: true });

    window.addEventListener('touchend', () => onEnd(), { passive: true });
  }

  function watchSpeaking(floatEl) {
    clearInterval(_speakWatch);
    _speakWatch = setInterval(() => {
      if (!document.body.contains(floatEl)) { clearInterval(_speakWatch); return; }
      const speaking = window.WaveViz?.speaking === true ||
        window.SpeechInterrupt?.isSpeaking === true;
      floatEl.classList.toggle('speaking', speaking);
    }, 250);
  }

  /* ─── 3. WEBCAM PiP ─────────────────────────────────────────── */
  let _pipActive = false;
  let _pipStream = null;

  function addWebcamSidebarButton() {
    if (document.getElementById('sidebar-webcam-btn')) return;
    const actionRow = document.querySelector('.action-row');
    if (!actionRow) return;
    const btn = document.createElement('button');
    btn.id = 'sidebar-webcam-btn';
    btn.className = 'action-btn';
    btn.title = 'Toggle Webcam';
    btn.style.position = 'relative';
    btn.innerHTML =
      '<span class="btn-icon" id="wcam-pip-icon">📷</span>' +
      '<span class="btn-text">Webcam</span>' +
      '<span id="webcam-rec-dot"></span>';
    btn.addEventListener('click', () => toggleWebcamPip());
    actionRow.appendChild(btn);
  }

  function toggleWebcamPip() { _pipActive ? closePip() : openPip(); }

  function openPip() {
    // PiP parent is the floating wave card (so it overlays the waveform)
    const parent = _floatEl || document.querySelector('.wave-half');
    if (!parent) return;
    document.getElementById('webcam-pip-overlay')?.remove();

    const pip = document.createElement('div');
    pip.id = 'webcam-pip-overlay';

    const vid = document.createElement('video');
    vid.autoplay = true; vid.playsInline = true; vid.muted = true;
    vid.setAttribute('playsinline', '');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'pip-close-btn';
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', e => { e.stopPropagation(); closePip(); });

    pip.appendChild(vid);
    pip.appendChild(closeBtn);
    parent.appendChild(pip);

    const mainVid = document.getElementById('rightPanelWebcam');
    if (mainVid?.srcObject) {
      vid.srcObject = mainVid.srcObject;
      vid.play().catch(() => { });
      _setPipActive(true);
    } else {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
        .then(stream => {
          _pipStream = stream;
          if (mainVid) { mainVid.srcObject = stream; mainVid.play().catch(() => { }); }
          vid.srcObject = stream;
          vid.play().catch(() => { });
          _setPipActive(true);
        })
        .catch(err => {
          pip.remove();
          window.showToast?.('📷 Camera permission denied', '#b3476e');
          console.warn('[MobilePiP]', err);
        });
    }
  }

  function closePip() {
    document.getElementById('webcam-pip-overlay')?.remove();
    if (_pipStream) {
      const mainVid = document.getElementById('rightPanelWebcam');
      if (!mainVid || mainVid.srcObject !== _pipStream)
        _pipStream.getTracks().forEach(t => t.stop());
      _pipStream = null;
    }
    _setPipActive(false);
  }

  function _setPipActive(active) {
    _pipActive = active;
    document.getElementById('wcam-pip-icon').textContent = active ? '🔴' : '📷';
    document.getElementById('sidebar-webcam-btn')?.classList.toggle('webcam-active', active);
  }

  /* ─── 4. SIDEBAR DRAWER ─────────────────────────────────────── */
  let _drawerOpen = false;

  function buildDrawer() {
    if (document.getElementById('mobile-sidebar-drawer')) return;

    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'mobile-sidebar-backdrop';
    backdrop.addEventListener('click', closeDrawer);
    document.body.appendChild(backdrop);

    // Drawer
    const drawer = document.createElement('div');
    drawer.id = 'mobile-sidebar-drawer';
    drawer.innerHTML = buildDrawerHTML();
    document.body.appendChild(drawer);

    wireDrawerEvents(drawer);
  }

  function buildDrawerHTML() {
    // Determine user info
    let userName = 'Guest', avatarHTML = '👤', planText = 'Free plan';
    try {
      const u = JSON.parse(localStorage.getItem('player_current_user') || 'null');
      if (u) {
        userName = u.name || 'User';
        avatarHTML = (u.avatar && u.avatar.length <= 3) ? u.avatar
          : userName.charAt(0).toUpperCase();
      }
    } catch (e) { }

    // Chat recents
    let recentsHTML = '';
    try {
      const chats = window.ChatMgr?.chats || {};
      const active = Object.entries(chats)
        .filter(([, c]) => !c.archived && c.messages?.length > 0)
        .sort((a, b) => (b[1].lastUpdated || 0) - (a[1].lastUpdated || 0))
        .slice(0, 12);

      if (active.length) {
        recentsHTML = active.map(([id, info]) =>
          `<div class="msd-chat-item" data-chat-id="${id}">
             <span class="msd-chat-name">${esc(info.name)}</span>
             <span class="msd-chat-dots">···</span>
           </div>`
        ).join('');
      } else {
        recentsHTML = '<div style="padding:12px;font-size:12px;color:#555;text-align:center;">No chats yet</div>';
      }
    } catch (e) { }

    return `
      <!-- Header -->
      <div class="msd-header">
        <span class="msd-logo">Player</span>
        <div class="msd-header-btns">
          <button class="msd-close-btn" id="msd-close-btn" title="Close">✕</button>
        </div>
      </div>

      <!-- Navigation items -->
      <div class="msd-nav">
        <div class="msd-item active-item" data-msd-action="newchat">
          <span class="msd-icon">➕</span>
          <span class="msd-label">New chat</span>
        </div>
        <div class="msd-item" data-msd-action="search">
          <span class="msd-icon">🔍</span>
          <span class="msd-label">Search chats</span>
        </div>
        <div class="msd-item" data-msd-action="chats">
          <span class="msd-icon">💬</span>
          <span class="msd-label">Chats</span>
        </div>
        <div class="msd-item" data-msd-action="airmouse">
          <span class="msd-icon">🖱️</span>
          <span class="msd-label">Air mouse</span>
        </div>
        <div class="msd-item" data-msd-action="selfdev">
          <span class="msd-icon">📈</span>
          <span class="msd-label">Self-Development</span>
          <span class="msd-badge">↗</span>
        </div>
        <div class="msd-item" data-msd-action="navigation">
          <span class="msd-icon">🗺️</span>
          <span class="msd-label">Navigation</span>
        </div>
        <div class="msd-item" data-msd-action="webcam">
          <span class="msd-icon">📷</span>
          <span class="msd-label">Webcam PiP</span>
        </div>
        <div class="msd-item" data-msd-action="more" id="msd-more-btn">
          <span class="msd-icon">···</span>
          <span class="msd-label">More</span>
          <span class="msd-badge" id="msd-more-arrow">▼</span>
        </div>
        <div class="msd-more-items" id="msd-more-items">
          <div class="msd-item" data-msd-action="notepad">
            <span class="msd-icon">📝</span>
            <span class="msd-label">Notepad</span>
          </div>
          <div class="msd-item" data-msd-action="settings">
            <span class="msd-icon">⚙️</span>
            <span class="msd-label">Settings</span>
          </div>
          <div class="msd-item" data-msd-action="help">
            <span class="msd-icon">❓</span>
            <span class="msd-label">Help</span>
          </div>
        </div>
      </div>

      <!-- Recents -->
      <div class="msd-recents">
        <div class="msd-recents-title">Recents</div>
        <div id="msd-recents-list">${recentsHTML}</div>
      </div>

      <!-- Footer: user profile -->
      <div class="msd-footer" id="msd-footer">
        <div class="msd-avatar" id="msd-avatar">${avatarHTML}</div>
        <div class="msd-user-info">
          <div class="msd-user-name" id="msd-user-name">${esc(userName)}</div>
          <div class="msd-user-plan">${planText}</div>
        </div>
        <div class="msd-footer-actions">
          <button class="msd-footer-btn" title="Speak" id="msd-mic-btn">🎤</button>
        </div>
      </div>`;
  }

  function wireDrawerEvents(drawer) {
    // Close button
    drawer.querySelector('#msd-close-btn')?.addEventListener('click', closeDrawer);

    // Action items
    drawer.querySelectorAll('[data-msd-action]').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.dataset.msdAction;
        handleDrawerAction(action);
        if (action !== 'more') closeDrawer();
      });
    });

    // Chat items
    drawer.addEventListener('click', e => {
      const chatItem = e.target.closest('.msd-chat-item');
      if (chatItem) {
        const id = chatItem.dataset.chatId;
        if (id && window.ChatMgr?.load) ChatMgr.load(id);
        closeDrawer();
      }
    });

    // Footer click → open user menu
    drawer.querySelector('#msd-footer')?.addEventListener('click', e => {
      if (e.target.closest('.msd-footer-btn')) return;
      closeDrawer();
      // Trigger existing user menu or login
      const loggedIn = !!localStorage.getItem('player_current_user');
      if (!loggedIn) {
        document.getElementById('fakeLoginBtn')?.click();
      }
    });

    // Mic button in footer
    drawer.querySelector('#msd-mic-btn')?.addEventListener('click', e => {
      e.stopPropagation();
      closeDrawer();
      if (window.App?.startVoice) App.startVoice();
    });
  }

  function handleDrawerAction(action) {
    switch (action) {
      case 'newchat':
        if (window.ChatMgr?.newChat) ChatMgr.newChat(true);
        break;
      case 'search':
        document.getElementById('searchBtn')?.click();
        break;
      case 'chats':
        if (typeof openChatsManagerModal === 'function') openChatsManagerModal();
        break;
      case 'airmouse':
        if (window.HandCtrl?.start) HandCtrl.start();
        else window.showToast?.('Air mouse: loading...', '#3b3b66');
        break;
      case 'selfdev':
        document.getElementById('selfDevBtn')?.click();
        break;
      case 'navigation':
        document.getElementById('navigationBtn')?.click();
        break;
      case 'webcam':
        toggleWebcamPip();
        break;
      case 'notepad':
        if (window.Notepad?.open) Notepad.open();
        break;
      case 'settings':
        if (typeof openSettingsModal === 'function') openSettingsModal();
        break;
      case 'help': {
        const o = document.getElementById('modal-overlay');
        const h = document.getElementById('help-modal');
        if (o && h) { o.classList.remove('hidden'); h.classList.remove('hidden'); }
        break;
      }
      case 'more': {
        const moreItems = document.getElementById('msd-more-items');
        const arrow = document.getElementById('msd-more-arrow');
        if (moreItems) {
          moreItems.classList.toggle('visible');
          if (arrow) arrow.textContent = moreItems.classList.contains('visible') ? '▲' : '▼';
        }
        break;
      }
    }
  }

  function openDrawer() {
    // Refresh recents list before opening
    refreshDrawerRecents();
    refreshDrawerUser();

    const drawer = document.getElementById('mobile-sidebar-drawer');
    const backdrop = document.getElementById('mobile-sidebar-backdrop');
    if (!drawer || !backdrop) return;

    backdrop.style.display = 'block';
    requestAnimationFrame(() => {
      backdrop.classList.add('visible');
      drawer.classList.add('open');
    });
    _drawerOpen = true;
  }

  function closeDrawer() {
    const drawer = document.getElementById('mobile-sidebar-drawer');
    const backdrop = document.getElementById('mobile-sidebar-backdrop');
    if (!drawer) return;

    backdrop?.classList.remove('visible');
    drawer.classList.remove('open');
    setTimeout(() => {
      if (backdrop) backdrop.style.display = 'none';
    }, 300);
    _drawerOpen = false;
  }

  function refreshDrawerRecents() {
    const list = document.getElementById('msd-recents-list');
    if (!list) return;
    try {
      const chats = window.ChatMgr?.chats || {};
      const active = Object.entries(chats)
        .filter(([, c]) => !c.archived && c.messages?.length > 0)
        .sort((a, b) => (b[1].lastUpdated || 0) - (a[1].lastUpdated || 0))
        .slice(0, 12);

      if (!active.length) {
        list.innerHTML = '<div style="padding:12px;font-size:12px;color:#555;text-align:center;">No chats yet</div>';
        return;
      }
      list.innerHTML = active.map(([id, info]) =>
        `<div class="msd-chat-item" data-chat-id="${id}">
           <span class="msd-chat-name">${esc(info.name)}</span>
           <span class="msd-chat-dots">···</span>
         </div>`
      ).join('');
    } catch (e) { }
  }

  function refreshDrawerUser() {
    try {
      const u = JSON.parse(localStorage.getItem('player_current_user') || 'null');
      const nameEl = document.getElementById('msd-user-name');
      const avatarEl = document.getElementById('msd-avatar');
      if (!nameEl) return;

      if (u) {
        nameEl.textContent = u.name || 'User';
        // Check for profile pic
        const profile = JSON.parse(localStorage.getItem('user_profile') || 'null');
        if (profile?.profilePicData && avatarEl) {
          avatarEl.innerHTML = `<img src="${profile.profilePicData}" alt="avatar">`;
        } else if (avatarEl) {
          avatarEl.textContent = u.avatar || (u.name || 'U').charAt(0).toUpperCase();
        }
      } else {
        if (nameEl) nameEl.textContent = 'Log in';
        if (avatarEl) avatarEl.textContent = '👤';
      }
    } catch (e) { }
  }

  /* ─── 5. WIRE TOGGLE BUTTON TO OPEN DRAWER ─────────────────── */
  function wireToggleButton() {
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    if (!toggleBtn || toggleBtn._drawerWired) return;
    toggleBtn._drawerWired = true;

    toggleBtn.addEventListener('click', e => {
      if (!isMobile()) return;    // desktop: normal sidebar toggle
      e.stopImmediatePropagation();
      _drawerOpen ? closeDrawer() : openDrawer();
    }, true); // capture phase → runs before existing sidebar toggle handler
  }

  /* ─── 6. HANDLE RESIZE (desktop ↔ mobile) ───────────────────── */
  function onLayoutChange() {
    if (isMobile()) {
      enforceMiniSidebar();
      // Restore wave to float if it was moved back to right-panel
      const waveWrap = document.getElementById('wave-wrap');
      const floatEl = document.getElementById('mobile-wave-float');
      if (floatEl && waveWrap && !floatEl.contains(waveWrap)) {
        floatEl.appendChild(waveWrap);
      }
    } else {
      // Restore wave to right panel .wave-half
      const waveWrap = document.getElementById('wave-wrap');
      const waveHalf = document.querySelector('#right-panel .wave-half');
      if (waveHalf && waveWrap && !waveHalf.contains(waveWrap)) {
        waveHalf.appendChild(waveWrap);
      }
      // Close drawer if open
      if (_drawerOpen) closeDrawer();
    }

    requestAnimationFrame(() => {
      if (window.WaveViz?._resizeAndDraw) { try { WaveViz._resizeAndDraw(); } catch (e) { } }
      if (window.Radar?._resizeAndDraw) { try { Radar._resizeAndDraw(); } catch (e) { } }
    });
  }

  /* ─── 7. INIT ───────────────────────────────────────────────── */
  function init() {
    if (!isMobile()) {
      console.log('[MobileResponsive v3] desktop mode — no mobile setup needed');
      return;
    }

    console.log('[MobileResponsive v3] mobile mode —',
      window.innerWidth + '×' + window.innerHeight);

    enforceMiniSidebar();
    addWebcamSidebarButton();
    buildDrawer();
    wireToggleButton();
    createFloatingWave();

    // Also ensure right-panel is really hidden
    const rp = document.getElementById('right-panel');
    if (rp) rp.style.display = 'none';
  }

  // Boot after App.init() has completed
  setTimeout(init, 1900);

  // Respond to resize / orientation change
  window.addEventListener('resize', _db(onLayoutChange, 300));
  window.addEventListener('orientationchange', () => setTimeout(onLayoutChange, 450));

  /* ─── Public API ─────────────────────────────────────────────── */
  window.MobileWebcam = {
    open: openPip,
    close: closePip,
    toggle: toggleWebcamPip,
    get isActive() { return _pipActive; }
  };

  window.MobileSidebar = {
    open: openDrawer,
    close: closeDrawer,
    toggle: () => _drawerOpen ? closeDrawer() : openDrawer()
  };
  /* ================================================================
   MOBILE DRAWER FIX — append AFTER mobile-responsive.js
   in script.js (last thing at the very bottom)
   ================================================================
   This replaces the toggle button on mobile so the drawer opens
   instead of the sidebar expanding/collapsing.
   ================================================================ */
  (function fixMobileDrawer() {

    function isMobile() {
      return window.innerWidth <= 768 ||
        (window.innerWidth > window.innerHeight && window.innerHeight <= 500);
    }

    function patchToggleBtn() {
      if (!isMobile()) return;

      const oldBtn = document.getElementById('toggleSidebarBtn');
      if (!oldBtn) { setTimeout(patchToggleBtn, 200); return; }

      /* ── Clone to strip ALL existing listeners ── */
      const newBtn = oldBtn.cloneNode(true);
      oldBtn.parentNode.replaceChild(newBtn, oldBtn);
      newBtn.id = 'toggleSidebarBtn'; // keep same id

      /* ── Single clean listener: opens/closes the drawer ── */
      newBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const drawer = document.getElementById('mobile-sidebar-drawer');
        const backdrop = document.getElementById('mobile-sidebar-backdrop');

        if (!drawer) {
          /* Drawer not built yet — call MobileSidebar if available */
          if (window.MobileSidebar) { window.MobileSidebar.open(); }
          return;
        }

        const isOpen = drawer.classList.contains('open');

        if (isOpen) {
          /* Close */
          drawer.classList.remove('open');
          if (backdrop) {
            backdrop.classList.remove('visible');
            setTimeout(() => { backdrop.style.display = 'none'; }, 300);
          }
        } else {
          /* Open — refresh recents first */
          refreshRecents();
          refreshUser();
          if (backdrop) {
            backdrop.style.display = 'block';
            requestAnimationFrame(() => backdrop.classList.add('visible'));
          }
          drawer.classList.add('open');
        }
      });

      console.log('[DrawerFix] toggle button patched');
    }

    /* ── Also ensure backdrop click closes drawer ── */
    function patchBackdrop() {
      const backdrop = document.getElementById('mobile-sidebar-backdrop');
      if (!backdrop || backdrop._fixPatched) return;
      backdrop._fixPatched = true;
      backdrop.addEventListener('click', function () {
        const drawer = document.getElementById('mobile-sidebar-drawer');
        if (drawer) drawer.classList.remove('open');
        backdrop.classList.remove('visible');
        setTimeout(() => { backdrop.style.display = 'none'; }, 300);
      });
    }

    /* ── Refresh recents in drawer ── */
    function refreshRecents() {
      const list = document.getElementById('msd-recents-list');
      if (!list) return;
      try {
        const chats = window.ChatMgr?.chats || {};
        const active = Object.entries(chats)
          .filter(([, c]) => !c.archived && c.messages?.length > 0)
          .sort((a, b) => (b[1].lastUpdated || 0) - (a[1].lastUpdated || 0))
          .slice(0, 12);
        if (!active.length) {
          list.innerHTML = '<div style="padding:12px;font-size:12px;color:#555;text-align:center;">No chats yet</div>';
          return;
        }
        list.innerHTML = active.map(([id, info]) =>
          `<div class="msd-chat-item" data-chat-id="${id}" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-radius:10px;cursor:pointer;font-size:13px;color:#ccc;gap:8px;" onclick="if(window.ChatMgr)ChatMgr.load('${id}');document.getElementById('mobile-sidebar-drawer').classList.remove('open');document.getElementById('mobile-sidebar-backdrop').classList.remove('visible');setTimeout(()=>{document.getElementById('mobile-sidebar-backdrop').style.display='none'},300);">
           <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escHTML(info.name)}</span>
           <span style="color:#444;font-size:14px;">···</span>
         </div>`
        ).join('');
      } catch (e) { }
    }

    function refreshUser() {
      try {
        const u = JSON.parse(localStorage.getItem('player_current_user') || 'null');
        const nameEl = document.getElementById('msd-user-name');
        const avatarEl = document.getElementById('msd-avatar');
        if (nameEl) nameEl.textContent = u ? (u.name || 'User') : 'Log in';
        if (avatarEl) avatarEl.textContent = u ? (u.avatar || (u.name || 'U').charAt(0).toUpperCase()) : '👤';
      } catch (e) { }
    }

    function escHTML(s) {
      return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /* ── Boot: wait until both the sidebar init and mobile init are done ── */
    function boot() {
      if (!isMobile()) return;
      /* Wait for drawer to exist (built by mobile-responsive.js) */
      const waitForDrawer = setInterval(() => {
        if (document.getElementById('mobile-sidebar-drawer')) {
          clearInterval(waitForDrawer);
          patchToggleBtn();
          patchBackdrop();
        }
      }, 150);
      /* Give up after 8 seconds */
      setTimeout(() => clearInterval(waitForDrawer), 8000);
    }

    /* Run after everything else */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 2200));
    } else {
      setTimeout(boot, 2200);
    }

  })();

})();

/* ================================================================
   PLAYER — SELF-DEVELOPMENT GREY THEME (JS patch)
   Append to END of script.js (after all other blocks)
   Patches Radar.draw() to use grey colours instead of purple
   ================================================================ */
(function patchSelfDevTheme() {

  function tryPatch() {
    if (!window.Radar || !Radar.draw) { setTimeout(tryPatch, 400); return; }

    /* Store original draw */
    const _origDraw = Radar.draw.bind(Radar);

    Radar.draw = function () {
      if (!this._cssSize) return;
      const c = this.ctx;
      const sz = this._cssSize;
      const cx = this.cx();
      const cy = this.cy();
      const maxR = this.maxR();

      c.clearRect(0, 0, sz, sz);
      c.fillStyle = '#000000';
      c.fillRect(0, 0, sz, sz);

      /* ── Ring grid ── grey tones */
      for (let ring = this.RINGS; ring >= 1; ring--) {
        const r = maxR * ring / this.RINGS;
        const pts = this.hexPts(r);
        c.beginPath();
        c.moveTo(pts[0].x, pts[0].y);
        pts.slice(1).forEach(p => c.lineTo(p.x, p.y));
        c.closePath();
        if (ring === this.RINGS) {
          c.strokeStyle = '#3a3a3a'; c.lineWidth = 1.5;
        } else if (ring === this.RINGS - 1) {
          c.strokeStyle = '#2a2a2a'; c.lineWidth = 0.8;
        } else {
          c.strokeStyle = '#1e1e1e'; c.lineWidth = 0.6;
        }
        c.stroke();
      }

      /* ── Axes ── */
      this.hexPts(maxR).forEach(p => {
        c.beginPath();
        c.moveTo(cx, cy);
        c.lineTo(p.x, p.y);
        c.strokeStyle = '#2a2a2a';
        c.lineWidth = 0.7;
        c.stroke();
      });

      /* ── Data polygon ── */
      if (this.values.some(v => v > 0)) {
        const dp = this.angles.map((a, i) => ({
          x: cx + maxR * this.values[i] * Math.cos(a),
          y: cy - maxR * this.values[i] * Math.sin(a)
        }));
        c.beginPath();
        c.moveTo(dp[0].x, dp[0].y);
        dp.slice(1).forEach(p => c.lineTo(p.x, p.y));
        c.closePath();
        c.fillStyle = 'rgba(180,180,180,0.12)';
        c.fill();
        c.strokeStyle = '#888888';
        c.lineWidth = 1.5;
        c.stroke();
        dp.forEach(p => {
          c.beginPath();
          c.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          c.fillStyle = '#aaaaaa';
          c.fill();
        });
      }

      /* ── Centre dot ── */
      const cr = Math.max(2.5, maxR * 0.055);
      c.beginPath();
      c.arc(cx, cy, cr, 0, Math.PI * 2);
      c.strokeStyle = '#444444';
      c.lineWidth = 1.5;
      c.stroke();
      c.fillStyle = '#000000';
      c.fill();

      /* ── Ring intersection dots ── */
      this.angles.forEach(a => {
        for (let ring = 1; ring <= this.RINGS; ring++) {
          const r = maxR * ring / this.RINGS;
          const x = cx + r * Math.cos(a);
          const y = cy - r * Math.sin(a);
          c.beginPath();
          c.arc(x, y, Math.max(1.2, maxR * 0.016), 0, Math.PI * 2);
          c.fillStyle = '#333333';
          c.fill();
        }
      });

      /* ── Labels ── */
      const labelR = maxR * 1.48;
      const fontSize = Math.max(8, Math.min(12, maxR * 0.14));
      c.font = `600 ${fontSize}px 'Segoe UI', system-ui, sans-serif`;
      c.fillStyle = '#888888';

      this.angles.forEach((a, i) => {
        const lx = cx + labelR * Math.cos(a);
        const ly = cy - labelR * Math.sin(a);
        const dx = Math.cos(a), dy = Math.sin(a);
        c.textAlign = dx > 0.3 ? 'left' : dx < -0.3 ? 'right' : 'center';
        c.textBaseline = dy > 0.3 ? 'bottom' : dy < -0.3 ? 'top' : 'middle';
        const lines = this.labels[i].split('\n');
        lines.forEach((line, li) => {
          c.fillText(line, lx, ly + (li - (lines.length - 1) / 2) * (fontSize + 2));
        });
      });

      this._drawRequest = null;
    };

    /* Redraw immediately */
    Radar.draw();
    console.log('[SelfDevTheme] Radar patched to grey');
  }

  setTimeout(tryPatch, 500);

})();

/* ================================================================
   SELF-DEV THEME v2 — JS patch
   ================================================================ */
(function patchSelfDevModalsV2() {

  /* ── GREY PALETTE ── */
  const G = {
    bg0: '#000000',
    bg1: '#080808',
    bg2: '#111111',
    bg3: '#1a1a1a',
    br1: '#1e1e1e',
    br2: '#2a2a2a',
    br3: '#3a3a3a',
    t1: '#ffffff',
    t2: '#cccccc',
    t3: '#888888',
    t4: '#555555',
    t5: '#444444',
  };

  /* ── 1. Patch showFaceResultModal ─────────────────────────── */
  function tryPatchFace() {
    if (typeof showFaceResultModal !== 'function') {
      setTimeout(tryPatchFace, 400); return;
    }
    const _orig = showFaceResultModal;
    window.showFaceResultModal = function (faceProfile, gender) {
      _orig(faceProfile, gender);
      // Find and restyle the modal that was just appended
      setTimeout(() => greyifyResultModal('face'), 30);
    };
    console.log('[SelfDevV2] showFaceResultModal patched');
  }

  /* ── 2. Patch showBodyResultModal ─────────────────────────── */
  function tryPatchBody() {
    if (typeof showBodyResultModal !== 'function') {
      setTimeout(tryPatchBody, 400); return;
    }
    const _orig = showBodyResultModal;
    window.showBodyResultModal = function (bodyProfile, gender) {
      _orig(bodyProfile, gender);
      setTimeout(() => greyifyResultModal('body'), 30);
    };
    console.log('[SelfDevV2] showBodyResultModal patched');
  }

  /* ── Apply grey theme to the dynamically created result modal ── */
  function greyifyResultModal(type) {
    // The modal has a save-features-btn (face) or save-body-features-btn (body)
    const saveId = type === 'face' ? 'save-features-btn' : 'save-body-features-btn';
    const saveBtn = document.getElementById(saveId);
    if (!saveBtn) return;

    // Walk up to find the .modal ancestor
    let modal = saveBtn;
    while (modal && !modal.classList?.contains('modal')) {
      modal = modal.parentElement;
    }
    if (!modal) return;

    /* Modal shell */
    modal.style.background = G.bg1;
    modal.style.border = `1px solid ${G.br2}`;
    modal.style.boxShadow = `0 24px 64px rgba(0,0,0,0.95)`;
    modal.style.borderRadius = '16px';

    /* Accent bar (first child div — 4px height) */
    const bar = modal.querySelector('div[style*="height:4px"]') ||
      modal.querySelector('div[style*="background:#7b68ee"]');
    if (bar) bar.style.background = G.br3;

    /* All inner divs with navy background */
    modal.querySelectorAll('div[style*="#1a1a2e"], div[style*="#12122a"], div[style*="#0e0e1e"]')
      .forEach(el => {
        el.style.background = G.bg1;
        if (el.style.border) el.style.border = `1px solid ${G.br1}`;
      });

    /* Purple text → grey */
    modal.querySelectorAll('[style*="color:#c084fc"], [style*="color: #c084fc"]')
      .forEach(el => { el.style.color = G.t3; });

    modal.querySelectorAll('[style*="color:#7b68ee"], [style*="color: #7b68ee"]')
      .forEach(el => { el.style.color = G.t4; });

    /* Header title text */
    const title = modal.querySelector('[style*="color:#c084fc"]');
    if (title) title.style.color = G.t2;

    /* Section headings: "🎨 Edit Features…" / "🏋️ Edit Body…" */
    modal.querySelectorAll('div[style*="font-weight"]').forEach(el => {
      if (el.style.color && el.style.color.includes('#c084fc')) {
        el.style.color = G.t3;
      }
    });

    /* Small caption text */
    modal.querySelectorAll('[style*="color:#5a5a7a"], [style*="color:#aaa"], [style*="color:#888"]')
      .forEach(el => { el.style.color = G.t5; });

    /* Image border */
    const img = modal.querySelector('img');
    if (img) img.style.border = `2px solid ${G.br2}`;

    /* SVG fallback background */
    const svgFallback = modal.querySelector('svg[style*="background:#12122a"]');
    if (svgFallback) svgFallback.style.background = G.bg0;

    /* Feature / body inputs — already handled by CSS but reinforce */
    modal.querySelectorAll('.feature-input, .body-input').forEach(inp => {
      inp.style.background = G.bg0;
      inp.style.border = `1px solid ${G.br1}`;
      inp.style.color = G.t2;
    });

    /* Active-part banner */
    const banner = modal.querySelector('#active-part-banner, #active-body-banner');
    if (banner) {
      banner.style.background = G.bg1;
      banner.style.border = `1px solid ${G.br1}`;
      banner.style.color = G.t5;
    }

    /* Footer area */
    modal.querySelectorAll('div[style*="background:#12122a"]').forEach(el => {
      el.style.background = G.bg0;
      el.style.borderTop = `1px solid ${G.br1}`;
    });

    /* Retake button */
    const retake = modal.querySelector('#retake-photo-btn, #retake-body-btn');
    if (retake) {
      retake.style.background = G.bg2;
      retake.style.color = G.t2;
      retake.style.border = `1px solid ${G.br2}`;
    }

    /* Save changes button */
    const saveBtnEl = document.getElementById(saveId);
    if (saveBtnEl) {
      saveBtnEl.style.background = G.bg3;
      saveBtnEl.style.color = G.t1;
      saveBtnEl.style.border = `1px solid ${G.br3}`;
    }

    /* Close × button */
    const closeBtn = modal.querySelector('button[id*="close"]');
    if (closeBtn) { closeBtn.style.color = G.t4; }

    /* Inject a scoped <style> to override the embedded hover-zone CSS
       that the original code injects inside the modal */
    if (!modal.querySelector('#grey-zone-style')) {
      const s = document.createElement('style');
      s.id = 'grey-zone-style';
      s.textContent =
        `.hover-zone:hover, .body-hover-zone:hover {
           fill: rgba(255,255,255,0.05) !important;
           stroke: #444444 !important;
           stroke-width: 1.5px !important;
         }
         .hover-zone.active-zone, .body-hover-zone.active-zone {
           fill: rgba(255,255,255,0.08) !important;
           stroke: #666666 !important;
           stroke-width: 2px !important;
         }
         .part-tooltip .tt-name, .body-tooltip .tt-name { color: #888888 !important; }
         .part-tooltip .tt-val,  .body-tooltip .tt-val  { color: #cccccc !important; }
         .part-tooltip .tt-empty,.body-tooltip .tt-empty { color: #444444 !important; }`;
      modal.insertBefore(s, modal.firstChild);
    }

    console.log(`[SelfDevV2] ${type} result modal greyed`);
  }

  /* ── 3. Fix Weekly Schedule "no plans" text → grey ─────────── */
  function patchScheduleText() {
    // WeeklySchedule.render() outputs inline style color:#a7a0cf
    // Override by mutating the color after render via MutationObserver
    const scheduleBody = document.getElementById('schedule-body');
    if (!scheduleBody) return;

    const applyGrey = () => {
      scheduleBody.querySelectorAll('[style*="color:#a7a0cf"], [style*="color: #a7a0cf"]')
        .forEach(el => { el.style.color = '#555555'; });
      // Also fix "— no plans —" divs created with className text-muted
      scheduleBody.querySelectorAll('.text-muted').forEach(el => {
        el.style.color = '#555555';
      });
    };

    applyGrey();
    new MutationObserver(applyGrey).observe(scheduleBody, { childList: true, subtree: true });
  }

  /* ── 4. Fix Radar tooltip colours (To Do List tooltip etc.) ── */
  function patchRadarTooltip() {
    if (!window.Radar) { setTimeout(patchRadarTooltip, 400); return; }

    const _origShow = Radar._showTooltip.bind(Radar);
    Radar._showTooltip = function (sx, sy, idx) {
      _origShow(sx, sy, idx);
      // After tooltip is populated, restyle it
      requestAnimationFrame(() => {
        const tip = document.getElementById('tooltip');
        if (!tip) return;
        tip.style.background = '#080808';
        tip.style.border = '1px solid #2a2a2a';
        tip.style.boxShadow = '0 4px 20px rgba(0,0,0,0.8)';

        tip.querySelectorAll('.tt-title').forEach(el => { el.style.color = '#888888'; });
        tip.querySelectorAll('.tt-val').forEach(el => { el.style.color = '#cccccc'; });
        tip.querySelectorAll('.tt-key').forEach(el => { el.style.color = '#555555'; });
        tip.querySelectorAll('.tt-empty').forEach(el => { el.style.color = '#555555'; });
        tip.querySelectorAll('.tt-hint').forEach(el => { el.style.color = '#444444'; });
        tip.querySelectorAll('.tt-icon').forEach(el => { el.style.color = '#666666'; });
        tip.querySelectorAll('.tt-row').forEach(el => { el.style.color = '#888888'; });
      });
    };
    console.log('[SelfDevV2] Radar tooltip patched');
  }

  /* ── 5. Remove Self-Development button border on click/focus ── */
  function patchSelfDevBtn() {
    const btn = document.getElementById('selfDevBtn');
    if (!btn) { setTimeout(patchSelfDevBtn, 300); return; }

    // Force clear any border that might be applied
    const clearBorder = () => {
      btn.style.border = 'none';
      btn.style.outline = 'none';
      btn.style.boxShadow = 'none';
    };

    clearBorder();
    btn.addEventListener('click', clearBorder);
    btn.addEventListener('focus', clearBorder);
    btn.addEventListener('blur', clearBorder);
    btn.addEventListener('mousedown', clearBorder);
    console.log('[SelfDevV2] selfDevBtn border cleared');
  }

  /* ── BOOT ── */
  function boot() {
    tryPatchFace();
    tryPatchBody();
    patchRadarTooltip();
    patchSelfDevBtn();

    // Wait for schedule modal to be opened before patching
    document.getElementById('selfDevBtn')?.addEventListener('click', () => {
      setTimeout(patchScheduleText, 600);
    });

    // Also patch if schedule modal is opened via voice
    const schedObs = new MutationObserver(() => {
      if (!document.getElementById('schedule-modal')?.classList.contains('hidden')) {
        patchScheduleText();
      }
    });
    const schedModal = document.getElementById('schedule-modal');
    if (schedModal) schedObs.observe(schedModal, { attributes: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 600));
  } else {
    setTimeout(boot, 600);
  }

})();

/* ================================================================
   RADAR BLUR FIX
   ================================================================ */
(function fixRadarBlur() {

  /* ── Wait until wrap has real dimensions, then draw ─────────── */
  function safeRadarDraw(attempt) {
    attempt = attempt || 0;

    const wrap = document.getElementById('radar-wrap');
    const canvas = document.getElementById('radar-canvas');
    if (!wrap || !canvas) return;

    const sz = Math.min(wrap.clientWidth, wrap.clientHeight);

    if (sz > 20) {
      /* Good dimensions — force a clean resize+draw */
      if (window.Radar && Radar._resizeAndDraw) {
        try {
          /* Remove the .radar-ready class so there's no stale opacity */
          canvas.classList.remove('radar-ready');
          canvas.style.opacity = '0';

          Radar._resizeAndDraw();
          Radar.refresh();

          /* Fade canvas in now that the draw is complete */
          requestAnimationFrame(() => {
            canvas.style.transition = 'opacity 0.25s ease';
            canvas.style.opacity = '1';
            canvas.classList.add('radar-ready');
          });
        } catch (e) {
          console.warn('[RadarBlurFix] draw error:', e);
        }
      }
      return;
    }

    /* Dimensions not ready yet — retry (max 20 × 80ms = 1.6s) */
    if (attempt < 20) {
      setTimeout(() => safeRadarDraw(attempt + 1), 80);
    } else {
      /* Last resort: force draw anyway */
      if (window.Radar && Radar._resizeAndDraw) {
        Radar._resizeAndDraw();
        Radar.refresh();
        canvas.style.opacity = '1';
        canvas.classList.add('radar-ready');
      }
    }
  }

  /* ── Patch openRadarModal ───────────────────────────────────── */
  function patchOpenRadarModal() {
    /* openRadarModal is defined inside App.init() as a closure.
       We can't access it directly, so we intercept the selfDevBtn click
       and also watch the radar modal for when it becomes visible. */

    const radarModal = document.getElementById('radar-modal');
    if (!radarModal) { setTimeout(patchOpenRadarModal, 400); return; }

    /* MutationObserver: fires whenever the modal class changes */
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        if (m.attributeName !== 'class') return;
        const isOpen = !radarModal.classList.contains('hidden');
        if (!isOpen) return;

        /* Modal just opened — hide canvas and wait for layout */
        const canvas = document.getElementById('radar-canvas');
        if (canvas) {
          canvas.classList.remove('radar-ready');
          canvas.style.transition = 'none';
          canvas.style.opacity = '0';
        }
        radarModal.classList.add('modal-opening');

        /* Start polling for real dimensions */
        safeRadarDraw(0);

        /* Remove the 'opening' marker after draw is confirmed */
        setTimeout(() => radarModal.classList.remove('modal-opening'), 600);
      });
    });

    observer.observe(radarModal, { attributes: true, attributeFilter: ['class'] });

    /* Also cover the case where modal is already open on first load */
    if (!radarModal.classList.contains('hidden')) {
      safeRadarDraw(0);
    }

    console.log('[RadarBlurFix] observer attached ✓');
  }

  /* ── Patch Radar._resizeAndDraw to guard against zero size ──── */
  function patchResizeAndDraw() {
    if (!window.Radar || !Radar._resizeAndDraw) {
      setTimeout(patchResizeAndDraw, 400); return;
    }

    const _orig = Radar._resizeAndDraw.bind(Radar);

    Radar._resizeAndDraw = function () {
      const wrap = document.getElementById('radar-wrap');
      if (!wrap) return;

      const sz = Math.min(wrap.clientWidth, wrap.clientHeight) - 16;

      /* If the wrap has no size yet, skip silently —
         safeRadarDraw will retry with valid dimensions */
      if (sz < 10) return;

      _orig();
    };

    console.log('[RadarBlurFix] Radar._resizeAndDraw patched ✓');
  }

  /* ── Also fix: when the window is resized while modal is open ── */
  function onResize() {
    const radarModal = document.getElementById('radar-modal');
    if (!radarModal || radarModal.classList.contains('hidden')) return;
    safeRadarDraw(0);
  }

  const _db = typeof debounce === 'function'
    ? debounce
    : (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

  window.addEventListener('resize', _db(onResize, 300));

  /* ── Boot ────────────────────────────────────────────────────── */
  function boot() {
    patchResizeAndDraw();
    patchOpenRadarModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 800));
  } else {
    setTimeout(boot, 800);
  }

})();

/* ================================================================
   INPUT AREA ALIGNMENT FIX
   ================================================================ */
(function fixInputAlignment() {

  function applyBottomAlign() {
    const inputArea = document.getElementById('input-area');
    const centerPanel = document.getElementById('center-panel');
    if (!inputArea || !centerPanel) return;

    /* Remove greeting-mode positioning */
    inputArea.style.marginBottom = '0';
    inputArea.style.maxWidth = '100%';
    inputArea.style.width = '100%';
    inputArea.style.margin = '0';
    inputArea.style.padding = '0 16px 14px';
    inputArea.style.background = '#000000';
  }

  function applyGreetingAlign() {
    const inputArea = document.getElementById('input-area');
    if (!inputArea) return;
    inputArea.style.maxWidth = '680px';
    inputArea.style.width = '88%';
    inputArea.style.margin = '0 auto';
    inputArea.style.padding = '0';
  }

  /* ── Patch GreetingSystem.hide() ─────────────────────────────── */
  function patchGreetingSystem() {
    if (!window.GreetingSystem) { setTimeout(patchGreetingSystem, 300); return; }

    const _origHide = GreetingSystem.hide.bind(GreetingSystem);

    GreetingSystem.hide = function () {
      _origHide();

      /* After the greeting fade (460ms) + small buffer, fix alignment */
      setTimeout(() => {
        const centerPanel = document.getElementById('center-panel');
        if (centerPanel && !centerPanel.classList.contains('greeting-mode')) {
          applyBottomAlign();
        }
      }, 520);
    };

    console.log('[InputAlignFix] GreetingSystem.hide patched ✓');
  }

  /* ── Also watch center-panel class changes ───────────────────── */
  function watchCenterPanel() {
    const panel = document.getElementById('center-panel');
    if (!panel) { setTimeout(watchCenterPanel, 300); return; }

    new MutationObserver(mutations => {
      mutations.forEach(m => {
        if (m.attributeName !== 'class') return;
        const isGreeting = panel.classList.contains('greeting-mode');
        if (isGreeting) {
          applyGreetingAlign();
        } else {
          applyBottomAlign();
        }
      });
    }).observe(panel, { attributes: true, attributeFilter: ['class'] });

    /* Apply correct state immediately based on current class */
    if (!panel.classList.contains('greeting-mode')) {
      applyBottomAlign();
    }

    console.log('[InputAlignFix] center-panel observer attached ✓');
  }

  /* ── Boot ─────────────────────────────────────────────────────── */
  setTimeout(() => {
    patchGreetingSystem();
    watchCenterPanel();
  }, 600);

})();

/* ================================================================
   CENTER PANEL NAV BAR 
   ================================================================ */
(function initCenterNavBar() {

  /* ── 1. BUILD & INJECT THE NAV BAR ─────────────────────────── */
  function buildNavBar() {
    if (document.getElementById('center-nav-bar')) return;

    const bar = document.createElement('div');
    bar.id = 'center-nav-bar';
    bar.innerHTML =
      /* Left: logo */
      '<span id="cnb-logo" title="Reload Player">Player</span>' +

      /* Centre: current chat title */
      '<span id="cnb-chat-title">— New conversation —</span>' +

      /* Right: action buttons */
      '<div id="cnb-actions">' +
      '<button class="cnb-btn" id="cnb-newchat-btn"  title="New chat">✏️</button>' +
      '<div id="cnb-sep"></div>' +
      '<button class="cnb-btn" id="cnb-search-btn"   title="Search chats">🔍</button>' +
      '<button class="cnb-btn" id="cnb-share-btn"    title="Share chat">🔗</button>' +
      '<button class="cnb-btn" id="cnb-clear-btn"    title="Clear chat">🗑️</button>' +
      '</div>';

    /* Prepend to center panel (before everything else) */
    const centerPanel = document.getElementById('center-panel');
    if (!centerPanel) return;
    centerPanel.insertBefore(bar, centerPanel.firstChild);

    wireNavBarEvents(bar);
    console.log('[NavBar] injected ✓');
  }

  function wireNavBarEvents(bar) {
    /* Logo click → reload */
    bar.querySelector('#cnb-logo')?.addEventListener('click', () => {
      window.location.reload();
    });

    /* New chat */
    bar.querySelector('#cnb-newchat-btn')?.addEventListener('click', () => {
      if (window.ChatMgr?.newChat) ChatMgr.newChat(true);
    });

    /* Search */
    bar.querySelector('#cnb-search-btn')?.addEventListener('click', () => {
      document.getElementById('searchBtn')?.click();
    });

    /* Share current chat */
    bar.querySelector('#cnb-share-btn')?.addEventListener('click', () => {
      const id = window.ChatMgr?.current;
      const info = id && ChatMgr.chats?.[id];
      const title = info?.name || 'Player Chat';
      const url = window.location.href;
      if (navigator.share) {
        navigator.share({ title, url }).catch(() => { });
      } else {
        navigator.clipboard?.writeText(url)
          .then(() => window.showToast?.('🔗 Link copied', '#2a6f4f'))
          .catch(() => { });
      }
    });

    /* Clear chat */
    bar.querySelector('#cnb-clear-btn')?.addEventListener('click', () => {
      if (window.ChatMgr?.clearCurrent) ChatMgr.clearCurrent();
    });
  }

  /* ── 2. REMOVE LOGO FROM LEFT PANEL ────────────────────────── */
  function removeLogoFromSidebar() {
    /* Hide the .logo span – CSS already does this but JS reinforces */
    document.querySelectorAll('.sidebar-header .logo, #left-panel .logo')
      .forEach(el => {
        el.style.display = 'none';
      });

    /* Re-centre the sidebar header so the toggle button looks balanced */
    const header = document.querySelector('.sidebar-header');
    if (header) {
      header.style.justifyContent = 'center';
      header.style.marginBottom = '16px';
    }
  }

  /* ── 3. KEEP CHAT TITLE IN NAV BAR UP TO DATE ──────────────── */
  function updateNavTitle() {
    const titleEl = document.getElementById('cnb-chat-title');
    if (!titleEl) return;

    const id = window.ChatMgr?.current;
    const info = id && ChatMgr.chats?.[id];

    if (info?.name && info.name !== 'New Chat' &&
      info.messages?.some(m => m.sender?.toLowerCase() === 'you')) {
      /* Real chat with user messages */
      const name = info.name.length > 50
        ? info.name.slice(0, 50) + '…'
        : info.name;
      titleEl.textContent = name;
      titleEl.classList.add('has-title');
    } else {
      titleEl.textContent = '— New conversation —';
      titleEl.classList.remove('has-title');
    }
  }

  /* Patch ChatMgr methods that change the active chat */
  function patchChatMgrForTitle() {
    if (!window.ChatMgr) { setTimeout(patchChatMgrForTitle, 300); return; }

    const wrap = fn => typeof fn === 'function'
      ? function (...args) { const r = fn.apply(this, args); updateNavTitle(); return r; }
      : fn;

    ['load', 'newChat', 'addMessage', 'clearCurrent', 'deleteCurrent']
      .forEach(method => {
        if (typeof ChatMgr[method] === 'function') {
          ChatMgr[method] = wrap(ChatMgr[method]);
        }
      });

    /* Also update immediately */
    updateNavTitle();
    console.log('[NavBar] ChatMgr title hooks attached ✓');
  }

  /* ── 4. ADJUST CHAT-MESSAGES HEIGHT (account for nav bar) ───── */
  function adjustLayout() {
    /* The nav bar is flex-shrink:0 inside the flex column,
       so no explicit height math needed. But we ensure
       chat-messages fills remaining space. */
    const msgs = document.getElementById('chat-messages');
    if (msgs) {
      msgs.style.flex = '1';
      msgs.style.minHeight = '0';
      msgs.style.overflowY = 'auto';
    }
  }

  /* ── 5. BOOT ────────────────────────────────────────────────── */
  function boot() {
    buildNavBar();
    removeLogoFromSidebar();
    adjustLayout();
    patchChatMgrForTitle();

    /* Watch for chat switches via DOM title changes */
    setInterval(updateNavTitle, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 400));
  } else {
    setTimeout(boot, 400);
  }

})();

/* ================================================================
   APP OPEN FIX 
   ================================================================ */
(function fixAppOpen() {

  /* ── APPS THAT HAVE BOTH NATIVE + WEB ──────────────────────────
     proto  : URL scheme tried first (native app)
     web    : fallback URL opened if native app not found
     name   : display name for chat messages
     ─────────────────────────────────────────────────────────────── */
  const DUAL_APPS = {
    // Messaging
    'whatsapp': { proto: 'whatsapp://', web: 'https://web.whatsapp.com', name: 'WhatsApp' },
    'telegram': { proto: 'tg://', web: 'https://web.telegram.org', name: 'Telegram' },
    'discord': { proto: 'discord://', web: 'https://discord.com/app', name: 'Discord' },
    'slack': { proto: 'slack://', web: 'https://app.slack.com', name: 'Slack' },
    'skype': { proto: 'skype:', web: 'https://web.skype.com', name: 'Skype' },
    'teams': { proto: 'msteams://', web: 'https://teams.microsoft.com', name: 'Teams' },
    'zoom': { proto: 'zoommtg://', web: 'https://app.zoom.us', name: 'Zoom' },
    'microsoft teams': { proto: 'msteams://', web: 'https://teams.microsoft.com', name: 'Teams' },
    // Social media
    'instagram': { proto: 'instagram://', web: 'https://www.instagram.com', name: 'Instagram' },
    'facebook': { proto: 'fb://', web: 'https://www.facebook.com', name: 'Facebook' },
    'twitter': { proto: 'twitter://', web: 'https://www.twitter.com', name: 'Twitter' },
    'x': { proto: 'twitter://', web: 'https://www.x.com', name: 'X' },
    'snapchat': { proto: 'snapchat://', web: 'https://web.snapchat.com', name: 'Snapchat' },
    'linkedin': { proto: 'linkedin://', web: 'https://www.linkedin.com', name: 'LinkedIn' },
    'reddit': { proto: 'reddit://', web: 'https://www.reddit.com', name: 'Reddit' },
    'tiktok': { proto: 'snssdk1233://', web: 'https://www.tiktok.com', name: 'TikTok' },
    'pinterest': { proto: 'pinterest://', web: 'https://www.pinterest.com', name: 'Pinterest' },
    'twitch': { proto: 'twitch://', web: 'https://www.twitch.tv', name: 'Twitch' },
    // Entertainment
    'spotify': { proto: 'spotify://', web: 'https://open.spotify.com', name: 'Spotify' },
    'netflix': { proto: 'nflx://', web: 'https://www.netflix.com', name: 'Netflix' },
    'youtube': { proto: 'vnd.youtube://', web: 'https://www.youtube.com', name: 'YouTube' },
    // Productivity
    'notion': { proto: 'notion://', web: 'https://www.notion.so', name: 'Notion' },
    'figma': { proto: 'figma://', web: 'https://www.figma.com', name: 'Figma' },
    'vscode': { proto: 'vscode://', web: 'https://vscode.dev', name: 'VS Code' },
    'visual studio code': { proto: 'vscode://', web: 'https://vscode.dev', name: 'VS Code' },
    'github desktop': { proto: 'github-windows://', web: 'https://github.com', name: 'GitHub' },
    'github': { proto: 'github-windows://', web: 'https://github.com', name: 'GitHub' },
    'trello': { proto: 'trello://', web: 'https://trello.com', name: 'Trello' },
    // Google apps
    'gmail': { proto: 'googlegmail://', web: 'https://mail.google.com', name: 'Gmail' },
    'maps': { proto: 'comgooglemaps://', web: 'https://maps.google.com', name: 'Google Maps' },
    'google maps': { proto: 'comgooglemaps://', web: 'https://maps.google.com', name: 'Google Maps' },
    'drive': { proto: 'googledrive://', web: 'https://drive.google.com', name: 'Google Drive' },
    // Music
    'soundcloud': { proto: 'soundcloud://', web: 'https://soundcloud.com', name: 'SoundCloud' },
    // Shopping
    'amazon': { proto: 'com.amazon.mobile.shopping://', web: 'https://www.amazon.com', name: 'Amazon' },
  };

  /* ── SMART NATIVE-FIRST OPENER ──────────────────────────────────
     1. Tries the native protocol via hidden iframe (no page nav).
     2. Watches for visibilitychange — if page hides the app opened.
     3. After 1.4 s if page is still focused → open web fallback.
     ─────────────────────────────────────────────────────────────── */
  function smartOpen(config) {
    const { proto, web, name } = config;
    let resolved = false;

    App.appendChat('System', `🔗 Trying to open ${name}…`);

    /* Detect if native app steals focus */
    const onVis = () => {
      if (document.hidden && !resolved) {
        resolved = true;
        document.removeEventListener('visibilitychange', onVis);
        App.appendChat('System', `✅ ${name} opened.`);
        App.speak(`Opening ${name}.`, App._token);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    /* Hidden iframe fires the protocol without navigating the page */
    const iframe = document.createElement('iframe');
    iframe.style.cssText =
      'position:fixed;top:-2px;left:-2px;width:1px;height:1px;' +
      'opacity:0;border:none;pointer-events:none;';
    iframe.src = proto;
    document.body.appendChild(iframe);

    /* Fallback timer */
    setTimeout(() => {
      document.removeEventListener('visibilitychange', onVis);
      try { iframe.remove(); } catch (e) { }

      if (!resolved) {
        resolved = true;
        /* Native app not installed / protocol not handled */
        window.open(web, '_blank');
        App.appendChat('System',
          `📱 ${name} desktop app not found — opened web version.\n` +
          `💡 Install ${name} for automatic native launch next time.`
        );
        App.speak(`${name} web version opened.`, App._token);
      }
    }, 1400);
  }

  /* ── MATCH HELPER ───────────────────────────────────────────────
     Finds the best DUAL_APPS entry for a given app name string.
     ─────────────────────────────────────────────────────────────── */
  function findDualApp(name) {
    const n = name.toLowerCase().trim();
    /* Exact match first */
    if (DUAL_APPS[n]) return DUAL_APPS[n];
    /* Partial match */
    for (const [key, cfg] of Object.entries(DUAL_APPS)) {
      if (n.includes(key) || key.includes(n)) return cfg;
    }
    return null;
  }

  /* ── PATCH Automation._openApp ──────────────────────────────────
     New priority order:
       1. DUAL_APPS (native → web fallback)   ← NEW
       2. protocolMap (pure desktop apps)
       3. SITE_MAP (pure web apps)
       4. Web-alt hints
       5. Fallback message
     ─────────────────────────────────────────────────────────────── */
  function patchAutomation() {
    if (!window.Automation || !Automation._openApp) {
      setTimeout(patchAutomation, 400); return;
    }

    Automation._openApp = function (name) {
      const n = name.toLowerCase().trim();

      /* ── Priority 1: dual-mode apps (native first) ── */
      const dual = findDualApp(n);
      if (dual) {
        smartOpen(dual);
        return `Opening ${dual.name}…`;
      }

      /* ── Priority 2: pure desktop protocol apps ── */
      const protocolMap = {
        calculator: 'calculator:',
        calc: 'calculator:',
        camera: 'microsoft.camera:',
        photos: 'ms-photos:',
        'snipping tool': 'ms-screensketch:',
        'snip & sketch': 'ms-screensketch:',
        'sticky notes': 'ms-stickynotes:',
        alarms: 'ms-clock:',
        clock: 'ms-clock:',
        calendar: 'outlookcal:',
        mail: 'mailto:',
        settings: 'ms-settings:',
        notepad: 'notepad:',
        wordpad: 'wordpad:',
        paint: 'mspaint:',
        word: 'ms-word:',
        excel: 'ms-excel:',
        powerpoint: 'ms-powerpoint:',
        outlook: 'outlook:',
        onenote: 'onenote:',
        steam: 'steam://',
        blender: 'blender://',
        unity: 'unityhub://',
        xbox: 'xbox://',
      };

      for (const [key, proto] of Object.entries(protocolMap)) {
        if (n === key || n.includes(key) || key.includes(n)) {
          /* Built-in hints */
          if (key === 'notepad') { window.Notepad?.open(); return 'Opening Notepad.'; }

          try {
            window.open(proto, '_blank');
            return `Attempting to open ${name} using ${proto}. If it doesn't open, the app may not be installed.`;
          } catch (e) { }
        }
      }

      /* ── Priority 3: SITE_MAP (pure web apps) ── */
      if (window.SITE_MAP) {
        for (const [k, url] of Object.entries(SITE_MAP)) {
          if (k === n || n === k || n.includes(k) || k.includes(n)) {
            window.open(url, '_blank');
            return `Opening ${k}`;
          }
        }
      }

      /* ── Priority 4: DESKTOP_APP_WEB_ALT hints ── */
      if (window.DESKTOP_APP_WEB_ALT) {
        for (const [key, alt] of Object.entries(DESKTOP_APP_WEB_ALT)) {
          if (n === key || n.includes(key) || key.includes(n)) {
            if (alt.action === 'notepad') { window.Notepad?.open(); return 'Opening Notepad (built-in).'; }
            if (alt.action === 'hint') return `💡 ${alt.hint}`;
            if (alt.url) {
              window.open(alt.url, '_blank');
              return `🌐 "${key}" opened in browser (web version).`;
            }
          }
        }
      }

      /* ── Fallback ── */
      return (
        `⚠️ "${name}" is a desktop-only app I can't launch directly from the browser.\n` +
        `💡 Press Win and type the app name to open it manually.`
      );
    };

    console.log('[AppOpenFix] Automation._openApp patched ✓');
  }

  /* ── Also patch _openSite so "go to whatsapp" uses native too ── */
  function patchOpenSite() {
    if (!window.Automation || !Automation._openSite) {
      setTimeout(patchOpenSite, 400); return;
    }

    const _origSite = Automation._openSite.bind(Automation);

    Automation._openSite = function (site) {
      const dual = findDualApp(site);
      if (dual) {
        smartOpen(dual);
        return `Opening ${dual.name}…`;
      }
      return _origSite(site);
    };

    console.log('[AppOpenFix] Automation._openSite patched ✓');
  }

  setTimeout(() => {
    patchAutomation();
    patchOpenSite();
  }, 800);

})();