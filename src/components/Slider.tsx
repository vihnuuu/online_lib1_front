import React from 'react';
import './Slider.css';  // Стилі для слайдера

const Slider: React.FC = () => {
    return (
        <div className="slider-container">
            <div className="slider-item">
                <img src="https://via.placeholder.com/1200x400/FF5733/fff?text=Book+1" alt="Book 1" />
                <p>Кращі книги року</p>
            </div>
            <div className="slider-item">
                <img src="https://www.mgpu.ru/wp-content/uploads/2018/01/books2.jpg" alt="Book 2" />
                <p>Читання цих бестселерів — ваша наступна пригода!</p>
            </div>
            <div className="slider-item">
                <img src="https://book24.ua/upload/iblock/2f2/2f24f0cec53d815748d86e363797138b.jpg" alt="Book 3" />
                <p>Нові книги для вашого списку</p>
            </div>
        </div>
    );
};

export default Slider;
