const Lecture = require('../models/lecture');
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