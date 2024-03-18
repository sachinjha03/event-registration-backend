const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name:String,
    studentIdentity:{
        type:String,
        default:'XXXXX'
    },
    email:String,
    contact:Number,
    event:String,
    registrationNumber : Number
})

const eventModel = new mongoose.model("Event" , eventSchema)

module.exports = eventModel;