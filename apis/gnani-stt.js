/**
 * Gnani.ai / Vachana.ai Speech-to-Text API Service
 * Endpoint: https://api.vachana.ai/stt/v3
 */

export class GnaniSTTService {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey || (function() {
      try {
        return localStorage.getItem('gnani_api_key') || "";
      } catch (_) {
        return "";
      }
    })();
    this.endpoint = options.endpoint || "https://api.vachana.ai/stt/v3";
    this.model = options.model || "prisma-v3.0";
    this.language = options.language || ["hi-IN", "en-IN"];
    this.mode = options.mode || "codemix";
  }

  /**
   * Set or update Gnani API Key
   * @param {string} key
   */
  setApiKey(key) {
    if (key && typeof key === 'string') {
      this.apiKey = key.trim();
      try {
        localStorage.setItem('gnani_api_key', this.apiKey);
      } catch (_) {}
    }
  }

  /**
   * Transcribe an audio file or Blob via Gnani Prisma v3.0
   * @param {Blob | File} audioBlob - The recorded or uploaded audio
   * @param {string} fileName - Optional file name (e.g. "meeting.wav")
   * @returns {Promise<string>} The transcribed text
   */
  async transcribeAudio(audioBlob, fileName = "meeting-audio.wav") {
    if (!this.apiKey) {
      throw new Error("Gnani API Key is missing. Please set it in Settings / Login.");
    }

    const formData = new FormData();
    formData.append("audio_file", audioBlob, fileName);
    formData.append("model", this.model);
    formData.append("language", Array.isArray(this.language) ? this.language.join(",") : this.language);
    formData.append("format", this.mode);

    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "X-API-Key-ID": this.apiKey
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gnani STT Error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    if (typeof result === "string") return result;
    if (result.transcript) return result.transcript;
    if (result.text) return result.text;
    if (result.data && result.data.transcript) return result.data.transcript;
    return JSON.stringify(result);
  }
}

// Global browser window export
if (typeof window !== 'undefined') {
  window.GnaniSTTService = GnaniSTTService;
}
