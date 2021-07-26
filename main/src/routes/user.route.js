// const { createUser } = require("../controllers/user.controller");
// const router = require("express").Router();

// router.post("/", createUser);

// module.exports = router;

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {createUser, login, getUserByUserId, getUsers, updateUsers, deleteUser, getUserProfile} = require("../controllers/user.controller");
router.get("/", checkToken, getUsers);
router.post("/", checkToken, createUser);
router.get("/profile", checkToken, getUserProfile);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);



module.exports = router;