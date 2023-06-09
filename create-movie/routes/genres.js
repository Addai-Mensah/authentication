const auth = require("../../middleware/auth")
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


   


    router.get("/", (async (req,res,next) =>{

        const genre = await Genre.find()
        .sort("name");
        
    }));




    // create post
    router.post("/", auth, async (req,res) => {

        const {error} = validate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
      
         let genre = new Genre({name: req.body.name });
         genre = await genre.save();

        res.send(genre);
        console.log(genre)
    
    });

    router.put("/:id", async (req,res) => {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        },{new:true});

        if (!genre) return res.status(400).send("Genre of this id does not exist, please try again later!");
         return res.send(genre);
    });


    router.delete("/:id", async (req,res) => {
        const genre = await Genre.findByIdAndRemove(req.params.id)

        
        if (!genre) return res.status(400).send("Genre of this id does not exist, please try again!");
         return res.send(genre);
    })

    module.exports = router;



