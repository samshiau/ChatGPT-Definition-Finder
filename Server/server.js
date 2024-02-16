require('dotenv').config();  
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai').default;  

const app = express();
const port = 3000;
const openai = new OpenAI();

app.use(express.json());  
app.use(cors());

app.post('/get-definition', async (req, res) => {
  const text = req.body.text;
  console.log('here 1');

  try {
   
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [{ role: "system", content: "Give me a short definition of the text:"+text }],  
      temperature: 0,
      max_tokens: 150,  
    });
    
    console.log('API Response ....:', response);

    console.log('API Response message content:', response.choices[0].message.content.trim());
    
    res.json({ definition: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error connecting to OpenAI:', error);
    res.status(500).send('Error processing your request');
  }

  console.log('Got a request from the extension');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
