const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const _ =  require("lodash");
const {Register, validate} = require("../modules/registerschema.js");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();



router.post("/", async(req,res) =>{

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Register.findOne({email: req.body.email})
    if (user) return res.status(400).send("User already exist")

    user =  new Register(_.pick(req.body,["name", "email","password"]));

   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password,salt)
    await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token",token).send( _.pick(user,["name", "email"]))
})

module.exports = router;
 