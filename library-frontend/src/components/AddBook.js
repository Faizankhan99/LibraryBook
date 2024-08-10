import React, { useState } from 'react';
import { addBook } from '../api';
import { useNavigate } from 'react-router-dom';

function AddBook({ token }) {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addBook(token, { name, author, publicationYear: parseInt(publicationYear) });
            alert('Book added successfully');
            setName('');
            setAuthor('');
            setPublicationYear('');
            navigate('/books')
        } catch (error) {
            if(error.request.status === 403){
                alert('You are not authorized to add a book please login as a admin');
                navigate('/books')
            }else{
                console.error('Failed to add book', error);
                alert('Failed to add book');
            }
        }
    };

    return (
        <div>
            <h2>Add Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Book Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div>
                    <label>Publication Year:</label>
                    <input
                        type="number"
                        value={publicationYear}
                        onChange={(e) => setPublicationYear(e.target.value)}
                    />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
}

export default AddBook;
