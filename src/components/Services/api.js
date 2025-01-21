import axios from 'axios'
import { getToken } from './auth';
const API = axios.create({
  baseURL: 'http://127.0.0.1:5000/api'
});

// interceptor
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token){
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data);
export const getRecords = () => API.get('/records');
export const addRecords = (data) => API.post('/records', data);
export const deleteRecords = (id) => API.delete(`/records/${id}`); 
export const getAllUsers = () => API.get('/admin/users');