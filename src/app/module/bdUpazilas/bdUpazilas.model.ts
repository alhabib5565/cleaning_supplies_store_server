import { model, Schema } from 'mongoose';

const upazilasSchema = new Schema({
  id: { type: String },
  district_id: { type: String },
  name: { type: String },
  bd_name: { type: String },
  url: { type: String },
});

export const Upazila = model('bd-upazilas', upazilasSchema);
