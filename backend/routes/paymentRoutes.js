const express = require('express');
const router = express.Router();
const { initiatePayment, handleIPN } = require('../controllers/paymentController');

// Route to start payment process
router.post('/initiate', initiatePayment);

// IPN callback route (PayTech will call this)
// Note: This route should be public (no auth)
router.post('/ipn', handleIPN);

module.exports = router;
