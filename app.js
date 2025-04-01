const express = require('express');
const userRouter = require('./Routes/userRouter');
const tourRouter = require('./Routes/tourRouter');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hi from middleware');
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
