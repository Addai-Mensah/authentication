require("express-async-errors");
const mongoose = require("mongoose");
const express = require("express");
const error = require("../middleware/error")
 require("winston-mongodb")

const app = express();
const movies = require("./routes/movies")
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const winston = require("winston-mongodb");

winston.add(wiston.transports.MongoDb,{db:"mongodb://127.0.0.1:27017/?directConnection=true"})

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true')
.then (() =>console.log('connected to MongoDB...'))
.catch (() => console.error('could not connect to Mongodb'))


app.use(express.json());
app.use("/api/movies", movies);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use(error);


const port = process.env.Port || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ....`))