import Groq from 'groq-sdk'; 
   
export const getChatResponse = async (req, res) => { 

    // Groq SDK setup
    const groq = new Groq({ apiKey: "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" }); 
    try {
        const { userMessage } = req.body;
        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: "user", content: userMessage }],
          model: "llama3-8b-8192",
        });
        res.json({ reply: chatCompletion.choices[0]?.message?.content || "" });
      } catch (error) {
        console.error("Error with Groq API:", error);
        res.status(500).json({ error: "Failed to generate a response." });
      }
}
