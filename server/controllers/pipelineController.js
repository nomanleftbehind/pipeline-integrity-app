const mongoose = require('mongoose');
const { Pipeline, validators } = require('../models/pipeline');
const InjectionPoint = require('../models/injectionPoint');
const { populate } = require('../models/pipeline');


// const { body, validationResult } = require('express-validator');

const opts = { runValidators: true };

exports.pipeline_list = function (req, res, next) {
  Pipeline.find({})
    .sort({ license: 1, segment: 1, created_at: 1 })
    .populate("injection_points")
    .populate("satellite")
    .exec(function (err, list_pipelines) {
      if (err) { return next(err); }
      console.log(list_pipelines);
      res.json(list_pipelines);
    });

  // console.log(Pipeline.schema.paths.license.validators);
};

exports.validators = function (req, res, next) {
  // console.log(req);
  res.json(validators);
};

exports.pipeline_copy_post = function (req, res, next) {

  Pipeline.findById(req.params.id).exec(
    function (err, doc) {
      doc._id = mongoose.Types.ObjectId();
      doc.isNew = true;
      doc.save(function (err, thepipeline) {
        if (err) { return next(err); }
        console.log("Added Pipeline : ", thepipeline);
        res.json('Pipeline added!');
      });
    }
  );
};

exports.pipeline_delete_post = function (req, res, next) {
  Pipeline.findByIdAndRemove(req.params.id, function deleteAuthor(err, thepipeline) {
    if (err) { return next(err); }
    console.log("Deleted Pipeline : ", thepipeline);
    res.json('Pipeline deleted!');
  });
}

exports.injection_point_change = function (req, res, next) {
  console.log(req.params.ppl_id, req.params.inj_pt_id, req.params.new_inj_pt_id);
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