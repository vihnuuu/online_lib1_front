import React, { useEffect, useState } from 'react';
import { Book, getBooks, deleteBook, updateBook } from '../../services/bookService';
import BookCard from '../../components/BookCard';

const BooksTab: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getBooks().then(setBooks);
    }, []);

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

            // Після успішного оновлення, оновлюємо стан
            setBooks(prev =>
                prev.map(book =>
                    book.id === id
                        ? { ...book, title: newTitle, author: newAuthor, genre: newGenre, description: newDescription }
                        : book
                )
            );
        } catch (error) {
            console.error('Помилка при оновленні книги:', error);
            alert('Не вдалося оновити книгу');
        }
    };

    return (
        <div>
            <h2>All Books</h2>
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
        </div>
    );
};

export default BooksTab;
