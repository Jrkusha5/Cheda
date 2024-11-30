require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models/'); 
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Middleware
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow cookies and credentials
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', authRoutes);
app.use('/api/events', eventRoutes);


// Test API root
app.get('/', (req, res) => {
  res.send('API is working');
});

// Database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('MySQL database connected successfully');
   // return sequelize.sync(); 
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
