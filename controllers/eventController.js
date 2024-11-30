const { Event } = require('../models'); // Import the Event model
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    // Check for missing fields
    if (!title || !description || !image) {
      return res.status(400).json({ message: 'Title, description, and image are required' });
    }

    // Create the event
    const event = await Event.create({ title, description, image });
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    const updatedEvents = events.map((event) => ({
      ...event.toJSON(),
      image: event.image ? `http://localhost:5001/uploads/${event.image}` : null,
    }));
    res.status(200).json(updatedEvents);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching events',
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  upload,
};
