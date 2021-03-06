const Lecture = require('../models/lecture');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

exports.getAll = (req,res,next) => {
   Lecture.find(function(err,obj){
       
      res.status(200).json({lectures : obj});
  })
}

exports.create = (req,res,next) => {
   const newLecture = new Lecture({
      id : req.body.id,
      name : req.body.name,
      shortDescription : req.body.shortDescription,
      description: req.body.description,
      credit : req.body.credit,
      akts : req.body.akts,
      semester : req.body.semester
  });
  newLecture.save().then(result =>{
      console.log("Lecture create succesfully");
      res.status(201).json({
          message : "done ",
          lecture : result
      });
      return result;
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({
          message : "There is an error"
      })
  })
}


exports.getSingle = (req,res,next) => {
    const id = req.params.id
    Lecture.findOne({ id : id }).exec().then(doc=>{
        res.status(200).json({doc})
    }).catch(err => {
        res.status(500).json({message : "Fail", error : err })
    })
 }


exports.addComment = (req,res,next) => {
    const lectureID = req.body.lectureID
    const score = req.body.score 
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log(decoded)
    if(score >=0 && score<= 5){
        const newComment = {
            _id : new mongoose.Types.ObjectId(),
            isAnon : req.body.isAnon,
            user: decoded.displayname,
            comment : req.body.comment,
            score : req.body.score
        };
            Lecture.findOneAndUpdate(
            {id : lectureID }, 
            { $push: { comments: newComment } },
           function (error, success) {
                 if (error) {
                     console.log(error);
                     res.status(500).json({error:error})
                 } else {
                     const newCount = success.commentCount + 1      
                     const newRating = ((success.commentCount * success.rating) + req.body.score)/newCount
                     const update = { rating: newRating, commentCount : newCount };
                     Lecture.findOneAndUpdate({id : lectureID}, update, {new : true}).exec().then(doc=>{
                         res.status(200).json({message : "Success" , lecture : doc})
                     }).catch(err => {
                         res.status(500).json({message : "Error" , description : err})
                     })
    
                 }
             }); 
    }
    else{
        res.status(500).json({
            message : "Fail",
            description : "Score must be between 0 and 5"
        })
    }
    

}


exports.addInstructorToLecture = async (req,res,next) => {
    const id = req.params.id;
    const addNewInstructor= {
        name : req.body.name,
    };

        Lecture.findOneAndUpdate(
        {_id : id }, 
        { $push: { instructors: addNewInstructor } }, {new : true},
       function (error, success) {
             if (error) {
                 console.log(error);
                 res.status(500).json({error:error})
             } else {
                res.status(200).json({success})
             }
         }); 
}