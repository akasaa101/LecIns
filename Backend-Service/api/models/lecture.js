const mongoose = require('mongoose');

const lectureSchema = mongoose.Schema({
    id : {type : String, required : true, unique : true},
    name: { type: String, required: true, unique: true},
    shortDescription: { type: String, required : true},
    description : {type:String, required : true},
    rating : {type :Number }
});

module.exports = mongoose.model('Lecture', lectureSchema);