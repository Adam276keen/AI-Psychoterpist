
import { GoogleGenAI, Chat, GenerateContentResponse, Content } from "@google/genai";
import { GEMINI_CHAT_MODEL, UI_STRINGS } from '../constants'; // UI_STRINGS for system instruction
import { ChatMessage, Language } from "../types";

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const getAiInstance = (): GoogleGenAI => {
  if (!ai) {
    if (!process.env.API_KEY) {
      // This error will be caught and localized by the calling UI component
      throw new Error("API_KEY_MISSING"); 
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

// Initialize or re-initialize the chat with a specific language context
export const initializeChat = async (language: Language, history?: Content[]): Promise<Chat> => {
  const currentAi = getAiInstance();
  const systemInstruction = UI_STRINGS[language].PSYCHOTHERAPY_SYSTEM_INSTRUCTION as string;
  
  // Create a new chat instance with the specified system instruction and optional history
  chat = currentAi.chats.create({
    model: GEMINI_CHAT_MODEL,
    config: {
      systemInstruction: systemInstruction,
      // temperature: 0.7, // Optional
    },
    history: history || [], 
  });
  console.log(`Chat initialized for language: ${language}`);
  return chat;
};

export const getAiChatResponse = async (userMessage: string, currentHistory: ChatMessage[], language: Language): Promise<string> => {
  try {
    // Ensure chat is initialized, especially if language might have changed or it's the first call
    if (!chat || (chat && (chat as any)._config?.systemInstruction !== UI_STRINGS[language].PSYCHOTHERAPY_SYSTEM_INSTRUCTION)) {
       // Convert ChatMessage[] to Content[] for history seeding
      const geminiHistory: Content[] = currentHistory
        .filter(msg => msg.text !== (UI_STRINGS[language].initialGreeting as string)) // Exclude initial greeting from history if present
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        }));
      await initializeChat(language, geminiHistory);
    }
    
    if (!chat) { // Should be initialized by now, but as a safeguard
        throw new Error("Chat not initialized");
    }

    const result: GenerateContentResponse = await chat.sendMessage({ message: userMessage });
    return result.text;

  } catch (error: any) {
    console.error("Error getting AI response:", error);
    if (error.message === "API_KEY_MISSING") {
        throw error; // Re-throw to be handled by UI
    }
    // For other errors, return a generic message key or the message itself if not translatable
    throw new Error(error.message || "AI_RESPONSE_ERROR");
  }
};

export const resetChat = (): void => {
  chat = null; 
  console.log("Gemini chat instance reset.");
};
