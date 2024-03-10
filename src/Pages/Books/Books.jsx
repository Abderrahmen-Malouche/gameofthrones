import React from 'react'
import BookPreview from '../../Components/Book/BookPreview/BookPreview/BookPreview'
import booklogo from '../../Assets/book.png'
import { useState,useEffect } from 'react'
import axios from 'axios'
import "./Books.css"
import { NavLink } from 'react-router-dom';
const Books = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetchBooks();
  },);

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


  return (
    <>
      <div className="books">
        {books.map((book) => {
          const id=book.url.split("/").pop();
          return  <NavLink  key={id} exact to={`/books/${id}`}><BookPreview key={book.url} image={booklogo} name={book.name} /></NavLink>;
        })}
      </div>
    </>
  )
}

export default Books