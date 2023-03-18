const mongoose = require("mongoose");
const express = require("express");
const app = express();
const registerUser = require("./routes/registerroute.js");


mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true')
.then (() =>console.log('connected to MongoDB...'))
.catch (() => console.error('could not connect to Mongodb'))

app.use(express.json());
app.use("/api/register", registerUser)



const port = process.env.Port || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ....`))