const mongoose = require('mongoose');
const { Schema } = mongoose;

const facilitySchema = new Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Facilities', facilitySchema);