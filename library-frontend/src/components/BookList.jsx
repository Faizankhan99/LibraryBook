import React, { useState, useEffect } from 'react';
import { getBooks } from '../api';
import './BookList.css'; // Importing CSS for table styling

function BookList({ token }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks(token);
                setBooks(response.data);
            } catch (error) {
                console.error('Failed to fetch books', error);
            }
        };

        fetchBooks();
    }, [token]);

    return (
        <div>
            <h2>Books List</h2>
            <table className="books-table">
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Publication Year</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={index}>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.publicationYear}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;
