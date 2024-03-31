import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookPreview from '../../Components/Book/BookPreview/BookPreview/BookPreview';
import booklogo from '../../Assets/book.png';
import { NavLink } from 'react-router-dom';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `https://anapioficeandfire.com/api/books`
      );
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching Books:', error);
    }
  };

  // Filter books based on search query
  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="input-field">
        <input
          name="text"
          type="text"
          placeholder="Enter Book Name ..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        
      </div>
      <div className="books">
        {filteredBooks.map(book => {
          const id = book.url.split("/").pop();
          return (
            <NavLink
              style={{ textDecoration: 'none', color: 'white' }}
              key={id}
              exact
              to={`/books/${id}`}
            >
              <BookPreview key={book.url} image={booklogo} name={book.name} />
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default Books;