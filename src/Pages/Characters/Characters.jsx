import React from 'react'
import CharacterPreview from '../../Components/Character/CharacterPreview/CharacterPreview'
import char from '../../Assets/char.png'
import { useState,useEffect } from 'react'
import axios from 'axios'
import "./Characters.css"
import { NavLink } from 'react-router-dom'
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(2138 / 10);

  useEffect(() => {
    fetchCharacters();
  }, [currentPage]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        `https://anapioficeandfire.com/api/characters?page=${currentPage}&pageSize=10`
      );
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching Characters:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
  
      <div className="characters">
        {characters.map((character) => {
          const id=character.url.split("/").pop();
          if (character.name==="" ){
            return <NavLink  key={id} exact to={`/characters/${id}`}><CharacterPreview key={character.url} image={char} name="Not Loaded in API" /></NavLink>;
          }
          else{
            return <NavLink  key={id} exact to={`/characters/${id}`}><CharacterPreview key={character.url} image={char} name={character.name} /></NavLink>;
          }
        })}
      </div>
      <div className="pagination">
        <button class="btn-53" onClick={handlePrevPage} >
          <div class="original">Prev Page</div>
          <div class="letters">
            <span>P</span>
            <span>R</span>
            <span>E</span>
            <span>V</span>
          </div>
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button class="btn-53" onClick={handleNextPage} >
          <div class="original">Next Page</div>
          <div class="letters">
            <span>N</span>
            <span>E</span>
            <span>X</span>
            <span>T</span>
          </div>
        </button>
      </div>
    </>
  )
}

export default Characters