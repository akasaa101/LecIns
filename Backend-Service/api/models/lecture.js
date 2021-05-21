const mongoose = require('mongoose');

const lectureSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    owner : {type : String, required : true},
    name: { type: String, required: true, unique: true},
    shortDescription: { type: String},
    description : {type:String},

});

module.exports = mongoose.model('Lecture', lectureSchema);