const mongoose = require('mongoose');

const instructorSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true},
    description : {type:String, required : true},
    rating : {type :Number, default : 0 },
    commentCount : {type : Number, required : true, default : 0},
    lectures : [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
    comments : [{
        _id : {type : mongoose.Schema.Types.ObjectId},
        isAnon :{type : Boolean, required : true, default : false},
        user : {type : String, required : true},
        comment: { type: String, required : true},
        score: {type: Number, required: true}
    }]
});

module.exports = mongoose.model('Instructor', instructorSchema);