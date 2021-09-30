import { Request, Response, NextFunction } from "express";
import { Types } from 'mongoose';
import Pipeline, { validators } from '../models/pipeline';
import InjectionPoint from '../models/injectionPoint';
import Satellite from '../models/satellite';
import Facility from '../models/facility';


const opts = { runValidators: true };

export default function pipeline_list(req: Request, res: Response, next: NextFunction) {
  Pipeline.find({})
    .sort({ license: 1, segment: 1, created_at: 1 })
    .populate("injection_points")
    .populate({
      path: "satellite", model: Satellite,
      populate: { path: "facility", model: Facility }
    })
    // .populate("facility")
    .exec(function (err, list_pipelines) {
      if (err) { return next(err); }
      // console.log(list_pipelines);
      res.json(list_pipelines);
    });

  // console.log(Pipeline.schema.paths.license.validators);
};

export function validator_list(req: Request, res: Response, next: NextFunction) {
  res.json(validators);
};

export function pipeline_copy_post(req: Request, res: Response, next: NextFunction) {

  Pipeline.findById(req.params.id).exec(
    function (err, doc) {
      if (doc !== null) {
        doc._id = new Types.ObjectId();// previously mongoose.Types.ObjectId();
        doc.isNew = true;
        doc.save(function (err, thepipeline) {
          if (err) { return next(err); }
          console.log("Added Pipeline : ", thepipeline);
          res.json('Pipeline added!');
        });
      }
    }
  );
};

export function pipeline_delete_post(req: Request, res: Response, next: NextFunction) {
  Pipeline.findByIdAndRemove(req.params.id, {}, function (err, thepipeline) {
    if (err) { return next(err); }
    console.log("Deleted Pipeline : ", thepipeline);
    res.json('Pipeline deleted!');
  });
}

export function injection_point_change(req: Request, res: Response, next: NextFunction) {
  console.log(req.params.ppl_id, req.params.inj_pt_id, req.params.new_inj_pt_id);
  Pipeline.updateOne({ _id: req.params.ppl_id, injection_points: req.params.inj_pt_id },
    { $set: { "injection_points.$": req.params.new_inj_pt_id } }, {}, function (err, theInjectionPoint) {
      if (err) { return next(err); }
      // console.log("Changed injection point : ", theInjectionPoint);
      res.json('Injection point changed!');
    });
}

export function injection_point_delete(req: Request, res: Response, next: NextFunction) {
  Pipeline.updateOne({ _id: req.params.ppl_id },
    { $pull: { injection_points: req.params.inj_pt_id } }, {}, function (err, thepipeline) {
      if (err) { return next(err); }
      console.log("Deleted injection point : ", thepipeline);
      res.json('Injection point deleted!');
    });
}

export function injection_point_add(req: Request, res: Response, next: NextFunction) {

  InjectionPoint.findOne({ source: "" }, '_id', {}, function (err, inj_pt_id) {
    if (err) { return next(err); }
    if (inj_pt_id !== null) {
      Pipeline.findOneAndUpdate(
        { _id: req.params.id },
        {
          $addToSet: { injection_points: inj_pt_id._id }
        }, opts,
        function (err, model) {
          if (err) {
            console.log("ERROR: ", err);
            res.status(500);
          } else {
            res.status(200).send(model);
          }
        }
      );
    }
    // console.log(inj_pt_id);
  });

  // res.json('Injection point added!');
}

export function record_change(req: Request, res: Response, next: NextFunction) {
  const column = req.body.column;
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