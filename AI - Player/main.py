##### LINK FOR WEBSITE - http://fastidious-profiterole-12f9af.netlify.app #####
import tkinter as tk
from tkinter import ttk, messagebox, simpledialog
import ttkbootstrap
import speech_recognition as sr
import webbrowser
import pyttsx3
import pyautogui
import requests
import wikipedia
import cv2
import mediapipe as mp
import os
import threading
import pyaudio
import numpy as np
import time
from tkinter import scrolledtext
import feedparser
import subprocess
import sys
import math
import json
import base64
import re
import html
from datetime import datetime
from PIL import Image, ImageTk

# ── Optional search libraries (install with pip) ──────────────
try:
    from duckduckgo_search import DDGS
    DDG_AVAILABLE = True
except ImportError:
    DDG_AVAILABLE = False

try:
    from googlesearch import search as google_search
    GSEARCH_AVAILABLE = True
except ImportError:
    GSEARCH_AVAILABLE = False

try:
    from bs4 import BeautifulSoup
    BS4_AVAILABLE = True
except ImportError:
    BS4_AVAILABLE = False

try:
    import psutil
    PSUTIL_AVAILABLE = True
except ImportError:
    PSUTIL_AVAILABLE = False

try:
    import pygetwindow as gw
    PYGETWINDOW = True
except ImportError:
    PYGETWINDOW = False

# ═══════════════════════════════════════════════════════════════
#  JARVIS AUTOMATION ENGINE (unchanged)
# ═══════════════════════════════════════════════════════════════
import glob
import shlex

pyautogui.FAILSAFE  = False
pyautogui.PAUSE     = 0.04

SYSTEM_APPS = {
    "notepad":      "notepad.exe",
    "calculator":   "calc.exe",
    "paint":        "mspaint.exe",
    "word":         r"C:\Program Files\Microsoft Office\root\Office16\WINWORD.EXE",
    "excel":        r"C:\Program Files\Microsoft Office\root\Office16\EXCEL.EXE",
    "powerpoint":   r"C:\Program Files\Microsoft Office\root\Office16\POWERPNT.EXE",
    "cmd":          "cmd.exe",
    "terminal":     "wt.exe",
    "explorer":     "explorer.exe",
    "task manager": "taskmgr.exe",
    "control panel":"control.exe",
    "settings":     "ms-settings:",
    "camera":       "microsoft.windows.camera:",
    "maps":         "bingmaps:",
    "calendar":     "outlookcal:",
    "mail":         "outlookmail:",
    "store":        "ms-windows-store:",
    "music":        "mswindowsmusic:",
    "movies":       "mswindowsvideo:",
    "vlc":          r"C:\Program Files\VideoLAN\VLC\vlc.exe",
    "brave":        r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe",
    "chrome":       r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "firefox":      r"C:\Program Files\Mozilla Firefox\firefox.exe",
    "opera":        r"C:\Users\{user}\AppData\Local\Programs\Opera\opera.exe",
    "discord":      r"C:\Users\{user}\AppData\Local\Discord\app-*\Discord.exe",
    "telegram":     r"C:\Users\{user}\AppData\Roaming\Telegram Desktop\Telegram.exe",
    "zoom":         r"C:\Users\{user}\AppData\Roaming\Zoom\bin\Zoom.exe",
    "obs":          r"C:\Program Files\obs-studio\bin\64bit\obs64.exe",
    "steam":        r"C:\Program Files (x86)\Steam\Steam.exe",
    "spotify":      r"C:\Users\{user}\AppData\Roaming\Spotify\Spotify.exe",
    "skype":        r"C:\Users\{user}\AppData\Local\Microsoft\Skype\app\Skype.exe",
}

SITE_MAP = {
    "google":       "https://www.google.com",
    "youtube":      "https://www.youtube.com",
    "gmail":        "https://mail.google.com",
    "facebook":     "https://www.facebook.com",
    "twitter":      "https://www.twitter.com",
    "x":            "https://www.x.com",
    "instagram":    "https://www.instagram.com",
    "reddit":       "https://www.reddit.com",
    "linkedin":     "https://www.linkedin.com",
    "amazon":       "https://www.amazon.com",
    "netflix":      "https://www.netflix.com",
    "github":       "https://www.github.com",
    "stackoverflow":"https://stackoverflow.com",
    "wikipedia":    "https://www.wikipedia.org",
    "pinterest":    "https://www.pinterest.com",
    "whatsapp":     "https://web.whatsapp.com",
    "chatgpt":      "https://chat.openai.com",
    "claude":       "https://claude.ai",
    "gemini":       "https://gemini.google.com",
    "perplexity":   "https://www.perplexity.ai",
    "deepseek":     "https://chat.deepseek.com",
    "bing":         "https://www.bing.com",
    "maps":         "https://maps.google.com",
    "translate":    "https://translate.google.com",
    "drive":        "https://drive.google.com",
    "docs":         "https://docs.google.com",
    "sheets":       "https://sheets.google.com",
    "slides":       "https://slides.google.com",
    "outlook":      "https://outlook.live.com",
    "twitch":       "https://www.twitch.tv",
    "spotify":      "https://open.spotify.com",
    "soundcloud":   "https://soundcloud.com",
    "notion":       "https://www.notion.so",
    "figma":        "https://www.figma.com",
    "canva":        "https://www.canva.com",
}

SITE_SEARCH_MAP = {
    "google":       ("https://www.google.com", True),
    "youtube":      ("https://www.youtube.com", False),
    "amazon":       ("https://www.amazon.com",  False),
    "bing":         ("https://www.bing.com",    True),
    "reddit":       ("https://www.reddit.com",  False),
    "github":       ("https://www.github.com",  False),
}

class JarvisAutomation:
    @classmethod
    def handle(cls, command: str) -> str | None:
        cmd = command.strip().lower()
        m = re.match(r"^(?:please\s+)?type\s+(?:out\s+)?[\"']?(.+?)[\"']?\s*$", cmd)
        if m:
            return cls._type_text(m.group(1).strip())
        m = re.match(r"^(?:please\s+)?write\s+(?:out\s+)?[\"']?(.+?)[\"']?\s*$", cmd)
        if m:
            return cls._type_text(m.group(1).strip())
        m = re.match(r"^(?:please\s+)?open\s+(?:the\s+)?(?:file\s+|folder\s+)?[\"']?(.+?)[\"']?"
                     r"(?:\s+(?:on|in|from)\s+(?:my\s+)?(.+?))?$", cmd)
        if m:
            target = m.group(1).strip()
            location = (m.group(2) or "").strip()
            result = cls._open_file_or_folder(target, location)
            if result:
                return result
        for prefix in ("go to ", "navigate to ", "visit ", "open website "):
            if cmd.startswith(prefix):
                rest = cmd[len(prefix):].strip()
                and_type = re.search(r"\s+and\s+(?:type|write|search(?:\s+for)?)\s+[\"']?(.+)[\"']?$", rest)
                if and_type:
                    site = rest[:and_type.start()].strip()
                    text = and_type.group(1).strip()
                    return cls._open_site_and_type(site, text)
                return cls._open_site(rest)
        m = re.match(r"^search(?:\s+for)?\s+[\"']?(.+?)[\"']?\s+on\s+(\w+)\s*$", cmd)
        if m:
            return cls._search_on_site(m.group(1).strip(), m.group(2).strip())
        m = re.match(r"^(?:google|search)\s+[\"']?(.+?)[\"']?\s*$", cmd)
        if m:
            return cls._search_on_site(m.group(1).strip(), "google")
        m = re.match(r"^(?:open|launch|start)\s+(.+?)\s+and\s+(?:type|write)\s+[\"']?(.+?)[\"']?\s*$", cmd)
        if m:
            app_name = m.group(1).strip()
            text     = m.group(2).strip()
            launched = cls._launch_system_app(app_name)
            if launched:
                time.sleep(2.0)
                cls._type_text(text)
                return f"Opened {app_name} and typed the text."
            return None
        m = re.match(r"^(?:open|launch|start)\s+(.+?)\s*$", cmd)
        if m:
            app_name = m.group(1).strip()
            result = cls._launch_system_app(app_name)
            if result:
                return result
        return None

    @staticmethod
    def _type_text(text: str) -> str:
        try:
            time.sleep(0.3)
            import pyperclip
            pyperclip.copy(text)
            pyautogui.hotkey("ctrl", "v")
        except ImportError:
            safe = text.encode("ascii", "ignore").decode("ascii")
            pyautogui.typewrite(safe, interval=0.04)
        return f'Typed: "{text}"'

    @classmethod
    def _open_file_or_folder(cls, name: str, location: str = "") -> str | None:
        search_roots = cls._resolve_location(location)
        patterns = [name, name + ".*", "*" + name + "*", "*" + name + "*.*"]
        for root in search_roots:
            for pat in patterns:
                matches = glob.glob(os.path.join(root, pat), recursive=False)
                if not matches:
                    matches = glob.glob(os.path.join(root, "**", pat), recursive=True)
                if matches:
                    target = matches[0]
                    try:
                        if sys.platform == "win32":
                            os.startfile(target)
                        elif sys.platform == "darwin":
                            subprocess.Popen(["open", target])
                        else:
                            subprocess.Popen(["xdg-open", target])
                        return f"Opening: {os.path.basename(target)}"
                    except Exception as e:
                        return f"Found it but could not open: {e}"
        return None

    @staticmethod
    def _resolve_location(loc: str) -> list:
        user = os.path.expanduser("~")
        loc = loc.lower().strip()
        mapping = {
            "desktop":   [os.path.join(user, "Desktop")],
            "documents": [os.path.join(user, "Documents")],
            "downloads": [os.path.join(user, "Downloads")],
            "pictures":  [os.path.join(user, "Pictures")],
            "videos":    [os.path.join(user, "Videos")],
            "music":     [os.path.join(user, "Music")],
            "c drive":   ["C:\\"],
            "d drive":   ["D:\\"],
        }
        if loc in mapping:
            return mapping[loc]
        return [os.path.join(user, "Desktop"), os.path.join(user, "Documents"),
                os.path.join(user, "Downloads"), user]

    @classmethod
    def _launch_system_app(cls, app_name: str) -> str | None:
        user = os.environ.get("USERNAME", os.environ.get("USER", "User"))
        key  = app_name.lower().strip()
        for k, path in SYSTEM_APPS.items():
            if k in key or key in k:
                resolved = path.replace("{user}", user)
                if "*" in resolved:
                    matches = glob.glob(resolved)
                    if matches:
                        resolved = sorted(matches)[-1]
                    else:
                        continue
                if ":" in resolved and not os.sep in resolved:
                    try:
                        subprocess.Popen(f'start "" "{resolved}"', shell=True)
                        return f"Opening {k.title()}"
                    except:
                        continue
                if not os.sep in resolved and "/" not in resolved:
                    try:
                        subprocess.Popen(resolved, shell=True)
                        return f"Opening {k.title()}"
                    except:
                        continue
                if os.path.isfile(resolved):
                    try:
                        os.startfile(resolved)
                        return f"Opening {k.title()}"
                    except:
                        continue
                try:
                    subprocess.Popen(resolved, shell=True)
                    return f"Opening {k.title()}"
                except:
                    continue
        try:
            subprocess.Popen(app_name, shell=True)
            return f"Trying to open {app_name}"
        except:
            pass
        return None

    @staticmethod
    def _open_site(site: str) -> str | None:
        site_key = site.lower().strip().rstrip("/")
        clean = re.sub(r"^(https?://)?(www\.)?", "", site_key)
        for k, url in SITE_MAP.items():
            if k in clean or clean in k:
                webbrowser.open(url)
                return f"Opening {k.title()}"
        if "." in site_key:
            url = site_key if site_key.startswith("http") else "https://" + site_key
            webbrowser.open(url)
            return f"Opening {site}"
        return None

    @classmethod
    def _open_site_and_type(cls, site: str, text: str) -> str:
        response = cls._open_site(site) or f"Opening {site}"
        time.sleep(2.8)
        try:
            pyautogui.hotkey("ctrl", "l")
            time.sleep(0.3)
            pyautogui.press("escape")
            time.sleep(0.3)
            pyautogui.hotkey("ctrl", "f")
            time.sleep(0.2)
            pyautogui.press("escape")
            time.sleep(0.2)
            cls._type_text(text)
            time.sleep(0.3)
            pyautogui.press("enter")
        except Exception as e:
            print(f"Type on site error: {e}")
        return f'{response}  →  Typed "{text}" and pressed Enter.'

    @classmethod
    def _search_on_site(cls, query: str, site: str) -> str:
        site = site.lower().strip()
        search_urls = {
            "google":    f"https://www.google.com/search?q={requests.utils.quote(query)}",
            "youtube":   f"https://www.youtube.com/results?search_query={requests.utils.quote(query)}",
            "bing":      f"https://www.bing.com/search?q={requests.utils.quote(query)}",
            "amazon":    f"https://www.amazon.com/s?k={requests.utils.quote(query)}",
            "reddit":    f"https://www.reddit.com/search/?q={requests.utils.quote(query)}",
            "github":    f"https://github.com/search?q={requests.utils.quote(query)}",
            "twitter":   f"https://twitter.com/search?q={requests.utils.quote(query)}",
            "x":         f"https://x.com/search?q={requests.utils.quote(query)}",
            "linkedin":  f"https://www.linkedin.com/search/results/all/?keywords={requests.utils.quote(query)}",
            "wikipedia": f"https://en.wikipedia.org/w/index.php?search={requests.utils.quote(query)}",
            "stackoverflow": f"https://stackoverflow.com/search?q={requests.utils.quote(query)}",
        }
        if site in search_urls:
            webbrowser.open(search_urls[site])
            return f'Searching "{query}" on {site.title()}'
        webbrowser.open(f"https://www.google.com/search?q=site:{site}.com+{requests.utils.quote(query)}")
        return f'Searching "{query}" on {site.title()} via Google'

# ═══════════════════════════════════════════════════════════════
#  PALETTE (unchanged)
# ═══════════════════════════════════════════════════════════════
BG        = "#000000"
PANEL     = "#1a1a1a"
PANEL_2   = "#0f0f0f"
SEP       = "#2a2a2a"

L_BG      = "#000000"
L_TEXT    = "#ffffff"
L_ITEM_BG = "#0a0a0a"
L_SEL     = "#1c1c1c"
L_SB_TRACK= "#0a0a0a"
L_SB_THUMB= "#2a2a2a"
L_SB_HOV  = "#4e4e4e"

