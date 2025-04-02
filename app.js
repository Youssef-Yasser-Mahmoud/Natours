const express = require('express');
const morgan = require('morgan');

const userRouter = require('./Routes/userRouter');
const tourRouter = require('./Routes/tourRouter');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static('./public'));

app.use((req, res, next) => {
  console.log('Hi from middleware');
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
