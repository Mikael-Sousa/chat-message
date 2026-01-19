const userModel = require("../models/user.model");

const getProfileByUserId = async (userId: number) => {
  if (!userId) {
    return { status: 400, message: "userId is required" };
  }

  const profile = await userModel.findProfileByUserId(userId);

  if (!profile) {
    return { status: 404, message: "Profile not found" };
  }

  return {
    status: 200,
    data: profile,
  };
};

const getProfileByUsername = async (username: string) => {
  if (!username) {
    return { status: 400, message: "username is required" };
  }

  const profile = await userModel.findProfileByUsername(username);

  if (!profile) {
    return { status: 404, message: "Profile not found" };
  }

  return {
    status: 200,
    data: profile,
  };
}

module.exports = {
  getProfileByUserId,
  getProfileByUsername
};
