const Building = require('../models/building')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken:mapToken});

const {cloudinary} = require('../cloudinary');

module.exports.index = async (req, res) => {
    // Only take the first word
    if (req.query.search){
        const search = req.query.search.split(" ")[0];
        const query = search[0].toUpperCase() + search.slice(1).toLowerCase();
        const buildings = await Building.find({name:  {$regex: query}});
        res.render('buildings/index', {buildings});
    } else {
        const buildings = await Building.find({});
        res.render('buildings/index', {buildings});
    }
}
module.exports.showBuilding = async (req,res)=>{
    const building = await Building.findById(req.params.id).populate("facts").populate("author");
    if (!building) {
        req.flash('error', 'Building not found!');
        return res.redirect('/buildings');
    }
    res.render('buildings/show', {building})
}
module.exports.renderNewForm = (req, res) => {
    res.render('buildings/new')
}
module.exports.createBuilding = async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.building.location,
        limit: 1
    }).send()

    const building = new Building(req.body.building); 
    building.geometry = geoData.body.features[0].geometry;
    building.images = req.files.map(f => ({url: f.path, filename: f.filename}))
    building.author = req.user._id
    building.save()
    // console.log(building)
    req.flash('success','Successfully added a new building!');
    res.redirect(`/buildings/${building._id}`)
}
module.exports.renderEditForm= async (req, res) => {
    const {id} = req.params;
    const building = await Building.findById(id);
    if (!building){
        req.flash('error', 'Building not found.');
        return res.redirect('/buildings');
    }
    res.render('buildings/edit',{building});
}
module.exports.updateBuilding = async (req, res) => {
    const {id} = req.params;
    const building = await Building.findByIdAndUpdate(id, {...req.body.building});
    if (req.files){
        const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
        building.images.push(...imgs);
    }
    await building.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename)
        }
        await building.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    }
    req.flash('success', 'Successfully updated the building!');
    res.redirect(`/buildings/${building._id}`);
}
module.exports.destroyBuilding = async (req, res) => {
    const {id} =req.params;
    await Building.findByIdAndDelete(id);

    req.flash('success', 'Successfully deleted the building');
    res.redirect('/buidings')
}