const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // Create Query Object
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((ele) => delete queryObj[ele]);

    // Advanced Filtering
    console.log(req.query);
    console.log(queryObj);
    let queryStr = JSON.stringify(queryObj);
    // { duration: '5', price: { lt: '400' } }
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (matchValue) => `$${matchValue}`);
    const query = Tour.find(JSON.parse(queryStr));

    // Execute Query
    const tours = await query;

    const numberOfTours = tours.length;
    res.status(200).json({
      status: 'success',
      result: numberOfTours,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({ message: 'fail', error: err });
  }
};

exports.getTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({ message: 'fail', error: err });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', data: { updatedTour } });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ status: 'err', error: err });
  }
};
