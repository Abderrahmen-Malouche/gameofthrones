import React ,{useState,useEffect}from 'react'
import "./FullCharacter.css"
import booklogo from '../../../Assets/book.png'
import { NavLink } from 'react-router-dom'
import RelatedElements from '../RelatedElements'
const FullCharacter = (props) => {
    const [mother, setMother] = useState("");
    const [father, setFather] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            const fetchDataFromUrl = async (url) => {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    return data.name || "Not mentioned";
                } catch (error) {
                    console.error(`Error fetching data from API`, error);
                    return "Error";
                }
            };
    
            if (props.character && props.character.mother) {
                const mother = await fetchDataFromUrl(`https://anapioficeandfire.com/api/characters/${props.character.mother.split("/").pop()}`);
                setMother(mother);
            }
    
            if (props.character && props.character.father) {
                const father = await fetchDataFromUrl(`https://anapioficeandfire.com/api/characters/${props.character.father.split("/").pop()}`);
                setFather(father);
            }
        };
    
        fetchData();
    }, [props.character]);
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

        {props.character.father ? ( 
            <h2 className="father"><span>Father :</span> <NavLink style={{ textDecoration: 'underline', color:"white"}} exact to={`/characters/${props.character.father.split('/').pop()}`}>{father}</NavLink></h2>
        ) : (
            <h2 className="father"><span>Father :</span> Not mentioned</h2>
        )}

        {props.character.mother ? (
            <h2 className="mother"><span>Mother :</span> <NavLink style={{ textDecoration: 'underline', color:"white"}} exact to={`/characters/${props.character.mother.split('/').pop()}`}>{mother}</NavLink></h2>
        ) : (
            <h2 className="mother"><span>Mother :</span> Not mentioned</h2>
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
       {(props.character?.books || props.character?.allegiances) && (
       <RelatedElements
        books={props.character.books}
        allegiances={props.character.allegiances}
        />
      )}
    </div>

  )
}

export default FullCharacter