const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');

const {validateFact, isLoggedIn, isFactAuthor } = require('../middleware');
const facts =require('../controllers/facts');

router.route('/')
    .get(isLoggedIn, catchAsync(facts.renderFactsForm))
    .post(isLoggedIn, validateFact,catchAsync(facts.createFact));
router.delete('/:factId',isLoggedIn,isFactAuthor,catchAsync(facts.deleteFact));
module.exports = router;