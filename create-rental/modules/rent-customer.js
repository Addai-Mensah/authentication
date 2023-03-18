const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },

    phone:{
        type: Number,
        required: true,
        minlength:10,
        maxlength:15
    },

    isGold: {
        type: Boolean,
        default: false
      },
})

    const Customer = mongoose.model("Customers",customerSchema)

    function validateCourse(course){
        const schema = {
            name:Joi.string().min(5).max(50).required(),
            phone:Joi.string().min(10).max(15).required(),
            isGold:Joi.boolean().required()
        }

        return Joi.validate(course, schema);
    }

    exports.Customer = Customer;
    exports.validate = validateCourse;