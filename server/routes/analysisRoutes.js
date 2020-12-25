const express = require('express');
const router = express.Router();
const analysisController = require('./../controllers/analysisController');

router.get('', analysisController.makeAnalysis);


module.exports = router;