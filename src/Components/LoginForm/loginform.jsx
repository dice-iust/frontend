import React from 'react'
import './LoginForm.scss'
import { FaUser,FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {useRef,useState,useEffect,useContext} from 'react';
import AuthContext from './AuthProvider';
import axios from '../../api/axios';

const LOGIN_URL ='user/login/'
const LoginForm = () => {
    const {setAuth} =useContext(AuthContext);
    const userRef=useRef(null);
    const errRef=useRef();

    const [user,setUser]=useState('');
    const[pwd,setPwd]=useState('');
    const[errMsg,setErrMsg]=useState('');
    const[success,setSuccess]=useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[])
    useEffect(()=>{
        setErrMsg('');
    },[user,pwd])

    const handleSubmit =async (e) => {
      e.preventDefault();
      try{
        const response = await axios.post(LOGIN_URL,
          JSON.stringify({user_name : user,password : pwd}),
          {
            headers :{'Content-Type':'application/json'},
            withCredentials:false
          }
        );
        console.log(JSON.stringify(response?.data));
        const accessToken=response?.data?.accessToken;
        setAuth({user,pwd,accessToken});
        setUser('');
        setPwd('');
        setSuccess(true);
      } catch(err){
          if(!err?.response){
            setErrMsg('No Server Response 404 :)');
          }else if(err.response?.status===400){
            setErrMsg('Missing Username or Password');
          }else if(err.response?.status===401){
            setErrMsg('You do not have an account');
          }else{
            setErrMsg('Login Failed');
          }
          errRef.current.focus();
      }


    }
  return (
    <>
    {success ? (
        <section>
          <h1>Logged in successfully!</h1>
          <br/>
          <p>
            <a href='#'>Go to Home</a>
          </p>
        </section>
    ):(
  <div className='wrapper'>
    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>  
        <div className="input-box">
          <input type='text' id="username" ref={userRef} autoComplete="off" onChange={(e)=>setUser(e.target.value)} value={user} placeholder='Username' required/>
          <FaUser className='icon'/>
        </div>
        <div className="input-box">
          <input type='password' id="password" onChange={(e)=>setPwd(e.target.value)} value={pwd} placeholder='Password' required/>
          <FaLock className='icon' />
        </div>
        <div className="remember-forgot">
          <label> <input type="checkbox" /> Remember me </label>
          <a href="#">Forgot Password?</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>Don't have an account?<Link to="/signup">Register</Link></p>
        </div>
      </form>     
  </div>
    )}
    </>
  )
}

export default LoginForm

