const express = require('express');
const router = express.Router();
const analysisController = require('./../controllers/analysisController');
const {handleParamsErrors} = require('../middlewares/middlewares');

const analysisParam = {
  siteUrl: 'string',
}

router.post('', handleParamsErrors(analysisParam), analysisController.makeAnalysis);


module.exports = router;
