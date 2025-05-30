
const express = require('express');
const connectDB = require('./config/Database');
const app = express();
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Use Dependancies
app.use(express.json()); 






// Routes configuration
app.get('/', (req, res) => {
  res.send('API is running...');
});






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
