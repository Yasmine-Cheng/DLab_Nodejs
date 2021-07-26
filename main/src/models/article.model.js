var pool = require('../../config/db.config');

var Article = function(article){
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
    this.author_id = article.author_id;
    this.time = article.time;
}

//get all article
Article.getAllArticles = (result) => {
    pool.query('SELECT * FROM article', (err,res) => {
        if(err){
            console.log('err while fetching articles',err);
            result(null,err);
        }else{
            console.log('Articles fetched success');
            result(null,res);
        }
    })
}

//get single article
Article.getSingleArticleByID = (id,result) => {
    pool.query('SELECT * FROM article WHERE id=?', id, (err, res)=>{
        if(err){
            console.log('err while fetching article by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// //post article
Article.createArticle = (articleReqData, result) =>{
    pool.query('INSERT INTO article SET ? ', articleReqData, (err, res)=>{
        if(err){
            console.log(err);
            result(null, err);
        }else{
            console.log('Article posted successfully');
            result(null, res)
        }
    })
}

// update article
Article.updateArticle = (id, articleReqData, result)=>{
    pool.query("UPDATE article SET title=?,content=?,author_id=? WHERE id = ?", [articleReqData.id,articleReqData.title,articleReqData.content,articleReqData.author_id,articleReqData.time, id], (err, res)=>{
        if(err){
            console.log('Error while updating the article');
            result(null, err);
        }else{
            console.log("Article updated successfully");
            result(null, res);
        }
    });
}

// delete article
Article.deleteArticle = (id, result)=>{
    pool.query("DELETE FROM article WHERE id=?", id, (err, res)=>{
        if(err){
            console.log('Error while deleting the article');
            result(null, err);
        }else{
            console.log("Article deleted successfully");
            result(null, res);
        }
    });
}

module.exports = Article;