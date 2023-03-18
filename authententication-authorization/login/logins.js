const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const loginUser = require("./routes/loginroutes");


// if (!config.get("jwtPrivateKey")){
//     console.error("FATAL ERROR: jwtPrivateKey is not defined");
//     process.exit(1);
// }

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true')
.then (() =>console.log('connected to MongoDB...'))
.catch (() => console.error('could not connect to Mongodb'))

app.use(express.json());
app.use("/api/login", loginUser)



const port = process.env.Port || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ....`))