// ── Data ──────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1,
    name: "Tesla Optimus Gen 2",
    brand: "Tesla",
    price: 4999000,
    orig: 5499000,
    rating: 4.8,
    reviews: 312,
    badge: "HOT",
    cat: "Humanoid",
    desc: "Full-body humanoid with 28 DOF, AI vision, and autonomous task learning."
  },
  {
    id: 2,
    name: "Boston Dynamics Spot",
    brand: "Boston Dynamics",
    price: 5499000,
    orig: 5999000,
    rating: 4.9,
    reviews: 876,
    badge: "NEW",
    cat: "Quadruped",
    desc: "Agile quadruped robot for inspection, data collection, and dynamic environments."
  },
  {
    id: 3,
    name: "iRobot Roomba j9+",
    brand: "iRobot",
    price: 89900,
    orig: 109900,
    rating: 4.7,
    reviews: 5621,
    badge: "SALE",
    cat: "Cleaning",
    desc: "AI-powered self-emptying robot vacuum with smart mapping and obstacle avoidance."
  },
  {
    id: 4,
    name: "Unitree H1 Humanoid",
    brand: "Unitree",
    price: 3299000,
    orig: 3599000,
    rating: 4.6,
    reviews: 198,
    badge: "HOT",
    cat: "Humanoid",
    desc: "High-performance humanoid robot with 360° perception and dynamic balance control."
  },
  {
    id: 5,
    name: "ABB IRB 1200 Arm",
    brand: "ABB",
    price: 1499000,
    orig: 1699000,
    rating: 4.8,
    reviews: 443,
    badge: "SALE",
    cat: "Industrial",
    desc: "Compact industrial 6-axis robot arm for precision assembly and material handling."
  },
  {
    id: 6,
    name: "SoftBank Pepper",
    brand: "SoftBank",
    price: 899000,
    orig: 999000,
    rating: 4.5,
    reviews: 734,
    badge: "NEW",
    cat: "Companion",
    desc: "Humanoid social robot with emotion recognition and multi-language interaction."
  },
  {
    id: 7,
    name: "DJI RoboMaster S1",
    brand: "DJI",
    price: 59900,
    orig: 69900,
    rating: 4.7,
    reviews: 2301,
    badge: "NEW",
    cat: "Educational",
    desc: "Programmable educational robot with live FPV, shooting combat, and Python/Scratch SDK."
  },
  {
    id: 8,
    name: "KUKA KR 6 R900",
    brand: "KUKA",
    price: 1999000,
    orig: 2249000,
    rating: 4.9,
    reviews: 289,
    badge: "SALE",
    cat: "Industrial",
    desc: "Ultra-precise industrial robot arm with 6 kg payload and 900 mm reach for automation."
  },
];

const CATEGORIES = [
  { name: "Humanoid", count: 18, ico: "🤖" },
  { name: "Industrial", count: 64, ico: "🦾" },
  { name: "Companion", count: 27, ico: "🐾" },
  { name: "Cleaning", count: 45, ico: "🧹" },
  { name: "Educational", count: 33, ico: "📡" },
  { name: "Security", count: 22, ico: "🔒" },
  { name: "Quadruped", count: 14, ico: "🐕" },
];

const BRANDS = [
  "Boston Dynamics", "Tesla", "iRobot", "Unitree", "ABB",
  "SoftBank", "KUKA", "DJI", "Fanuc", "Universal Robots",
  "Agility Robotics", "Figure AI"
];

const CAT_ICO = {
  Humanoid: "🤖",
  Industrial: "🦾",
  Companion: "🐾",
  Cleaning: "🧹",
  Educational: "📡",
  Security: "🔒",
  Quadruped: "🐕",
};

// ── State ─────────────────────────────────────────────────────────────────────

