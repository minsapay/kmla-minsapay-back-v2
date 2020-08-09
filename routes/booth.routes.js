var express = require('express');
var router = express.Router();

const boothController = require('../controllers/booth.controller');

router.post('/login', boothController.getData);
router.post('/payment', boothController.recordPayment);

module.exports = router;
