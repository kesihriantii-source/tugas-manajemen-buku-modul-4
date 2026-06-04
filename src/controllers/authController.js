const authService =
  require("../services/authService");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user =
      await authService.register(
        email,
        password
      );

    res.status(201).json({
      message: "Registrasi berhasil",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result =
      await authService.login(
        email,
        password
      );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } =
      req.body;

    const result =
      await authService.changePassword(
        req.user.id,
        oldPassword,
        newPassword
      );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const result =
      await authService.refreshToken(
        refreshToken
      );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const result =
      await authService.logout(
        req.user.id
      );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  changePassword,
  refreshToken,
  logout,
};