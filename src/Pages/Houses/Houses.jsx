import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HousePreview from '../../Components/House/HousePreview/HousePreview';
import houselogo from '../../Assets/houselogo.png';
import { NavLink } from 'react-router-dom';
import './Houses.css';

const Houses = () => {
  const [houses, setHouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [allHouses, setAllHouses] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredHouses, setFilteredHouses] = useState([]);

  // Fetch all houses when component mounts
  useEffect(() => {
    fetchAllHouses();
  }, []);

  // Filter houses based on search query
  useEffect(() => {
    filterHouses();
  }, [searchQuery, allHouses]);

  // Update displayed houses when current page changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    setFilteredHouses(allHouses.slice(startIndex, endIndex));
  }, [currentPage, allHouses]);

  const fetchAllHouses = async () => {
    try {
      let allHouses = [];
      let total = 0;

      // Fetch data from all pages
      for (let i = 1; ; i++) {
        const response = await axios.get(
          `https://anapioficeandfire.com/api/houses?page=${i}&pageSize=10`
        );
        if (response.data.length === 0) {
          break; // Stop if no more data
        }
        allHouses = [...allHouses, ...response.data];
        total++;
      }

      setAllHouses(allHouses); // Set all houses
      setHouses(allHouses); // Set initial display houses
      setTotalPages(total); // Set total pages for pagination
    } catch (error) {
      console.error('Error fetching houses:', error); // Log any errors
    }
  };

  const filterHouses = () => {
    // Filter houses based on search query
    const filteredHouses = allHouses.filter(house =>
      house.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHouses(filteredHouses); // Update filtered houses list
    setTotalPages(Math.ceil(filteredHouses.length / 10)); // Update total pages
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
          placeholder="Enter House Name ..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)} // Update search query state
        />
      </div>

      {/* Display list of filtered houses */}
      <div className="houses">
        {filteredHouses.map((house, index) => {
          const id = house.url.split("/").pop(); // Extract house ID from URL
          return (
            <NavLink
              style={{ textDecoration: 'none', color: "white" }}
              key={id}
              exact
              to={`/houses/${id}`} // Link to individual house page
            >
              <HousePreview key={index} image={houselogo} name={house.name} />
            </NavLink>
          );
        })}
      </div>

      {/* Pagination controls */}
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

export default Houses;
