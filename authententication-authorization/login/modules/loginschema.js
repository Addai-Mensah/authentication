const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const register = new mongoose.Schema({
   

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
       
    },

    isAdmin:{
        type: Boolean,
    }


})

register.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id, isAdmin:this.isAdmin},"jwtPrivateKey")  
    return token;
}

const Login = mongoose.model("Register",register)

function validateRegister(register){

    const schema ={
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(2000).required()
    };

    return Joi.validate(register,schema);
};

exports.Login = Login;
exports.validate = validateRegister;