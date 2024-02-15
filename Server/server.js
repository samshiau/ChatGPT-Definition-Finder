const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(cors());

app.post('/get-definition', (req, res) => {
  const text = req.body.text;
  // Here, you would implement the logic to get the definition of 'text'
  // For now, let's just send back the text received
  res.json({ definition: `Definition of ${text} is .....` });
  console.log('got a request from the extension');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
