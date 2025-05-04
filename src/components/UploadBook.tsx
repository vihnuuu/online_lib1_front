// src/components/UploadBook.tsx
import React, { useState } from 'react';
import { uploadBookFile } from '../services/uploadService'; // сервіс для upload
import { createBook } from '../services/bookService'; // API для збереження метаданих

const UploadBook: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return alert("Оберіть файл!");

        try {
            setLoading(true);

            const fileUrl = await uploadBookFile(file);

            const newBook = {
                title,
                author,
                genre,
                description,
                fileUrl,
            };

            await createBook(newBook);
            alert("Книгу успішно додано!");

            // Очистити поля
            setTitle('');
            setAuthor('');
            setGenre('');
            setDescription('');
            setFile(null);
        } catch (err) {
            console.error("Помилка при додаванні книги:", err);
            alert("Помилка при завантаженні.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Завантажити нову книгу</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Назва"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Автор"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Жанр"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                    style={styles.input}
                />
                <textarea
                    placeholder="Опис"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={styles.textarea}
                />
                <input
                    type="file"
                    accept=".epub,.pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required
                    style={styles.fileInput}
                />
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Завантаження...' : 'Завантажити'}
                </button>
            </form>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--card-text)',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        minHeight: '100px',
    },
    fileInput: {
        padding: '0.5rem',
    },
    button: {
        padding: '0.75rem',
        backgroundColor: '#557fa6',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default UploadBook;
