import React, { useEffect, useState } from 'react';
import {Table, Button, Modal, message, Popconfirm, Space} from 'antd';
import { getEmployees, createEmployee, deleteEmployee } from '../../api/employeeApi.js';
import AddEditEmployee from "./AddEditEmployee.jsx";
// import EmployeeForm from '../components/EmployeeForm';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const fetchEmployees = async () => {
        const { data } = await getEmployees();
        setEmployees(data);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchEmployees();
    }, []);

    const handleAdd = async (values) => {
        setLoading(true);
        try {
            await createEmployee(values);
            message.success('Employee added');
            setOpen(false);
            fetchEmployees();
        } catch (err) {
            message.error('Failed to add employee');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            message.success('Employee deleted');
            fetchEmployees();
        } catch (err) {
            message.error('Delete failed');
        }
    };

    const columns = [
        { title: 'Employee ID', dataIndex: 'employee_id' },
        { title: 'Delegate ID', dataIndex: 'delegate_id' },
        { title: 'First Name', dataIndex: 'first_name' },
        {title: 'Last Name', dataIndex: 'last_name' },
        {
            title: 'Courses',
            dataIndex: 'total_courses'
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Popconfirm title="Confirm delete?" onConfirm={() => handleDelete(record._id)}>
                        <Button danger size="small">Delete</Button>
                    </Popconfirm>
                    <Button size="small" onClick={() => {
                        setSelectedEmployee(record);
                        setOpen(true);
                    }}>
                        Edit
                    </Button>
                </Space>

            )
        }
    ];

    return (
        <div style={{margin:'20px'}}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <Button type="primary" onClick={() => {
                    setOpen(true);
                    setSelectedEmployee(null);
                }}>
                    Add Employee
                </Button>
            </div>

            {
                loading ? "Loading..." : (
                    <Table rowKey="_id" columns={columns} dataSource={employees} />
                )
            }


            <Modal open={open} onCancel={() => setOpen(false)} footer={null} title={selectedEmployee ? 'Edit Employee' : 'Add Employee'}>
                <AddEditEmployee initialValues={selectedEmployee} onFinish={handleAdd} loading={loading} />
            </Modal>
        </div>
    );
};

export default EmployeeList;
