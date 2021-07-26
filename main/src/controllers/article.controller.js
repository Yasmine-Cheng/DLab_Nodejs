const ArticleModel = require('../models/article.model');

// get all article list
exports.getArticleList = (req, res)=> {
    //console.log('here all articles list');
    ArticleModel.getAllArticles((err, articles) =>{
        console.log('here');
        if(err)
        res.send(err);
        console.log('Articles', articles);
        res.send(articles)
    })
}

// get single article by id
exports.getSingleArticleByID = (req, res)=> {
    //console.log('here article by id');
    ArticleModel.getSingleArticleByID(req.params.id, (err, article) =>{
        console.log('here');
        if(err)
        res.send(err);
        console.log('Article', article);
        res.send(article);
    })
}

// post new article
exports.createNewArticle = (req, res) =>{
    const articleReqData = new ArticleModel(req.body);
    console.log('articleReqData', articleReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'fill all cols'});
    }else{
        ArticleModel.createArticle(articleReqData, (err, article)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Article Posted Successfully', data: article.insertId})
        })
    }
}

// update article
exports.updateArticle = (req, res)=>{
    const articleReqData = new ArticleModel(req.body);
    console.log('articleReqData update', articleReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'fill all cols'});
    }else{
        ArticleModel.updateArticle(req.params.id, articleReqData, (err, article)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Article updated Successfully'})
        })
    }
}

// delete article
exports.deleteArticle = (req, res)=>{
    ArticleModel.deleteArticle(req.params.id, (err, article)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Article deleted successully!'});
    })
}