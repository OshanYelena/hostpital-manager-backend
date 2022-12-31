const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
    doctorName: {
        type: String,

        trim: true 
    },
    specialist: {
        type: String,
        trim: true 
    },
    patientName: {
        type: String,
        trim: true 
    },
    patientId: {
        type: String,
        trim: true 
    },
    doctorId: {
        type: String,
        trim: true 
    },
    date:{
        type: String,
        trim: true 
    },
    appointmentId:{
        type: Number,
        trim: true 
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("appoinment", mealSchema)