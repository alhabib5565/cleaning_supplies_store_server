import { User } from './user.model';

export const generateUserId = async () => {
  let currentId = '0';

  const lastUserId = await User.findOne({}, { userId: 1 }).sort({
    createdAt: -1,
  });
  if (lastUserId) {
    currentId = lastUserId.userId;
  }
  return (Number(currentId) + 1).toString().padStart(4, '0');
};
