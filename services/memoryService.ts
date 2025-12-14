
/**
 * Corporate Memory Engine (CME)
 * Handles persistent storage of company knowledge, policies, and data sources.
 * This acts as the "Brain" for the agents.
 */

interface MemoryChunk {
  id: string;
  type: 'text' | 'file' | 'policy' | 'database_config' | 'api_tool';
  name: string;
  content: string; // The actual text content used for RAG
  timestamp: string;
  metadata?: any; // Store API Keys/Config safely
}

const STORAGE_KEY = 'wakeel_corporate_memory';

// --- Core Memory Functions ---

export const saveMemory = (chunk: Omit<MemoryChunk, 'id' | 'timestamp'>) => {
  const currentMemory = getMemory();
  const newChunk: MemoryChunk = {
    ...chunk,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString()
  };
  
  const updatedMemory = [newChunk, ...currentMemory];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMemory));
  return newChunk;
};

export const getMemory = (): MemoryChunk[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const clearMemory = (id: string) => {
  const currentMemory = getMemory();
  const updated = currentMemory.filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const wipeAllMemory = () => {
    localStorage.removeItem(STORAGE_KEY);
}

// --- RAG Helper (Retrieval) ---

/**
 * Compiles all relevant memory into a single structured context string for the AI.
 */
export const getFullContextString = (): string => {
  const memory = getMemory();
  if (memory.length === 0) return "No external data provided.";

  // Separate tools from knowledge for cleaner injection
  const tools = memory.filter(m => m.type === 'api_tool' || m.type === 'database_config');
  const knowledge = memory.filter(m => m.type !== 'api_tool' && m.type !== 'database_config');

  let context = "";

  if (tools.length > 0) {
      context += "### AVAILABLE TOOLS & CAPABILITIES:\n";
      tools.forEach(t => {
          context += `- ${t.name}: ${t.content}\n`;
      });
      context += "\n";
  }

  if (knowledge.length > 0) {
      context += "### COMPANY KNOWLEDGE BASE:\n";
      knowledge.forEach(k => {
          context += `DOCUMENT: ${k.name}\nCONTENT:\n${k.content}\n---\n`;
      });
  }

  return context;
};

/**
 * Saves a Database connection string
 */
export const saveDatabaseConfig = (type: string, connectionString: string) => {
    saveMemory({
        type: 'database_config',
        name: `DB: ${type}`,
        content: `Connected via SQL Connector. Connection String: ${connectionString.replace(/:[^:]*@/, ':****@')} (Password Hidden). Schema: [users, orders, products].`,
        metadata: { connectionString }
    });
};

/**
 * Saves a Custom API Tool (Universal Connector)
 */
export const saveCustomApiTool = (name: string, url: string, description: string) => {
    saveMemory({
        type: 'api_tool',
        name: `Tool: ${name}`,
        content: `External API available at ${url}. Purpose: ${description}. To use this, the agent should output a JSON object with key 'call_api' and parameters.`,
        metadata: { url }
    });
};
