import React, { useEffect, useState } from 'react';
import { Book, getBooks, deleteBook, updateBook, createBook } from '../../services/bookService';
import BookCard from '../../components/BookCard';

const BooksTab: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [showModal, setShowModal] = useState(false);

    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        genre: '',
        description: '',
        file_url: 'https://cdn.jsdelivr.net/gh/vihnuuu/book-files@main/',
        publication_year: new Date().getFullYear(),
    });


    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        const data = await getBooks();
        setBooks(data);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        await deleteBook(id);
        setBooks(prev => prev.filter(book => book.id !== id));
    };

    const handleEdit = async (id: string) => {
        const bookToEdit = books.find(b => b.id === id);
        if (!bookToEdit) return;

        const newTitle = prompt('New title:', bookToEdit.title);
        const newAuthor = prompt('New author:', bookToEdit.author);
        const newGenre = prompt('New genre:', bookToEdit.genre);
        const newDescription = prompt('New description:', bookToEdit.description);

        if (!newTitle || !newAuthor || !newGenre || !newDescription) return;

        try {
            await updateBook(id, {
                title: newTitle,
                author: newAuthor,
                genre: newGenre,
                description: newDescription,
            });

            await loadBooks();
        } catch (error) {
            console.error('Error updating book:', error);
            alert('Failed to update book');
        }
    };

    const handleCreateBook = async () => {
        try {
            await createBook(newBook);
            await loadBooks();
            setShowModal(false);
            setNewBook({
                title: '',
                author: '',
                genre: '',
                description: '',
                file_url: '',
                publication_year: new Date().getFullYear(),
            });
        } catch (error) {
            console.error('Error creating book:', error);
            alert('Failed to create book');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <button
                onClick={() => setShowModal(true)}
                style={{
                    marginBottom: '1rem',
                    padding: '0.6rem 1.2rem',
                    backgroundColor: 'var(--button-bg)',
                    color: 'var(--button-text)',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Додати книгу
            </button>

            <div className="books-container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {books.map(book => (
                    <BookCard
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        genre={book.genre}
                        description={book.description}
                        isAdmin
                        onDelete={() => handleDelete(book.id)}
                        onEdit={() => handleEdit(book.id)}
                    />
                ))}
            </div>

            {/* Create Book Modal */}
            {showModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalStyle}>
                        <h2>Додати нову книгу</h2>
                        <input
                            placeholder="Назва"
                            value={newBook.title}
                            onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                            style={inputStyle}
                        />
                        <input
                            placeholder="Автор"
                            value={newBook.author}
                            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
                            style={inputStyle}
                        />
                        <input
                            placeholder="Жанр"
                            value={newBook.genre}
                            onChange={e => setNewBook({ ...newBook, genre: e.target.value })}
                            style={inputStyle}
                        />
                        <input
                            type="number"
                            placeholder="Рік публікації"
                            value={newBook.publication_year}
                            min="1000"
                            max={new Date().getFullYear()}
                            onChange={e => setNewBook({ ...newBook, publication_year: Number(e.target.value) })}
                            style={inputStyle}
                        />

                        <textarea
                            placeholder="Опис"
                            value={newBook.description}
                            onChange={e => setNewBook({ ...newBook, description: e.target.value })}
                            style={{ ...inputStyle, height: '80px' }}
                        />
                        <input
                            placeholder="Посилання на файл (fileUrl)"
                            value={newBook. file_url}
                            onChange={e => setNewBook({ ...newBook,  file_url: e.target.value })}
                            style={inputStyle}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                            <button onClick={handleCreateBook} style={buttonStyle}>Створити</button>
                            <button onClick={() => setShowModal(false)} style={{ ...buttonStyle, backgroundColor: 'var(--button-bg)'}}>
                                Скасувати
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Styles
const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
    backgroundColor: 'var(--button-bg)',
    padding: '2rem',
    borderRadius: '8px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
};

const inputStyle: React.CSSProperties = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor:'white',
    color: 'var(--button-text)'
};

const buttonStyle: React.CSSProperties = {
    padding: '0.6rem 1.2rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'var(--button-bg)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background 0.3s',
};

export default BooksTab;
