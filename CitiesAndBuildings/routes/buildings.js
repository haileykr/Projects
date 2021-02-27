const express = require('express');
const router = express.Router();

const Building = require('../models/building');
const Fact =require('../models/fact'); 
const buildings = require('../controllers/buildings');

const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({storage})

const {isLoggedIn, validateBuilding, isAuthor} = require('../middleware');

const catchAsync = require('../utils/catchAsync');

router.route('/')
    .get(catchAsync (buildings.index))
    .post(
        isLoggedIn,
        upload.array('image'),
        validateBuilding,
        catchAsync(buildings.createBuilding));

router.route('/new')
    .get(isLoggedIn, buildings.renderNewForm);

router.route('/:id')
    .get(catchAsync(buildings.showBuilding))
    .put(
        isLoggedIn,
        isAuthor,
        upload.array('image'),
        validateBuilding,
        catchAsync(buildings.updateBuilding))
    .delete(isLoggedIn, isAuthor, catchAsync(buildings.destroyBuilding))

router.route('/:id/edit')
    .get(isLoggedIn, isAuthor,catchAsync(buildings.renderEditForm))


module.exports = router;



