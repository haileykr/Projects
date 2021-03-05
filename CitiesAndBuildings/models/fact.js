const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const factSchema = new Schema({
    body: String,
    additionTime:String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Fact',factSchema);