import { Request, Response, NextFunction } from "express";
import InjectionPoint from '../models/injectionPoint';


export default function injection_point_list(req: Request, res: Response, next: NextFunction): void {

  InjectionPoint.find({ source: { $ne: "" } })
    .sort({ source: 1 })
    .exec(function (err, list_injection_points) {
      if (err) { return next(err); }
      res.json(list_injection_points);
    });
};