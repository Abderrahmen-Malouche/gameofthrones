import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookPreview from '../../Components/Book/BookPreview/BookPreview/BookPreview';
import booklogo from '../../Assets/book.png';
import { NavLink } from 'react-router-dom';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch books from API when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://anapioficeandfire.com/api/books');
      setBooks(response.data); // Update state with fetched books
    } catch (error) {
      console.error('Error fetching Books:', error); // Log any errors
    }
  };

  // Filter books based on search query
  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Input field for search query */}
      <div className="input-field">
        <input
          name="text"
          type="text"
          placeholder="Enter Book Name ..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)} // Update search query state
        />
      </div>

      {/* Display list of filtered books */}
      <div className="books">
        {filteredBooks.map(book => {
          const id = book.url.split("/").pop(); // Extract book ID from URL
          return (
            <NavLink
              style={{ textDecoration: 'none', color: 'white' }}
              key={id}
              exact
              to={`/books/${id}`} // Link to individual book page
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
