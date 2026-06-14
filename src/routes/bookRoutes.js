const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Manajemen data buku
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Laskar Pelangi
 *         author:
 *           type: string
 *           example: Andrea Hirata
 *         price:
 *           type: number
 *           example: 85000
 *         stock:
 *           type: integer
 *           example: 10
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Ambil semua buku
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Daftar semua buku
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Ambil buku berdasarkan ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Data buku ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Buku tidak ditemukan
 */
router.get("/:id", getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Tambah buku baru
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: Laskar Pelangi
 *               author:
 *                 type: string
 *                 example: Andrea Hirata
 *               price:
 *                 type: number
 *                 example: 85000
 *               stock:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 */
router.post("/", createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update data buku
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Laskar Pelangi
 *               author:
 *                 type: string
 *                 example: Andrea Hirata
 *               price:
 *                 type: number
 *                 example: 85000
 *               stock:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Buku berhasil diupdate
 *       404:
 *         description: Buku tidak ditemukan
 */
router.put("/:id", updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Hapus buku
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus
 *       404:
 *         description: Buku tidak ditemukan
 */
router.delete("/:id", deleteBook);

module.exports = router;