const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    title:{
        type:String,
        required:[true,"Todo title is requireed"]    
    },
    completed:{
        type:Boolean
    },
    description:{
        type:String
    }
});

const todoModel = mongoose.model("Todos", todoSchema);

module.exports = todoModel;