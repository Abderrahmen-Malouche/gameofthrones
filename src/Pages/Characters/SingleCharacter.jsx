import React ,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import logo from "../../Assets/char.png"
import FullCharacter from '../../Components/Character/FullCharacter/FulllCharacter';
const SingleCharacter = () => {
    const { id } = useParams();
    const [characterData, setcharacterData] = useState(null);
    const url=`https://anapioficeandfire.com/api/characters/${id}`
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setcharacterData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
  }, [id]);
  return (
    <div>
      <FullCharacter id={id} character={characterData} logo={logo} className="full-character"/>
    </div>
  );
};

export default SingleCharacter;