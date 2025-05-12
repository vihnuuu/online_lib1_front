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
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBook = async () => {
            if (bookId) {
                try {
                    const bookData = await getBookById(bookId);
                    setBook(bookData);

                    const savedProgress = localStorage.getItem(`progress-${bookId}`);
                    const savedPage = savedProgress ? parseInt(savedProgress, 10) : 0;

                    setPage(savedPage);
                    setProgress(
                        bookData.totalPages > 0
                            ? Math.round((savedPage / bookData.totalPages) * 100)
                            : 0
                    );
                } catch (err) {
                    console.error('Failed to load book:', err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBook();
    }, [bookId]);

    const updatePage = (newPage: number) => {
        if (!book) return;
        setPage(newPage);
        const newProgress = Math.round((newPage / book.totalPages) * 100);
        setProgress(newProgress);
        localStorage.setItem(`progress-${bookId}`, newPage.toString());
        void updateReadingProgress(bookId!, newPage);
    };

    const handleNextPage = () => {
        if (book && page < book.totalPages - 1) {
            updatePage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (book && page > 0) {
            updatePage(page - 1);
        }
    };

    if (loading) return <div>Завантаження книги...</div>;
    if (!book) return <div>Книга не знайдена.</div>;

    return (
        <div className="reading-page">
            <h1>{book.title}</h1>
            <p>Автор: {book.author}</p>
            <p>{book.description}</p>

            <div className="reading-controls">
                <button onClick={handlePreviousPage} disabled={page === 0}>
                    Попередня сторінка
                </button>
                <span>Сторінка {page + 1} з {book.totalPages}</span>
                <button onClick={handleNextPage} disabled={page === book.totalPages - 1}>
                    Наступна сторінка
                </button>
            </div>

            <div className="reading-progress">
                <p>Прогрес читання: {progress}%</p>
            </div>
        </div>
    );
};

export default ReadingPage;
