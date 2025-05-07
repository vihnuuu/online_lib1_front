import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <section className="intro split-layout">
                <div className="left-panel">
                    <h1 className="intro-title">Welcome to our е-library</h1>
                    <p className="intro-description">
                        Discover the world of books and enjoy the best works from around the world.
                    </p>
                    <div className="short-links">
                        <Link to="/about" className="link-button">about us</Link>
                        <p className="small-info">Learn more about our mission and values</p>
                    </div>
                </div>
                <div className="right-panel intro-image"></div>
            </section>

            <section className="features">
                <div className="feature-card">
                    <h3>Швидкий доступ</h3>
                    <p>Миттєво знаходьте потрібні книги завдяки зручному пошуку та фільтрам.</p>
                </div>
                <div className="feature-card">
                    <h3>Сучасний дизайн</h3>
                    <p>Наша платформа створена з думкою про комфорт користувача.</p>
                </div>
                <div className="feature-card">
                    <h3>Підтримка жанрів</h3>
                    <p>Оберіть книгу за жанром: від фентезі до психології.</p>
                </div>
            </section>

            <section className="about-us">
                <h2 className="section-title">Про нас</h2>
                <p className="about-us-description">
                    Ми — команда, що вірить у силу книг. Наша мета — забезпечити вам легкий доступ до найкращих літературних творів.
                </p>
            </section>
        </div>
    );
};

export default HomePage;
