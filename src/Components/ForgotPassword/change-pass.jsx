import React, { useState } from 'react';  
import { FaLock } from "react-icons/fa";  
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom  

import "./change-pass.scss";  
import axios from "axios";  

// Capitalized the component name  
const ChangePass = () => {  
    const { userId, token } = useParams(); // Assuming your path is set to /password-reset-confirm/:userId/:token  
    const [password, setPassword] = useState('');  
    const [confirm, setConfirm] = useState('');  
    const [errorMessagePassword, setErrorMessagePassword] = useState('');  
    const [errorMessageConfirm, setErrorMessageConfirm] = useState('');  
    const [isPasswordValid, setIsPasswordValid] = useState(false);  

    const handlePasswordChange = (e) => {  
        const newPassword = e.target.value;  
        setPassword(newPassword);  
        setErrorMessagePassword('');  
    };  

    const handleConfirmPasswordChange = (e) => {  
        const confirmPassword = e.target.value;  
        setConfirm(confirmPassword);  
        setErrorMessageConfirm('');  
    };  

    const validatePassword = (password) => {  
        const minLength = 6;  
        const hasLetter = /[a-zA-Z]/.test(password);  
        const hasNumber = /\d/.test(password);  
        return password.length >= minLength && hasLetter && hasNumber;  
    };  
    
    const handlePasswordBlur = () => {  
        const isValid = validatePassword(password);  
        if (!isValid) {  
            setErrorMessagePassword('Password must be at least 6 characters long and contain both letters and numbers.');  
            setIsPasswordValid(false);  
        } else {  
            setIsPasswordValid(true);  
            setErrorMessagePassword('');  
        }  
    };  

    const handleConfirmBlur = () => {  
        if (confirm !== password) {  
            setErrorMessageConfirm('Passwords do not match.');  
        } else {  
            setErrorMessageConfirm('');  
        }  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        if (isPasswordValid && password === confirm) {  
            try {  
                // Call the API with userId and token  
                const response = await axios.post('https://triptide.pythonanywhere.com/password-reset-confirm/${userId}/${token}/', { password });  
                if (response.status === 200) {  
                    alert('Password reset successfully!');  
                    // Optionally redirect to the login page or reset states  
                } else {  
                    alert('Failed to reset password. Please try again.');  
                }  
            } catch (error) {  
                console.error(error);  
                alert('Failed to reset password, please try again.');  
            }  
        }   
    };  

    return (  
        <div className="changepass">  
            <div className="title-changepass">  
                <span className="key-changepass trip-changepass">T</span>  
                <span className="key-changepass trip-changepass">r</span>  
                <span className="key-changepass trip-changepass">i</span>  
                <span className="key-changepass trip-changepass">p</span>  
                <span className="key-changepass tide-changepass">T</span>  
                <span className="key-changepass tide-changepass">i</span>  
                <span className="key-changepass tide-changepass">d</span>  
                <span className="key-changepass tide-changepass">e</span>  
            </div>  
            <div className="box-changepass">   
                <div className="title-changepass">Reset your password</div>   
                <div className="changepass-image-container"></div>  
                <form onSubmit={handleSubmit}>  
                    <label className="changepass-text">PASSWORD</label>  
                    <div className="input-box-changepass">   
                        <FaLock className='iconchangepass' />   
                        <input  
                            type='password'  
                            placeholder='New Password'  
                            value={password}  
                            onChange={handlePasswordChange}  
                            onBlur={handlePasswordBlur}  
                            className="input-changepass"  
                        />  
                    </div>   
                    {errorMessagePassword && (  
                        <span style={{ color: 'red', margin: '10px 0 0', fontWeight: 'bold', fontSize: '11px' }}>  
                            {errorMessagePassword}  
                        </span>  
                    )}  

                    <label className="changepass-text">NEW PASSWORD CONFIRM</label>                    
                    <div className="input-box-changepass">   
                        <FaLock className='iconchangepass' />  
                        <input  
                            type='password'  
                            placeholder='New Password Confirm'  
                            value={confirm}   
                            onChange={handleConfirmPasswordChange}   
                            onBlur={handleConfirmBlur}  
                            className="input-changepass"  
                        />  
                    </div>   
                    {errorMessageConfirm && (  
                        <span style={{ color: 'red', margin: '10px 0 0', fontWeight: 'bold', fontSize: '11px' }}>  
                            {errorMessageConfirm}  
                        </span>  
                    )}  

                    <button type="submit" className="submit-button">Reset Password</button>  
                </form>  
            </div>  
        </div>  
    );  
};  

export default ChangePass; // Make sure you also export the component correctly