const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const validate = require("../middleware/validate");

/**
 * @swagger
 * tags:
 *   - name: Reviews
 *     description: Manage Reviews
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get all reviews
 *     description: Retrieve a list of all reviews from the database.
 *     responses:
 *       200:
 *         description: A list of reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   reviewID:
 *                     type: string
 *                   userID:
 *                     type: string
 *                   ISBN:
 *                     type: string
 *                   reviewText:
 *                     type: string
 *                   rating:
 *                     type: integer
 *                     format: int32
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 */
router.get("/", reviewController.getAllReviews);

/**
 * @swagger
 * /reviews/{ISBN}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get reviews by ISBN
 *     description: Retrieve all reviews for a specific book by its ISBN.
 *     parameters:
 *       - in: path
 *         name: ISBN
 *         required: true
 *         schema:
 *           type: string
 *         description: The ISBN of the book.
 *     responses:
 *       200:
 *         description: A list of reviews for the specified book.
 *       404:
 *         description: Reviews not found.
 */
router.get("/:ISBN", reviewController.getReviewsByISBN);

/**
 * @swagger
 * /reviews/rating/{rating}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get reviews by rating
 *     description: Retrieve all reviews with a specific rating.
 *     parameters:
 *       - in: path
 *         name: rating
 *         required: true
 *         schema:
 *           type: integer
 *         description: The rating to filter reviews.
 *     responses:
 *       200:
 *         description: A list of reviews with the specified rating.
 *       404:
 *         description: Reviews not found.
 */
router.get("/rating/:rating", reviewController.getReviewsByRating);

/**
 * @swagger
 * /reviews/text/{reviewText}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get reviews by text
 *     description: Retrieve reviews containing specific text.
 *     parameters:
 *       - in: path
 *         name: reviewText
 *         required: true
 *         schema:
 *           type: string
 *         description: The text to search within reviews.
 *     responses:
 *       200:
 *         description: A list of reviews containing the text.
 *       404:
 *         description: Reviews not found.
 */
router.get("/text/:reviewText", reviewController.getReviewsByText);

/**
 * @swagger
 * /reviews/text/{ISBN}:
 *   put:
 *     tags:
 *       - Reviews
 *     summary: Update review text by ISBN
 *     description: Update the review text of a specific review identified by its ISBN.
 *     parameters:
 *       - in: path
 *         name: ISBN
 *         required: true
 *         schema:
 *           type: string
 *         description: The ISBN of the book whose review text is to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewText:
 *                 type: string
 *             required:
 *               - reviewText
 *             example:
 *               reviewText: "Updated review text here"
 *     responses:
 *       200:
 *         description: Review updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review updated successfully."
 *       400:
 *         description: Invalid input or review text missing.
 *       404:
 *         description: ISBN not found.
 *       500:
 *         description: An error occurred while updating the review.
 */
router.put("/text/:ISBN", validate.saveReview, reviewController.updateReviewTextByISBN);

/**
 * @swagger
 * /reviews:
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Add a new review
 *     description: Add a new review to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewID:
 *                 type: string
 *                 description: Unique identifier for the review.
 *                 example: "101"
 *               userID:
 *                 type: string
 *                 description: Unique identifier for the user.
 *                 example: "1"
 *               ISBN:
 *                 type: string
 *                 description: Unique identifier for the book.
 *                 example: "9781234567890"
 *               rating:
 *                 type: integer
 *                 description: Rating for the book (e.g., 1-5).
 *                 example: 5
 *               reviewText:
 *                 type: string
 *                 description: The text content of the review.
 *                 example: "A beautifully written story with strong themes of justice and morality..."
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp when the review was created.
 *                 example: "2024-11-01T10:30:00Z"
 *     responses:
 *       201:
 *         description: Review created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review added successfully."
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created review.
 *                   example: "64b8c2f4e1234abcd5678efg"
 *       400:
 *         description: Invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "All fields (reviewID, userID, ISBN, rating, reviewText, timestamp) are required."
 */
router.post("/", validate.saveReview, reviewController.addReview);

/**
 * @swagger
 * /reviews/{ISBN}:
 *   delete:
 *     tags:
 *       - Reviews
 *     summary: Delete reviews by ISBN
 *     description: Delete all reviews associated with a specific ISBN.
 *     parameters:
 *       - in: path
 *         name: ISBN
 *         required: true
 *         schema:
 *           type: string
 *         description: The ISBN of the book.
 *     responses:
 *       200:
 *         description: Reviews deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "1 reviews deleted."
 *       404:
 *         description: Reviews not found.
 *       500:
 *         description: An error occurred while deleting reviews.
 */
router.delete("/:ISBN", reviewController.deleteReviewsByISBN);

module.exports = router;
