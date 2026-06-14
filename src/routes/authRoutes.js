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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autentikasi pengguna
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrasi pengguna baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Data tidak valid
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login dan dapatkan token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login berhasil, token dikembalikan
 *       401:
 *         description: Email atau password salah
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Lihat profil user yang sedang login
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data profil berhasil diambil
 *       401:
 *         description: Token tidak valid atau tidak ada
 */
router.get("/profile", authenticate, (req, res) => {
  res.json({ message: "Profile berhasil diakses", user: req.user });
});

/**
 * @swagger
 * /auth/admin:
 *   get:
 *     summary: Akses khusus admin
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Akses admin berhasil
 *       403:
 *         description: Bukan admin
 */
router.get("/admin", authenticate, authorize("ADMIN"), (req, res) => {
  res.json({ message: "Selamat datang Admin" });
});

/**
 * @swagger
 * /auth/change-password:
 *   put:
 *     summary: Ganti password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: password123
 *               newPassword:
 *                 type: string
 *                 example: newpassword456
 *     responses:
 *       200:
 *         description: Password berhasil diganti
 *       400:
 *         description: Password lama salah
 */
router.put("/change-password", authenticate, changePassword);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGci...
 *     responses:
 *       200:
 *         description: Token baru berhasil dibuat
 *       401:
 *         description: Refresh token tidak valid
 */
router.post("/refresh-token", refreshToken);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout dan hapus refresh token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout berhasil
 */
router.post("/logout", authenticate, logout);

module.exports = router;