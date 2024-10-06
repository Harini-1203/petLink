import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Signin = (props) => {
  const [userName,setUserName]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [errorMsg,setErrorMsg]=useState("")

  const create=async()=>{
    try {
      const newUser = {
        username: userName,
        email: email,
        password: password,
      };

      const response = await axios.post('http://localhost:5000/users/register', newUser);
      setErrorMsg("Now Click Login and Enter details");
      if (response.status === 201) {
        console.log('User signed up successfully:', response.data);
        
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.message);
    }
  }


  const handleSignup= (event)=>{
    event.preventDefault()
    console.log("infunc")
    create() 
  }

  return (
    <div className='signinPage '>
        <div className='signin-left loginPage-left'>
        <form onSubmit={(e)=>{
          handleSignup(e);
        }}>
            <h1>Create Account</h1>
            <input type="text" placeholder='Username' required onChange={(e)=>{
              setUserName(e.target.value)
            }}/>
            <input type="email" placeholder='Email' required onChange={(e)=>{
              setemail(e.target.value)
            }}/>
            <input type="password" placeholder='PassWord' required onChange={(e)=>{
              setpassword(e.target.value)
            }}/>
            {errorMsg && <p className='error-msg'>*{errorMsg}</p>}
            <button type='submit'>SignUP</button>
        </form>
        </div>
        <div className='signin-right loginPage-right'>
            <h1>Already a User</h1>
            <h3>Welcome Back</h3>
            <p>click below to signin</p>
            
            <button onClick={props.onClickFun}>Login</button>
        </div>
    </div>
  )
}

export default Signin