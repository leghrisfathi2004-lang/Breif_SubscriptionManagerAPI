
const express = require('express');
const router = express.Router();

const {authAdmine} = require('../middleware/authAdmine.js');
const {auth} = require('../middleware/auth.js');
const {register, login, getUser, deleteUser, getAllUsers} = require('../controllers/users.controller.js');
const {addSub, deleteSub, getAllSubs, getUserSubs} = require('../controllers/subs.controller.js');
const {validateSub, validateUser} = require("../middleware/validate.js");
console.log('routes');

//manage user
router.post("/users/new", validateUser, register);
router.post("/users/login", validateUser, login);
router.get("/users/profile", auth, getUser);

//manage subs
router.post("/users/subs", validateSub, auth, addSub);
router.get("/users/subs", auth, getUserSubs);
router.delete("/users/subs/:id", auth, deleteSub);

//admin routes
router.get("/admin/users", authAdmine, getAllUsers);
router.delete("/admin/users", authAdmine, deleteUser);
router.get("/admin/subs", authAdmine, getAllSubs);

module.exports = router;