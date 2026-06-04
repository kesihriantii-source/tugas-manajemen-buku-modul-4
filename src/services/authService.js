const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/userRepository");

const register = async (email, password) => {
  const existingUser =
    await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error("Email sudah terdaftar");
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user =
    await userRepository.createUser({
      email,
      password: hashedPassword,
      role: "USER",
    });

  return user;
};

const login = async (email, password) => {
  const user =
    await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("Email tidak ditemukan");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Password salah");
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  await userRepository.updateRefreshToken(
    user.id,
    refreshToken
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userId,
  oldPassword,
  newPassword
) => {
  const user =
    await userRepository.findById(userId);

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const isMatch = await bcrypt.compare(
    oldPassword,
    user.password
  );

  if (!isMatch) {
    throw new Error("Password lama salah");
  }

  const hashedPassword =
    await bcrypt.hash(newPassword, 10);

  await userRepository.updatePassword(
    userId,
    hashedPassword
  );

  return {
    message: "Password berhasil diubah",
  };
};

const refreshToken = async (
  refreshTokenValue
) => {
  const user =
    await userRepository.findByRefreshToken(
      refreshTokenValue
    );

  if (!user) {
    throw new Error("Refresh token tidak valid");
  }

  jwt.verify(
    refreshTokenValue,
    process.env.JWT_SECRET
  );

  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  return {
    accessToken,
  };
};

const logout = async (userId) => {
  await userRepository.updateRefreshToken(
    userId,
    null
  );

  return {
    message: "Logout berhasil",
  };
};

module.exports = {
  register,
  login,
  changePassword,
  refreshToken,
  logout,
};