import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <div className='hero'>
        <div className='logo'>
        <img src="./images/logo.png" alt="logo" />  
        </div>
        <div className='left'>
            <h1>Find a Pet or Give a Stray a Home</h1>
            <p>Whether you're looking to bring a new pet into your family or help a stray find a forever home, 
            our platform connects you with loving pets in need of care. 
            Browse, adopt, or sell pets with ease, and join our community dedicated to the well-being of every animal</p>
        </div>
        <div className='right'>
            <img src='./images/home.png' alt='home-image'/>
        </div>
    </div>
  )
}

export default Hero