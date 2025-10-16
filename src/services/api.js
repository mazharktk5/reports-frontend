import axios from 'axios';

const API_URL = process.env.BACKEND_URL || 'http://localhost:3000';

export const register = (data) => axios.post(`${API_URL}/users/register`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

export const getMyReports = (token) => axios.get(`${API_URL}/reports/my`, {
    headers: { Authorization: `Bearer ${token}` }
});

export const getAllReports = (token) => axios.get(`${API_URL}/reports/all`, {
    headers: { Authorization: `Bearer ${token}` }
});

export const createReport = (token, data) => axios.post(`${API_URL}/reports/create`, data, {
    headers: { Authorization: `Bearer ${token}` }
});

export const editReport = (token, id, data) => axios.patch(`${API_URL}/reports/edit/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
});
