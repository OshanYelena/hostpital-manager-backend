const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true,
    },
    specialist: {
      type: String,
      required: [true, "Please enter your specialist"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
      trim: true,
    },
    fee: {
      type: String,
      required: [true, "Please enter your feer"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      trim: true,
    },
    salary: {
      type: String,
      required: [true, "Please enter your salary"],
      trim: true,
    },
    role: {
      type: String,
      // 0 = admin, 1 = instructor, 2 = member
    },
    address: {
      type: String,
      required: [true, "Please enter your address"],
      trim: true,
    },
    time: {
      type: String,
      required: [true, "Please select your birthday"],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Please select your gender"],
      trim: true,
    },
    workingHrs: {
      type: Number,
      required: [true, "Please select your Working Hours"],
      trim: true,
    },

    appointments: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", instructorSchema);
