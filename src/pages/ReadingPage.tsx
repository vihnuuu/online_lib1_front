import React, { useEffect, useState } from 'react';
import { getBookDetails } from '../services/bookService';
import { useParams } from 'react-router-dom';
import { updateReadingProgress } from '../services/readingService';
import './ReadingPage.css';

const ReadingPage = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState<any>(null);
    const [page, setPage] = useState(0); // Початковий номер сторінки
    const [progress, setProgress] = useState(0); // Прогрес читання (відсотки)

    useEffect(() => {
        const fetchBook = async () => {
            const bookData = await getBookDetails(bookId);
            setBook(bookData);
        };

        fetchBook();
    }, [bookId]);

    useEffect(() => {
        const savedProgress = localStorage.getItem(`progress-${bookId}`);
        if (savedProgress) {
            setPage(parseInt(savedProgress));
            setProgress(Math.round((page / book?.totalPages) * 100));
        }
    }, [bookId, page]);

    const handleNextPage = () => {
        if (page < book.totalPages - 1) {
            const newPage = page + 1;
            setPage(newPage);
            setProgress(Math.round((newPage / book.totalPages) * 100));

            // Збереження прогресу
            localStorage.setItem(`progress-${bookId}`, newPage.toString());

            // Оновлення через сервіс
            updateReadingProgress(bookId, newPage);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            const newPage = page - 1;
            setPage(newPage);
            setProgress(Math.round((newPage / book.totalPages) * 100));

            // Збереження прогресу
            localStorage.setItem(`progress-${bookId}`, newPage.toString());

            // Оновлення через сервіс
            updateReadingProgress(bookId, newPage);
        }
    };

    if (!book) return <div>Завантаження...</div>;

    return (
        <div className="reading-page">
            <h1>{book.title}</h1>
            <p>Автор: {book.author}</p>
            <p>{book.description}</p>

            <div className="reading-controls">
                <button onClick={handlePreviousPage} disabled={page === 0}>Попередня сторінка</button>
                <span>Сторінка {page + 1} з {book.totalPages}</span>
                <button onClick={handleNextPage} disabled={page === book.totalPages - 1}>Наступна сторінка</button>
            </div>

            <div className="reading-progress">
                <p>Прогрес читання: {progress}%</p>
            </div>
        </div>
    );
};

export default ReadingPage;
