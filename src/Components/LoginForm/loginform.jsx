import React from 'react';  
import './LoginForm.scss';  
import { FaUser, FaLock } from "react-icons/fa";  
import { Link, useNavigate } from 'react-router-dom';  
import { useRef, useState, useEffect, useContext } from 'react';  
import AuthContext from './AuthProvider';  
import axios from '../../api/axios';  

const LOGIN_URL = 'user/login/';  

const LoginForm = () => {  
    const { setAuth } = useContext(AuthContext);  
    const userRef = useRef(null);  
    const errRef = useRef();  
      
    const [user, setUser] = useState('');  
    const [pwd, setPwd] = useState('');  
    const [errMsg, setErrMsg] = useState('');  
    const navigate = useNavigate();  
    const [data, setData] = useState(null);
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
    }, [user, pwd]);  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        try {  
            const response = await axios.post(LOGIN_URL,  
                JSON.stringify({ user_name: user, password: pwd }),  
                {  
                    headers: { 'Content-Type': 'application/json' },  
                    withCredentials: false  
                }  
            );  
            console.log(JSON.stringify(response?.data));  
            const accessToken = response?.data?.access_token;  
            localStorage.setItem("token",accessToken);
            setAuth({ user, pwd, accessToken });  
            setUser('');  
            setPwd('');  
            navigate('/Main');  
        } catch (err) {  
            if (!err?.response) {  
                setErrMsg('No Server Response 404 :)');  
            } else if (err.response?.status === 400) {  
                setErrMsg('Missing Username or Password');  
            } else if (err.response?.status === 401) {  
                setErrMsg("You do not have an account");  
            } else {  
                setErrMsg('Login Failed');  
            }  
            errRef.current.focus();  
        }  
    };  

    return (  
        <div className="LoginForm">  
            <div className='wrapperLogin'>  
                <div className="form-container">  
                    <p  
                        style={{ color: 'rgb(234,110,12)' }}  
                        ref={errRef}  
                        className={`${errMsg ? "errmsg" : "offscreen"} no-wrap`}  
                        aria-live='assertive'>  
                        {errMsg}  
                    </p>  
                    <form onSubmit={handleSubmit}>  
                        <h1>Login</h1>  
                        <div className="input-box">  
                            <input  
                                type='text'  
                                id="username"  
                                ref={userRef}  
                                autoComplete="off"  
                                onChange={(e) => setUser(e.target.value)}  
                                value={user}  
                                placeholder='Username'  
                                required  
                            />  
                            <FaUser className='icon' />  
                        </div>  
                        <div className="input-box">  
                            <input  
                                type='password'  
                                id="password"  
                                onChange={(e) => setPwd(e.target.value)}  
                                value={pwd}  
                                placeholder='Password'  
                                required  
                            />  
                            <FaLock className='icon' />  
                        </div>  
                        <div className="remember-forgot">  
                            <label>  
                                <input type="checkbox" />  
                                Remember me  
                            </label>  
                            <a href="/login/forgot">Forgot Password?</a>  
                        </div>  
                        <button type="submit">Login</button>  
                        <div className="register-link">  
                            <p>Don't have an account? <Link to="/signup">Register</Link></p>  
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

export default LoginForm;
