// src/components/Footer.tsx
import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>About the Library</h3>
                    <p>An online library for convenient reading and progress tracking.</p>
                </div>

                <div className="footer-section links">
                    <h3>Navigation</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/books">Books</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h3>Contact</h3>
                    <p>Email: support@library.com</p>
                    <p>Phone: +123 456 7890</p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-telegram"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                © {new Date().getFullYear()} KPI. Khniukalo.
            </div>
        </footer>
    );
};

export default Footer;
