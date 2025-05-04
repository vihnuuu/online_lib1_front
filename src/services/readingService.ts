import axiosInstance from '../components/axiosInstance'; // централізована конфігурація

export const updateReadingProgress = async (bookId: string, page: number) => {
    await axiosInstance.put(`/reading-progress/${bookId}`, {
        current_page: page,
    });
};
