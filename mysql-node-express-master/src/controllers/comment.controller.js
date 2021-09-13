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
 *                           Comment Controller                               *
 ******************************************************************************/
class CommentController {
    getAllComments = async (req, res, next) => {
        const commentList = await CommentModel.find();
        if (!commentList.length) {
            throw new HttpException(404, 'Comments not found');
        }
        res.send(JSON.parse(JSON.stringify(commentList)))
    };

    getCommentById = async (req, res, next) => {
        const article = await ArticleModel.findOne({ id: req.params.article_id });
        if (!article) {
            throw new HttpException(404, 'Article not found');
        }
        const reply = await CommentModel.findOne({ id:req.params.parent_id });
        if (!reply) {
            throw new HttpException(404, 'Reply not found');
        }
        const comment = await CommentModel.findReply({ article_id: req.params.article_id, parent_id: req.params.parent_id});
        if (!comment) {
            throw new HttpException(404, 'Comment not found');
        }
        const commentList = await CommentModel.find();
        if (!commentList.length) {
            throw new HttpException(404, 'Comments not found');
        }
        const clap = await CommentModel.findClap({ id:req.params.parent_id });
        if (!clap) {
            throw new HttpException(404, 'Clap not found');
        }
        const self_clap = await CommentModel.findSelfClap({ comment_id:req.params.parent_id, user_id:reply.user_id});
        let self_clap_count = 0;
        if (self_clap){
            self_clap_count+1;
        }
        
        const { password, ...userWithoutPassword } = comment;
        // res.send({"Replies":userWithoutPassword,"Reply_Count":Object.keys(userWithoutPassword).length,"Clap_Count":clap[0]});
        res.send({"data":[{"comment_id":reply.id,
                            "article_id":reply.article_id,
                            "author_id":reply.user_id,
                            "content":reply.content,
                            "created_at":reply.timestamp,
                            "updated_at":reply.updated_time,
                            "reply_count":comment.length,
                            "clap_count":clap,
                            "self_clap_count":self_clap_count,
                            "replies":comment}]});
    };

    createComment = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await CommentModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Comment was created!');
    };

    updateComment = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        const comment = await CommentModel.findOne({ id: req.params.id });

        if (req.currentUser.id == comment.user_id){
            const result = await CommentModel.update(restOfUpdates, req.params.id);

            if (!result) {
                throw new HttpException(404, 'Something went wrong');
            }

            const { affectedRows, changedRows, info } = result;

            const message = !affectedRows ? 'Comment not found' :
                affectedRows && changedRows ? 'Comment updated successfully' : 'Updated faild';

            res.send({ message, info });
        }   else    {
                throw new HttpException(401, 'Authentication failed!');
        }
    };

    deleteComment = async (req, res, next) => {
        const comment = await CommentModel.findOne({ id: req.params.id });
        if (req.currentUser.id == comment.user_id){
            const result = await CommentModel.delete(req.params.id);
            if (!result) {
                throw new HttpException(404, 'Comment not found');
            }
            res.send('Comment has been deleted');
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
module.exports = new CommentController;