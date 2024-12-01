import React, { useState } from 'react';  
import { FaLock, FaKey } from "react-icons/fa";  
import { useParams, useLocation } from 'react-router-dom';  
import { useNavigate } from 'react-router-dom';  
import "./change-pass.scss";  
import axios from "axios";  

const ChangePass = () => {  
    const location = useLocation();  
    const { email: resetEmail, verificationCode: sentVerificationCode } = location.state || {};   
    const [email, setEmail] = useState(resetEmail || '');  
    const [verificationCode, setVerificationCode] = useState('');  
    const [password, setPassword] = useState('');  
    const [confirm, setConfirm] = useState('');  
    const [errorMessagePassword, setErrorMessagePassword] = useState('');  
    const [errorMessageConfirm, setErrorMessageConfirm] = useState('');  
    const [errorMessageVerification, setErrorMessageVerification] = useState('');  
    const [isPasswordValid, setIsPasswordValid] = useState(false);  
    const navigate = useNavigate();  

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

    const handleVerificationCodeChange = (e) => {  
        const code = e.target.value;  
        setVerificationCode(code);  
        setErrorMessageVerification('');  
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

    const validateVerificationCode = (code) => {  
        return code.length === 6 && /^\d+$/.test(code);  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        if (isPasswordValid && password === confirm && validateVerificationCode(verificationCode)) {  
            if (verificationCode !== sentVerificationCode) {  
                setErrorMessageVerification('The verification code is incorrect.');  
                return;  
            }  

            try {  
                const response = await axios.post(`https://triptide.pythonanywhere.com/password-reset-verify/`, { email, password });  
                if (response.status === 200) {  
                    alert('Password reset successfully!');  
                    navigate('/login');  
                } else {  
                    alert('Failed to reset password. Please try again.');  
                }  
            } catch (error) {  
                console.error(error);  
                alert('Failed to reset password, please try again.');  
            }  
        } else {  
            if (!validateVerificationCode(verificationCode)) {  
                setErrorMessageVerification('Please enter a valid 6-digit verification code.');  
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

            <div className="info-box">  
                An email was sent to<br />  
                <strong>{email}</strong> with<br />  
                password reset instructions.  
                <br />  
                <strong>Verification Code:</strong> <span style={{ color: 'blue' }}>{sentVerificationCode}</span>  
            </div>  

            <div className="box-changepass">   
                <div className="title-changepass">Reset your password</div>   
                <div className="changepass-image-container"></div>  
                <form onSubmit={handleSubmit}>  
                    <label className="changepass-text">VERIFICATION CODE</label>                    
                    <div className="input-box-changepass">   
                        <FaKey className='iconchangepass' />  
                        <input  
                            type='text'  
                            placeholder='Enter 6-digit code'  
                            value={verificationCode}   
                            onChange={handleVerificationCodeChange}   
                            className="input-changepass"  
                        />  
                    </div>   
                    {errorMessageVerification && (  
                        <span style={{ color: 'red', margin: '10px 0 0', fontWeight: 'bold', fontSize: '11px' }}>  
                            {errorMessageVerification}  
                        </span>  
                    )}  

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

export default ChangePass;