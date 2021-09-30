import { Document, Schema, model } from 'mongoose';

export interface IFacility {
  name: string;
  created_at: number
}

export interface IFacilityDocument extends IFacility, Document { }

const FacilitySchema = new Schema<IFacilityDocument>({
  name: { type: String, required: true },
  created_at: { type: Number, default: Date.now }
});

export default model<IFacilityDocument>('Facilities', FacilitySchema);