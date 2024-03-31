import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterPreview from '../../Components/Character/CharacterPreview/CharacterPreview';
import char from '../../Assets/char.png';
import { NavLink } from 'react-router-dom';
import './Characters.css';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [allCharacters, setAllCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  useEffect(() => {
    filterCharacters();
  }, [searchQuery, allCharacters]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    setFilteredCharacters(characters.slice(startIndex, endIndex));
  }, [currentPage, characters]);

  const fetchAllCharacters = async () => {
    try {
      let allCharacters = [];
      let total = 0;

      // Fetch data from all pages
      for (let i = 1; ; i++) {
        const response = await axios.get(
          `https://anapioficeandfire.com/api/characters?page=${i}&pageSize=10`
        );
        if (response.data.length === 0) {
          break;
        }
        allCharacters = [...allCharacters, ...response.data];
        total++;
      }

      setAllCharacters(allCharacters);
      setCharacters(allCharacters);
      setTotalPages(total);
    } catch (error) {
      console.error('Error fetching Characters:', error);
    }
  };

  const filterCharacters = () => {
    const filteredCharacters = allCharacters.filter(character =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCharacters(filteredCharacters);
    setTotalPages(Math.ceil(filteredCharacters.length / 10));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <div className="input-field">
        <input
          name="text"
          type="text"
          placeholder="Enter Character Name ..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="characters">
        {filteredCharacters.map((character, index) => {
          const id = character.url.split("/").pop();
          if (character.name === "") {
            return <NavLink style={{ textDecoration: 'none', color: "white" }} key={id} exact to={`/characters/${id}`}><CharacterPreview key={index} image={char} name="Not Loaded in API" /></NavLink>;
          }
          else {
            return <NavLink style={{ textDecoration: 'none', color: "white" }} key={id} exact to={`/characters/${id}`}><CharacterPreview key={index} image={char} name={character.name} /></NavLink>;
          }
        })}
      </div>
      <div className="pagination">
        <button className="btn-53" onClick={handlePrevPage} disabled={currentPage === 1}>
          <div className="original">Prev Page</div>
          <div className="letters">
            <span>P</span>
            <span>R</span>
            <span>E</span>
            <span>V</span>
          </div>
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="btn-53" onClick={handleNextPage} disabled={currentPage === totalPages}>
          <div className="original">Next Page</div>
          <div className="letters">
            <span>N</span>
            <span>E</span>
           <span>X</span>
           <span>T</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default Characters;
