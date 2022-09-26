const express = require("express")
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(cors({ origin: 'http://localhost:' + process.env.FRONTEND_PORT, credentials: true }));
app.use(cookieParser());


const userRoute = require('./routes/User.js');
const questionRoute = require('./routes/Question.js');
app.use(userRoute);
app.use(questionRoute);


const CONNECTION_STRING = process.env.CONNECTION_STRING;

mongoose
  .connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.BACKEND_PORT, function (error) {
      if (error) throw error
      console.log("Backend running on port " + process.env.BACKEND_PORT)
    })
  })
  .catch(err => {
    console.log(err);
  });

module.exports = app;
