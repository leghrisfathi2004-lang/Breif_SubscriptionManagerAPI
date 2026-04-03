const jwt = require('jsonwebtoken');
const {respond} = require('./respond');
const {login} = require('../controllers/users.controller')

const auth = (req, res, next) => {    
    //for other users
    try{
        const head = req.headers.authorization;
        if(!head || !head.startsWith("Bearer"))
            return login(req, res);
        const tokenvalue = head.split(" ")[1];
        const decode = jwt.verify(tokenvalue, process.env.jwt_code);
        //decode = {name: ****, email: *****, expiresIn...}
        req.user = decode;
        next();
    } catch(e) {
        console.log("JWT error:", e.message);
        return res.status(401).json({errour: e.message});
    }
}
module.exports = {auth}