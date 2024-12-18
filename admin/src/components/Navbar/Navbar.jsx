import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div>
          <div className="navbar">
               <img className='logo' src={assets.ezyeats_logo} alt="" />
               <p>Admin Panel</p>
               <img src={assets.profile_image} alt="" className="profile" />
          </div>
    </div>
  )
}

export default Navbar