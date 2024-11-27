import React, { useState, useEffect, useRef, useContext } from 'react';  
import { MdEmail } from "react-icons/md";  
import { Link, useNavigate } from 'react-router-dom';  
import AuthContext from './AuthProvider';  
import axios from '../../api/axios';  
import './EmailVerification.scss';  

const EmailVerification = () => {  
  const { setAuth } = useContext(AuthContext);  
  const emailRef = useRef();  
  const errRef = useRef();  
  const [email, setEmail] = useState('');  
  const [verificationCode, setVerificationCode] = useState('');  
  const [errMsg, setErrMsg] = useState('');  
  const [isCodeInputVisible, setIsCodeInputVisible] = useState(false);  
  const [isSuccess, setIsSuccess] = useState(false);  
  const navigate = useNavigate();  

  // useEffect(() => {  
  //   emailRef.current.focus();  
  // }, []);  

  useEffect(() => {  
    setErrMsg('');  
  }, [email]);  

  const handleEmailChange = (e) => {  
    setEmail(e.target.value);  
  };  

  const handleCodeChange = (e) => {  
    setVerificationCode(e.target.value);  
  };  

  const handleSendCode = async () => {  
    try {  
      // Replace with your actual API endpoint for sending the email verification code  
      await axios.post('/send-verification-code', { email });  
      alert('Verification code sent to your email!');  
      setIsCodeInputVisible(true);  
    } catch (error) {  
      console.error("Error sending verification code:", error);  
      setErrMsg('Failed to send verification code.');  
      if (errRef.current) {  
        errRef.current.focus();  
      }  
    }  
  };  

  const handleVerifyCode = async () => {  
    try {  
      // Replace with your actual API endpoint for verifying the code  
      const response = await axios.post('/verify-code', { email, code: verificationCode });  
      if (response.data.success) {  
        setIsSuccess(true);  
        setTimeout(() => {  
          navigate('/main'); // Navigate to the main page after 5 seconds  
        }, 5000);  
      } else {  
        setErrMsg('Not match');  
        setTimeout(() => {  
          navigate('/signup'); // Navigate to signup page if not matched  
        }, 5000);  
      }  
    } catch (error) {  
      console.error("Error verifying code:", error);  
      setErrMsg('Verification failed.');  
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
          <h1>Email Verification</h1>  
          <p>Please click on the button to send a code to verify your email.</p>  
          <button type="button" onClick={handleSendCode}>  
            Send Verification Code  
          </button>  
          
          {isCodeInputVisible && (  
            <div className="input-box">  
              <input  
                type='text'  
                placeholder='Enter Verification Code'  
                value={verificationCode}  
                onChange={handleCodeChange}  
                ref={emailRef}  
              />  
              <button type="button" onClick={handleVerifyCode}>  
                Verify Code  
              </button>  
            </div>  
          )}  

          {isSuccess && <p style={{ color: 'green' }}>Verification successful!</p>}  
          <div className="register-link">  
            <p>Already have an account? <Link to="/login">Login</Link></p>  
          </div>  
        </div>   
      </div>  
    </div>  
  );  
}  

export default EmailVerification;