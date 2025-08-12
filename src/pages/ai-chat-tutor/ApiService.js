export class ApiService {
  static async sendMessage(userMessage) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: `You are "Buddy", a cheerful and patient AI tutor for Indian children. 
              Your job is to make learning fun and simple, helping children (ages 8-15) understand 
              topics through short, clear, step-by-step explanations.
              
              Rules:
              1. Give answers in 2-4 very short, simple sentences
              2. Use easy English—no tough words or jargon
              3. Explain one idea at a time
              4. Use Indian examples (school, cricket, mangoes, festivals)
              5. Always end with a cheerful note like "Hope this helps! 😊"`
            },
            {
              role: "user",
              content: userMessage
            }
          ],
          temperature: 0.7,  // Controls creativity (0.0-1.0)
          max_tokens: 150    // Limits response length
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
      
    } catch (error) {
      console.error("API Error:", error);
      return "Buddy is taking a break! Try again in a minute 😊";
    }
  }
}
