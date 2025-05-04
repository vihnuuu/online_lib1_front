import React from 'react';
import { Link } from 'react-router-dom'; // Для переходу між сторінками
import Slider from '../components/Slider';  // Компонент слайдера
import './HomePage.css';  // Стилі для головної сторінки

const HomePage: React.FC = () => {
    return (
        <div className="home-page">

            <section className="intro">
                <h1 className="intro-title">Ласкаво просимо до нашої бібліотеки</h1>
                <p className="intro-description">
                    Відкрийте світ книг і насолоджуйтесь кращими творами зі всього світу.
                </p>
                <Link to="/books" className="explore-button">Перейти до книг</Link>
            </section>

            <section className="slider-section">
                <h2 className="section-title">Наші найкращі книги</h2>
                <Slider />
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
