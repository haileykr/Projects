const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Review = require ('./review')

const ImageSchema = new Schema({
    url: String,
    filename: String
})

const BuildingSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            // required: true
        },
        coordinates: {
            type: [Number],
            // required: true
        }
    },

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
});

module.exports = mongoose.model('Building', BuildingSchema);