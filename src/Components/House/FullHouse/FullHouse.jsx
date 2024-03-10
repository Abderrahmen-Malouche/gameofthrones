import React from 'react'
import "./FullHouse.css"
const FullHouse = (props) => {
  return (
    <>
      <div className="house-container">
      <img className="logo-house" src={props.logo} alt="" />
        <div className="description">
            {props.house?.name && <h2 className="name"><span>Name :</span> {props.house.name}</h2>}
            {props.house?.region && <h2 className="region"><span>Region :</span> {props.house.region}</h2>}
            {props.house?.coatOfArms && <h2 className="coatOfArms"><span>Coat Of Arms :</span> {props.house.coatOfArms}</h2>}
            {props.house?.words && <h2 className="words"><span>Words :</span> {props.house.words}</h2>}
            {props.house?.currentLord && <h2 className="currentLord"><span>Current Lord :</span> {props.house.currentLord}</h2>}
            {props.house?.heir && <h2 className="heir"><span>Heir :</span> {props.house.heir}</h2>}
            {props.house?.overlord && <h2 className="overlord"><span>Overlord :</span> {props.house.overlord}</h2>}
        </div>
      </div>
    </>

  )
}

export default FullHouse