const express = require('express');
const { createEvent, getAllEvents, upload } = require('../controllers/eventController');
const router = express.Router();

router.post('/create', upload.single('image'), createEvent);
router.get('/', getAllEvents);

module.exports = router;
