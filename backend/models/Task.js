// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, default: 'Pending' },
  type: { type: String, required: true },
  subtype: { type: String },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true } // Assuming you have a Property model
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
