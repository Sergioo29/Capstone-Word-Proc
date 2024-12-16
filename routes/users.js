const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middleware/validate');
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Manage Users
 */

/**
  * @swagger
 * /users:
 *   get:
 *     tags:
 *      - Users
 *     summary: Get all users
 *     description: Retrieve a list of all users from the database.
 *     responses:
 *       200:
 *         description: A list of all users.
 *       404:
 *         description: No users found
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *      - Users
 *     summary: Create a new user
 *     description: Create a new user account in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user account.
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Invalid request payload.
 */
router.post('/', validate.saveUser, userController.createUser);
/**
 * @swagger
 * /users/{userID}:
 *   get:
 *     tags:
 *      - Users
 *     summary: Get user details
 *     description: Retrieve information about a specific user by username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user.
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *       404:
 *         description: User not found.
 * 
 */
router.get('/:userID', userController.getUserByUserID);
/**
 * @swagger
 * /users/{userID}:
 *   put:
 *     tags:
 *      - Users
 *     summary: Update user details
 *     description: Update the details of an existing user.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The updated email address of the user.
 *               password:
 *                 type: string
 *                 description: The updated password for the user account.
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Invalid request payload.
 *       404:
 *         description: User not found.
 * 
 * 
 */
router.put('/:userID', validate.saveUser, userController.updateUserByUserID);
/**
 * @swagger
 * /users/{userID}:
 *   delete:
 *     tags:
 *      - Users
 *     summary: Delete a user
 *     description: Delete a user from the system by username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
router.delete('/:userID', userController.deleteUserByUserID);
/**
 * @swagger
 * /users/{userID}/reviews:
 *   get:
 *     tags:
 *      - Users
 *     summary: Get user reviews
 *     description: Retrieve all reviews written by a specific user.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user.
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully.
 *       404:
 *         description: User not found or no reviews available.
 */
router.get('/:userID/reviews', userController.getReviewsByUserID);

module.exports = router;