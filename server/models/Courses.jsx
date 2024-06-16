const mongoose = require('mongoose')

const CoursesSchema = new mongoose.Schema({
    name: String,
    price: Number
})

const CoursesModel = mongoose.model("Courses", CoursesSchema)
module.exports = CoursesModel