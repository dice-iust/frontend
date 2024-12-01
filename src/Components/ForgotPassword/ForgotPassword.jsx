import React, { useState } from 'react';  
import { FiInfo } from 'react-icons/fi';  
import { FaLock, FaKey } from "react-icons/fa";  
import axios from "axios";  
import "./ForgotPassword.scss";  

const ForgotPassword = () => {  
    const [email, setEmail] = useState('');  
    const [error, setError] = useState('');  
    const [verificationCode, setVerificationCode] = useState('');  
    const [newPassword, setNewPassword] = useState('');  
    const [confirmPassword, setConfirmPassword] = useState('');  
    const [errorMessagePassword, setErrorMessagePassword] = useState('');  
    const [errorMessageConfirm, setErrorMessageConfirm] = useState('');  
    const [errorMessageVerification, setErrorMessageVerification] = useState('');  
    const [loading, setLoading] = useState(false);  
    const [showFields, setShowFields] = useState(false);  

    const validateEmail = (email) => {  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;  
        return emailRegex.test(email);  
    };  
    
    const validatePassword = (password) => {  
        const minLength = 6;  
        const hasLetter = /[a-zA-Z]/.test(password);  
        const hasNumber = /\d/.test(password);  
        return password.length >= minLength && hasLetter && hasNumber;  
    };  

    const handleChangeEmail = (e) => {  
        setEmail(e.target.value);  
        setError('');  
    };    

    const handleResetPassword = async (e) => {  
        e.preventDefault();  
        setLoading(true);  

        if (!validateEmail(email)) {  
            setError('Invalid email. Please enter an email as name@email.com');  
            setLoading(false);  
            return;   
        }  
    
        try {  
            const response = await axios.post('https://triptide.pythonanywhere.com/password-reset-request/', { email });  
                setShowFields(true);  
                setError('');   
        } catch (err) {  
            console.error(err);  
            setError('Error sending verification email. Please try again.');  
        } finally {  
            setLoading(false);  
        }  
    };    

    const handleVerificationCodeChange = (e) => {  
        setVerificationCode(e.target.value);  
        setErrorMessageVerification('');  
    };  

    const handlePasswordChange = (e) => {  
        setNewPassword(e.target.value);  
        setErrorMessagePassword('');  
    };  

    const handleConfirmPasswordChange = (e) => {  
        setConfirmPassword(e.target.value);  
        setErrorMessageConfirm('');  
    };  

    const handleSubmitVerification = async (e) => {  
        e.preventDefault();  

        if (!validatePassword(newPassword)) {  
            setErrorMessagePassword('Password must be at least 6 characters long and contain both letters and numbers.');  
            return;  
        }  

        if (newPassword !== confirmPassword) {  
            setErrorMessageConfirm('Passwords do not match.');  
            return;  
        }  

        if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {  
            setErrorMessageVerification('Please enter a valid 6-digit verification code.');  
            return;  
        }  

        setLoading(true);  
        try {  
            const response = await axios.post('https://triptide.pythonanywhere.com/password-reset-verify/', { email, password:            newPassword });  
            if (response.data.success) {  
                alert('Password reset successfully!');  
                window.location.href = '/login';  
            } else {  
                alert('Failed to reset password: ' + (response.data.message || 'Please try again.'));  
            }  
        } catch (error) {  
            console.error(error);  
            alert('Failed to reset password, please try again.');  
        } finally {  
            setLoading(false);  
        }  
    };  

    return (  
        <div className="forgot">  
            <div className="title-forgots">  
                <span className="key trip-forgot">T</span>  
                <span className="key trip-forgot">r</span>  
                <span className="key trip-forgot">i</span>  
                <span className="key trip-forgot">p</span>  
                <span className="key tide-forgot">T</span>  
                <span className="key tide-forgot">i</span>  
                <span className="key tide-forgot">d</span>  
                <span className="key tide-forgot">e</span>  
            </div>  

            <div className="box-forgot">  
                {!showFields ? (  
                    <>  
                        <div className="title-forgot1">Forgot Password</div>  
                        <div className="title-forgot2">  
                            Enter the email address you use on TripTide. We'll  
                            <br /> send you a link to reset your password.  
                        </div>  
                        <div className="container-forgot">  
                            {error && <div className="error-message"><FiInfo className="moveaicon-forgot"/> {error}</div>}  
                            <label className="email-text">Email</label>  
                            <div className="input-box-forgot">  
                                <input  
                                    name="email"  
                                    placeholder="name@email.com"  
                                    type="email"  
                                    aria-label="Email"  
                                    value={email}  
                                    onChange={handleChangeEmail}  
                                    className="input-forgot"   
                                />  
                            </div>  
                            <button type="button" className="button-forgot" onClick={handleResetPassword} disabled={loading}>  
                                {loading ? 'Sending...' : 'Reset Password'}  
                            </button>  
                        </div>    
                        <div className="container-forgot2">  
                            <label className="back-text">Back to</label>  
                            <a href="/login" className="login-link">Login</a>   
                        </div>  
                    </>  
                ) : (  
                    <form onSubmit={handleSubmitVerification}>  
                        <div className="title-forgot1">Reset your Password</div>  
                            <label className="forgot-text">VERIFICATION CODE</label>  
                            <div className="input-box-forgot">  
                                <FaKey className='icon-forgot' />  
                                <input  
                                    type="text"  
                                    placeholder="Enter 6-digit code"  
                                    value={verificationCode}  
                                    onChange={handleVerificationCodeChange}  
                                    className="input-forgot"  
                                />  
                            </div>  
                            {errorMessageVerification && (  
                                <span style={{ color: 'red', margin: '10px 0 0', fontWeight: 'bold', fontSize: '11px' }}>  
                                    {errorMessageVerification}  
                                </span>  
                            )}  

                            <label className="forgot-text">NEW PASSWORD</label>  
                            <div className="input-box-forgot">  
                                <FaLock className='icon-forgot' />  
                                <input  
                                    type="password"  
                                    placeholder="New Password"  
                                    value={newPassword}  
                                    onChange={handlePasswordChange}  
                                    className="password-input"  
                                    required  
                                />  
                            </div>  
                            {errorMessagePassword && (  
                                <span style={{ color: 'red', margin: '10px 0 0', fontWeight: 'bold', fontSize: '11px' }}>  
                                    {errorMessagePassword}  
                                </span>  
                            )}  

                            <label className="forgot-text">CONFIRM PASSWORD</label>  
                            <div className="input-box-forgot">  
                                <FaLock className='icon-forgot' />  
                                <input  
                                    type="password"  
                                    placeholder="Confirm Password"  
                                    value={confirmPassword}  
                                    onChange={handleConfirmPasswordChange}  
                                    className="password-input"  
                                    required  
                                />  
                            </div>  
                            {errorMessageConfirm && (  
                                <span style={{ color: 'red', margin: '10px 0 0', fontWeight: 'bold', fontSize: '11px' }}>  
                                    {errorMessageConfirm}  
                                </span>  
                            )}  

                        {error && <span className="error-message">{error}</span>}  
                        <button type="submit" className="submit-button" disabled={loading}>  
                            {loading ? 'Verifying...' : 'Confirm Reset'}  
                        </button>  
                    </form>  
                )}  
            </div>  
        </div>  
    );  
};  

export default ForgotPassword;