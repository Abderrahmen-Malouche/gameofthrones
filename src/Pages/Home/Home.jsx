import React from 'react';
import banner from "../../Assets/banner.png";
import "./Home.css";

const Home = () => {
  return (
    <>
      {/* Display the banner image */}
      <img src={banner} alt="" className='banner' />
    </>
  );
}

export default Home;
