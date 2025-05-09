import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/bookService';
import {
    createReadingProgress,
    getReadingProgressByUser,
    updateReadingProgress,
} from '../services/readingService';
import ePub, { Rendition, Location } from 'epubjs';

interface Book {
    id: string;
    title: string;
    author: string;
    file_url: string;
}

interface ReadingProgress {
    id: string;
    user_id: string;
    book_id: string;
    current_page_cfi: string;
    percentage_read: number;
    updated_at: string;
}

interface NavItem {
    href: string;
    label: string;
}

const ReadBookPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const userId = localStorage.getItem('userId')!;
    const [book, setBook] = useState<Book | null>(null);
    const [progressId, setProgressId] = useState<string | null>(null);
    const [currentLocation, setCurrentLocation] = useState<string | null>(null);
    const [toc, setToc] = useState<NavItem[]>([]);
    const [showToc, setShowToc] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fontSize, setFontSize] = useState(16);

    const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);


    const viewerRef = useRef<HTMLDivElement>(null);
    const renditionRef = useRef<Rendition | null>(null);


    const fetchBookData = useCallback(async () => {
        if (!id || !userId) return;
        const bookData = await getBookById(id);
        setBook(bookData);

        const progress: ReadingProgress[] = await getReadingProgressByUser(userId);
        const existing = progress.find((p) => p.book_id === id);

        if (existing) {
            setProgressId(existing.id);
            setCurrentLocation(existing.current_page_cfi);
        } else {
            const created = await createReadingProgress({
                user_id: userId,
                book_id: id,
                current_page_cfi: '',
                percentage_read: 0,
            });
            setProgressId(created.id);
        }
    }, [id, userId]);

    useEffect(() => {
        void fetchBookData();
    }, [fetchBookData]);

    useEffect(() => {
        if (!book || !viewerRef.current) return;

        const bookInstance = ePub(book.file_url);
        const rendition = bookInstance.renderTo(viewerRef.current, {
            width: '100%',
            height: '100%',
            flow: 'paginated',
            allowScriptedContent: true,
            manager: 'default',
        });

        rendition.themes.register('custom', {
            body: {
                'line-height': '1.6',
                'font-size': `${fontSize}px`,
                'padding': '0 2em',
                'max-width': '100%',
                'font-family': 'Georgia, serif',
                'color': 'var(--text-color)',
                'background': 'var(--bg-color)',
                'overflow-x': 'hidden',
            },
        });

        rendition.themes.select('custom');
        renditionRef.current = rendition;

        if (!currentLocation) {
            rendition.display();
        } else {
            rendition.display(currentLocation);
        }

        bookInstance.loaded.navigation.then(nav => setToc(nav.toc));

        let timeout: NodeJS.Timeout | null = null;

        rendition.on('relocated', async (location: Location) => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(async () => {
                const cfi = location.start.cfi;
                setCurrentLocation(cfi);

                if (progressId) {
                    await updateReadingProgress(progressId, {
                        current_page_cfi: cfi,
                        percentage_read: Math.round(location.start.percentage * 100),
                    });
                }
            }, 500);
        });


        return () => {
            rendition.destroy();
            bookInstance.destroy();
        };
    }, [book, fontSize]);

    const updateProgress = async () => {
        const location = renditionRef.current?.location;
        if (!location || !progressId) return;

        const cfi = location.start.cfi;
        const currentPage = location.start.displayed.page;
        const totalPages = location.start.displayed.total;

        await updateReadingProgress(progressId, {
            current_page_cfi: cfi,
            current_page_number: currentPage,
            percentage_read: Math.round((currentPage / totalPages) * 100),
        });

        setCurrentLocation(cfi);
        setCurrentPageNumber(currentPage);
    };


    const handleNext = async () => {
        await renditionRef.current?.next();
        await updateProgress();
    };

    const handlePrev = async () => {
        await renditionRef.current?.prev();
        await updateProgress();
    };


    const toggleFullscreen = () => {
        const elem = viewerRef.current;
        if (!elem) return;

        if (!isFullscreen) {
            if (elem.requestFullscreen) elem.requestFullscreen();
            else if ((elem as any).webkitRequestFullscreen) (elem as any).webkitRequestFullscreen();
            else if ((elem as any).msRequestFullscreen) (elem as any).msRequestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const exitHandler = () => setIsFullscreen(false);
        document.addEventListener('fullscreenchange', exitHandler);
        return () => document.removeEventListener('fullscreenchange', exitHandler);
    }, []);

    const increaseFontSize = () => {
        const newSize = Math.min(fontSize + 2, 40);
        setFontSize(newSize);
        renditionRef.current?.themes.override('font-size', `${newSize}px`);
    };

    const decreaseFontSize = () => {
        const newSize = Math.max(fontSize - 2, 10);
        setFontSize(newSize);
        renditionRef.current?.themes.override('font-size', `${newSize}px`);
    };

    if (!book) return <div>Downloading the book...</div>;

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-color)', color: 'var(--text-color)' }}>
            {showToc && (
                <aside style={{
                    width: '280px',
                    padding: '1rem',
                    overflowY: 'auto',
                    background: 'var(--card-bg)',
                    borderRight: '1px solid var(--card-border)',
                }}>
                    <h3>Content</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {toc.map((item, idx) => (
                            <li key={idx}>
                                <button
                                    onClick={() => renditionRef.current?.display(item.href)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.95rem',
                                        padding: '0.3rem 0',
                                        textAlign: 'left',
                                        color:'var(--text-color)'
                                    }}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setShowToc(false)}
                        style={styles.toggleButton}
                    >
                        Hide Content
                    </button>
                </aside>
            )}

            <main style={{
                flexGrow: 1,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h1>{book.title}</h1>
                <h3>{book.author}</h3>
                <p>Поточна сторінка: {currentPageNumber}</p>

                <div
                    ref={viewerRef}
                    onClick={(e) => {
                        const width = e.currentTarget.clientWidth;
                        if (e.clientX < width * 0.2) handlePrev();
                        else if (e.clientX > width * 0.8) handleNext();
                    }}
                    style={{
                        flexGrow: 1,
                        width: '100%',
                        maxWidth: isFullscreen ? '100%' : '800px',
                        border: '1px solid var(--card-border)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        height: isFullscreen ? '100vh' : 'calc(100vh - 300px)',
                        cursor: 'pointer',
                        background: 'var(--bg-color)',
                        color: 'var(--text-color)',
                    }}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    width: '100%',
                    maxWidth: '800px',
                    marginTop: '1rem'
                }}>
                    <button onClick={handlePrev} style={navButtonStyle}>Back</button>
                    <button onClick={toggleFullscreen} style={navButtonStyle}>
                        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    </button>
                    <button onClick={() => setShowToc(!showToc)} style={navButtonStyle}>
                        {showToc ? 'Hide Content' : 'Show Content'}
                    </button>
                    <button onClick={handleNext} style={navButtonStyle}>Forward</button>
                    <button onClick={increaseFontSize} style={navButtonStyle}>A+</button>
                    <button onClick={decreaseFontSize} style={navButtonStyle}>A-</button>
                </div>
            </main>
        </div>
    );
};

const navButtonStyle: React.CSSProperties = {
    background: 'var(--button-bg)',
    color: 'var(--button-text)',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
};

const styles = {
    toggleButton: {
        marginTop: '1rem',
        background: 'var(--button-bg)',
        color: 'var(--button-text)',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
};

export default ReadBookPage;
