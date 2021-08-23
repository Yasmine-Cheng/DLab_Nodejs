const UserModel = require('../models/user.model');
const ArticleModel = require('../models/article.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              User Controller                               *
 ******************************************************************************/
class ArticleController {
    getAllArticles = async (req, res, next) => {
        const articleList = await ArticleModel.find();
        if (!articleList.length) {
            throw new HttpException(404, 'Articles not found');
        }
        // articleList = articleList.map(article => {
        //     const { password, ...userWithoutPassword } = article;
        //     return articleWithoutPassword;
        // });
        // const user = UserModel.findOne({ id: jwt.verify(req.headers.authorization.replace('Bearer ', ''), process.env.SECRET_JWT || "").user_id });
        const authHeader = req.headers.authorization;
        const token = authHeader.replace('Bearer ', '');
        const secretKey = process.env.SECRET_JWT || "";
        const decoded = jwt.verify(token, secretKey);
        const nowuser = await UserModel.findOne({ id: parseInt(decoded.user_id) });
        if (!nowuser) {
            throw new HttpException(404, 'User not found');
        }
        const { password, ...userWithoutPassword } = nowuser;
        if (userWithoutPassword.role == 0){
            res.send(JSON.parse(JSON.stringify(articleList)).filter(item => {
            return item.is_premium == 0}))
        }   else    {
            res.send(JSON.parse(JSON.stringify(articleList)));
        }
    };

    getArticleById = async (req, res, next) => {
        const article = await ArticleModel.findOne({ id: req.params.id });
        if (!article) {
            throw new HttpException(404, 'Article not found');
        }
        // console.log(JSON.parse(JSON.stringify(req.currentUser)));

        const { password, ...userWithoutPassword } = article;
        if (req.currentUser.role == 1){
            res.send(userWithoutPassword);
        }   else    {
            res.send([userWithoutPassword.title,(userWithoutPassword.content).split('').slice(0, 5).join("").toString(),userWithoutPassword.author_id,userWithoutPassword.time,userWithoutPassword.is_premium]);
        }
    };

    createArticle = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await ArticleModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Article was created!');
    };

    updateArticle = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        const article = await ArticleModel.findOne({ id: req.params.id });

        if (req.currentUser.id == article.author_id){
            const result = await ArticleModel.update(restOfUpdates, req.params.id);

            if (!result) {
                throw new HttpException(404, 'Something went wrong');
            }

            const { affectedRows, changedRows, info } = result;

            const message = !affectedRows ? 'Article not found' :
                affectedRows && changedRows ? 'Article updated successfully' : 'Updated faild';

            res.send({ message, info });
        }   else    {
                throw new HttpException(401, 'Authentication failed!');
        }
    };

    deleteArticle = async (req, res, next) => {
        const article = await ArticleModel.findOne({ id: req.params.id });
        if (req.currentUser.id == article.author_id){
            const result = await ArticleModel.delete(req.params.id);
            if (!result) {
                throw new HttpException(404, 'Article not found');
            }
            res.send('Article has been deleted');
        }   else    {
                throw new HttpException(401, 'Authentication failed!');
        }
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    };
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}



/******************************************************************************
 *                               Export                                       *
 ******************************************************************************/
module.exports = new ArticleController;