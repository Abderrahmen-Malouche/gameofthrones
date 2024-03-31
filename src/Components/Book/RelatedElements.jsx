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
    const [charId,setCharId]=useState([]);
    const [povId,setPovId]=useState([]);

useEffect(() => { // We are using useEffect here because we are waiting for the API to load . so that when that happens , no error will be showwn 
    const fetchData = async () => {
        const characterNamesArray = [];
        const povNamesArray = [];
        const characterIds=[];
        const PovIds=[];

        const fetchCharacterData = async (url) => { // in this we are fetching the data depending on the URL it can be book or character or house
            try {
                const response = await fetch(url);
                const data = await response.json();
                return data || "Not mentioned";
            } catch (error) {
                console.error('Error fetching character data:', error);
                return "Error";
            }
        };

        // Fetch character names
        await Promise.all(props.characters.map(async characterUrl => { // In here we searching for the characters in the book mentionned in the API through their URls
            const characterName = await fetchCharacterData(characterUrl);
            characterNamesArray.push(characterName.name);
            characterIds.push(parseInt(characterUrl.split('/').pop()));
        }));

        // Fetch POV character names
        await Promise.all(props.povCharacters.map(async povcharacterUrl => {// In here we searching for the POVcharacters in the book mentionned in the API through their URls
            const povName = await fetchCharacterData(povcharacterUrl);
            povNamesArray.push(povName.name);
            PovIds.push(parseInt(povcharacterUrl.split('/').pop()));
        }));

        setCharacterNames(characterNamesArray);
        setPovNames(povNamesArray);
        setCharId(characterIds);
        setPovId(PovIds);
    };

    fetchData();
}, [props.characters, props.povCharacters]);

  return (
    
      <div className='related-container'>
        <h2 className='title'>Related Elements:</h2>
        <div className="relatedcharacters">
            <h1>Related Characters : </h1>
        <Swiper // In here we are adding a swiper for a better UI experience and making the navigation easier between character
        slidesPerView={2}
        spaceBetween={1}
        style={{ width: '800px', }}
        >
            {characterNames.map((name, index) => (
                        <SwiperSlide key={index}>
                            <NavLink style={{ textDecoration: 'none', color:"white"}} exact to={`/characters/${charId[index]}`}>  
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
                            <NavLink style={{ textDecoration: 'none', color:"white"}} exact to={`/characters/${povId[index]}`}>
                                {povname}
                            </NavLink>
                        </SwiperSlide>
                    ))}
        </Swiper>
        </div>
    </div>
    
   // Whenever we click n a character or A pov chracter it takes us to the target chracter page with details and everything
  )
}

export default RelatedElements