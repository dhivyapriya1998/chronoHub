const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    delegate_id: {
        type: String,
        required: true,
        index: true,
    },
    first_name: String,
    last_name: String,
    records: [
        {
            course_title: String,
            course_code: String,
            country: String,
            training_provider: String,
            completed_on: Date,
            valid_from: Date,
            valid_until: Date,
            previous_course_valid_until: String,
            status: String,
        }]
});

module.exports = mongoose.model('Course', CourseSchema);
