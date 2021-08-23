const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, followUserSchema, bookmarkSchema, likeSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users
router.get('/id/:id', auth(), awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/id/1
router.get('/username/:username', auth(), awaitHandlerFactory(userController.getUserByuserName)); // localhost:3000/api/v1/users/usersname/julia
router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/whoami
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users
router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1

router.post('/follow', auth(), followUserSchema, awaitHandlerFactory(userController.followUser)); // localhost:3000/api/v1/users/id/1
// follow
router.post('/deletefollow', auth(), followUserSchema, awaitHandlerFactory(userController.deletefollowUser)); // localhost:3000/api/v1/users/id/1
// deletefollow
router.post('/bookmark', auth(), bookmarkSchema, awaitHandlerFactory(userController.bookmarkUser)); // localhost:3000/api/v1/users/id/1
// bookmark
router.post('/deletebookmark', auth(), bookmarkSchema, awaitHandlerFactory(userController.deletebookmarkUser)); // localhost:3000/api/v1/users/id/1
// bookmark
router.post('/:tablename', auth(), likeSchema, awaitHandlerFactory(userController.likelike)); // localhost:3000/api/v1/users/id/1
// like


router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login

module.exports = router;