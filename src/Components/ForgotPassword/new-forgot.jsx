// ForgotPassword.js  
import React, { useState } from 'react';  
import './new-forgot.scss';  

const ForgotPassword = () => {  
    const [email, setEmail] = useState('');  
    const [showVerificationForm, setShowVerificationForm] = useState(false);  
    const [verificationCode1, setVerificationCode1] = useState('');  
    const [verificationCode2, setVerificationCode2] = useState('');  
    const [verificationCode3, setVerificationCode3] = useState('');  
    const [newPassword, setNewPassword] = useState('');  
    const [confirmPassword, setConfirmPassword] = useState('');  
    const [errorMessage, setErrorMessage] = useState('');  

    const handleEmailSubmit = (e) => {  
        e.preventDefault();  
        // This is where you'd typically send the verification code to the email address.  
        // Simulate showing the verification form.  
        setShowVerificationForm(true);  
    };  

    const handleSubmit = (e) => {  
        e.preventDefault();  
        if (newPassword !== confirmPassword) {  
            setErrorMessage('Passwords do not match!');  
            return;  
        }  
        // Handle password reset logic here (e.g., send new password and verification code to API).  
        alert('Password reset successful!');  
    };  

    return (  
        <div className="forgot-password">  
            {!showVerificationForm ? (  
                <form onSubmit={handleEmailSubmit}>  
                    <h1>Enter Your Email</h1>  
                    <input  
                        type="email"  
                        placeholder="Email"  
                        value={email}  
                        onChange={(e) => setEmail(e.target.value)}  
                        required  
                        className="email-input"  
                    />  
                    <button type="submit" className="submit-button">Send Verification Code</button>  
                </form>  
            ) : (  
                <form onSubmit={handleSubmit}>  
                    <h1>Verify Your Email</h1>  
                    <div className="code-inputs">  
                        <input  
                            type="text"  
                            maxLength="1"  
                            value={verificationCode1}  
                            onChange={(e) => setVerificationCode1(e.target.value)}  
                            placeholder="Code"  
                            className="code-input"  
                        />  
                        <input  
                            type="text"  
                            maxLength="1"  
                            value={verificationCode2}  
                            onChange={(e) => setVerificationCode2(e.target.value)}  
                            placeholder="Code"  
                            className="code-input"  
                        />  
                        <input  
                            type="text"  
                            maxLength="1"  
                            value={verificationCode3}  
                            onChange={(e) => setVerificationCode3(e.target.value)}  
                            placeholder="Code"  
                            className="code-input"  
                        />  
                    </div>  

                    <div className="password-inputs">  
                        <input  
                            type="password"  
                            placeholder="New Password"  
                            value={newPassword}  
                            onChange={(e) => setNewPassword(e.target.value)}  
                            className="password-input"  
                            required  
                        />  
                        <input  
                            type="password"  
                            placeholder="Confirm Password"  
                            value={confirmPassword}  
                            onChange={(e) => setConfirmPassword(e.target.value)}  
                            className="password-input"  
                            required  
                        />  
                    </div>  

                    {errorMessage && <span className="error-message">{errorMessage}</span>}  
                    <button type="submit" className="submit-button">Reset Password</button>  
                </form>  
            )}  
        </div>  
    );  
};  

export default ForgotPassword;