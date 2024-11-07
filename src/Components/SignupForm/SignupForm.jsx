import React from 'react';
import './SignupForm.css';  
import { FaUser,FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from 'react'; 
import { Link } from 'react-router-dom';

const SignupForm = () => {

    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  
  const [email, setEmail] = useState('');
  
  const [isPasswordValid, setIsPasswordValid] = useState(false);  
  const [errorMessage, setErrorMessage] = useState('');  

  const validatePassword = (password) => {  
    const regex = /^(?=.*\d)[A-Za-z\d]{6,}$/;  
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
      setErrorMessage('Invalid!');  
    }  
  };  

  const handleSubmit = (e) => {  
    e.preventDefault();
    if (!validatePassword(password)) {  
      alert("Password must have letters and numbers, and its length must be at least 6!");  
      setPassword('');   
      setErrorMessage('');   
    } else {  
      alert("Signed up successfully!");  
    }  
  };  

  return (
    <div className='wrapper'>  
        <form onSubmit={handleSubmit}>  
            <h1>Sign Up</h1>  
            <div className="input-box">  
                <input   
                type='text'   
                placeholder='Username'   
                value={username}   
                onChange={(e) => setUsername(e.target.value)}
                required/>  
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
                <span style={{ color: isPasswordValid ? 'green' : 'red' , margin: '10px', fontweight: 'bold'}}>  
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
                required/>
                <MdEmail className='icon'/>
            </div>

            <button type="submit">Sign Up</button>

            <div className="register-link">
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </div>

        </form> 
    </div>  
  );
}

export default SignupForm;
