import axios from 'axios';

const API_BASE = `${import.meta.env.VITE_API_URL}/employees`;

export const getEmployees = () => axios.get(API_BASE);
export const getEmployeeById = (id) => axios.get(`${API_BASE}/${id}`);
export const createEmployee = (data) => axios.post(API_BASE, data);
export const updateEmployee = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`${API_BASE}/${id}`);
