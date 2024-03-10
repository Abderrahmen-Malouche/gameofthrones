import React from 'react'
import "./BookPreview.css"
const BookPreview = (props) => {
  return (
    <div className="bookpreview">
        <div className="logo">
            <img src={props.image} alt="" />
        </div>
        <h2>{props.name}</h2>
    </div>
    )
}

export default BookPreview
