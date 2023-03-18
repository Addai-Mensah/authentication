const bcrypt = require("bcrypt");
const config = require("config");
const _ =  require("lodash");
const auth = require ("../../../middleware/auth.js")
const {Login, validate} = require("../modules/loginschema");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();


 router.get("/me", auth, async (req,res) => {
    const user = Login.findById(req.user._id.select("-password"))
    res.send(user)
 })

router.post("/", async(req,res) =>{

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Login.findOne({email: req.body.email})
    if (!user) return res.status(400).send("invalid email or password.");

    // user =  new Login(_.pick(req.body,["email,password"]))
    
    const  validatePassword = await bcrypt.compare(req.body.password,user.password);
    if (!validatePassword) return res.status(400).send("invalid email or password.");
    
    const token = user.generateAuthToken();
    res.send(token);
});

module.exports = router;