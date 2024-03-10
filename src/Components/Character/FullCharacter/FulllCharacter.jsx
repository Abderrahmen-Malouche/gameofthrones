import React from 'react'
import "./FullCharacter.css"
import booklogo from '../../../Assets/book.png'
import { NavLink } from 'react-router-dom'
import RelatedElements from '../RelatedElements'
const FullCharacter = (props) => {

  return (
    <div className='book'>
      <div className="char-container">
      <img className="logo-character" src={props.logo} alt="" />
        <div className="description">
        {props.character && (
        <>
        {props.character.name ? (
            <h2 className="name"><span>Name :</span> {props.character.name}</h2>
        ) : (
            <h2 className="name"><span>Name :</span> Not mentioned</h2>
        )}
        
        {props.character.gender ? (
            <h2 className="gender"><span>Gender :</span> {props.character.gender}</h2>
        ) : (
            <h2 className="gender"><span>Gender :</span> Not mentioned</h2>
        )}

        {props.character.culture ? (
            <h2 className="culture"><span>Culture :</span> {props.character.culture}</h2>
        ) : (
            <h2 className="culture"><span>Culture :</span> Not mentioned</h2>
        )}

        {props.character.born ? (
            <h2 className="born"><span>Born Date :</span> {props.character.born}</h2>
        ) : (
            <h2 className="born"><span>Born Date :</span> Not mentioned</h2>
        )}

        {props.character.died ? (
            <h2 className="died"><span>Died Date :</span> {props.character.died}</h2>
        ) : (
            <h2 className="died"><span>Died Date :</span> Not mentioned</h2>
        )}

        {props.character.titles ? (
            <h2 className="titles"><span>Titles :</span> {props.character.titles}</h2>
        ) : (
            <h2 className="titles"><span>Titles :</span> Not mentioned</h2>
        )}

        {props.character.playedBy ? (
            <h2 className="playedBy"><span>Played By :</span> {props.character.playedBy}</h2>
        ) : (
            <h2 className="playedBy"><span>Played By :</span> Not mentioned</h2>
        )}

        {props.character.tvSeries ? (
            <h2 className="tvSeries"><span>Tv Series : </span> {props.character.tvSeries}</h2>
        ) : (
            <h2 className="tvSeries"><span>Tv Series:</span> Not mentioned</h2>
        )}
        </>
)}
       </div>
      </div>
       {(props.character?.books) && (
       <RelatedElements
        books={props.character.books}
        allegiances={props.character.allegiances}
        />
      )}
    </div>

  )
}

export default FullCharacter