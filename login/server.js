require('dotenv').config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

const {errorHandle} = require("./middleware/errorHandler");

db.on('error',(err)=>{
    console.log(err);
})

db.once('open',() => console.log('Connected to databse'))

app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}))
app.use(express.json());

const signupRouter = require("./routes/signup.route.js");
const loginRouter = require("./routes/login.route.js");
const dashboardRouter = require("./routes/dashboard.route.js");
const errorRouter = require("./routes/errors/error.route.js");
app.use("/signup",signupRouter);
app.use("/login",loginRouter);
app.use("/dashboard",dashboardRouter);
app.use("/error",errorRouter);

app.use(errorHandle);


app.listen(3000, () => console.log('Server Started'));