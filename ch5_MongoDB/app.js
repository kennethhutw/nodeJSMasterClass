var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
app.use(bodyParser.json());

const mongoose=require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI,{}).then(()=>{
  console.log("connection to mongodb successful!")
}).catch(()=>{
  console.log("connection to mongodb failed!")
})

require("./models/todo.model");

app.get('/todos', (req, res) => {

    let data = fs.readFileSync('./todos.json');
    let todo_lists = JSON.parse(data);

    res.status(400).send(todo_lists);
  });

  app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
  
    let data = fs.readFileSync('./todos.json');
    let todo_list = JSON.parse(data);

    let found_todo_list = todo_list.filter(obj => obj.id == id);
    res.status(400).send(found_todo_list);
  });


  
    app.post('/todos', (req, res) => {

        console.log(req)
        var new_todo =
        {"userId":1,
            "id":req.body.id,
            "title":req.body.title,
            "completed":req.body.completed}
      
        let data = fs.readFileSync('./todos.json');
        let todo_list = JSON.parse(data);

        todo_list.push(new_todo);


        fs.writeFile('./todos.json', JSON.stringify(todo_list),(err)=>{
            if(err){
                res.send("failed to add")
            }
            res.status(400).send(`${req.body.id} is added successfully`);
        })
    
  });



  app.delete('/todos/:id', (req, res) =>{
    var id = req.params.id;

    let data = fs.readFileSync('./todos.json');
    let todo_list = JSON.parse(data);

    let rest_todo_list = todo_list.filter(obj => obj.id != id);

    fs.writeFile('./todos.json', JSON.stringify(rest_todo_list),(err)=>{
        if(err){
            res.send("failed to remove")
        }
        res.status(400).send(`${id} is deleted successfully`);
    })

  
   
  });

  
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });

