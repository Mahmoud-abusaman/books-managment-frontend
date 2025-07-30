import axios from 'axios';

const token = localStorage.getItem('authToken');


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export default axiosInstance;