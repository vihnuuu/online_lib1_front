// src/services/uploadService.ts
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axiosInstance from '../components/axiosInstance';

export const uploadBookFile = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `books/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
};

export const uploadAndCreateBook = async (
    file: File,
    bookMeta: {
        title: string;
        author: string;
        genre: string;
        description: string;
    }
) => {
    const fileUrl = await uploadBookFile(file);
    const response = await axiosInstance.post('/books', {
        ...bookMeta,
        fileUrl,
    });

    return response.data;
};
