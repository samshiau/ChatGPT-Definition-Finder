//backend, handle request from bg.js and send info to gpt
// handle key securily 
//**** the security key is currently a global env variable, which will raise security concern
require('dotenv').config();  
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai').default;  
const openai = new OpenAI(process.env.OPENAI_SECRET_KEY); // load the key from .env file

const app = express();
const port = 3000;   // port number

app.use(express.json());  
app.use(cors());

app.post('/get-definition', async (req, res) => {  // receive post request
  const text = req.body.text;  // get the text from the request
  console.log('here 1');

  try { // send request to chatgpt api
   
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [{ role: "system", content: "Give me a short definition of the text:"+text }],  
      temperature: 0,
      max_tokens: 150,  
    });
    
    console.log('API Response ....:', response);  // print out response for testing

    console.log('API Response message content:', response.choices[0].message.content.trim());  // access message it self
    
    res.json({ definition: response.choices[0].message.content.trim() });   //send back response to the extension
  } catch (error) {
    console.error('Error connecting to OpenAI:', error);
    res.status(500).send('Error processing your request');
  }

  console.log('Got a request from the extension');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
