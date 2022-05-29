const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { buffer } = require("sharp/lib/is");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: String,
    required: true,
    trim: true,
 
  },
  video:{
    
  }

},{
    timestamps:true
});

const Contact=mongoose.model("contacts",ContactSchema);
module.exports=Contact;
