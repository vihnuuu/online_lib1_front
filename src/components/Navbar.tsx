import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { WbSunny, NightsStay } from "@mui/icons-material"; // Іконки для темної та світлої теми
import "./Navbar.css"; // Стилі для Navbar

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <h2>Library</h2>
            </div>
            <div className="menu">
                <ul>
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/books" className="nav-link">Books</Link></li>

                    {/* Якщо користувач не авторизований */}
                    {!token && (
                        <>
                            <li><Link to="/signup" className="nav-link">Sign Up</Link></li>
                            <li><Link to="/login" className="nav-link">Login</Link></li>
                        </>
                    )}

                    {/* Якщо користувач авторизований */}
                    {token && (
                        <>
                            <li><Link to="/reading-progress" className="nav-link">My Progress</Link></li>
                            <li><button onClick={handleLogout} className="nav-link logout-button">Logout</button></li>
                        </>
                    )}

                    <li><Link to="/about" className="nav-link">About Us</Link></li>
                    <li><Link to="/contact" className="nav-link">Contact</Link></li>
                </ul>

                {/* Кнопка для перемикання теми */}
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "dark" ? <WbSunny /> : <NightsStay />}
                    Theme: {theme === "dark" ? "Dark" : "Light"}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
