import React from 'react'
import "./FullBook.css"
import Slider from "react-slick";
import { NavLink } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import RelatedElements from '../RelatedElements';
const FullBook = (props) => {
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
            {props.book?.name && <h2 className="name"><span>Name :</span> {props.book.name}</h2>}
            {props.book?.authors && <h2 className="authors"><span>Authors :</span> {props.book.authors}</h2>}
            {props.book?.numberOfPages && <h2 className="pages"><span>Number of Pages :</span> {props.book.numberOfPages}</h2>}
            {props.book?.publisher && <h2 className="publisher"><span>Publisher :</span> {props.book.publisher}</h2>}
            {props.book?.country && <h2 className="country"><span>Country :</span> {props.book.country}</h2>}
            {props.book?.mediaType && <h2 className="type"><span>Media Type :</span> {props.book.mediaType}</h2>}
            {props.book?.released && <h2 className="time"><span>Release Time :</span> {props.book.released}</h2>}
        </div>
      </div>
      {(props.book?.characters && props.book?.povCharacters) && (
       <RelatedElements
        characters={props.book.characters}
        povCharacters={props.book.povCharacters}
        />
      )}  
    </div>

  )
}

export default FullBook