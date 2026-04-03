const { respond } = require('./respond.js');

const authAdmine = (req, res, next) => {
    //for admin
    const {email, password, username, useremail} = req.body;
    if(email === process.env.email && password === process.env.password){
        req.user = {name: username, email: useremail};
        return next();
    }
    return respond(res, 403);
}

module.exports = {authAdmine}