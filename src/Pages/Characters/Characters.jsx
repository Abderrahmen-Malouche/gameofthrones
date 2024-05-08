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

  // Fetch all characters when component mounts
  useEffect(() => {
    fetchAllCharacters();
  }, []);

  // Filter characters based on search query
  useEffect(() => {
    filterCharacters();
  }, [searchQuery, allCharacters]);

  // Update displayed characters when current page changes
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
          break; // Stop if no more data
        }
        allCharacters = [...allCharacters, ...response.data];
        total++;
      }

      setAllCharacters(allCharacters); // Set all characters
      setCharacters(allCharacters); // Set initial display characters
      setTotalPages(total); // Set total pages for pagination
    } catch (error) {
      console.error('Error fetching Characters:', error); // Log any errors
    }
  };

  const filterCharacters = () => {
    // Filter characters based on search query
    const filteredCharacters = allCharacters.filter(character =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCharacters(filteredCharacters); // Update characters list
    setTotalPages(Math.ceil(filteredCharacters.length / 10)); // Update total pages
    setCurrentPage(1); // Reset to first page
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages)); // Increment page
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Decrement page
  };

  return (
    <>
      {/* Input field for search query */}
      <div className="input-field">
        <input
          name="text"
          type="text"
          placeholder="Enter Character Name ..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)} // Update search query state
        />
      </div>

      {/* Display list of filtered characters */}
      <div className="characters">
        {filteredCharacters.map((character, index) => {
          const id = character.url.split("/").pop(); // Extract character ID from URL
          if (character.name === "") {
            return (
              <NavLink
                style={{ textDecoration: 'none', color: "white" }}
                key={id}
                exact
                to={`/characters/${id}`}
              >
                <CharacterPreview key={index} image={char} name="Not Loaded in API" />
              </NavLink>
            );
          } else {
            return (
              <NavLink
                style={{ textDecoration: 'none', color: "white" }}
                key={id}
                exact
                to={`/characters/${id}`}
              >
                <CharacterPreview key={index} image={char} name={character.name} />
              </NavLink>
            );
          }
        })}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button className="btn-53" onClick={handlePrevPage} disabled={currentPage === 1}>
          <div className="original">Prev Page</div>
          <div className="letters">
            <span>P</span><span>R</span><span>E</span><span>V</span>
          </div>
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="btn-53" onClick={handleNextPage} disabled={currentPage === totalPages}>
          <div className="original">Next Page</div>
          <div className="letters">
            <span>N</span><span>E</span><span>X</span><span>T</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default Characters;
