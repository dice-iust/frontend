import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './AuthProvider';
import axios from '../../api/axios';
import './SignupForm.css';

const SIGN_URL = 'user/register';

const SignupForm = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password, email]);

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
      setErrorMessage('Invalid! Password must have at least 6 characters including letters and numbers.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      alert("Password must have letters and numbers, and its length must be at least 6!");
      setPassword('');
      setErrorMessage('');
      return; // Prevent submission
    }

    try {
      console.log("Submitting:", { user_name: username, email, password }); // Debug log

      const response = await axios.post(SIGN_URL, 
        JSON.stringify({ user_name: username, email, password }), 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        }
      );

      console.log("Response Data:", response?.data);
      const accessToken = response?.data?.accessToken;
      setAuth({ username, email, password, accessToken });
      setUsername('');
      setPassword('');
      setEmail('');
      navigate('/login'); 
    } catch (err) {
      console.error("Error response:", err.response); // Debug log for error response
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username, Email, or Password');
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
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
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

        {errMsg && <p ref={errRef} style={{ color: 'red' }}>{errMsg}</p>}

        <div className="register-link">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;

// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { FaUser, FaLock } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { Link, useNavigate } from 'react-router-dom';
// import AuthContext from './AuthProvider';
// import axios from '../../api/axios';
// import './SignupForm.css';

// const SIGN_URL = 'user/register';

// const SignupForm = () => {
//   const { setAuth } = useContext(AuthContext);
//   const userRef = useRef();
//   const errRef = useRef();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [errMsg, setErrMsg] = useState('');
//   const [isPasswordValid, setIsPasswordValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userRef.current) {
//       userRef.current.focus();
//     }
//   }, []);

//   useEffect(() => {
//     setErrMsg('');
//   }, [username, password, email]);

//   const validatePassword = (password) => {
//     const regex = /^(?=.*\d)[A-Za-z\d]{6,}$/;
//     return regex.test(password);
//   };

//   const handlePasswordChange = (e) => {
//     const inputPassword = e.target.value;
//     setPassword(inputPassword);

//     if (validatePassword(inputPassword)) {
//       setIsPasswordValid(true);
//       setErrorMessage('Valid!');
//     } else {
//       setIsPasswordValid(false);
//       setErrorMessage('Invalid! Password must have at least 6 characters including letters and numbers.');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validatePassword(password)) {
//       alert("Password must have letters and numbers, and its length must be at least 6!");
//       setPassword('');
//       setErrorMessage('');
//       return; // Prevent submission
//     }

//     try {
//       const response = await axios.post(SIGN_URL, 
//         JSON.stringify({ user_name: username, email, password }), 
//         {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: false
//         }
//       );

//       console.log(JSON.stringify(response?.data));
//       const accessToken = response?.data?.accessToken;
//       setAuth({ username, email,password, accessToken });
//       setUsername('');
//       setPassword('');
//       setEmail('');
//       navigate('/login'); 
//     } catch (err) {
//       if (!err?.response) {
//         setErrMsg('No Server Response 404 :)');
//       } else if (err.response?.status === 400) {
//         setErrMsg('Missing Username, Email, or Password');
//       } else if (err.response?.status === 401) {
//         setErrMsg('You do not have an account');
//       } else {
//         setErrMsg('Signup Failed');
//       }
//       if (errRef.current) {
//         errRef.current.focus();
//       }
//     }
//   };

//   return (
//     <div className='wrapper'>
//       <form onSubmit={handleSubmit}>
//         <h1>Sign Up</h1>
//         <div className="input-box">
//           <input
//             type='text'
//             placeholder='Username'
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             ref={userRef}
//             autoComplete="off"
//             required
//           />
//           <FaUser className='icon' />
//         </div>

//         <div className="input-box">
//           <input
//             type='password'
//             placeholder='Password'
//             value={password}
//             onChange={handlePasswordChange}
//             required
//           />
//           <FaLock className='icon' />
//           {errorMessage && (
//             <span style={{ color: isPasswordValid ? 'green' : 'red', margin: '10px', fontWeight: 'bold' }}>
//               {errorMessage}
//             </span>
//           )}
//         </div>

//         <div className="input-box">
//           <input
//             type='email'
//             placeholder='Email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <MdEmail className='icon' />
//         </div>

//         <button type="submit">Sign Up</button>

//         {errMsg && <p ref={errRef} style={{ color: 'red' }}>{errMsg}</p>}

//         <div className="register-link">
//           <p>Already have an account? <Link to="/login">Log in</Link></p>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default SignupForm;


// import React from 'react';
// import './SignupForm.css';  
// import { FaUser,FaLock } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { useState } from 'react'; 
// import { Link } from 'react-router-dom';
// import {useRef,useEffect,useContext} from 'react';
// import AuthContext from './AuthProvider';
// import axios from '../../api/axios';
// const SIGN_URL ='user/register/'
// const SignupForm = () => {
//   const {setAuth} =useContext(AuthContext);
//   const userRef=useRef(null);
//   const errRef=useRef();

//   const [user,setUser]=useState('');
//   const[pwd,setPwd]=useState('');
//   const[errMsg,setErrMsg]=useState('');
//   const[success,setSuccess]=useState(false);

//   useEffect(()=>{
//       userRef.current.focus();
//   },[])
//   useEffect(()=>{
//       setErrMsg('');
//   },[user,pwd])
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');  
//   const [email, setEmail] = useState('');
  
//   const [isPasswordValid, setIsPasswordValid] = useState(false);  
//   const [errorMessage, setErrorMessage] = useState('');  

//   const validatePassword = (password) => {  
//     const regex = /^(?=.*\d)[A-Za-z\d]{6,}$/;  
//     return regex.test(password);  
//   };  

//   const handlePasswordChange = (e) => {  
//     const inputPassword = e.target.value;  
//     setPassword(inputPassword);  
    
//     if (validatePassword(inputPassword)) {  
//       setIsPasswordValid(true);  
//       setErrorMessage('Valid!');  
//     } else {  
//       setIsPasswordValid(false);  
//       setErrorMessage('Invalid!');  
//     }  
//   };  

//   const handleSubmit = async (e) => {  
//     e.preventDefault();
//     if (!validatePassword(password)) {  
//       alert("Password must have letters and numbers, and its length must be at least 6!");  
//       setPassword('');   
//       setErrorMessage('');   
//     } else {  
//       alert("Signed up successfully!");  
//     }  
//     try{
//       const response = await axios.post(SIGN_URL,
//         JSON.stringify({user_name : user,email,password : pwd}),
//         {
//           headers :{'Content-Type':'application/json'},
//           withCredentials:false
//         }
//       );
//       console.log(JSON.stringify(response?.data));
//       const accessToken=response?.data?.accessToken;
//       setAuth({user,pwd,accessToken});
//       setUser('');
//       setPwd('');
//       setSuccess(true);
//     } catch(err){
//         if(!err?.response){
//           setErrMsg('No Server Response 404 :)');
//         }else if(err.response?.status===400){
//           setErrMsg('Missing Username or Password');
//         }else if(err.response?.status===401){
//           setErrMsg('You do not have an account');
//         }else{
//           setErrMsg('Login Failed');
//         }
//         errRef.current.focus();
//     }
//   };  

//   return (
//     <div className='wrapper'>  
//         <form onSubmit={handleSubmit}>  
//             <h1>Sign Up</h1>  
//             <div className="input-box">  
//                 <input   
//                 type='text'   
//                 placeholder='Username'   
//                 value={username}   
//                 onChange={(e) => setUsername(e.target.value)}
//                 ref={userRef} 
//                 autoComplete="off" 
//                 required/>  
//                 <FaUser className='icon' />  
//             </div>  

//             <div className="input-box">  
//                 <input   
//                 type='password'   
//                 placeholder='Password'   
//                 value={password}   
//                 onChange={handlePasswordChange}   
//                 required   
//                 />  
//                 <FaLock className='icon' />  
//                 {errorMessage && (  
//                 <span style={{ color: isPasswordValid ? 'green' : 'red' , margin: '10px', fontweight: 'bold'}}>  
//                     {errorMessage}  
//                 </span>  
//                 )}  
//             </div>

//             <div className="input-box">
//                 <input 
//                 type='email' 
//                 placeholder='Email'
//                 value={email}   
//                 onChange={(e) => setEmail(e.target.value)}
//                 required/>
//                 <MdEmail className='icon'/>
//             </div>

//             <button type="submit">Sign Up</button>

//             <div className="register-link">
//                 <p>Already have an account? <Link to="/login">Log in</Link></p>
//             </div>

//         </form> 
//     </div>  
//   );
// }

// export default SignupForm;