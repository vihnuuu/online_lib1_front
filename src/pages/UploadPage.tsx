import React, { useState } from 'react';
import { uploadBookFile } from '../services/uploadService';
import { createBook } from '../services/bookService';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return alert('Оберіть файл книги');

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
            alert('Книга успішно додана!');
            navigate('/books');
        } catch (error) {
            console.error('Помилка при додаванні книги:', error);
            alert('Щось пішло не так. Спробуйте пізніше.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <h2 style={styles.title}>Додати нову книгу</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Назва книги"
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
                    placeholder="Опис книги"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={styles.textarea}
                />
                <input
                    type="file"
                    accept=".pdf,.epub"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Завантаження...' : 'Додати книгу'}
                </button>
            </form>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    page: {
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
        textAlign: 'center',
        marginBottom: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        padding: '0.75rem',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '0.75rem',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        resize: 'vertical',
        minHeight: '100px',
    },
    button: {
        padding: '0.75rem',
        fontSize: '1rem',
        borderRadius: '6px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
};

export default UploadPage;
