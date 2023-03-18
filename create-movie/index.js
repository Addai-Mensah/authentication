const mongoose = require("mongoose");
const express = require("express");

const app = express();
const movies = require("./routes/movies")
const genres = require("./routes/genres");
const customers = require("./routes/customers")

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true')
.then (() =>console.log('connected to MongoDB...'))
.catch (() => console.error('could not connect to Mongodb'))


app.use(express.json());
app.use("/api/movies", movies);
app.use("/api/genres", genres);
app.use("/api/customers", customers);




const port = process.env.Port || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ....`))