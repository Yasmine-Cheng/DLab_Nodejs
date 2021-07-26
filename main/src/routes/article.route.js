const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article.controller');

//get all articles
router.get('/',articleController.getArticleList);

//get single article by id
router.get('/:id',articleController.getSingleArticleByID);

// //post article
router.post('/', articleController.createNewArticle);

// update article
router.put('/:id', articleController.updateArticle);

// delete article
router.delete('/:id',articleController.deleteArticle);

module.exports = router;