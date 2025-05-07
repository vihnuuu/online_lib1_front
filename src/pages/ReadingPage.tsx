import { useEffect, useState } from 'react';
import { getBookById } from '../services/bookService';
import { useParams } from 'react-router-dom';
import { updateReadingProgress } from '../services/readingService';
import './ReadingPage.css';

interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    totalPages: number;
}

const ReadingPage = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [page, setPage] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const fetchBook = async () => {
            if (bookId) {
                const bookData = await getBookById(bookId);
                setBook(bookData);
            }
        };

        fetchBook();
    }, [bookId]);

    useEffect(() => {
        if (!book || !book.totalPages) return;

        const savedProgress = localStorage.getItem(`progress-${bookId}`);
        if (savedProgress) {
            const savedPage = parseInt(savedProgress);
            setPage(savedPage);
            setProgress(Math.round((savedPage / book.totalPages) * 100));
        }
    }, [book, bookId]);

    const handleNextPage = () => {
        if (!book) return;
        if (page < book.totalPages - 1) {
            const newPage = page + 1;
            setPage(newPage);
            setProgress(Math.round((newPage / book.totalPages) * 100));
            localStorage.setItem(`progress-${bookId}`, newPage.toString());
            void updateReadingProgress(bookId!, newPage); // позбавляємось warning'у
        }
    };

    const handlePreviousPage = () => {
        if (!book) return;
        if (page > 0) {
            const newPage = page - 1;
            setPage(newPage);
            setProgress(Math.round((newPage / book.totalPages) * 100));
            localStorage.setItem(`progress-${bookId}`, newPage.toString());
            void updateReadingProgress(bookId!, newPage);
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
