const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({

    bodyPart: {
        type: String,
        required: [true, "Please enter your first name"],
        trim: true 
    },
    group: {
        type: String,
        required: [true, "Please enter group No"],
        trim: true 
    },
    equipment: {
        type: String,
        required: [true, "Please enter your last name"],
        trim: true 
    },

    name: {
        type: String,
        required: [true, "Please enter your phone number"],
        trim: true 
    },
    target: {
        type: String,
        required: [true, "Please enter your password"],
        trim: true 
    },
    gifUrl: {
        type: String,
        required: [true, "Please enter your password"],
        trim: true 
    },
   

}, {
    timestamps: true
})

module.exports = mongoose.model("Exercies", memberSchema)