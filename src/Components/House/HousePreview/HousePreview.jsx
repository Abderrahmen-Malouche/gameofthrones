import React from 'react'
import "./HousePreview.css"
const HousePreview = (props) => {
  return (
    <div className="housepreview">
        <div className="logo">
            <img src={props.image} alt="" />
        </div>
        <h2>{props.name}</h2>
    </div>
    )
}

export default HousePreview