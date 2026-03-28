const crypt = require("bcrypt");
const token = require('jsonwebtoken');
const {respond} = require('../middleware/respond.js');
const {user, sub} = require('../database/module.js');

const register = async (req, res, next) => {
    try{
    const {name, email, password} = req.body;
    const exist = await user.findOne({ email });
    if(exist)
        return respond(res, 404);

    const hashPass = await crypt.hash(password, 10);
    
    const resault = await user.create({name, email, password: hashPass});
    return respond(res, 201, {name, email, password});
    next();
    } catch(e) {

    }
}

const login = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        //check email
        const emCheck = await user.findOne({ email });
        if(!emCheck)
            return respond(res, 422);
        //check hashed pass with given pass
        const passCheck = await crypt.compare(password, emCheck.password);
        if(!passCheck)
            return respond(res, 422);
        //generate twk
        const jwt = await token.sign(
            {name: emCheck.name, email: emCheck.email }, 
            process.env.jwt_code, 
            {expiresIn: process.env.jwt_expire});
            return res.status(200).json({
                message: "Log In successfuly!",
                token: jwt,
                user: emCheck
            });
            next();
    } catch (e) {
        respond(res, 500);
        console.log('errour : ' + e.message);
    }
}

const getUser = (req, res) => {
    const {email} = req.user.email;
    const USER = user.findOne({ email }).select("-password");
    
    if(!USER)
        return respond(res, 404);
    //next here in case u wanna get user subs (profile)
    let SUBS = getUserSubs(email);
    if(SUBS)
        return respond(res, 201, {USER, SUBS});
    return respond(res, 201, USER);

}

const deleteUser = (res, req) => {
    const email = req.user.email;
    const resaultat = user.deleteOne({ email });
    if(!resaultat)
        return respond(res, 404);
    return respond(202)

}

const getAllUsers = async (req, res) => {
    const USERS = await user.find(" ");
    if(!USERS)
        return respond(res, 404);
    respond(res, 200, USERS);
}

module.exports = {register, login, getUser, deleteUser, getAllUsers}

//  |--> Helper functions <--|

const getUserSubs = async (email) =>{
    const subs = await sub.find({ userEmail: email }).populate('userEmail','-password');
}
