const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employee_id: {
        type: String,
        required: true,
    },
    delegate_id: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
