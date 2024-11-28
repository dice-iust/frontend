import React, { useState, useEffect, useRef, useContext } from 'react';  
import { Link, useNavigate } from 'react-router-dom';  
import AuthContext from './AuthProvider';  
import axios from '../../api/axios';  
import './EmailVerification.scss';  
import { MdEmail } from "react-icons/md";  

const email_URL = "send/";  
const photo_URL = "send/";  

const EmailVerification = () => {  
  const { setAuth } = useContext(AuthContext);  
  const emailRef = useRef();  
  const errRef = useRef();  
  const [email, setEmail] = useState('');  
  const [verificationCode, setVerificationCode] = useState('');  
  const [errMsg, setErrMsg] = useState('');  
  const [isSuccess, setIsSuccess] = useState(false);   
  const [successMsg, setSuccessMsg] = useState('');  
  const navigate = useNavigate();  
  const [data, setData] = useState(null);  
  const inputsRef = useRef([]);  

  // Fetch initial data  
  useEffect(() => {  
    const fetchData = async () => {  
      try {  
        const response = await axios.get(photo_URL);  
        setData(response.data);  
      } catch (error) {  
        console.error("Error fetching data:", error);  
      }  
    };  
    fetchData();  
  }, []);  

  // Get email from API  
  const getFormData = async () => {  
    try {  
      const response = await axios.get("https://triptide.pythonanywhere.com/send/", {  
        headers: { Authorization: localStorage.getItem("token") },  
      });  
      setEmail(response.data.email);  
    } catch (error) {  
      console.error("Error fetching data:", error);  
    }  
  };  

  // Check token and fetch email  
  useEffect(() => {  
    const token = localStorage.getItem("token");  
    if (!token) {  
      navigate("/login");  
    } else {  
      getFormData();  
    }  
  }, []);  

  // Clear messages on email change  
  useEffect(() => {  
    setErrMsg('');   
    setSuccessMsg('');   
  }, [email]);  

  // Handle code verification  
  const handleVerifyCode = async (e) => {  
    e.preventDefault(); // Prevent default form submission  
    const code = inputsRef.current.map(input => input.value).join(''); // Collect verification code  

    console.log("Verification Code:", code); // Log the verification code for debugging  

    try {  
      const response = await axios.post("https://triptide.pythonanywhere.com/send/",   
        {   
            verification_code: code   
        },   
        {   
            headers: { Authorization: localStorage.getItem("token") } 
        }  
    ); 
        
        console.log("Response:", response.data); // Log the response for debugging  
        
        if (response.data.success) {  
            setIsSuccess(true);  
            setSuccessMsg('Verified successfully!');  
            setTimeout(() => {  
                navigate('/Main');   
            }, 5000);  
        } else {  
            setErrMsg('Oops! The code is incorrect.');  
        }  
    } catch (error) {  
        console.error("Error verifying code:", error.response ? error.response.data : error.message);  
        setErrMsg(error.message);  
    }  
};

  const handleInput = (e, index) => {  
    const target = e.target;  
    const val = target.value;  

    if (isNaN(val) || val.length > 1) {  
      target.value = "";  
      return;  
    }  

    if (val !== "") {  
      const nextInput = inputsRef.current[index + 1];  
      if (nextInput) {  
        nextInput.focus();  
      }  
    }  
  };  

  const handleKeyUp = (e, index) => {  
    const key = e.key.toLowerCase();  

    if (key === "backspace" || key === "delete") {  
      e.target.value = "";  
      const prevInput = inputsRef.current[index - 1];  
      if (prevInput) {  
        prevInput.focus();  
      }  
    }  
  };  
  
  return (  
    <div className='email'>  
      <div className='wrapper-email'>  
        <div className="form-container-email">  
          {errMsg && <p ref={errRef} style={{ color: 'red' }} aria-live="assertive">{errMsg}</p>}   
          {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}    
          <form onSubmit={handleVerifyCode}>   
            <h1>Email Verification</h1>  
            <div className="input-box">  
              <input   
                type='text'  
                placeholder='Email'  
                value={email}  
                readOnly  
              />  
              <MdEmail className='icon' />  
            </div>   
            <h3 style={{ textAlign: 'center' }}>  
              We have sent a verification code to this email. Please enter the code below.  
            </h3>  
            <div className="container-email">  
              <div id="inputs" className="inputs">  
                {[...Array(4)].map((_, index) => (  
                  <input  
                    key={index}  
                    className="input"  
                    type="text"  
                    inputMode="numeric"  
                    maxLength="1"  
                    ref={el => inputsRef.current[index] = el}  
                    onInput={e => handleInput(e, index)}  
                    onKeyUp={e => handleKeyUp(e, index)}  
                  />  
                ))}  
              </div>  
            </div>  
            <div style={{ display: 'flex', justifyContent: 'center' }}>  
              <button type="submit" className='button'>Verify</button>  
            </div>  
            <div className="register-link">  
              <p>Want to edit email? <Link to="/signup">Signup</Link></p>  
            </div>  
          </form>   
        </div>   
        <div className="image-container-email">   
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