const express = require('express');
const tourController = require('../Controller/userController');

const { getAllUsers, createUser, getUser, updateUser, deleteUser } = tourController;

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
