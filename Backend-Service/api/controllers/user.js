const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');


exports.userLogout = async (req,res,next) => {
    res.status(200).json({message : "aslkasdjdalsd"})
}




exports.userCreate = (req,res,next) => {
    User.find({email : req.body.email}).exec()
    .then(user => {
        if (user.length >= 1){
            return res.status(409).json({
                message : 'Mail exist'
            })
        }else {
            bcrypt.hash(req.body.password, 10, (err,hash)=>{
                if (err){
                    res.status(500).json({
                        error: err
                    });
                }else{
                    const displayname = req.body.displayname
                    const user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        email : req.body.email,
                        password : hash,
                        displayName : displayname
                    });
                    user.save().then(result=>{
                        console.log("User Created Succesfully")
                            res.status(201).json({
                            message : 'User created',
                            user : result
                        });
                    }).catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error : err
                        })
                    })
                }
            })
        }
    })
    .catch()
  
  
}



exports.userLogin = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        } 
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            console.log('User Login Succesfully')
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }