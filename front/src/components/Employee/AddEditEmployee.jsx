import React, { useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    Space,
    DatePicker,
    Divider,
    message,
} from 'antd';
import {
    MinusCircleOutlined,
    PlusOutlined,
    EditOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import {createEmployee, updateEmployee} from "../../api/employeeApi.js";

const AddEmployeeForm = ({ initialValues = null }) => {
    const [form] = Form.useForm();
    const isEdit = !!initialValues;


    useEffect(() => {
        if (initialValues) {
            console.log(initialValues,"yup");
            const transformed = {
                ...initialValues,
                records: initialValues.records?.map((r) => ({
                    ...r,
                    completed_on: r.completed_on ? dayjs(r.completed_on) : null,
                    valid_from: r.valid_from ? dayjs(r.valid_from) : null,
                    valid_until: r.valid_until ? dayjs(r.valid_until) : null,
                })) || [],
            };
            form.setFieldsValue(transformed);
        } else{
            form.resetFields();
        }
    }, [initialValues, form]);

    const onFinish = async (values) => {
        const payload = {
            ...values,
            records: values.records?.map((r) => ({
                ...r,
                completed_on: r.completed_on?.toISOString(),
                valid_from: r.valid_from?.toISOString(),
                valid_until: r.valid_until?.toISOString(),
            })),
        };

        try {
            if (isEdit) {
                await updateEmployee(initialValues.employee_id, payload);
                message.success('Employee updated successfully');

            } else {
                await createEmployee(payload);
                message.success('Employee created successfully');
                form.resetFields();
            }
            await onFinishProp(values);
        } catch (err) {
            console.error(err);
            message.error('Failed to save employee');
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                name="employee_id"
                label="Employee ID"
                rules={[{ required: true }]}
            >
                <Input disabled={isEdit} />
            </Form.Item>

            <Form.Item
                name="delegate_id"
                label="Delegate ID"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="first_name"
                label="First Name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Divider orientation="left">Courses</Divider>

            <Form.List name="records">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space
                                key={key}
                                align="start"
                                style={{ display: 'flex', marginBottom: 8 }}
                                wrap
                            >
                                <Form.Item
                                    {...restField}
                                    name={[name, 'course_title']}
                                    rules={[{ required: true, message: 'Title required' }]}
                                >
                                    <Input placeholder="Course Title" />
                                </Form.Item>
                                <Form.Item {...restField} name={[name, 'course_code']}>
                                    <Input placeholder="Code" />
                                </Form.Item>
                                <Form.Item {...restField} name={[name, 'country']}>
                                    <Input placeholder="Country" />
                                </Form.Item>
                                <Form.Item {...restField} name={[name, 'training_provider']}>
                                    <Input placeholder="Provider" />
                                </Form.Item>
                                <Form.Item {...restField} name={[name, 'completed_on']}>
                                    <DatePicker placeholder="Completed On" />
                                </Form.Item>
                                <Form.Item {...restField} name={[name, 'valid_from']}>
                                    <DatePicker placeholder="Valid From" />
                                </Form.Item>
                                <Form.Item {...restField} name={[name, 'valid_until']}>
                                    <DatePicker placeholder="Valid Until" />
                                </Form.Item>
                                <Form.Item {...restField} name={[name, 'status']}>
                                    <Input placeholder="Status" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                                <EditOutlined />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                Add Course
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {isEdit ? 'Update Employee' : 'Save Employee'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddEmployeeForm;
