const mongoose = require('mongoose');

//for user ----------
const userShema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//for subs ----------
const subShema = new mongoose.Schema({
    //id genere auto par mongodb
    name: { type: String, required: true },
    price: { type: Number, required: true },
    billingCycle: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userEmail: {
        type: String,
        ref: 'User',
        required: true
    }
})

const user = mongoose.model('User', userShema);
const sub = mongoose.model('Sub', subShema);

module.exports = {user, sub};

