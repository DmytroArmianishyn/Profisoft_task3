import axios from 'axios';

const axiosInstance = axios.create({

    baseURL: 'http://localhost:8000', // Change the port if your backend server is running on a different port
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosInstance;
