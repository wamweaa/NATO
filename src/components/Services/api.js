import axios from 'axios'
import { getToken } from './auth';
import { Category } from '@mui/icons-material';
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
// Authentication
export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data);
// user Financial records
export const getRecords = () => API.get('/records');
export const addRecords = (data) => API.post('/records', data);
export const deleteRecords = (id) => API.delete(`/records/${id}`); 
export const fetchRecordsByCategory = (category) => 
  API.get(`/records?category=${encodeURIComponent(category)}`);

// Admin functions endpoints
export const getAllUsers = () => API.get('/admin/users');
export const adminAddRecord = (data) => API.post('/admin/records', data); // Add record for any user
export const adminUpdateRecord = (id, data) => API.put(`/admin/records/${id}`, data); // Update financial record
export const adminDeleteRecord = (id) => API.delete(`/admin/records/${id}`); // Delete financial record
export const getGraphData = () => API.get('/graph-data'); // Get graph data
export const getUserDetails = () => API.get('/user/details'); // Fetch user details