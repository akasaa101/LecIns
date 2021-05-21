const mongoose = require('mongoose');

const commentSchema= mongoose.Schema({
    id : {type: String, required : true, unique : true},
    isAnonymous: { type: Boolean, required: true},
    comment: { type: String, required : true},
    score : {type:Number, required : true}
});

module.exports = mongoose.model('Comment', commentSchema);