let cart = [];
let wishlist = new Set();
let chatHistory = [];
let chatOpen = false;
let cartIsOpen = false;
let theme = localStorage.getItem("rblux-theme") || "light";

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmt = n => "₹" + n.toLocaleString("en-IN");
const pct = (p, o) => Math.round(((o - p) / o) * 100);
const pad = n => String(n).padStart(2, "0");
const star = r => "★".repeat(Math.floor(r)) + "☆".repeat(5 - Math.floor(r));

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

const SUN_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const MOON_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

// ── Theme ─────────────────────────────────────────────────────────────────────

function applyTheme() {
  document.body.setAttribute("data-theme", theme);
  const icon = document.getElementById("theme-icon");
  if (icon) icon.outerHTML = `<span id="theme-icon">${theme === "light" ? MOON_SVG : SUN_SVG}</span>`;
  localStorage.setItem("rblux-theme", theme);
}

function toggleTheme() {
  theme = theme === "light" ? "dark" : "light";
  applyTheme();
}

// ── Render Categories ─────────────────────────────────────────────────────────

function renderCats() {
  document.getElementById("cat-grid").innerHTML = CATEGORIES.map(c => `
    <div class="cat-card">
      <div class="cat-ico">${c.ico}</div>
      <div class="cat-nm">${c.name}</div>
      <div class="cat-cnt">${c.count} models</div>
    </div>
  `).join("");
}

// ── Render Products ───────────────────────────────────────────────────────────

function renderProds() {
  document.getElementById("prod-grid").innerHTML = PRODUCTS.map((p, i) => `
    <div class="pcard" style="animation-delay:${i * 0.07}s">
      <div class="pimg">
        <span style="font-size:64px">${CAT_ICO[p.cat]}</span>
        <span class="pbadge b${p.badge}">${p.badge}</span>
        <button class="pwish${wishlist.has(p.id) ? " on" : ""}" id="wb${p.id}" onclick="toggleWish(${p.id})">
          <svg width="15" height="15" viewBox="0 0 24 24"
            fill="${wishlist.has(p.id) ? "#B91C1C" : "none"}"
            stroke="${wishlist.has(p.id) ? "#B91C1C" : "currentColor"}"
            stroke-width="2" stroke-linecap="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="pinfo">
        <div class="p-brand">${p.brand}</div>
        <div class="p-name">${p.name}</div>
        <div class="p-desc">${p.desc}</div>
        <div class="p-rating">
          <span class="stars">${star(p.rating)}</span>
          <span class="rcnt"> ${p.rating} (${p.reviews.toLocaleString()} reviews)</span>
        </div>
        <div class="pprices">
          <span class="pprice">${fmt(p.price)}</span>
          <span class="pori">${fmt(p.orig)}</span>
          <span class="pdisc">${pct(p.price, p.orig)}% off</span>
        </div>
        <button class="patc" onclick="addToCart(${p.id})">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  `).join("");
}

// ── Render Flash Deals ────────────────────────────────────────────────────────

function renderDeals() {
  const deals = [PRODUCTS[2], PRODUCTS[6], PRODUCTS[4]]; // Roomba, RoboMaster, ABB
  document.getElementById("deals-grid").innerHTML = deals.map(p => `
    <div class="dcard">
      <div class="dimg">${CAT_ICO[p.cat]}</div>
      <div>
        <span class="ddisc">${pct(p.price, p.orig)}% OFF</span>
        <div class="dname">${p.name}</div>
        <div class="dbrnd">${p.brand}</div>
        <div class="ddesc">${p.desc}</div>
        <div style="margin-top:6px">
          <span class="dprice">${fmt(p.price)}</span>
          <span class="dori-s">${fmt(p.orig)}</span>
        </div>
        <button class="datc" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `).join("");
}

// ── Countdown ─────────────────────────────────────────────────────────────────

