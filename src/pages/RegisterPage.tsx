import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
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
        <div style={styles.container}>
            <h2 style={styles.title}>Sign Up</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
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
                <button type="submit" style={styles.button}>Sign Up</button>
            </form>
            {error && <p style={{ ...styles.message, color: 'red' }}>{error}</p>}
            {success && <p style={{ ...styles.message, color: 'green' }}>{success}</p>}
            <div style={styles.loginPrompt}>
                <p>Already have an account?<a href="/login" style={styles.loginLink}> Log in</a></p>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: '600px', // Increased width for a larger form
        margin: '5rem auto',
        padding: '2.5rem', // Added more padding for better spacing
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-color)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '1.5rem', // Added more margin
        fontSize: '2.5rem', // Increased font size for the title
        fontWeight: 'bold',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    input: {
        padding: '1rem', // Increased padding for inputs
        fontSize: '1.2rem', // Slightly larger text
        borderRadius: '6px',
        border: '1px solid #aaa',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    button: {
        padding: '1rem', // Larger button
        fontSize: '1.2rem',
        backgroundColor: '#6a8caf',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#557fa6',
    },
    message: {
        marginTop: '1rem',
        textAlign: 'center',
        fontSize: '1rem',
    },
    loginPrompt: {
        marginTop: '1.5rem',
        textAlign: 'center',
    },
    loginLink: {
        color: '#6a8caf',
        textDecoration: 'none',
        fontWeight: 'bold',
    }
};

export default RegisterPage;
