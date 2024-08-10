import { Union } from './bdUnion.model';

const getAllUnion = async () => {
  const result = await Union.find();
  return result;
};

const getAllUnionWithinAUpazila = async (upazilla_id: string) => {
  const result = await Union.find({ upazilla_id });
  return result;
};

const getSingleUnion = async (upazillaId: string) => {
  const result = await Union.findOne({ id: upazillaId });
  return result;
};

export const UnionService = {
  getAllUnion,
  getAllUnionWithinAUpazila,
  getSingleUnion,
};