let cd = { h: 5, m: 42, s: 17 };
setInterval(() => {
  cd.s--;
  if (cd.s < 0) { cd.s = 59; cd.m--; }
  if (cd.m < 0) { cd.m = 59; cd.h--; }
  if (cd.h < 0) { cd.h = 23; cd.m = 59; cd.s = 59; }
  document.getElementById("cd-h").textContent = pad(cd.h);
  document.getElementById("cd-m").textContent = pad(cd.m);
  document.getElementById("cd-s").textContent = pad(cd.s);
}, 1000);

// ── Brands Marquee ────────────────────────────────────────────────────────────

function renderBrands() {
  const doubled = [...BRANDS, ...BRANDS];
  document.getElementById("brands-track").innerHTML =
    doubled.map(b => `<span class="brand-item">🤖 ${b}</span>`).join("");
}

// ── Wishlist ──────────────────────────────────────────────────────────────────

function toggleWish(id) {
  wishlist.has(id) ? wishlist.delete(id) : wishlist.add(id);
  const p = PRODUCTS.find(x => x.id === id);
  if (wishlist.has(id)) showToast(`❤️ ${p.name} added to wishlist`);
  const badge = document.getElementById("wish-badge");
  badge.style.display = wishlist.size > 0 ? "flex" : "none";
  badge.textContent = wishlist.size;
  renderProds();
}

// ── Cart ──────────────────────────────────────────────────────────────────────

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  const ex = cart.find(i => i.id === id);
  if (ex) ex.qty++;
  else cart.push({ ...p, qty: 1 });
  renderCart();
  showToast(`🤖 ${p.name} added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

function updateQty(id, d) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + d);
  renderCart();
}

function renderCart() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  document.getElementById("cart-count-nav").textContent = count > 0 ? `(${count})` : "";
  document.getElementById("cart-title").textContent = `Your Cart${count > 0 ? ` (${count})` : ""}`;

  const body = document.getElementById("cart-items");
  const foot = document.getElementById("cart-foot");

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-ico">🤖</div>
        <p style="font-size:14px;font-weight:600">Your cart is empty</p>
        <p style="font-size:12px;margin-top:4px">Add a robot to get started</p>
        <button class="btn-outline" style="font-size:13px;padding:10px 20px;margin-top:12px" onclick="toggleCart()">Browse Robots</button>
      </div>`;
    foot.style.display = "none";
  } else {
    body.innerHTML = cart.map(item => `
      <div class="citem">
        <div class="ci-img">${CAT_ICO[item.cat]}</div>
        <div class="ci-inf">
          <div class="ci-nm">${item.name}</div>
          <div class="ci-br">${item.brand} · ${item.cat}</div>
          <div class="ci-row">
            <span class="ci-pr">${fmt(item.price)}</span>
            <div class="qty-c">
              <button class="qbtn" onclick="updateQty(${item.id}, -1)">−</button>
              <span class="qnum">${item.qty}</span>
              <button class="qbtn" onclick="updateQty(${item.id},  1)">+</button>
            </div>
          </div>
        </div>
        <button class="ci-rm" onclick="removeFromCart(${item.id})">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>`).join("");
    foot.style.display = "block";
    document.getElementById("cart-total").textContent = fmt(total);
  }
}

function toggleCart() {
  cartIsOpen = !cartIsOpen;
  document.getElementById("cart-drawer").classList.toggle("open", cartIsOpen);
  document.getElementById("overlay").classList.toggle("open", cartIsOpen);
  document.body.style.overflow = cartIsOpen ? "hidden" : "";
}

// ── Newsletter ────────────────────────────────────────────────────────────────

function subscribeNwl() {
  const inp = document.getElementById("nwl-email");
  if (inp.value.includes("@")) {
    showToast("🎉 Subscribed! Welcome to the RoboLux community.");
    inp.value = "";
  } else {
    showToast("⚠️ Please enter a valid email address.");
  }
}

// ── VOLT Chatbot ──────────────────────────────────────────────────────────────

