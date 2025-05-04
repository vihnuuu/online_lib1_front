import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface BookFiltersProps {
    onFilterChange: (filters: { genre?: string; author?: string; query?: string }) => void;
}

const BookFilters: React.FC<BookFiltersProps> = ({ onFilterChange }) => {
    const [field, setField] = useState(''); // Default to no specific field filter
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('handleSubmit викликано');
        console.log('field:', field, 'query:', query);
        const filters: { [key: string]: string } = {};

        if (field === 'genre') {
            filters.genre = query;
        } else if (field === 'author') {
            filters.author = query;
        } else if (query) {
            filters.query = query;
        }

        console.log('filters:', filters);
        onFilterChange(filters);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                style={styles.select}
            >
                <option value="">Усі поля</option>
                <option value="genre">Жанр</option>
                <option value="author">Автор</option>
            </select>

            <input
                type="text"
                placeholder="Пошук"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={styles.input}
            />

            <button type="submit" style={styles.button}>
                <SearchIcon />
            </button>
        </form>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    form: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    select: {
        padding: '0.5rem',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
    },
    input: {
        padding: '0.5rem',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        minWidth: '200px',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        borderRadius: '6px',
        backgroundColor: '#d6cbb9',
        border: 'none',
        cursor: 'pointer',
    },
};

export default BookFilters;