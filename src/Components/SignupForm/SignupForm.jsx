import React, { useState, useEffect, useRef, useContext } from 'react';  
import { FaUser, FaLock } from "react-icons/fa";  
import { MdEmail } from "react-icons/md";  
import { Link, useNavigate } from 'react-router-dom';  
import AuthContext from './AuthProvider';  
import axios from '../../api/axios';  
import './SignupForm.scss';  

const SIGN_URL = 'user/register/';  
const LOGIN_URL = 'user/login/'; 
const SignupForm = () => {  
  const { setAuth } = useContext(AuthContext);  
  const userRef = useRef();  
  const errRef = useRef();  
  const [data, setData] = useState(null);  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [email, setEmail] = useState('');  
  const [confirm, setConfirm] = useState('');  
  const [errMsg, setErrMsg] = useState('');  
  const [errorMessagePassword, setErrorMessagePassword] = useState('');  
  const [errorMessageUserName, setErrorMessageUserName] = useState(''); 
  const [errorMessageEmail, setErrorMessageEmail] = useState(''); 
  const [errorMessageConfirm, setErrorMessageConfirm] = useState(''); 
  const [isPasswordValid, setIsPasswordValid] = useState(false);  
  const [isUserNameValid, setisUserNameValid] = useState(false);  
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

  const validatePassword = (password) => {  
    const hasLetters = /[a-zA-Z]/.test(password);  
    const hasNumbers = /\d/.test(password);  
    const isLongEnough = password.length >= 6;   
      if(!password)  {
        return 'Please fillout this field';
      }
    if (!hasLetters && !hasNumbers) {  
      return 'Password must contain letters and numbers';  
    }  
    if (!hasLetters && !isLongEnough ) {  
      return 'must also contain letters and at least 6 symbols';  
    }  
    if (!hasNumbers && !isLongEnough) {  
      return 'must also contain digits and at least 6 symbols';  
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

  const validateUsername = (username) => { 
    const isLongEnough_username = username.length >= 3;  
    if (!username) {  
      return 'Please fill out this field';  
    }  
    if (!isLongEnough_username) {  
      return 'Username must be at least 3 characters';  
    }  
    return '';  
  };  
    const validateEmail = (email) => {  
      if (!email) {  
        return 'Please fill out this field';  
      }  
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
      if (!emailPattern.test(email)) {  
        return 'Not a valid email! example: email@example.com';  
      }  
      return '';  
    };  
  const handlePasswordChange = (e) => {  
    const inputPassword = e.target.value;  
    setPassword(inputPassword);  

    const validationMessage = validatePassword(inputPassword);  
    if (validationMessage === '') {  
      setIsPasswordValid(true);  
      setErrorMessagePassword('Valid!');  
    } else {  
      setIsPasswordValid(false);  
      setErrorMessagePassword(validationMessage);  
    }  
  };  
  const handleUserNameChange = (e) => {  
    const inputusername = e.target.value;  
    setUsername(inputusername);  

    const validationMessage = validateUsername(inputusername);  
    if (validationMessage === '') {  
      setisUserNameValid(true);  
      setErrorMessageUserName('Valid!');  
    } else {  
      setisUserNameValid(false);  
      setErrorMessageUserName(validationMessage);  
    }  
  }; 
      const handleEmailChange = (e) => {  
        const inputEmail = e.target.value;  
        setEmail(inputEmail);  

        const validationMessage = validateEmail(inputEmail);  
        if (validationMessage === '') {  
          setErrorMessageEmail('Valid!');  
        } else {  
          setErrorMessageEmail(validationMessage);  
        }  
      };  
      const handleConfirmPasswordChange = (e) => {  
        const inputConfirm = e.target.value;  
        setConfirm(inputConfirm);  
        if(!e){
          setErrorMessageConfirm('Please fill out this field');
        }
        if (inputConfirm !== password) {  
          setErrorMessageConfirm('Passwords do not match');  
        } else {  
          setErrorMessageConfirm('');  
        }  
      };  
  const handleSubmit = async (e) => {  
    e.preventDefault();  

        const usernameError = validateUsername(username);  
        const emailError = validateEmail(email);  
        const passwordError = validatePassword(password);  

        if (usernameError) {  
          setErrorMessageUserName(usernameError);    
        } else {  
          setErrorMessageUserName('');  
        }  

        if (emailError) {  
          setErrorMessageEmail(emailError);  
        } else {  
          setErrorMessageEmail('');  
        }  

        if (passwordError) {  
          setErrorMessagePassword(passwordError);  
        } else {  
          setErrorMessagePassword('');  
        }  

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
      navigate('/signup/email_verification');  
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
          <h1>Signup</h1>  
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
          <button type="submit">Next</button>  
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

export default SignupForm;
