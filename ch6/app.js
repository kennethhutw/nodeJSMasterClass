require("express-async-errors");

var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const errorHandler = require("./handlers/errorHandler");
const TodoRoutes = require("./routers/todo");
require("dotenv").config();
var app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
app.use(bodyParser.json());



mongoose.connect(process.env.MONGODB_URI,{}).then(()=>{
  console.log("connection to mongodb successfully!")
}).catch((error)=>{
  console.log("connection to mongodb failed!")
})


require("./models/todo.model");



app.use('/todos', TodoRoutes);
app.use(errorHandler);

  
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });

