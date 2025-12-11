
import { GoogleGenAI } from "@google/genai";
import type { Product } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY not found. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const askAboutProduct = async (product: Product, question: string): Promise<string> => {
  if (!API_KEY) {
    return "The AI assistant is currently unavailable. Please check the API key configuration.";
  }

  const model = 'gemini-2.5-flash';
  
  const prompt = `
    You are a helpful and friendly product expert for an e-commerce store called "Pure Store".
    A customer is asking a question about a product.
    Your knowledge is strictly limited to the product information provided below.
    Do not invent any details or features. If the information is not available, say that you don't have that information.
    Keep your answers concise and directly related to the question.

    **Product Information:**
    - Name: ${product.name}
    - Category: ${product.category}
    - Price: $${product.price}
    - Key Features: ${product.description}
    - Detailed Description: ${product.longDescription}
    - Customer Rating: ${product.rating} out of 5 stars from ${product.reviewCount} reviews.

    **Customer's Question:**
    "${question}"

    **Your Answer:**
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text ?? "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred while trying to get an answer. Please try again later.";
  }
};
