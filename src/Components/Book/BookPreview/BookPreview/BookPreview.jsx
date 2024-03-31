import React from 'react'
import "./BookPreview.css"
import tornPaperBackground from '../../../../Assets/back.png';
const BookPreview = (props) => { // this part will only contain the static image and the name of the book in the books previiew page 
  return (
    <div className="bookpreview" style={{ // this was done to import the old torn page background
        backgroundImage: `url(${tornPaperBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '40px'
      }}>
        <div className="logo">
            <img src={props.image} alt="" />
        </div>
        <h2>{props.name}</h2>
    </div>
    )
}

export default BookPreview
