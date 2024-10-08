require("express-async-errors");

var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const TodoRouters = require("./routers/todo.router");
const UsersRouters = require("./routers/users.router");
const errorHandler = require("./handlers/errorHandler");
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
require("./models/users.model");


app.use("/todos",TodoRouters);
app.use("/users",UsersRouters);
app.use(errorHandler);

  
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });

