const {Movie, validate} = require ("../modules/rent-movie.js");
const express = require ("express");
const router = express.Router();
const {Genre} = require("../modules/rent-genre")
const mongoose = require("mongoose")


router.get("/", async (req,res) =>{
    const movie = await Movie.find()
        .sort("title")
        if(!movie) return res.status(400).send("Cant get all movies at this time, please try again")
        res.send(movie)
})

router.post("/", async (req,res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send("Invalid genre.")

    let movie = new Movie({
        title: req.body.title,

        genre:{
            _id: genre._id,
            name:genre.name
        },

        numberInStock: req.body.numberInStock,

        dailyRentalRate: req.body.dailyRentalRate,
    });

    movie = await movie.save()
    res.send(movie)
})


router.put("/:id", async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("Invalid genre.");

    const movie = await Movie.findByIdAndUpdate(req.params.id,
    {

        title: req.body.title,

        genre:{
            _id: genre._id,
            name:genre.name
        },

        numberInStock: req.body.numberInStock,

        dailyRentalRate: req.body.dailyRentalRate,

    },{new:true})

    if (!movie) return res.status(400).send("Movie with the given Id was not found");

    res.send(movie);
});

router.get("/:id", async (req,res) =>{
    const movie = await Movie. findByIdAndRemove(req.params.id)

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});


 module.exports = router;