import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = ({ setIsLoggedIn }) => {
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers
            ? JSON.parse(savedUsers)
            : [{ username: '', password: '' }]; // Default admin user for first-time setup
    });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const validateInput = (input) => /^[a-zA-Z0-9-@]+$/.test(input);

    // Handle Login
    const handleLogin = () => {
        const user = users.find(
            (u) => u.username === username && u.password === password
        );

        if (user) {
            setError('');
            localStorage.setItem('loggedIn', 'true'); // Save login state to localStorage
            setIsLoggedIn(true); // Update logged-in state in parent App
            navigate('/home'); // Redirect to home page
        } else {
            setError('Invalid username or password');
            setTimeout(() => setError(''), 3000);
        }
    };

    // Handle Create Account
    const handleCreateAccount = () => {
        if (!newUsername || !newPassword) {
            setError('Please fill in both fields');
            setTimeout(() => setError(''), 3000);
            return;
        }

        if (!validateInput(newUsername) || !validateInput(newPassword)) {
            setError('Only letters, numbers, and @ are allowed');
            setTimeout(() => setError(''), 3000);
            return;
        }

        const userExists = users.find((u) => u.username === newUsername);
        if (userExists) {
            setError('Username already exists');
            setTimeout(() => setError(''), 3000);
            return;
        }

        const updatedUsers = [...users, { username: newUsername, password: newPassword }];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save to localStorage
        setShowCreateAccount(false); // Return to login screen
        setError('');
        alert('Account created successfully! You can now log in.');
    };

    // Handle Forgot Password
    const handleForgotPassword = () => {
        const user = users.find((u) => u.username === username);
        if (user) {
            alert(`Password recovery instructions sent to the registered email for ${username}`);
        } else {
            setError('Account not found');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="container">
            <div className="login-box">
                <h2>{showCreateAccount ? 'Create Account' : showForgotPassword ? 'Forgot Password' : 'Login'}</h2>
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
                                Back to Login
                            </a>
                        </p>
                    </div>
                )}

                {showForgotPassword && (
                    <div>
                        <p>Enter your username to recover your password:</p>
                        <input
                            type="text"
                            placeholder="Username"
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
        </div>
    );
};

export default Login;
