const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((ele) => ele.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Data Not Found' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    res.status(201).json({ status: 'success', data: { newTour } });
  });
};

const updateTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: '<element updated>' });
};

const deleteTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(204).json({ status: 'success', data: null });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

const port = 8000;
app.listen(port, () => {
  console.log('Listening...');
});
