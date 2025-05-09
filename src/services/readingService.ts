import axiosInstance from '../components/axiosInstance';

// Створити новий запис про прогрес читання
export const createReadingProgress = async (data: {
    user_id: string;
    book_id: string;
    current_page_cfi: string;           // Замість current_page
    current_page_number?: number;        // Опціонально
    percentage_read: number;
}) => {
    const response = await axiosInstance.post('/reading-progress', data);
    return response.data;
};

// Отримати всі записи користувача
export const getReadingProgressByUser = async (userId: string) => {
    const response = await axiosInstance.get(`/reading-progress/${userId}`);
    return response.data;
};

// Оновити конкретний запис прогресу
export const updateReadingProgress = async (
    id: string,
    data: {
        current_page_cfi?: string;
        current_page_number?: number;
        percentage_read?: number;
    }
) => {
    const response = await axiosInstance.put(`/reading-progress/${id}`, data);
    return response.data;
};
