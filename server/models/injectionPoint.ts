import { Document, Schema, model } from 'mongoose';

export interface IInjectionPoint {
  source?: string;
  oil: number;
  water: number;
  gas: number;
  first_production?: Date;
  last_production?: Date;
  first_injection?: Date;
  last_injection?: Date;
  pv_unit_id?: string;
  pv_node_id?: string;
  created_at: number
};

export interface IInjectionPointDocument extends IInjectionPoint, Document { url: string }


const InjectionPointSchema = new Schema<IInjectionPointDocument>({
  source: { type: String, required: isSourceRequired },
  oil: { type: Number, required: true },
  water: { type: Number, required: true },
  gas: { type: Number, required: true },
  first_production: { type: Date },
  last_production: { type: Date },
  first_injection: { type: Date },
  last_injection: { type: Date },
  pv_unit_id: { type: String, required: isUnitIdRequired },
  pv_node_id: { type: String, required: isNodeIdRequired },
  created_at: { type: Number, default: Date.now }
});

function isSourceRequired(this: IInjectionPoint): boolean {
  return typeof this.source === "string" ? false : true
}
function isUnitIdRequired(this: IInjectionPoint): boolean {
  return typeof this.pv_unit_id === "string" ? false : true
}
function isNodeIdRequired(this: IInjectionPoint): boolean {
  return typeof this.pv_node_id === "string" ? false : true
}


InjectionPointSchema.virtual('url').get(function (this: IInjectionPointDocument): string {
  return '/injpoint/' + this._id;
});

export default model<IInjectionPointDocument>('InjectionPoints', InjectionPointSchema);