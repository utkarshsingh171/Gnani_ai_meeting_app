/**
 * Floating Tool Dock & Meeting Workspace
 */

(function () {
  if (document.getElementById('zoom-dock-host')) return;

  const host = document.createElement('div');
  host.id = 'zoom-dock-host';
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: 'closed' });

  // Exact Lucide SVGs matching the user's screenshot
  const ICONS = {
    grip: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1.5"/><circle cx="9" cy="5" r="1.5"/><circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="15" cy="5" r="1.5"/><circle cx="15" cy="19" r="1.5"/></svg>`,
    gripH: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="1.5"/><circle cx="5" cy="9" r="1.5"/><circle cx="19" cy="9" r="1.5"/><circle cx="12" cy="15" r="1.5"/><circle cx="5" cy="15" r="1.5"/><circle cx="19" cy="15" r="1.5"/></svg>`,
    pointer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m4 4 7.07 17 2.51-7.39L21 11.07z"/></svg>`,
    record: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3V21"></path><path d="M8 7V17"></path><path d="M4 11V13"></path><path d="M16 7V17"></path><path d="M20 11V13"></path></svg>`,
    hand: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3V21"/><path d="M8 7V17"/><path d="M4 11V13"/><path d="M16 7V17"/><path d="M20 11V13"/></svg>`,
    shapes: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="4"/></svg>`,
    summary: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10.5V13.5C18 16.7875 18 18.4312 17.092 19.5376C16.9258 19.7401 16.7401 19.9258 16.5376 20.092C15.4312 21 13.7875 21 10.5 21C7.21252 21 5.56878 21 4.46243 20.092C4.25989 19.9258 4.07418 19.7401 3.90796 19.5376C3 18.4312 3 16.7875 3 13.5V11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H12.5"></path><path d="M7 17H14"></path><path d="M7 13H11"></path><path d="M18.5 2.9375V4.5M18.5 4.5V6.0625M18.5 4.5H17.25M18.5 4.5H19.75M21 4.5L19.9156 4.13852C19.4179 3.97263 19.0274 3.58211 18.8615 3.08443L18.5 2L18.1385 3.08443C17.9726 3.58211 17.5821 3.97263 17.0844 4.13852L16 4.5L17.0844 4.86148C17.5821 5.02737 17.9726 5.41789 18.1385 5.91557L18.5 7L18.8615 5.91557C19.0274 5.41789 19.4179 5.02737 19.9156 4.86148L21 4.5Z"></path></svg>`,
    pen: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10.5V13.5C18 16.7875 18 18.4312 17.092 19.5376C16.9258 19.7401 16.7401 19.9258 16.5376 20.092C15.4312 21 13.7875 21 10.5 21C7.21252 21 5.56878 21 4.46243 20.092C4.25989 19.9258 4.07418 19.7401 3.90796 19.5376C3 18.4312 3 16.7875 3 13.5V11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H12.5"/><path d="M7 17H14"/><path d="M7 13H11"/><path d="M18.5 2.9375V4.5M18.5 4.5V6.0625M18.5 4.5H17.25M18.5 4.5H19.75M21 4.5L19.9156 4.13852C19.4179 3.97263 19.0274 3.58211 18.8615 3.08443L18.5 2L18.1385 3.08443C17.9726 3.58211 17.5821 3.97263 17.0844 4.13852L16 4.5L17.0844 4.86148C17.5821 5.02737 17.9726 5.41789 18.1385 5.91557L18.5 7L18.8615 5.91557C19.0274 5.41789 19.4179 5.02737 19.9156 4.86148L21 4.5Z"/></svg>`,
    text: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>`,
    comment: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
    scrollIndex: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h7"/><path d="M6 10h6"/><path d="M6 14h8"/><line x1="17" y1="5" x2="17" y2="19"/></svg>`,
    flyoutCorner: `<svg class="flyout-arrow" viewBox="0 0 5 5"><path d="M5 0V5H0Z" fill="currentColor"/></svg>`,
    pencil: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,
    trash: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
    arrowUp: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
    arrowDown: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
    play: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,
    pause: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
    close: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    send: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
    key: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.9969 13.5663L11.0019 13.5C10.6465 13.5097 10.3152 13.5226 10.0027 13.5379C6.30189 13.7193 3.28606 16.8058 3.00189 20.5002"></path><circle cx="11.0019" cy="6.5" r="4"></circle><path d="M15.5019 17V15.5C15.5019 14.3954 16.3973 13.5 17.5019 13.5C18.0542 13.5 18.5542 13.7239 18.9161 14.0858M15.5019 17H19.5019H20.0019C20.5542 17 21.0019 17.4477 21.0019 18V20.5C21.0019 21.0523 20.5542 21.5 20.0019 21.5H15.0019C14.4496 21.5 14.0019 21.0523 14.0019 20.5V18C14.0019 17.4477 14.4496 17 15.0019 17H15.5019Z"></path></svg>`,
    login: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.9969 13.5663L11.0019 13.5C10.6465 13.5097 10.3152 13.5226 10.0027 13.5379C6.30189 13.7193 3.28606 16.8058 3.00189 20.5002"></path><circle cx="11.0019" cy="6.5" r="4"></circle><path d="M15.5019 17V15.5C15.5019 14.3954 16.3973 13.5 17.5019 13.5C18.0542 13.5 18.5542 13.7239 18.9161 14.0858M15.5019 17H19.5019H20.0019C20.5542 17 21.0019 17.4477 21.0019 18V20.5C21.0019 21.0523 20.5542 21.5 20.0019 21.5H15.0019C14.4496 21.5 14.0019 21.0523 14.0019 20.5V18C14.0019 17.4477 14.4496 17 15.0019 17H15.5019Z"></path></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.9969 13.5663L11.0019 13.5C10.6465 13.5097 10.3152 13.5226 10.0027 13.5379C6.30189 13.7193 3.28606 16.8058 3.00189 20.5002"></path><circle cx="11.0019" cy="6.5" r="4"></circle><path d="M15.5019 17V15.5C15.5019 14.3954 16.3973 13.5 17.5019 13.5C18.0542 13.5 18.5542 13.7239 18.9161 14.0858M15.5019 17H19.5019H20.0019C20.5542 17 21.0019 17.4477 21.0019 18V20.5C21.0019 21.0523 20.5542 21.5 20.0019 21.5H15.0019C14.4496 21.5 14.0019 21.0523 14.0019 20.5V18C14.0019 17.4477 14.4496 17 15.0019 17H15.5019Z"></path></svg>`,
    github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
    google: `<svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>`,
    presentedLogo: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 18L10 6L14 14L17 8L20 18" stroke="#0ea5e9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="6" r="1.5" fill="#0284c7"/><circle cx="17" cy="8" r="1.5" fill="#0284c7"/></svg>`,
    minus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12H19"/></svg>`,
    minimize: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12H19"/></svg>`,
    expand: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 9l6-6m0 0h-5m5 0v5M9 15l-6 6m0 0h5m-5 0v-5"/></svg>`
  };

  // Tools in exact order matching the dock UI
  const DOCK_TOOLS = [
    {
      id: 'record',
      label: 'Live Audio Recording',
      icon: ICONS.record,
      shortcut: 'R',
      hasFlyout: true,
      tools: [
        { id: 'rec-live', label: 'Start / Stop · This tab + microphone' },
        { id: 'rec-system', label: 'Start / Stop · Pick a window or screen' },
        { id: 'rec-mic', label: 'Start / Stop · Microphone only' }
      ]
    },
    {
      id: 'shapes',
      label: 'Deliverables & Notes',
      icon: ICONS.shapes,
      hasFlyout: true,
      shortcut: 'M',
      tools: [
        { id: 'upload-audio', label: 'Upload Audio or Video' },
        { id: 'all-summary', label: 'Deliverables & Notes' },
      ]
    },
    { id: 'summary', label: 'Meeting Summary', icon: ICONS.summary, shortcut: 'S' },
    { id: 'scrollIndex', label: 'Meeting Transcript', icon: ICONS.scrollIndex, shortcut: 'T' },
    { id: 'auth', label: 'Login & API Keys', icon: ICONS.login, shortcut: 'K' }
  ];

  // ---------------------------------------------------------------------------
  // Settings storage
  // API keys live in chrome.storage.local: shared by every site the dock runs on (page
  // localStorage is per-origin, so a key saved on youtube.com used to be invisible on zoom.us)
  // and not readable by page scripts. preview.html has no extension APIs and falls back to
  // localStorage.
  // ---------------------------------------------------------------------------
  const HAS_EXT_RUNTIME = (function () {
    try { return Boolean(chrome && chrome.runtime && chrome.runtime.id); } catch (_) { return false; }
  })();
  const HAS_EXT_STORAGE = HAS_EXT_RUNTIME && Boolean(chrome.storage && chrome.storage.local);

  const settingsStore = {
    async get(keys) {
      if (HAS_EXT_STORAGE) {
        try { return await chrome.storage.local.get(keys); } catch (_) { return {}; }
      }
      const out = {};
      keys.forEach(k => { try { const v = localStorage.getItem(k); if (v !== null) out[k] = v; } catch (_) {} });
      return out;
    },
    async set(obj) {
      if (HAS_EXT_STORAGE) { await chrome.storage.local.set(obj); return; }
      Object.keys(obj).forEach(k => { try { localStorage.setItem(k, obj[k]); } catch (_) {} });
    },
    async remove(keys) {
      if (HAS_EXT_STORAGE) { await chrome.storage.local.remove(keys); return; }
      keys.forEach(k => { try { localStorage.removeItem(k); } catch (_) {} });
    }
  };

    // Prisma v3.0 accepts 1-4 comma-separated language hints, so Hindi + English works in one request.
  const GNANI_MODEL = 'prisma-v3.0';
  const GNANI_LANGUAGE_CODE = 'hi-IN,en-IN';
  const GNANI_FORMAT = 'codemix';
  const SETTINGS_KEYS = ['gnani_api_key', 'gemini_api_key', 'zmd_user_email'];

  let REAL_GNANI_KEY = '';
  let REAL_GEMINI_KEY = '';

  async function loadStoredSettings() {
    const saved = await settingsStore.get(SETTINGS_KEYS);

    // One-time migration: older versions kept the keys in the current page's localStorage.
    if (HAS_EXT_STORAGE) {
      const migrate = {};
      ['gnani_api_key', 'gemini_api_key'].forEach(k => {
        let legacy = '';
        try { legacy = localStorage.getItem(k) || ''; } catch (_) {}
        if (!legacy) return;
        if (!saved[k]) { saved[k] = legacy; migrate[k] = legacy; }
        try { localStorage.removeItem(k); } catch (_) {}
      });
      if (Object.keys(migrate).length) { try { await settingsStore.set(migrate); } catch (_) {} }
    }

    applyStoredSettings(saved);
  }

  function applyStoredSettings(saved) {
    REAL_GNANI_KEY = String(saved.gnani_api_key || '').trim();
    REAL_GEMINI_KEY = String(saved.gemini_api_key || '').trim();
    state.gnaniApiKey = REAL_GNANI_KEY;
    state.geminiApiKey = REAL_GEMINI_KEY;
    state.userEmail = String(saved.zmd_user_email || '').trim();
  }

  function initialKeyStatus(key) {
    return key ? { kind: 'saved', text: 'Saved' } : { kind: 'empty', text: 'Not set' };
  }

  const AUTH_ICONS = {
    eye: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    clipboard: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`,
    lock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`
  };

  // Tool Dock State (starts fresh with 0 placeholder data)
  let state = {
    edge: 'bottom', // 'bottom' | 'left' | 'top' | 'right'
    activeTool: 'record',
    flyoutOpenId: null, // 'record' | 'shapes' | null
    dockMinimized: false,
    modalOpen: false,
    scrollIndexModalOpen: false,
    authModalOpen: false,
    googleChooserOpen: false,
    authMode: 'signup', // 'signup' | 'login'
    userEmail: '',
    userName: '',
    authProvider: '',
    gnaniApiKey: '',
    geminiApiKey: '',
    isRecording: false,
    recordingMode: 'meeting', // 'live' | 'meeting' | 'mic'
    liveInterimText: '', // Live text streamed word-by-word
    timerId: null,
    memoryEnabled: true,
    undoItem: null,
    flashId: null,
    editingId: null,

    // Meeting Transcript Sections (starts empty for live speech)
    scrollSections: [],

    // Chat thread in Left column
    messages: [
      {
        id: 'msg-init',
        role: 'assistant',
        text: "Ready for your meeting. Click the Waveform button on the dock to record live audio, or upload an audio/video file."
      }
    ],

    // Memory Rows (starts empty for live recording)
    memories: [],

    suggestions: [
      "Summarize key decisions",
      "List attendee action items",
      "What are the next steps?"
    ]
  };

  // KokonutUI Synced Transcript State & Timing Constants
  const SPEEDS = [1, 1.5, 2];
  const WHITESPACE = /\s+/;

  // Times each segment from its word count, with a breath between speakers.
  function timed(lines) {
    const out = [];
    let t = 0.6;
    for (const [speaker, text] of lines) {
      const words = text.split(WHITESPACE).filter(Boolean).length;
      const end = t + words / 2.7;
      out.push({ speaker, start: t, end, text });
      t = end + 0.7;
    }
    return out;
  }

  function splitWords(segments) {
    if (!segments || segments.length === 0) return [];
    let index = 0;
    return segments.map((segment) => {
      const parts = segment.text.split(WHITESPACE).filter(Boolean);
      const total = parts.reduce((sum, w) => sum + w.length + 1, 0);
      let t = segment.start;
      return parts.map((text) => {
        const word = { text, start: t, index };
        t += ((text.length + 1) / total) * (segment.end - segment.start);
        index += 1;
        return word;
      });
    });
  }

  function formatTime(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  const syncedState = {
    title: "Meeting Transcript",
    segments: [],
    words: [],
    flat: [],
    duration: 0,
    time: 0,
    playing: false,
    speedIndex: 0,
    following: true,
    away: null, // null | 'up' | 'down'
    lastTop: null,
    activeWord: -1,
    rafId: null,
    lastTick: 0
  };

  function recalculateSyncedWords() {
    syncedState.words = splitWords(syncedState.segments);
    syncedState.flat = syncedState.words.flat();
    const lastSeg = syncedState.segments[syncedState.segments.length - 1];
    syncedState.duration = lastSeg ? Math.ceil(lastSeg.end + 0.6) : 0;
  }

  recalculateSyncedWords();

  // Inlined CSS for 100% self-contained instant rendering
  const styleEl = document.createElement('style');
  styleEl.textContent = `
:host {
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #f4f4f5;
  box-sizing: border-box;
  z-index: 2147483647;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Floating Dock Container */
.floating-dock-container {
  position: fixed;
  z-index: 10000;
  user-select: none;
  touch-action: none;
}

.edge-bottom {
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
}
.edge-top {
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
}
.edge-left {
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
}
.edge-right {
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
}

.floating-dock-body {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-radius: 14px;
  background: #18181b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px -6px rgba(0, 0, 0, 0.35), 0 12px 32px -8px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.floating-dock-body.vertical {
  flex-direction: column;
}

.dock-grip {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #71717a;
  cursor: grab;
  border-radius: 6px;
  transition: color 0.15s, background-color 0.15s;
  width: 20px;
  height: 36px;
  padding: 0;
}

.dock-grip:hover {
  color: #e4e4e7;
  background: rgba(255, 255, 255, 0.06);
}

.floating-dock-body.vertical .dock-grip {
  width: 36px;
  height: 20px;
}

.dock-divider {
  background: #27272a;
  flex-shrink: 0;
  width: 1px;
  height: 20px;
  margin: 0 2px;
}

.floating-dock-body.vertical .dock-divider {
  width: 20px;
  height: 1px;
  margin: 2px 0;
}

.dock-slot {
  position: relative;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dock-button {
  position: relative;
  z-index: 2;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  color: #a1a1aa;
  transition: color 0.15s ease-out, background-color 0.15s;
}

.dock-button svg:not(.flyout-arrow) {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.dock-button:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.06);
}

.dock-button.active {
  color: #18181b !important;
}

.active-plate {
  position: absolute;
  inset: 0;
  background: #ffffff;
  border-radius: 10px;
  z-index: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.dock-button .flyout-arrow,
.flyout-arrow {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 5px !important;
  height: 5px !important;
  z-index: 3;
  pointer-events: none;
  color: currentColor;
}

.dock-button.active .flyout-arrow {
  color: #18181b;
}

.floating-dock-body.minimized {
  padding: 4px;
  gap: 4px;
}

.dock-button.dock-minimize-btn {
  color: #71717a;
}

.dock-button.dock-minimize-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

.dock-button.dock-restore-btn {
  color: #a1a1aa;
}

.dock-button.dock-restore-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

.dock-pulse-dot {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 8px #ef4444;
  animation: pulse-dot 1s infinite alternate;
}

@keyframes pulse-dot {
  0% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 12px #ef4444; }
}

.dock-button.recording {
  color: #ef4444 !important;
  background: rgba(239, 68, 68, 0.15) !important;
}

.tip-bubble {
  position: absolute;
  z-index: 40;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  background: #f4f4f5;
  color: #18181b;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 500;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.tip-kbd {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 9px;
  padding: 1px 4px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  opacity: 0.8;
}

.tip-top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.flyout-menu {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  width: 230px;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 50;
}

.edge-top .flyout-menu {
  bottom: auto;
  top: calc(100% + 12px);
}
.edge-left .flyout-menu {
  bottom: auto;
  left: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
}
.edge-right .flyout-menu {
  bottom: auto;
  right: calc(100% + 12px);
  left: auto;
  top: 50%;
  transform: translateY(-50%);
}

.hidden {
  display: none !important;
}

.flyout-menu.hidden {
  display: none !important;
}

.flyout-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #a1a1aa;
  font-size: 12.5px;
  cursor: pointer;
  text-align: left;
}

.flyout-item:hover {
  background: #27272a;
  color: #f4f4f5;
}

/* Deliverables & Notes Modal */
.memory-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.memory-backdrop.hidden {
  display: none;
}

.memory-card {
  width: 100%;
  max-width: 720px;
  height: 560px;
  max-height: calc(100vh - 40px);
  background: #18181b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.memory-chat-col {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-height: 0;
  max-height: 100%;
  background: #18181b;
  overflow: hidden;
}

.memory-header {
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #27272a;
}

.memory-title {
  font-size: 13px;
  font-weight: 600;
  color: #f4f4f5;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-btn {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #a1a1aa;
  border-radius: 4px;
  cursor: pointer;
}

.icon-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.chat-thread {
  flex: 1 1 0%;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.chat-thread::-webkit-scrollbar {
  width: 6px;
}

.chat-thread::-webkit-scrollbar-track {
  background: transparent;
}

.chat-thread::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}

.chat-thread::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.35);
}

.chat-user {
  align-self: flex-end;
  max-width: 85%;
  background: #27272a;
  color: #f4f4f5;
  padding: 8px 14px;
  border-radius: 16px 16px 4px 16px;
  font-size: 13px;
  line-height: 1.45;
}

.chat-assistant {
  align-self: flex-start;
  max-width: 95%;
  font-size: 13px;
  color: #e4e4e7;
  line-height: 1.55;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.gemini-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.25);
  padding: 2px 8px;
  border-radius: 9999px;
  letter-spacing: -0.01em;
}

.gemini-sparkle {
  color: #60a5fa;
  font-size: 11px;
  display: inline-block;
  animation: geminiPulse 2s infinite ease-in-out;
}

@keyframes geminiPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.15); }
}

.chat-message-content {
  font-size: 13px;
  line-height: 1.55;
}

.chat-message-content p {
  margin: 0 0 6px 0;
  white-space: pre-wrap;
}

.chat-message-content p:last-child {
  margin-bottom: 0;
}

/* KokonutUI AI Text Loading */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@keyframes kokonut-ai-wave {
  50% { opacity: 0.3; }
}

.kokonut-ai-wave {
  display: inline-block;
  animation: kokonut-ai-wave 1.6s ease-in-out infinite both;
}

@media (prefers-reduced-motion: reduce) {
  .kokonut-ai-wave {
    animation: none;
  }
}

.kokonut-ai-loading {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: #f4f4f5;
  margin: 4px 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.kokonut-ai-word {
  display: inline-flex;
  align-items: baseline;
  font-size: 15px;
  font-weight: 600;
  color: #f4f4f5;
  letter-spacing: -0.01em;
  white-space: pre;
  transition: opacity 0.15s cubic-bezier(0.23, 1, 0.32, 1),
              transform 0.15s cubic-bezier(0.23, 1, 0.32, 1),
              filter 0.15s cubic-bezier(0.23, 1, 0.32, 1);
}

.kokonut-ai-word.exit {
  opacity: 0;
  transform: translateY(-6px);
  filter: blur(3px);
}

.kokonut-ai-letter {
  display: inline-block;
  opacity: 1;
  transform: translateY(0);
  filter: blur(0px);
  transition: opacity 0.28s cubic-bezier(0.23, 1, 0.32, 1),
              transform 0.28s cubic-bezier(0.23, 1, 0.32, 1),
              filter 0.28s cubic-bezier(0.23, 1, 0.32, 1);
}

.kokonut-ai-letter.enter {
  opacity: 0;
  transform: translateY(8px);
  filter: blur(4px);
}

.kokonut-ai-elapsed {
  font-size: 12px;
  font-weight: 500;
  color: #a1a1aa;
  font-variant-numeric: tabular-nums;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-left: 2px;
}

.bookmark-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  color: #a1a1aa;
  padding: 2px 6px;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  border: none;
}

.bookmark-tag:hover {
  color: #ffffff;
}

.chat-footer {
  flex-shrink: 0;
  padding: 10px 14px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #18181b;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  height: 26px;
  padding: 0 10px;
  border-radius: 9999px;
  font-size: 11.5px;
  color: #d4d4d8;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  cursor: pointer;
  transition: all 0.15s;
}

.chip:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.chat-form {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  background: rgba(39, 39, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 4px 6px 4px 12px;
}

.chat-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 13px;
  color: #f4f4f5;
  outline: none;
}

.chat-submit-btn {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #ffffff;
  color: #18181b;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ==========================================================================
   KokonutUI Synced Transcript Styles
   ========================================================================== */
.synced-transcript-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.synced-transcript-backdrop.hidden {
  display: none !important;
}

.synced-transcript-card {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: #09090b;
  color: #f4f4f5;
  border: 1px solid #27272a;
  border-radius: 24px;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9);
  overflow: hidden;
  user-select: none;
  display: flex;
  flex-direction: column;
}

.synced-transcript-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 20px 14px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.synced-header-meta {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.synced-header-subtitle {
  font-size: 11px;
  color: #71717a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.synced-header-title {
  font-size: 14px;
  font-weight: 600;
  color: #f4f4f5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.synced-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.synced-speed-btn {
  height: 28px;
  border-radius: 9999px;
  border: 1px solid #27272a;
  background: transparent;
  padding: 0 10px;
  font-size: 11.5px;
  font-weight: 500;
  color: #f4f4f5;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  outline: none;
  transition: background-color 0.15s ease-out, border-color 0.15s ease-out;
}

.synced-speed-btn:hover {
  background: #18181b;
  border-color: #3f3f46;
}

.synced-body-wrapper {
  position: relative;
  overflow: hidden;
}

.synced-scroll-box {
  height: 380px;
  overflow-y: auto;
  padding: 24px 20px;
  outline: none;
  scrollbar-width: none;
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 24px, black calc(100% - 24px), transparent);
  mask-image: linear-gradient(to bottom, transparent, black 24px, black calc(100% - 24px), transparent);
}

.synced-scroll-box::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.synced-content-isolate {
  position: relative;
  isolation: isolate;
}

.synced-mark-highlight {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  opacity: 0;
  will-change: transform, width;
}

.synced-segment {
  margin-top: 20px;
}
.synced-segment:first-of-type {
  margin-top: 0;
}

.synced-speaker-row {
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.synced-avatar-badge {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #27272a;
  color: #d4d4d8;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.synced-speaker-name {
  font-weight: 500;
  color: #f4f4f5;
  font-size: 12.5px;
}

.synced-time-btn {
  border: none;
  background: transparent;
  color: #71717a;
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  padding: 0 4px;
  border-radius: 4px;
  transition: color 0.15s ease-out;
}

.synced-time-btn:hover {
  color: #f4f4f5;
}

.synced-paragraph-btn {
  display: block;
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 15px;
  line-height: 1.75;
  cursor: pointer;
  padding: 0;
  outline: none;
}

.transcript-word {
  display: inline;
  transition: color 150ms ease-out;
  cursor: pointer;
  border-radius: 4px;
}

.transcript-word.spoken {
  color: #f4f4f5;
}

.transcript-word.upcoming {
  color: #52525b;
}

.transcript-word:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Floating "Back to now" Pill */
.synced-back-to-now {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 9999px;
  background: #f4f4f5;
  color: #09090b;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms cubic-bezier(0.23, 1, 0.32, 1), transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 20;
}

.synced-back-to-now.visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

.synced-back-to-now svg {
  width: 14px;
  height: 14px;
}

/* ==========================================================================
   Login / Account & API Key Modal Styles (Split Hero & Form Layout)
   ========================================================================== */
.auth-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 10002;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.auth-backdrop.hidden {
  display: none !important;
}

.auth-card {
  position: relative;
  width: 100%;
  max-width: 820px;
  min-height: 520px;
  border-radius: 24px;
  background: #ffffff;
  color: #09090b;
  box-shadow: 0 35px 80px -15px rgba(0, 0, 0, 0.9);
  overflow: hidden;
  display: flex;
  user-select: none;
  animation: authScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes authScaleIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Left Hero Column: Dark Silky Curves & Testimonial */
.auth-left-hero {
  width: 46%;
  background: #000000;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 44px 36px;
  overflow: hidden;
  flex-shrink: 0;
}

.auth-hero-graphics {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.auth-hero-graphics svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.auth-quote-box {
  position: relative;
  z-index: 5;
}

.auth-quote-text {
  font-size: 13.5px;
  line-height: 1.6;
  color: #e4e4e7;
  font-weight: 400;
  margin-bottom: 12px;
  letter-spacing: -0.1px;
}

.auth-quote-author {
  font-size: 13px;
  font-weight: 600;
  color: #a1a1aa;
  display: block;
}

/* Right Column: Clean White Form */
.auth-right-panel {
  width: 54%;
  background: #ffffff;
  color: #09090b;
  padding: 36px 44px 28px 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  min-height: 520px;
}

.auth-top-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  width: 100%;
}

.auth-switch-link {
  font-size: 13px;
  font-weight: 600;
  color: #09090b;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  transition: color 0.15s, background-color 0.15s;
}

.auth-switch-link:hover {
  background: #f4f4f5;
}

.auth-close-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #71717a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}

.auth-close-btn:hover {
  background: #f4f4f5;
  color: #09090b;
}

.auth-form-center {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}

.auth-heading-group {
  text-align: center;
  margin-bottom: 22px;
}

.auth-title {
  font-size: 21px;
  font-weight: 700;
  color: #09090b;
  letter-spacing: -0.4px;
  margin-bottom: 6px;
}

.auth-subtitle {
  font-size: 12.5px;
  color: #71717a;
  line-height: 1.4;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.auth-field-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.auth-input {
  height: 38px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e4e4e7;
  background: #ffffff;
  padding: 0 12px;
  font-size: 13px;
  color: #09090b;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}

.auth-input::placeholder {
  color: #a1a1aa;
}

.auth-input:focus {
  border-color: #09090b;
  box-shadow: 0 0 0 1px #09090b;
}

.auth-key-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.auth-input.auth-input-key {
  padding-right: 104px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
}

.auth-key-clear {
  position: absolute;
  right: 76px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #a1a1aa;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  padding: 3px 5px;
  border-radius: 4px;
  transition: color 0.15s, background-color 0.15s;
}

.auth-key-clear:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.auth-key-badge {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #f4f4f5;
  color: #71717a;
  border: 1px solid #e4e4e7;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 5px;
  pointer-events: none;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.auth-key-badge-gemini {
  background: #eff6ff;
  color: #2563eb;
  border-color: #bfdbfe;
}

.auth-submit-btn {
  height: 38px;
  width: 100%;
  border-radius: 8px;
  background: #18181b;
  color: #f4f4f5;
  font-size: 13.5px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-top: 2px;
  transition: background-color 0.15s, transform 0.08s;
  outline: none;
}

.auth-submit-btn:hover {
  background: #27272a;
}

.auth-submit-btn:active {
  transform: scale(0.99);
}

.auth-separator {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0 14px 0;
}

.auth-separator-line {
  flex: 1;
  height: 1px;
  background: #e4e4e7;
}

.auth-separator-text {
  font-size: 10px;
  font-weight: 600;
  color: #71717a;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.auth-social-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.auth-social-btn {
  height: 38px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e4e4e7;
  background: #ffffff;
  color: #09090b;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;
}

.auth-social-btn:hover {
  background: #f4f4f5;
  border-color: #d4d4d8;
}

.auth-legal {
  font-size: 11px;
  color: #71717a;
  text-align: center;
  margin-top: 16px;
  line-height: 1.5;
}

.auth-legal-link {
  color: #71717a;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.auth-legal-link:hover {
  color: #09090b;
}

.auth-bottom-branding {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  padding-top: 12px;
}

.auth-brand-text {
  font-size: 11px;
  font-weight: 600;
  color: #71717a;
  letter-spacing: 0.2px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.auth-brand-text::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3b82f6;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
}

/* Google Sign-in Account Chooser Modal */
.google-chooser-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2147483647;
  padding: 16px;
  animation: authFadeIn 0.15s ease-out;
}

.google-chooser-card {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  color: #1f1f1f;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  padding: 24px;
  font-family: "Google Sans", Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
  animation: authScaleIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

.google-chooser-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.google-chooser-title {
  font-size: 18px;
  font-weight: 500;
  color: #1f1f1f;
  margin-top: 8px;
}

.google-chooser-subtitle {
  font-size: 13px;
  color: #5f6368;
  margin-top: 2px;
}

.google-account-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;
}

.google-account-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  text-align: left;
  width: 100%;
  outline: none;
}

.google-account-item:hover {
  background: #f8f9fa;
  border-color: #dadce0;
}

.google-avatar-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #1a73e8;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.google-account-details {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.google-account-name {
  font-size: 13.5px;
  font-weight: 500;
  color: #202124;
}

.google-account-email {
  font-size: 12px;
  color: #5f6368;
}

.google-custom-email-row {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.google-custom-input {
  flex: 1;
  height: 36px;
  border: 1px solid #dadce0;
  border-radius: 6px;
  padding: 0 10px;
  font-size: 13px;
  color: #202124;
  outline: none;
}

.google-custom-input:focus {
  border-color: #1a73e8;
  box-shadow: 0 0 0 1px #1a73e8;
}

.google-custom-btn {
  height: 36px;
  padding: 0 14px;
  background: #1a73e8;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.google-custom-btn:hover {
  background: #1557b0;
}

.google-chooser-footer {
  font-size: 11.5px;
  color: #70757a;
  text-align: center;
  margin-top: 14px;
  line-height: 1.4;
}

@media (max-width: 720px) {
  .auth-card {
    flex-direction: column;
    max-width: 400px;
    min-height: auto;
  }
  .auth-left-hero {
    display: none;
  }
  .auth-right-panel {
    width: 100%;
    padding: 28px 24px 20px 24px;
    min-height: auto;
  }
}

/* ==========================================================================
   Setup / API keys panel (v1.1)
   ========================================================================== */
.auth-card {
  max-width: 900px;
  min-height: 0;
  max-height: min(700px, calc(100vh - 48px));
}

.auth-right-panel {
  padding: 18px 34px 18px 34px;
  justify-content: flex-start;
  overflow-y: auto;
  min-height: 0;
  gap: 10px;
}

.auth-top-nav {
  justify-content: space-between;
}

.auth-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #71717a;
}

.auth-form-center {
  max-width: 400px;
}

.auth-heading-group {
  text-align: left;
  margin-bottom: 16px;
}

.auth-title {
  font-size: 22px;
  margin: 0 0 4px 0;
}

.auth-subtitle {
  margin: 0;
}

.auth-form {
  gap: 12px;
}

.auth-input {
  user-select: text;
  -webkit-user-select: text;
}

/* Hero copy */
.auth-hero-kicker {
  margin: 0 0 6px 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.9px;
  text-transform: uppercase;
  color: #a1a1aa;
}

.auth-hero-title {
  margin: 0 0 18px 0;
  font-size: 20px;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: #fafafa;
}

.auth-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.auth-steps li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.auth-steps li > span {
  flex: 0 0 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fafafa;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-steps strong {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #f4f4f5;
}

.auth-steps small {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  line-height: 1.4;
  color: #a1a1aa;
}

/* Key cards */
.key-card {
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  background: #fafafa;
  padding: 12px 12px 10px 12px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.key-card:focus-within {
  border-color: #18181b;
  box-shadow: 0 0 0 3px rgba(24, 24, 27, 0.08);
}

.key-card-plain {
  background: #ffffff;
}

.key-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.key-card-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 600;
  color: #18181b;
}

.key-step {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #18181b;
  color: #fafafa;
  font-size: 10.5px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.key-optional {
  font-size: 10.5px;
  font-weight: 600;
  color: #a1a1aa;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.key-input-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.key-input-row .auth-input {
  flex: 1;
  min-width: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
}

.key-icon-btn {
  flex: 0 0 38px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid #e4e4e7;
  background: #ffffff;
  color: #52525b;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s, border-color 0.15s;
}

.key-icon-btn:hover {
  background: #f4f4f5;
  color: #18181b;
}

.key-icon-btn.active {
  background: #18181b;
  border-color: #18181b;
  color: #fafafa;
}

.key-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
}

.key-help {
  font-size: 11.5px;
  line-height: 1.4;
  color: #71717a;
}

.key-help code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  background: #f4f4f5;
  border-radius: 4px;
  padding: 0 4px;
  color: #3f3f46;
}

.key-actions {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.key-link-btn {
  border: none;
  background: transparent;
  font-size: 12px;
  font-weight: 600;
  color: #2563eb;
  padding: 3px 7px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.15s;
}

.key-link-btn:hover {
  background: #eff6ff;
}

.key-link-btn.danger {
  color: #71717a;
}

.key-link-btn.danger:hover {
  background: #fef2f2;
  color: #dc2626;
}

.key-link-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

/* Status pills */
.key-status {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.2px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid transparent;
  white-space: nowrap;
}

.key-status[data-kind="empty"]   { background: #f4f4f5; color: #71717a; border-color: #e4e4e7; }
.key-status[data-kind="saved"]   { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
.key-status[data-kind="unsaved"] { background: #fffbeb; color: #b45309; border-color: #fde68a; }
.key-status[data-kind="testing"] { background: #f4f4f5; color: #52525b; border-color: #e4e4e7; animation: keyPulse 1s ease-in-out infinite; }
.key-status[data-kind="ok"]      { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
.key-status[data-kind="bad"]     { background: #fef2f2; color: #b91c1c; border-color: #fecaca; }

@keyframes keyPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

.key-msg {
  margin: 0;
  font-size: 11.5px;
  line-height: 1.4;
  min-height: 0;
  user-select: text;
  -webkit-user-select: text;
}

.key-msg:not(:empty) {
  margin-top: 6px;
}

.key-msg[data-kind="ok"]      { color: #15803d; }
.key-msg[data-kind="bad"]     { color: #b91c1c; }
.key-msg[data-kind="unsaved"] { color: #b45309; }
.key-msg[data-kind="empty"],
.key-msg[data-kind="saved"],
.key-msg[data-kind="testing"] { color: #71717a; }

.auth-privacy {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin: 12px 0 0 0;
  font-size: 11.5px;
  line-height: 1.45;
  color: #71717a;
}

.auth-privacy svg {
  flex: 0 0 auto;
  margin-top: 2px;
}

.auth-legal {
  text-align: left;
  margin-top: 6px;
}

@media (max-width: 720px) {
  .auth-right-panel {
    padding: 18px 18px 16px 18px;
  }
  .auth-form-center {
    max-width: none;
  }
}
`;

  shadow.appendChild(styleEl);

  const appRoot = document.createElement('div');
  shadow.appendChild(appRoot);

  // Renders KokonutUI Synced Transcript Segments & Words
  function renderSyncedSegmentsHTML() {
    if (!syncedState.segments || syncedState.segments.length === 0) {
      return `
        <div style="text-align: center; padding: 72px 20px; color: #71717a;">
          <div style="font-size: 28px; margin-bottom: 12px; opacity: 0.6;">🎙️</div>
          <p style="font-size: 14px; font-weight: 500; margin-bottom: 6px; color: #a1a1aa;">No transcript recorded yet</p>
          <p style="font-size: 12px; line-height: 1.55; max-width: 320px; margin: 0 auto; color: #71717a;">Start the meeting STT and speak. The transcript is kept only for this active session.</p>
        </div>
      `;
    }
    const active = syncedState.activeWord;
    return syncedState.segments.map((segment, sIdx) => {
      const segWords = syncedState.words[sIdx] || [];
      const speakerInitial = segment.speaker.charAt(0).toUpperCase();
      return `
        <section class="synced-segment" data-segment-idx="${sIdx}">
          <div class="synced-speaker-row">
            <span class="synced-avatar-badge">${speakerInitial}</span>
            <span class="synced-speaker-name">${escapeHtml(segment.speaker)}</span>
            <button class="synced-time-btn" data-time="${segment.start.toFixed(2)}" title="Seek to ${formatTime(segment.start)}" type="button">
              ${formatTime(segment.start)}
            </button>
          </div>
          <div class="synced-paragraph-btn" data-segment-idx="${sIdx}">
            ${segWords.map(word => {
              const isSpoken = word.index <= active;
              return `<span class="transcript-word ${isSpoken ? 'spoken' : 'upcoming'}" data-index="${word.index}" data-time="${word.start.toFixed(2)}" title="${formatTime(word.start)}">${escapeHtml(word.text)} </span>`;
            }).join('')}
          </div>
        </section>
      `;
    }).join('');
  }

  // Chat text formatter supporting bold, italics, headers, and pre-wrap
  function formatChatContent(rawText) {
    if (!rawText) return '';
    const safe = escapeHtml(rawText)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/^### (.*$)/gim, '<div style="font-weight:600;font-size:13px;margin:5px 0 2px 0;color:#f4f4f5;">$1</div>')
      .replace(/^## (.*$)/gim, '<div style="font-weight:700;font-size:13.5px;margin:7px 0 3px 0;color:#f4f4f5;">$1</div>')
      .replace(/^# (.*$)/gim, '<div style="font-weight:700;font-size:14px;margin:8px 0 4px 0;color:#f4f4f5;">$1</div>');
    return `<div class="chat-message-content"><p>${safe}</p></div>`;
  }

  // KokonutUI AI Text Loading Controller
  const KOKONUT_AI_TEXTS = [
    "Thinking...",
    "Processing...",
    "Analyzing...",
    "Computing...",
    "Almost..."
  ];
  const KOKONUT_WAVE_STEP = 0.07;

  let aiLoadingState = {
    active: false,
    textIndex: 0,
    seconds: 0,
    startedAt: 0,
    secTimer: null,
    wordTimer: null
  };

  function renderKokonutAILoadingHTML() {
    const textIndex = aiLoadingState.textIndex % KOKONUT_AI_TEXTS.length;
    const currentWord = KOKONUT_AI_TEXTS[textIndex];
    const elapsed = aiLoadingState.seconds;

    const lettersHtml = Array.from(currentWord).map((char, i) => {
      const isSpace = char === ' ';
      return `<span class="kokonut-ai-letter" style="transition-delay: ${i * 0.018}s;"><span class="kokonut-ai-wave" style="animation-delay: ${i * KOKONUT_WAVE_STEP}s;">${isSpace ? '&nbsp;' : escapeHtml(char)}</span></span>`;
    }).join('');

    return `
      <output aria-live="polite" class="kokonut-ai-loading" id="kokonut-ai-loading">
        <span class="sr-only">Loading</span>
        <span class="gemini-sparkle">✦</span>
        <span class="kokonut-ai-word" id="kokonut-ai-word">
          ${lettersHtml}
        </span>
        <span class="kokonut-ai-elapsed" id="kokonut-ai-elapsed" aria-hidden="true">${elapsed}s</span>
      </output>
    `;
  }

  function startAILoading() {
    stopAILoading();
    aiLoadingState.active = true;
    aiLoadingState.textIndex = 0;
    aiLoadingState.seconds = 0;
    aiLoadingState.startedAt = Date.now();

    // 1. Elapsed Seconds Timer (updates every 500ms)
    aiLoadingState.secTimer = setInterval(() => {
      if (!aiLoadingState.active) {
        clearInterval(aiLoadingState.secTimer);
        return;
      }
      const secs = Math.floor((Date.now() - aiLoadingState.startedAt) / 1000);
      if (secs !== aiLoadingState.seconds) {
        aiLoadingState.seconds = secs;
        const elapsedEl = shadow.getElementById('kokonut-ai-elapsed');
        if (elapsedEl) {
          elapsedEl.textContent = `${secs}s`;
        }
      }
    }, 500);

    // 2. Cycling Words Timer (cycles every 1500ms with exit & enter transitions)
    aiLoadingState.wordTimer = setInterval(() => {
      if (!aiLoadingState.active) {
        clearInterval(aiLoadingState.wordTimer);
        return;
      }
      const wordEl = shadow.getElementById('kokonut-ai-word');
      if (wordEl) {
        wordEl.classList.add('exit');

        setTimeout(() => {
          if (!aiLoadingState.active) return;
          aiLoadingState.textIndex = (aiLoadingState.textIndex + 1) % KOKONUT_AI_TEXTS.length;
          const nextWord = KOKONUT_AI_TEXTS[aiLoadingState.textIndex];

          wordEl.innerHTML = Array.from(nextWord).map((char, i) => {
            const isSpace = char === ' ';
            return `<span class="kokonut-ai-letter enter" style="transition-delay: ${i * 0.018}s;"><span class="kokonut-ai-wave" style="animation-delay: ${i * KOKONUT_WAVE_STEP}s;">${isSpace ? '&nbsp;' : escapeHtml(char)}</span></span>`;
          }).join('');

          wordEl.classList.remove('exit');
          void wordEl.offsetWidth; // Force reflow
          wordEl.querySelectorAll('.kokonut-ai-letter').forEach(l => l.classList.remove('enter'));
        }, 150);
      }
    }, 1500);
  }

  function stopAILoading() {
    aiLoadingState.active = false;
    if (aiLoadingState.secTimer) {
      clearInterval(aiLoadingState.secTimer);
      aiLoadingState.secTimer = null;
    }
    if (aiLoadingState.wordTimer) {
      clearInterval(aiLoadingState.wordTimer);
      aiLoadingState.wordTimer = null;
    }
  }

  // Render Tool Dock & Modals
  function render() {
    const isVertical = state.edge === 'left' || state.edge === 'right';
    const edgeClass = `edge-${state.edge}`;

    appRoot.innerHTML = `
      <!-- Floating Tool Dock -->
      <div class="floating-dock-container ${edgeClass} ${state.dockMinimized ? 'is-minimized' : ''}" id="dock-container">
        ${state.dockMinimized ? `
          <div class="floating-dock-body minimized ${isVertical ? 'vertical' : ''}" role="toolbar">
            <!-- 6-dot Drag Handle Grip -->
            <button class="dock-grip" id="dock-grip" title="Drag dock, or click to rotate edge">
              ${isVertical ? ICONS.gripH : ICONS.grip}
            </button>
            <div class="dock-divider"></div>
            <!-- Restore / Expand Button -->
            <div class="dock-slot" data-id="dock-restore">
              <button
                class="dock-button dock-restore-btn ${state.isRecording ? 'recording' : ''}"
                id="btn-dock-restore"
                aria-label="Expand Dock"
                title="Expand Dock"
              >
                ${ICONS.expand}
                ${state.isRecording ? `<span class="dock-pulse-dot" style="top:4px; right:4px;"></span>` : ''}
              </button>
            </div>
          </div>
        ` : `
          <div class="floating-dock-body ${isVertical ? 'vertical' : ''}" role="toolbar">
            <!-- 6-dot Drag Handle Grip -->
            <button class="dock-grip" id="dock-grip" title="Drag to dock, or click to rotate edge">
              ${isVertical ? ICONS.gripH : ICONS.grip}
            </button>
            <div class="dock-divider"></div>

            <!-- Tools -->
            ${DOCK_TOOLS.map(tool => {
              const isActive = state.activeTool === tool.id;
              return `
                <div class="dock-slot" data-id="${tool.id}">
                  ${isActive ? `<span class="active-plate"></span>` : ''}
                  <button
                    class="dock-button ${isActive ? 'active' : ''} ${(tool.id === 'record' || tool.id === 'hand') && state.isRecording ? 'recording' : ''}"
                    data-tool="${tool.id}"
                    aria-label="${tool.label}"
                  >
                    ${tool.icon}
                    ${tool.hasFlyout ? ICONS.flyoutCorner : ''}
                    ${(tool.id === 'record' || tool.id === 'hand') && state.isRecording ? `<span class="dock-pulse-dot"></span>` : ''}
                  </button>

                  <!-- Flyout Popover on Tool -->
                  ${tool.hasFlyout ? `
                    <div class="flyout-menu ${state.flyoutOpenId === tool.id ? '' : 'hidden'}" id="flyout-menu-${tool.id}">
                      ${tool.tools.map(sub => `
                        <button class="flyout-item" data-sub="${sub.id}" data-parent="${tool.id}">
                          <span>•</span>
                          <span>${sub.label}</span>
                        </button>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}

            <div class="dock-divider"></div>

            <!-- Minimize Button -->
            <div class="dock-slot" data-id="dock-minimize">
              <button
                class="dock-button dock-minimize-btn"
                id="btn-dock-minimize"
                aria-label="Minimize Dock"
                title="Minimize Dock"
              >
                ${ICONS.minimize}
              </button>
            </div>
          </div>
        `}

        <!-- Tooltip Bubble (TipBubble) -->
        <div class="tip-bubble tip-top" id="tip-bubble" style="opacity: 0; pointer-events: none;">
          <span id="tip-text">Select</span>
          <kbd class="tip-kbd" id="tip-kbd">V</kbd>
        </div>
      </div>

      <!-- Deliverables & Notes Window -->
      <div class="memory-backdrop ${state.modalOpen ? '' : 'hidden'}" id="modal-backdrop">
        <div class="memory-card">
          <!-- Left Column: Chat & Discussion Stream -->
          <section class="memory-chat-col">
            <header class="memory-header">
              <h3 class="memory-title">
                ${ICONS.comment}
                <span>Meeting Summary & Q&A</span>
              </h3>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span class="gemini-badge"><span class="gemini-sparkle">✦</span> Gemini</span>
                <button class="icon-btn" id="btn-email-report" title="Email meeting report">✉</button>
                <button class="icon-btn" id="btn-minimize-modal" title="Minimize Window">${ICONS.minus}</button>
                <button class="icon-btn" id="btn-close-modal" title="Close Window">${ICONS.close}</button>
              </div>
            </header>

            <div class="chat-thread" id="chat-thread">
              ${state.messages.map(msg => {
                if (msg.isLoading) {
                  return `
                    <div class="chat-assistant">
                      ${renderKokonutAILoadingHTML()}
                    </div>
                  `;
                }
                return `
                  <div class="${msg.role === 'user' ? 'chat-user' : 'chat-assistant'}">
                    ${formatChatContent(msg.text)}
                    ${msg.saved ? `
                      <button class="bookmark-tag" data-mem="${msg.saved}" title="Click to view in memory">
                        ${ICONS.shapes}
                        <span>Saved to memory · ${escapeHtml(msg.savedText || '')}</span>
                      </button>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>

            <div class="chat-footer">
              <div class="chips-row">
                ${state.suggestions.map(s => `
                  <button class="chip" data-suggest="${escapeHtml(s)}">${escapeHtml(s)}</button>
                `).join('')}
              </div>

              <form class="chat-form" id="chat-form">
                <input
                  type="text"
                  class="chat-input"
                  id="chat-input"
                  placeholder="Tell it to adjust a task, add a deadline, or summarize..."
                  autocomplete="off"
                />
                <button type="submit" class="chat-submit-btn" id="btn-chat-send">${ICONS.arrowUp}</button>
              </form>
            </div>
          </section>
        </div>
      </div>

      <!-- Meeting Transcript Window (KokonutUI Synced Transcript) -->
      <div class="synced-transcript-backdrop ${state.scrollIndexModalOpen ? '' : 'hidden'}" id="scroll-index-backdrop">
        <div class="synced-transcript-card" role="region" aria-label="Meeting Transcript">
          <!-- Top Header -->
          <header class="synced-transcript-header">
            <div class="synced-header-meta">
              <span class="synced-header-subtitle">Transcript</span>
              <h3 class="synced-header-title">${escapeHtml(syncedState.title)}</h3>
            </div>
            <div class="synced-header-actions">
              <button class="synced-speed-btn" id="btn-synced-speed" title="Playback speed" type="button">
                ${SPEEDS[syncedState.speedIndex]}×
              </button>
              <button class="icon-btn" id="btn-minimize-scroll-index" title="Minimize Transcript" type="button">
                ${ICONS.minus}
              </button>
              <button class="icon-btn" id="btn-close-scroll-index" title="Close Transcript" type="button">
                ${ICONS.close}
              </button>
            </div>
          </header>

          <!-- Middle Scrollable Body with Top/Bottom Gradient Fade Mask -->
          <div class="synced-body-wrapper">
            <div class="synced-scroll-box" id="transcript-scroll-box" tabindex="0">
              <div class="synced-content-isolate" id="transcript-content-isolate">
                <!-- Sliding highlight mark behind active word -->
                <div class="synced-mark-highlight" id="transcript-mark" aria-hidden="true"></div>

                <!-- Segments Container -->
                <div class="synced-segments-container" id="transcript-segments-container">
                  ${renderSyncedSegmentsHTML()}
                </div>

                <!-- Live Interim Typing Box (When recording) -->
                <div id="live-interim-box" class="live-interim-box ${state.liveInterimText || state.isRecording ? '' : 'hidden'}" style="margin-top: 16px;">
                  <p class="transcript-p interim-live" style="font-size: 13.5px; color: #a1a1aa;">
                    <span class="transcript-time" style="color: #ef4444; font-weight: 600;">[Live]</span>
                    <span class="transcript-speaker" style="color: #f4f4f5; font-weight: 500;">Listening:</span>
                    <span class="interim-text" id="interim-text-content" style="color: #f4f4f5;">${escapeHtml(state.liveInterimText || 'Listening for speech...')}</span>
                    <span class="typing-cursor" style="color: #ef4444; animation: blink 1s infinite;">▌</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Floating "Back to now" Pill Button -->
            <button class="synced-back-to-now ${syncedState.away ? 'visible' : ''}" id="transcript-back-to-now" type="button">
              <span id="back-to-now-icon">${syncedState.away === 'up' ? ICONS.arrowUp : ICONS.arrowDown}</span>
              <span>Back to now</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Setup / API Keys Modal -->
      <div class="auth-backdrop ${state.authModalOpen ? '' : 'hidden'}" id="auth-backdrop">
        <div class="auth-card" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
          <!-- Left hero -->
          <div class="auth-left-hero">
            <div class="auth-hero-graphics" aria-hidden="true">
              <svg viewBox="0 0 400 600" preserveAspectRatio="none">
                <defs>
                  <radialGradient id="silkBg" cx="30%" cy="40%" r="85%">
                    <stop offset="0%" stop-color="#18181b"/>
                    <stop offset="50%" stop-color="#09090b"/>
                    <stop offset="100%" stop-color="#000000"/>
                  </radialGradient>
                  <linearGradient id="silkWave1" x1="10%" y1="0%" x2="90%" y2="100%">
                    <stop offset="0%" stop-color="#3f3f46"/>
                    <stop offset="25%" stop-color="#27272a"/>
                    <stop offset="65%" stop-color="#141417"/>
                    <stop offset="100%" stop-color="#050507"/>
                  </linearGradient>
                  <linearGradient id="silkWave2" x1="100%" y1="10%" x2="0%" y2="90%">
                    <stop offset="0%" stop-color="#52525b"/>
                    <stop offset="20%" stop-color="#2e2e33"/>
                    <stop offset="60%" stop-color="#18181b"/>
                    <stop offset="100%" stop-color="#09090b"/>
                  </linearGradient>
                  <linearGradient id="rimLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.42)"/>
                    <stop offset="35%" stop-color="rgba(255,255,255,0.15)"/>
                    <stop offset="70%" stop-color="rgba(255,255,255,0.02)"/>
                    <stop offset="100%" stop-color="transparent"/>
                  </linearGradient>
                </defs>
                <rect width="400" height="600" fill="url(#silkBg)"/>
                <path d="M0,0 C160,50 320,180 260,340 C210,470 120,530 0,600 Z" fill="url(#silkWave1)"/>
                <path d="M400,0 C300,100 240,240 280,380 C320,500 370,560 400,600 Z" fill="url(#silkWave2)"/>
                <!-- Sweeping highlight rib -->
                <path d="M140,0 C220,120 280,240 250,380 C220,490 140,560 40,600 C110,550 180,470 210,370 C240,240 190,110 140,0 Z" fill="url(#rimLight)"/>
                <path d="M140,0 C190,100 240,220 220,350 C200,450 140,530 40,600" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" fill="none"/>
                <path d="M260,0 C310,120 310,250 280,370 C250,470 200,540 120,600" stroke="rgba(255,255,255,0.15)" stroke-width="1" fill="none"/>
              </svg>
            </div>
            <div class="auth-quote-box">
              <p class="auth-hero-kicker">Meeting Dock</p>
              <h3 class="auth-hero-title">Set up once, transcribe anywhere.</h3>
              <ol class="auth-steps">
                <li><span>1</span><div><strong>Add your keys</strong><small>One for speech-to-text, one for the report.</small></div></li>
                <li><span>2</span><div><strong>Press Record</strong><small>Captures this tab's audio and your microphone.</small></div></li>
                <li><span>3</span><div><strong>End the meeting</strong><small>Gemini turns the transcript into a report.</small></div></li>
              </ol>
            </div>
          </div>

          <!-- Right panel -->
          <div class="auth-right-panel">
            <div class="auth-top-nav">
              <span class="auth-eyebrow">Setup</span>
              <div style="display:flex; align-items:center; gap:6px;">
                <button class="auth-close-btn" id="btn-minimize-auth-modal" title="Minimize" type="button">${ICONS.minus}</button>
                <button class="auth-close-btn" id="btn-close-auth-modal" title="Close" type="button">${ICONS.close}</button>
              </div>
            </div>

            <div class="auth-form-center">
              <div class="auth-heading-group">
                <h2 class="auth-title" id="auth-modal-title">Connect your API keys</h2>
                <p class="auth-subtitle">Add them once. They are shared across every site the dock runs on.</p>
              </div>

              <form class="auth-form" id="auth-form" autocomplete="off" novalidate>
                <!-- Gnani STT -->
                <div class="key-card">
                  <div class="key-card-head">
                    <label class="key-card-label" for="auth-input-gnani-key"><span class="key-step">1</span>Speech-to-text · Gnani</label>
                    <span class="key-status" id="key-status-gnani" data-kind="${initialKeyStatus(state.gnaniApiKey).kind}">${initialKeyStatus(state.gnaniApiKey).text}</span>
                  </div>
                  <div class="key-input-row">
                    <input type="password" class="auth-input auth-input-key" id="auth-input-gnani-key" placeholder="vach_…" value="${escapeHtml(state.gnaniApiKey || '')}" autocomplete="off" autocapitalize="off" spellcheck="false" />
                    <button type="button" class="key-icon-btn" data-reveal="gnani" title="Show / hide key" aria-label="Show or hide the Gnani key" aria-pressed="false">${AUTH_ICONS.eye}</button>
                    <button type="button" class="key-icon-btn" data-paste="gnani" title="Paste from clipboard" aria-label="Paste the Gnani key from the clipboard">${AUTH_ICONS.clipboard}</button>
                  </div>
                  <div class="key-card-foot">
                    <span class="key-help">Transcribes the meeting audio. Keys start with <code>vach_</code>.</span>
                    <span class="key-actions">
                      <button type="button" class="key-link-btn" data-test="gnani">Test</button>
                      <button type="button" class="key-link-btn danger" data-clear="gnani">Remove</button>
                    </span>
                  </div>
                  <p class="key-msg" id="key-msg-gnani" role="status" aria-live="polite"></p>
                </div>

                <!-- Gemini -->
                <div class="key-card">
                  <div class="key-card-head">
                    <label class="key-card-label" for="auth-input-gemini-key"><span class="key-step">2</span>Report writer · Google Gemini</label>
                    <span class="key-status" id="key-status-gemini" data-kind="${initialKeyStatus(state.geminiApiKey).kind}">${initialKeyStatus(state.geminiApiKey).text}</span>
                  </div>
                  <div class="key-input-row">
                    <input type="password" class="auth-input auth-input-key" id="auth-input-gemini-key" placeholder="Paste your Gemini key" value="${escapeHtml(state.geminiApiKey || '')}" autocomplete="off" autocapitalize="off" spellcheck="false" />
                    <button type="button" class="key-icon-btn" data-reveal="gemini" title="Show / hide key" aria-label="Show or hide the Gemini key" aria-pressed="false">${AUTH_ICONS.eye}</button>
                    <button type="button" class="key-icon-btn" data-paste="gemini" title="Paste from clipboard" aria-label="Paste the Gemini key from the clipboard">${AUTH_ICONS.clipboard}</button>
                  </div>
                  <div class="key-card-foot">
                    <span class="key-help">Writes the report. <a class="auth-legal-link" href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">Get a key</a></span>
                    <span class="key-actions">
                      <button type="button" class="key-link-btn" data-test="gemini">Test</button>
                      <button type="button" class="key-link-btn danger" data-clear="gemini">Remove</button>
                    </span>
                  </div>
                  <p class="key-msg" id="key-msg-gemini" role="status" aria-live="polite"></p>
                </div>

               

                <button type="submit" class="auth-submit-btn" id="btn-auth-submit">Save &amp; continue</button>
              </form>

              <p class="auth-privacy">${AUTH_ICONS.lock}<span>Keys are stored in this browser's extension storage and are only sent to Gnani and Google.</span></p>
              <p class="auth-legal">
                <a href="${getPageUrl('pages/terms.html')}" id="auth-link-terms" target="_blank" rel="noopener noreferrer" class="auth-legal-link">Terms</a> ·
                <a href="${getPageUrl('pages/privacy.html')}" id="auth-link-privacy" target="_blank" rel="noopener noreferrer" class="auth-legal-link">Privacy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
    if (state.scrollIndexModalOpen) {
      setTimeout(initSyncedTranscript, 20);
    }
  }

  // Bind Events
  function bindEvents() {
    // 1. Tool Selection
    shadow.querySelectorAll('.dock-button[data-tool]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const toolId = btn.getAttribute('data-tool');
        // If clicking specifically on the small corner flyout arrow, toggle the flyout menu
        if (e.target.closest('.flyout-arrow')) {
          state.flyoutOpenId = state.flyoutOpenId === toolId ? null : toolId;
          render();
          return;
        }
        selectTool(toolId);
      };

      // Right-click opens options flyout if available
      btn.oncontextmenu = (e) => {
        const toolId = btn.getAttribute('data-tool');
        const tool = DOCK_TOOLS.find(t => t.id === toolId);
        if (tool && tool.hasFlyout) {
          e.preventDefault();
          e.stopPropagation();
          state.flyoutOpenId = state.flyoutOpenId === toolId ? null : toolId;
          render();
        }
      };

      // Hover Tooltip
      btn.onmouseenter = () => {
        const toolId = btn.getAttribute('data-tool');
        const tool = DOCK_TOOLS.find(t => t.id === toolId);
        if (tool) {
          if ((toolId === 'record' || toolId === 'hand') && state.isRecording) {
            showTooltip(btn, 'Stop Live Listening & Finalize', 'R');
          } else if (toolId === 'record' || toolId === 'hand') {
            showTooltip(btn, 'Start live transcription (arrow: choose audio source)', 'R');
          } else if (toolId === 'auth' && state.userEmail) {
            showTooltip(btn, `Account: ${state.userEmail}`, 'K');
          } else {
            showTooltip(btn, tool.label, tool.shortcut);
          }
        }
      };
      btn.onmouseleave = hideTooltip;
    });

    // Dock Minimize & Restore buttons
    const btnDockMinimize = shadow.getElementById('btn-dock-minimize');
    if (btnDockMinimize) {
      btnDockMinimize.onclick = (e) => {
        e.stopPropagation();
        state.dockMinimized = true;
        hideTooltip();
        render();
      };
      btnDockMinimize.onmouseenter = () => {
        showTooltip(btnDockMinimize, 'Minimize Dock', '');
      };
      btnDockMinimize.onmouseleave = hideTooltip;
    }

    const btnDockRestore = shadow.getElementById('btn-dock-restore');
    if (btnDockRestore) {
      btnDockRestore.onclick = (e) => {
        e.stopPropagation();
        state.dockMinimized = false;
        hideTooltip();
        render();
      };
      btnDockRestore.onmouseenter = () => {
        showTooltip(btnDockRestore, 'Expand Dock', '');
      };
      btnDockRestore.onmouseleave = hideTooltip;
    }

    // 2. Flyout Sub-item selection
    shadow.querySelectorAll('.flyout-item').forEach(subBtn => {
      subBtn.onclick = (e) => {
        e.stopPropagation();
        state.flyoutOpenId = null;
        const subId = subBtn.getAttribute('data-sub');

        if (subId === 'rec-live' || subId === 'rec-meeting') { startRealtimeRecognition('tab'); return; }
        if (subId === 'rec-system') { startRealtimeRecognition('system'); return; }
        if (subId === 'rec-mic') { startRealtimeRecognition('mic'); return; }

        if (subId === 'upload-audio') {
          triggerAudioFileUpload();
          render();
          return;
        }

        if (subId === 'all-summary') {
          state.modalOpen = true;
          render();
          return;
        }

        state.modalOpen = true;
        render();
      };
    });

    // 3. Fluid Dragging & Edge Snapping
    const grip = shadow.getElementById('dock-grip');
    const dockContainer = shadow.getElementById('dock-container');
    if (grip && dockContainer) {
      let isDragging = false;
      let startX = 0, startY = 0;
      let initLeft = 0, initTop = 0;
      let moved = false;

      grip.onpointerdown = (e) => {
        isDragging = true;
        moved = false;
        startX = e.clientX;
        startY = e.clientY;

        const rect = dockContainer.getBoundingClientRect();
        initLeft = rect.left;
        initTop = rect.top;

        // Reset classes to freeform position
        dockContainer.style.transform = 'none';
        dockContainer.style.left = `${initLeft}px`;
        dockContainer.style.top = `${initTop}px`;
        dockContainer.style.right = 'auto';
        dockContainer.style.bottom = 'auto';
        dockContainer.classList.remove('edge-bottom', 'edge-top', 'edge-left', 'edge-right');
        dockContainer.querySelector('.floating-dock-body')?.classList.add('dragging');

        grip.setPointerCapture(e.pointerId);
      };

      grip.onpointermove = (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.hypot(dx, dy) > 4) moved = true;

        const dockW = dockContainer.offsetWidth;
        const dockH = dockContainer.offsetHeight;
        const newLeft = Math.max(10, Math.min(window.innerWidth - dockW - 10, initLeft + dx));
        const newTop = Math.max(10, Math.min(window.innerHeight - dockH - 10, initTop + dy));

        dockContainer.style.left = `${newLeft}px`;
        dockContainer.style.top = `${newTop}px`;
      };

      grip.onpointerup = (e) => {
        if (!isDragging) return;
        isDragging = false;
        dockContainer.querySelector('.floating-dock-body')?.classList.remove('dragging');
        try { grip.releasePointerCapture(e.pointerId); } catch (_) {}

        if (!moved) {
          // Normal click without drag: rotate edge
          const nextEdge = { bottom: 'left', left: 'top', top: 'right', right: 'bottom' };
          state.edge = nextEdge[state.edge] || 'bottom';
          dockContainer.style.left = '';
          dockContainer.style.top = '';
          render();
          return;
        }

        // Project nearest edge
        const rect = dockContainer.getBoundingClientRect();
        const midX = rect.left + rect.width / 2;
        const midY = rect.top + rect.height / 2;
        const distBottom = window.innerHeight - midY;
        const distTop = midY;
        const distLeft = midX;
        const distRight = window.innerWidth - midX;

        const minDist = Math.min(distBottom, distTop, distLeft, distRight);
        if (minDist === distBottom) state.edge = 'bottom';
        else if (minDist === distTop) state.edge = 'top';
        else if (minDist === distLeft) state.edge = 'left';
        else state.edge = 'right';

        dockContainer.style.left = '';
        dockContainer.style.top = '';
        render();
      };
    }

    // 4. Modal Close & Minimize
    const btnMinimizeModal = shadow.getElementById('btn-minimize-modal');
    if (btnMinimizeModal) btnMinimizeModal.onclick = () => { state.modalOpen = false; render(); };

    const btnClose = shadow.getElementById('btn-close-modal');
    if (btnClose) btnClose.onclick = () => { state.modalOpen = false; render(); };

    const backdrop = shadow.getElementById('modal-backdrop');
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) { state.modalOpen = false; render(); }
      };
    }

    // ScrollIndex Modal Close & Minimize
    const btnMinimizeScroll = shadow.getElementById('btn-minimize-scroll-index');
    if (btnMinimizeScroll) btnMinimizeScroll.onclick = () => {
      state.scrollIndexModalOpen = false;
      render();
    };

    const btnCloseScroll = shadow.getElementById('btn-close-scroll-index');
    if (btnCloseScroll) btnCloseScroll.onclick = () => {
      stopSyncedPlayback();
      state.scrollIndexModalOpen = false;
      render();
    };

    const scrollBackdrop = shadow.getElementById('scroll-index-backdrop');
    if (scrollBackdrop) {
      scrollBackdrop.onclick = (e) => {
        if (e.target === scrollBackdrop) {
          stopSyncedPlayback();
          state.scrollIndexModalOpen = false;
          render();
        }
      };
    }

    // ---- Setup / API keys modal ------------------------------------------------
    const closeAuthModal = () => { state.authModalOpen = false; render(); };

    const btnMinimizeAuth = shadow.getElementById('btn-minimize-auth-modal');
    if (btnMinimizeAuth) btnMinimizeAuth.onclick = closeAuthModal;

    const btnCloseAuth = shadow.getElementById('btn-close-auth-modal');
    if (btnCloseAuth) btnCloseAuth.onclick = closeAuthModal;

    const authBackdrop = shadow.getElementById('auth-backdrop');
    if (authBackdrop) {
      authBackdrop.onclick = (e) => { if (e.target === authBackdrop) closeAuthModal(); };
    }

    const KEY_FIELDS = {
      gnani:  { inputId: 'auth-input-gnani-key',  storeKey: 'gnani_api_key',  label: 'Gnani' },
      gemini: { inputId: 'auth-input-gemini-key', storeKey: 'gemini_api_key', label: 'Gemini' }
    };
    const cleanKey = (v) => String(v || '').trim().replace(/^["'`]+|["'`]+$/g, '');
    const savedKeyFor = (which) => (which === 'gnani' ? REAL_GNANI_KEY : REAL_GEMINI_KEY);

    // Updates the status pill / message in place so typed text and focus are never lost.
    function setKeyStatus(which, kind, text, msg) {
      const pill = shadow.getElementById(`key-status-${which}`);
      const note = shadow.getElementById(`key-msg-${which}`);
      if (pill) { pill.dataset.kind = kind; pill.textContent = text; }
      if (note) { note.dataset.kind = kind; note.textContent = msg || ''; }
    }

    function refreshKeyStatusFromInput(which) {
      const input = shadow.getElementById(KEY_FIELDS[which].inputId);
      if (!input) return;
      const value = cleanKey(input.value);
      if (!value) { setKeyStatus(which, 'empty', 'Not set', ''); return; }
      if (value !== savedKeyFor(which)) {
        const hint = (which === 'gnani' && !value.startsWith('vach_')) ? 'Gnani keys usually start with vach_ — double-check you copied the right one.' : '';
        setKeyStatus(which, 'unsaved', 'Unsaved', hint);
      } else {
        setKeyStatus(which, 'saved', 'Saved', '');
      }
    }

    Object.keys(KEY_FIELDS).forEach(which => {
      const input = shadow.getElementById(KEY_FIELDS[which].inputId);
      if (input) input.addEventListener('input', () => refreshKeyStatusFromInput(which));
    });

    shadow.querySelectorAll('[data-reveal]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const input = shadow.getElementById(KEY_FIELDS[btn.dataset.reveal].inputId);
        if (!input) return;
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        btn.classList.toggle('active', show);
        btn.setAttribute('aria-pressed', String(show));
      };
    });

    shadow.querySelectorAll('[data-paste]').forEach(btn => {
      btn.onclick = async (e) => {
        e.preventDefault();
        const which = btn.dataset.paste;
        const input = shadow.getElementById(KEY_FIELDS[which].inputId);
        if (!input) return;
        try {
          input.value = cleanKey(await navigator.clipboard.readText());
          refreshKeyStatusFromInput(which);
        } catch (_) {
          showToast('This page blocked clipboard access. Click the field and press Ctrl/Cmd+V instead.');
        }
        input.focus();
      };
    });

    shadow.querySelectorAll('[data-test]').forEach(btn => {
      btn.onclick = async (e) => {
        e.preventDefault();
        const which = btn.dataset.test;
        const input = shadow.getElementById(KEY_FIELDS[which].inputId);
        const value = input ? cleanKey(input.value) : '';
        if (!value) { setKeyStatus(which, 'empty', 'Not set', 'Paste a key first.'); return; }
        btn.disabled = true;
        setKeyStatus(which, 'testing', 'Testing…', '');
        try {
          const result = await testApiKey(which, value);
          setKeyStatus(which, result.ok ? 'ok' : 'bad', result.ok ? 'Verified' : 'Rejected', result.message);
        } catch (err) {
          setKeyStatus(which, 'bad', 'Error', err.message || 'Test failed.');
        } finally {
          btn.disabled = false;
        }
      };
    });

    shadow.querySelectorAll('[data-clear]').forEach(btn => {
      btn.onclick = async (e) => {
        e.preventDefault();
        const which = btn.dataset.clear;
        const field = KEY_FIELDS[which];
        const input = shadow.getElementById(field.inputId);
        try { await settingsStore.remove([field.storeKey]); } catch (_) {}
        if (which === 'gnani') { REAL_GNANI_KEY = ''; state.gnaniApiKey = ''; }
        else { REAL_GEMINI_KEY = ''; state.geminiApiKey = ''; }
        if (input) input.value = '';
        setKeyStatus(which, 'empty', 'Not set', `${field.label} key removed.`);
      };
    });

    const authForm = shadow.getElementById('auth-form');
    if (authForm) {
      authForm.onsubmit = async (e) => {
        e.preventDefault();
        const gnaniInput = shadow.getElementById('auth-input-gnani-key');
        const geminiInput = shadow.getElementById('auth-input-gemini-key');
        const emailInput = shadow.getElementById('auth-input-email');
        const gnani = gnaniInput ? cleanKey(gnaniInput.value) : '';
        const gemini = geminiInput ? cleanKey(geminiInput.value) : '';
        const email = emailInput ? emailInput.value.trim() : '';

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showToast('That email address does not look right.');
          if (emailInput) emailInput.focus();
          return;
        }

        const toSet = {};
        const toRemove = [];
        (gnani ? (toSet.gnani_api_key = gnani) : toRemove.push('gnani_api_key'));
        (gemini ? (toSet.gemini_api_key = gemini) : toRemove.push('gemini_api_key'));
        (email ? (toSet.zmd_user_email = email) : toRemove.push('zmd_user_email'));

        try {
          if (Object.keys(toSet).length) await settingsStore.set(toSet);
          if (toRemove.length) await settingsStore.remove(toRemove);
        } catch (err) {
          showToast('Could not save. If you just reloaded the extension, refresh this page and try again.');
          return;
        }

        applyStoredSettings({ gnani_api_key: gnani, gemini_api_key: gemini, zmd_user_email: email });
        state.authModalOpen = false;
        render();

        const missing = [];
        if (!gnani) missing.push('Gnani STT key');
        if (!gemini) missing.push('Gemini key');
        showToast(missing.length ? `Saved. Still missing: ${missing.join(' and ')}.` : 'Keys saved. You are ready to record.');
      };
    }

    // Terms & Privacy Links
    const termsLink = shadow.getElementById('auth-link-terms');
    if (termsLink) {
      termsLink.onclick = (e) => {
        e.preventDefault();
        window.open(getPageUrl('pages/terms.html'), '_blank', 'noopener,noreferrer');
      };
    }

    const privacyLink = shadow.getElementById('auth-link-privacy');
    if (privacyLink) {
      privacyLink.onclick = (e) => {
        e.preventDefault();
        window.open(getPageUrl('pages/privacy.html'), '_blank', 'noopener,noreferrer');
      };
    }

    // Email current meeting report to the signed-in email address.
    const btnEmailReport = shadow.getElementById('btn-email-report');
    if (btnEmailReport) {
      btnEmailReport.onclick = () => {
        const reportMessage = state.messages.slice().reverse().find(m => m.role === 'assistant' && !m.isLoading && m.text && m.text.includes('Executive Overview'));
        if (!reportMessage) { showToast('Generate the meeting report first by ending the meeting.'); return; }
        openEmailComposer(reportMessage.text);
      };
    }

    // Chat Input
    const chatForm = shadow.getElementById('chat-form');
    const chatInput = shadow.getElementById('chat-input');
    if (chatForm && chatInput) {
      chatForm.onsubmit = (e) => {
        e.preventDefault();
        const val = chatInput.value.trim();
        if (val) submitChat(val);
      };
    }

    // Suggestions
    shadow.querySelectorAll('.chip').forEach(chip => {
      chip.onclick = () => {
        const val = chip.getAttribute('data-suggest');
        submitChat(val);
      };
    });

    // Close flyout on outside click
    window.onclick = () => {
      if (state.flyoutOpenId) {
        state.flyoutOpenId = null;
        render();
      }
    };
  }

  // Audio Recording & Real-Time Streaming State
  let currentLiveSection = null;
  let activeStreams = [];
  let rapidTabAudioCtx = null;
  let rapidTabProcessor = null;
  let rapidTabAudioBuffer = [];
  let rapidTabSampleCount = 0;
  let rapidInputRate = 48000;
  let chunkSumSq = 0;                 // running sum of squares for the chunk being collected
  let chunkStartSample = 0;           // samples captured before the current chunk (drives timestamps)
  let silentChunkCount = 0;
  let transcribeQueue = Promise.resolve();
  let pendingChunkCount = 0;
  let lastSttErrorShown = '';
  let liveSpeakerLabel = 'Meeting Audio';
  let liveSessionStartedAt = 0;
  let lastGnaniChunkEndMs = 0;

  const LIVE_CHUNK_SECONDS = 4;       // audio sent to Gnani per request
  const SPEECH_RMS_THRESHOLD = 0.003; // below this a chunk is treated as silence
  const MAX_PENDING_CHUNKS = 8;       // backlog limit if the network is slower than real time

  /**
   * Makes a promise-based call to the background service worker.
   */
  function sendToBackground(message) {
    const reloadError = () => {
      const e = new Error('The extension was reloaded. Refresh this page to reconnect it.');
      e.fatal = true;
      return e;
    };
    return new Promise((resolve, reject) => {
      try {
        chrome.runtime.sendMessage(message, (response) => {
          const lastErr = chrome.runtime.lastError;
          if (lastErr) {
            if (/context invalidated|Receiving end does not exist/i.test(lastErr.message || '')) reject(reloadError());
            else reject(new Error(lastErr.message));
            return;
          }
          resolve(response);
        });
      } catch (_) {
        reject(reloadError());
      }
    });
  }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
      reader.onerror = () => reject(new Error('Could not read the audio chunk.'));
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Checks an API key without saving it. Runs in the service worker inside the extension.
   */
  async function testApiKey(which, key) {
    if (HAS_EXT_RUNTIME) {
      const res = await sendToBackground({ action: 'VALIDATE_KEY', service: which, apiKey: key });
      return res || { ok: false, message: 'No response from the extension.' };
    }
    // preview.html fallback (direct fetch)
    if (which === 'gemini') {
      const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=1', { headers: { 'x-goog-api-key': key } });
      if (r.ok) return { ok: true, message: 'Google accepted this key.' };
      const err = await r.json().catch(() => ({}));
      return { ok: false, message: (err.error && err.error.message) || `Google returned HTTP ${r.status}.` };
    }
    const form = new FormData();
    form.append('audio_file', encode16BitPcmWav(new Float32Array(16000), 16000), 'key-check.wav');
    form.append('model', GNANI_MODEL);
    form.append('language_code', GNANI_LANGUAGE_CODE);
    form.append('format', GNANI_FORMAT);
    const r = await fetch('https://api.vachana.ai/stt/v3', { method: 'POST', headers: { 'X-API-Key-ID': key }, body: form });
    if (r.ok) return { ok: true, message: 'Gnani accepted this key.' };
    if (r.status === 401 || r.status === 403) return { ok: false, message: `Gnani rejected this key (HTTP ${r.status}).` };
    return { ok: true, message: `Gnani did not reject the key (the silent test clip returned HTTP ${r.status}).` };
  }

  /**
   * Starts real-time speech recognition using high-reliability Web Audio API + Gnani STT.
   * Prompts ONLY for audio permission (navigator.mediaDevices.getUserMedia with audio: true, video: false).
   */
  async function startRealtimeRecognition(mode = 'tab') {
    if (state.isRecording) {
      await stopRealtimeRecognition();
      return;
    }

    if (mode !== 'system' && mode !== 'mic') mode = 'tab'; // also accepts the legacy 'audio' value

    if (!REAL_GNANI_KEY) {
      showToast('Add your Gnani STT key first.');
      state.flyoutOpenId = null;
      state.authModalOpen = true;
      render();
      return;
    }
    lastSttErrorShown = '';
    pendingChunkCount = 0;
    transcribeQueue = Promise.resolve();

    state.isRecording = true;
    state.recordingMode = mode;
    state.flyoutOpenId = null;
    state.scrollIndexModalOpen = true;
    state.activeTool = 'scrollIndex';
    state.liveInterimText = 'Connecting audio...';
    syncedState.segments = [];
    syncedState.words = [];
    syncedState.flat = [];
    syncedState.duration = 0;
    syncedState.time = 0;
    state.scrollSections = [];
    state.memories = [];
    state.messages = [{ id: 'msg-session', role: 'assistant', text: 'Listening for the meeting. The transcript stays in memory only for this session.' }];
    liveSessionStartedAt = performance.now();
    lastGnaniChunkEndMs = 0;
    currentLiveSection = null;

    // Create a new meeting milestone section for this live session
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    currentLiveSection = {
      id: `sec-${Date.now()}`,
      title: `${timeStr} — Live Audio Discussion`,
      level: 2,
      paragraphs: []
    };
    state.scrollSections.push(currentLiveSection);
    render();

    // Auto-scroll to bottom
    setTimeout(() => {
      const box = shadow.getElementById('scroll-index-content-box');
      if (box) box.scrollTop = box.scrollHeight;
    }, 40);

    // 1. ALWAYS start high-reliability Web Audio + Gnani STT Pipeline
    const connected = await startRapidWebAudioPipeline(mode);
    if (!connected) {
      // Nothing is recording, so do not leave the dock in a stuck "recording" state.
      state.isRecording = false;
      render();
    }
  }

  /**
   * Opens the audio sources and mixes them into one mono stream for Gnani STT.
   *   'tab'    -> this tab's audio (YouTube, Zoom Web, Meet...) + microphone
   *   'system' -> a tab / window / screen you pick (system audio where the OS allows it) + microphone
   *   'mic'    -> microphone only
   * Returns true when at least one live audio track is connected.
   */
  async function startRapidWebAudioPipeline(mode = 'tab') {
    let tabStream = null;
    let micStream = null;
    const notes = [];

    // 1. Tab / system audio: what you hear (video audio, other meeting participants).
    //    This has to be requested first so the click that started recording still counts as a user gesture.
    if (mode === 'tab' || mode === 'system') {
      try {
        const displayOptions = {
          video: true, // getDisplayMedia() requires a video request. The video track is disabled and never read.
          audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
        };
        if (mode === 'tab') {
          displayOptions.preferCurrentTab = true;
          displayOptions.selfBrowserSurface = 'include';
        } else {
          displayOptions.systemAudio = 'include';
        }
        const display = await navigator.mediaDevices.getDisplayMedia(displayOptions);
        display.getVideoTracks().forEach(t => { t.enabled = false; });
        if (display.getAudioTracks().length) {
          tabStream = display;
        } else {
          display.getTracks().forEach(t => t.stop());
          notes.push('No audio was shared. Tick "Also share tab audio" in the Chrome sharing dialog.');
        }
      } catch (err) {
        console.warn('getDisplayMedia error:', err);
        notes.push(err && err.name === 'NotAllowedError'
          ? 'Tab audio sharing was cancelled, so only the microphone is used.'
          : `Tab audio is unavailable (${(err && err.name) || 'error'}).`);
      }
    }

    // 2. Microphone: your own voice.
    try {
      micStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: false
      });
    } catch (micErr) {
      console.warn('Microphone getUserMedia error:', micErr);
      notes.push(micErr && micErr.name === 'NotAllowedError'
        ? 'Microphone permission is blocked for this site.'
        : 'Microphone is unavailable.');
    }

    const stopAll = () => [tabStream, micStream].forEach(s => { if (s) s.getTracks().forEach(t => { try { t.stop(); } catch (_) {} }); });

    if (!tabStream && !micStream) {
      const reason = notes.join(' ') || 'No audio source is available.';
      updateLiveInterimDOM(reason);
      showToast(reason);
      return false;
    }

    // 3. Web Audio graph: [tab] + [mic] -> mix -> processor -> (muted) destination
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      rapidTabAudioCtx = new AudioCtxClass();
      if (rapidTabAudioCtx.state === 'suspended') await rapidTabAudioCtx.resume();
      rapidInputRate = rapidTabAudioCtx.sampleRate;

      rapidTabProcessor = rapidTabAudioCtx.createScriptProcessor(4096, 1, 1);
      rapidTabAudioBuffer = [];
      rapidTabSampleCount = 0;
      chunkSumSq = 0;
      chunkStartSample = 0;
      silentChunkCount = 0;

      const mixBus = rapidTabAudioCtx.createGain();
      mixBus.gain.value = 0.9;
      if (tabStream) rapidTabAudioCtx.createMediaStreamSource(tabStream).connect(mixBus);
      if (micStream) rapidTabAudioCtx.createMediaStreamSource(micStream).connect(mixBus);
      mixBus.connect(rapidTabProcessor);

      const speakerLabel = (micStream && !tabStream) ? 'You (Microphone)' : 'Meeting Audio';
      liveSpeakerLabel = speakerLabel;
      const CHUNK_LIMIT = Math.round(rapidInputRate * LIVE_CHUNK_SECONDS);

      rapidTabProcessor.onaudioprocess = (e) => {
        if (!state.isRecording) return;
        const input = e.inputBuffer.getChannelData(0);
        const len = input.length;
        const copy = new Float32Array(len);
        let sumSq = 0;
        for (let i = 0; i < len; i++) {
          let v = input[i];
          if (v > 1) v = 1; else if (v < -1) v = -1;
          copy[i] = v;
          sumSq += v * v;
        }
        rapidTabAudioBuffer.push(copy);
        rapidTabSampleCount += len;
        chunkSumSq += sumSq;

        if (Math.sqrt(sumSq / len) > SPEECH_RMS_THRESHOLD && /^(Listening|Connecting|Microphone|No sound)/.test(state.liveInterimText || '')) {
          updateLiveInterimDOM('Hearing audio...');
        }

        if (rapidTabSampleCount >= CHUNK_LIMIT) {
          const chunks = rapidTabAudioBuffer;
          const count = rapidTabSampleCount;
          const rms = Math.sqrt(chunkSumSq / count);
          const startSec = chunkStartSample / rapidInputRate;
          chunkStartSample += count;
          rapidTabAudioBuffer = [];
          rapidTabSampleCount = 0;
          chunkSumSq = 0;

          if (rms > SPEECH_RMS_THRESHOLD) {
            silentChunkCount = 0;
            enqueueAudioChunk(chunks, count, rapidInputRate, speakerLabel, startSec);
          } else {
            silentChunkCount++;
            if (silentChunkCount === 3) {
              updateLiveInterimDOM(tabStream
                ? 'No sound detected from the tab. Make sure it is playing and that tab audio sharing is on.'
                : 'No sound detected from your microphone. Check the input device and that it is not muted.');
            }
          }
        }
      };

      const silentGain = rapidTabAudioCtx.createGain();
      silentGain.gain.value = 0.0;
      rapidTabProcessor.connect(silentGain);
      silentGain.connect(rapidTabAudioCtx.destination);

      if (tabStream) {
        tabStream.getAudioTracks()[0].addEventListener('ended', () => {
          if (!state.isRecording) return;
          showToast('Tab audio sharing stopped.');
          if (!micStream || !micStream.active) stopRealtimeRecognition();
        });
      }

      activeStreams.push(...[tabStream, micStream].filter(Boolean));
      updateLiveInterimDOM(tabStream && micStream
        ? 'Listening to this tab and your microphone...'
        : (tabStream ? 'Listening to tab audio...' : 'Listening to your microphone...'));
      showToast(notes.length ? notes[0] : 'Audio connected. Recording.');
      return true;
    } catch (pipelineErr) {
      console.warn('Web Audio pipeline startup error:', pipelineErr);
      stopAll();
      if (rapidTabAudioCtx) { try { rapidTabAudioCtx.close(); } catch (_) {} rapidTabAudioCtx = null; }
      rapidTabProcessor = null;
      updateLiveInterimDOM('Could not start audio processing in this page.');
      showToast('Could not start audio processing in this page.');
      return false;
    }
  }

  /**
   * Chunks are transcribed strictly one after another so none are dropped and the text stays in order.
   */
  function enqueueAudioChunk(chunks, totalSamples, inputRate, label, startSec) {
    if (pendingChunkCount >= MAX_PENDING_CHUNKS) {
      showSttError('Transcription is falling behind. A segment was skipped.');
      return;
    }
    pendingChunkCount++;
    transcribeQueue = transcribeQueue
      .then(() => processRapidAudioChunk(chunks, totalSamples, inputRate, label, startSec))
      .catch(err => console.warn('Chunk queue error:', err))
      .finally(() => { pendingChunkCount--; });
  }

  function showSttError(message) {
    updateLiveInterimDOM(`Speech-to-text error: ${message}`);
    if (message !== lastSttErrorShown) {
      lastSttErrorShown = message;
      showToast(message);
    }
  }

  /**
   * Resamples one audio chunk to 16 kHz WAV and transcribes it with Gnani Prisma v3.0.
   */
  async function processRapidAudioChunk(chunks, totalSamples, inputRate, speakerLabel, chunkStartSec) {
    if (totalSamples < inputRate * 0.6) return;

    const merged = new Float32Array(totalSamples);
    let offset = 0;
    for (const c of chunks) {
      merged.set(c, offset);
      offset += c.length;
    }

    const targetRate = 16000;
    const resampled = downsampleTo16k(merged, inputRate, targetRate);
    const wavBlob = encode16BitPcmWav(resampled, targetRate);

    try {
      if (state.isRecording) updateLiveInterimDOM('Transcribing...');
      const transcript = await transcribeSingleChunkWithGnani(wavBlob, 'meeting-chunk.wav');
      lastSttErrorShown = '';
      if (transcript && transcript.trim()) {
        commitLiveSentence(transcript.trim(), speakerLabel, chunkStartSec, totalSamples / inputRate);
      } else if (state.isRecording) {
        updateLiveInterimDOM('Listening for speech...');
      }
    } catch (err) {
      console.warn('Rapid chunk transcription error:', err);
      showSttError(err.message || 'Transcription failed.');
      if (err.fatal && state.isRecording) {
        if (err.reason === 'key') { state.authModalOpen = true; render(); }
        setTimeout(() => stopRealtimeRecognition({ silent: true }), 0);
      }
    }
  }

  /**
   * Smoothly updates real-time words into the DOM with zero flicker and animated typing cursor.
   */
  function updateLiveInterimDOM(text) {
    state.liveInterimText = text || '';
    const interimBox = shadow.getElementById('live-interim-box');
    const interimTextEl = shadow.getElementById('interim-text-content');
    if (interimBox && interimTextEl) {
      if (text) {
        interimTextEl.textContent = text;
        interimBox.classList.remove('hidden');
        const box = shadow.getElementById('transcript-scroll-box');
        if (box) box.scrollTop = box.scrollHeight;
      } else {
        interimBox.classList.add('hidden');
        interimTextEl.textContent = '';
      }
    }
  }

  /**
   * Commits a completed thought or sentence into the Meeting Transcript and extracts tasks.
   */
  function commitLiveSentence(sentenceText, speakerLabel = 'Meeting Audio', chunkStartSec = null, chunkDurationSec = null) {
    const clean = sentenceText.trim();
    if (!clean) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const speakerName = (speakerLabel.includes('Microphone') || speakerLabel.includes('You')) ? 'You' : 'Meeting Speaker';

    // 1. Append to syncedState.segments
    const start = chunkStartSec !== null ? Number(Math.max(0, chunkStartSec).toFixed(2)) : Number(((performance.now() - liveSessionStartedAt) / 1000).toFixed(2));
    const wordsCount = clean.split(WHITESPACE).filter(Boolean).length;
    const end = Number((start + (chunkDurationSec || Math.max(1, wordsCount / 2.7))).toFixed(2));

    syncedState.segments.push({
      speaker: speakerName,
      start,
      end,
      text: clean
    });

    recalculateSyncedWords();
    syncedState.time = start + 0.1;
    syncedState.following = true;

    // 2. Also append to state.scrollSections for backwards compatibility
    if (!currentLiveSection) {
      currentLiveSection = {
        id: `sec-${Date.now()}`,
        title: `${timeStr} — Live Discussion`,
        level: 2,
        paragraphs: []
      };
      state.scrollSections.push(currentLiveSection);
    }

    currentLiveSection.paragraphs.push({
      speaker: speakerName,
      time: `[${timeStr}]`,
      text: clean
    });

    state.liveInterimText = '';
    render();

    // Auto-scroll to follow live typing
    setTimeout(() => {
      updateActiveWordFromTime();
      updateSyncedUI();
      const el = shadow.querySelector(`[data-index="${syncedState.activeWord}"]`);
      if (el) scrollToWord(el, true);
    }, 40);
  }

  /**
   * Stops recognition, releases every audio track, sends the last partial chunk to Gnani and,
   * unless opts.silent is set, builds the meeting report.
   */
  async function stopRealtimeRecognition(opts = {}) {
    state.isRecording = false;
    render();

    if (rapidTabProcessor) {
      try { rapidTabProcessor.onaudioprocess = null; rapidTabProcessor.disconnect(); } catch (_) {}
      rapidTabProcessor = null;
    }
    activeStreams.forEach(s => { try { s.getTracks().forEach(t => t.stop()); } catch (_) {} });
    activeStreams = [];

    // Send what is left in the buffer, using the real capture sample rate.
    if (rapidTabAudioBuffer.length > 0 && rapidTabSampleCount > rapidInputRate * 0.6) {
      const chunks = rapidTabAudioBuffer;
      const count = rapidTabSampleCount;
      const rms = Math.sqrt(chunkSumSq / count);
      const startSec = chunkStartSample / rapidInputRate;
      if (rms > SPEECH_RMS_THRESHOLD) {
        enqueueAudioChunk(chunks, count, rapidInputRate, liveSpeakerLabel, startSec);
      }
    }
    rapidTabAudioBuffer = [];
    rapidTabSampleCount = 0;
    chunkSumSq = 0;

    if (rapidTabAudioCtx) { try { rapidTabAudioCtx.close(); } catch (_) {} rapidTabAudioCtx = null; }

    try { await transcribeQueue; } catch (_) {}

    state.liveInterimText = '';
    currentLiveSection = null;
    render();
    if (opts.silent) return;

    const transcript = getMeetingTranscriptText();
    if (!transcript || transcript === 'No recorded dialogue yet.') {
      showToast('No speech was detected in this meeting.');
      return;
    }
    showToast('Meeting ended. Generating report with Gemini...');
    await generateMeetingReportAndEmail(transcript);
  }

  /**
   * Finds a natural quiet pause / breath split point in audio samples to avoid cutting words mid-sentence.
   */
  function findQuietSplitPoint(samples, startIdx, maxEndIdx, sampleRate = 16000) {
    if (maxEndIdx >= samples.length) return samples.length;
    // Look in the window from (targetEnd - 4s) to targetEnd
    const minSearch = Math.max(startIdx + (8 * sampleRate), maxEndIdx - (4 * sampleRate));
    let minEnergy = Infinity;
    let bestIdx = maxEndIdx;
    const step = 160; // 10ms steps
    for (let i = minSearch; i < maxEndIdx; i += step) {
      let energy = 0;
      for (let j = 0; j < step && i + j < samples.length; j++) {
        energy += Math.abs(samples[i + j]);
      }
      if (energy < minEnergy) {
        minEnergy = energy;
        bestIdx = i + Math.floor(step / 2);
      }
    }
    return bestIdx;
  }

  /**
   * Slices PCM audio array into safe chunks of strictly 12-15 seconds (never exceeding 16s, safely below Gnani 30s cap).
   */
  function slicePcmIntoSafeChunks(samples, sampleRate = 16000, targetSec = 13, maxSec = 15) {
    const maxChunkSamples = maxSec * sampleRate;
    if (samples.length <= maxChunkSamples) return [samples];

    const chunks = [];
    let cursor = 0;

    while (cursor < samples.length) {
      const remaining = samples.length - cursor;
      if (remaining <= maxChunkSamples) {
        chunks.push(samples.subarray(cursor));
        break;
      }

      const proposedEnd = cursor + (targetSec * sampleRate);
      const splitPoint = findQuietSplitPoint(samples, cursor, proposedEnd, sampleRate);
      const safeSplit = (splitPoint > cursor && splitPoint <= cursor + maxChunkSamples)
        ? splitPoint
        : cursor + (targetSec * sampleRate);

      chunks.push(samples.subarray(cursor, safeSplit));
      cursor = safeSplit;
    }

    return chunks;
  }

  /**
   * High quality boxcar downsampler from source sample rate to 16kHz.
   */
  function downsampleTo16k(buffer, fromRate, toRate = 16000) {
    if (fromRate === toRate) return buffer;
    if (fromRate < toRate) return buffer;

    const ratio = fromRate / toRate;
    const newLength = Math.round(buffer.length / ratio);
    const result = new Float32Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;

    while (offsetResult < result.length) {
      const nextOffsetBuffer = Math.round((offsetResult + 1) * ratio);
      let accum = 0;
      let count = 0;
      for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
        accum += buffer[i];
        count++;
      }
      result[offsetResult] = count > 0 ? accum / count : 0;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
    return result;
  }

  /**
   * Encodes 16-bit Mono PCM WAV with 44-byte standard RIFF header.
   */
  function encode16BitPcmWav(samples, sampleRate = 16000) {
    const numChannels = 1;
    const bitsPerSample = 16;
    const bytesPerSample = bitsPerSample / 8;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = samples.length * bytesPerSample;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    // 1. RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(view, 8, 'WAVE');

    // 2. fmt sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);             // Subchunk1Size (16 for PCM)
    view.setUint16(20, 1, true);              // AudioFormat (1 = PCM)
    view.setUint16(22, numChannels, true);    // NumChannels (1 = Mono)
    view.setUint32(24, sampleRate, true);     // SampleRate (16000)
    view.setUint32(28, byteRate, true);       // ByteRate (32000)
    view.setUint16(32, blockAlign, true);     // BlockAlign (2)
    view.setUint16(34, bitsPerSample, true);  // BitsPerSample (16)

    // 3. data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);       // Subchunk2Size

    // 4. Write 16-bit signed PCM samples
    let offset = 44;
    for (let i = 0; i < samples.length; i++) {
      let s = Math.max(-1, Math.min(1, samples[i]));
      let val = s < 0 ? s * 0x8000 : s * 0x7FFF;
      view.setInt16(offset, Math.floor(val), true);
      offset += 2;
    }

    return new Blob([view], { type: 'audio/wav' });
  }

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  /**
   * Transcribes a single WAV Blob of at most ~15 s (stays well inside Gnani's 30 s limit).
   * Inside the extension the request is made by the background service worker so the host page's
   * CSP / CORS rules cannot block it.
   */
  async function transcribeSingleChunkWithGnani(audioBlob, fileName = 'meeting-segment.wav') {
    if (!REAL_GNANI_KEY) {
      const e = new Error('Gnani STT key is missing. Add it in Login & API Keys.');
      e.fatal = true;
      e.reason = 'key';
      throw e;
    }

    // Safety guard: reject blobs over 800KB (~25s) to guarantee zero 30s limit violations
    if (audioBlob.size > 800000) {
      console.warn('Audio blob exceeds 800KB (~25s), skipped to avoid Gnani 400 error');
      return '';
    }

    if (HAS_EXT_RUNTIME) {
      const audioBase64 = await blobToBase64(audioBlob);
      const res = await sendToBackground({ action: 'GNANI_TRANSCRIBE', apiKey: REAL_GNANI_KEY, audioBase64, fileName });
      if (!res || !res.ok) {
        const e = new Error((res && res.error) || 'No response from the extension.');
        if (res && (res.status === 401 || res.status === 403)) { e.fatal = true; e.reason = 'key'; }
        throw e;
      }
      return (res.transcript || '').trim();
    }

    // preview.html fallback (direct fetch)
    const formData = new FormData();
    formData.append('audio_file', audioBlob, fileName);
    formData.append('model', GNANI_MODEL);
    formData.append('language_code', GNANI_LANGUAGE_CODE);
    formData.append('format', GNANI_FORMAT);

    const response = await fetch('https://api.vachana.ai/stt/v3', {
      method: 'POST',
      headers: { 'X-API-Key-ID': REAL_GNANI_KEY },
      body: formData
    });

    if (!response.ok) {
      const errText = await response.text();
      const e = new Error(`Gnani API returned ${response.status}: ${errText.slice(0, 200)}`);
      if (response.status === 401 || response.status === 403) { e.fatal = true; e.reason = 'key'; }
      throw e;
    }

    const resData = await response.json();
    return (resData.transcript || (resData.data && resData.data.transcript) || '').trim();
  }

  /**
   * Slices arbitrary-length PCM audio into safe <= 15s chunks, transcribes in parallel, and combines results.
   */
  async function transcribePcmDataWithChunking(resampledData, targetSampleRate = 16000, sourceLabel = 'Meeting Audio') {
    const chunks = slicePcmIntoSafeChunks(resampledData, targetSampleRate, 13, 15);
    const totalDurationSec = (resampledData.length / targetSampleRate).toFixed(1);

    if (chunks.length > 1) {
      showToast(`Transcribing audio in ${chunks.length} segments (${totalDurationSec}s)...`);
    } else {
      showToast('Uploading audio for transcription...');
    }

    try {
      const chunkTranscripts = await Promise.all(chunks.map(async (chunkSamples, idx) => {
        const chunkWav = encode16BitPcmWav(chunkSamples, targetSampleRate);
        try {
          return await transcribeSingleChunkWithGnani(chunkWav, `segment-${idx + 1}.wav`);
        } catch (err) {
          console.warn(`Chunk ${idx + 1} transcription error:`, err);
          return '';
        }
      }));

      const combinedTranscript = chunkTranscripts.filter(t => Boolean(t && t.trim())).join(' ').trim();

      if (!combinedTranscript) {
        showToast('Processed audio segment; no speech detected.');
        state.scrollIndexModalOpen = true;
        render();
        return;
      }

      handleSuccessfulTranscription(combinedTranscript, sourceLabel);
    } catch (err) {
      console.error('STT Error:', err);
      showToast(`Transcription error: ${err.message}`);
    }
  }

  /**
   * Handles arbitrary audio or video file uploads by decoding and safely chunking.
   */
  function triggerAudioFileUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*,video/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        await processAudioWithGnani(file, file.name);
      }
    };
    input.click();
  }

  /**
   * Universal transcription processor that safely handles any audio file or Blob of arbitrary duration.
   */
  async function processAudioWithGnani(audioFileOrBlob, fileName = 'meeting-audio.wav') {
    showToast(`Processing audio: ${fileName}...`);

    try {
      const arrayBuffer = await audioFileOrBlob.arrayBuffer();
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      const tempCtx = new AudioCtxClass();
      const audioBuffer = await tempCtx.decodeAudioData(arrayBuffer);
      const channelData = audioBuffer.getChannelData(0);
      const origRate = audioBuffer.sampleRate;
      try { tempCtx.close(); } catch (_) {}

      const targetRate = 16000;
      const resampled = downsampleTo16k(channelData, origRate, targetRate);
      await transcribePcmDataWithChunking(resampled, targetRate, fileName);
    } catch (decodeErr) {
      console.warn('Audio decoding fallback error:', decodeErr);
      showToast('Could not decode audio format. Please upload standard WAV or MP3 audio.');
    }
  }

  /**
   * Dispatches recorded audio into the current in-memory Meeting Transcript.
   */
  function handleSuccessfulTranscription(transcript, sourceLabel = 'Meeting Audio') {
    const cleanTranscript = (transcript || '').trim();
    if (!cleanTranscript) return;
    const speakerName = (sourceLabel.includes('Microphone') || sourceLabel.includes('You')) ? 'You' : 'Meeting Audio';
    const startBase = syncedState.segments.length ? syncedState.segments[syncedState.segments.length - 1].end + 0.1 : 0;
    const sentences = cleanTranscript.split(/(?<=[.?!])\s+/).filter(Boolean);
    let cursor = startBase;
    for (const sentence of sentences) {
      const clean = sentence.trim();
      if (!clean) continue;
      const wordsCount = clean.split(WHITESPACE).filter(Boolean).length;
      const end = Number((cursor + Math.max(1.0, wordsCount / 2.7)).toFixed(2));
      syncedState.segments.push({ speaker: speakerName, start: Number(cursor.toFixed(2)), end, text: clean });
      cursor = end + 0.1;
    }
    recalculateSyncedWords();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    state.scrollSections.push({
      id: `sec-${Date.now()}`,
      title: `${timeStr} — Recorded Meeting`,
      level: 2,
      paragraphs: [{ speaker: speakerName, time: `[${formatTime(startBase)}]`, text: cleanTranscript }]
    });
    state.scrollIndexModalOpen = true;
    state.activeTool = 'scrollIndex';
    render();
    showToast('Recorded audio added to Meeting Transcript.');
    const recordedTranscript = getMeetingTranscriptText();
    if (recordedTranscript && recordedTranscript !== 'No recorded dialogue yet.') {
      showToast('Generating report with Gemini...');
      generateMeetingReportAndEmail(recordedTranscript);
    }
  }


  /**
   * Extracts the full meeting transcript text from live sections or synced segments
   * @returns {string}
   */
  function getMeetingTranscriptText() {
    // 1. Check live recorded sections
    if (state.scrollSections && state.scrollSections.length > 0) {
      const recorded = [];
      state.scrollSections.forEach(sec => {
        if (sec.paragraphs && sec.paragraphs.length > 0) {
          sec.paragraphs.forEach(p => {
            const speaker = p.speaker || 'Participant';
            recorded.push(`${speaker}: ${p.text}`);
          });
        }
      });
      if (recorded.length > 0) {
        return recorded.join('\n');
      }
    }

    // 2. Check KokonutUI synced transcript segments
    if (syncedState.segments && syncedState.segments.length > 0) {
      return syncedState.segments.map(s => `${s.speaker}: ${s.text}`).join('\n');
    }

    return "No recorded dialogue yet.";
  }

  /**
   * Calls Gemini with automatic model fallback.
   * @param {Array<{ role: 'user' | 'model', parts: Array<{ text: string }> }>} messages
   * @param {string} systemInstruction
   * @returns {Promise<string>}
   */
  async function callGeminiAPI(messages, systemInstruction) {
    const key = state.geminiApiKey || REAL_GEMINI_KEY;
    if (!key) {
      throw new Error("Google Gemini API Key is missing. Please set it in Login & API Keys.");
    }

    const payload = {
      contents: messages
    };
    if (systemInstruction) {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const modelsToTry = ["gemini-3.1-flash-lite", "gemini-flash-latest"];

    // Inside the extension the service worker makes the request (not subject to the page's CSP).
    if (HAS_EXT_RUNTIME) {
      const res = await sendToBackground({ action: 'GEMINI_GENERATE', apiKey: key, payload, models: modelsToTry });
      if (!res || !res.ok) throw new Error((res && res.error) || 'Failed to communicate with Google Gemini API.');
      return res.text;
    }

    // preview.html fallback (direct fetch)
    let lastError = null;
    for (const model of modelsToTry) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": key },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData?.error?.message || response.statusText;
          if (response.status === 503 || response.status === 404) {
            lastError = new Error(`Gemini (${model}): ${errMsg}`);
            continue;
          }
          throw new Error(`Gemini API Error (${response.status}): ${errMsg}`);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error("No response returned from Gemini model.");
        return text;
      } catch (err) {
        lastError = err;
        continue;
      }
    }

    throw lastError || new Error("Failed to communicate with Google Gemini API.");
  }

  function selectTool(toolId) {
    state.activeTool = toolId;

    if (toolId === 'record' || toolId === 'hand') {
      if (state.isRecording) {
        stopRealtimeRecognition();
      } else {
        startRealtimeRecognition('tab');
      }
    } else if (toolId === 'shapes') {
      state.flyoutOpenId = state.flyoutOpenId === 'shapes' ? null : 'shapes';
      render();
    } else if (toolId === 'summary' || toolId === 'pen') {
      state.flyoutOpenId = null;
      state.modalOpen = true;
      render();
      // Only auto-trigger summary if actual recorded dialogue exists
      const transcript = getMeetingTranscriptText();
      const hasDialogue = transcript && transcript !== "No recorded dialogue yet.";
      const hasSummary = state.messages.some(m => m.text && (m.text.includes('Executive Overview') || m.text.includes('Meeting Summary') || m.text.includes('Key Decisions')));
      if (!hasSummary && hasDialogue) {
        submitChat("Summarize the meeting from the transcript: provide an Executive Overview, Key Decisions, and Action Items.");
      }
    } else if (toolId === 'scrollIndex') {
      state.flyoutOpenId = null;
      state.scrollIndexModalOpen = !state.scrollIndexModalOpen;
      if (!state.scrollIndexModalOpen) {
        stopSyncedPlayback();
      }
      render();
    } else if (toolId === 'auth') {
      state.flyoutOpenId = null;
      state.authModalOpen = !state.authModalOpen;
      render();
    }
  }

  async function submitChat(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    // 1. Post user message
    state.messages.push({
      id: `u-${Date.now()}`,
      role: 'user',
      text: cleanText
    });

    // 2. Add loading state indicator
    const loadingId = `load-${Date.now()}`;
    state.messages.push({
      id: loadingId,
      role: 'assistant',
      isLoading: true,
      text: "Thinking..."
    });
    render();
    startAILoading();

    // Scroll chat thread to bottom
    const scrollThread = () => {
      const thread = shadow.getElementById('chat-thread');
      if (thread) thread.scrollTop = thread.scrollHeight;
    };
    scrollThread();

    try {
      const transcript = getMeetingTranscriptText();
      const systemInstruction = `You are Zoom Meeting Dock AI, a brilliant real-time executive meeting companion powered by Google Gemini.
You have access to the live meeting transcript and memory.
Your goals:
- Answer questions accurately using the meeting transcript as ground truth.
- When asked to summarize or provide deliverables, format clearly with:
  1. **Executive Overview**: 2-3 concise sentences.
  2. **Key Decisions**: Bullet points of agreed items.
  3. **Action Items & Deliverables**: Specific tasks with owners/deadlines.
- If the user asks about specific participants, cite what they said or were assigned.
- If a clear action item, task, or decision is identified, phrase it concisely so it can be committed to meeting memory.
- Be concise, friendly, professional, and actionable.

Current Meeting Transcript Context:
"""
${transcript}
"""`;

      // Build conversational message history
      const historyContents = [];
      const validHistory = state.messages.filter(m => !m.isLoading && m.id !== loadingId).slice(-6);
      for (const m of validHistory) {
        historyContents.push({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        });
      }

      const reply = await callGeminiAPI(historyContents, systemInstruction);

      stopAILoading();
      // Remove loading indicator
      state.messages = state.messages.filter(m => m.id !== loadingId);

      // Analyze reply and user request for actionable memory items
      let newMem = null;
      const lower = cleanText.toLowerCase();
      const isActionRequest = lower.includes('summar') || lower.includes('action') || lower.includes('task') || lower.includes('decision') || lower.includes('deadline') || lower.includes('deliver');

      if (isActionRequest) {
        // Find a representative deliverable or summary line from the reply
        const lines = reply.split('\n').map(l => l.trim()).filter(Boolean);
        const bulletLine = lines.find(l => (l.startsWith('*') || l.startsWith('-') || l.startsWith('•') || l.includes(':')) && !l.toLowerCase().includes('executive overview') && !l.toLowerCase().includes('key decisions') && !l.toLowerCase().includes('action items')) || lines[0] || cleanText;
        const taskText = bulletLine.replace(/[*#_~`]/g, '').replace(/^[-•]\s*/, '').trim().substring(0, 85);

        let group = 'Meeting Action Items';
        if (lower.includes('decision') || taskText.toLowerCase().includes('decision')) {
          group = 'Key Decisions';
        } else if (taskText.includes(':')) {
          const prefix = taskText.split(':')[0].trim();
          if (prefix.length > 1 && prefix.length < 30) group = prefix;
        }

        newMem = {
          id: `mem-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          group: group,
          text: taskText || cleanText,
          saved: 'Today'
        };

        if (state.memoryEnabled) {
          state.memories.push(newMem);
          state.flashId = newMem.id;
        }
      }

      state.messages.push({
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: reply,
        saved: newMem ? newMem.id : undefined,
        savedText: newMem ? newMem.text : undefined
      });

    } catch (err) {
      stopAILoading();
      console.error("Gemini Assistant Error:", err);
      state.messages = state.messages.filter(m => m.id !== loadingId);

      // Clean API notice
      let fallbackText = `⚠️ Gemini API Notice: ${err.message || 'Request failed'}\n\n`;
      fallbackText += `Could not connect to Google Gemini API. Please verify your Gemini API key in Login & API Keys.`;

      state.messages.push({
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: fallbackText
      });
    }

    render();
    setTimeout(scrollThread, 60);
  }

  function openEmailComposer(reportText) {
    const email = (state.userEmail || '').trim();
    if (!email) { showToast('Add your email address in Login & API Keys first.'); state.authModalOpen = true; render(); return; }
    const subject = `AI Meeting Report — ${new Date().toLocaleDateString()}`;
    const body = `${reportText}\n\n---\nGenerated by Gnani AI Meeting Dock.`;
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast('Email draft opened with the meeting report.');
  }

  async function generateMeetingReportAndEmail(transcript) {
    state.modalOpen = true;
    state.activeTool = 'summary';
    state.messages.push({ id: `report-load-${Date.now()}`, role: 'assistant', isLoading: true, text: 'Generating your meeting report...' });
    render();
    startAILoading();
    try {
      const reportPrompt = `Generate a detailed but practical meeting report from this transcript.\n\nInclude:\n1. Executive Overview\n2. Key Discussion Points\n3. Key Decisions\n4. Action Items with owner/deadline when explicitly available\n5. Risks, blockers, or unresolved questions\n6. Next Steps\n\nDo not invent names, decisions, deadlines, or facts. If something is not stated, say it is not specified.\n\nTranscript:\n${transcript}`;
      const report = await callGeminiAPI([{ role: 'user', parts: [{ text: reportPrompt }] }], 'You are a professional meeting intelligence assistant. Produce accurate, structured, actionable reports from the supplied transcript.');
      stopAILoading();
      state.messages = state.messages.filter(m => !m.isLoading);
      state.messages.push({ id: `report-${Date.now()}`, role: 'assistant', text: report });
      render();
      openEmailComposer(report);
    } catch (err) {
      stopAILoading();
      state.messages = state.messages.filter(m => !m.isLoading);
      state.messages.push({ id: `report-error-${Date.now()}`, role: 'assistant', text: `Could not generate the meeting report. ${err.message || 'Gemini request failed.'}` });
      render();
      showToast('Report generation failed. Check your Gemini API key.');
    }
  }

  function showTooltip(targetEl, label, shortcut) {
    const tip = shadow.getElementById('tip-bubble');
    const tipText = shadow.getElementById('tip-text');
    const tipKbd = shadow.getElementById('tip-kbd');
    if (!tip || !tipText) return;

    tipText.textContent = label;
    if (tipKbd) {
      tipKbd.textContent = shortcut || '';
      tipKbd.style.display = shortcut ? 'inline-block' : 'none';
    }

    const rect = targetEl.getBoundingClientRect();
    const dockRect = shadow.getElementById('dock-container').getBoundingClientRect();

    if (state.edge === 'bottom') {
      tip.className = 'tip-bubble tip-top';
      tip.style.left = `${rect.left + rect.width / 2 - dockRect.left}px`;
      tip.style.top = '';
      tip.style.bottom = `${dockRect.height + 8}px`;
    } else if (state.edge === 'top') {
      tip.className = 'tip-bubble tip-bottom';
      tip.style.left = `${rect.left + rect.width / 2 - dockRect.left}px`;
      tip.style.top = `${dockRect.height + 8}px`;
      tip.style.bottom = '';
    } else if (state.edge === 'left') {
      tip.className = 'tip-bubble tip-right';
      tip.style.left = `${dockRect.width + 8}px`;
      tip.style.top = `${rect.top + rect.height / 2 - dockRect.top}px`;
    } else {
      tip.className = 'tip-bubble tip-left';
      tip.style.left = '';
      tip.style.right = `${dockRect.width + 8}px`;
      tip.style.top = `${rect.top + rect.height / 2 - dockRect.top}px`;
    }

    tip.style.opacity = '1';
  }

  function hideTooltip() {
    const tip = shadow.getElementById('tip-bubble');
    if (tip) tip.style.opacity = '0';
  }

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: #18181b;
      color: #f4f4f5;
      border: 1px solid rgba(255,255,255,0.15);
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      box-shadow: 0 10px 25px rgba(0,0,0,0.6);
      z-index: 2147483647;
    `;
    toast.textContent = msg;
    shadow.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  function getPageUrl(relativePath) {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL) {
      try {
        return chrome.runtime.getURL(relativePath);
      } catch (_) {}
    }
    return relativePath;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function truncate(str, max) {
    if (!str) return '';
    return str.length > max ? str.substring(0, max) + '…' : str;
  }

  // ==========================================================================
  // KokonutUI Synced Transcript Controller & Playback Engine
  // ==========================================================================

  function updateWordsHighlight(activeIdx) {
    const wordEls = shadow.querySelectorAll('.transcript-word');
    wordEls.forEach(el => {
      const idx = parseInt(el.getAttribute('data-index'), 10);
      if (idx <= activeIdx) {
        if (!el.classList.contains('spoken')) {
          el.classList.add('spoken');
          el.classList.remove('upcoming');
        }
      } else {
        if (!el.classList.contains('upcoming')) {
          el.classList.add('upcoming');
          el.classList.remove('spoken');
        }
      }
    });
  }

  function scrollToWord(el, smooth) {
    const box = shadow.getElementById('transcript-scroll-box');
    if (!box || !el) return;
    // Keep the spoken line approximately a third of the way down, like lyrics
    const top = box.scrollTop + el.getBoundingClientRect().top - box.getBoundingClientRect().top - box.clientHeight / 3;
    box.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
  }

  function updateMarkAndScroll() {
    const mark = shadow.getElementById('transcript-mark');
    const content = shadow.getElementById('transcript-content-isolate');
    if (!mark || !content) return;

    const active = syncedState.activeWord;
    const el = content.querySelector(`[data-index="${active}"]`);
    if (!el) {
      mark.style.opacity = '0';
      syncedState.lastTop = null;
      return;
    }

    const sameLine = syncedState.lastTop === el.offsetTop;
    mark.style.transition = sameLine
      ? 'transform 140ms cubic-bezier(0.23, 1, 0.32, 1), width 140ms cubic-bezier(0.23, 1, 0.32, 1), opacity 150ms ease-out'
      : 'opacity 150ms ease-out';

    // Discard trailing whitespace from mark measurement
    const fontSize = parseFloat(window.getComputedStyle(el).fontSize) || 15;
    const space = fontSize * 0.28;
    mark.style.transform = `translate(${el.offsetLeft - 3}px, ${el.offsetTop}px)`;
    mark.style.width = `${el.offsetWidth - space + 6}px`;
    mark.style.height = `${el.offsetHeight}px`;
    mark.style.opacity = '1';

    if (!sameLine && syncedState.following) {
      scrollToWord(el, syncedState.lastTop !== null);
    }
    syncedState.lastTop = el.offsetTop;
  }

  function checkAway() {
    const box = shadow.getElementById('transcript-scroll-box');
    const content = shadow.getElementById('transcript-content-isolate');
    const backBtn = shadow.getElementById('transcript-back-to-now');
    const backIcon = shadow.getElementById('back-to-now-icon');
    if (!box || !content || !backBtn) return;

    const active = syncedState.activeWord;
    const el = content.querySelector(`[data-index="${active}"]`);

    if (!el || syncedState.following) {
      syncedState.away = null;
      backBtn.classList.remove('visible');
      return;
    }

    const word = el.getBoundingClientRect();
    const view = box.getBoundingClientRect();

    if (word.bottom < view.top) {
      syncedState.away = 'up';
      backBtn.classList.add('visible');
      if (backIcon) backIcon.innerHTML = ICONS.arrowUp;
    } else if (word.top > view.bottom) {
      syncedState.away = 'down';
      backBtn.classList.add('visible');
      if (backIcon) backIcon.innerHTML = ICONS.arrowDown;
    } else {
      syncedState.away = null;
      backBtn.classList.remove('visible');
    }
  }

  function seekSyncedTranscript(seconds) {
    const next = Math.max(0, Math.min(seconds, syncedState.duration));
    syncedState.time = next;
    updateActiveWordFromTime();
    updateSyncedUI();
  }

  function updateActiveWordFromTime() {
    let active = -1;
    for (const word of syncedState.flat) {
      if (word.start <= syncedState.time) {
        active = word.index;
      } else {
        break;
      }
    }
    if (active !== syncedState.activeWord) {
      syncedState.activeWord = active;
      updateWordsHighlight(active);
      updateMarkAndScroll();
    }
    checkAway();
  }

  function updateSyncedUI() {
    const curEl = shadow.getElementById('synced-time-current');
    if (curEl) curEl.textContent = formatTime(syncedState.time);

    const durEl = shadow.getElementById('synced-time-duration');
    if (durEl) durEl.textContent = formatTime(syncedState.duration);

    const fill = shadow.getElementById('synced-progress-fill');
    if (fill && syncedState.duration > 0) {
      const ratio = Math.max(0, Math.min(1, syncedState.time / syncedState.duration));
      fill.style.transform = `scaleX(${ratio})`;
    }

    const slider = shadow.getElementById('synced-progress-slider');
    if (slider) slider.setAttribute('aria-valuenow', syncedState.time.toFixed(1));
  }

  function startSyncedPlayback() {
    if (syncedState.playing) return;
    syncedState.playing = true;
    syncedState.lastTick = performance.now();

    const playBtn = shadow.getElementById('btn-synced-play');
    if (playBtn) playBtn.innerHTML = ICONS.pause;

    function tick(now) {
      if (!syncedState.playing) return;
      const rate = SPEEDS[syncedState.speedIndex] || 1;
      const delta = (now - syncedState.lastTick) / 1000;
      syncedState.lastTick = now;

      const next = Math.min(syncedState.duration, syncedState.time + delta * rate);
      syncedState.time = next;
      updateActiveWordFromTime();
      updateSyncedUI();

      if (next >= syncedState.duration) {
        stopSyncedPlayback();
        return;
      }
      syncedState.rafId = requestAnimationFrame(tick);
    }
    syncedState.rafId = requestAnimationFrame(tick);
  }

  function stopSyncedPlayback() {
    syncedState.playing = false;
    if (syncedState.rafId) {
      cancelAnimationFrame(syncedState.rafId);
      syncedState.rafId = null;
    }
    const playBtn = shadow.getElementById('btn-synced-play');
    if (playBtn) playBtn.innerHTML = ICONS.play;
  }

  function toggleSyncedPlayback() {
    if (syncedState.playing) {
      stopSyncedPlayback();
    } else {
      if (syncedState.time >= syncedState.duration - 0.2) {
        seekSyncedTranscript(0);
        syncedState.following = true;
        const firstEl = shadow.querySelector('.transcript-word[data-index="0"]');
        if (firstEl) scrollToWord(firstEl, true);
      }
      startSyncedPlayback();
    }
  }

  function initSyncedTranscript() {
    const box = shadow.getElementById('transcript-scroll-box');
    const content = shadow.getElementById('transcript-content-isolate');
    const mark = shadow.getElementById('transcript-mark');
    const backBtn = shadow.getElementById('transcript-back-to-now');
    const speedBtn = shadow.getElementById('btn-synced-speed');
    const segmentsContainer = shadow.getElementById('transcript-segments-container');
    if (!box || !content || !mark) return;

    // 1. Speed Switcher (1x -> 1.5x -> 2x)
    if (speedBtn) {
      speedBtn.onclick = (e) => {
        e.stopPropagation();
        syncedState.speedIndex = (syncedState.speedIndex + 1) % SPEEDS.length;
        speedBtn.textContent = `${SPEEDS[syncedState.speedIndex]}×`;
      };
    }

    // 2. Keyboard shortcuts on scroll box
    box.onkeydown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        seekSyncedTranscript(syncedState.time + 5);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        seekSyncedTranscript(syncedState.time - 5);
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggleSyncedPlayback();
      }
    };

    // 4. Interactive Word & Timestamp clicks
    if (segmentsContainer) {
      segmentsContainer.onclick = (e) => {
        const wordEl = e.target.closest('.transcript-word');
        if (wordEl) {
          e.stopPropagation();
          const idx = parseInt(wordEl.getAttribute('data-index'), 10);
          const targetWord = syncedState.flat[idx];
          if (targetWord) {
            seekSyncedTranscript(targetWord.start);
            syncedState.following = true;
            scrollToWord(wordEl, true);
          }
          return;
        }

        const timeBtn = e.target.closest('.synced-time-btn');
        if (timeBtn) {
          e.stopPropagation();
          const t = parseFloat(timeBtn.getAttribute('data-time'));
          if (!isNaN(t)) {
            seekSyncedTranscript(t);
            syncedState.following = true;
            const el = shadow.querySelector(`[data-index="${syncedState.activeWord}"]`);
            if (el) scrollToWord(el, true);
          }
          return;
        }
      };
    }

    // 5. Scroll & Away Detection
    box.onwheel = () => {
      syncedState.following = false;
      checkAway();
    };

    box.ontouchmove = () => {
      syncedState.following = false;
      checkAway();
    };

    box.onscroll = () => {
      if (!syncedState.following) {
        checkAway();
      }
    };

    // 6. "Back to now" Floating Pill
    if (backBtn) {
      backBtn.onclick = (e) => {
        e.stopPropagation();
        syncedState.following = true;
        syncedState.away = null;
        backBtn.classList.remove('visible');
        const el = shadow.querySelector(`[data-index="${syncedState.activeWord}"]`);
        if (el) scrollToWord(el, true);
      };
    }

    // 7. Initial positioning & mark layout
    updateActiveWordFromTime();
    updateSyncedUI();
    updateMarkAndScroll();
    if (syncedState.following && syncedState.activeWord >= 0) {
      const el = shadow.querySelector(`[data-index="${syncedState.activeWord}"]`);
      if (el) scrollToWord(el, false);
    }
  }

  // Global Keyboard Shortcuts (V, R, M, S, T, C, Escape)
  window.addEventListener('keydown', (e) => {
    // Ignore when typing inside input/textarea/contentEditable
    const active = shadow.activeElement || document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
      return;
    }

    const key = e.key.toUpperCase();
    if (key === 'R') {
      if (state.isRecording) {
        stopRealtimeRecognition();
      } else {
        startRealtimeRecognition('tab');
      }
    } else if (key === 'M') {
      selectTool('shapes');
    } else if (key === 'S') {
      selectTool('summary');
    } else if (key === 'T') {
      selectTool('scrollIndex');
    } else if (key === 'C') {
      selectTool('comment');
    } else if (key === 'K') {
      selectTool('auth');
    } else if (e.key === 'Escape') {
      stopSyncedPlayback();
      state.flyoutOpenId = null;
      state.modalOpen = false;
      state.scrollIndexModalOpen = false;
      state.authModalOpen = false;
      state.googleChooserOpen = false;
      render();
    }
  });

  window.__ZOOM_DOCK__ = {
    state,
    syncedState,
    render,
    selectTool,
    submitChat,
    callGeminiAPI,
    getMeetingTranscriptText,
    startRealtimeRecognition,
    stopRealtimeRecognition,
    processAudioWithGnani,
    commitLiveSentence,
    updateLiveInterimDOM,
    seekSyncedTranscript,
    startSyncedPlayback,
    stopSyncedPlayback,
    toggleSyncedPlayback,
    openAuthModal: () => { state.authModalOpen = true; render(); },
    closeAuthModal: () => { state.authModalOpen = false; render(); },
    minimizeDock: () => { state.dockMinimized = true; render(); },
    restoreDock: () => { state.dockMinimized = false; render(); },
    startAILoading,
    stopAILoading
  };

  // Keystrokes typed into the dock must not reach the host page's own shortcuts
  // (e.g. YouTube treats k / m / f / c as hotkeys).
  ['keydown', 'keyup', 'keypress'].forEach(type => {
    appRoot.addEventListener(type, (e) => {
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) e.stopPropagation();
    });
  });

  // Keys saved or removed in another tab show up here immediately.
  if (HAS_EXT_STORAGE) {
    try {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'local') return;
        if (!SETTINGS_KEYS.some(k => k in changes)) return;
        settingsStore.get(SETTINGS_KEYS).then(saved => { applyStoredSettings(saved); });
      });
    } catch (_) {}
  }

  render();
  loadStoredSettings().then(() => render());
})();
