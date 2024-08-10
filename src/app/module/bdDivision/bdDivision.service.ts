import { Division } from './bdDivision.model';

const getAllDivision = async () => {
  const result = await Division.find();
  return result;
};

const getSingleDivisoin = async (divisionID: string) => {
  const result = await Division.findOne({ id: divisionID });
  return result;
};

export const DivisionService = {
  getAllDivision,
  getSingleDivisoin,
};
