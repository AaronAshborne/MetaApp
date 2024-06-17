import React, { useState } from 'react';
import './LoginSignup.css';
import logoImage from '../Assets/a simple logo with white background of infinity shape in green theme.png'; // Adjust the path as needed


const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setName('');
        setEmail('');
        setPassword('');
        setMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'http://localhost:8080/api/login' : 'http://localhost:8080/api/signup';
        const formData = { email, password };
        if (!isLogin) formData.name = name;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(result.message);
            } else {
                setMessage(result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container">
            <div className="form-image-container">
                <div className="image-container">
                    <img src={logoImage} alt="Description" />
                </div>
            </div>
                <div className="form-container">
                    <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="input-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>
                    {message && <p className="message">{message}</p>}
                    <button className="toggle-btn" onClick={toggleForm}>
                        {isLogin ? 'Create an Account' : 'Have an Account? Login'}
                    </button>
                </div>
            
        </div>
    );
};

export default LoginSignup;
