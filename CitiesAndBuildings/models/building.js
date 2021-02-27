const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Review = require ('./review')

const ImageSchema = new Schema({
    url: String,
    filename: String
})

//per cloudinary doc
ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
})

const opts = {toJSON:{virtuals:true}};

const BuildingSchema = new Schema({
    name: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    facts: [
        {
            type:Schema.Types.ObjectId,
            ref: 'Fact'
        }
    ],
    year: Number,
    height: Number,
    architect: String,
    engineer: String,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},opts);

// description in popup in map
BuildingSchema.virtual('properties.popUpMarkup').get(function(){
    return `<strong><a href="/buildings/${this._id}">${this.name}</a></strong>
    <p>${this.description.substring(0,25)}...</p>`
});

BuildingSchema.post('findOneAndDelete',async function (doc){
    // note that findOneAndDelete is a query middleware
    // and this refers to the query
    // so we have to approach differently
    if (doc){
        await Fact.deleteMany ({
            _id: {$in: doc.facts}
        });
    }
});


module.exports = mongoose.model('Building', BuildingSchema);