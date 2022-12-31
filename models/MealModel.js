const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
    instructorId: {
        type: String,

        trim: true 
    },
    group: {
        type: String,
        trim: true 
    },
    mealName: {
        type: String,
        trim: true 
    },
    mondayPlan: {
        type: [],
        trim: true 
    },
    tuesdayPlan: {
        type: [],
        trim: true 
    },
    wednesdayPlan: {
        type: [],
        trim: true 
    },
    thursdayPlan: {
        type: [],
        trim: true 
    },
    fridayPlan: {
        type: [],
        trim: true 
    },
    saturdayPlan: {
        type: [],
        trim: true 
    },
    sundayPlan: {
        type: [],
        trim: true 
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("mealPlan", mealSchema)