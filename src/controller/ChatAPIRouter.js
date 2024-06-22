const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const app = express();

 let ChatAPIRouter = express.Router();
const dotenv = require('dotenv');
     dotenv.config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(input) {
            // For text-only input, use the gemini-pro model
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
            const prompt = input;

          //   const result = await model.generateContent(prompt);
          //   const response = await result.response;
          //   const text = response.text();
            
          // # This is for chunks responses by using the Stream
              const result = await model.generateContentStream([prompt]);

                  let text = '';
                  for await (const chunk of result.stream) {
                  const chunkText = chunk.text();
                  console.log(chunkText);
                  text += chunkText;
                  }

                //console.log(text);
                return text;
}






function router(menu)
{

  

  ChatAPIRouter.route('/').post(async (req, res)=>{
        

          try {
            let input = req.body.input;
            let data = await run(input); // Use await to wait for the asynchronous function to resolve
            console.log(data);
            //res.send(data);
            res.json({ response: data });
          } catch (error) {
            console.error("Error:", error);
            res.status(500).send("An error occurred while fetching the response.");
          }
      });




      return ChatAPIRouter;

}


module.exports = router    