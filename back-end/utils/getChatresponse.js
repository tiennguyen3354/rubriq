import Groq from 'groq-sdk'; 

   
export const getChatResponse = async (jsonFile) => { 

    // Groq SDK setup
    try {
         // Groq SDK setup
        const groq = new Groq({ apiKey: "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" }); 
        let llmGrading = []; 
        // Iterate over each student
        for (let i = 0; i < jsonFile.length; i++)
        {
            const student = jsonFile[i];
            const string = JSON.stringify(student, null, 2);  // Convert student's data to string
            
            // Send the student's data to Groq's model
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: `you are a teacher grading an assignment with informations provided in json style`
                    },
                    
                    {
                        role: "user",
                        content: `I will provide the information of the student in json file`,
                    }, 
                    {
                        role: "user",
                        content: `here is the provided json file ${string}`
                    },

                    {
                        role: "user",
                        content: "Return in JSON format with score and feedback alongside with student name graded"
                    }
                ],
                model: "llama3-8b-8192"
            });
  
            // Append the response/grade to the student's data
            const gradeResponse = chatCompletion.choices[0]?.message?.content || "No feedback found";
            console.log("response number ....................." + i); 
            console.log(i + ". RESPONSE  " + gradeResponse)
            
            const jsonMatch = gradeResponse.match(/\{.*\}/s); // Extracts JSON-like structure
            if (jsonMatch) {
                const jsonData = JSON.parse(jsonMatch[0]);
                llmGrading.push(jsonData)
                console.log("PUSHED " + i)
            } else { 
                console.log("didnt get to push")
            }
        }
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DONE ")
        console.log(llmGrading)
        return llmGrading

  
    } catch (error) {
        console.error("Error with Groq API:", error);
        res.status(500).json({ error: "Failed to generate a response." });
    }

}
