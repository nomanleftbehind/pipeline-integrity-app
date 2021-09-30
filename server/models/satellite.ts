import { Schema, Model, model, Document, PopulatedDoc } from 'mongoose';
import { IFacilityDocument } from './facility';


export interface ISatellite {
  name: string;
  facility: PopulatedDoc<IFacilityDocument>;
  created_at: number
}

interface ISatelliteBaseDocument extends ISatellite, Document { }

export interface ISatelliteDocument extends ISatelliteBaseDocument {
  facility: IFacilityDocument["_id"];
}

export interface ISatellitePopulatedDocument extends ISatelliteBaseDocument {
  facility: IFacilityDocument;
}

const SatelliteSchema = new Schema<ISatelliteDocument, ISatelliteModel>({
  name: { type: String, required: true },
  facility: { type: Schema.Types.ObjectId, ref: 'Facilities', required: true },
  created_at: { type: Number, default: Date.now }
});

export interface ISatelliteModel extends Model<ISatelliteDocument> {
  findFacility(id: string): Promise<ISatellitePopulatedDocument>
}

SatelliteSchema.statics.findFacility = async function (
  this: Model<ISatelliteDocument>,
  id: string
) {
  console.log(this);
  
  return this.findById(id).populate("facility").exec()
}

export default model<ISatelliteDocument, ISatelliteModel>('Satellites', SatelliteSchema);