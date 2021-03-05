const Building = require('../models/building');
const Fact = require('../models/fact');

const {factSchema}= require('../schemas.js');

module.exports.renderFactsForm =async (req, res) => {
    const building = await Building.findById(req.params.id)
        .populate({
            path: 'facts',
            populate: {
                path:'author'
            }
        });
    
    if (!building){
        req.flash('error', 'Cannot find the building.');
        res.redirect(`/buildings/${req.params.id}`);
    }
    res.render('buildings/funfacts', {building});
};
module.exports.createFact = async (req, res) => {
    const building = await Building.findById(req.params.id);
    const fact = new Fact(req.body.fact);
    fact.author = req.user._id;
    building.facts.push(fact);

    const today=new Date();
    const time = today.getHours() + ':' + today.getMinutes()+ ':' + today.getSeconds();
    const date = today.getFullYear() + '-' + today.getMonth()+ '-' + today.getDate();
    fact.additionTime = date + ' ' + time;

    await fact.save();
    await building.save();
    req.flash('success', 'Successfully added a fun fact.');
    res.redirect (`/buildings/${req.params.id}/facts`); 
};
module.exports.deleteFact = async (req, res) => {
    const {id, factId} = req.params;
    console.log(factId)
    await Building.findByIdAndUpdate(id, {$pull: {facts:factId}})
    await Fact.findByIdAndDelete(factId);
    console.log(Fact)
    req.flash('success', 'Successfully deleted the fun fact.');
    res.redirect (`/buildings/${id}/funfacts`);
};

module.exports.getTime = (req, res) => {
    const today=new Date();
    const time = today.getHours() + ':' + today.getMinutes()+ ':' + today.getSeconds();
    const date = today.getFullYear() + '-' + today.getMonth()+ '-' + today.getDate();
}