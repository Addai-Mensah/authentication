const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const {genreSchema} = require("./rent-genre")
const mongoose = require("mongoose");



const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },

    genre:{
        type:genreSchema,
        required:true
    },

    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:500
    },

    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:500
    }

});

   const Movie = mongoose.model("Movie", movieSchema);


    function validateMovie(movie){
        const schema = {
            title: Joi.string().min(5).max(50).required(),
            genreId: Joi.objectId.min(5).max(50).required(),
            numberInStock: Joi.number().min(0).max(500).required(),
            dailyRentalRate: Joi.number().min(0).max(500).required()
       }

       return Joi.validate(movie,schema);
    };

    exports.Movie = Movie;
    exports.validate = validateMovie;