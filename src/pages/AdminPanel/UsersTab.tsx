import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, updateUser } from '../../services/userService';

interface Role {
    id: string;
    name: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: Role | null;
}

const UsersTab: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [editData, setEditData] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
            alert('Не вдалося завантажити користувачів');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Ви впевнені, що хочете видалити цього користувача?')) return;
        try {
            await deleteUser(id);
            setUsers(prev => prev.filter(user => user.id !== id));
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Не вдалося видалити користувача');
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setEditData({ name: user.name, email: user.email, password: '' });
    };

    const handleSave = async () => {
        if (!editingUser) return;
        try {
            await updateUser(editingUser.id, editData);
            await fetchUsers();
            setEditingUser(null);
            setEditData({ name: '', email: '', password: '' });
        } catch (err) {
            console.error('Error updating user:', err);
            alert('Не вдалося оновити користувача');
        }
    };

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
                                color: user.role?.name === 'admin' ? 'var(--accent-color)' : 'var(--text-secondary)',
                                fontWeight: 600
                            }}>
                {user.role?.name || '—'}
              </span>
                        </p>
                        <div style={styles.buttonGroup}>
                            <button onClick={() => handleEdit(user)} style={styles.button}>Редагувати</button>
                            <button onClick={() => handleDelete(user.id)} style={{ ...styles.button, backgroundColor: '#e74c3c' }}>
                                Видалити
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Модалка редагування */}
            {editingUser && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h3>Редагування користувача</h3>
                        <label>
                            Ім'я:
                            <input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} />
                        </label>
                        <label>
                            Email:
                            <input value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} />
                        </label>
                        <label>
                            Новий пароль:
                            <input type="password" value={editData.password} onChange={e => setEditData({ ...editData, password: e.target.value })} />
                        </label>
                        <div style={styles.buttonGroup}>
                            <button onClick={handleSave} style={styles.button}>Зберегти</button>
                            <button onClick={() => setEditingUser(null)} style={{ ...styles.button, backgroundColor: '#ccc' }}>Скасувати</button>
                        </div>
                    </div>
                </div>
            )}
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
    buttonGroup: {
        display: 'flex',
        gap: '0.5rem',
        marginTop: '1rem',
    },
    button: {
        padding: '0.4rem 0.8rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: 'var(--button-bg)',
        color: 'var(--button-text)',
        fontSize: '0.9rem',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
};

export default UsersTab;
