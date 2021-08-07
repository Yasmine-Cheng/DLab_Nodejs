const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createUser, login, getPremiumUsers, getUserByUserId, getUserProfile, getUsers, updateUsers, deleteUser } = require("../controllers/user.controller");
// const auth = require('@middleware/auth-middleware');
router.post("/", checkToken, createUser);
router.post("/login", login);
router.get("/premium", checkToken, getPremiumUsers);
router.get("/:id", checkToken, getUserByUserId);
router.get("/profile", checkToken, getUserProfile);
router.get("/", checkToken, getUsers);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;