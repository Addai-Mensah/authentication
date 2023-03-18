const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const register = new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true
    },

    email:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true,
        unique:true
    },


    password:{
        type: String,
        minlength:5,
        maxlength:2000,
        required:true
       
    }


})


register.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id},"jwtPrivateKey") 
    return token; 
}

const Register = mongoose.model("Register",register)

function validateRegister(register){

    const schema ={
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(2000).required()
    };

    return Joi.validate(register,schema);
};

exports.Register = Register;
exports.validate = validateRegister;