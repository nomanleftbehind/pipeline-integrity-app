const mongoose = require('mongoose');
const { Schema } = mongoose;
const dateFormat = require("dateformat");

const validators = {
  license: "^(AB|SK|BC)(\\d{5}|\\d{6})$",
  segment: "^((UL)(\\d{1,2})|(\\d{1,3}))$",
  substance: ['Natural Gas', 'Fresh Water', 'Salt Water', 'Crude Oil', 'Oil Well Effluent', 'LVP Products', 'Fuel Gas', 'Sour Natural Gas'],
  from_to: "^((\\d{2}-\\d{2}-\\d{3}-\\d{2}W\\d{1})|([A-Z]{1}-\\d{3}-[A-Z]{1} \\d{3}-[A-Z]{1}-\\d{2}))$",
  from_to_feature: ['Blind end', 'Battery', 'Pipeline', 'Satellite', 'Storage tank', 'Injection plant', 'Well', 'Compressor station', 'Meter station', 'Pump station', 'Gas processing plant', 'Underground cap or tie-in', 'Header'],
  status: ['Operating', 'Discontinued', 'Abandoned', 'Removed', 'To Be Constructed', 'Active', 'Cancelled', 'New', 'Not Constructed'],
  length: "^\\d*\\.?\\d*$",
  type: ['515', '2306', '3406', '3408', '6063', '6351', '5A', '5L', '5LX', 'A106', 'A120', 'A53', 'AMERON', 'B515', 'B51S', 'B5IS', 'CENTRON', 'CIBA', 'FSLP', 'REDTHR', 'SMITH', 'STAR', 'TBS', 'WSLP', 'Z245.1', 'Z245.3'],
  grade: ['A', '3592', 'B', 'X42', 'BW1', '2500', '3591', '2901', 'T4', '300', '3593', '11', 'J55', '2250', 'X52', '2750', '2902', '25', '241', '2413', '2411', '155', '150', '1000', '800', 'T1A', '2010', 'T4A', '1250', '17', '900', 'T1B', '810', '35', '5', '9', '200', '1200', '11.03'],
  outside_diameter: [0, 42.2, 50.8, 53.8, 54.4, 55.1, 57.1, 59.1, 60.3, 60.5, 62, 65.2, 66, 73, 76.2, 77, 81.3, 82.6, 88.9, 90.7, 91.2, 95.5, 97.4, 105.7, 114.3, 152.4, 168.3, 219.1, 231.4, 273.1, 296.2, 323.89],
  wall_thickness: "^(\\d|1\\d|2[0-5])(\\.\\d{1,2})?$",
  material: ['Steel', 'Polyvinyl Chloride', 'Composite', 'Fiberglass', 'Aluminum', 'Polyethylene', 'Cellulose Acetate Butyrate', 'Unknown', 'Asbestos Cement'],
  mop: "^\\d{1,5}$",
  internal_protection: ['Uncoated', 'Free Standing (Slip Lined)', 'Unknown', 'Cement', 'Expanded Polyethylene', 'Thin Film']
}

const PipelineSchema = new Schema({
  license: { type: String, match: RegExp(validators.license), required: true },
  segment: { type: String, match: RegExp(validators.segment), required: true },
  substance: { type: String, enum: validators.substance, required: true },
  from: { type: String, match: RegExp(validators.from_to), required: true },
  from_feature: { type: String, enum: validators.from_to_feature },
  to: { type: String, match: RegExp(validators.from_to), required: true },
  to_feature: { type: String, enum: validators.from_to_feature },
  status: { type: String, required: true, enum: validators.status },
  length: { type: Number, match: RegExp(validators.length), required: true },
  type: { type: String, enum: validators.type },
  grade: { type: String, enum: validators.grade },
  outside_diameter: { type: Number, enum: validators.outside_diameter, required: true },
  wall_thickness: { type: Number, match: RegExp(validators.wall_thickness), required: true },
  material: { type: String, enum: validators.material },
  mop: { type: Number, match: RegExp(validators.mop) },
  internal_protection: { type: String, enum: validators.internal_protection },
  injection_points: [{ type: Schema.Types.ObjectId, ref: 'InjectionPoints' }],
  satellite: { type: Schema.Types.ObjectId, ref: 'Satellites', required: true },
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
module.exports = {
  Pipeline: mongoose.model('Pipelines', PipelineSchema),
  validators: validators
}