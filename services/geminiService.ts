import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingContent = async (productName: string, type: 'post' | 'desc' | 'ad'): Promise<string> => {
  try {
    let prompt = "";
    
    switch (type) {
      case 'post':
        prompt = `Write a high-impact LinkedIn post for a B2B audience about: "${productName}". 
        Requirements:
        - Use short, punchy sentences.
        - Focus on the problem it solves.
        - No cheesy emojis (keep it minimal).
        - End with a thought-provoking question.`;
        break;
      case 'desc':
        prompt = `Write a premium product description for "${productName}". 
        Requirements:
        - Style: Apple-like, minimalist, confident.
        - Focus on: Efficiency, Design, Outcome.
        - Structure: One bold headline, followed by a short paragraph.`;
        break;
      case 'ad':
        prompt = `Write a Google Search Ad copy for "${productName}".
        Requirements:
        - Headline 1: Benefit focused.
        - Headline 2: Feature focused.
        - Description: Clear call to action. 90 characters max.`;
        break;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a senior copywriter for a top-tier tech startup in San Francisco. Your tone is confident, concise, and devoid of fluff. You prioritize clarity and logic over hype.",
        temperature: 0.6,
      }
    });

    return response.text || "System Busy: Please try again shortly.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Network Error: Unable to reach the AI Engine. Please check your connection.";
  }
};