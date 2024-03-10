import React ,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import logo from "../../Assets/houselogo.png"
import FullHouse from '../../Components/House/FullHouse/FullHouse';
const SingleHouse = () => {
    const { id } = useParams();
    const [houseData, setHouseData] = useState(null);
    const url=`https://anapioficeandfire.com/api/houses/${id}`
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setHouseData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
  }, [id]);
  return (
    <div>
      <FullHouse id={id} house={houseData} logo={logo}/>
    </div>
  );
};

export default SingleHouse;