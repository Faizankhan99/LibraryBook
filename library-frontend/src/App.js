import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import LoginUser from './components/login';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import DeleteBook from './components/DeleteBook';
import './App.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <Router>
            <div className="app">
                <nav className="navbar">
                    <h1 className="navbar-brand">Library App</h1>
                    <ul className="navbar-links">
                        {!token ? (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/books">Books</Link>
                                </li>
                                <li>
                                    <Link to="/add-book">Add Book</Link>
                                </li>
                                <li>
                                    <Link to="/delete-book">Delete Book</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="logout-button">
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                <div className="content">
                    <Routes>
                        <Route path="/login" element={!token ? <LoginUser setToken={setToken} /> : <Navigate to="/books" />} />
                        {token && (
                            <>
                                <Route path="/books" element={<BookList token={token} />} />
                                <Route path="/add-book" element={<AddBook token={token} />} />
                                <Route path="/delete-book" element={<DeleteBook token={token} />} />
                            </>
                        )}
                        <Route path="/" element={token ? <Navigate to="/books" /> : <Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
