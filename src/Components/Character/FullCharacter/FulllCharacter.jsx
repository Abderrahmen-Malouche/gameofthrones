import React from 'react'
import "./FullCharacter.css"
import booklogo from '../../../Assets/book.png'
import { NavLink } from 'react-router-dom'

const FullCharacter = (props) => {

  return (
    <>
      <div className="char-container">
      <img className="logo-character" src={props.logo} alt="" />
        <div className="description">
        {props.character?.name && <h2 className="name"><span>Name :</span> {props.character.name}</h2>}
            {props.character?.gender && <h2 className="gender"><span>Gender :</span> {props.character.gender}</h2>}
            {props.character?.culture && <h2 className="culture"><span>Culture :</span> {props.character.culture}</h2>}
            {props.character?.born && <h2 className="born"><span>Born date :</span> {props.character.born}</h2>}
            {props.character?.died && <h2 className="died"><span>Died date:</span> {props.character.died}</h2>}
            {props.character?.playedBy && <h2 className="playedBy"><span>Played By :</span> {props.character.playedBy}</h2>}
            {props.character?.tvSeries && <h2 className="tvSeries"><span>Tv Series :</span> {props.character.tvSeries}</h2>}
            {props.character?.books && ( <h2 className="books"><span>Books: </span>{props.character.books.map((book, index) => (
                    <NavLink key={index} exact to={`/books/${props.character.url.split("/").pop()}`}>Book {index}</NavLink>))}</h2>)}
       </div>
       
      </div>
    </>

  )
}

export default FullCharacter