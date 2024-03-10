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
        const fetchCharacterNames = async () => {
            const names = [];
            for (const characterUrl of props.characters) {
                try {
                    const response = await fetch(characterUrl);
                    const data = await response.json();
                    let characterName="" 
                    if (data.name==""){
                       characterName = "Not mentionned";
                    }
                    else{
                        characterName=data.name;
                    }
                    names.push(characterName);
                } catch (error) {
                    console.error('Error fetching character data:', error);
                }
            }
            setCharacterNames(names);
        };
        fetchCharacterNames();
    }, [props.characters]);

    useEffect(() => {
        const fetchPovNames = async () => {
            const povnames = [];
            
            for (const povcharacterUrl of props.povCharacters) {
                try {
                    const povresponse = await fetch(povcharacterUrl);
                    const povdata = await povresponse.json();
                    let povcharacterName="" 
                    if (povdata.name==""){
                       povcharacterName = "Not mentionned";
                    }
                    else{
                        povcharacterName=povdata.name;
                    }
                    povnames.push(povcharacterName);
                } catch (error) {
                    console.error('Error fetching character data:', error);
                }
            }
            
            setPovNames(povnames);
        };

        fetchPovNames();
    }, [props.povCharacters]);

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