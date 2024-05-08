import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from "../../Assets/char.png";
import FullCharacter from '../../Components/Character/FullCharacter/FulllCharacter';

const SingleCharacter = () => {
    const { id } = useParams(); // Get the character ID from the URL parameters
    const [characterData, setCharacterData] = useState(null); // State to hold the character data

    const url = `https://anapioficeandfire.com/api/characters/${id}`;

    useEffect(() => {
        // Fetch character data from API
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Failed to fetch data'); // Handle fetch errors
            }
            const data = await response.json();
            setCharacterData(data); // Update state with fetched character data
          } catch (error) {
            console.error('Error fetching data:', error); // Log any errors
          }
        };
        fetchData();
    }, [id]); // Re-fetch data when the ID changes

    return (
        <div>
            {/* Display the full character details */}
            <FullCharacter id={id} character={characterData} logo={logo} className="full-character" />
        </div>
    );
};

export default SingleCharacter;
