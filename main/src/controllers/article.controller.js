const { createArticle, getAllArticles, updateArticle, deleteArticle, getSingleArticleByID, getAuthorIDbyID } = require("../models/article.model");

module.exports = {
    createArticle: (req, res) => {
        if (req.body.author_id == req.decoded.result.account_id){
            createArticle(req.body, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });
        }
    },
    getSingleArticleByID: (req, res) => {
        getSingleArticleByID(req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                success: 0,
                message: "Record not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getAllArticles: (req, res) => {
        getAllArticles((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateArticle: (req, res) => {
        getAuthorIDbyID(req.params.id, (err, results) => {
            if (err) {
              console.log(err);
            }
            if (!results) {
              return res.json({
                success: 0,
                data: "No this article"
              });
            }
            if (results.author_id == req.decoded.result.account_id){
                updateArticle(req.body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.json({
                        success: 1,
                        message: "updated successfully"
                    });
                });
            }
        });
    },
    deleteArticle: (req, res) => {
        getAuthorIDbyID(req.params.id, (err, results) => {
            if (err) {
              console.log(err);
            }
            if (!results) {
              return res.json({
                success: 0,
                data: "No this article"
              });
            }
            if (results.author_id == req.decoded.result.account_id){
                deleteArticle(req.params.id, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (!results) {
                        return res.json({
                        success: 0,
                        message: "Record Not Found"
                        });
                    }
                    return res.json({
                        success: 1,
                        message: "article deleted successfully"
                    });
                });
            }
        });
    }
};