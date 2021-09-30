import Satellite from '../models/satellite';
import { Request, Response, NextFunction } from "express";


export default function satellite_list(req: Request, res: Response, next: NextFunction) {
  Satellite.find({})
    .sort({ facility: 1 })
    .populate("facility")
    .exec(function (err, list_satellites) {
      if (err) { return next(err); }
      // console.log(list_pipelines);
      res.json(list_satellites);
    });
};