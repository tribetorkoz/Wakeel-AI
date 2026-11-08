
import { GoogleGenAI, FunctionDeclaration, Tool, FunctionCall } from "@google/genai";

// Lazy client creation: SDK throws at module load if apiKey is null/undefined,
// which would crash the whole app when GEMINI_API_KEY is not set.
let _ai: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI => {
  if (_ai === null) {
    const env = (typeof process !== "undefined" && process.env) || {};
    const apiKey = env.API_KEY || env.GEMINI_API_KEY || "demo-key";
    _ai = new GoogleGenAI({ apiKey });
  }
  return _ai;
};

const ai: GoogleGenAI = new Proxy({} as GoogleGenAI, {
  get(_target, prop) {
    const client = getAI();
    const value = (client as any)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface AgentResponse {
  text?: string;
  functionCalls?: FunctionCall[];
}

export const generateAgentPersona = async (role: string, company: string): Promise<string> => {
  try {
    const prompt = `Create a system instruction for an AI agent.
    Role: ${role}
    Company: ${company}
    
    The instruction should be professional, concise, and tailored to the role.
    It should define how the agent behaves and what its responsibilities are.
    Return ONLY the system instruction text.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text || `You are a helpful AI agent acting as a ${role} for ${company}.`;
  } catch (error) {
    console.error("Error generating persona:", error);
    return `You are a helpful AI agent acting as a ${role} for ${company}.`;
  }
};

export const chatWithAgent = async (
  message: string, 
  systemInstruction: string,
  history: ChatMessage[],
  contextData?: string,
  tools?: FunctionDeclaration[]
): Promise<AgentResponse> => {
  try {
    // Construct the full prompt context
    // In a real app, we might pass history differently, but here we append context
    const fullSystemPrompt = `
    ${systemInstruction}

    [KNOWLEDGE BASE & CONTEXT]
    ${contextData || "No external context provided."}
    
    [INSTRUCTIONS]
    Answer the user's request based on your role and the provided context.
    `;

    const toolConfig: Tool[] | undefined = tools && tools.length > 0 ? [{ functionDeclarations: tools }] : undefined;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: fullSystemPrompt,
        temperature: 0.7,
        tools: toolConfig, 
      }
    });

    return {
      text: response.text,
      functionCalls: response.functionCalls
    };

  } catch (error) {
    console.error("Chat Error:", error);
    return { text: "I apologize, but I'm having trouble connecting to the neural network right now." };
  }
};

export const generateMarketingContent = async (topic: string, type: 'post' | 'desc' | 'ad'): Promise<string> => {
    try {
        let systemInstruction = '';
        if (type === 'post') {
            systemInstruction = 'You are a social media marketing expert. Write a short, engaging LinkedIn or Twitter post about the topic.';
        } else if (type === 'desc') {
            systemInstruction = 'You are a product manager. Write a concise, professional product description for the topic.';
        } else if (type === 'ad') {
            systemInstruction = 'You are a creative copywriter. Write a catchy, short ad copy for the topic.';
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: topic,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        return response.text || "No content generated.";
    } catch (error) {
        console.error("Marketing Content Error:", error);
        throw error;
    }
};
