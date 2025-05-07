import React, { useState } from 'react';
import BooksTab from './BooksTab';
import UsersTab from './UsersTab';
import './AdminPanel.css'; // не забудь створити або імпортувати стилі

const AdminPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'books' | 'users'>('books');

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>

            <div className="tabs">
                <button
                    className={activeTab === 'books' ? 'active' : ''}
                    onClick={() => setActiveTab('books')}
                >
                    Books
                </button>
                <button
                    className={activeTab === 'users' ? 'active' : ''}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'books' && <BooksTab />}
                {activeTab === 'users' && <UsersTab />}
            </div>
        </div>
    );
};

export default AdminPanel;
