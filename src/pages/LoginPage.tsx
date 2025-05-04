import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
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
            localStorage.setItem('accessToken', response.data.accessToken); // Save the access token
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => navigate('/'), 1500);
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Error during login';
            setError(msg);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Log In</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Log In</button>
            </form>
            {error && <p style={{ ...styles.message, color: 'red' }}>{error}</p>}
            {success && <p style={{ ...styles.message, color: 'green' }}>{success}</p>}
            <div style={styles.registerPrompt}>
                <p>Don't have an account?<a href="/signup" style={styles.registerLink}> Sign up</a></p>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: '600px',
        margin: '5rem auto',
        padding: '2.5rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-color)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontSize: '2.5rem',
        fontWeight: 'bold',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    input: {
        padding: '1rem',
        fontSize: '1.2rem',
        borderRadius: '6px',
        border: '1px solid #aaa',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    button: {
        padding: '1rem',
        fontSize: '1.2rem',
        backgroundColor: '#6a8caf',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    message: {
        marginTop: '1rem',
        textAlign: 'center',
        fontSize: '1rem',
    },
    registerPrompt: {
        marginTop: '1.5rem',
        textAlign: 'center',
    },
    registerLink: {
        color: '#6a8caf',
        textDecoration: 'none',
        fontWeight: 'bold',
    }
};

export default LoginPage;
