const express = require("express");
const router = express.Router();

const {
  register,
  login,
  changePassword,
  refreshToken,
  logout,
} = require("../controllers/authController");

const {
  authenticate,
  authorize,
} = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get(
  "/profile",
  authenticate,
  (req, res) => {
    res.json({
      message: "Profile berhasil diakses",
      user: req.user,
    });
  }
);

router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      message: "Selamat datang Admin",
    });
  }
);

router.put(
  "/change-password",
  authenticate,
  changePassword
);

router.post(
  "/refresh-token",
  refreshToken
);

router.post(
  "/logout",
  authenticate,
  logout
);

module.exports = router;