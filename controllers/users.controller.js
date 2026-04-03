const crypt = require("bcrypt");
const token = require('jsonwebtoken');
const {respond} = require('../middleware/respond.js');
const {user, sub} = require('../database/module.js');

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const exist = await user.findOne({ email });
        if (exist)
            return respond(res, 409);

        const hashPass = await crypt.hash(password, 10);
        await user.create({name, email, password: hashPass});
        return respond(res, 201, { name, email });
    } catch(e) {
        return respond(res, 500, e.message);
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const emCheck = await user.findOne({ email });
        if (!emCheck)
            return respond(res, 422);
        const passCheck = await crypt.compare(password, emCheck.password);
        if (!passCheck)
            return respond(res, 422);
        const jwt = token.sign(
            { name: emCheck.name, email: emCheck.email },
            process.env.jwt_code,
            { expiresIn: process.env.jwt_expire }
        );
        return res.status(200).json({
            message: "Log In successfuly!",
            token: jwt,
            user: { name: emCheck.name, email: emCheck.email }
        });
    } catch(e) {
        respond(res, 500, e.message);
    }
}

const getUser = async (req, res) => {
    try {
        const { email } = req.user;
        const USER = await user.findOne({ email }).select("-password").lean();

        if (!USER)
            return respond(res, 404);

        const SUBS = await getUserSubs(email);
        if (SUBS && SUBS.length > 0)
            return respond(res, 200, { USER, SUBS });
        return respond(res, 200, { USER });
    } catch(e) {
        respond(res, 500, e.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { useremail } = req.body;
        const resUser = await user.deleteOne({ email: useremail });
        if (!resUser.deletedCount)
            return respond(res, 404, "user not found");
        await sub.deleteMany({ userEmail: useremail });
        return respond(res, 202, "user and their subs delet en success!");
    } catch(e) {
        respond(res, 500, e.message);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const USERS = await user.find({}).select("-password").lean();
        if (!USERS || USERS.length === 0)
            return respond(res, 404);
        respond(res, 200, USERS);
    } catch(e) {
        respond(res, 500, e.message);
    }
}

module.exports = {register, login, getUser, deleteUser, getAllUsers}

// |--> Helper functions

const getUserSubs = async (email) => {
    const subs = await sub.find({ userEmail: email }).lean();
    return subs;
}