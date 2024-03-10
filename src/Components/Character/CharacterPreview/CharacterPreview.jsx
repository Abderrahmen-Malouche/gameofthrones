import React from 'react'
import "./CharacterPreview.css"
const CharacterPreview = (props) => {
  return (
    <div className="characterpreview">
        <div className="logo">
            <img src={props.image} alt="" />
        </div>
        <h2>{props.name}</h2>
    </div>
    )
}

export default CharacterPreview
