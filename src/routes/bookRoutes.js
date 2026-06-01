const express = require("express");
const router = express.Router();

const books = [
    {
        id: 1,
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        price: 50000,
        stock: 10
    }
];

router.get("/", (req, res) => {
    res.json(books);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Buku tidak ditemukan"
        });
    }

    res.json(book);
});

router.post("/", (req, res) => {
    const { title, author, price, stock } = req.body;

    const newBook = {
        id: books.length + 1,
        title,
        author,
        price,
        stock
    };

    books.push(newBook);

    res.status(201).json({
        message: "Buku berhasil ditambahkan",
        data: newBook
    });
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Buku tidak ditemukan"
        });
    }

    const { title, author, price, stock } = req.body;

    book.title = title;
    book.author = author;
    book.price = price;
    book.stock = stock;

    res.json({
        message: "Buku berhasil diperbarui",
        data: book
    });
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Buku tidak ditemukan"
        });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: "Buku berhasil dihapus",
        data: deletedBook[0]
    });
});

module.exports = router;