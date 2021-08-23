const { body } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createCommentSchema = [
    body('content')
        .exists()
        .withMessage('Content is required')
        .notEmpty(),
        // .isLength({ min: 6 })
        // .withMessage('Password must contain at least 6 characters')
        // .isLength({ max: 10 })
        // .withMessage('Password can contain max 10 characters'),
    body('user_id')
        .exists()
        .withMessage('User_id is required')
        .isNumeric()
        .notEmpty(),
    body('article_id')
        .exists()
        .withMessage('Article_id is required')
        .isNumeric()
        .notEmpty(),
        // .isLength({ min: 6 })
        // .withMessage('Password must contain at least 6 characters')
        // .isLength({ max: 10 })
        // .withMessage('Password can contain max 10 characters'),
    body('parent_id')
        .isNumeric()
        .optional(),
        // .isLength({ min: 3 })
        // .withMessage('Must be at least 3 chars long'),
];

exports.updateCommentSchema = [
    body('content')
        .optional()
        .notEmpty(),
        // .isEmail()
        // .withMessage('Must be a valid email')
        // .normalizeEmail(),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['content'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];