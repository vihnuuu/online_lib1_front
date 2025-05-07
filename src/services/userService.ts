import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

// Отримати всіх користувачів
export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

