import { Request, Response, NextFunction } from "express";
import Facility from '../models/facility';

export default function facility_list(req: Request, res: Response, next: NextFunction) {
  Facility.find({})
    .sort({ name: 1 })
    .exec(function (err, list_facilities) {
      if (err) { return next(err); }
      // console.log(list_pipelines);
      res.json(list_facilities);
    });
};