import React, { useContext,useEffect } from 'react'
import Navbar from '../components/Navbar'
import PetList from '../components/PetList'
import AuthContext from '../components/AuthProvider'
import { useNavigate } from 'react-router-dom'


const Main = () => {

  return (
    <div className='main'>
        <Navbar />
        <PetList />
    </div>
  )
}

export default Main