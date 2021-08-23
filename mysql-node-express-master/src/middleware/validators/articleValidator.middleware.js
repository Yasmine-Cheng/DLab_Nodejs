const { body } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createArticleSchema = [
    body('title')
        .exists()
        .withMessage('Title is required')
        .notEmpty(),
        // .isEmail()
        // .withMessage('Must be a valid email')
        // .normalizeEmail(),
    body('content')
        .exists()
        .withMessage('Content is required')
        .notEmpty(),
        // .isLength({ min: 6 })
        // .withMessage('Password must contain at least 6 characters')
        // .isLength({ max: 10 })
        // .withMessage('Password can contain max 10 characters'),
    body('author_id')
        .exists()
        .withMessage('Author id is required'),
        // .isLength({ min: 3 })
        // .withMessage('Must be at least 3 chars long'),
    body('is_premium')
        .optional()
        .isIn([0,1])
        .withMessage('Invalid Role type'),
    body('tag')
        .optional(),
];

exports.updateArticleSchema = [
    body('title')
        .optional()
        .notEmpty(),
        // .isEmail()
        // .withMessage('Must be a valid email')
        // .normalizeEmail(),
    body('content')
        .optional()
        .notEmpty(),
        // .isLength({ min: 6 })
        // .withMessage('Password must contain at least 6 characters')
        // .isLength({ max: 10 })
        // .withMessage('Password can contain max 10 characters')
    body('author_id')
        .optional()
        .notEmpty(),
        // .isLength({ min: 3 })
        // .withMessage('Must be at least 3 chars long'),
    body('is_premium')
        .optional()
        .isIn([0,1])
        .withMessage('Invalid Role type'),
    body('tag')
        .optional(),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['title', 'content', 'author_id', 'is_premium'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];