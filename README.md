# 🎙️ Gnani AI Meeting Dock

An AI-powered meeting assistant that converts live meeting conversations into structured meeting reports using **Gnani.ai Speech-to-Text** and **Google Gemini**. It provides real-time transcription, synchronized transcript playback, AI-generated summaries, and contextual meeting Q&A through a floating Chrome extension.

## ✨ Key Features

- **Live Meeting Transcription:** Captures meeting audio from browser tabs, shared screens, and microphones using Gnani.ai Prisma v3.0.
- **Multilingual Support:** Supports Hindi and English code-mixed speech recognition.
- **AI Meeting Reports:** Uses Google Gemini to generate structured reports containing executive overviews, key discussion points, decisions, action items, risks, and next steps.
- **Contextual Meeting Chat:** Ask questions about meeting discussions, decisions, and deliverables using transcript context.
- **Synced Transcript Player:** Provides timestamp-based word highlighting, audio seeking, auto-scrolling, and adjustable playback speeds.
- **Floating Meeting Dock:** Draggable, multi-edge interface with keyboard shortcuts and a standalone preview mode.
- **Automatic Model Fallback:** Handles Gemini model availability issues through fallback models.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Speech-to-Text | Gnani.ai Prisma v3.0 |
| LLM | Google Gemini |
| Frontend | JavaScript, HTML, CSS |
| Browser Extension | Chrome Manifest V3 |
| APIs | REST API, Fetch API |
| Storage | Chrome Storage API |

## 🚀 Installation & Setup

**1. Clone the repository**
```bash
git clone https://github.com/utkarshsingh171/Gnani_ai_meeting_app.git
cd zoom-meeting-dock
```

**2. Configure the API keys**

Obtain API credentials from:
- Gnani.ai – Speech-to-Text API
- Google AI Studio – Gemini API

Open the extension's **Login & API Keys** panel and configure both API keys.

**3. Load the Chrome Extension**

1. Open `chrome://extensions/` in Chrome.
2. Enable **Developer Mode**.
3. Click **Load unpacked**.
4. Select the `zoom-meeting-dock` project folder.
5. Open a supported meeting tab and start using the floating dock.

## 📂 Project Structure

```text
zoom-meeting-dock/
├── apis/
│   ├── gemini-llm.js
│   ├── gnani-stt.js
│   └── index.js
├── content/
│   ├── dock.js
│   └── dock.css
├── pages/
│   ├── privacy.html
│   └── terms.html
├── background.js
├── manifest.json
├── preview.html
└── README.md
```
Demo Video - https://drive.google.com/file/d/11jXt2IYU4zn3qcXCmtqKOt_kIjTCurtP/view?usp=drive_link

## 🔐 Privacy & Security

- API credentials are stored locally using Chrome Storage.
- Audio is processed for transcription without maintaining continuous audio recordings.
- Meeting transcripts remain in memory during the active session rather than being stored as meeting history.
- API communication is handled through the extension's background service worker.


**License:** MIT License
