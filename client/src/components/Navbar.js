import React from 'react'
import './Navbar.css'
import { FaSearch } from "react-icons/fa";
import { useState,useEffect,useRef } from 'react';
import { FaUserCircle,FaPaw } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {

  const [profileClicked,setProfileClicked]=useState(false);
  const profileMenuRef = useRef(null);
  const navigate=useNavigate();

  function handeProfie(){
    const cur=profileClicked;
    setProfileClicked(!cur);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate('/login');

}

  return (
    <div>
    <nav>
        <div className='logo-div'>
        <img className='logo' src="./images/logo-bg.png" alt="logo" />
        </div>
        <div className='search-bar'>
          <i><FaSearch /></i>
          <input type='text' placeholder='search'/>
        </div>
        <div className='profile-div' onClick={handeProfie}>
            <img src='./images/home.png' alt='small-progile'/>
        </div>
    </nav>
    <hr></hr>
    <div className='dropdown-profile' ref={profileMenuRef}>
        {profileClicked && (
          <div className='profile-menu'>
          <img src='./images/home.png' alt='small-progile'/>
            <ul>
              <li><Link to='/profile'><FaUserCircle className='icon'></FaUserCircle>View Profile</Link></li>
              <li>
                <Link to='/addPet' ><FaPaw className='icon'></FaPaw>Add Pet</Link>
              </li>
              <li><a onClick={handleLogout}><div><MdLogout className='icon'></MdLogout>Logout</div></a></li>
            </ul>
          </div>
        )}
        </div>
    </div>
  )
}

export default Navbar