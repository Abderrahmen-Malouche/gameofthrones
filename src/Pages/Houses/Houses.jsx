import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import HousePreview from '../../Components/House/HousePreview/HousePreview'
import houselogo from '../../Assets/houselogo.png'
import { useState,useEffect } from 'react'
import axios from 'axios'
import "./Houses.css"
import { NavLink } from 'react-router-dom'
const Houses = () => {
  const [houses, setHouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(440 / 10);

  useEffect(() => {
    fetchHouses();
  }, [currentPage]);

  const fetchHouses = async () => {
    try {
      const response = await axios.get(
        `https://anapioficeandfire.com/api/houses?page=${currentPage}&pageSize=10`
      );
      setHouses(response.data);
    } catch (error) {
      console.error('Error fetching houses:', error);
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
      <div className="houses">
        {houses.map((house) => {
          const id=house.url.split("/").pop();
          return <NavLink  key={id} exact to={`/houses/${id}`}><HousePreview key={house.url} image={houselogo} name={house.name} /></NavLink>;
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

export default Houses