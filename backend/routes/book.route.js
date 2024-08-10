const express = require('express');
const {
    getBooks,
    addBook,
    deleteBook,
} = require('../controller/book.controller')
const { authenticateJWT, authorizeAdmin } = require('../middleware/middleware');

const router = express.Router();

router.get('/home', authenticateJWT, getBooks);
router.post('/addBook', authenticateJWT, authorizeAdmin, addBook);
router.delete('/deleteBook', authenticateJWT, authorizeAdmin, deleteBook);

module.exports = router;
