import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from "../../Assets/houselogo.png";
import FullHouse from '../../Components/House/FullHouse/FullHouse';

const SingleHouse = () => {
    const { id } = useParams(); // Get the house ID from the URL parameters
    const [houseData, setHouseData] = useState(null); // State to hold the house data

    const url = `https://anapioficeandfire.com/api/houses/${id}`;

    useEffect(() => {
        // Fetch house data from API
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Failed to fetch data'); // Handle fetch errors
            }
            const data = await response.json();
            setHouseData(data); // Update state with fetched house data
          } catch (error) {
            console.error('Error fetching data:', error); // Log any errors
          }
        };
        fetchData();
    }, [id]); // Re-fetch data when the ID changes

    return (
        <div>
            {/* Display the full house details */}
            <FullHouse id={id} house={houseData} logo={logo} />
        </div>
    );
};

export default SingleHouse;
