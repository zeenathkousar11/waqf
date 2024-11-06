const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['mosque', 'school', 'land'], required: true }
});

module.exports = mongoose.model('Property', PropertySchema);
