import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import {jwtDecode} from 'jwt-decode';
import './login.css';

interface JwtPayload {
    role: string;
    sub: string; // це userId
}

const LoginPage: React.FC = () => {
    useTheme();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:3000/api/users/login', formData);
            const { accessToken, refreshToken } = response.data;

            const decoded = jwtDecode<JwtPayload>(accessToken);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('role', decoded.role);
            localStorage.setItem('userId', decoded.sub);

            setSuccess('Login successful! Redirecting...');
            setTimeout(() => navigate('/'), 1500);
        } catch (err: unknown) {
            const msg =
                axios.isAxiosError(err) && err.response?.data?.message
                    ? err.response.data.message
                    : 'Error during login';
            setError(msg);
        }
    };

    return (
        <div className="login-page">
            <div className="card login-card">
                <h2 style={{ textAlign: 'center' }}>Log In</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Log In</button>
                </form>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <p>Don't have an account?
                        <a href="/signup" style={{ marginLeft: '0.5rem' }}>Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
