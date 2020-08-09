var express = require('express');
var router = express.Router();

const studentController = require('../controllers/student.controller');

router.get('/:id', studentController.getData);

module.exports = router;
