import React from 'react'
import "./FullBook.css"
import Slider from "react-slick";
import { NavLink } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import RelatedElements from '../RelatedElements';
const FullBook = (props) => { // This is the Book component in the main page 
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='book'>
      <div className="book-container">
      <img className='logo-book' src={props.logo} alt="" />
        <div className="description">
        {props.book && (  // here we are testing on the book attrbiute if it is null or not , because the API takes time to load 
        <>
        {props.book.name ? ( // In this part and like every upcoming part we are testing on the value of the name attribute it is null or not , if it is we type not mentionned if not we print the name 
            <h2 className="name"><span>Name :</span> {props.book.name}</h2> 
        ) : (
            <h2 className="name"><span>Name :</span> Not mentioned</h2>
        )}
        
        {props.book.authors ? (
            <h2 className="authors"><span>Authors :</span> {props.book.authors}</h2>
        ) : (
            <h2 className="authors"><span>Authors :</span> Not mentioned</h2>
        )}

        {props.book.numberOfPages ? (
            <h2 className="numberOfPages"><span>Number Of Pages :</span> {props.book.numberOfPages}</h2>
        ) : (
            <h2 className="numberOfPages"><span>Number Of Pages  :</span> Not mentioned</h2>
        )}

        {props.book.publisher ? (
            <h2 className="publisher"><span>Publisher :</span> {props.book.publisher}</h2>
        ) : (
            <h2 className="publisher"><span>Publisher :</span> Not mentioned</h2>
        )}

        {props.book.country ? (
            <h2 className="country"><span>Country :</span> {props.book.country}</h2>
        ) : (
            <h2 className="country"><span>Country  :</span> Not mentioned</h2>
        )}

        {props.book.mediaType ? (
            <h2 className="mediaType"><span>Media Type :</span> {props.book.mediaType}</h2>
        ) : (
            <h2 className="mediaType"><span>Media Type :</span> Not mentioned</h2>
        )}

        {props.book.released ? (
            <h2 className="released"><span>Release Time :</span> {props.book.released}</h2>
        ) : (
            <h2 className="released"><span>Release Time :</span> Not mentioned</h2>
        )}
        </>
        )}
        </div>
      </div>
      {(props.book?.characters || props.book?.povCharacters) && (
       <RelatedElements // In here we are creating the custom component related elements and passing as parameters the attributes in the API we gonna add in the related elements
        characters={props.book.characters}
        povCharacters={props.book.povCharacters}
        />
      )}  
    </div>

  )
}

export default FullBook