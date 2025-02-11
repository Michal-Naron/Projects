const mongoose = require("mongoose")

const Schema = mongoose.Schema

const Note = new Schema({
    title:{
        require: true,
        type:String
    },
    text:{
        require:true,
        type:String
    },
    user:{
        require:true,
        type:String
    }
})

module.exports = mongoose.model("Note",Note)