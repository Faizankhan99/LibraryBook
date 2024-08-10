import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const login = (username, password) => {
    return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const getBooks = (token) => {
    return axios.get(`${API_URL}/books/home`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addBook = (token, bookData) => {
    return axios.post(`${API_URL}/books/addBook`, bookData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteBook = (token, bookName) => {
    return axios.delete(`${API_URL}/books/deleteBook`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { name: bookName }
    });
};
