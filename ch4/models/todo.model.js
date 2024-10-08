const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    id:{
        type:String
    },
    title:{
        type:String
    },
    completed:{
        type:Boolean
    }
})

const todoModel = mongoose.model("TodosList", todoSchema);

module.exports = todoModel;