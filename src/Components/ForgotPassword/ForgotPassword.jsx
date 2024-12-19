import React, { useState } from 'react';  
import { FiInfo } from 'react-icons/fi';  
import { FaLock, FaKey } from "react-icons/fa";  
import axios from "axios"; 
import img from "../ForgotPassword/Assests/changepass.png" 
import img2 from "../ForgotPassword/Assests/sent2.png"
import "./ForgotPassword.scss";  
import { MdEmail } from "react-icons/md";  

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
                : 'No account found with this email. Please check.';  
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

    const errors = [];  

    if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {  
        errors.push('Please enter a valid 6-digit verification code.');  
    }  

    // if (!validatePassword(newPassword)) {  
    //     errors.push('Password must be at least 6 characters long and contain both letters and numbers.');  
    // }  
    const passwordError = validatePassword(newPassword);  
    if (passwordError) {  
        errors.push(passwordError);  
    }  
    if (newPassword !== confirmPassword) {  
        errors.push('Passwords do not match.');  
    }  

    if (errors.length > 0) {  
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
                setErrorMessageVerification('Incorrect verification code. Please check your email and try again.');  
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
            <div className="wrapper-forgot">  
                {!showFields ? (  
                    <>  
                        {/* {errMsg && <p ref={errRef} style={{ color: 'red' }} aria-live="assertive">{errMsg}</p>} */}
                        <div className="form-container-forgot">
                        <div className="title-forgot1">Forgot Password</div>  
                        <div className="title-forgot2">  
                            Enter the email address you use on TripTide. We'll send 
                            <br />  you a link to reset your password.  
                        </div>  
                        <div className="container-forgot">  
                            {/* {error && <div className="error-message"><FiInfo className="moveaicon-forgot" /> {error}</div>}   */}
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
                                />              <MdEmail className='icon-forgot' />  
                                
                            </div>  
                            <span style={{ color:   'red', margin: '5px', fontWeight: 'bold', fontSize: '11px' }}>  
                                {error}  
                            </span>
                            <button type="button" className="button-forgot" onClick={handleResetPassword} disabled={loading}>  
                                {loading ? 'Sending...' : 'Reset Password'}  
                            </button>  
                        </div>  
                        <div className="container-forgot2">  
                            <label className="back-text">Back to</label>  
                            <a href="/login" className="login-link">Login</a>  
                        </div> </div>
                         <div className="image-container-forgot">   
                            <img  src={img}  alt="travel"  />  
                        </div> 
                    </>  
                ) : (                          
                    <div className='reset-container'>
                    <div className="form-container-forgot">

                    <form onSubmit={handleSubmitVerification}>  
                        <a href="" onClick={handleBackToEmail} className="back-link">&lt; Back</a>  
                        <div className="title-forgot1">Reset your Password</div>  
                        <div className="title-reset-password">We've sent you a verification code. Check your inbox.</div>  
                        {successMessage && <div className="success-message">{successMessage}</div>}  

                        <label className="forgot-text">VERIFICATION CODE</label>  
                        <div className="input-box-forgot1">  
                              
                            <input  
                                type="text"  
                                placeholder="Enter 6-digit code"  
                                value={verificationCode}  
                                onChange={handleVerificationCodeChange}  
                                className="input-forgot"  
                            />  
                            <FaKey className='icon-forgot' />
                        </div>  
                        <span style={{ color:   'red', margin: '5px', fontWeight: 'bold', fontSize: '11px' }}>  
                                {errorMessageVerification}  
                            </span> 
                         

                        <label className="forgot-text">NEW PASSWORD</label>  
                        <div className="input-box-forgot1">  
                             
                            <input  
                                type="password"  
                                placeholder="New Password"  
                                value={newPassword}  
                                onChange={handlePasswordChange}  
                                className="input-forgot"  
                                // required  
                            />  
                            <FaLock className='icon-forgot' /> 
                        </div>  
                        <span style={{ color:   'red', margin: '5px', fontWeight: 'bold', fontSize: '11px' }}>  
                                {errorMessagePassword}  
                            </span>

                        <label className="forgot-text">CONFIRM PASSWORD</label>  
                        <div className="input-box-forgot1">  
                            <input  
                                type="password"  
                                placeholder="Confirm Password"  
                                value={confirmPassword}  
                                onChange={handleConfirmPasswordChange}  
                                className="input-forgot"  
                                // required  
                            />  
                        <FaLock className='icon-forgot' />  

                        </div>  
                        <span style={{ color:   'red', margin: '5px', fontWeight: 'bold', fontSize: '11px' }}>  
                                {errorMessageConfirm}  
                            </span>
                        {error && <span className="error-message">{error}</span>}  
                        <button type="submit" className="submit-button" disabled={loading}>  
                            {loading ? 'Verifying...' : 'Confirm Reset'}  
                        </button>  
                    </form> 
                    
                    </div>  
                    <div className="image-container-forgot">   
                    <img src={img2} alt="Verification Sent" />  
                    </div>  
                        </div>
                     
                    )}
                
                 
                 
            </div>  
        </div>  



);  
};  

export default ForgotPassword;