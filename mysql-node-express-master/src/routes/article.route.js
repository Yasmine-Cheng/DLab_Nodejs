const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createArticleSchema, updateArticleSchema } = require('../middleware/validators/articleValidator.middleware');


router.get('/', auth(), awaitHandlerFactory(articleController.getAllArticles)); // localhost:3331/api/v1/articles
router.get('/id/:id', auth(), awaitHandlerFactory(articleController.getArticleById)); // localhost:3331/api/v1/articles/id/1
router.post('/', createArticleSchema, awaitHandlerFactory(articleController.createArticle)); // localhost:3331/api/v1/articles
router.patch('/id/:id', auth(), updateArticleSchema, awaitHandlerFactory(articleController.updateArticle)); // localhost:3331/api/v1/articles/id/1 , using patch for partial update
router.delete('/id/:id', auth(), awaitHandlerFactory(articleController.deleteArticle)); // localhost:3331/api/v1/articles/id/1


module.exports = router;