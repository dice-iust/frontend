import React, { useState } from 'react';  
import { FaLock } from "react-icons/fa";  
import "./change-pass.scss";  
import axios from "axios"; // Import axios if you plan to use it later for submitting the password  

const EmailSent = () => {  
    const [password, setPassword] = useState('');  
    const [confirm, setConfirm] = useState('');  
    const [errorMessagePassword, setErrorMessagePassword] = useState('');  
    const [errorMessageConfirm, setErrorMessageConfirm] = useState('');  
    const [isPasswordValid, setIsPasswordValid] = useState(false);  

    const handlePasswordChange = (e) => {  
        const newPassword = e.target.value;  
        const isValid = validatePassword(newPassword);  
        setPassword(newPassword);  
        
        if (isValid) {  
            setErrorMessagePassword('');  
            setIsPasswordValid(true);  
        } else {  
            setErrorMessagePassword('Password must be at least 6 characters long and contain both letters and numbers.');  
            setIsPasswordValid(false);  
        }  
    };  

    const handleConfirmPasswordChange = (e) => {  
        const confirmPassword = e.target.value;  
        setConfirm(confirmPassword);  
        
        if (confirmPassword !== password) {  
            setErrorMessageConfirm('Passwords do not match.');  
        } else {  
            setErrorMessageConfirm('');  
        }  
    };  

    const validatePassword = (password) => {  
        const minLength = 6;  
        const hasLetter = /[a-zA-Z]/.test(password);  
        const hasNumber = /\d/.test(password);  
        return password.length >= minLength && hasLetter && hasNumber;  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        if (isPasswordValid && password === confirm) {  
            try {  
                // Make a request to submit the new password here  
                // Example: await axios.post('/your/api/endpoint', { password });  
                alert('Password reset successfully!'); // Placeholder success message  
            } catch (error) {  
                console.error(error);  
                alert('Failed to reset password.'); // Placeholder error message  
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
                <form onSubmit={handleSubmit}>  
                    <label className="changepass-text">New Password</label>  
                    <div className="input-box-changepass">   
                        <FaLock className='iconchangepass' />   
                        <input  
                            type='password'  
                            placeholder='Password'  
                            value={password}  
                            onChange={handlePasswordChange}  
                            className="input-changepass"  
                        />  
                    </div>   
                    {errorMessagePassword && (  
                        <span style={{ color: 'red', margin: '10px 0 0', fontWeight: 'bold', fontSize: '11px' }}>  
                            {errorMessagePassword}  
                        </span>  
                    )}  

                    <label className="changepass-text">Confirm Password</label>                    <div className="input-box-changepass">   
                        <FaLock className='iconchangepass' />  
                        <input  
                            type='password'  
                            placeholder='Confirm Password'  
                            value={confirm}   
                            onChange={handleConfirmPasswordChange}   
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

export default EmailSent;