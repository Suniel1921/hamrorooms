import React from 'react';
import '../sideMenu/menu.css';
import { Link } from 'react-router-dom';
import { FaHome, FaUserPlus } from "react-icons/fa";

const Menu = () => {
  return (
    <div className="menu">
      <div className="items">
        <Link to={'/account'} className='listItem'>
          <FaHome/>
          <span>Home</span>
        </Link>
        <Link to={'/account/UserRoom'} className='listItem'>
          <FaUserPlus/>
          <span>See Your Room</span>
        </Link>
      </div>
    </div>
  );
}; 

export default Menu;
