import axios from 'axios';

const BASE_URL = "http://localhost:5041"; // Замените на ваш базовый URL API

axios.defaults.withCredentials = true; // Включаем отправку Cookie с каждым запросом

export const fetchCategories = async () => {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
};

export const fetchProducts = async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
};

export const fetchCategoryById = async (id) => {
    const response = await axios.get(`${BASE_URL}/categories/${id}`);
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await axios.post(`${BASE_URL}/products`, product, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const createCategory = async (category) => {
    const response = await axios.post(`${BASE_URL}/categories`, category, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await axios.put(`${BASE_URL}/products/${id}`, product, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateCategory = async (id, category) => {
    const response = await axios.put(`${BASE_URL}/categories/${id}`, category, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axios.delete(`${BASE_URL}/products/${id}`);
    return response;
};

export const deleteCategory = async (id) => {
    const response = await axios.delete(`${BASE_URL}/categories/${id}`);
    return response;
};

export const login = async (email, password) => {
    const response = await axios.post(`${BASE_URL}/authorization/login`, { email, password }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const register = async (email, password) => {
    const response = await axios.post(`${BASE_URL}/authorization/register`, { email, password }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const logout = async () => {
    await axios.post(`${BASE_URL}/authorization/logout`);
};

export const fetchUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
};

export const addUser = async (user) => {
    const response = await axios.post(`${BASE_URL}/users`, user, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const blockUser = async (userId, isBlocked) => {
    const response = await axios.put(`${BASE_URL}/users/${userId}/block`, isBlocked, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await axios.delete(`${BASE_URL}/users/${userId}`);
    return response.data;
};

export const updateUser = async (userId, userData) => {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, userData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};
