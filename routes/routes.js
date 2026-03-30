
const express = require('express');
const router = express.Router();

const {authAdmine} = require('../middleware/authAdmine.js');
const {auth} = require('../middleware/auth.js');
const {register, login, getUser, deleteUser, getAllUsers} = require('../controllers/users.controller.js');
const {addSub, deleteSub, getAllSubs, getUserSubs} = require('../controllers/subs.controller.js');
console.log('routes');

router.post("/users/new", register);
router.post("/users/login", login);
router.get("/users/profile", auth, getUser);

router.post("/users/subs", auth, addSub);
router.get("/users/subs", auth, getUserSubs);
//need to work en patch - edit sub
router.delete("/users/subs/:id", auth, deleteSub);

router.get("/admin/users", authAdmine, getAllUsers);
router.delete("/admin/users", authAdmine, deleteUser);
router.get("/admin/subs", authAdmine, getAllSubs);

module.exports = router;