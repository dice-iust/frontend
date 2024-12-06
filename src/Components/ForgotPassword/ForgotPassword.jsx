import React, { useState } from 'react';  
import { FiInfo } from 'react-icons/fi';  
import { FaLock, FaKey } from "react-icons/fa";  
import axios from "axios";  
import "./ForgotPassword.scss";  

const ForgotPassword = () => {  
    const [email, setEmail] = useState('');  
    const [savedEmail, setSavedEmail] = useState('');  
    const [error, setError] = useState('');  
    const [verificationCode, setVerificationCode] = useState('');  
    const [newPassword, setNewPassword] = useState('');  
    const [confirmPassword, setConfirmPassword] = useState('');  
    const [errorMessagePassword, setErrorMessagePassword] = useState('');  
    const [errorMessageConfirm, setErrorMessageConfirm] = useState('');  
    const [errorMessageVerification, setErrorMessageVerification] = useState('');  
    const [loading, setLoading] = useState(false);  
    const [showFields, setShowFields] = useState(false);  
    const [successMessage, setSuccessMessage] = useState('');  

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

    // New handlers added here for verification code, new password and confirm password  
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

    const handleResetPassword = async (e) => {  
        e.preventDefault();  
        setLoading(true);  

        if (!validateEmail(email)) {  
            setError('Invalid email. Please enter a valid email address.');  
            setLoading(false);  
            return;  
        }  

        try {  
            const response = await axios.post('https://triptide.pythonanywhere.com/password-reset-request/', { email });  
            setShowFields(true);  
            setSavedEmail(email);  
            setError('');  
        } catch (err) {  
            console.error(err);  
            const errorMessage = err.response && err.response.data && err.response.data.message   
                ? err.response.data.message   
                : 'There is no account registered with this email. Edit your email.';  
            setError(errorMessage);  
        } finally {  
            setLoading(false);  
        }  
    };  

    const handleSubmitVerification = async (e) => {  
        e.preventDefault();  
        setErrorMessageVerification('');  
    setErrorMessagePassword('');  
    setErrorMessageConfirm('');  

    // Create an array to collect error messages  
    const errors = [];  

    // Check for valid verification code format  
    if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {  
        errors.push('Please enter a valid 6-digit verification code.');  
    }  

    // Validate new password  
    if (!validatePassword(newPassword)) {  
        errors.push('Password must be at least 6 characters long and contain both letters and numbers.');  
    }  

    // Confirm passwords match  
    if (newPassword !== confirmPassword) {  
        errors.push('Passwords do not match.');  
    }  

    // If there are any errors, set them as needed and stop further execution  
    if (errors.length > 0) {  
        // Set appropriate error messages based on checks  
        setErrorMessageVerification(errors.filter(error =>   
            error.includes('verification code')).join(' '));  
        setErrorMessagePassword(errors.filter(error =>   
            error.includes('Password must')).join(' '));  
        setErrorMessageConfirm(errors.filter(error =>   
            error.includes('Passwords do not match')).join(' '));  
        return; // Stop further execution if there are errors  
    } 

        setLoading(true);  
        try {  
            const verifyResponse = await axios.post('https://triptide.pythonanywhere.com/password-reset-verify/', {  
                email: savedEmail,  
                reset_code: verificationCode,  
                new_password: newPassword  
            });  

            if (verifyResponse.data.success) {  
                setSuccessMessage('Password reset successfully!\n Wait for a sec.');  
                setTimeout(() => {  
                    window.location.href = '/login'; // Redirect after success  
                }, 2000); // Redirect after success  
            } else {  
                setErrorMessageVerification('Invalid verification code. Please check your email and try again.');  
            }  
        } catch (error) {  
            console.error(error);  
            const errorMessage = error.response && error.response.data && error.response.data.message   
                ? error.response.data.message  
                : 'Failed to reset password, please try again.';  
                setErrorMessageVerification('Invalid verification code. Please check your email and try again.');  
                // Display an alert if verification fails  
        } finally {  
            setLoading(false); // Reset loading state regardless of success or failure  
        }  
    };  

    const handleBackToEmail = () => {  
        setShowFields(false);  
        setEmail('');  
        setVerificationCode('');  
        setNewPassword('');  
        setConfirmPassword('');  
        setErrorMessagePassword('');  
        setErrorMessageConfirm('');  
        setErrorMessageVerification('');  
        setError('');  
        setSuccessMessage(''); // Clear success message when going back  
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
                            {error && <div className="error-message"><FiInfo className="moveaicon-forgot" /> {error}</div>}  
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
                        <a href="" onClick={handleBackToEmail} className="back-link">&lt; Back</a>  
                        <div className="title-forgot1">Reset your Password</div>  
                        <div className="title-reset-password">We've sent you a verification code. Check your inbox.</div>  
                        <div className="changepass-image-container"></div>  
                        {successMessage && <div className="success-message">{successMessage}</div>}  

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
                            <span style={{ color: 'red', margin: '5px 0 0', fontWeight: 'bold', fontSize: '10px' }}>  
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
                                className="input-forgot"  
                                required  
                            />  
                        </div>  
                        {errorMessagePassword && (  
                            <span style={{ color: 'red', margin: '5px 0 0', fontWeight: 'bold', fontSize: '10px' }}>  
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
                                className="input-forgot"  
                                required  
                            />  
                        </div>  
                        {errorMessageConfirm && (  
                            <span style={{ color: 'red', margin: 'px 0 0', fontWeight: 'bold', fontSize: '10px' }}>  
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