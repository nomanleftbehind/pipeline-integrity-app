const mongoose = require('mongoose');
const { Schema } = mongoose;

const PipelineSchema = new Schema({
  license: {type: String, required: true},
  segment: {type: String, required: true},
  substance: {type: String, required: true},
  from: {type: String, required: true},
  to: {type: String, required: true},
  injection_points: [{type: Schema.Types.ObjectId, ref: 'InjectionPoints'}],
  status: {type: String, required: true, enum: ['Operating', 'Discontinued', 'Abandoned'], default: 'Operating'},
  created_at: { type: Date, default: Date.now }
});

// Virtual for pipeline's license and segment
PipelineSchema
  .virtual('license & segment')
  .get(function () {
    return this.license + '-' + this.segment;
  });

// Virtual for pipeline's URL
PipelineSchema
  .virtual('url')
  .get(function () {
    return '/pipeline/' + this._id;
  });

//Export model
module.exports =  mongoose.model('Pipelines', PipelineSchema);