const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createArticle, getSingleArticleByID, getAllArticles, updateArticle, deleteArticle } = require("../controllers/article.controller");
router.post("/", checkToken, createArticle);
router.get("/:id", getSingleArticleByID);
router.get("/", getAllArticles);
router.put("/:id", checkToken, updateArticle);
router.delete("/:id", checkToken, deleteArticle);

module.exports = router;