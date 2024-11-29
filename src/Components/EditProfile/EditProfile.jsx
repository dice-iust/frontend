import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaEye, FaEdit} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import './EditProfile.css'; 
import profile from "./assets/profile.jpg"
import axios from 'axios';
// import { Link } from 'react-router-dom'; 


const EditProfile = () => {
  const [formData, setFormData] = useState({
    profile_image: '',
    firstName: '',
    lastName: '',
    user_name: '',
    email: '',
    bio: '',
    gender: '',
    birthDate: '',
    city: '',
    phone: '',
    password: '',
    currentPassword: '',
  });

  const [isValidPassword, setIsValidPassword] = useState(false)
  const [isValidCurPassword, setIsValidCurPassword] = useState(false)
  const [errorMessageConfirm, setErrorMessageConfirm] = useState(''); 

  const [isValidEmail, setValidEmail] = useState(false)
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [showField, setShowField] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState)=> !prevState);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevState)=> !prevState);
  };

  const toggleFieldVisibility = () => {
    setShowField((prevState)=> !prevState);
  };
  const handleFileChange = (event) => {  
    const file = event.target.files[0];  
    if (file) {  
      setImage(file); 
      setFormData({ ...formData, profile_image: URL.createObjectURL(file) }); 
    }  
  };  

  const getFormData = async () => {  
    try {  
      const response = await axios.get("https://triptide.pythonanywhere.com/editprofile/update_2/", {  
        headers: { Authorization: localStorage.getItem("token") },  
      });  
      setFormData({  
        firstName: response.data.firstName || '',  
        lastName: response.data.lastName || '',  
        city: response.data.city || '',  
        user_name: response.data.user_name || '',  
        profile_image: response.data.profilePicture || '',  
        gender: response.data.gender || '',  
        email: response.data.email || '',  
        bio: response.data.bio || '',  
        phone: response.data.phone || '',  
        birthDate: response.data.birthDate || '',  
      });  
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

  const putDataForm = async () => {  
    const formDataImage = new FormData();  

    if (image) {  
      formDataImage.append('profilePicture', image); 
    }  


    formDataImage.append('firstName', formData.firstName);  
    formDataImage.append('lastName', formData.lastName);  
    formDataImage.append('city', formData.city);  
    formDataImage.append('user_name', formData.user_name);  
    formDataImage.append('gender', formData.gender);  
    formDataImage.append('email', formData.email);  
    formDataImage.append('bio', formData.bio);  
    formDataImage.append('phone', formData.phone);  
    formDataImage.append('birthDate', formData.birthDate);  
    

    if (formData.password) {  
      formDataImage.append('password', formData.password);  
    }  
    if (formData.currentPassword) {  
      formDataImage.append('currentPassword', formData.currentPassword);  
    }  

    try {  
      const response = await axios.put("https://triptide.pythonanywhere.com/editprofile/update_2/", formDataImage, {  
        headers: {  
          Authorization: localStorage.getItem("token"),  
          'Content-Type': 'multipart/form-data',
        },  
      });  
      console.log(response);  

    } catch (error) {
      console.error("Error updating profile:", error);  

    }  
}; 
  const token = localStorage.getItem("token")

useEffect(()=>{!token ? navigate("/login") : getFormData(); },[])

const validatePassword = (pwd) => {  
  const hasLetters = /[a-zA-Z]/.test(pwd);  
  const hasNumbers = /\d/.test(pwd);  
  const isLongEnough = pwd?.length >= 6;   
  if (!hasLetters && !hasNumbers) {  
    return 'Password must contain letters and numbers';  
  }  
  if (!hasLetters && !isLongEnough ) {  
    return 'must also contain letters and at least 6 symbols';  
  }  
  if (!hasNumbers && !isLongEnough) {  
    return 'must also contain digits and at least 6 symbols';  
  }  
  if (!hasLetters ) {  
    return 'Password must contain letters';  
  }  
  if (!hasNumbers) {  
    return 'Password must contain digits';  
  }  
  if (!isLongEnough) {  
    return 'Password must be at least 6 characters long';  
  }   
  return '';  
};  

const validateEmail = (email) => {  
  if (!email) {  
    return 'Please fill out this field';  
  }  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
  if (!emailPattern.test(email)) {  
    return 'Not a valid email! example: email@example.com';  
  }  
  return '';  
};  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'password'){
      (validatePassword(e.target.value) === '')? setIsValidPassword(false) : setIsValidPassword(true);
      e.target.value === formData.currentPassword ? setErrorMessageConfirm('') : setErrorMessageConfirm('passwords do not match');
    }

    if (e.target.name === 'currentPassword'){
      (validatePassword(e.target.value) === '')? setIsValidCurPassword(false) : setIsValidCurPassword(true);
    }

    if (e.target.name === 'email'){
      validateEmail(e.target.value) === ''? setValidEmail(false) : setValidEmail(true);
    }


  };

  const handleSubmit = (e) => {
    e.preventDefault();   
    putDataForm();
  };

  const handleCancel = (e) => {
    e.preventDefault();  
    getFormData()
  };


  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
  const previousRoute = location.state?.from || "/";
  navigate(previousRoute);
  };

  return (
    <div className='body'>
      <div className="edit-profile-container">
    
        <form className="profile-form">
          <button onClick={handleBack} className='p-btn'>< FaArrowLeft className='ep-la-icon'/></button>

          <h1 className="ep-title">Edit Profile</h1>
      
          <div className='profile'>
            <img src={formData.profile_image ? formData.profile_image : profile} alt="profile" />  
            <label className="form-label">
              <input type="file"  className="file-input" onChange={handleFileChange}/>
              <span className="change-button">+</span>
            </label>
          </div>
       
          <h3 className='ep-info'>
            Change Password 
            <div className='p-btn' onClick={toggleFieldVisibility}><FaEdit className='ep-icon' /></div>
          </h3> 
            <div className="input-container" style={{ display: showField ? 'flex' : 'none' }}>
              <div  className="input-div">
                <label  className="form-label">Password</label>
                <div className='edit-pwd' onClick={togglePasswordVisibility2}><FaEye/></div>
                <input type={showPassword2 ? 'text' : 'password' } name="currentPassword" className="form-input" value={formData.currentPassword} onChange={handleChange} />
                  {isValidCurPassword ? <div style={{color: "red",marginTop: "3px",marginLeft:"6px", fontSize:"11px"}}>invalid password</div> : null}
              </div>

              <div  className="input-div">
                <label  className="form-label">Confirm Password</label>
                <div className='edit-pwd' onClick={togglePasswordVisibility}><FaEye/></div>
                <input type={showPassword ? 'text' : 'password' } name="password" className="form-input" value={formData.password} onChange={handleChange} />
                  {isValidPassword ? <div style={{color: "red",marginTop: "3px",marginLeft:"6px", fontSize:"11px"}}>invalid password</div> : null}
                  {errorMessageConfirm ? <div style={{color: "red",marginTop: "3px",marginLeft:"6px", fontSize:"11px"}}>{errorMessageConfirm}</div> : null} 
              </div>
            </div>

          <h3 className='ep-info'>Personal Information</h3>

          <div className="input-container">
            <div className="input-div">
              <label  className="form-label">First Name</label>
              <input type="text" name="firstName" className="form-input" value={formData.firstName} onChange={handleChange} />
            </div>
            <div  className="input-div">
              <label className="form-label">Last Name</label>
              <input type="text" name="lastName" className="form-input" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          
          <div className="input-container">
            <div className="input-div">
              <label className="form-label">Username</label>
              <input type="text" name="user_name" className="form-input" value={formData.user_name} onChange={handleChange} />
            </div>

            <div  className="input-div">
              <label className="form-label">Birth Date</label>
              <input type="date" name="birthDate" className="form-input" value={formData.birthDate} onChange={handleChange} />   
            </div>
          </div>

            

          <div className="input-container">

            <div className="input-div">
              <label  className="form-label">City</label>
              <input type="text" name="city" className="form-input" value={formData.city} onChange={handleChange} />
            </div>

            <div className="input-div">
              <label className="form-label">Gender</label>
              <select name="gender" className="form-select" onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Others</option>
              </select>
            </div>
            
          </div>


          <h3 className='ep-info'>Contact Information</h3>

          <div className="input-container">
            <div className="input-div">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} />
              {isValidEmail ? <div style={{color: "red",marginTop: "3x",marginLeft:"6px", fontSize:"11px"}}>invalid email</div> : null}
            </div>

            <div  className="input-div">    
              <label className="form-label">Phone</label>
              <input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} />
            </div>
          </div>
    
          
          <h3 className='ep-info'>About me</h3>
          <div style={{width:"100%"}}>
            <label className="form-label">Bio</label>
            <textarea name="bio" className="form-textarea" rows={8} value={formData.bio} onChange={handleChange} />
          </div>
          
          <div className='submit'>
              <button type="cancel" className="submit-button" onClick={handleCancel}>Reset</button>
              <button type="submit" className="submit-button" onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;






 
