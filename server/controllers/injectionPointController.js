const InjectionPoint = require('../models/injectionPoint');

exports.injection_point_list = function (req, res, next) {

  InjectionPoint.find({})
    .sort({ source: 1 })
    .exec(function (err, list_injection_points) {
      if (err) { return next(err); }
      res.json(list_injection_points);
    });

};