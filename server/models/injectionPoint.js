const mongoose = require('mongoose');
const { Schema } = mongoose;

const InjectionPointSchema = new Schema({
  // battery: { type: String, required: true },
  source: { type: String, required: isSourceRequired },
  oil: { type: Number, required: true },
  water: { type: Number, required: true },
  gas: { type: Number, required: true },
  first_production: { type: Date },
  last_production: { type: Date },
  first_injection: { type: Date },
  last_injection: { type: Date },
  pv_unit_id: { type: String, required: isUnitIdRequired },
  pv_node_id: { type: String, required: isNodeIdRequired }
});

function isSourceRequired() {
  return typeof this.source === "string" ? false : true
}
function isUnitIdRequired() {
  return typeof this.pv_unit_id === "string" ? false : true
}
function isNodeIdRequired() {
  return typeof this.pv_node_id === "string" ? false : true
}

// Virtual for injection point's URL
InjectionPointSchema
  .virtual('url')
  .get(function () {
    return '/injpoint/' + this._id;
  });

module.exports = mongoose.model('InjectionPoints', InjectionPointSchema);