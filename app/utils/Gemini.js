import { GoogleGenerativeAI } from "@google/generative-ai";


export async function generateAIResponse({ prompt="Hey, i am Human" , modelGiven="gemini-1.5-flash" }) {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  try {
    const model = genAI.getGenerativeModel({ model: modelGiven });
    const promptGiven = prompt; 
    const result = await model.generateContent(promptGiven);
    const generatedText = result.response.text();
    console.log(generatedText)
    return generatedText;
  } catch (error) {
    console.error("Error generating AI response:", error);
    console.log(error)
    throw error;
  }
}