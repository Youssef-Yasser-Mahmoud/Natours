const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Good Connection');
});

const port = 8000;
app.listen(port, () => {
  console.log('Listening...');
});
