const mongoose = require('mongoose');
const { Schema } = mongoose;

const satelliteSchema = new Schema({
  name: { type: String, required: true },
  facility: { type: Schema.Types.ObjectId, ref: 'Facilities', required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Satellites', satelliteSchema);