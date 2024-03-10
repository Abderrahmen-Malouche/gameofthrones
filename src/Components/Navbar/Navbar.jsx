import React from 'react'
import logo from "../../Assets/logo.png"
import "./Navbar.css"
import { CiMenuBurger } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className='Navbar'>
            {isOpen? <div className="navbar-mobile">
                <RxCross1 style={{ color:"gold"}} className='cross' onClick={toggleNavbar}/>
                <ul className="mobile-list">
                <NavLink style={{ textDecoration: 'none' ,color:"gold"}} exact to="/" activeClassName="active"><li>Home</li></NavLink>
                <NavLink style={{ textDecoration: 'none' ,color:"gold"}} exact to="/books" activeClassName="active"><li>Books</li></NavLink>
                <NavLink style={{ textDecoration: 'none' ,color:"gold"}} exact to="/characters" activeClassName="active"><li>Characters</li></NavLink>
                <NavLink style={{ textDecoration: 'none' ,color:"gold"}} exact to="/houses" activeClassName="active"><li>Houses</li></NavLink>
                </ul>
            </div>: <></>}
            
            
            <div className="navbar-logo">
                <img src={logo} alt="" />
            </div>
            
            <ul className='list'>
             <NavLink style={{ textDecoration: 'none' ,color:"gold"}} exact to="/" activeClassName="active" classname="navlink"><li>Home</li></NavLink>
               <NavLink style={{ textDecoration: 'none'  ,color:"gold"}} exact to="/books" activeClassName="active" classname="navlink"><li>Books</li></NavLink>
               <NavLink style={{ textDecoration: 'none'  ,color:"gold"}} exact to="/characters" activeClassName="active" classname="navlink"><li>Characters</li></NavLink>
               <NavLink style={{ textDecoration: 'none'  ,color:"gold"}} exact to="/houses" activeClassName="active" classname="navlink"><li>Houses</li></NavLink>
            </ul>
            <CiMenuBurger  style={{color:"gold"}} className='burger_icon' onClick={toggleNavbar}/>

    </nav>
  )
}

export default Navbar
