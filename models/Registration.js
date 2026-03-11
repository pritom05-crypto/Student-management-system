const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  semester: {
    type: String,
    required: true
  },

  registeredAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Registration", RegistrationSchema);
