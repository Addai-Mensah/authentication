const mongoose = require("mongoose");
const express = require("express")
const app = express();
const  customersRent = require("./routes/rent-customers");
const genresRent  = require("./routes/rent-genres");
const moviesRent = require("./routes/rent-movies");
const rentalRent = require("./routes/rent-rentals");

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true')
.then (() =>console.log('connected to MongoDB...'))
.catch (() => console.error('could not connect to Mongodb'))


app.use(express.json());
app.use("/api/moviesrental", moviesRent);
app.use("/api/genresrental", genresRent);
app.use("/api/customersrental", customersRent  );
app.use("/api/rentalrent", rentalRent);




const port = process.env.Port || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ....`))