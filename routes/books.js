const express = require('express');
const router = express.Router();
const bookController = require('../controllers/documentController');
const validate = require('../middleware/validate');
/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: API for managing books
 */


/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get a list of books
 *     description: Retrieve a list of books from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of books.
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     description: Add a new book to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date
 *               ISBN:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book successfully created.
 */
router.post('/', validate.saveBook ,bookController.addBook);
/**
 * @swagger
 * /books:
 *   put:
 *     tags:
 *       - Books
 *     summary: Update a book
 *     description: Update book details in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date
 *               ISBN:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book successfully updated.
 *       404:
 *         description: Book not found.
 */
router.put('/:ISBN', validate.saveBook, bookController.updateBookByISBN);
/**
 * @swagger
 * /books/{ISBN}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get a book by ISBN
 *     description: Retrieve details of a specific book by its ID.
 *     parameters:
 *       - in: path
 *         name: ISBN
 *         required: true
 *         schema:
 *           type: string
 *         description: The IsBN of the book.
 *     responses:
 *       200:
 *         description: Book details retrieved.
 *       404:
 *         description: Book not found.
 */
router.get('/:ISBN', bookController.getBookByISBN);

/**
 * @swagger
 * /books/{author}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get books by author
 *     description: Retrieve a list of books written by a specific author.
 *     parameters:
 *       - in: path
 *         name: author
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the author.
 *     responses:
 *       200:
 *         description: A list of books by the specified author.
 *       404:
 *         description: No books found for this author.
 */
router.get('/author/:author', bookController.getBooksByAuthor);


/**
 * @swagger
 * /books/{ISBN}:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book by ID
 *     description: Remove a book from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to delete.
 *     responses:
 *       200:
 *         description: Book successfully deleted.
 *       404:
 *         description: Book not found.
 */
router.delete('/:ISBN', bookController.deleteBookByISBN);


module.exports = router;
