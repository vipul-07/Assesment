const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');



/* API for uploading a csv file to the Server */
router.post('/upload', controller.upload);


module.exports = router;