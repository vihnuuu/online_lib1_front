import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { WbSunny, NightsStay } from "@mui/icons-material";
import "./Navbar.css";

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role"); // ✅ отримуємо роль

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role"); // можна очищати й роль
        localStorage.removeItem("userId"); // якщо використовуєш
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <h2><Link to="/" className="nav-logo">Library</Link></h2>
            </div>
            <div className="menu">
                <ul>
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/books" className="nav-link">Books</Link></li>

                    {!token && (
                        <li><Link to="/login" className="nav-link">Login</Link></li>
                    )}

                    {token && (
                        <>
                            <li><Link to="/reading-progress" className="nav-link">My Progress</Link></li>
                            {role === 'admin' && (
                                <li><Link to="/admin" className="nav-link">Admin</Link></li>
                            )}
                            <li>
                                <span onClick={handleLogout} className="nav-link logout-button" role="button" tabIndex={0}>
                                    Logout
                                </span>
                            </li>
                        </>
                    )}

                    <li><Link to="/about" className="nav-link">About Us</Link></li>
                    <li><Link to="/contact" className="nav-link">Contact</Link></li>
                </ul>

                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "dark" ? <WbSunny /> : <NightsStay />}
                    Theme: {theme === "dark" ? "Dark" : "Light"}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
