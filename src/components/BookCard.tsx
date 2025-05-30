import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

interface BookCardProps {
    id: string;
    title: string;
    author: string;
    genre: string;
    description: string;
    isAdmin?: boolean;
    onDelete?: () => void;
    onEdit?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
                                               id,
                                               title,
                                               author,
                                               genre,
                                               description,
                                               isAdmin = false,
                                               onDelete,
                                               onEdit,
                                           }) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const handleStartReading = async () => {
        if (!userId) return alert('Користувач не авторизований');

        try {
            // Спочатку пробуємо отримати прогрес
            const res = await axiosInstance.get(`/reading-progress/${userId}`);
            const existing = res.data.find((entry: any) => entry.book_id === id);

            if (existing) {
                // Якщо вже є прогрес → переходимо
                navigate(`/read/${id}`);
            } else {
                // Інакше створюємо новий
                await axiosInstance.post('/reading-progress', {
                    user_id: userId,
                    book_id: id,
                    current_page_cfi: '', // Пустая строка - корректное значение
                    percentage_read: 0,
                });
                navigate(`/read/${id}`);
            }
        } catch (error) {
            console.error('Не вдалося запустити читання:', error);
            alert('Помилка при запуску читання');
        }
    };

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>{title}</h2>
            <h4 style={styles.subtitle}>{author} • {genre}</h4>
            <p style={styles.description}>
                {description.length > 250
                    ? description.slice(0, 250) + '...'
                    : description}
            </p>

            <div style={styles.buttonContainer}>
                {isAdmin ? (
                    <>
                        <button onClick={onEdit} style={styles.button}>Edit</button>
                        <button onClick={onDelete} style={styles.button}>Delete</button>
                    </>
                ) : (
                    <>
                        <Link to={`/books/${id}`} style={styles.button}>
                            Переглянути
                        </Link>
                        {userId && (
                            <button onClick={handleStartReading} style={styles.button}>
                                Почати читання
                            </button>
                        )}
                    </>
                )}
            </div>

        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        backgroundColor: 'var(--card-bg)',
        color: 'var(--card-text)',
        border: '1px solid var(--card-border)',
        padding: '1rem',
        borderRadius: '8px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
    },
    title: {
        margin: 0,
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    subtitle: {
        margin: '0.5rem 0',
        fontWeight: 500,
        color: 'var(--card-subtitle)',
    },
    description: {
        fontSize: '0.95rem',
        flexGrow: 1,
    },
    buttonContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        marginTop: '1rem',
    },
    button: {
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--button-bg)',
        color: 'var(--button-text)',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration: 'none',
        textAlign: 'center',
        transition: 'background-color 0.3s, color 0.3s',
    },
};

export default BookCard;
