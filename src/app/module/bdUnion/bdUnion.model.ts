import { model, Schema } from 'mongoose';

const unionSchema = new Schema({
  id: { type: String },
  upazilla_id: { type: String },
  name: { type: String },
  bd_name: { type: String },
  url: { type: String },
});

export const Union = model('bd-unions', unionSchema);
