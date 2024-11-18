import React, { useState, useEffect, useRef, useContext } from 'react';  
import { FaUser, FaLock } from "react-icons/fa";  
import { MdEmail } from "react-icons/md";  
import { Link, useNavigate } from 'react-router-dom';  
import AuthContext from './AuthProvider';  
import axios from '../../api/axios';  
import './SignupForm.scss';  

const SIGN_URL = 'user/register/';  

const SignupForm = () => {  
  const { setAuth } = useContext(AuthContext);  
  const userRef = useRef();  
  const errRef = useRef();  

  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [email, setEmail] = useState('');  
  const [errMsg, setErrMsg] = useState('');  
  const [errorMessage, setErrorMessage] = useState('');  
  const [isPasswordValid, setIsPasswordValid] = useState(false);  
  const navigate = useNavigate();  

  useEffect(() => {  
    userRef.current.focus();  
  }, []);  

  useEffect(() => {  
    setErrMsg('');  
  }, [username, password, email]);  

  const validatePassword = (password) => {  
    const hasLetters = /[a-zA-Z]/.test(password);  
    const hasNumbers = /\d/.test(password);  
    const isLongEnough = password.length >= 6;  

    if (!hasLetters && !hasNumbers) {  
      return 'Password must contain letters and numbers';  
    }  
    if (!hasLetters && !isLongEnough ) {  
      return 'Password must also contain letters and at least 6 symbols';  
    }  
    if (!hasNumbers && !isLongEnough) {  
      return 'Password must also contain digits and at least 6 symbols';  
    }  
    if (!hasLetters ) {  
      return 'Password must contain letters';  
    }  
    if (!hasNumbers) {  
      return 'Password must contain digits';  
    }  
    if (!isLongEnough) {  
      return 'Password must be at least 6 characters long';  
    }  
    return '';  
  };  

  const handlePasswordChange = (e) => {  
    const inputPassword = e.target.value;  
    setPassword(inputPassword);  

    const validationMessage = validatePassword(inputPassword);  
    if (validationMessage === '') {  
      setIsPasswordValid(true);  
      setErrorMessage('Valid!');  
    } else {  
      setIsPasswordValid(false);  
      setErrorMessage(validationMessage);  
    }  
  };  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    const validationMessage = validatePassword(password);  
    if (validationMessage) {  
      alert(validationMessage);  
      setPassword('');  
      setErrorMessage('');  
      return;  
    }  

    try {  
      const response = await axios.post(SIGN_URL,  
        JSON.stringify({ user_name: username, email, password }),  
        {  
          headers: { 'Content-Type': 'application/json' },  
          withCredentials: false  
        }  
      );  

      const accessToken = response?.data?.accessToken;  
      // setAuth({ username, email, password, accessToken });  
      setUsername('');  
      setPassword('');  
      setEmail('');  
      navigate('/login');  
    }   
    catch (err) {  
      if (!err?.response) {  
        setErrMsg('An error occurred');  
      } else if (err.response?.status === 400) {  
        setErrMsg('This Username or Email is already existed');  
      } else if (err.response?.status === 401) {  
        setErrMsg('You do not have an account');  
      } else {  
        setErrMsg('Signup Failed');  
      }  
      if (errRef.current) {  
        errRef.current.focus();  
      }  
    }  
  };  

  return (  
    <div className='signup'>  
      <div className='wrapper'>  
        {errMsg && <p ref={errRef} style={{ color: 'red' }} aria-live="assertive">{errMsg}</p>}   
        <form onSubmit={handleSubmit}>   
          <h1>Signup</h1>  
          <div className="input-box">  
            <input  
              type='text'  
              placeholder='Username'  
              value={username}  
              onChange={(e) => setUsername(e.target.value)}  
              ref={userRef}  
              autoComplete="off"  
            />  
            <FaUser className='icon' />  
          </div>  
          <div className="input-box">  
            <input  
              type='email'  
              placeholder='Email'  
              value={email}  
              onChange={(e) => setEmail(e.target.value)}  
            />  
            <MdEmail className='icon' />  
          </div>   
          <div className="input-box">  
            <input  
              type='password'  
              placeholder='Password'  
              value={password}  
              onChange={handlePasswordChange}  
            />  
            <FaLock className='icon' />  
            {errorMessage && (  
              <span style={{ color: isPasswordValid ? 'green' : 'red', margin: '10px', fontWeight: 'bold', fontSize: '11px' }}>  
                {errorMessage}  
              </span>  
            )}  
          </div>   
          <div className="input-box">  
            <input  
              type='password'  
              placeholder='Confirm Password'   
            />  
            <FaLock className='icon' />  
          </div>   
          <button type="submit">Sign up</button>  
          <div className="register-link">  
            <p>Already have an account? <Link to="/login">Log in</Link></p>  
          </div>  
        </form>  
      </div>  
    </div>  
  );  
}  

export default SignupForm;
