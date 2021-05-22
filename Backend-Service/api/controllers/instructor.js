const Instructor = require('../models/instructor');
const Lecture = require('../models/lecture')
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

exports.getAll = (req,res,next) => {
    Instructor.find(function(err,obj){
       
      res.status(200).json({lectures : obj});
  })
}

exports.getByName = (req,res,next) => {
    const name = req.body.name
    Instructor.findOne({name : name}).exec().then(doc => {res.status(200).json({doc})})
    .catch(err => {res.status(500).json({message : "Fail", description : err})})
}


exports.create = (req,res,next) => {
   const newInstructor = new Instructor({
      _id : new mongoose.Types.ObjectId(),
      name : req.body.name,
      description: req.body.description,
  });
  newInstructor.save().then(result =>{
      console.log("Instructor create succesfully");
      res.status(201).json({
          message : "done ",
          instructor : result
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
    Instructor.findOne({ _id : id }).exec().then(doc=>{
        res.status(200).json({doc})
    }).catch(err => {
        res.status(500).json({message : "Fail", error : err })
    })
 }


exports.addComment = (req,res,next) => {
    const id = req.params.id
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
            Instructor.findOneAndUpdate(
            {_id : id }, 
            { $push: { comments: newComment } },
           function (error, success) {
                 if (error) {
                     console.log(error);
                     res.status(500).json({error:error})
                 } else {
                     const newCount = success.commentCount + 1      
                     const newRating = ((success.commentCount * success.rating) + req.body.score)/newCount
                     const update = { rating: newRating, commentCount : newCount };
                     Instructor.findOneAndUpdate({_id : id}, update, {new : true}).exec().then(doc=>{
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

exports.addLecturetoInstructor = async (req,res,next) => {
        const id = req.params.id;
        const addNewLecture= {
            lectureID : req.body.lectureID,
            lectureName : req.body.lectureName,
        };
        console.log(addNewLecture)
            Instructor.findOneAndUpdate(
            {_id : id }, 
            { $push: { lectures: addNewLecture } }, {new : true},
           function (error, success) {
                 if (error) {
                     console.log(error);
                     res.status(500).json({error:error})
                 } else {
                    res.status(200).json({success})
                 }
             }); 
    }
   
   

