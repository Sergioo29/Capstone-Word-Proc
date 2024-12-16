const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const validate = require('../middleware/validate');

/**
 * @swagger
 * tags:
 *   - name: Meetings
 *     description: Manage Meetings
 */

/**
 * @swagger
 * /meetings:
 *   get:
 *     tags:
 *     - Meetings
 *     summary: Get all meetings
 *     description: Retrieve a list of all meetings from the database.
 *     responses:
 *       200:
 *         description: A list of all meetings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   location:
 *                     type: string
*/
router.get('/', meetingController.getAllMeetings);

/**
 * @swagger
 * /meetings/{meetingID}:
 *   get:
 *     tags:
 *     - Meetings
 *     summary: Get a meeting by ID
 *     description: Retrieve details of a specific meeting by its ID.
 *     parameters:
 *       - in: path
 *         name: meetingID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the meeting.
 *     responses:
 *       200:
 *         description: Meeting details retrieved.
 *       404:
 *         description: Meeting not found.
 */
router.get('/:meetingID', meetingController.getMeetingByID);
/**
 * @swagger
 * /meetings:
 *   post:
 *     tags:
 *     - Meetings
 *     summary: Create a new meeting
 *     description: Add a new meeting to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Meeting successfully created.
 */
router.post('/', validate.saveMeeting, meetingController.addMeeting);
/**
 * @swagger
 * /meetings:
 *   put:
 *     tags:
 *     - Meetings
 *     summary: Update a meeting
 *     description: Update the details of an existing meeting.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               meetingID:
 *                 type: string
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Meeting successfully updated.
 *       404:
 *         description: Meeting not found.
 */
router.put('/:meetingID', validate.saveMeeting, meetingController.updateMeeting);
/**
 * @swagger
 * /meetings:
 *   delete:
 *     tags:
 *     - Meetings
 *     summary: Delete a meeting
 *     description: Remove a meeting from the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               meetingID:
 *                 type: string
 *     responses:
 *       200:
 *         description: Meeting successfully deleted.
 *       404:
 *         description: Meeting not found.
 */

router.delete('/:meetingID', meetingController.deleteMeetingByID);



module.exports = router;