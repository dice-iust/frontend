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
  const   
 [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');   

  }, [username, password, email]);

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    if (validatePassword(inputPassword)) {
      setIsPasswordValid(true);
      setErrorMessage('Valid!');
    } else {
      setIsPasswordValid(false);
      setErrorMessage('Invalid! Password must have at least 6 characters including letters and numbers.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      alert("Password must have letters and numbers, and its length must be at least 6!");
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
        setErrMsg('An error occurred');} 
      else if (err.response?.status === 400) {
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
      <form onSubmit={handleSubmit}> 
        {errMsg && <p ref={errRef} style={{ color: 'red' }} aria-live="assertive">{errMsg}</p>} 
        <h1>Sign Up</h1>  
        <div className="input-box">  
          <input  
            type='text'  
            placeholder='Username'  
            value={username}  
            onChange={(e) => setUsername(e.target.value)}  
            ref={userRef}  
            autoComplete="off"  
            required  
          />  
          <FaUser className='icon' />  
        </div>  

        <div className="input-box">  
          <input  
            type='password'  
            placeholder='Password'  
            value={password}  
            onChange={handlePasswordChange}  
            required  
          />  
          <FaLock className='icon' />  
          {errorMessage && (  
            <span style={{ color: isPasswordValid ? 'green' : 'red', margin: '10px', fontWeight: 'bold' }}>  
              {errorMessage}  
            </span>  
          )}  
        </div>  

        <div className="input-box">  
          <input  
            type='email'  
            placeholder='Email'  
            value={email}  
            onChange={(e) => setEmail(e.target.value)}  
            required  
          />  
          <MdEmail className='icon' />  
        </div>  

        <button type="submit">Sign Up</button>  

        {errMsg && <p ref={errRef} style={{ color: 'red' }} aria-live="assertive">{errMsg}</p>}  

        <div className="register-link">  
          <p>Already have an account? <Link to="/login">Log in</Link></p>  
        </div>  
      </form>  
    </div>  
  </div>
  );  
}  

export default SignupForm;