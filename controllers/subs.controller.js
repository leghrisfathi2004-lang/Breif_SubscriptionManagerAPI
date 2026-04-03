const {user, sub} = require('../database/module.js');
const {respond} = require('../middleware/respond.js')

const addSub = async (req, res) => {
    let b = req.body;
    if(!b.name || !b.price || !b.billingCycle || !req.user.email )
        return respond(res, 400);
    const newSub = new sub({
        name: b.name, 
        price: b.price, 
        billingCycle: b.billingCycle,
        userEmail: req.user.email 
    });
    let resultat;
    try{
        resultat = await newSub.save();
    }catch(e) {
        return respond(res, 500)
    }
    return respond(res, 201, resultat);
}

const deleteSub = async (req, res) => {
    try{
        const id = req.params.id; 
        if(!id)
            return respond(res, 404);

        let resultat = await sub.deleteOne({ _id: id});
        if(resultat.deleteOne === 0)
            return respond(res, 404, "id not found!");
        respond(res, 204);
    }catch(err){
        return respond(res, 500);
    }
}

const getAllSubs = async (req, res) => {
    try{
        const subs = await sub.find({}).lean();
        if(!subs)
            return respond(res, 404);
        respond(res, 200, subs);
    }catch(e){
        respond(res, 500, e.message);
    }
}

const getUserSubs = async (req, res) => {
    try {
        if(!req.user.email)
            return respond(res, 404);
        const subs = await sub.find({ userEmail: req.user.email }).lean();
        if(!subs)
            return respond(res, 204);
        respond(res, 200, subs);
    } catch(e){
        return respond(res, 500);
    }
}




module.exports = {addSub, deleteSub, getAllSubs, getUserSubs};