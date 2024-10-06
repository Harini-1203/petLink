import React from 'react';
import { useState,useEffect } from 'react';
import './LoginPage.css'
import Login from '../components/Login';
import Signin from '../components/Signin';

const LoginPage = () => {
  
  const [newUser,setNewUser]=useState(true)  

    function onClickFun(){
        const cur=newUser
        setNewUser(!cur)
    }

  return (
    <div className='LoginPage'>
        <div className='login-img kitty'>
          <img src='./images/kitty.png' />
        </div>
        <div className='container'> 
            {newUser?<Signin onClickFun={onClickFun}/>:<Login onClickFun={onClickFun}/>}
        </div>
    </div>
  )
}

export default LoginPage