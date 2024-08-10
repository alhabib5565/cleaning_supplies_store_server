import { model, Schema } from 'mongoose';

const districtSchema = new Schema({
  id: { type: String },
  division_id: { type: String },
  name: { type: String },
  bd_name: { type: String },
  url: { type: String },
});

export const Districts = model('bd-districts', districtSchema);
