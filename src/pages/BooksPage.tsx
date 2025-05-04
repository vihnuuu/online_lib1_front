import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/bookService';
import BookList from '../components/BookList';
import BookFilters from '../components/BookFilters';
import { Link } from 'react-router-dom';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Отримуємо роль користувача з localStorage
    const userRole = localStorage.getItem('userRole');
    const isAdmin = userRole === 'admin';

    const fetchBooks = async (filters = {}) => {
        setLoading(true);
        const data = await getBooks(filters);
        setBooks(data);
        setLoading(false);
    };

    useEffect(() => {
        void fetchBooks();
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.wrapper}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Бібліотека книг</h1>
                    {isAdmin && (
                        <Link to="/books/new" style={styles.addButton}>
                            Додати книгу
                        </Link>
                    )}
                </div>

                <div style={styles.filters}>
                    <BookFilters onFilterChange={fetchBooks} />
                </div>

                {loading ? (
                    <p style={styles.loader}>Завантаження книг...</p>
                ) : (
                    <BookList books={books} />
                )}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    page: {
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    wrapper: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid #ccc',
        paddingBottom: '0.5rem',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        margin: 0,
    },
    filters: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '1rem',
    },
    addButton: {
        backgroundColor: '#444',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1rem',
        transition: 'background-color 0.3s',
    },
    loader: {
        textAlign: 'center',
        fontSize: '1.2rem',
        fontStyle: 'italic',
    },
};

export default BooksPage;
