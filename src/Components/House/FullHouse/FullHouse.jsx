import React from 'react'
import "./FullHouse.css"
import houselogo from '../../../Assets/houselogo.png'
import { NavLink } from 'react-router-dom'
import RelatedElements from '../RelatedElements'
import {useState ,useEffect} from 'react'
const FullHouse = (props) => {
  const [lord, setLord] = useState("");
  const [heir, setHeir] = useState("");
  const [overloard, setOverloard] = useState("");
  
  useEffect(() => { 
      const fetchData = async () => {    
          const fetchDataFromUrl = async (url) => { // function to fetch data from a given api
              try {
                  const response = await fetch(url);
                  const data = await response.json();
                  return data.name || "Not mentioned";
              } catch (error) {
                  console.error(`Error fetching data from API`, error);
                  return "Error";
              }
          };
  
          if (props.house && props.house.currentLord) {
              const lordName = await fetchDataFromUrl(`https://anapioficeandfire.com/api/characters/${props.house.currentLord.split("/").pop()}`);// fetching the current lord of a house
              setLord(lordName);
          }
  
          if (props.house && props.house.heir) {
              const heirName = await fetchDataFromUrl(`https://anapioficeandfire.com/api/characters/${props.house.heir.split("/").pop()}`); //fetching the current heir of a house
              setHeir(heirName);
          }
  
          if (props.house && props.house.overloard) {
              const overloardName = await fetchDataFromUrl(`https://anapioficeandfire.com/api/characters/${props.house.overloard.split("/").pop()}`); // fetching the house overloard
              setOverloard(overloardName);
          }
      };
  
      fetchData();
  }, [props.house]);
  return (
    <div className='house'>
      <div className="house-container">
      <img className="logo-house" src={props.logo} alt="" />
        <div className="description">
        {props.house && (
        <>
        {props.house.name ? (
            <h2 className="name"><span>Name :</span> {props.house.name}</h2> // in here and in upcoming elements if it is empty in the API we will write not mentioned 
        ) : (
            <h2 className="name"><span>Name :</span> Not mentioned</h2>
        )}
        
        {props.house.region ? (
            <h2 className="region"><span>Region :</span> {props.house.region}</h2>
        ) : (
            <h2 className="region"><span>Region :</span> Not mentioned</h2>
        )}

        {props.house.coatOfArms ? (
            <h2 className="coatOfArms"><span>Coat Of Arms :</span> {props.house.coatOfArms}</h2>
        ) : (
            <h2 className="coatOfArms"><span>Coat Of Arms :</span> Not mentioned</h2>
        )}

        {props.house.words ? (
            <h2 className="words"><span>Words:</span> {props.house.words}</h2>
        ) : (
            <h2 className="words"><span>Words :</span> Not mentioned</h2>
        )}

        {props.house.titles ? (
            <h2 className="titles"><span>Titles :</span> {props.house.titles.join(' - ')}</h2>
        ) : (
            <h2 className="titles"><span>Titles:</span> Not mentioned</h2>
        )}
         {props.house.seats ? (
            <h2 className="seats"><span>Seats :</span> {props.house.seats.join(' - ')}</h2>
        ) : (
            <h2 className="seats"><span>Seats:</span> Not mentioned</h2>
        )}
        {props.house.currentLord ? (
              <h2 className="currentLord"><span>Current Loard :</span> <NavLink style={{ textDecoration: 'underline', color:"white"}} exact to={`/characters/${props.house.currentLord.split('/').pop()}`}>{lord}</NavLink></h2> // if there is a lord then if we click on it will take us to the page of that character 
          ) : (
              <h2 className="currentLord"><span>Current loard :</span> Not mentioned</h2>
          )}
          {props.house.heir ? (
              <h2 className="heir"><span>Heir :</span> <NavLink style={{ textDecoration: 'underline', color:"white"}} exact to={`/characters/${props.house.heir.split('/').pop()}`}>{heir}</NavLink></h2>
          ) : (
              <h2 className="heir"><span>Heir :</span> Not mentioned</h2>
          )}

          {props.house.overloard ? (
              <h2 className="overlord"><span>Overlord :</span> <NavLink style={{ textDecoration: 'underline', color:"white"}} exact to={`/characters/${props.house.overloard.split('/').pop()}`}>{overloard}</NavLink></h2>
          ) : (
              <h2 className="overlord"><span>Overlord :</span> Not mentioned</h2>
          )}

        {props.house.founded ? (
            <h2 className="founded"><span>Foundation Date  : </span> {props.house.founded}</h2>
        ) : (
            <h2 className="founded"><span>Foundation Date :</span> Not mentioned</h2>
        )}

        {props.house.founder ? (
            <h2 className="founder"><span>Founder  : </span> {props.house.founder}</h2>
        ) : (
            <h2 className="founder"><span>Founder :</span> Not mentioned</h2>
        )}

        {props.house.diedOut ? (
            <h2 className="diedOut"><span>Died Out   : </span> {props.house.diedOut}</h2>
        ) : (
            <h2 className="diedOut"><span>Died Out :</span> Not mentioned</h2>
        )}
        </>
)}
       </div>
      </div>
       {(props.house?.swornMembers) && (
       <RelatedElements
        members={props.house.swornMembers}
        />
      )}
    </div>

  )
}

export default FullHouse