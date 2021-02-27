const {buildingSchema, factSchema} = require ('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Building =require('./models/building.js');
const Fact = require('./models/fact.js');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        //store URL they are requesting!
        //so that when the user logs in, they can be sent back to
        //where they were, instead of /buildings all the time!
        //console.log(req.path, req.originalUrl)
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in!');
        return res.redirect('/login');
    }
    next();
}
module.exports.validateBuilding = (req, res, next) => {
    const {error} = buildingSchema.validate(req.body);
    if (error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400); 
    } else {
        next();
    }
}
module.exports.isAuthor = async (req, res, next) => {
    const {id} =req.params;
    const building = await Building.findById(id);
    if (!building.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission.');
        return res.redirect(`/buildings/${id}`);
    }
    next();
}
module.exports.isFactAuthor = async (req, res, next) => {
    const {id, factId} = req.params;
    const fact =await Fact.findById(factId);
    if (!fact.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission.');
        return res.redirect(`/buildings/${id}`);
    }
    next();
}
module.exports.validateFact = (req, res, next) => {
    const {error} = factSchema.validate(req.body);
    if (error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}