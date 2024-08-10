import React, { useState } from 'react';
import { deleteBook } from '../api';
import { useNavigate } from 'react-router-dom';

function DeleteBook({ token }) {
    const [name, setName] = useState('');
 const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await deleteBook(token, name);
            alert('Book deleted successfully');
            setName('');
            navigate('/books')

        } catch (error) {
            if(error.request.status === 403){
                alert('You are not authorized to add a book please login as a Admin');
                navigate('/books')
            }else{
                console.error('Failed to delete book', error);
                alert('Failed to delete book');
            }
        }
    };

    return (
        <div>
            <h2>Delete Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Book Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type="submit">Delete Book</button>
            </form>
        </div>
    );
}

export default DeleteBook;
