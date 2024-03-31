import React from 'react'
import "./CharacterPreview.css"
import tornPaperBackground from '../../../Assets/back.png';
const CharacterPreview = (props) => {// this part will only contain the static image and the name of the chracter in the chracters previiew page 
  return (
    <div className="characterpreview" style={{ // this was done to import the old torn page background
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

export default CharacterPreview
