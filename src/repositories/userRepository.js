const prisma = require("../config/prisma");

const findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

const findById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const updatePassword = async (id, password) => {
  return await prisma.user.update({
    where: { id },
    data: { password },
  });
};

const findByRefreshToken = async (refreshToken) => {
  return await prisma.user.findFirst({
    where: { refreshToken },
  });
};

const updateRefreshToken = async (id, refreshToken) => {
  return await prisma.user.update({
    where: { id },
    data: { refreshToken },
  });
};

module.exports = {
  findByEmail,
  createUser,
  findById,
  updatePassword,
  findByRefreshToken,
  updateRefreshToken,
};