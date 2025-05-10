import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface BookFiltersProps {
    onFilterChange: (filters: { genre?: string; author?: string; query?: string }) => void;
}

const BookFilters: React.FC<BookFiltersProps> = ({ onFilterChange }) => {
    const [field, setField] = useState('');
    const [query, setQuery] = useState('');

    const applyFilters = () => {
        const filters: { [key: string]: string } = {};
        const trimmedQuery = query.trim();

        if (field === 'genre' && trimmedQuery) {
            filters.genre = trimmedQuery;
        } else if (field === 'author' && trimmedQuery) {
            filters.author = trimmedQuery;
        } else if (trimmedQuery) {
            filters.query = trimmedQuery;
        }

        onFilterChange(filters);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyFilters();
        }
    };

    useEffect(() => {
        setQuery(''); // Очищаем поле при смене фильтра
        applyFilters();
    }, [field]);

    return (
        <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
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
                onChange={(e) => setQuery(e.target.value.trimStart())} // Удаляем пробелы в начале сразу
                onBlur={applyFilters}
                onKeyPress={handleKeyPress}
                style={styles.input}
            />

            <button
                type="button"
                style={styles.button}
                onClick={applyFilters}
            >
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
