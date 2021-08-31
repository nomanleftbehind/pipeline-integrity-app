const mongoose = require('mongoose');
const { Schema } = mongoose;

const InjectionPointSchema = new Schema({
  source: {type: String, required: isSourceRequired},
  oil: {type: Number, required: true},
  water: {type: Number, required: true},
  gas: {type: Number, required: true}
});

function isSourceRequired () {
  return typeof this.source === "string" ? false : true
}

// Virtual for injection point's URL
InjectionPointSchema
  .virtual('url')
  .get(function () {
    return '/injpoint/' + this._id;
  });

module.exports =  mongoose.model('InjectionPoints', InjectionPointSchema);