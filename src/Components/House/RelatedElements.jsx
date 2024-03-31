import React ,{useState,useEffect} from 'react'
    import { Swiper, SwiperSlide } from 'swiper/react';
import "./RelatedElements.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { NavLink } from 'react-router-dom';
const RelatedElements = (props) => {
    const [swornMembers, setSwornMembers] = useState([]);
    const [memberID ,setMemberID]= useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const members = [];
            const membersId=[];
            const fetchMembers = async (url) => {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    return data.name || "Not mentioned";
                    
                } catch (error) {
                    console.error('Error fetching Members data:', error);
                    return "Error";
                }
            };
    
            if (props.members) {
                await Promise.all(props.members.map(async characterUrl => {
                    const characterName = await fetchMembers(characterUrl);
                    members.push(characterName.name);
                    membersId.push(parseInt(characterUrl.split('/').pop()));
                }));
            }
            setMemberID(memberID);
            setSwornMembers(members);
        };
    
        fetchData();
    }, [props.swornMembers]);

  return (
    
      <div className='related-container'>
        <h2 className='title'>Related Elements:</h2>
        <div className="relatedcharacters">
            <h1>Sworn Members : </h1>
        <Swiper
        slidesPerView={2}
        spaceBetween={1}
        style={{ width: '800px', }}
        >
            {swornMembers.map((member, index) => (
                        <SwiperSlide key={index}>
                            <NavLink style={{ textDecoration: 'none', color:"white"}} exact to={`/characters/${memberID[index]}`}>
                                {member}
                            </NavLink>
                        </SwiperSlide>
                    ))}
        </Swiper>
        </div>
    </div>
    
  
  )
}

export default RelatedElements