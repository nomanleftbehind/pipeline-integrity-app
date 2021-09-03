const mongoose = require('mongoose');
const { Schema } = mongoose;
const dateFormat = require("dateformat");

const from_to_feature = ['Blind end', 'Pipeline', 'Compressor station', 'Battery', 'Well', 'Satellite', 'Injection plant', 'Gas processing plant', 'Meter station', 'Storage tank', 'Pump station'];

const PipelineSchema = new Schema({
  license: { type: String, match: /^(AB|SK|BC)(\d{5}|\d{6})$/, /*minLength: 7, maxLength: 8,*/ required: true },
  segment: { type: String, required: true },
  substance: { type: String, enum: ['Natural Gas', 'Fresh Water', 'Salt Water', 'Crude Oil', 'Oil Well Effluent', 'LVP Products', 'Fuel Gas', 'Sour Natural Gas'], required: true },
  from: { type: String, minLength: 14, maxLength: 16, required: true },
  from_feature: { type: String, enum: from_to_feature },
  to: { type: String, minLength: 14, maxLength: 16, required: true },
  to_feature: { type: String, enum: from_to_feature },
  status: { type: String, required: true, enum: ['Operating', 'Discontinued', 'Abandoned', 'Removed', 'To Be Constructed', 'Active', 'Cancelled', 'New', 'Not Constructed'] },
  length: { type: Number, required: true },
  type: { type: String, enum: ['515', '2306', '3406', '3408', '6063', '6351', '5A', '5L', '5LX', 'A106', 'A120', 'A53', 'AMERON', 'B515', 'B51S', 'B5IS', 'CENTRON', 'CIBA', 'FSLP', 'REDTHR', 'SMITH', 'STAR', 'TBS', 'WSLP', 'Z245.1', 'Z245.3'] },
  grade: { type: String, enum: ['A', '3592', 'B', 'X42', 'BW1', '2500', '3591', '2901', 'T4', '300', '3593', '11', 'J55', '2250', 'X52', '2750', '2902', '25', '241', '2413', '2411', '155', '150', '1000', '800', 'T1A', '2010', 'T4A', '1250', '17', '900', 'T1B', '810', '35', '5', '9', '200', '1200', '11.03'] },
  outside_diameter: { type: Number, enum: [0, 42.2, 50.8, 53.8, 54.4, 55.1, 57.1, 59.1, 60.3, 60.5, 62, 65.2, 66, 73, 76.2, 77, 81.3, 82.6, 88.9, 90.7, 91.2, 95.5, 97.4, 105.7, 114.3, 152.4, 168.3, 219.1, 231.4, 273.1, 296.2, 323.89], required: true },
  wall_thickness: { type: Number, min: 0, max: 25.78, required: true },
  material: { type: String, enum: ['Steel', 'Polyvinyl Chloride', 'Composite', 'Fiberglass', 'Aluminum', 'Polyethylene', 'Cellulose Acetate Butyrate', 'Unknown', 'Asbestos Cement'] },
  mop: { type: Number, min: 350, max: 99999 },
  internal_protection: { type: String, enum: ['Uncoated', 'Free Standing (Slip Lined)', 'Unknown', 'Cement', 'Expanded Polyethylene', 'Thin Film'] },
  injection_points: [{ type: Schema.Types.ObjectId, ref: 'InjectionPoints' }],
  created_at: { type: Date, default: Date.now }
});

PipelineSchema.set('toJSON', { virtuals: true });

PipelineSchema
  .virtual('created_at_formatted')
  .get(function () {
    return dateFormat(this.created_at, "mm-dd-yyyy, h:MM:ss TT");
  });

// Virtual for pipeline's URL
PipelineSchema
  .virtual('url')
  .get(function () {
    return '/pipeline/' + this._id;
  });

//Export model
module.exports = mongoose.model('Pipelines', PipelineSchema);