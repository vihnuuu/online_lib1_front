import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import BookDetailsPage from './pages/BookDetailsPage';
import UploadPage from './pages/UploadPage';
import AboutUsPage from './pages/AboutUsPage';
import MyProgressPage from './pages/MyProgressPage';
import ContactUsPage from './pages/ContactUsPage';
import RequireAuth from './components/RequireAuth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel/AdminPanel';



const App: React.FC = () => {
    return (
        <Router>
            <Navbar /> {/* Відображається na vseh stranitsah */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/books/:id" element={<BookDetailsPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactUsPage />} />

                <Route path="/reading-progress" element={
                    <RequireAuth roles={['user', 'admin']}>
                        <MyProgressPage />
                    </RequireAuth>
                } />

                {/* Захищений маршрут */}
                <Route path="/upload" element={
                    <RequireAuth roles={['admin']}>
                        <UploadPage />
                    </RequireAuth>
                } />
                <Route
                    path="/admin"
                    element={
                        <RequireAuth roles={['admin']}>
                            <AdminPanel />
                        </RequireAuth>
                    }
                />


            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
