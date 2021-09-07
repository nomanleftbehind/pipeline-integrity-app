const { Pipeline, validators } = require('../models/pipeline');
const InjectionPoint = require('../models/injectionPoint');
const { populate } = require('../models/pipeline');


// const { body, validationResult } = require('express-validator');

const opts = { runValidators: true };

exports.pipeline_list = function (req, res, next) {

  Pipeline.find({})
    .sort({ license: 1, segment: 1, created_at: 1 })
    .populate("injection_points")
    .exec(function (err, list_pipelines) {
      if (err) { return next(err); }
      // console.log(list_pipelines);
      res.json(list_pipelines);
    });

};

exports.validators = function (req, res, next) {
  console.log(validators);
  res.json(validators);
};

exports.pipeline_copy_post = function (req, res, next) {

  const newPipeline = new Pipeline(
    {
      license: req.body.license,
      segment: req.body.segment,
      substance: req.body.substance,
      from: req.body.from,
      from_feature: req.body.from_feature,
      to: req.body.to,
      to_feature: req.body.to_feature,
      status: req.body.status,
      length: req.body.length,
      type: req.body.type,
      grade: req.body.grade,
      outside_diameter: req.body.outside_diameter,
      wall_thickness: req.body.wall_thickness,
      material: req.body.material,
      mop: req.body.mop,
      internal_protection: req.body.internal_protection,
      injection_points: req.body.injection_points
    });

  newPipeline.save()
    .then(() => res.json('Pipeline added!'))
    .catch(err => res.status(400).json('Error: ' + err));

};


exports.pipeline_update_post = [

  // Convert the injection points to an array
  (req, res, next) => {
    if (!(req.body.injection_points instanceof Array)) {
      if (typeof req.body.injection_points === 'undefined')
        req.body.injection_points = [];
      else
        req.body.injection_points = new Array(req.body.injection_points);
    }
    next();
  },

  (req, res, next) => {

    // Create a Pipeline object with escaped/trimmed data and old id.

    const newPipeline = new Pipeline(
      {
        license: req.body.license,
        segment: req.body.segment,
        substance: req.body.substance,
        from: req.body.from,
        to: req.body.to,
        injection_points: (typeof req.body.injection_points === 'undefined') ? [] : req.body.injection_points,
        status: req.body.status,
        created_at: req.body.created_at,
        _id: req.params.id //This is required, or a new ID will be assigned!
      });

    Pipeline.findByIdAndUpdate(req.params.id, newPipeline, {}, function (err, thepipeline) {
      if (err) { return next(err); }
      console.log("Updated Pipeline : ", thepipeline);
      res.json('Pipeline updated!');
    });
  }
];


exports.pipeline_delete_post = function (req, res, next) {
  Pipeline.findByIdAndRemove(req.params.id, function deleteAuthor(err, thepipeline) {
    if (err) { return next(err); }
    console.log("Deleted Pipeline : ", thepipeline);
    res.json('Pipeline deleted!');
  });
}

exports.injection_point_change = function (req, res, next) {
  Pipeline.updateOne({ _id: req.params.ppl_id, injection_points: req.params.inj_pt_id },
    { $set: { "injection_points.$": req.params.new_inj_pt_id } }, function (err, theInjectionPoint) {
      if (err) { return next(err); }
      // console.log("Changed injection point : ", theInjectionPoint);
      res.json('Injection point changed!');
    });
}

exports.injection_point_delete = function (req, res, next) {
  Pipeline.updateOne({ _id: req.params.ppl_id },
    { $pull: { injection_points: req.params.inj_pt_id } }, function (err, thepipeline) {
      if (err) { return next(err); }
      console.log("Deleted injection point : ", thepipeline);
      res.json('Injection point deleted!');
    });
}

exports.injection_point_add = function (req, res, next) {

  InjectionPoint.findOne({ source: "" }, '_id', function (err, inj_pt_id) {
    if (err) { return next(err); }
    Pipeline.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: { injection_points: inj_pt_id._id }
      }, opts,
      function (err, model) {
        if (err) {
          console.log("ERROR: ", err);
          res.status(500, err);
        } else {
          res.status(200).send(model);
        }
      }
    );
    console.log(inj_pt_id);
  });

  // res.json('Injection point added!');
}

exports.record_change = function (req, res, next) {
  column = req.body.column;
  Pipeline.updateOne({ _id: req.params.id },
    { $set: { [column]: req.body.record } }, opts, function (err, theRecord) {
      // console.log(err/*, theRecord*/);
      if (err) {
        next(err);
      } else {
        res.json(`${column} changed!`);
      }
      console.log(`Changed ${column}: `, theRecord);
    });
}