const VOLT_SYSTEM = `You are VOLT ⚡, a knowledgeable AI assistant for RoboLux — India's premier robot e-commerce store. You help customers with:
- Robot recommendations based on use-case (industrial, home, education, security, companion)
- Product comparisons (e.g. Tesla Optimus vs Unitree H1, Boston Dynamics Spot vs quadruped alternatives)
- Technical specs and capabilities of robots we sell
- Pricing guidance (our robots range from ₹59,900 for educational robots to ₹54,99,000 for advanced humanoids)
- Order tracking (ask for order ID if not provided)
- Return & warranty policy: 30-day returns, 2-year manufacturer warranty on all robots
- Installation & setup: we offer professional on-site commissioning for industrial and humanoid robots
- Shipping: white-glove delivery with professional setup included for robots above ₹5,00,000
Keep responses concise (2-4 sentences), warm, technically confident. Use ₹ for prices. Always show enthusiasm for robotics.`;

const CHIPS = [
  "Best robot for home use",
  "Compare humanoid robots",
  "Industrial robot pricing",
  "Track my order",
  "Installation support",
];

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById("chat-panel").classList.toggle("open", chatOpen);
  const ico = document.getElementById("chat-ico");
  ico.innerHTML = chatOpen
    ? `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`
    : `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`;
  ico.setAttribute("fill", "none");
  ico.setAttribute("stroke", "currentColor");
  ico.setAttribute("stroke-width", "2.5");
  ico.setAttribute("stroke-linecap", "round");
  ico.setAttribute("stroke-linejoin", "round");
  if (chatOpen) document.getElementById("chat-input").focus();
}

function appendMsg(role, text) {
  const msgs = document.getElementById("chat-msgs");
  const d = document.createElement("div");
  d.className = `cmsg ${role}`;
  d.innerHTML = role === "bot"
    ? `<div class="cav-sm">⚡</div><div class="cbub">${text.replace(/\n/g, "<br>")}</div>`
    : `<div class="cbub">${text}</div>`;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById("chat-msgs");
  const d = document.createElement("div");
  d.id = "typing-ind"; d.className = "cmsg bot";
  d.innerHTML = `<div class="cav-sm">⚡</div><div class="cbub"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function hideTyping() {
  const ti = document.getElementById("typing-ind");
  if (ti) ti.remove();
}

async function sendChat(override) {
  const inp = document.getElementById("chat-input");
  const text = (override || inp.value).trim();
  if (!text) return;

  inp.value = "";
  document.getElementById("chat-chips").style.display = "none";
  appendMsg("user", text);
  chatHistory.push({ role: "user", content: text });
  showTyping();

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: VOLT_SYSTEM,
        messages: chatHistory,
      }),
    });
    const data = await res.json();
    hideTyping();
    const reply = data.content?.[0]?.text || "I'm having trouble connecting right now. Please try again!";
    chatHistory.push({ role: "assistant", content: reply });
    appendMsg("bot", reply);
  } catch {
    hideTyping();
    appendMsg("bot", "Connection issue. Please check your network and try again.");
  }
}

// ── Extra CSS injected at runtime (product description line) ──────────────────

function injectExtraStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .p-desc {
      font-size: 12px;
      color: var(--muted);
      line-height: 1.5;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .ddesc {
      font-size: 12px;
      color: var(--muted);
      line-height: 1.45;
      margin-top: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
}

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
  injectExtraStyles();
  applyTheme();
  renderCats();
  renderProds();
  renderDeals();
  renderBrands();
  renderCart();

  appendMsg("bot", "Hello! I'm VOLT ⚡, your RoboLux assistant. Looking for a robot? I can help you find the perfect one! 🤖");

  const chipsEl = document.getElementById("chat-chips");
  CHIPS.forEach(chip => {
    const btn = document.createElement("button");
    btn.className = "cchip";
    btn.textContent = chip;
    btn.onclick = () => sendChat(chip);
    chipsEl.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", init);