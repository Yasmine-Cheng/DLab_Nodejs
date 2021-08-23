const UserModel = require('../models/user.model');
const ArticleModel = require('../models/article.model');
const CommentModel = require('../models/comment.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              User Controller                               *
 ******************************************************************************/
class UserController {
    getAllUsers = async (req, res, next) => {
        let userList = await UserModel.find();
        if (!userList.length) {
            throw new HttpException(404, 'Users not found');
        }

        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.send(userList);
    };

    getUserById = async (req, res, next) => {
        const user = await UserModel.findOne({ id: req.params.id });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    getUserByuserName = async (req, res, next) => {
        const user = await UserModel.findOne({ username: req.params.username });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    getCurrentUser = async (req, res, next) => {
        const { password, ...userWithoutPassword } = req.currentUser;

        res.send(userWithoutPassword);
    };

    createUser = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await UserModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('User was created!');
    };

    updateUser = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await UserModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteUser = async (req, res, next) => {
        const result = await UserModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send('User has been deleted');
    };

    followUser = async (req, res, next) => {
        const user = await UserModel.findOne({ id: req.body.following_id });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await UserModel.createfollow(parseInt(req.currentUser.id), parseInt(req.body.following_id));

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Follow was created!');

    };

    deletefollowUser = async (req, res, next) => {
        const user = await UserModel.findOne({ id: req.body.following_id });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await UserModel.deletefollow(parseInt(req.currentUser.id), parseInt(req.body.following_id));

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Follow was deleted!');

    };

    bookmarkUser = async (req, res, next) => {
        const article = await ArticleModel.findOne({ id: req.body.article_id });
        if (!article) {
            throw new HttpException(404, 'Article not found');
        }
        const user = await UserModel.findOne({ id: req.currentUser.id });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await UserModel.createBookmark(parseInt(req.currentUser.id), parseInt(req.body.article_id));

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Bookmark was created!');
    };

    deletebookmarkUser = async (req, res, next) => {
        const article = await ArticleModel.findOne({ id: req.body.article_id });
        if (!article) {
            throw new HttpException(404, 'Article not found');
        }
        // const bookmark = await AUserModel.findOnebookmark({ id: req.body.article_id });
        // if (!article) {
        //     throw new HttpException(404, 'Article not found');
        // }
        const user = await UserModel.findOne({ id: req.currentUser.id });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await UserModel.deleteBookmark(parseInt(req.currentUser.id), parseInt(req.body.article_id));

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Bookmark was deleted!');
    };


    likelike = async (req, res, next) => {
        const target = req.params.tablename
        if (target=='likearticle'){

            const article = await ArticleModel.findOne({ id: req.body.article_id });
            if (!article) {
                throw new HttpException(404, 'Article not found');
            }
            const user = await UserModel.findOne({ id: req.currentUser.id });
            if (!user) {
                throw new HttpException(404, 'User not found');
            }
    
            const { password, ...userWithoutPassword } = user;
    
            this.checkValidation(req);
    
            await this.hashPassword(req);

            const result = await UserModel.likelike(target, parseInt(req.currentUser.id), parseInt(req.body.article_id), parseInt(req.body.clap));
    
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
    
            res.status(201).send('Like Article was created!');
            
        }
        if (target=='likecomment'){

            const comment= await CommentModel.findOne({ id: req.body.comment_id });
            if (!comment) {
                throw new HttpException(404, 'Comment not found');
            }
            const user = await UserModel.findOne({ id: req.currentUser.id });
            if (!user) {
                throw new HttpException(404, 'User not found');
            }
    
            const { password, ...userWithoutPassword } = user;
    
            this.checkValidation(req);
    
            await this.hashPassword(req);
    
            const result = await UserModel.likelike(target, parseInt(req.currentUser.id), parseInt(req.body.comment_id), parseInt(req.body.clap));
    
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
    
            res.status(201).send('Like Comment was created!');
            
        }
    };

    userLogin = async (req, res, next) => {
        this.checkValidation(req);

        const { email, password: pass } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }

        // const isMatch = await 
        bcrypt.compare(pass, user.password);
        const isMatch = bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }

        // user matched!
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        const { password, ...userWithoutPassword } = user;

        res.send({ ...userWithoutPassword, token });
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}



/******************************************************************************
 *                               Export                                       *
 ******************************************************************************/
module.exports = new UserController;