C_BG      = "#252525"
C_HDR     = "#252525"
C_MSG_BG  = "#202020"

I_BG      = "#111111"
I_ENTRY   = "#0d0d0d"
I_BORDER  = "#2a2a2a"

ACCENT    = "#7b68ee"
ACCENT_H  = "#9d8fff"

TEXT      = "#e8e8f0"
MUTED     = "#5a5a6a"
DIM       = "#2e2e42"

COL_YOU    = "#60a5fa"
COL_PLAYER = "#c084fc"
COL_SYS    = "#94a3b8"
COL_NEWS   = "#fbbf24"

CB_BG     = "#1e1e1e"
CB_HOV    = "#333333"
CB_PRESS  = "#0a0a0a"
CB_FG     = "#ffffff"

BTN_BG_DARK  = "#3a3a3a"
BTN_HOV_DARK = "#4e4e4e"
BTN_BG_GREY  = "#888888"
BTN_HOV_GREY = "#aaaaaa"
BTN_FG       = "#ffffff"

RADAR_BG      = "#0d0d0d"
RADAR_HEX     = "#4a4a6a"
RADAR_HEX_OUT = "#8878cc"
RADAR_SPOKE   = "#4a4a6a"
RADAR_FILL    = "#7b68ee44"
RADAR_OUTLINE = "#7b68ee"
RADAR_LABEL   = "#c8c8d8"
RADAR_CENTER  = "#7b68ee"

FP_BG     = "#12121e"
FP_ROW    = "#1a1a2e"
FP_HOVER  = "#22223a"
FP_BORDER = "#2e2e4e"
FP_TEXT   = "#d8d8f0"
FP_MUTED  = "#6060a0"
FP_ACCENT = "#7b68ee"
FP_BLANK  = "#404060"

F_TITLE   = ("Consolas",  15, "bold")
F_BODY    = ("Segoe UI",  12)
F_BODY_B  = ("Segoe UI",  12, "bold")
F_SMALL   = ("Segoe UI",  10)
F_ENTRY   = ("Segoe UI",  13)
F_HIST    = ("Segoe UI",  11)

# ═══════════════════════════════════════════════════════════════
#  MULTI-SOURCE SEARCH ENGINE (unchanged)
# ═══════════════════════════════════════════════════════════════
class MultiSourceSearch:
    HEADERS = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        )
    }
    TIMEOUT = 8

    @classmethod
    def search(cls, query: str, cancelled_fn=None) -> str:
        results = {}
        lock = threading.Lock()
        def run(name, fn):
            try:
                if cancelled_fn and cancelled_fn(): return
                val = fn(query)
                if val and len(val) > 30:
                    with lock:
                        results[name] = val.strip()
            except Exception as e:
                pass
        workers = [
            threading.Thread(target=run, args=("wiki",    cls._wiki),    daemon=True),
            threading.Thread(target=run, args=("ddg",     cls._ddg),     daemon=True),
            threading.Thread(target=run, args=("google",  cls._google),  daemon=True),
        ]
        for w in workers:
            w.start()
        for w in workers:
            w.join(timeout=cls.TIMEOUT + 2)
        if cancelled_fn and cancelled_fn():
            return ""
        return cls._synthesise(query, results)

    @classmethod
    def _wiki(cls, query: str) -> str:
        try:
            results = wikipedia.search(query, results=3)
            if not results:
                return ""
            for title in results[:3]:
                try:
                    page = wikipedia.page(title, auto_suggest=False)
                    summary = wikipedia.summary(title, sentences=4, auto_suggest=False)
                    if len(summary) > 80:
                        return summary
                except wikipedia.exceptions.DisambiguationError as e:
                    if e.options:
                        try:
                            return wikipedia.summary(e.options[0], sentences=4)
                        except:
                            continue
                except Exception:
                    continue
            return ""
        except Exception:
            return ""

    @classmethod
    def _ddg(cls, query: str) -> str:
        if not DDG_AVAILABLE:
            return cls._ddg_html(query)
        try:
            with DDGS() as ddgs:
                results = list(ddgs.text(query, max_results=5))
            if not results:
                return ""
            snippets = [r.get("body", "") for r in results[:3] if r.get("body")]
            combined = " ".join(snippets)
            return cls._clean_text(combined)[:1000]
        except Exception:
            return cls._ddg_html(query)

    @classmethod
    def _ddg_html(cls, query: str) -> str:
        try:
            url = f"https://html.duckduckgo.com/html/?q={requests.utils.quote(query)}"
            resp = requests.get(url, headers=cls.HEADERS, timeout=cls.TIMEOUT)
            resp.raise_for_status()
            if BS4_AVAILABLE:
                soup = BeautifulSoup(resp.text, "html.parser")
                snippets = [s.get_text(" ", strip=True)
                            for s in soup.select(".result__snippet")[:4]]
                return cls._clean_text(" ".join(snippets))[:1000]
            else:
                matches = re.findall(r'class="result__snippet"[^>]*>(.*?)</a>', resp.text)
                text = " ".join(html.unescape(m) for m in matches[:4])
                return cls._clean_text(text)[:800]
        except Exception:
            return ""

    @classmethod
    def _google(cls, query: str) -> str:
        if GSEARCH_AVAILABLE:
            try:
                urls = list(google_search(query, num_results=3, lang="en"))
                texts = []
                for url in urls[:2]:
                    t = cls._fetch_page(url)
                    if t:
                        texts.append(t[:600])
                return cls._clean_text(" ".join(texts))[:1000]
            except Exception:
                pass
        return cls._google_html(query)

    @classmethod
    def _google_html(cls, query: str) -> str:
        try:
            url  = f"https://www.google.com/search?q={requests.utils.quote(query)}&hl=en"
            resp = requests.get(url, headers=cls.HEADERS, timeout=cls.TIMEOUT)
            resp.raise_for_status()
            if BS4_AVAILABLE:
                soup = BeautifulSoup(resp.text, "html.parser")
                parts = []
                for sel in [".VwiC3b", ".s", ".IsZvec", "span.aCOpRe"]:
                    for tag in soup.select(sel):
                        parts.append(tag.get_text(" ", strip=True))
                    if parts:
                        break
                return cls._clean_text(" ".join(parts[:5]))[:1000]
            else:
                matches = re.findall(r'"([^"]{60,300})"', resp.text)
                return cls._clean_text(" ".join(matches[:5]))[:800]
        except Exception:
            return ""

    @classmethod
    def _fetch_page(cls, url: str) -> str:
        try:
            resp = requests.get(url, headers=cls.HEADERS,
                                timeout=cls.TIMEOUT, allow_redirects=True)
            resp.raise_for_status()
            ct = resp.headers.get("content-type", "")
            if "text/html" not in ct:
                return ""
            if BS4_AVAILABLE:
                soup = BeautifulSoup(resp.text, "html.parser")
                for tag in soup(["script", "style", "nav", "footer", "header"]):
                    tag.decompose()
                text = soup.get_text(" ", strip=True)
            else:
                text = re.sub(r"<[^>]+>", " ", resp.text)
                text = html.unescape(text)
            return cls._clean_text(text)[:800]
        except Exception:
            return ""

    @classmethod
    def _synthesise(cls, query: str, results: dict) -> str:
        if not results:
            return ""
        q_words = set(re.sub(r"[^\w\s]", "", query).lower().split())
        def score(text: str) -> float:
            words = set(re.sub(r"[^\w\s]", "", text).lower().split())
            coverage = len(q_words & words) / max(1, len(q_words))
            length   = min(1.0, len(text) / 500)
            return 0.6 * coverage + 0.4 * length
        scored = sorted(results.items(), key=lambda kv: score(kv[1]), reverse=True)
        best_name, best_text = scored[0]
        best_text = cls._trim_to_sentences(best_text, max_chars=500)
        if best_name != "wiki" and "wiki" in results:
            wiki_intro = cls._trim_to_sentences(results["wiki"], max_chars=200)
            if wiki_intro and wiki_intro not in best_text:
                best_text = wiki_intro + "  " + best_text
        return cls._clean_text(best_text)

    @staticmethod
    def _clean_text(text: str) -> str:
        text = html.unescape(text)
        text = re.sub(r"\s+", " ", text)
        text = re.sub(r"[^\x20-\x7e\u00a0-\u024f\u2000-\u206f]", "", text)
        return text.strip()

    @staticmethod
    def _trim_to_sentences(text: str, max_chars: int = 500) -> str:
        if len(text) <= max_chars:
            return text
        sentences = re.split(r'(?<=[.!?])\s+', text)
        out = []
        total = 0
        for s in sentences:
            if total + len(s) > max_chars and out:
                break
            out.append(s)
            total += len(s) + 1
        return " ".join(out) if out else text[:max_chars]

# ═══════════════════════════════════════════════════════════════
#  FACE / BODY PROFILE DATA STRUCTURES (unchanged)
# ═══════════════════════════════════════════════════════════════
FACE_PARTS = [
    {"key": "face_shape", "icon": "🔷", "label": "Face Shape",  "field": "face_shape",      "desc": "Overall face shape"},
    {"key": "skin",       "icon": "🧴", "label": "Skin",        "field": "skin_tone",       "desc": "Skin tone & texture"},
    {"key": "jawline",    "icon": "🦷", "label": "Jawline",     "field": "jawline_shape",   "desc": "Jaw shape & definition"},
    {"key": "eyes",       "icon": "👁",  "label": "Eyes",        "field": "eye_structure",   "desc": "Eye shape & size"},
    {"key": "nose",       "icon": "👃", "label": "Nose",        "field": "nose_structure",  "desc": "Nose shape & size"},
    {"key": "hair",       "icon": "💈", "label": "Hair",        "field": "hair_type",       "desc": "Hair texture & style"},
    {"key": "eyebrows",   "icon": "〰",  "label": "Eyebrows",    "field": "eyebrow_shape",   "desc": "Brow shape & thickness"},
    {"key": "eyelashes",  "icon": "✨", "label": "Eyelashes",   "field": "eyelash_density", "desc": "Lash density & curl"},
    {"key": "chin",       "icon": "🫦", "label": "Chin",        "field": "chin_shape",      "desc": "Chin shape & projection"},
]
FACE_DATA_FILE = "face_profile.json"

def _blank_face_profile():
    p = {"timestamp": None}
    for part in FACE_PARTS:
        p[part["field"]] = ""
    return p

