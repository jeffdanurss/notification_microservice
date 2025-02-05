//microservice routes
const express = require('express');
const router = express.Router();

const { processNotification } = require('../controllers/notificationControllers');


//router.post('/send', processNotification);
router.post('/',processNotification);
module.exports = router;
