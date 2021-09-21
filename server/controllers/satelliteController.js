const Satellite = require('../models/satellite');


exports.satellite_list = function (req, res, next) {
  Satellite.find({})
    .sort({ facility: 1 })
    .populate("facility")
    .exec(function (err, list_satellites) {
      if (err) { return next(err); }
      // console.log(list_pipelines);
      res.json(list_satellites);
    });
};