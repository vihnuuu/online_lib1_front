import { useEffect, useState } from 'react';
import { getReadingProgressByUser } from '../services/readingService';
import { getBookById } from '../services/bookService';
import { useTheme } from '../hooks/useTheme';
import { useNavigate, useLocation } from 'react-router-dom';
import './MyProgressPage.css';

interface ProgressEntry {
    id: string;
    book_id: string;
    current_page_cfi: string;
    percentage_read: number;
    updated_at: string;
    bookTitle?: string;
    is_finished?: boolean;
}

const MyProgressPage = () => {
    useTheme();
    const navigate = useNavigate();
    const [progress, setProgress] = useState<ProgressEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();


    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                if (!userId) return;

                const entries = await getReadingProgressByUser(userId);

                const withBookTitles = await Promise.all(
                    entries.map(async (entry: ProgressEntry) => {
                        try {
                            const book = await getBookById(entry.book_id);
                            return { ...entry, bookTitle: book.title };
                        } catch {
                            return { ...entry, bookTitle: 'Невідома книга' };
                        }
                    })
                );

                setProgress(withBookTitles);
            } catch (error) {
                console.error('Помилка при отриманні прогресу:', error);
            } finally {
                setLoading(false);
            }
        };

        void fetchProgress();
    }, [userId, location.key]);

    return (
        <div className="my-progress-page">
            {loading ? (
                <p>Завантаження...</p>
            ) : progress.length === 0 ? (
                <p>У вас ще немає записів про прогрес читання.</p>
            ) : (
                <>
                    {/* Незавершені книги */}
                    <div className="progress-list">
                        <h2>Активні книги</h2>
                        {progress
                            .filter((entry) => !entry.is_finished)
                            .map((entry) => (
                                <div key={entry.id} className="progress-card">
                                    <h3>{entry.bookTitle}</h3>
                                    <p>Прочитано: {entry.percentage_read}%</p>
                                    <p>Оновлено: {new Date(entry.updated_at).toLocaleString()}</p>

                                    <button
                                        className="continue-button"
                                        onClick={() =>
                                            navigate(`/read/${entry.book_id}`, {
                                                state: { fromProgress: true },
                                            })
                                        }
                                    >
                                        Продовжити читання
                                    </button>
                                </div>
                            ))}
                    </div>

                    {/* Завершені книги */}
                    <div className="progress-list" style={{ marginTop: '2rem' }}>
                        <h2>Завершені книги</h2>
                        {progress
                            .filter((entry) => entry.is_finished)
                            .map((entry) => (
                                <div key={entry.id} className="progress-card">
                                    <h3>{entry.bookTitle}</h3>
                                    <p>Прочитано: {entry.percentage_read}%</p>
                                    <p>Оновлено: {new Date(entry.updated_at).toLocaleString()}</p>
                                    <p style={{ color: 'green', fontWeight: 'bold' }}>Завершено</p>

                                    <button
                                        className="continue-button"
                                        onClick={() =>
                                            navigate(`/read/${entry.book_id}`, {
                                                state: { fromProgress: true },
                                            })
                                        }
                                    >
                                        Переглянути
                                    </button>
                                </div>
                            ))}
                    </div>
                </>
            )}
        </div>
    );

};

export default MyProgressPage;
