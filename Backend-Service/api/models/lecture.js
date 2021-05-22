const mongoose = require('mongoose');

const lectureSchema = mongoose.Schema({
    id : {type : String, required : true, unique : true},
    name: { type: String, required: true, unique: true},
    shortDescription: { type: String, required : true},
    description : {type:String, required : true},
    rating : {type :Number, default : 0 },
    commentCount : {type : Number, required : true, default : 0},
    credit : {type : Number, required : false },
    akts : {type : Number, required : false},
    semester : {type : String, required : false},
    instructors : [{
      name :{type : String, required : true},
  }],
    comments : [{
        _id : {type : mongoose.Schema.Types.ObjectId},
        isAnon :{type : Boolean, required : true, default : false},
        user : {type : String, required : true},
        comment: { type: String, required : true},
        score: {type: Number, required: true}
    }]
});

module.exports = mongoose.model('Lecture', lectureSchema);