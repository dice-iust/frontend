import React, { useState, useEffect } from 'react';
import { FaEdit} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './EditProfile.css'; 
import profile from "./assets/profile.jpg"
import axios from 'axios';
import { Link } from 'react-router-dom'; 


const EditProfile = () => {
  const [formData, setFormData] = useState({
    profile_image: '',
    firstName: '',
    lastName: '',
    user_name: '',
    password: '',
    email: '',
    bio: '',
    gender: '',
    birthDate: '',
    city: '',
    phone: '',
  });

  const [isValidPassword, setIsValidPassword] = useState(false)
  const [isValidEmail, setValidEmail] = useState(false)
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState)=> !prevState);
  
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const getFormData = ()=>{
    axios({
          method: "get",
          url: "https://triptide.pythonanywhere.com/editprofile/update_2/",
          responseType: "json",
          headers:{Authorization: localStorage.getItem("token")}
        })
          .then(function (response) {  
            console.log(response)
            setFormData({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              city: response.data.city,
              user_name: response.data.user_name,
              profile_image: response.data.profile_image,
              gender: response.data.gender,
              email: response.data.email,
              bio: response.data.bio,
              phone: response.data.phone,
              birthDate: response.data.birthDate,
              password: response.data.password,
            })
          })
          .catch(error => {
            console.log(error)
          });
        }

  const putDataForm = ()=>{
    const formDataImage = new FormData();
    formDataImage.append('image', image);
    const fdata = {
              firstName: formData.firstName,
              lastName: formData.lastName,
              city: formData.city,
              user_name: formData.user_name,
              profile_image: formDataImage,
              gender: formData.gender,
              email: formData.email,
              bio: formData.bio,
              phone: formData.phone,
              birthDate: formData.birthDate,
              password: formData.password,
    }
    axios.put("https://triptide.pythonanywhere.com/editprofile/update_2/", fdata ,
      {headers: {Authorization: localStorage.getItem("token"),'Content-Type': 'multipart/form-data',}} )
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    });
  }

  const navigate = useNavigate();

  const token = localStorage.getItem("token")

useEffect(()=>{
  
  if (!token){
    navigate("/login"); 
  }
  getFormData()

},[])

const validatePassword = (password) => {  
  const hasLetters = /[a-zA-Z]/.test(password);  
  const hasNumbers = /\d/.test(password);  
  const isLongEnough = password?.length >= 6;   
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
    validatePassword(formData.password) === ''? setIsValidPassword(false) : setIsValidPassword(true)
    validateEmail(formData.email) === ''? setValidEmail(false) : setValidEmail(true)
  };

  const handleSubmit = (e) => {
    e.preventDefault();   
    putDataForm();
  };

  return (
    <div className='body'>
      <div className="edit-profile-container">
    
        <form className="profile-form" onSubmit={handleSubmit}>
          <h1 className="title">Edit Profile</h1>
          <hr />
          <div className='profile'>
            <img src={formData.profile_image ? `http://localhost:3000/editprofile/${formData.profile_image}` : profile} alt="profile" />
          <label className="form-label ">
            <input type="file" accept="image/*" className="file-input" onChange={handleFileChange} />
            <span className="change-button">+</span>
          </label>
          </div>

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
              <label  className="form-label">Password</label>
              <div className='edit-pwd' onClick={togglePasswordVisibility}><FaEdit/></div>
              <input type={showPassword ? 'text' : 'password' } name="password" className="form-input" value={formData.password} onChange={handleChange} />
                {isValidPassword ? <div style={{color: "red",marginTop: "3px",marginLeft:"6px", fontSize:"11px"}}>invalid password</div> : null}
            </div>
          </div>

          <div className="input-container">
            <div className="input-div">
              <label  className="form-label">City</label>
              <input type="text" name="city" className="form-input" value={formData.city} onChange={handleChange} />
            </div>

            <div  className="input-div">    
              <label className="form-label">Phone</label>
              <input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="input-container">
            <div className="input-div">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} />
              {isValidEmail ? <div style={{color: "red",marginTop: "3x",marginLeft:"6px", fontSize:"11px"}}>invalid email</div> : null}
            </div>

            <div  className="input-div">
              <label className="form-label">Birth Date</label>
              <input type="date" name="birthDate" className="form-input" value={formData.birthDate} onChange={handleChange} />   
            </div>
          </div>

          <div className="input-container">
            <div className="input-div">
              <label className="form-label">Gender</label>
              <select name="gender" className="form-select" onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Others</option>
              </select>
            </div>

          </div>
            <div style={{width:"100%"}}>
              <label className="form-label">Bio</label>
              <textarea name="bio" className="form-textarea" rows={8} value={formData.bio} onChange={handleChange} />
            </div>
        
          <div className='submit'>
              <button type="submit" className="submit-button">Submit</button>
          </div>
 
        </form>
      </div>
    </div>
  );
};

export default EditProfile;