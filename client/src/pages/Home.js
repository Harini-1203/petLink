
import React from 'react'
import Hero from '../components/Hero'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div className='Home'>
        <Hero />
        <div>
            <Link to='/login' >
                <button>click here to Login/Register</button>
            </Link>
        </div>
    </div>
  )
}

export default Home
