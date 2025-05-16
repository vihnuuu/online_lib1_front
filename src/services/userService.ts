import axiosInstance from '../components/axiosInstance';

const API_URL = '/users';

// Отримати всіх користувачів (тільки для admin)
export const getAllUsers = async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data;
};

// Отримати користувача за ID
export const getUserById = async (id: string) => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
};

// Оновити користувача
export const updateUser = async (id: string, userData: Partial<{
    name: string;
    email: string;
    role: string;
    password?: string;
}>) => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, userData);
    return response.data;
};

// Видалити користувача (тільки для admin)
export const deleteUser = async (id: string) => {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
};

// Скидання пароля (публічна дія)
export const resetPassword = async (email: string) => {
    const response = await axiosInstance.post(`${API_URL}/reset-password`, { email });
    return response.data;
};
