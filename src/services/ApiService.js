import axios from 'axios';

export default class ApiService {
    constructor() {
        axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('JWTToken')}`;
    }

    register(data) {
        return axios.post('register', {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.passwordConfirmation,
        });
    }

    login(data) {
        const { email, password } = data;
        return axios.post('login', { email, password })
            .then( response => {
                localStorage.setItem('JWTToken', response.data.access_token);
                axios.defaults.headers.common['Authorization'] = `bearer ${localStorage.getItem('JWTToken')}`;
            });
    }

    logout() {
        return axios.post('logout');
    }

    getItems() {
        return axios.get('todo');
    }

    getAllItems() {
        return axios.get('indexPublic');
    }

    getUser() {
        return  axios.post('me');
    }

    add(data) {
        return axios.post('todo',  { 
            title: data.title,
            content: data.content,
            priority: 1,
            is_done: 0
        });
    }

    edit(id, data) {
        return axios.put(`todo/${id}`, data);
    }

    delete(id) {
        return axios.delete(`todo/${id}`);
    }
}

export const apiService = new ApiService();