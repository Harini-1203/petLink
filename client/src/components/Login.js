import React,{useContext, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [username,setUsername]=useState('');
  const [password,setpassword]=useState('');
  const [errMsg,setErrMsg]=useState('');
  const navigate=useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
        const response=await axios.post('https://petlink.onrender.com/users/login',
        {
          username,password
        }
      )
      const token=response.data.accestoken;
      // setAuth({username,token});
      localStorage.setItem('token',JSON.stringify(token));
      navigate('/main');
    }catch(err){
      
      setErrMsg(err.response.data.message);
      console.log(errMsg);
      
    }
  }


  return (
    <div className='loginPage '>
        <div className='login-right loginPage-right'>
            <h1>Don't have an Account</h1>
            <h3>Register here</h3>
            <p>click below to SignUp</p>
            <button onClick={props.onClickFun}>SignUp</button>
        </div>
        <div className='login-left loginPage-left'>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="text" placeholder='Username' onChange={
              (e)=>{
                setUsername(e.target.value);
              }
            } required />
            <input type="password" placeholder='PassWord'
              onChange={(e)=>{
                setpassword(e.target.value);
              }}
             required/>
             {errMsg && <p className='error-msg'>*{errMsg}</p>}
             
            <button type='submit'>Signin</button>
        </form>
        </div>
    </div>
  )
}

export default Login