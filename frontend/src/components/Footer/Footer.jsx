import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer'id='footer'>
          <div className="footer-content">-
               <div className="footer-content-left">
                    <img src={assets.ezyeats_logo} alt="" />
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus facere tenetur sunt adipisci voluptates numquam at modi quia magnam voluptatibus esse praesentium omnis odit, soluta, aliquid doloremque quidem ad. Praesentium.</p>
                    <div className="footer-social-icons">
                         <img src={assets.facebook_icon} alt="" />
                         <img src={assets.twitter_icon} alt="" />
                         <img src={assets.linkedin_icon} alt="" />
                    </div>
               </div>
               <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                         <li>Home</li>
                         <li>About Us</li>
                         <li>Delivery</li>
                         <li>Privacy Policy</li>
                    </ul>
               </div>
               <div className="footer-content-right">
                    <h2>Get in Touch</h2>
                    <ul>
                         <li> &#9742; &nbsp; +90-64666092</li>
                         <li> &#128231; &nbsp; support.easyeats@gmail.com</li>
                    </ul>
               </div>
          </div>
          <hr />
          <p className="footer-copyright">
               Copyright © 2024 ezYeats.com - All rights reserved.
          </p>
    </div>
  )
}

export default Footer