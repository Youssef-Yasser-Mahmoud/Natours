const Tour = require('../models/tourModel');

exports.getTopFiveCheapTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,duration,difficulty,price,ratingsAverage,summary';

  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // Create Query Object
    const queryObj = { ...req.query };
    // 1A) Filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((ele) => delete queryObj[ele]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (matchValue) => `$${matchValue}`);
    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    if (req.query.sort) {
      let sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy); // -price -duration
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Filed Limiting (select)
    if (req.query.fields) {
      let fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) {
        throw new Error('This Page does not Exist');
      }
    }

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
