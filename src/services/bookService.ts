import axiosInstance from '../components/axiosInstance'; // централізована конфігурація

const API_URL = '/books';

export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    description: string;
    fileUrl: string;
    publication_year?: number;
}

// Отримати список книг
export const getBooks = async (filters?: {
    genre?: string;
    author?: string;
    query?: string;
}) => {
    const params = new URLSearchParams();
    if (filters?.genre) params.append('genre', filters.genre);
    if (filters?.author) params.append('author', filters.author);
    if (filters?.query) params.append('query', filters.query);

    const response = await axiosInstance.get(API_URL + (params.toString() ? `?${params}` : ''));
    return response.data;
};

// Отримати деталі книги за ID
export const getBookById = async (bookId: string) => {
    const response = await axiosInstance.get(`/books/${bookId}`);
    return response.data;
};

// Додати нову книгу (тільки для адміна)
export const createBook = async (bookData: {
    title: string;
    author: string;
    genre: string;
    description: string;
    fileUrl: string;
}) => {
    const response = await axiosInstance.post(API_URL, bookData);
    return response.data;
};

// Оновити книгу (тільки для адміна)
export const updateBook = async (id: string, bookData: Partial<Book>) => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, bookData);
    return response.data;
};

// Видалити книгу (тільки для адміна)
export const deleteBook = async (id: string) => {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
};

export const getRecommendedBooks = async (bookId: string) => {
    const response = await axiosInstance.get(`/books/recommendations/${bookId}`);
    return response.data;
};

