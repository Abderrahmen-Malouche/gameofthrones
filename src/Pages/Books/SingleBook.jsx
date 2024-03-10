import React ,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import logo from "../../Assets/book.png"
import FullBook from '../../Components/Book/FullBook/FullBook';
const SingleBook = () => {
    const { id } = useParams();
    const [bookData, setBookData] = useState(null);
    const url=`https://anapioficeandfire.com/api/books/${id}`
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setBookData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
  }, [id]);
  return (
    <div>
      <FullBook id={id} book={bookData} logo={logo}/>
    </div>
  );
};

export default SingleBook;