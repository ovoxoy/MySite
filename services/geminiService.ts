import { GoogleGenAI, Type } from "@google/genai";
import { WebConcept } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWebConcept = async (businessName: string, businessType: string): Promise<WebConcept> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Erstelle ein Webseiten-Konzept für ein kleines Unternehmen in Deutschland.
      Name: ${businessName}
      Branche: ${businessType}
      
      Aufgabe:
      1. Generiere 3 kurze, moderne Werbeslogans (Deutsch).
      2. Schlage eine Navigationsstruktur für die Webseite vor (max 5 Punkte).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            slogans: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Liste von 3 Werbeslogans"
            },
            structure: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Liste der Navigationspunkte"
            }
          },
          required: ["slogans", "structure"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as WebConcept;
    }
    throw new Error("Keine Antwort von Gemini erhalten.");
  } catch (error) {
    console.error("Fehler bei der Generierung:", error);
    throw error;
  }
};