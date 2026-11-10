/**
 * Google Gemini LLM API Service
 * Powered by Google Generative AI (gemini-3.1-flash-lite / gemini-flash)
 * Endpoint: https://generativelanguage.googleapis.com/v1beta/models
 */

export class GeminiLLMService {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey || (function() {
      try {
        return localStorage.getItem('gemini_api_key') || "";
      } catch (_) {
        return "";
      }
    })();
    this.model = options.model || "gemini-3.1-flash-lite";
    this.baseUrl = "https://generativelanguage.googleapis.com/v1beta/models";
  }

  /**
   * Set or update the Gemini API Key
   * @param {string} key
   */
  setApiKey(key) {
    if (key && typeof key === 'string') {
      this.apiKey = key.trim();
      try {
        localStorage.setItem('gemini_api_key', this.apiKey);
      } catch (_) {}
    }
  }

  /**
   * Internal request handler with automatic model fallback
   * @private
   */
  async _generate(contents, systemInstruction = null) {
    if (!this.apiKey) {
      throw new Error("Google Gemini API Key is missing. Please set it in Settings / Login.");
    }

    const payload = { contents };
    if (systemInstruction) {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const modelsToTry = [this.model, "gemini-3.1-flash-lite", "gemini-flash-latest"];
    let lastError = null;

    for (const model of modelsToTry) {
      const url = `${this.baseUrl}/${model}:generateContent?key=${encodeURIComponent(this.apiKey)}`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData?.error?.message || response.statusText;
          // If model is overloaded (503) or not found (404), try the fallback
          if (response.status === 503 || response.status === 404) {
            lastError = new Error(`Gemini (${model}): ${errMsg}`);
            continue;
          }
          throw new Error(`Gemini API Error (${response.status}): ${errMsg}`);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          throw new Error("No text returned by Gemini model.");
        }
        return text;
      } catch (err) {
        lastError = err;
        // If it's a network or fallback error, try next model
        continue;
      }
    }

    throw lastError || new Error("Failed to communicate with Google Gemini API.");
  }

  /**
   * Generates a structured executive meeting summary from a transcript.
   * @param {string} transcriptText - The full transcript text
   * @returns {Promise<{ summary: string, decisions: string[], actionItems: Array<{ task: string, owner: string }> }>}
   */
  async generateMeetingSummary(transcriptText) {
    const systemPrompt = `You are an elite executive AI meeting companion.
Analyze the provided meeting transcript and return a clear, high-impact summary.
Structure your answer into:
1. **Executive Overview**: 2-3 concise sentences summarizing the objective and core outcome with new line each.
2. **Key Decisions**: Bullet points of decisions agreed upon.
3. **Action Items & Deliverables**: Specific tasks assigned with their owner/deadline.
Keep the formatting clean, professional, and directly actionable.`;

    const userPrompt = `Here is the meeting transcript:\n\n${transcriptText || "No recorded dialogue yet."}\n\nPlease generate the comprehensive meeting summary and action deliverables.`;

    const rawText = await this._generate([
      { parts: [{ text: userPrompt }] }
    ], systemPrompt);

    return rawText;
  }

  /**
   * Conversational meeting assistant chatbot with transcript context.
   * @param {Array<{ role: 'user' | 'assistant', text: string }>} chatHistory - Previous conversation
   * @param {string} userMessage - New user prompt
   * @param {string} transcriptContext - Full or recent meeting transcript
   * @returns {Promise<string>}
   */
  async chat(chatHistory = [], userMessage, transcriptContext = "") {
    const systemPrompt = `You are Zoom Meeting Dock AI, a brilliant real-time AI companion embedded in a Zoom / video meeting.
You have access to the live meeting transcript and memory & write every point in new line.
Your goals:
- Answer questions accurately using the meeting transcript as ground truth.
- Help attendees clarify decisions, adjust task assignments, and formulate follow-up emails.
- If the user asks to save something or creates a task, explicitly formulate the task clearly so it can be added to memory.
- Be concise, friendly, and direct.

Current Meeting Transcript Context:
"""
${transcriptContext || "The meeting has just begun. No spoken words recorded yet."}
"""`;

    // Map conversation into Gemini format
    const contents = [];
    for (const msg of chatHistory.slice(-8)) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    return await this._generate(contents, systemPrompt);
  }

  /**
   * Extracts actionable deliverables and tasks from text to save into Memory.
   * @param {string} text - Message or summary text
   * @returns {Promise<Array<{ text: string, group: string }>>}
   */
  async extractDeliverables(text) {
    const prompt = `Extract discrete action items and decisions from this text as JSON array:
[{"text": "Task description with deadline", "group": "Owner name or category"}]
Return ONLY raw valid JSON array, nothing else. Text:
"""${text}"""`;

    try {
      const result = await this._generate([{ parts: [{ text: prompt }] }]);
      const cleaned = result.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {
      // Fallback
    }
    return [];
  }
}

// Global browser window export
if (typeof window !== 'undefined') {
  window.GeminiLLMService = GeminiLLMService;
}
