import axios from 'axios';

const api = axios.create({
    baseURL:  'https://dwallet-backend.herokuapp.com',
});

export default api;