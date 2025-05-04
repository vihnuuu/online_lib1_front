import React from 'react';
import BookCard from './BookCard';

interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    description: string;
}

interface BookListProps {
    books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
    return (
        <div style={styles.grid}>
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    description={book.description}
                />
            ))}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem',
        width: '100%',
    },
};

export default BookList;
