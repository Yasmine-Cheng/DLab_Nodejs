// const { body } = require('express-validator');
// const Role = require('../../utils/userRoles.utils');


// exports.createUserSchema = [
//     body('username')
//         .exists()
//         .withMessage('username is required')
//         .isLength({ min: 3 })
//         .withMessage('Must be at least 3 chars long'),
//     body('first_name')
//         .exists()
//         .withMessage('Your first name is required')
//         .isAlpha()
//         .withMessage('Must be only alphabetical chars')
//         .isLength({ min: 3 })
//         .withMessage('Must be at least 3 chars long'),
//     body('last_name')
//         .exists()
//         .withMessage('Your last name is required')
//         .isAlpha()
//         .withMessage('Must be only alphabetical chars')
//         .isLength({ min: 3 })
//         .withMessage('Must be at least 3 chars long'),
//     body('email')
//         .exists()
//         .withMessage('Email is required')
//         .isEmail()
//         .withMessage('Must be a valid email')
//         .normalizeEmail(),
//     body('role')
//         .optional()
//         .isIn([Role.Admin, Role.SuperUser])
//         .withMessage('Invalid Role type'),
//     body('password')
//         .exists()
//         .withMessage('Password is required')
//         .notEmpty()
//         .isLength({ min: 6 })
//         .withMessage('Password must contain at least 6 characters')
//         .isLength({ max: 10 })
//         .withMessage('Password can contain max 10 characters'),
//     body('confirm_password')
//         .exists()
//         .custom((value, { req }) => value === req.body.password)
//         .withMessage('confirm_password field must have the same value as the password field'),
//     body('age')
//         .optional()
//         .isNumeric()
//         .withMessage('Must be a number')
// ];

// exports.updateUserSchema = [
//     body('username')
//         .optional()
//         .isLength({ min: 3 })
//         .withMessage('Must be at least 3 chars long'),
//     body('first_name')
//         .optional()
//         .isAlpha()
//         .withMessage('Must be only alphabetical chars')
//         .isLength({ min: 3 })
//         .withMessage('Must be at least 3 chars long'),
//     body('last_name')
//         .optional()
//         .isAlpha()
//         .withMessage('Must be only alphabetical chars')
//         .isLength({ min: 3 })
//         .withMessage('Must be at least 3 chars long'),
//     body('email')
//         .optional()
//         .isEmail()
//         .withMessage('Must be a valid email')
//         .normalizeEmail(),
//     body('role')
//         .optional()
//         .isIn([Role.Admin, Role.SuperUser])
//         .withMessage('Invalid Role type'),
//     body('password')
//         .optional()
//         .notEmpty()
//         .isLength({ min: 6 })
//         .withMessage('Password must contain at least 6 characters')
//         .isLength({ max: 10 })
//         .withMessage('Password can contain max 10 characters')
//         .custom((value, { req }) => !!req.body.confirm_password)
//         .withMessage('Please confirm your password'),
//     body('confirm_password')
//         .optional()
//         .custom((value, { req }) => value === req.body.password)
//         .withMessage('confirm_password field must have the same value as the password field'),
//     body('age')
//         .optional()
//         .isNumeric()
//         .withMessage('Must be a number'),
//     body()
//         .custom(value => {
//             return !!Object.keys(value).length;
//         })
//         .withMessage('Please provide required field to update')
//         .custom(value => {
//             const updates = Object.keys(value);
//             const allowUpdates = ['username', 'password', 'confirm_password', 'email', 'role', 'first_name', 'last_name', 'age'];
//             return updates.every(update => allowUpdates.includes(update));
//         })
//         .withMessage('Invalid updates!')
// ];

// exports.validateLogin = [
//     body('email')
//         .exists()
//         .withMessage('Email is required')
//         .isEmail()
//         .withMessage('Must be a valid email')
//         .normalizeEmail(),
//     body('password')
//         .exists()
//         .withMessage('Password is required')
//         .notEmpty()
//         .withMessage('Password must be filled')
// ];

const { body } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createUserSchema = [
    body('email')
        .exists()
        .withMessage('Email is required'),
        // .isEmail()
        // .withMessage('Must be a valid email')
        // .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty(),
        // .isLength({ min: 6 })
        // .withMessage('Password must contain at least 6 characters')
        // .isLength({ max: 10 })
        // .withMessage('Password can contain max 10 characters'),
    body('username')
        .exists()
        .withMessage('username is required'),
        // .isLength({ min: 3 })
        // .withMessage('Must be at least 3 chars long'),
    body('profile')
        .exists()
        .withMessage('Your profile is required'),
        // .isAlpha()
        // .withMessage('Must be only alphabetical chars')
        // .isLength({ min: 3 })
        // .withMessage('Must be at least 3 chars long'),
    body('photo_link')
        .exists()
        .withMessage('Your photo_link is required'),
        // .isAlpha()
        // .withMessage('Must be only alphabetical chars')
        // .isLength({ min: 3 })
        // .withMessage('Must be at least 3 chars long'),
    body('role')
        .optional()
        .isIn([0,1])
        .withMessage('Invalid Role type'),
    body('confirm_password')
        .exists()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('confirm_password field must have the same value as the password field')
];

exports.followUserSchema = [
    body('following_id')
        .exists()
        .withMessage('following_id is required')
        .notEmpty()
];

exports.bookmarkSchema = [
    body('article_id')
        .exists()
        .withMessage('article_id is required')
        .notEmpty()
];

exports.likeSchema = [
    body('article_id')
        .exists()
        .withMessage('article_id is required')
        .notEmpty(),
    body('count')
        .exists()
        .withMessage('count is required')
];


exports.updateUserSchema = [
    body('email')
        .optional(),
        // .isEmail()
        // .withMessage('Must be a valid email')
        // .normalizeEmail(),
    body('password')
        .optional()
        .notEmpty()
        // .isLength({ min: 6 })
        // .withMessage('Password must contain at least 6 characters')
        // .isLength({ max: 10 })
        // .withMessage('Password can contain max 10 characters')
        .custom((value, { req }) => !!req.body.confirm_password)
        .withMessage('Please confirm your password'),
    body('username')
        .optional(),
        // .isLength({ min: 3 })
        // .withMessage('Must be at least 3 chars long'),
    body('profile')
        .optional(),
        // .isAlpha()
        // .withMessage('Must be only alphabetical chars')
        // .isLength({ min: 3 })
        // .withMessage('Must be at least 3 chars long'),
    body('photo_link')
        .optional(),
        // .isAlpha()
        // .withMessage('Must be only alphabetical chars')
        // .isLength({ min: 3 })
        // .withMessage('Must be at least 3 chars long'),
    body('role')
        .optional()
        .isIn([0,1])
        .withMessage('Invalid Role type'),
    body('confirm_password')
        .optional()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('confirm_password field must have the same value as the password field'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['email', 'password', 'confirm_password', 'username', 'profile', 'photo_link', 'role'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.validateLogin = [
    body('email')
        .exists()
        .withMessage('Email is required'),
        // .isEmail()
        // .withMessage('Must be a valid email')
        // .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];