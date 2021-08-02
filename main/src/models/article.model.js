const pool = require("../../config/db.config");

module.exports = {
    getAuthorIDbyID: (id, callBack) => {
        pool.query(
        `select author_id from article where id = ?`,
        [id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    createArticle: (data, callBack) => {
    pool.query(
        `insert into article(title, content, author_id, is_premium) value(?,?,?,?)`,
        [	
            data.title,
            data.content,
            data.author_id,
            data.is_premium
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    getSingleArticleByID: (id, callBack) => {
        pool.query(
        `select * from article where id = ?`,
        [id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getAllArticles: callBack => {
        pool.query(
        `select id, title, content, author_id, time, is_premium from article`,
        [],
        (error, results, fields) => {
            if (error) {
            callBack(error);
            }
            return callBack(null, results);
        });
    },
    updateArticle: (data, callBack) => {
        pool.query(
        `update article set id=?, title=?, content=?, author_id=?, time=?, is_premium=? where id = ?`,
        [
            data.id,	
            data.title,
            data.content,
            data.author_id,
            data.time,
            data.is_premium,
            data.id
        ],
        (error, results, fields) => {
            if (error) {
            callBack(error);
            }
            return callBack(null, results);
        });
    },
    deleteArticle: (id, callBack) => {
        pool.query(
        `delete from article where id = ?`,
        [id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    }
};