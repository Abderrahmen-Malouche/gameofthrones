import React ,{useState,useEffect} from 'react'
    import { Swiper, SwiperSlide } from 'swiper/react';
import "./RelatedElements.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { NavLink } from 'react-router-dom';
const RelatedElements = (props) => {
    const [alleg, setAlleg] = useState([]);
    const [books, setBooks] = useState([]);
    const [allegId,setAllegId]=useState([]);
    const [booksID, setBooksId] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const allegiancesArray = [];
            const allegiancesID=[];

            const booksArray = [];
            const booksID=[];
            const fetchDataFromUrl = async (url) => {// we are fetching  for the API data that in our case is house and book 
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    return data || "Not mentioned";
                    
                } catch (error) {
                    console.error(`Error fetching data from ${url}:`, error);
                    return "Error";
                }
            };
    
            // Fetch allegiance names
            await Promise.all(props.allegiances.map(async houseurl => {
                const allegianceName = await fetchDataFromUrl(houseurl);
                allegiancesArray.push(allegianceName.name);
                allegiancesID.push(parseInt(houseurl.split('/').pop()))
            }));
    
            // Fetch book names
            await Promise.all(props.books.map(async bookurl => {
                const bookName = await fetchDataFromUrl(bookurl);
                booksArray.push(bookName.name);
                booksID.push(parseInt(bookurl.split('/').pop()))
            }));
    
            setAlleg(allegiancesArray);
            setBooks(booksArray);
            setAllegId(allegiancesID);
            setBooksId(booksID);
        };
    
        fetchData();
    }, [props.allegiances, props.books]);
    

  return (
    
      <div className='related-container'>
        <h2 className='title'>Related Elements:</h2>
        <div className="relatedcharacters">
            <h1>Related Books : </h1>
        <Swiper
        slidesPerView={2}
        spaceBetween={1}
        style={{ width: '800px', }}
        >
            {books.map((book, index) => (
                        <SwiperSlide key={index}>
                            <NavLink style={{ textDecoration: 'none', color:"white"}}  exact to={`/books/${booksID[index]}`}>
                                {book}
                            </NavLink>
                        </SwiperSlide>
                    ))}
        </Swiper>
        </div>
        <div className="relatedcharacters">
            <h1>Allegiances : </h1>
        <Swiper
        slidesPerView={3}
        spaceBetween={1}
        style={{ width: '800px', }}
        >
            {alleg.map((allegiance, index) => (
                        <SwiperSlide key={index}>
                            <NavLink style={{ textDecoration: 'none', color:"white"}} exact to={`/houses/${allegId[index]}`}>
                                {allegiance}
                            </NavLink>
                        </SwiperSlide>
                    ))}
        </Swiper>
        </div>
    </div>
    
  
  )
}

export default RelatedElements