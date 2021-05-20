const mongoose = require('mongoose');

const lectureSchema = mongoose.Schema({
    id : {type: String, required : true, unique : true},
    name: { type: String, required: true, unique: true},
    shortDescription: { type: String},
    description : {type:String}
});

module.exports = mongoose.model('Lecture', lectureSchema);