import { Upazila } from './bdUpazilas.model';

const getAllUpazila = async () => {
  const result = await Upazila.find();
  return result;
};

const getAllUpazilaWithinDistrict = async (district_id: string) => {
  const result = await Upazila.find({ district_id });
  return result;
};

const getSingleUpazila = async (upazilaId: string) => {
  const result = await Upazila.findOne({ id: upazilaId });
  return result;
};

export const UpazilaService = {
  getAllUpazila,
  getAllUpazilaWithinDistrict,
  getSingleUpazila,
};
