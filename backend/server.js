


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const propertiesRouter = require('./routes/properties');
const tasksRouter = require('./routes/tasks'); // Import the tasks router

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/test', {
 
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});


app.use('/properties', propertiesRouter);
app.use('/tasks', tasksRouter); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
