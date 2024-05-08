import React from 'react';
import "./BookPreview.css";
import tornPaperBackground from '../../../../Assets/back.png';

// Component to display book preview with static image and book name
const BookPreview = (props) => {
  return (
    <div className="bookpreview" style={{ 
        backgroundImage: `url(${tornPaperBackground})`, // Setting torn paper background
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '40px'
      }}>
      <div className="logo">
          <img src={props.image} alt="" /> {/* Book image */}
      </div>
      <h2>{props.name}</h2> {/* Book name */}
    </div>
  );
}

export default BookPreview;
