import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from "../../Assets/book.png";
import FullBook from '../../Components/Book/FullBook/FullBook';

const SingleBook = () => {
    const { id } = useParams(); // Get the book ID from the URL parameters
    const [bookData, setBookData] = useState(null); // State to hold the book data

    const url = `https://anapioficeandfire.com/api/books/${id}`;

    useEffect(() => {
        // Fetch book data from API
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Failed to fetch data'); // Handle fetch errors
            }
            const data = await response.json();
            setBookData(data); // Update state with fetched book data
          } catch (error) {
            console.error('Error fetching data:', error); // Log any errors
          }
        };
        fetchData();
    }, [id]); // Re-fetch data when the ID changes

    return (
        <div>
            {/* Display the full book details */}
            <FullBook id={id} book={bookData} logo={logo} />
        </div>
    );
};

export default SingleBook;
