import React, { useState, useEffect, useRef, useContext } from 'react';  
import { FaUser, FaLock } from "react-icons/fa";  
import { MdEmail } from "react-icons/md";  
import { Link, useNavigate } from 'react-router-dom';  
import AuthContext from './AuthProvider';  
import axios from '../../api/axios';  
import './EmailVerification.scss';  

const SIGN_URL = 'user/register/';  
const LOGIN_URL = 'user/login/'; 
const EmailVerification = () => {  
  const { setAuth } = useContext(AuthContext);  
  const userRef = useRef();  
  const errRef = useRef();  
  const [data, setData] = useState(null);  

  const [email, setEmail] = useState('');  
  const [errMsg, setErrMsg] = useState('');  
  const navigate = useNavigate();  

  useEffect(() => {  
    const fetchData = async () => {  
        try {  
            const response = await axios.get(LOGIN_URL);  
            setData(response.data);  
        } catch (error) {  
            console.error("Error fetching data:", error);  
        }  
    };  
    fetchData();  
}, []);   
  useEffect(() => {  
    userRef.current.focus();  
  }, []);  

  useEffect(() => {  
    setErrMsg('');  
  }, [username, password, email,confirm]);  


  const handleSubmit = async (e) => {  
    e.preventDefault();  
    try {  
      const response = await axios.post(SIGN_URL,  
        JSON.stringify({ user_name: username, email, password,confirmPassword: confirm }),  
        {  
          headers: { 'Content-Type': 'application/json' },  
          withCredentials: false  
        }  
      );  
      const accessToken = response?.data?.accessToken;   
      setUsername('');  
      setPassword('');  
      setEmail('');  
      setConfirm('');
      navigate('/login');  
    }   
    catch (err) {  
      if (!err?.response) {  
        setErrMsg('An error occurred');  
      } else if (username && password &&err.response?.status === 400) {  
        setErrMsg('This Username or Email is already existed');  
      } else if (err.response?.status === 401) {  
        setErrMsg('You do not have an account');  
      } else {  
        setErrMsg('Please fill out all required fields!');  
      }  
      if (errRef.current) {  
        errRef.current.focus();  
      }  
    }  
  };  

  return (  
    <div className='signup'>  
      <div className='wrapper'>  
      <div className="form-container">  
        {errMsg && <p ref={errRef} style={{ color: 'red' }} aria-live="assertive">{errMsg}</p>}   
        <form onSubmit={handleSubmit}>   
          <h1>Email Verification</h1>  
          <div className="input-box">  
            <input  
              type='text'  
              placeholder='Username'  
              value={username}  
              onChange={handleUserNameChange}  
              ref={userRef}  
              autoComplete="off"  
            />  
            <FaUser className='icon' /> 
            {errorMessageUserName && (  
              <span style={{ color: isUserNameValid ? 'green' : 'red', margin: '10px', fontWeight: 'bold', fontSize: '11px' }}>  
                {errorMessageUserName}  
              </span>  
            )}   
          </div>  
          <div className="input-box">  
            <input  
                  type='text'  
                  placeholder='Email'  
                  value={email}  
                  onChange={handleEmailChange}  
            />  
            <MdEmail className='icon' />  
                {errorMessageEmail && (  
                  <span style={{ color: errorMessageEmail === 'Valid!' ? 'green' : 'red', margin: '10px', fontWeight: 'bold', fontSize: '11px' }}>  
                    {errorMessageEmail}  
                  </span>  
                )}   
          </div>   
          <div className="input-box">  
            <input  
              type='password'  
              placeholder='Password'  
              value={password}  
              onChange={handlePasswordChange}  
            />  
            <FaLock className='icon' />  
            {errorMessagePassword && (  
              <span style={{ color: isPasswordValid ? 'green' : 'red', margin: '10px', fontWeight: 'bold', fontSize: '11px' }}>  
                {errorMessagePassword}  
              </span>  
            )}  
          </div>   
          <div className="input-box">  
            <input  
              type='password'  
              placeholder='Confirm Password'  
              value={confirm} 
              onChange={handleConfirmPasswordChange} 
            />  
            <FaLock className='icon' />  
            {errorMessageConfirm && (  
              <span style={{ color: errorMessageConfirm ? 'red' : 'green', margin: '10px', fontWeight: 'bold', fontSize: '11px' }}>  
                {errorMessageConfirm}  
              </span>  
            )}  
          </div>   
          <button type="submit">Signup</button>  
          <div className="register-link">  
            <p>Already have an account? <Link to="/login">Login</Link></p>  
          </div>  
        </form> 
        </div> 
        <div className="image-container">   
                {data && data.photo && (  
                    <img  
                        src={data.photo}  
                        alt="travel"  
                    />  
                )}
                </div> 
      </div>  
    </div>  
  );  
}  

export default EmailVerification;
