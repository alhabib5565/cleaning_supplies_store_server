import { Districts } from './bdDistricts.model';

const getAllDistrict = async () => {
  const result = await Districts.find();
  return result;
};

const getAllDistrictWithinDivision = async (division_id: string) => {
  const result = await Districts.find({ division_id });
  return result;
};

const getSingleDistrict = async (districtId: string) => {
  console.log('hited');
  const result = await Districts.findOne({ id: districtId });
  return result;
};

export const DistrictService = {
  getAllDistrict,
  getAllDistrictWithinDivision,
  getSingleDistrict,
};
