import axios from 'axios'

const API = axios.create({
  baseURL: 'http://127.0.0.1:5000/api'
});

export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data);
export const getRecords = () => API.get('/records');
export const addRecords = (data) => API.post('/records', data);
export const deleteRecords = (id) => API.delete('/records/${id}'); 
export const getAllUsers = () => API.get('/admin/users');