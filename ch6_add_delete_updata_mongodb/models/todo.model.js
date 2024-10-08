const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    id:{
        type:String
    },
    title:{
        type:String,
        required:[true, "Todo title is required"]
    },
    completed:{
        type:Boolean
    }
})

const todoModel = mongoose.model("Todos", todoSchema);

module.exports = todoModel;