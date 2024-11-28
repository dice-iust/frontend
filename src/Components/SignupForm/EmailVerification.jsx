import React, { useState, useEffect, useRef, useContext } from 'react';  
import { Link, useNavigate } from 'react-router-dom';  
import AuthContext from './AuthProvider';  
import axios from '../../api/axios';  
import './EmailVerification.scss';  
import { MdEmail } from "react-icons/md";
import { TbBackground } from 'react-icons/tb';

const email_URL="send/";
const photo_URL="send/";
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
  const [data, setData] = useState(null);  
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

  useEffect(() => {  
    const token = localStorage.getItem("token");  
    if (!token) {  
      navigate("/login");  
    } else {  
      getFormData();  
    }  
  }, []);  

  useEffect(() => {  
    setErrMsg('');  
  }, [email]);  
  const token = localStorage.getItem("token")

useEffect(()=>{!token ? navigate("/login") : getFormData(); },[])
  const handleEmailChange = (e) => {  
    setEmail(e.target.value);  
  };  

  const handleCodeChange = (e) => {  
    setVerificationCode(e.target.value);  
  };  

  const handleSendCode = async () => {  
    try {  
      // Replace with your actual API endpoint for sending the email verification code  
      // await axios.post('/send-verification-code', { email });  
      // alert('Verification code sent to your email!');  
      setIsCodeInputVisible(true);  
      // Focus on the verification code input field  
      if (emailRef.current) {  
        emailRef.current.focus();  
      }  
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
        setErrMsg('Wrong code');  
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

    const inputsRef = useRef([]);  

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
    <div className='signup'>  
      <div className='wrapper-email'>  
      <div className="form-container">  
        {errMsg && <p ref={errRef} style={{ color: 'red' }} aria-live="assertive">{errMsg}</p>}   
        <form 
        // onSubmit={handleSubmit}
        >   
          <h1>Signup</h1>  
          <div className="input-box">  
            <input 
                  type='text'  
                  placeholder='Email'  
                  value={email}  
                  readOnly
            />  
            <MdEmail className='icon' />  
          </div>   
          <button type="submit">Next</button>  
          <div className="container">  
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