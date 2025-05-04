import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/bookService';

interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    description: string;
    publication_year?: number;
}

const BookDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (id) {
            getBookById(id).then(setBook);
        }
    }, [id]);

    if (!book) return <div>Завантаження...</div>;

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>{book.title}</h1>
                <p style={styles.meta}>
                    <strong>Автор:</strong> {book.author} <br />
                    <strong>Жанр:</strong> {book.genre} <br />
                    {book.publication_year && (
                        <>
                            <strong>Рік публікації:</strong> {book.publication_year}
                        </>
                    )}
                </p>
                <p style={styles.description}>{book.description}</p>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    page: {
        minHeight: '100vh',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    container: {
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: '2.2rem',
        marginBottom: '1rem',
    },
    meta: {
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '1rem',
    },
    description: {
        fontSize: '1.1rem',
        lineHeight: '1.8',
    }
};

export default BookDetailsPage;
