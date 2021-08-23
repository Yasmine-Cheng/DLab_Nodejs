const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createCommentSchema, updateCommentSchema } = require('../middleware/validators/commentValidator.middleware');


router.get('/', auth(), awaitHandlerFactory(commentController.getAllComments)); // localhost:3331/api/v1/articles
router.get('/id/:id', auth(), awaitHandlerFactory(commentController.getCommentById)); // localhost:3331/api/v1/articles/id/1
router.post('/', createCommentSchema, awaitHandlerFactory(commentController.createComment)); // localhost:3331/api/v1/articles
router.patch('/id/:id', auth(), updateCommentSchema, awaitHandlerFactory(commentController.updateComment)); // localhost:3331/api/v1/articles/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(commentController.deleteComment)); // localhost:3331/api/v1/articles/id/1


module.exports = router;