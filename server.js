const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }).then((con) => {
  console.log(con);
  console.log('Good Connection');
});

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: { type: Number, default: 4.5 },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({ name: 'Third tour', price: 300, rating: 7 });

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err));

const port = 8000;
app.listen(port, () => {
  console.log('Listening...');
});
