const jwt = require('jsonwebtoken');
const {respond} = require('./respond');
const {login} = require('../controllers/users.controller')

const auth = (req, res, next) => {
    //for admin
    const {email, password, username, useremail} = req.body;
    if(email === process.env.email && password === process.env.password){
        req.user = {name: username, email: useremail};
        return next();
    }
        
    //for other users
    const head = req.headers.authorization;
    if(!head || !head.startsWith("Bearer"))
        return login(req, res, next);
    const token = head.split(" ")[1];
    try{
        const decode = jwt.verify(token, process.env.jwt_code);
        //decode here will belike {name: ****, email: *****, expiresIn...}
        req.user = decode;
        next();
    } catch(e) {
        return respond(res, 401);
    }
}
module.exports = {auth}