def load_face_profile():
    if not os.path.exists(FACE_DATA_FILE):
        return _blank_face_profile()
    try:
        with open(FACE_DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        for part in FACE_PARTS:
            data.setdefault(part["field"], "")
        return data
    except Exception:
        return _blank_face_profile()

def save_face_profile(profile):
    try:
        with open(FACE_DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(profile, f, indent=2, ensure_ascii=False)
        return True
    except Exception:
        return False

BODY_PARTS = [
    {"key": "neck",      "icon": "🦒", "label": "Neck",      "desc": "Neck thickness"},
    {"key": "shoulders", "icon": "🏋️", "label": "Shoulders", "desc": "Shoulder width"},
    {"key": "chest",     "icon": "💪", "label": "Chest",     "desc": "Chest definition"},
    {"key": "abs",       "icon": "🫃", "label": "Abs",       "desc": "Abdominal tone"},
    {"key": "waist",     "icon": "📏", "label": "Waist",     "desc": "Waist circumference"},
    {"key": "hips",      "icon": "🦵", "label": "Hips",      "desc": "Hip width"},
    {"key": "biceps",    "icon": "💪", "label": "Biceps",    "desc": "Bicep size"},
    {"key": "triceps",   "icon": "💪", "label": "Triceps",   "desc": "Triceps development"},
    {"key": "fists",     "icon": "✊", "label": "Fists",     "desc": "Grip strength"},
    {"key": "forearms",  "icon": "🖐️", "label": "Forearms",  "desc": "Forearm definition"},
    {"key": "back",      "icon": "🔙", "label": "Back",      "desc": "Back V-taper"},
    {"key": "legs",      "icon": "🦵", "label": "Legs",      "desc": "Leg muscle mass"},
    {"key": "calves",    "icon": "🦶", "label": "Calves",    "desc": "Calf shape"},
]
BODY_DATA_FILE = "body_profile.json"

def _blank_body_profile():
    p = {"timestamp": None}
    for part in BODY_PARTS:
        p[part["key"]] = ""
    return p

def load_body_profile():
    if not os.path.exists(BODY_DATA_FILE):
        return _blank_body_profile()
    try:
        with open(BODY_DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        for part in BODY_PARTS:
            data.setdefault(part["key"], "")
        return data
    except Exception:
        return _blank_body_profile()

def save_body_profile(profile):
    try:
        with open(BODY_DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(profile, f, indent=2, ensure_ascii=False)
        return True
    except Exception:
        return False

GOALS_FILE = "goals.json"
GOAL_TIMEFRAMES = ["Day","Week","Month","Year1","Year2","Year3","Year4","Year5",
                   "Year6","Year7","Year8","Year9","Year10"]

def _blank_goals():
    return {tf: [] for tf in GOAL_TIMEFRAMES}

def load_goals():
    if not os.path.exists(GOALS_FILE):
        return _blank_goals()
    try:
        with open(GOALS_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        for tf in GOAL_TIMEFRAMES:
            data.setdefault(tf, [])
        return data
    except Exception:
        return _blank_goals()

def save_goals(goals):
    try:
        with open(GOALS_FILE, "w", encoding="utf-8") as f:
            json.dump(goals, f, indent=2, ensure_ascii=False)
        return True
    except Exception:
        return False

TODO_FILE = "todo_list.json"
DEFAULT_TODO = []

def load_todo():
    if not os.path.exists(TODO_FILE):
        return DEFAULT_TODO.copy()
    try:
        with open(TODO_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            # Convert old string list to object list
            if data and isinstance(data[0], str):
                return [{"text": t, "done": False} for t in data]
            return data
    except Exception:
        return DEFAULT_TODO.copy()

def save_todo(tasks):
    try:
        with open(TODO_FILE, "w", encoding="utf-8") as f:
            json.dump(tasks, f, indent=2)
        return True
    except Exception:
        return False

SCHEDULE_FILE = "weekly_schedule.json"
DEFAULT_SCHEDULE = {d: [] for d in ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]}

def load_schedule():
    if not os.path.exists(SCHEDULE_FILE):
        return DEFAULT_SCHEDULE.copy()
    try:
        with open(SCHEDULE_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        for day in DEFAULT_SCHEDULE:
            data.setdefault(day, [])
        return data
    except Exception:
        return DEFAULT_SCHEDULE.copy()

def save_schedule(schedule):
    try:
        with open(SCHEDULE_FILE, "w", encoding="utf-8") as f:
            json.dump(schedule, f, indent=2)
        return True
    except Exception:
        return False

PROGRESS_FILE = "progress_history.json"

def _blank_progress():
    return {"current_rank": "E", "last_year_rank": "E", "last_update": None}

def load_progress():
    if not os.path.exists(PROGRESS_FILE):
        return _blank_progress()
    try:
        with open(PROGRESS_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        data.setdefault("current_rank", "E")
        data.setdefault("last_year_rank", "E")
        return data
    except Exception:
        return _blank_progress()

def save_progress(progress):
    try:
        with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
            json.dump(progress, f, indent=2)
        return True
    except Exception:
        return False

class ProgressRank:
    RANKS = ["E","D","C","B","A","S","SS","SSS"]
    THRESHOLDS = [0,40,50,60,70,80,90,95]

    @classmethod
    def calculate(cls, face_profile, body_profile, goals, todo_tasks, weekly_schedule):
        tf = len(face_profile)
        ff = sum(1 for k,v in face_profile.items() if k!="timestamp" and v and v!="Undetected")
        looks = ff/tf if tf > 0 else 0
        tb = len(body_profile)
        fb = sum(1 for k,v in body_profile.items() if k!="timestamp" and v and v!="Undetected")
        physique = fb/tb if tb > 0 else 0
        tg = cg = 0
        for tf2,tasks in goals.items():
            for task in tasks:
                if isinstance(task,dict) and task.get("text","").strip():
                    tg += 1
                    if task.get("done",False): cg += 1
                elif isinstance(task,str) and task.strip():
                    tg += 1
        goals_s = cg/tg if tg > 0 else 0
        tt = len(todo_tasks)
        ct = sum(1 for t in todo_tasks if isinstance(t,dict) and t.get("done",False))
        todo_s = ct/tt if tt > 0 else 0
        tt2 = ct2 = 0
        for day,tasks in weekly_schedule.items():
            for task in tasks:
                if isinstance(task,dict) and task.get("text","").strip():
                    tt2 += 1
                    if task.get("done",False): ct2 += 1
                elif isinstance(task,str) and task.strip():
                    tt2 += 1
        tm_s = ct2/tt2 if tt2 > 0 else 0
        overall = (looks+physique+goals_s+todo_s+tm_s)/5*100
        rank = "E"
        for i,thresh in enumerate(cls.THRESHOLDS):
            if overall >= thresh: rank = cls.RANKS[i]
        return rank, overall

    @classmethod
    def update_and_save(cls, face_profile, body_profile, goals, todo_tasks, weekly_schedule):
        new_rank, score = cls.calculate(face_profile, body_profile, goals, todo_tasks, weekly_schedule)
        progress = load_progress()
        now = datetime.now()
        last_update = progress.get("last_update")
        if last_update:
            try:
                last_date = datetime.fromisoformat(last_update)
                if now.year > last_date.year:
                    progress["last_year_rank"] = progress.get("current_rank","E")
            except:
                pass
        progress["current_rank"] = new_rank
        progress["last_update"] = now.isoformat()
        progress.setdefault("last_year_rank", "E")
        save_progress(progress)
        return new_rank, progress["last_year_rank"], score

# ═══════════════════════════════════════════════════════════════
#  FACE / BODY SCANNERS (unchanged)
# ═══════════════════════════════════════════════════════════════
mp_face_mesh = mp.solutions.face_mesh
mp_pose = mp.solutions.pose

class FaceScanner:
    @staticmethod
    def scan():
        cap = cv2.VideoCapture(0)
        if not cap.isOpened(): return None
        cv2.namedWindow("Player AI — Face Scan (3 shots)", cv2.WINDOW_NORMAL)
        cv2.resizeWindow("Player AI — Face Scan (3 shots)", 640, 480)
        frames = []
        for shot in range(3):
            for countdown in range(3, 0, -1):
                ret, frame = cap.read()
                if not ret: continue
                d = frame.copy()
                cv2.putText(d, f"Shot {shot+1}/3 — {countdown}s", (40,80),
                            cv2.FONT_HERSHEY_SIMPLEX, 1.2, (100,220,255), 2)
                cv2.imshow("Player AI — Face Scan (3 shots)", d)
                cv2.waitKey(1000)
            ret, frame = cap.read()
            if ret:
                frames.append(frame)
                cv2.imshow("Player AI — Face Scan (3 shots)", frame)
                cv2.waitKey(400)
        cap.release(); cv2.destroyAllWindows()
        if not frames: return None
        return FaceScanner._analyse(frames[len(frames)//2])

    @staticmethod
    def _analyse(image):
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        h, w, _ = image.shape
        profile = _blank_face_profile()
        profile["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1,
                                   refine_landmarks=True, min_detection_confidence=0.5) as fm:
            results = fm.process(rgb)
        if not results.multi_face_landmarks:
            for part in FACE_PARTS: profile[part["field"]] = "Undetected"
            return profile
        lm = results.multi_face_landmarks[0].landmark
        def pt(idx): return int(lm[idx].x*w), int(lm[idx].y*h)
        chin_pt = pt(152); left_jaw = pt(234); right_jaw = pt(454)
        jaw_w = abs(right_jaw[0]-left_jaw[0])
        jaw_h = abs(chin_pt[1]-((left_jaw[1]+right_jaw[1])//2))
        jr = jaw_w/max(1,jaw_h)
        if jr > 1.3: profile["face_shape"] = "Rectangle / Square"
        elif jr > 1.1: profile["face_shape"] = "Oval"
        elif jr > 0.9: profile["face_shape"] = "Round"
        else: profile["face_shape"] = "Diamond / Heart"
        cx2,cy2=pt(50); cx2=max(5,min(w-6,cx2)); cy2=max(5,min(h-6,cy2))
        patch=image[cy2-5:cy2+5, cx2-5:cx2+5]
        if patch.size>0:
            b,g,r=patch.mean(axis=(0,1))[:3]
            br=(r+g+b)/3
            tone=("Very Fair" if br>200 else "Fair" if br>170 else "Medium" if br>140
                  else "Olive / Tan" if br>100 else "Brown" if br>70 else "Dark Brown")
            profile["skin_tone"]=tone
        profile["jawline_shape"] = ("Wide / Square" if jr>1.4 else "Rounded" if jr>1.1
                                    else "Narrow / Oval" if jr<0.9 else "Defined Square")
        lew=abs(pt(33)[0]-pt(133)[0]); rew=abs(pt(362)[0]-pt(263)[0])
        ew=(lew+rew)/2
        profile["eye_structure"]=("Almond / Small" if ew<28 else "Large / Wide" if ew>=45 else "Round / Medium")
        nt=pt(1); nb=pt(168); nl=pt(129); nr=pt(358)
        nr_v=abs(nr[0]-nl[0])/max(1,abs(nt[1]-nb[1]))
        profile["nose_structure"]=("Broad / Button" if nr_v>0.7 else "Narrow / Pointed" if nr_v<0.4 else "Straight / Medium")
        top=image[:h//3,:]; gt=cv2.cvtColor(top,cv2.COLOR_BGR2GRAY)
        ed=np.sum(cv2.Canny(gt,40,120)>0)/max(1,gt.size)
        profile["hair_type"]=("Curly / Thick" if ed>0.18 else "Wavy / Medium" if ed>0.09
                              else "Straight / Fine" if ed>0.03 else "Short / Bald")
        try:
            li=pt(70); lo=pt(46); lp=pt(63)
            bw=abs(lo[0]-li[0]); arch=abs(lp[1]-((li[1]+lo[1])//2))
            ar=arch/max(1,bw)
            profile["eyebrow_shape"]=("High Arch" if ar>0.25 else "Soft Arch" if ar>0.12 else "Flat / Straight")
        except: profile["eyebrow_shape"]="Natural"
        lx,ly=pt(159); ly=max(0,ly-8)
        lp=image[max(0,ly-4):ly+4, max(0,lx-15):lx+15]
        if lp.size>0:
            lg=cv2.cvtColor(lp,cv2.COLOR_BGR2GRAY) if lp.ndim==3 else lp
            dp=np.sum(lg<60)
            profile["eyelash_density"]=("Dense / Dark" if dp>40 else "Medium" if dp>15 else "Light / Sparse")
        else: profile["eyelash_density"]="Natural"
        ch=abs(chin_pt[1]-((left_jaw[1]+right_jaw[1])//2))
        profile["chin_shape"]=("Short / Soft" if ch<20 else "Prominent / Long" if ch>=40 else "Average")
        return profile

class BodyScanner:
    @staticmethod
    def scan():
        cap = cv2.VideoCapture(0)
        if not cap.isOpened(): return None
        cv2.namedWindow("Player AI — Body Scan (3 shots)", cv2.WINDOW_NORMAL)
        cv2.resizeWindow("Player AI — Body Scan (3 shots)", 640, 480)
        frames = []
        with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
            for shot in range(3):
                for countdown in range(3,0,-1):
                    ret,frame=cap.read()
                    if not ret: continue
                    d=frame.copy()
                    cv2.putText(d,f"Shot {shot+1}/3 — {countdown}s",(40,80),cv2.FONT_HERSHEY_SIMPLEX,1.2,(100,220,255),2)
                    cv2.imshow("Player AI — Body Scan (3 shots)",d); cv2.waitKey(1000)
                ret,frame=cap.read()
                if ret:
                    frames.append(frame)
                    cv2.imshow("Player AI — Body Scan (3 shots)",frame); cv2.waitKey(400)
        cap.release(); cv2.destroyAllWindows()
        if not frames: return None
        return BodyScanner._analyse(frames[len(frames)//2])

    @staticmethod
    def _analyse(image):
        rgb=cv2.cvtColor(image,cv2.COLOR_BGR2RGB); h,w,_=image.shape
        profile=_blank_body_profile(); profile["timestamp"]=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with mp_pose.Pose(static_image_mode=True,min_detection_confidence=0.5) as pose:
            results=pose.process(rgb)
        if not results.pose_landmarks:
            for part in BODY_PARTS: profile[part["key"]]="Undetected"
            return profile
        lm=results.pose_landmarks.landmark
        def pt(idx): return int(lm[idx].x*w),int(lm[idx].y*h)
        ls=pt(mp_pose.PoseLandmark.LEFT_SHOULDER); rs=pt(mp_pose.PoseLandmark.RIGHT_SHOULDER)
        lh=pt(mp_pose.PoseLandmark.LEFT_HIP);      rh=pt(mp_pose.PoseLandmark.RIGHT_HIP)
        no=pt(mp_pose.PoseLandmark.NOSE);           la=pt(mp_pose.PoseLandmark.LEFT_ANKLE)
        lk=pt(mp_pose.PoseLandmark.LEFT_KNEE);      rk=pt(mp_pose.PoseLandmark.RIGHT_KNEE)
        sw=abs(rs[0]-ls[0]); hw=abs(rh[0]-lh[0]); ht=abs(la[1]-no[1])
        nw=sw*0.4
        profile["neck"]=("Thick / Muscular" if nw>w*0.15 else "Slender" if nw<=w*0.1 else "Average")
        profile["shoulders"]=("Very Broad" if sw>w*0.45 else "Broad" if sw>w*0.35 else "Narrow" if sw<=w*0.25 else "Average")
        r=sw/max(1,hw)
        profile["chest"]=("V-Shape / Defined" if r>1.4 else "Athletic" if r>1.2 else "Narrow" if r<=1.0 else "Average")
        tl=abs(lh[1]-no[1])
        profile["abs"]=("Compact / Defined" if tl<h*0.25 else "Long / Lean" if tl>=h*0.35 else "Average")
        profile["waist"]=("Slim" if hw<w*0.2 else "Wide" if hw>=w*0.3 else "Average")
        profile["hips"]=("Wide" if hw>w*0.35 else "Narrow" if hw<=w*0.25 else "Average")
        for k in ["biceps","triceps","fists","forearms"]: profile[k]="Average"
        profile["back"]=("Wide / V-Taper" if sw/max(1,ht)>0.45 else "Narrow" if sw/max(1,ht)<=0.35 else "Average")
        kw=abs(rk[0]-lk[0])
        profile["legs"]=("Muscular / Thick" if kw>w*0.3 else "Slim" if kw<=w*0.2 else "Average")
        cl=abs(la[1]-lk[1])
        profile["calves"]=("Well developed" if cl>h*0.2 else "Average")
        return profile

# ═══════════════════════════════════════════════════════════════
#  EDITORS (Face, Body, Goal, Todo, Schedule)
#  Upgraded TodoEditor to support checkboxes.
# ═══════════════════════════════════════════════════════════════
class FaceProfileEditor(tk.Toplevel):
    def __init__(self,parent,profile,on_save=None,on_scan=None):
        super().__init__(parent); self.title("Face Profile — Looks")
        self.configure(bg=FP_BG); self.resizable(False,False)
        self._profile=dict(profile); self._on_save=on_save; self._on_scan=on_scan; self._vars={}
        self._build(); self.grab_set(); self.lift()

    def _build(self):
        W=520
        tk.Frame(self,bg=FP_ACCENT,height=4).pack(fill="x")
        tr=tk.Frame(self,bg=FP_BG); tr.pack(fill="x",padx=18,pady=(14,6))
        tk.Label(tr,text="👤  Face Profile",font=("Consolas",14,"bold"),fg=FP_ACCENT,bg=FP_BG).pack(side="left")
        tk.Label(tr,text=f"Last scan: {self._profile.get('timestamp') or 'Not scanned yet'}",
                 font=F_SMALL,fg=FP_MUTED,bg=FP_BG).pack(side="right")
        tk.Frame(self,bg=FP_BORDER,height=1).pack(fill="x",padx=12)
        tk.Label(self,text="Hover a row to highlight it. Click the value to edit manually.",
                 font=F_SMALL,fg=FP_MUTED,bg=FP_BG).pack(anchor="w",padx=18,pady=(8,4))
        rf=tk.Frame(self,bg=FP_BG); rf.pack(fill="both",padx=12,pady=(0,8))
        for part in FACE_PARTS:
            var=tk.StringVar(value=self._profile.get(part["field"],""))
            self._vars[part["field"]]=var; self._make_row(rf,part,var)
        tk.Frame(self,bg=FP_BORDER,height=1).pack(fill="x",padx=12)
        br=tk.Frame(self,bg=FP_BG); br.pack(fill="x",padx=18,pady=12)
        tk.Button(br,text="📷  Scan Face Now",bg=FP_ACCENT,fg="white",font=("Segoe UI",10,"bold"),
                  relief="flat",padx=14,pady=7,cursor="hand2",command=self._do_scan).pack(side="left")
        tk.Button(br,text="💾  Save",bg="#2a7a2a",fg="white",font=F_SMALL,relief="flat",padx=14,pady=7,
                  cursor="hand2",command=self._do_save).pack(side="left",padx=(10,0))
        tk.Button(br,text="✕  Cancel",bg=BTN_BG_DARK,fg=FP_MUTED,font=F_SMALL,relief="flat",padx=14,pady=7,
                  cursor="hand2",command=self.destroy).pack(side="right")
        self.update_idletasks(); self.geometry(f"{W}x{self.winfo_reqheight()}")

    def _make_row(self,parent,part,var):
        row=tk.Frame(parent,bg=FP_ROW,pady=3); row.pack(fill="x",pady=2); row.grid_columnconfigure(2,weight=1)
        tk.Label(row,text=part["icon"],font=("Segoe UI",13),bg=FP_ROW,fg=FP_TEXT,width=3).grid(row=0,column=0,padx=(8,4))
        tk.Label(row,text=part["label"],font=("Segoe UI",10,"bold"),bg=FP_ROW,fg=FP_TEXT,width=10,anchor="w").grid(row=0,column=1,padx=(0,8))
        is_blank=var.get()==""
        entry=tk.Entry(row,textvariable=var,font=F_SMALL,bg=FP_HOVER,fg=FP_BLANK if is_blank else FP_TEXT,
                       insertbackground=FP_ACCENT,relief="flat",bd=0)
        entry.grid(row=0,column=2,sticky="ew",padx=(0,8),ipady=4)
        if is_blank: entry.insert(0,"—  not set  —")
        def fi(e):
            if entry.get()=="—  not set  —": entry.delete(0,tk.END); entry.config(fg=FP_TEXT)
        def fo(e):
            if not entry.get().strip(): var.set(""); entry.delete(0,tk.END); entry.insert(0,"—  not set  —"); entry.config(fg=FP_BLANK)
        entry.bind("<FocusIn>",fi); entry.bind("<FocusOut>",fo)
        def oe(e):
            row.config(bg=FP_HOVER)
            for w in row.winfo_children():
                try: w.config(bg=FP_HOVER)
                except: pass
        def ol(e):
            row.config(bg=FP_ROW)
            for w in row.winfo_children():
                try: w.config(bg=FP_ROW)
                except: pass
        row.bind("<Enter>",oe); row.bind("<Leave>",ol)
        for ch in row.winfo_children(): ch.bind("<Enter>",oe); ch.bind("<Leave>",ol)

    def _collect(self):
        for part in FACE_PARTS:
            v=self._vars[part["field"]].get().strip()
            self._profile[part["field"]]="" if v=="—  not set  —" else v

    def _do_save(self):
        self._collect()
        if self._on_save: self._on_save(self._profile)
        self.destroy()

    def _do_scan(self):
        self.withdraw(); self.after(200,self._run_scan)

    def _run_scan(self):
        if self._on_scan:
            new=self._on_scan()
            if new:
                self._profile=new
                for part in FACE_PARTS: self._vars[part["field"]].set(new.get(part["field"],""))
                messagebox.showinfo("Scan Complete","Face scan done! Review & Save.",parent=self)
            else:
                messagebox.showerror("Scan Failed","Could not detect face.",parent=self)
        self.deiconify(); self.lift()

class BodyProfileEditor(tk.Toplevel):
    def __init__(self,parent,profile,on_save=None,on_scan=None):
        super().__init__(parent); self.title("Body Profile — Physique")
        self.configure(bg=FP_BG); self.resizable(False,False)
        self._profile=dict(profile); self._on_save=on_save; self._on_scan=on_scan; self._vars={}
        self._build(); self.grab_set(); self.lift()

    def _build(self):
        W=560
        tk.Frame(self,bg=FP_ACCENT,height=4).pack(fill="x")
        tr=tk.Frame(self,bg=FP_BG); tr.pack(fill="x",padx=18,pady=(14,6))
        tk.Label(tr,text="🏋️  Body Profile",font=("Consolas",14,"bold"),fg=FP_ACCENT,bg=FP_BG).pack(side="left")
        tk.Label(tr,text=f"Last scan: {self._profile.get('timestamp') or 'Not scanned yet'}",
                 font=F_SMALL,fg=FP_MUTED,bg=FP_BG).pack(side="right")
        tk.Frame(self,bg=FP_BORDER,height=1).pack(fill="x",padx=12)
        tk.Label(self,text="Hover a row to highlight it. Click to edit.",
                 font=F_SMALL,fg=FP_MUTED,bg=FP_BG).pack(anchor="w",padx=18,pady=(8,4))

        scroll_area=tk.Frame(self,bg=FP_BG)
        scroll_area.pack(fill="both",expand=True,padx=12,pady=(0,4))
        canvas=tk.Canvas(scroll_area,bg=FP_BG,highlightthickness=0)
        sb=tk.Scrollbar(scroll_area,orient="vertical",command=canvas.yview)
        sf=tk.Frame(canvas,bg=FP_BG)
        sf.bind("<Configure>",lambda e:canvas.configure(scrollregion=canvas.bbox("all")))
        canvas.create_window((0,0),window=sf,anchor="nw"); canvas.configure(yscrollcommand=sb.set)
        canvas.pack(side="left",fill="both",expand=True); sb.pack(side="right",fill="y")

        for part in BODY_PARTS:
            var=tk.StringVar(value=self._profile.get(part["key"],""))
            self._vars[part["key"]]=var; self._make_row(sf,part,var)

        tk.Frame(self,bg=FP_BORDER,height=1).pack(fill="x",padx=12)
        br=tk.Frame(self,bg=FP_BG); br.pack(fill="x",padx=18,pady=12)
        tk.Button(br,text="📷  Scan Body Now",bg=FP_ACCENT,fg="white",font=("Segoe UI",10,"bold"),
                  relief="flat",padx=14,pady=7,cursor="hand2",command=self._do_scan).pack(side="left")
        tk.Button(br,text="💾  Save",bg="#2a7a2a",fg="white",font=F_SMALL,relief="flat",padx=14,pady=7,
                  cursor="hand2",command=self._do_save).pack(side="left",padx=(10,0))
        tk.Button(br,text="✕  Cancel",bg=BTN_BG_DARK,fg=FP_MUTED,font=F_SMALL,relief="flat",padx=14,pady=7,
                  cursor="hand2",command=self.destroy).pack(side="right")
        self.update_idletasks(); self.geometry(f"{W}x600")

    def _make_row(self,parent,part,var):
        row=tk.Frame(parent,bg=FP_ROW,pady=3); row.pack(fill="x",pady=2); row.grid_columnconfigure(2,weight=1)
        tk.Label(row,text=part["icon"],font=("Segoe UI",13),bg=FP_ROW,fg=FP_TEXT,width=3).grid(row=0,column=0,padx=(8,4))
        tk.Label(row,text=part["label"],font=("Segoe UI",10,"bold"),bg=FP_ROW,fg=FP_TEXT,width=10,anchor="w").grid(row=0,column=1,padx=(0,8))
        is_blank=var.get()==""
        entry=tk.Entry(row,textvariable=var,font=F_SMALL,bg=FP_HOVER,fg=FP_BLANK if is_blank else FP_TEXT,
                       insertbackground=FP_ACCENT,relief="flat",bd=0)
        entry.grid(row=0,column=2,sticky="ew",padx=(0,8),ipady=4)
        if is_blank: entry.insert(0,"—  not set  —")
        def fi(e):
            if entry.get()=="—  not set  —": entry.delete(0,tk.END); entry.config(fg=FP_TEXT)
        def fo(e):
            if not entry.get().strip(): var.set(""); entry.delete(0,tk.END); entry.insert(0,"—  not set  —"); entry.config(fg=FP_BLANK)
        entry.bind("<FocusIn>",fi); entry.bind("<FocusOut>",fo)
        def oe(e):
            row.config(bg=FP_HOVER)
            for w in row.winfo_children():
                try: w.config(bg=FP_HOVER)
                except: pass
        def ol(e):
            row.config(bg=FP_ROW)
            for w in row.winfo_children():
                try: w.config(bg=FP_ROW)
                except: pass
        row.bind("<Enter>",oe); row.bind("<Leave>",ol)
        for ch in row.winfo_children(): ch.bind("<Enter>",oe); ch.bind("<Leave>",ol)

    def _collect(self):
        for part in BODY_PARTS:
            v=self._vars[part["key"]].get().strip()
            self._profile[part["key"]]="" if v=="—  not set  —" else v

    def _do_save(self):
        self._collect()
        if self._on_save: self._on_save(self._profile)
        self.destroy()

    def _do_scan(self):
        self.withdraw(); self.after(200,self._run_scan)

    def _run_scan(self):
        if self._on_scan:
            new=self._on_scan()
            if new:
                self._profile=new
                for part in BODY_PARTS: self._vars[part["key"]].set(new.get(part["key"],""))
                messagebox.showinfo("Scan Complete","Body scan done! Review & Save.",parent=self)
            else:
                messagebox.showerror("Scan Failed","Could not detect body pose.",parent=self)
        self.deiconify(); self.lift()

class GoalEditor(tk.Toplevel):
    def __init__(self,parent,goals,on_save=None):
        super().__init__(parent); self.title("Goal Setting — Action Plan")
        self.geometry("900x700"); self.configure(bg=FP_BG); self.resizable(True,True)
        self._goals=goals; self._on_save=on_save; self._task_vars={}; self._build()
        self.grab_set(); self.lift()

    def _build(self):
        canvas=tk.Canvas(self,bg=FP_BG,highlightthickness=0)
        sb=tk.Scrollbar(self,orient="vertical",command=canvas.yview)
        sf=tk.Frame(canvas,bg=FP_BG)
        sf.bind("<Configure>",lambda e:canvas.configure(scrollregion=canvas.bbox("all")))
        canvas.create_window((0,0),window=sf,anchor="nw"); canvas.configure(yscrollcommand=sb.set)
        canvas.pack(side="left",fill="both",expand=True); sb.pack(side="right",fill="y")
        names={"Day":"Day (Today)","Week":"Week (This Week)","Month":"Month (This Month)",
               **{f"Year{i}":f"Year {i}" for i in range(1,11)}}
        for tf in GOAL_TIMEFRAMES:
            frame=tk.LabelFrame(sf,text=names.get(tf,tf),bg=FP_BG,fg=ACCENT,font=("Segoe UI",10,"bold"),padx=10,pady=5)
            frame.pack(fill="x",padx=10,pady=5)
            tasks=self._goals.get(tf,[]); self._task_vars[tf]=[]
            if not isinstance(tasks,list): tasks=[]
            for task in tasks:
                text=(task.get("text","") if isinstance(task,dict) else str(task))
                done=(task.get("done",False) if isinstance(task,dict) else False)
                self._add_task_row(frame,tf,text,done)
            tk.Button(frame,text="+ Add Goal",command=lambda t=tf,f=frame:self._add_task_row(f,t,"",False),
                      bg=ACCENT,fg="white",relief="flat",padx=5,pady=2).pack(pady=5)
        bf=tk.Frame(sf,bg=FP_BG); bf.pack(pady=20)
        tk.Button(bf,text="Save",command=self._do_save,bg=ACCENT,fg="white",relief="flat",padx=15,pady=5).pack(side="left",padx=5)
        tk.Button(bf,text="Cancel",command=self.destroy,bg="#555",fg="white",relief="flat",padx=15,pady=5).pack(side="left",padx=5)

    def _add_task_row(self,parent,tf,text,done):
        row=tk.Frame(parent,bg=FP_BG); row.pack(fill="x",pady=2)
        dv=tk.BooleanVar(value=done)
        tk.Checkbutton(row,variable=dv,bg=FP_BG,fg=ACCENT,selectcolor=FP_BG,activebackground=FP_BG).pack(side="left")
        entry=tk.Entry(row,bg="#333",fg="white",font=F_SMALL,relief="flat"); entry.insert(0,text)
        entry.pack(side="left",fill="x",expand=True,padx=5)
        def delete():
            row.destroy(); self._task_vars[tf].remove((entry,dv,row))
        tk.Button(row,text="✖",command=delete,bg="#d32f2f",fg="white",relief="flat",font=("Segoe UI",8)).pack(side="right",padx=2)
        self._task_vars[tf].append((entry,dv,row))

    def _do_save(self):
        ng={}
        for tf,entries in self._task_vars.items():
            tasks=[{"text":e.get().strip(),"done":d.get()} for e,d,_ in entries if e.get().strip()]
            ng[tf]=tasks
        if self._on_save: self._on_save(ng)
        self.destroy()

# Upgraded TodoEditor with checkboxes and object storage
class TodoEditor(tk.Toplevel):
    def __init__(self,parent,tasks,on_save=None):
        super().__init__(parent); self.title("To Do List")
        self.geometry("400x500"); self.configure(bg=FP_BG); self.resizable(False,False)
        self._tasks = [t.copy() if isinstance(t,dict) else {"text": t, "done": False} for t in tasks]
        self._on_save = on_save
        self._task_widgets = []  # list of (frame, entry, var)
        self._build()
        self.grab_set(); self.lift()

    def _build(self):
        main = tk.Frame(self, bg=FP_BG)
        main.pack(fill="both", expand=True, padx=10, pady=10)

        canvas = tk.Canvas(main, bg=FP_BG, highlightthickness=0)
        sb = tk.Scrollbar(main, orient="vertical", command=canvas.yview)
        self.scrollable = tk.Frame(canvas, bg=FP_BG)
        self.scrollable.bind("<Configure>", lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
        canvas.create_window((0,0), window=self.scrollable, anchor="nw")
        canvas.configure(yscrollcommand=sb.set)
        canvas.pack(side="left", fill="both", expand=True)
        sb.pack(side="right", fill="y")

        self._refresh_list()
        # Add new task row
        add_frame = tk.Frame(self, bg=FP_BG)
        add_frame.pack(fill="x", padx=10, pady=5)
        self.new_entry = tk.Entry(add_frame, bg="#333", fg="white", font=F_SMALL, relief="flat")
        self.new_entry.pack(side="left", fill="x", expand=True, padx=(0,5))
        tk.Button(add_frame, text="+ Add", command=self._add_task, bg=ACCENT, fg="white", relief="flat", padx=10).pack(side="right")

        btn_frame = tk.Frame(self, bg=FP_BG)
        btn_frame.pack(fill="x", padx=10, pady=10)
        tk.Button(btn_frame, text="Save", command=self._do_save, bg=ACCENT, fg="white", relief="flat", padx=15, pady=5).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Cancel", command=self.destroy, bg="#555", fg="white", relief="flat", padx=15, pady=5).pack(side="left", padx=5)

    def _refresh_list(self):
        for w in self._task_widgets:
            w[0].destroy()
        self._task_widgets.clear()
        for idx, task in enumerate(self._tasks):
            text = task.get("text", "") if isinstance(task, dict) else task
            done = task.get("done", False) if isinstance(task, dict) else False
            row = tk.Frame(self.scrollable, bg=FP_BG, pady=2)
            row.pack(fill="x", pady=2)
            var = tk.BooleanVar(value=done)
            chk = tk.Checkbutton(row, variable=var, bg=FP_BG, fg=ACCENT, selectcolor=FP_BG, activebackground=FP_BG)
            chk.pack(side="left")
            entry = tk.Entry(row, bg="#333", fg="white", font=F_SMALL, relief="flat")
            entry.insert(0, text)
            entry.pack(side="left", fill="x", expand=True, padx=5)
            def delete(i=idx):
                self._tasks.pop(i)
                self._refresh_list()
            tk.Button(row, text="✖", command=delete, bg="#d32f2f", fg="white", relief="flat", font=("Segoe UI",8)).pack(side="right", padx=2)
            self._task_widgets.append((row, entry, var, idx))

    def _add_task(self):
        new_text = self.new_entry.get().strip()
        if new_text:
            self._tasks.append({"text": new_text, "done": False})
            self._refresh_list()
            self.new_entry.delete(0, tk.END)

    def _do_save(self):
        new_tasks = []
        for idx, task in enumerate(self._tasks):
            row, entry, var, _ = self._task_widgets[idx]
            text = entry.get().strip()
            if text:
                new_tasks.append({"text": text, "done": var.get()})
        if self._on_save:
            self._on_save(new_tasks)
        self.destroy()

class ScheduleEditor(tk.Toplevel):
    def __init__(self,parent,schedule,on_save=None):
        super().__init__(parent); self.title("Weekly Schedule — Time Management")
        self.geometry("900x600"); self.configure(bg=FP_BG); self.resizable(True,True)
        self._schedule=schedule; self._on_save=on_save; self._task_vars={}; self._build()
        self.grab_set(); self.lift()

    def _build(self):
        canvas=tk.Canvas(self,bg=FP_BG,highlightthickness=0)
        sb=tk.Scrollbar(self,orient="vertical",command=canvas.yview)
        sf=tk.Frame(canvas,bg=FP_BG)
        sf.bind("<Configure>",lambda e:canvas.configure(scrollregion=canvas.bbox("all")))
        canvas.create_window((0,0),window=sf,anchor="nw"); canvas.configure(yscrollcommand=sb.set)
        canvas.pack(side="left",fill="both",expand=True); sb.pack(side="right",fill="y")
        for day in ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]:
            frame=tk.LabelFrame(sf,text=day,bg=FP_BG,fg=ACCENT,font=("Segoe UI",10,"bold"),padx=10,pady=5)
            frame.pack(fill="x",padx=10,pady=5)
            tasks=self._schedule.get(day,[]); self._task_vars[day]=[]
            if not isinstance(tasks,list): tasks=[]
            for task in tasks:
                text=(task.get("text","") if isinstance(task,dict) else str(task))
                done=(task.get("done",False) if isinstance(task,dict) else False)
                self._add_task_row(frame,day,text,done)
            tk.Button(frame,text="+ Add Task",command=lambda d=day,f=frame:self._add_task_row(f,d,"",False),
                      bg=ACCENT,fg="white",relief="flat",padx=5,pady=2).pack(pady=5)
        bf=tk.Frame(sf,bg=FP_BG); bf.pack(pady=20)
        tk.Button(bf,text="Save",command=self._do_save,bg=ACCENT,fg="white",relief="flat",padx=15,pady=5).pack(side="left",padx=5)
        tk.Button(bf,text="Cancel",command=self.destroy,bg="#555",fg="white",relief="flat",padx=15,pady=5).pack(side="left",padx=5)

    def _add_task_row(self,parent,day,text,done):
        row=tk.Frame(parent,bg=FP_BG); row.pack(fill="x",pady=2)
        dv=tk.BooleanVar(value=done)
        tk.Checkbutton(row,variable=dv,bg=FP_BG,fg=ACCENT,selectcolor=FP_BG,activebackground=FP_BG).pack(side="left")
        entry=tk.Entry(row,bg="#333",fg="white",font=F_SMALL,relief="flat"); entry.insert(0,text)
        entry.pack(side="left",fill="x",expand=True,padx=5)
        def delete():
            row.destroy(); self._task_vars[day].remove((entry,dv,row))
        tk.Button(row,text="✖",command=delete,bg="#d32f2f",fg="white",relief="flat",font=("Segoe UI",8)).pack(side="right",padx=2)
        self._task_vars[day].append((entry,dv,row))

    def _do_save(self):
        ns={}
        for day,entries in self._task_vars.items():
            tasks=[{"text":e.get().strip(),"done":d.get()} for e,d,_ in entries if e.get().strip()]
            ns[day]=tasks
        if self._on_save: self._on_save(ns)
        self.destroy()

# ═══════════════════════════════════════════════════════════════
#  APP PATHS / C++ SMOOTHER (unchanged)
# ═══════════════════════════════════════════════════════════════
APP_PATHS = {
    "vscode":       [r"C:\Users\{user}\AppData\Local\Programs\Microsoft VS Code\Code.exe",
                     r"C:\Program Files\Microsoft VS Code\Code.exe","code"],
    "unity":        [r"C:\Program Files\Unity Hub\Unity Hub.exe"],
    "blender":      [r"C:\Program Files\Blender Foundation\Blender 4.1\blender.exe",
                     r"C:\Program Files\Blender Foundation\Blender\blender.exe","blender"],                  
    "photoshop":    [r"C:\Program Files\Adobe\Adobe Photoshop 2024\Photoshop.exe"],
    "touchdesigner":[r"C:\Program Files\Derivative\TouchDesigner\bin\TouchDesigner.exe"],
    "whatsapp":     [r"C:\Users\{user}\AppData\Local\WhatsApp\WhatsApp.exe"],
    "instagram":[], "pinterest":[],
    "davinciresolve": [r"C:\Program Files\Blackmagic Design\DaVinci Resolve\Resolve.exe"]
}
UWP_URI={"whatsapp":"whatsapp:","instagram":"instagram:","pinterest":"pinterest:"}

def _launch_app(key):
    user=os.environ.get("USERNAME",os.environ.get("USER","User"))
    for path in APP_PATHS.get(key,[]):
        resolved=path.replace("{user}",user)
        if os.sep not in resolved and "/" not in resolved:
            try: subprocess.Popen(resolved,shell=True); return True
            except: continue
        if os.path.isfile(resolved):
            try: os.startfile(resolved); return True
            except: continue
    if key in UWP_URI:
        try: subprocess.Popen(f'start "" "{UWP_URI[key]}"',shell=True); return True
        except: pass
    return False

CPP_SRC=r"""
#include <stdio.h>
#include <stdlib.h>
int main(int argc,char* argv[]){
    if(argc<6){printf("0 0\n");return 1;}
    double px=atof(argv[1]),py=atof(argv[2]),rx=atof(argv[3]),ry=atof(argv[4]),f=atof(argv[5]);
    printf("%.4f %.4f\n",px+(rx-px)/f,py+(ry-py)/f);return 0;}
"""
CPP_BIN=os.path.abspath(os.path.join(os.path.dirname(__file__) or ".","cursor_smooth"))
_cpp_ok=False

def _try_compile_cpp():
    global _cpp_ok
    src=CPP_BIN+".cpp"
    try:
        with open(src,"w") as f: f.write(CPP_SRC)
        out=CPP_BIN+(".exe" if sys.platform=="win32" else "")
        _cpp_ok=subprocess.run(["g++",src,"-O2","-o",out],capture_output=True,timeout=10).returncode==0
    except: _cpp_ok=False

def cpp_smooth(px,py,rx,ry,factor):
    global _cpp_ok
    if _cpp_ok:
        try:
            out=CPP_BIN+(".exe" if sys.platform=="win32" else "")
            r=subprocess.run([out,str(px),str(py),str(rx),str(ry),str(factor)],capture_output=True,text=True,timeout=1)
            return tuple(map(float,r.stdout.strip().split()))
        except: _cpp_ok=False
    return px+(rx-px)/factor,py+(ry-py)/factor

recognizer=sr.Recognizer()
mp_hands=mp.solutions.hands
mp_draw=mp.solutions.drawing_utils
GREETING="Welcome back sir, what can I do for you?"

# ═══════════════════════════════════════════════════════════════
#  SCROLLBAR / CIRCLE BUTTON / HSEP (unchanged)
# ═══════════════════════════════════════════════════════════════
class SlimScrollbar(tk.Canvas):
    W=5
    def __init__(self,parent,track=L_SB_TRACK,thumb=L_SB_THUMB,thumb_h=L_SB_HOV,**kw):
        super().__init__(parent,bg=track,width=self.W,highlightthickness=0,bd=0,**kw)
        self._track,self._thumb,self._thumb_h=track,thumb,thumb_h
        self._hover=False;self._drag=None;self._pos=(0.0,1.0);self._cmd=None
        self.bind("<Configure>",self._draw);self.bind("<ButtonPress-1>",self._press)
        self.bind("<B1-Motion>",self._drag_move);self.bind("<ButtonRelease-1>",lambda e:setattr(self,"_drag",None))
        self.bind("<Enter>",lambda e:(setattr(self,"_hover",True),self._draw()))
        self.bind("<Leave>",lambda e:(setattr(self,"_hover",False),self._draw()))
    def configure(self,**kw):
        if "command" in kw: self._cmd=kw.pop("command")
        super().configure(**kw)
    def set(self,lo,hi): self._pos=(float(lo),float(hi));self._draw()
    def _draw(self,*_):
        self.delete("all");W=self.winfo_width() or self.W;H=self.winfo_height()
        if H<2:return
        lo,hi=self._pos;y0=int(lo*H)+1;y1=max(int(hi*H)-1,y0+4);r=W//2
        c=self._thumb_h if self._hover else self._thumb;self._rrect(1,y0,W-1,y1,r,c)
    def _rrect(self,x0,y0,x1,y1,r,fill):
        r=max(1,min(r,(x1-x0)//2,(y1-y0)//2))
        for a in[(x0,y0,x0+2*r,y0+2*r,90,90),(x1-2*r,y0,x1,y0+2*r,0,90),
                 (x0,y1-2*r,x0+2*r,y1,180,90),(x1-2*r,y1-2*r,x1,y1,270,90)]:
            self.create_arc(*a[:4],start=a[4],extent=a[5],fill=fill,outline=fill)
        self.create_rectangle(x0+r,y0,x1-r,y1,fill=fill,outline=fill)
        self.create_rectangle(x0,y0+r,x1,y1-r,fill=fill,outline=fill)
    def _press(self,e): self._drag=(e.x,e.y)
    def _drag_move(self,e):
        if self._drag is None or self._cmd is None:return
        H=self.winfo_height();lo,hi=self._pos
        delta=(e.y-self._drag[1])/max(H,1);self._drag=(e.x,e.y)
        self._cmd("moveto",max(0.0,min(lo+delta,1.0-(hi-lo))))

class CircleButton(tk.Canvas):
    def __init__(self,parent,icon,command=None,size=38,bg_outer=I_BG,**kw):
        super().__init__(parent,width=size,height=size,bg=bg_outer,highlightthickness=0,bd=0,cursor="hand2",**kw)
        self._size=size;self._icon=icon;self._cmd=command;self._state="normal";self._draw()
        self.bind("<Enter>",lambda e:self._set("hover"));self.bind("<Leave>",lambda e:self._set("normal"))
        self.bind("<ButtonPress-1>",lambda e:self._set("pressed"));self.bind("<ButtonRelease-1>",self._release)
    def _set(self,s): self._state=s;self._draw()
    def _release(self,e): self._set("hover");(self._cmd and self._cmd())
    def _draw(self):
        self.delete("all");s=self._size
        col={"normal":CB_BG,"hover":CB_HOV,"pressed":CB_PRESS}[self._state]
        self.create_oval(2,2,s-2,s-2,fill=col,outline="",width=0)
        self.create_text(s//2,s//2,text=self._icon,fill=CB_FG,font=("Segoe UI Symbol",int(s*0.38),"bold"),anchor="center")

def HSep(parent,color=SEP,**kw):
    return tk.Frame(parent,bg=color,height=1,**kw)

# ═══════════════════════════════════════════════════════════════
#  RADAR CHART (UPDATED: auto‑refresh scores from profiles)
# ═══════════════════════════════════════════════════════════════
class RadarHexChart(tk.Canvas):
    LABELS=["Looks","Physique","Goal Setting","To Do List","Time\nManagement","Progress"]
    RINGS=5
    ANGLES=[math.radians(90+60*i) for i in range(6)]

    def __init__(self,parent,**kw):
        kw.setdefault("bg",RADAR_BG)
        super().__init__(parent,highlightthickness=0,bd=0,**kw)
        self._values=[0.0]*6
        self._tooltip=None
        self._label_ids=[]
        self.face_profile = load_face_profile()
        self.body_profile = load_body_profile()
        self.goals = load_goals()
        self.todo_tasks = load_todo()
        self.weekly_schedule = load_schedule()
        self.progress = load_progress()
        self.bind("<Configure>", self._on_resize)
        # Refresh scores immediately and after any profile change
        self.refresh_scores()

    def refresh_scores(self):
        """Re‑compute all six axes from current profile data and update radar."""
        # 1. Looks: % of face fields filled (excluding timestamp)
        total_face = len([k for k in self.face_profile.keys() if k != "timestamp"])
        filled_face = sum(1 for k, v in self.face_profile.items()
                          if k != "timestamp" and v and v != "Undetected")
        looks = filled_face / total_face if total_face > 0 else 0

        # 2. Physique: % of body fields filled (excluding timestamp)
        total_body = len([k for k in self.body_profile.keys() if k != "timestamp"])
        filled_body = sum(1 for k, v in self.body_profile.items()
                          if k != "timestamp" and v and v != "Undetected")
        physique = filled_body / total_body if total_body > 0 else 0

        # 3. Goal Setting: % of goals completed
        total_goals = 0
        done_goals = 0
        for tf, tasks in self.goals.items():
            for t in tasks:
                if isinstance(t, dict) and t.get("text", "").strip():
                    total_goals += 1
                    if t.get("done", False):
                        done_goals += 1
                elif isinstance(t, str) and t.strip():
                    total_goals += 1
        goals_score = done_goals / total_goals if total_goals > 0 else 0

        # 4. To Do List: % of todos checked
        total_todo = len(self.todo_tasks)
        done_todo = sum(1 for t in self.todo_tasks if isinstance(t, dict) and t.get("done", False))
        todo_score = done_todo / total_todo if total_todo > 0 else 0

        # 5. Time Management: % of schedule tasks completed
        total_sched = 0
        done_sched = 0
        for day, tasks in self.weekly_schedule.items():
            for t in tasks:
                if isinstance(t, dict) and t.get("text", "").strip():
                    total_sched += 1
                    if t.get("done", False):
                        done_sched += 1
                elif isinstance(t, str) and t.strip():
                    total_sched += 1
        sched_score = done_sched / total_sched if total_sched > 0 else 0

        # 6. Progress: overall rank percentage (0‑1)
        _, overall = ProgressRank.calculate(self.face_profile, self.body_profile,
                                            self.goals, self.todo_tasks, self.weekly_schedule)
        progress_score = overall / 100.0

        self.set_values([looks, physique, goals_score, todo_score, sched_score, progress_score])

    def set_values(self, values):
        self._values = [max(0.0, min(1.0, v)) for v in values]
        self._redraw()

    def _on_resize(self, event):
        self._redraw()

    def _center(self):
        W = self.winfo_width() or 200
        H = self.winfo_height() or 200
        return W/2, H/2

    def _max_r(self):
        W = self.winfo_width() or 200
        H = self.winfo_height() or 200
        return min(W, H)/2 * 0.44

    def _hex_pts(self, cx, cy, r):
        return [(cx + r * math.cos(a), cy - r * math.sin(a)) for a in self.ANGLES]

    def _redraw(self):
        self.delete("all")
        self._label_ids.clear()
        W, H = self.winfo_width(), self.winfo_height()
        if W < 20 or H < 20:
            return
        cx, cy = self._center()
        max_r = self._max_r()

        # Draw rings
        for ring in range(self.RINGS, 0, -1):
            r = max_r * ring / self.RINGS
            pts = self._hex_pts(cx, cy, r)
            flat = [c for p in pts for c in p]
            if ring == self.RINGS:
                col, lw = RADAR_HEX_OUT, 2
            elif ring == self.RINGS - 1:
                col, lw = "#5a5a88", 1
            else:
                col, lw = RADAR_HEX, 1
            self.create_polygon(flat, outline=col, fill="", width=lw)

        # Draw spokes
        for px, py in self._hex_pts(cx, cy, max_r):
            self.create_line(cx, cy, px, py, fill=RADAR_SPOKE, width=1)

        # Draw data polygon
        if any(v > 0 for v in self._values):
            dp = [(cx + max_r * self._values[i] * math.cos(a),
                   cy - max_r * self._values[i] * math.sin(a))
                  for i, a in enumerate(self.ANGLES)]
            self.create_polygon([c for p in dp for c in p],
                                fill=ACCENT, outline=RADAR_OUTLINE, stipple="gray25", width=2)

        # Center dot
        cr = max(3, max_r * 0.055)
        self.create_oval(cx-cr, cy-cr, cx+cr, cy+cr, outline=RADAR_CENTER, fill=RADAR_BG, width=2)

        # Labels with interactive tooltips
        label_r = max_r * 1.48
        font_sz = max(7, min(11, int(max_r * 0.12)))
        lf = ("Segoe UI", font_sz)
        for i, ang in enumerate(self.ANGLES):
            lx = cx + label_r * math.cos(ang)
            ly = cy - label_r * math.sin(ang)
            # determine anchor
            dx, dy = math.cos(ang), math.sin(ang)
            if dx > 0.3 and dy > 0.3:
                anchor = "nw"
            elif dx > 0.3 and dy < -0.3:
                anchor = "sw"
            elif dx < -0.3 and dy > 0.3:
                anchor = "ne"
            elif dx < -0.3 and dy < -0.3:
                anchor = "se"
            elif dx > 0.3:
                anchor = "w"
            elif dx < -0.3:
                anchor = "e"
            elif dy > 0.3:
                anchor = "n"
            elif dy < -0.3:
                anchor = "s"
            else:
                anchor = "center"
            tid = self.create_text(lx, ly, text=self.LABELS[i], fill=RADAR_LABEL,
                                   font=lf, anchor=anchor, justify="center")
            self._label_ids.append(tid)
            self.tag_bind(tid, "<Enter>", lambda e, idx=i: self._show_tooltip(e, idx))
            self.tag_bind(tid, "<Leave>", lambda e: self._hide_tooltip())
            # Bind click to open corresponding editor
            methods = [self._open_face_profile, self._open_body_profile,
                       self._open_goals, self._open_todo,
                       self._open_schedule, self._show_progress_details]
            if i < len(methods):
                self.tag_bind(tid, "<Button-1>", lambda e, m=methods[i]: m())

        # Small dots on rings
        for ang in self.ANGLES:
            for ring in range(1, self.RINGS+1):
                r = max_r * ring / self.RINGS
                tx = cx + r * math.cos(ang)
                ty = cy - r * math.sin(ang)
                dr = max(2, int(max_r * 0.022))
                self.create_oval(tx-dr, ty-dr, tx+dr, ty+dr, fill=RADAR_HEX_OUT, outline="")

    def _show_tooltip(self, event, index):
        self._hide_tooltip()
        tip = tk.Toplevel(self)
        tip.wm_overrideredirect(True)
        x = event.x_root + 12
        y = event.y_root + 12
        sw = self.winfo_screenwidth()
        sh = self.winfo_screenheight()
        tip.configure(bg=FP_BG, bd=1, relief="solid")
        frame = tk.Frame(tip, bg=FP_BG, padx=10, pady=8)
        frame.pack()
        tk.Label(frame, text=self.LABELS[index], font=("Segoe UI",10,"bold"),
                 fg=FP_ACCENT, bg=FP_BG).pack(anchor="w", pady=(0,5))

        if index == 0:  # Looks
            has = any(self.face_profile.get(p["field"],"") not in ("","Undetected") for p in FACE_PARTS)
            if not has:
                tk.Label(frame, text="No face data yet. Click to open editor.",
                         fg=FP_ACCENT, bg=FP_BG, font=F_SMALL).pack(anchor="w")
            else:
                for part in FACE_PARTS:
                    val = self.face_profile.get(part["field"], "") or "—"
                    row = tk.Frame(frame, bg=FP_BG)
                    row.pack(fill="x", pady=1)
                    tk.Label(row, text=part["icon"], font=("Segoe UI",11), fg=FP_TEXT,
                             bg=FP_BG, width=3).pack(side="left")
                    tk.Label(row, text=f"{part['label']}:", font=("Segoe UI",9,"bold"),
                             fg=FP_MUTED, bg=FP_BG, width=11, anchor="w").pack(side="left")
                    tk.Label(row, text=val, font=("Segoe UI",9),
                             fg=FP_TEXT if val!="—" else FP_BLANK, bg=FP_BG, anchor="w").pack(side="left")
                tk.Label(frame, text="Click to edit / rescan", fg=FP_MUTED, bg=FP_BG,
                         font=("Segoe UI",8)).pack(anchor="e", pady=(6,0))

        elif index == 1:  # Physique
            has = any(self.body_profile.get(p["key"],"") not in ("","Undetected") for p in BODY_PARTS)
            if not has:
                tk.Label(frame, text="No body data yet. Click to open editor.",
                         fg=FP_ACCENT, bg=FP_BG, font=F_SMALL).pack(anchor="w")
            else:
                for part in BODY_PARTS:
                    val = self.body_profile.get(part["key"], "") or "—"
                    row = tk.Frame(frame, bg=FP_BG)
                    row.pack(fill="x", pady=1)
                    tk.Label(row, text=part["icon"], font=("Segoe UI",11), fg=FP_TEXT,
                             bg=FP_BG, width=3).pack(side="left")
                    tk.Label(row, text=f"{part['label']}:", font=("Segoe UI",9,"bold"),
                             fg=FP_MUTED, bg=FP_BG, width=10, anchor="w").pack(side="left")
                    tk.Label(row, text=val, font=("Segoe UI",9),
                             fg=FP_TEXT if val!="—" else FP_BLANK, bg=FP_BG, anchor="w").pack(side="left")
                tk.Label(frame, text="Click to edit / rescan", fg=FP_MUTED, bg=FP_BG,
                         font=("Segoe UI",8)).pack(anchor="e", pady=(6,0))

        elif index == 2:  # Goals
            tg = cg = 0
            for tf, tasks in self.goals.items():
                for task in tasks:
                    if isinstance(task, dict) and task.get("text","").strip():
                        tg += 1
                        if task.get("done", False):
                            cg += 1
            if tg == 0:
                tk.Label(frame, text="No goals set yet. Click to create your plan.",
                         fg=FP_ACCENT, bg=FP_BG, font=F_SMALL).pack(anchor="w")
            else:
                tk.Label(frame, text=f"Goals completed: {cg}/{tg} ({int(cg/tg*100)}%)",
                         fg=FP_ACCENT, bg=FP_BG, font=F_SMALL).pack(anchor="w")
                for tf in GOAL_TIMEFRAMES[:4]:
                    tasks = self.goals.get(tf, [])
                    if tasks:
                        preview = ", ".join([t.get("text", t) if isinstance(t,dict) else t for t in tasks[:2]])
                        tk.Label(frame, text=f"{tf}: {preview}...", fg="#ccc", bg=FP_BG,
                                 font=F_SMALL).pack(anchor="w")
                tk.Label(frame, text="Click to edit all goals", fg=FP_ACCENT, bg=FP_BG,
                         font=F_SMALL).pack(anchor="w", pady=(4,0))

        elif index == 3:  # To Do List
            if not self.todo_tasks:
                tk.Label(frame, text="No tasks yet. Click to add.", fg=FP_ACCENT,
                         bg=FP_BG, font=F_SMALL).pack(anchor="w")
            else:
                for task in self.todo_tasks[:6]:
                    text = task.get("text", "") if isinstance(task, dict) else task
                    done = task.get("done", False) if isinstance(task, dict) else False
                    status = "✓" if done else "○"
                    tk.Label(frame, text=f"{status} {text}", fg="#ccc", bg=FP_BG,
                             font=F_SMALL, anchor="w").pack(fill="x")
                tk.Label(frame, text="Click to edit", fg=FP_ACCENT, bg=FP_BG,
                         font=F_SMALL).pack(anchor="w", pady=(4,0))

        elif index == 4:  # Time Management
            tt = ct = 0
            for day, tasks in self.weekly_schedule.items():
                for task in tasks:
                    if isinstance(task, dict) and task.get("text","").strip():
                        tt += 1
                        if task.get("done", False):
                            ct += 1
            if tt == 0:
                tk.Label(frame, text="No schedule set yet. Click to plan your week.",
                         fg=FP_ACCENT, bg=FP_BG, font=F_SMALL).pack(anchor="w")
            else:
                tk.Label(frame, text=f"Tasks completed: {ct}/{tt} ({int(ct/tt*100) if tt else 0}%)",
                         fg=FP_ACCENT, bg=FP_BG, font=F_SMALL).pack(anchor="w")
                tk.Label(frame, text="Click to edit weekly schedule", fg=FP_ACCENT,
                         bg=FP_BG, font=F_SMALL).pack(anchor="w", pady=(4,0))

        elif index == 5:  # Progress
            rank = self.progress.get("current_rank", "E")
            last = self.progress.get("last_year_rank", "E")
            tk.Label(frame, text=f"Current Rank: {rank}", fg=FP_ACCENT, bg=FP_BG,
                     font=("Segoe UI",9,"bold")).pack(anchor="w")
            tk.Label(frame, text=f"Last Year's Rank: {last}", fg=FP_MUTED, bg=FP_BG,
                     font=F_SMALL).pack(anchor="w")
            tk.Label(frame, text="Click for details", fg=FP_ACCENT, bg=FP_BG,
                     font=F_SMALL).pack(anchor="w", pady=(4,0))

        tip.update_idletasks()
        tw, th = tip.winfo_width(), tip.winfo_height()
        if x + tw > sw:
            x = event.x_root - tw - 12
        if y + th > sh:
            y = event.y_root - th - 12
        tip.wm_geometry(f"+{x}+{y}")
        self._tooltip = tip
        tip.bind("<Leave>", lambda e: self._hide_tooltip())

    def _hide_tooltip(self):
        if self._tooltip:
            self._tooltip.destroy()
            self._tooltip = None

    def _update_progress(self):
        # Re‑compute rank and overall score, then refresh all axes
        self.refresh_scores()
        # Also save progress to file for persistence
        ProgressRank.update_and_save(self.face_profile, self.body_profile,
                                     self.goals, self.todo_tasks, self.weekly_schedule)
        self.progress = load_progress()

    def _open_face_profile(self):
        self._hide_tooltip()
        def on_save(p):
            self.face_profile = p
            save_face_profile(p)
            self._update_progress()
        FaceProfileEditor(self.winfo_toplevel(), self.face_profile,
                          on_save=on_save, on_scan=FaceScanner.scan)

    def _open_body_profile(self):
        self._hide_tooltip()
        def on_save(p):
            self.body_profile = p
            save_body_profile(p)
            self._update_progress()
        BodyProfileEditor(self.winfo_toplevel(), self.body_profile,
                          on_save=on_save, on_scan=BodyScanner.scan)

    def _open_goals(self):
        self._hide_tooltip()
        def on_save(g):
            self.goals = g
            save_goals(g)
            self._update_progress()
        GoalEditor(self.winfo_toplevel(), self.goals, on_save=on_save)

    def _open_todo(self):
        self._hide_tooltip()
        def on_save(t):
            self.todo_tasks = t
            save_todo(t)
            self._update_progress()
        TodoEditor(self.winfo_toplevel(), self.todo_tasks, on_save=on_save)

    def _open_schedule(self):
        self._hide_tooltip()
        def on_save(s):
            self.weekly_schedule = s
            save_schedule(s)
            self._update_progress()
        ScheduleEditor(self.winfo_toplevel(), self.weekly_schedule, on_save=on_save)

    def _show_progress_details(self):
        rank = self.progress.get("current_rank", "E")
        last = self.progress.get("last_year_rank", "E")
        messagebox.showinfo("Progress Rank Details",
            f"Current Rank: {rank}\nLast Year's Rank: {last}\n\n"
            f"Ranks are based on:\n- Looks · Physique · Goals · To Do List · Time Management\n\n"
            f"Complete and fill in each section to improve your rank!")

# ═══════════════════════════════════════════════════════════════
#  WAVE RING & SPHERICAL WAVE CANVAS (unchanged)
# ═══════════════════════════════════════════════════════════════
class WaveRing:
    def __init__(self,canvas,cx,cy,base_radius,amplitude,delay_frames,max_radius):
        self.canvas=canvas;self.cx=cx;self.cy=cy;self.base_radius=base_radius;self.radius=base_radius
        self.amplitude=amplitude;self.delay=delay_frames;self.alive=True;self.started=False
        self.speed=1.8+amplitude*1.2;self.max_r=min(base_radius+100+amplitude*60,max_radius)
        self.thick=max(2,int(amplitude*2.5)+1)
        t=min(1.0,amplitude/3.0)
        self.color=f"#{int(220*t):02x}{int(200-180*t):02x}{int(220-150*t):02x}";self.id=None
    def update(self):
        if self.delay>0:self.delay-=1;return
        self.started=True;self.radius+=self.speed
        if self.radius>=self.max_r:
            self.alive=False
            if self.id:self.canvas.delete(self.id)
    def draw(self):
        if not self.started or not self.alive:return
        progress=(self.radius-self.base_radius)/max(1,self.max_r-self.base_radius)
        r=int(self.color[1:3],16);g=int(self.color[3:5],16);b=int(self.color[5:7],16)
        fade=int(255*(1.0-progress))
        r=max(0,min(255,r*fade//255));g=max(0,min(255,g*fade//255));b=max(0,min(255,b*fade//255))
        if self.id:self.canvas.delete(self.id)
        self.id=self.canvas.create_oval(self.cx-self.radius,self.cy-self.radius,
                                        self.cx+self.radius,self.cy+self.radius,
                                        outline=f"#{r:02x}{g:02x}{b:02x}",width=self.thick,fill="")

class SphericalWaveCanvas(tk.Canvas):
    def __init__(self,parent,**kw):
        kw.setdefault("bg","#0a0a1a")
        super().__init__(parent,highlightthickness=0,bd=0,**kw)
        self.cx=self.cy=self.base_radius=self.max_radius=0
        self.sphere_id=self.glow_id=None;self.pulse_t=0.0;self.speaking=False;self.waves=[]
        self.bind("<Configure>",self._on_resize);self._animate()
    def _on_resize(self,e):
        self.cx=e.width//2;self.cy=e.height//2
        self.base_radius=min(e.width,e.height)//4
        self.max_radius=min(self.cx,self.cy,e.width-self.cx,e.height-self.cy)
    def _animate(self):
        self.pulse_t+=0.06;pulse=1.0+math.sin(self.pulse_t)*0.03
        r=max(4,min(int(self.base_radius*pulse),self.max_radius))
        if self.sphere_id:self.delete(self.sphere_id)
        if self.glow_id:self.delete(self.glow_id)
        sc="#00aaff" if self.speaking else "#0088aa"
        self.sphere_id=self.create_oval(self.cx-r,self.cy-r,self.cx+r,self.cy+r,outline=sc,width=2,fill=sc)
        gr=min(r+(8+int(6*abs(math.sin(self.pulse_t*3)))) if self.speaking else r+3,self.max_radius)
        gc="#00ccff" if self.speaking else "#0088aa"
        self.glow_id=self.create_oval(self.cx-gr,self.cy-gr,self.cx+gr,self.cy+gr,
                                      outline=gc,width=3 if self.speaking else 1,fill="")
        for w in self.waves[:]:
            w.cx=self.cx;w.cy=self.cy;w.update()
            if w.alive:w.draw()
            else:self.waves.remove(w)
        self.after(30,self._animate)
    def trigger_waves(self,text):
        words=text.split()
        for i,word in enumerate(words):
            amp=min(2.8,len(word.strip(".,!?;:\"'"))/4.5)
            self.waves.append(WaveRing(self,self.cx,self.cy,self.base_radius,amp,i*12,self.max_radius))
        self.speaking=True
        self.after(int(len(words)*200+1000),lambda:setattr(self,"speaking",False))

# ═══════════════════════════════════════════════════════════════
#  MAIN APPLICATION (updated radar initialisation)
# ═══════════════════════════════════════════════════════════════
class VoiceAssistantGUI:
    def __init__(self,root):
        self.root=root;self.root.title("Player AI")
        self.root.geometry("1600x900");self.root.minsize(1300,760);self.root.configure(bg=BG)
        self.style=ttkbootstrap.Style("darkly")
        threading.Thread(target=_try_compile_cpp,daemon=True).start()
        self.chats_file="chats.json";self.chats={};self.current_chat_id=None
        self._cmd_token=0;self._tts_engine=None;self._tts_lock=threading.Lock()
        self._build_layout();self.load_chats();self._start_fresh_chat()
        self.root.after(400,self._startup_greeting)
        self.root.bind("<Return>",lambda e:self.execute())
        self.entry.focus_set()

    def _new_token(self):
        self._cmd_token+=1;self._stop_tts();return self._cmd_token
    def _stop_tts(self):
        with self._tts_lock:
            if self._tts_engine:
                try:self._tts_engine.stop()
                except:pass
                self._tts_engine=None
    def _is_cancelled(self,token): return token!=self._cmd_token

    def speak(self,text,token=None):
        if token is not None and self._is_cancelled(token):return
        self.append_chat("Player",text);self.wave_widget.trigger_waves(text)
        def run():
            if token is not None and self._is_cancelled(token):return
            try:
                engine=pyttsx3.init()
                with self._tts_lock:
                    if token is not None and self._is_cancelled(token):return
                    self._tts_engine=engine
                engine.say(text);engine.runAndWait()
                with self._tts_lock:
                    if self._tts_engine is engine:self._tts_engine=None
            except Exception as e:print("Speech error:",e)
        threading.Thread(target=run,daemon=True).start()

    def _startup_greeting(self):
        token=self._new_token();self.speak(GREETING,token)

    def execute(self):
        cmd=self.entry.get().strip()
        if not cmd:messagebox.showwarning("Error","Enter a command");return
        self.entry.delete(0,tk.END);self.append_chat("You",cmd)
        token=self._new_token()
        threading.Thread(target=self.process_command,args=(cmd,token),daemon=True).start()

    def process_command(self, command, token):
        cmd = command.lower()
        def s(text):
            if not self._is_cancelled(token): self.speak(text, token)

        if "take screenshot" in cmd:
            try: pyautogui.screenshot().save("screenshot.png"); s("Screenshot saved")
            except Exception as e: print(e); s("Screenshot failed")
            return

        if "todays news" in cmd or "latest news" in cmd:
            threading.Thread(target=self.fetch_news, args=(token,), daemon=True).start()
            return

        app_shortcuts = [
            (("open vscode","open vs code","open visual studio code","launch vscode","start vscode"), "vscode","VS Code"),
            (("open unity","launch unity","start unity"),                                              "unity","Unity Hub"),
            (("open blender","launch blender","start blender"),                                        "blender","Blender"),
            (("open photoshop","launch photoshop","start photoshop","open photo shop"),                "photoshop","Photoshop"),
            (("open touchdesigner","open touch designer","launch touchdesigner","start touchdesigner"),"touchdesigner","TouchDesigner"),
            (("open whatsapp","launch whatsapp","open whats app"),                                     "whatsapp","WhatsApp"),
            (("open instagram","launch instagram"),                                                    "instagram","Instagram"),
            (("open pinterest","launch pinterest"),                                                    "pinterest","Pinterest"),
            (("open davinci resolve", "launch davinci resolve", "start davinci resolve", "open davinciresolve"), "davinciresolve", "DaVinci Resolve"),
        ]
        for keywords, key, name in app_shortcuts:
            if any(k in cmd for k in keywords):
                self._open_desktop_app(key, name, token)
                return

        threading.Thread(target=self._jarvis_or_search,
                         args=(command, token), daemon=True).start()

    def _jarvis_or_search(self, command: str, token: int):
        if self._is_cancelled(token): return
        response = JarvisAutomation.handle(command)
        if self._is_cancelled(token): return
        if response:
            self.speak(response, token)
        else:
            self._smart_search(command, token)

    def _smart_search(self, query: str, token: int):
        if self._is_cancelled(token): return
        self._ui(lambda: self.append_chat("System", "🔍 Searching…"))
        cancelled = lambda: self._is_cancelled(token)
        answer = MultiSourceSearch.search(query, cancelled_fn=cancelled)
        if self._is_cancelled(token): return
        if answer and len(answer) > 20:
            self.speak(answer, token)
        else:
            self.speak("Sorry, I could not find a clear answer to that.", token)

    def _open_desktop_app(self,key,name,token):
        self.speak(f"Opening {name}",token)
        if not _launch_app(key):self.speak(f"Could not find {name}. Check APP_PATHS.",token)

    def fetch_news(self,token):
        if self._is_cancelled(token):return
        try:
            feed=feedparser.parse("http://feeds.bbci.co.uk/news/rss.xml");articles=feed.entries[:5]
            if not articles:self.speak("No news headlines found.",token);return
            if self._is_cancelled(token):return
            self._ui(lambda:self.append_chat("News",f"📰 Top {len(articles)} headlines:"))
            headlines=[]
            for i,art in enumerate(articles,1):
                if self._is_cancelled(token):return
                t=art.title;headlines.append(t)
                self._ui(lambda i=i,t=t:self.append_chat("News",f"{i}. {t}"))
            def speak_news():
                engine=None
                try:
                    engine=pyttsx3.init()
                    with self._tts_lock:
                        if self._is_cancelled(token):return
                        self._tts_engine=engine
                    engine.setProperty("rate",160);engine.say(f"Here are the top {len(headlines)} headlines.");engine.runAndWait()
                    for idx,raw in enumerate(headlines,1):
                        if self._is_cancelled(token):break
                        clean=(raw.encode("ascii","ignore").decode("ascii")
                                  .replace("-"," ").replace(":"," ").replace("'","").replace(",","")
                                  .replace("  "," ").strip() or f"Headline {idx}")
                        if not self._is_cancelled(token):engine.say(f"Headline {idx}. {clean}");engine.runAndWait();time.sleep(0.3)
                    if not self._is_cancelled(token):engine.say("That's all.");engine.runAndWait()
                except Exception as e:print(f"TTS:{e}")
                finally:
                    if engine:
                        try:engine.stop()
                        except:pass
                    with self._tts_lock:
                        if self._tts_engine is engine:self._tts_engine=None
            threading.Thread(target=speak_news,daemon=True).start()
        except Exception as e:print(f"News error:{e}");self.speak("Sorry, could not fetch news.",token)

    # ── CHAT PERSISTENCE ─────────────────────────
    def load_chats(self):
        if os.path.exists(self.chats_file):
            try:
                with open(self.chats_file,"r",encoding="utf-8") as f:
                    data=json.load(f);self.chats=data.get("chats",{})
            except Exception as e:print("Error loading chats:",e);self.chats={}
        else:self.chats={}
        self.refresh_chat_list()

    def _start_fresh_chat(self):self.new_chat(add_welcome=False)

    def save_chats(self):
        try:
            with open(self.chats_file,"w",encoding="utf-8") as f:
                json.dump({"chats":self.chats,"current_chat_id":self.current_chat_id},f,indent=2,ensure_ascii=False)
        except Exception as e:print("Error saving chats:",e)

    def refresh_chat_list(self):
        self.chat_listbox.delete(0,tk.END)
        for cid,info in sorted(self.chats.items(),key=lambda x:x[1]["timestamp"],reverse=True):
            self.chat_listbox.insert(tk.END,f"{info['name']}  ({info['timestamp']})")

    def on_chat_selected(self,event):
        sel=self.chat_listbox.curselection()
        if not sel:return
        display=self.chat_listbox.get(sel[0])
        for cid,info in self.chats.items():
            if f"{info['name']}  ({info['timestamp']})"==display:self.load_chat_into_ui(cid);break

    def load_chat_into_ui(self,chat_id):
        if chat_id not in self.chats:return
        self.current_chat_id=chat_id;self.clear_chat_display()
        for msg in self.chats[chat_id]["messages"]:self._append_chat_raw(msg["sender"],msg["text"])
        self.save_chats();self.refresh_chat_list()

    def clear_chat_display(self):
        self.chat_text.configure(state="normal");self.chat_text.delete("1.0",tk.END);self.chat_text.configure(state="disabled")

    def new_chat(self,chat_name=None,add_welcome=True):
        if chat_name is None:chat_name="New Chat"
        cid=str(int(time.time()*1000));timestamp=datetime.now().strftime("%Y-%m-%d %H:%M")
        self.chats[cid]={"name":chat_name.strip(),"timestamp":timestamp,"messages":[]}
        self.current_chat_id=cid;self.clear_chat_display();self.refresh_chat_list();self.save_chats()
        if add_welcome:self.append_chat("Player",f"Started new chat: {chat_name}")

    def rename_current_chat(self,new_name):
        if self.current_chat_id and self.current_chat_id in self.chats:
            self.chats[self.current_chat_id]["name"]=new_name[:40];self.save_chats();self.refresh_chat_list()

    def add_message_to_current(self,sender,text):
        if self.current_chat_id is None:self.new_chat("Default Chat",add_welcome=False)
        if self.current_chat_id not in self.chats:
            self.chats[self.current_chat_id]={"name":"Untitled","timestamp":datetime.now().strftime("%Y-%m-%d %H:%M"),"messages":[]}
        self.chats[self.current_chat_id]["messages"].append({"sender":sender,"text":text})
        self.save_chats();self.refresh_chat_list()
        if sender.lower()=="you" and self.chats[self.current_chat_id]["name"]=="New Chat":self.rename_current_chat(text)

    def clear_current_chat(self):
        if self.current_chat_id is None:messagebox.showinfo("No Chat","No active chat to clear.");return
        name=self.chats[self.current_chat_id]["name"]
        if messagebox.askyesno("Clear Chat",f"Clear all messages in '{name}'?"):
            self.chats[self.current_chat_id]["messages"]=[];self.clear_chat_display();self.save_chats()
            self.append_chat("System","Chat cleared.")

    def delete_chat(self):
        sel=self.chat_listbox.curselection();tid=None
        if sel:
            display=self.chat_listbox.get(sel[0])
            for cid,info in self.chats.items():
                if f"{info['name']}  ({info['timestamp']})"==display:tid=cid;break
        else:tid=self.current_chat_id
        if tid and tid in self.chats:
            name=self.chats[tid]["name"]
            if messagebox.askyesno("Delete Chat",f"Delete chat '{name}' permanently?"):
                del self.chats[tid]
                if self.current_chat_id==tid:self.current_chat_id=None;self.clear_chat_display()
                self.refresh_chat_list();self.save_chats()
                if not self.chats:self.new_chat(add_welcome=False)
                else:self.load_chat_into_ui(next(iter(self.chats)))
        else:messagebox.showinfo("No Chat","No chat to delete.")

    # ── LAYOUT (unchanged) ────────────────────────────────────
    def _build_layout(self):
        wrap=tk.Frame(self.root,bg=BG);wrap.pack(fill="both",expand=True)
        wrap.grid_rowconfigure(0,weight=1)
        wrap.grid_columnconfigure(0,minsize=230,weight=0)
        wrap.grid_columnconfigure(1,weight=1)
        wrap.grid_columnconfigure(2,minsize=220,weight=0)

        left=tk.Frame(wrap,bg=L_BG);left.grid(row=0,column=0,sticky="nsew")
        left.grid_rowconfigure(4,weight=1);left.grid_columnconfigure(0,weight=1)
        tk.Label(left,text="Recents",bg=L_BG,fg=L_TEXT,font=F_TITLE,anchor="w",padx=16,pady=14).grid(row=0,column=0,sticky="ew")
        HSep(left,color="#1a1a1a").grid(row=1,column=0,sticky="ew")
        bf=tk.Frame(left,bg=L_BG);bf.grid(row=2,column=0,sticky="ew",padx=12,pady=(10,8))
        bf.grid_columnconfigure(0,weight=1);bf.grid_columnconfigure(1,weight=1);bf.grid_columnconfigure(2,weight=1)
        for col,(label,cmd,bg,hov) in enumerate([
            ("➕  New",   lambda:self.new_chat(add_welcome=True),BTN_BG_GREY,BTN_HOV_GREY),
            ("🧹  Clear", self.clear_current_chat,BTN_BG_DARK,BTN_HOV_DARK),
            ("🗑️  Delete",self.delete_chat,BTN_BG_DARK,BTN_HOV_DARK),
        ]):
            tk.Button(bf,text=label,bg=bg,fg=BTN_FG,font=("Segoe UI",9),relief="flat",bd=0,
                      padx=4,pady=6,activebackground=hov,activeforeground="#ffffff",
                      command=cmd,cursor="hand2").grid(row=0,column=col,sticky="ew",padx=3)
        HSep(left,color="#1a1a1a").grid(row=3,column=0,sticky="ew")
        lf=tk.Frame(left,bg=L_BG);lf.grid(row=4,column=0,sticky="nsew",padx=(8,4),pady=(8,0))
        lf.grid_rowconfigure(0,weight=1);lf.grid_columnconfigure(0,weight=1)
        self.chat_listbox=tk.Listbox(lf,bg=L_ITEM_BG,fg=L_TEXT,highlightthickness=0,bd=0,
                                     activestyle="none",selectbackground=L_SEL,selectforeground=L_TEXT,
                                     font=F_HIST,exportselection=False,relief="flat")
        self.chat_listbox.grid(row=0,column=0,sticky="nsew")
        lsb=SlimScrollbar(lf);lsb.grid(row=0,column=1,sticky="ns",padx=(2,0))
        self.chat_listbox.configure(yscrollcommand=lsb.set);lsb.configure(command=self.chat_listbox.yview)
        self.chat_listbox.bind("<<ListboxSelect>>",self.on_chat_selected)

        centre=tk.Frame(wrap,bg=C_BG);centre.grid(row=0,column=1,sticky="nsew",padx=2)
        centre.grid_columnconfigure(0,weight=1);centre.grid_rowconfigure(1,weight=1)
        hdr=tk.Frame(centre,bg=C_HDR);hdr.grid(row=0,column=0,sticky="ew");hdr.grid_columnconfigure(1,weight=1)
        tk.Frame(hdr,bg=ACCENT,width=3).grid(row=0,column=0,sticky="ns",padx=(14,10),pady=12)
        tk.Label(hdr,text="Player",bg=C_HDR,fg=TEXT,font=F_TITLE,anchor="w",pady=12).grid(row=0,column=1,sticky="ew")
        tk.Label(hdr,text="●",bg=C_HDR,fg=ACCENT,font=("Segoe UI",9),padx=16).grid(row=0,column=2,sticky="e")
        HSep(centre,color="#1a1a1a").grid(row=0,column=0,sticky="sew")
        cw=tk.Frame(centre,bg=C_MSG_BG);cw.grid(row=1,column=0,sticky="nsew",padx=10,pady=(5,0))
        cw.grid_rowconfigure(0,weight=1);cw.grid_columnconfigure(0,weight=1)
        self.chat_text=tk.Text(cw,bg=C_MSG_BG,fg=TEXT,insertbackground=TEXT,wrap="word",font=F_BODY,
                               bd=0,highlightthickness=0,padx=20,pady=16,relief="flat")
        self.chat_text.grid(row=0,column=0,sticky="nsew");self.chat_text.configure(state="disabled")
        for tag,col,just in [("you_name",COL_YOU,"right"),("player_name",COL_PLAYER,"left"),
                             ("system_name",COL_SYS,"left"),("news_name",COL_NEWS,"left")]:
            self.chat_text.tag_configure(tag,justify=just,font=("Segoe UI",10,"bold"),foreground=col)
        for tag,just in [("you_msg","right"),("player_msg","left"),("system_msg","left"),("news_msg","left")]:
            self.chat_text.tag_configure(tag,justify=just,font=F_BODY,foreground=TEXT)
        self.chat_text.tag_configure("spacer",foreground=TEXT,font=F_BODY)

        ih=tk.Frame(centre,bg=C_BG);ih.grid(row=2,column=0,sticky="ew",pady=(6,14),padx=16)
        ih.grid_columnconfigure(0,weight=1)
        pill=tk.Frame(ih,bg=I_BG,pady=6,padx=8);pill.grid(row=0,column=0,sticky="ew");pill.grid_columnconfigure(0,weight=1)
        pc=tk.Canvas(pill,bg=C_BG,height=54,highlightthickness=0,bd=0);pc.grid(row=0,column=0,columnspan=2,sticky="nsew")
        def _draw_pill(e=None):
            pc.delete("all");w=pc.winfo_width();h=pc.winfo_height();r=h//2
            pc.create_oval(0,0,h,h,fill=I_BG,outline="");pc.create_oval(w-h,0,w,h,fill=I_BG,outline="")
            pc.create_rectangle(r,0,w-r,h,fill=I_BG,outline="")
        pc.bind("<Configure>",_draw_pill)
        ef=tk.Frame(pc,bg=I_BG);ef.place(relx=0.0,rely=0.0,relwidth=0.78,relheight=1.0)
        self.entry=tk.Entry(ef,bg=I_BG,fg=TEXT,insertbackground=ACCENT,font=F_ENTRY,bd=0,highlightthickness=0,relief="flat")
        self.entry.pack(fill="both",expand=True,padx=18,pady=4)
        ba=tk.Frame(pc,bg=I_BG);ba.place(relx=0.78,rely=0.0,relwidth=0.22,relheight=1.0)
        CircleButton(ba,"↑",self.execute,size=36,bg_outer=I_BG).pack(side="left",padx=4,pady=5)
        CircleButton(ba,"🎤",self.speak_cmd,size=36,bg_outer=I_BG).pack(side="left",padx=4,pady=5)
        CircleButton(ba,"➤",self.start_hand_face_detection,size=36,bg_outer=I_BG).pack(side="left",padx=4,pady=5)

        right=tk.Frame(wrap,bg=BG);right.grid(row=0,column=2,sticky="nsew")
        right.grid_rowconfigure(0,weight=1);right.grid_rowconfigure(1,weight=1);right.grid_columnconfigure(0,weight=1)

        ct=tk.Frame(right,bg=PANEL);ct.grid(row=0,column=0,sticky="nsew",pady=(0,5),padx=(8,0))
        ct.grid_rowconfigure(2,weight=1);ct.grid_columnconfigure(0,weight=1)
        tk.Label(ct,text="STAT RADAR",bg=PANEL,fg=MUTED,font=("Consolas",8,"bold"),anchor="w",padx=12,pady=6).grid(row=0,column=0,sticky="ew")
        HSep(ct).grid(row=1,column=0,sticky="ew")
        rc=tk.Frame(ct,bg=RADAR_BG);rc.grid(row=2,column=0,sticky="nsew",padx=8,pady=8)
        rc.grid_rowconfigure(0,weight=1);rc.grid_columnconfigure(0,weight=1)
        self.radar_chart = RadarHexChart(rc)
        self.radar_chart.grid(row=0,column=0,sticky="nsew")
        def _sq_r(e): sz = min(e.width, e.height); self.radar_chart.config(width=sz, height=sz)
        rc.bind("<Configure>", _sq_r)
        # No dummy values – radar will load real scores automatically

        cb=tk.Frame(right,bg=PANEL);cb.grid(row=1,column=0,sticky="nsew",pady=(5,0),padx=(8,0))
        cb.grid_rowconfigure(2,weight=1);cb.grid_columnconfigure(0,weight=1)
        tk.Label(cb,text="WAVE VISUALIZER",bg=PANEL,fg=MUTED,font=("Consolas",8,"bold"),anchor="w",padx=12,pady=6).grid(row=0,column=0,sticky="ew")
        HSep(cb).grid(row=1,column=0,sticky="ew")
        wc=tk.Frame(cb,bg="#0a0a1a");wc.grid(row=2,column=0,sticky="nsew",padx=8,pady=8)
        wc.grid_rowconfigure(0,weight=1);wc.grid_columnconfigure(0,weight=1)
        self.wave_widget=SphericalWaveCanvas(wc);self.wave_widget.grid(row=0,column=0,sticky="nsew")
        def _sq_w(e):sz=min(e.width,e.height);self.wave_widget.config(width=sz,height=sz)
        wc.bind("<Configure>",_sq_w)

    def _ui(self,func): self.root.after(0,func)

    def _append_chat_raw(self,sender,text):
        sl=sender.lower()
        n,m=(("you_name","you_msg") if sl=="you" else
             ("player_name","player_msg") if sl=="player" else
             ("news_name","news_msg") if sl=="news" else
             ("system_name","system_msg"))
        def _append():
            self.chat_text.configure(state="normal")
            self.chat_text.insert("end",f"{sender}\n",n)
            for line in text.splitlines():self.chat_text.insert("end",f"{line}\n",m)
            self.chat_text.insert("end","\n","spacer");self.chat_text.see("end")
            self.chat_text.configure(state="disabled")
        self._ui(_append)

    def append_chat(self,sender,text):
        self._append_chat_raw(sender,text);self.add_message_to_current(sender,text)

    def start_hand_face_detection(self):
        def run():
            cap=cv2.VideoCapture(0);hands=mp_hands.Hands(min_detection_confidence=0.7,min_tracking_confidence=0.7)
            sw,sh=pyautogui.size();px=py=0;smooth=5;lc=0
            try:
                while cap.isOpened():
                    ret,frame=cap.read()
                    if not ret:break
                    frame=cv2.flip(frame,1);h,w,_=frame.shape
                    res=hands.process(cv2.cvtColor(frame,cv2.COLOR_BGR2RGB))
                    if res.multi_hand_landmarks:
                        for hl in res.multi_hand_landmarks:
                            it=hl.landmark[8];ib=hl.landmark[6];mt=hl.landmark[12];mb=hl.landmark[10]
                            x=int(it.x*w);y=int(it.y*h)
                            rx=np.interp(x,(100,w-100),(0,sw));ry=np.interp(y,(100,h-100),(0,sh))
                            cx2,cy2=cpp_smooth(px,py,rx,ry,smooth);pyautogui.moveTo(cx2,cy2);px,py=cx2,cy2
                            now=time.time()
                            if it.y>ib.y and now-lc>0.8:pyautogui.click();lc=now
                            if mt.y>mb.y and now-lc>0.8:pyautogui.rightClick();lc=now
                            mp_draw.draw_landmarks(frame,hl,mp_hands.HAND_CONNECTIONS)
                    cv2.imshow("Hand Control — Q to quit",frame)
                    if cv2.waitKey(1)&0xFF==ord("q"):break
            finally:cap.release();cv2.destroyAllWindows()
        threading.Thread(target=run,daemon=True).start()
        self.speak("Hand control started",self._cmd_token)

    def speak_cmd(self):
        def run():
            with sr.Microphone() as source:
                token=self._new_token();self.speak("Listening",token)
                try:
                    audio=recognizer.listen(source);cmd=recognizer.recognize_google(audio)
                    def upd():self.entry.delete(0,tk.END);self.entry.insert(0,cmd)
                    self._ui(upd);self.append_chat("You",cmd)
                    new_token=self._new_token()
                    threading.Thread(target=self.process_command,args=(cmd,new_token),daemon=True).start()
                except Exception:self.speak("Could not understand",self._cmd_token)
        threading.Thread(target=run,daemon=True).start()

if __name__=="__main__":
    print("Starting Player AI…")
    root=tk.Tk()
    app=VoiceAssistantGUI(root)
    print("GUI ready.")
    root.mainloop()