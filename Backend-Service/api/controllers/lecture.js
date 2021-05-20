const Lecture = require('../models/lecture');
const mongoose = require('mongoose');

exports.getAll = (req,res,next) => {
   res.status(200).json({message : "okey"})
  }