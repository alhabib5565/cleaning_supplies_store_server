import { model, Schema } from 'mongoose';

const divisionSchema = new Schema({
  id: { type: String },
  name: { type: String },
  bd_name: { type: String },
  url: { type: String },
});

export const Division = model('bd-divisions', divisionSchema);
