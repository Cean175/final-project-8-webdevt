import React, { useState } from 'react';
import '../App.css';

const USERS = [
    { username: 'admin', password: 'admin123' },
    { username: 'user1', password: 'password1' },
];

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleLogin = () => {
        const user = USERS.find(
            (u) => u.username === username && u.password === password
        );
        if (user) {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Invalid username or password');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleCreateAccount = () => {
        if (newUsername && newPassword) {
            USERS.push({ username: newUsername, password: newPassword });
            setShowCreateAccount(false);
            setError('');
            setUsername(newUsername);
            setPassword(newPassword);
        } else {
            setError('Please fill in both fields');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleForgotPassword = () => {
        const user = USERS.find((u) => u.username === username);
        if (user) {
            alert(`Password recovery email sent to ${username}`);
        } else {
            setError('Account not found');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="container">
            {!isLoggedIn ? (
                <div className="login-box">
                    <h2>{showCreateAccount ? 'Create Account' : 'Login'}</h2>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {!showCreateAccount && !showForgotPassword && (
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setError(''); 
                                }}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button onClick={handleLogin}>Login</button>
                            <p>
                                <a href="#" onClick={() => setShowForgotPassword(true)}>
                                    Forgot Password?
                                </a>
                            </p>
                            <p>
                                <a href="#" onClick={() => setShowCreateAccount(true)}>
                                    Create an Account
                                </a>
                            </p>
                        </div>
                    )}

                    {showCreateAccount && (
                        <div>
                            <input
                                type="text"
                                placeholder="New Username"
                                value={newUsername}
                                onChange={(e) => {
                                    setNewUsername(e.target.value);
                                    setError(''); 
                                }}
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button onClick={handleCreateAccount}>Create Account</button>
                            <p>
                                <a href="#" onClick={() => setShowCreateAccount(false)}>
                                    Already have an account? Login
                                </a>
                            </p>
                        </div>
                    )}

                    {showForgotPassword && (
                        <div>
                            <p>Enter your username to recover your password:</p>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setError(''); 
                                }}
                            />
                            <button onClick={handleForgotPassword}>Recover Password</button>
                            <p>
                                <a href="#" onClick={() => setShowForgotPassword(false)}>
                                    Back to Login
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="welcome-box">
                    <h2>Welcome, {username}!</h2>
                    <button onClick={() => setIsLoggedIn(false)}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Login;
