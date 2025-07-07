const Employee = require('../models/Employee.model');


const getAllEmployees = async () => {
    return await Employee.find({});
};

const getEmployeeById = async (id) => {
    return await Employee.findById(id);
};

const createEmployee = async (data) => {
    const employee = new Employee(data);
    return await employee.save();
};

const deleteEmployee = async (id) => {
    return await Employee.findByIdAndDelete(id);
};


module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    deleteEmployee,
};
