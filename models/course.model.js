const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    lowercase:true
    
  },
  price: {
    type: Number,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
        lowercase:true

  },
  image:{
    type:String,
    required:true
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
