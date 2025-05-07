import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';


const RegisterPage = () => {
    useTheme();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
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

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            setError('Invalid email format');
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/users/register', formData);
            setSuccess('Registration successful! Redirecting...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Error during registration';
            setError(msg);
        }
    };


    return (
        <div className="login-page">
        <div className="card login-card" >
            <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
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
                <button type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <p>Already have an account?<a href="/login" style={{ marginLeft: '0.5rem' }}>Log in</a></p>
            </div>
        </div>
        </div>
    );
};

export default RegisterPage;
