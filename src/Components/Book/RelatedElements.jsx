import React ,{useState,useEffect} from 'react'
    import { Swiper, SwiperSlide } from 'swiper/react';
import "./RelatedElements.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { NavLink } from 'react-router-dom';
const RelatedElements = (props) => {
    const [characterNames, setCharacterNames] = useState([]);
    const [povNames, setPovNames] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        const characterNamesArray = [];
        const povNamesArray = [];

        const fetchCharacterData = async (url) => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                let characterName = data.name || "Not mentioned";
                return characterName;
            } catch (error) {
                console.error('Error fetching character data:', error);
                return "Error";
            }
        };

        // Fetch character names
        await Promise.all(props.characters.map(async characterUrl => {
            const characterName = await fetchCharacterData(characterUrl);
            characterNamesArray.push(characterName);
        }));

        // Fetch POV character names
        await Promise.all(props.povCharacters.map(async povcharacterUrl => {
            const povName = await fetchCharacterData(povcharacterUrl);
            povNamesArray.push(povName);
        }));

        setCharacterNames(characterNamesArray);
        setPovNames(povNamesArray);
    };

    fetchData();
}, [props.characters, props.povCharacters]);

  return (
    
      <div className='related-container'>
        <h2 className='title'>Related Elements:</h2>
        <div className="relatedcharacters">
            <h1>Related Characters : </h1>
        <Swiper
        slidesPerView={3}
        spaceBetween={1}
        style={{ width: '800px', }}
        >
            {characterNames.map((name, index) => (
                        <SwiperSlide key={index}>
                            <NavLink exact to={`/characters/${index}`}>
                                {name}
                            </NavLink>
                        </SwiperSlide>
                    ))}
        </Swiper>
        </div>
        <div className="relatedcharacters">
            <h1>Related Pov Characters : </h1>
        <Swiper
        slidesPerView={3}
        spaceBetween={1}
        style={{ width: '800px', }}
        >
            {povNames.map((povname, index) => (
                        <SwiperSlide key={index}>
                            <NavLink exact to={`/characters/${index}`}>
                                {povname}
                            </NavLink>
                        </SwiperSlide>
                    ))}
        </Swiper>
        </div>
    </div>
    
  
  )
}

export default RelatedElements