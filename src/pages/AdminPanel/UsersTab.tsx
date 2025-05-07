import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/userService';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

const UsersTab: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getAllUsers()
            .then(setUsers)
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>All Users</h2>
            <div style={styles.grid}>
                {users.map(user => (
                    <div key={user.id} style={styles.card}>
                        <h3 style={styles.name}>{user.name}</h3>
                        <p style={styles.info}><strong>Email:</strong> {user.email}</p>
                        <p style={styles.role}>
                            <strong>Role:</strong>{' '}
                            <span style={{
                                color: user.role === 'admin' ? 'var(--accent-color)' : 'var(--text-secondary)',
                                fontWeight: 600
                            }}>
                                {user.role}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '2rem',
    },
    header: {
        fontSize: '1.8rem',
        marginBottom: '1.5rem',
        color: 'var(--text-primary)',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '10px',
        padding: '1.25rem',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s',
    },
    name: {
        margin: '0 0 0.5rem 0',
        fontSize: '1.2rem',
        color: 'var(--text-primary)',
    },
    info: {
        margin: '0.2rem 0',
        color: 'var(--text-secondary)',
        fontSize: '0.95rem',
    },
    role: {
        marginTop: '0.5rem',
        fontSize: '0.95rem',
    },
};

export default UsersTab;
