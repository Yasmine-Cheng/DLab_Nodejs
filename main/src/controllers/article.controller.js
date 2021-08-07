const { createArticle, getAllArticles, updateArticle, deleteArticle, getSingleArticleByID, getAuthorIDbyID, getpremiumbyID} = require("../models/article.model");
// const HttpException = require("../../utils/HttpException");

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
                    // throw new HttpException(8,500);
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });

                // throw new HttpException(results,200);

                // res.status(201).send(this.respFormat('User was created'));
            });
        }
    },
    getSingleArticleByID: (req, res) => {
        getpremiumbyID(req.params.id, (err, results) => {
            console.log(results.is_premium);
            if (err) {
                console.log(err);
              }
            if (results.is_premium == 0) {
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
                        // throw new HttpException(0,404);
                    }
                    return res.json({
                        success: 1,
                        data: results
                    });
                    // throw new HttpException(results,200);
                });
            }   else    {
                getSingleArticleByID(req.params.id, (err, results) => {
                    partcontent = (results.content).split('').slice(0, 5).join("").toString();
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (!results) {
                        return res.json({
                            success: 0,
                            message: "Record not Found"
                        });
                        // throw new HttpException(0,404);
                    }
                    return res.json({
                        success: 1,
                        data: [
                            results.id,
                            results.title,
                            partcontent,
                            results.author_id,
                            results.time
                        ]
                    });
                    // throw new HttpException([
                                            // results.id,
                                            // results.title,
                                            // partcontent,
                                            // results.author_id,
                                            // results.time
                                            // ], 200);
                });
            }
        });
    },
    //     getSingleArticleByID(req.params.id, (err, results) => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         if (!results) {
    //             return res.json({
    //             success: 0,
    //             message: "Record not Found"
    //             });
    //         }
    //         return res.json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },
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
            // throw new HttpException(results,200);
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
            // throw new HttpException(0,404);
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
                    // throw new HttpException(9,200);
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
                // throw new HttpException(0,404);
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
                        // throw new HttpException(0,404);
                    }
                    return res.json({
                        success: 1,
                        message: "article deleted successfully"
                    });
                    // throw new HttpException(9,200);
                });
            }
        });
    }
};