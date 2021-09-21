const Facility = require('../models/facility');


exports.facility_list = function (req, res, next) {
  Facility.find({})
    .sort({ name: 1 })
    .exec(function (err, list_facilities) {
      if (err) { return next(err); }
      // console.log(list_pipelines);
      res.json(list_facilities);
    });
};