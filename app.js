const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', appName: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You Can Post');
});

const port = 8000;
app.listen(port, () => {
  console.log('Listening...');
});
