const employeeService = require('../services/employee.js');
const Course = require('../models/Course.model');
const EmployeeModel =  require('../models/Employee.model');

const getAllEmployeesHandler = async (request, h) => {
    const employees = await employeeService.getAllEmployees();
    const fullEmployeeData = await Promise.all(employees.map(async (employee) => {
        const courses = await Course.find({delegate_id: employee.delegate_id})
        const nameSource = courses[0] || {};

        return {
            _id: employee._id,
            employee_id: employee.employee_id,
            delegate_id: employee.delegate_id,
            first_name: nameSource.first_name || '',
            last_name: nameSource.last_name || '',
            total_courses: nameSource.records ? nameSource.records.length : 0,
        };
    }));
    return h.response(fullEmployeeData).code(200);
};

const getEmployeeByIdHandler = async (request, h) => {
    const { id } = request.params;

    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
        return h.response({ message: 'Employee not found' }).code(404);
    }

    const courses = await Course.find({ delegate_id: employee.delegate_id });
    const nameSource = courses[0] || {};

    const response = {
        employee_id: employee.employee_id,
        delegate_id: employee.delegate_id,
        first_name: nameSource.first_name || '',
        last_name: nameSource.last_name || '',
        courses : nameSource.records || [],
    };

    return h.response(response).code(200);
};


const createEmployeeHandler = async (request, h) => {
    const { employee_id, delegate_id, first_name, last_name, records } = request.payload;

    try {
        const newEmployee = new EmployeeModel({ employee_id, delegate_id });
        await newEmployee.save();

        const courseDoc = new Course({
            delegate_id,
            first_name,
            last_name,
            records: records || []
        });
        await courseDoc.save();

        return h.response({ message: 'Employee and course data saved successfully' }).code(201);

    } catch (err) {
        console.error(err);
        return h.response({ message: 'Failed to create employee with course data' }).code(500);
    }
};

const deleteEmployeeHandler = async (request, h) => {
    const { id } = request.params;
    console.log(id,"params")

    try {
        const deleted = await employeeService.deleteEmployee(id);

        if (!deleted) {
            return h.response({ message: 'Employee not found' }).code(404);
        }

        return h.response({ message: 'Employee deleted successfully' }).code(200);
    } catch (err) {
        console.error(err);
        return h.response({ message: 'Failed to delete employee' }).code(500);
    }
};

const updateEmployeeHandler = async (request, h) => {
    const { id } = request.params; // employee_id
    const { delegate_id, first_name, last_name, records } = request.payload;

    try {
        // 1. Update Employee
        const updatedEmployee = await EmployeeModel.findOneAndUpdate(
            { employee_id: id },
            { delegate_id },
        );

        if (!updatedEmployee) {
            return h.response({ message: 'Employee not found' }).code(404);
        }

        // 2. Update or create course data
        const updatedCourse = await Course.findOneAndUpdate(
            { delegate_id },
            {
                delegate_id,
                first_name,
                last_name,
                records: records || []
            },
        );

        return h.response({
            message: 'Employee and course data updated successfully',
            employee: updatedEmployee,
            course: updatedCourse
        }).code(200);

    } catch (err) {
        console.error(err);
        return h.response({ message: 'Failed to update employee' }).code(500);
    }
};



module.exports = {
    getAllEmployeesHandler,
    getEmployeeByIdHandler,
    createEmployeeHandler,
    deleteEmployeeHandler,
    updateEmployeeHandler
};
