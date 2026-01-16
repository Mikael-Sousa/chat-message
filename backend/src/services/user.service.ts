const userModel = require("../models/user.model");

const getProfileByUserId = async (userId: number) => {

  if (!userId) {
    throw new Error("USER_ID_REQUIRED");
  }

  const profile = await userModel.findProfileByUserId(userId);

  if (!profile) {
    throw new Error("PROFILE_NOT_FOUND");
  }

  return profile;
};

const getProfileByUsername = async (username: string) => {

  if (!username) {
    throw new Error("USERNAME_REQUIRED");
  }

  const profile = await userModel.findProfileByUsername(username);

  if (!profile) {
    throw new Error("PROFILE_NOT_FOUND");
  }

  return profile;
}

module.exports = {
  getProfileByUserId,
  getProfileByUsername
};
