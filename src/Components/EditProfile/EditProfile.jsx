import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './EditProfile.css'; 
import profile from "./assets/profile.jpg"
import axios from 'axios';
import { Link } from 'react-router-dom'; 


const EditProfile = () => {
  const [formData, setFormData] = useState({
    profilePicture: '',
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

  const getFormData = ()=>{
    // const auth = `Bearer ${localStorage.getItem("token")}`
    axios({
          method: 'get',
          url: 'https://triptide.pythonanywhere.com/editprofile/update',
          responseType: 'json',
          // headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
          // headers:{Authorization: auth}
          headers:{Authorization: localStorage.getItem("token")}
          // headers:{Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOCwiZXhwIjoxNzMyMzA4NzIxLCJpYXQiOjE3MzIyMjIzMjF9.E3NO9aoryxrtRIUd14e_22GXEe5na5FES_6qGxwDAu8"}
        })
          .then(function (response) {    
            setFormData({
              profilePicture: response.profilePicture,
              firstName: response.firstName,
              lastName: response.lastName,
              user_name: response.user_name,
              password: response.password,
              email: response.email,
              bio: response.bio,
              gender: response.gender,
              birthDate: response.birthDate,
              city: response.city,
              phone: response.phone,
            })
          })
          .catch(error => {
            console.log(error)
          });
        }

  const putDataForm = ()=>{
    const fdata = {
      profilePicture: formData.profilePicture,
              firstName: formData.firstName,
              lastName: formData.lastName,
              user_name: formData.user_name,
              password: formData.password,
              email: formData.email,
              bio: formData.bio,
              gender: formData.gender,
              birthDate: formData.birthDate.replace(/-/g, "/"),
              city: formData.city,
              phone: formData.phone,
    }
    axios.put('https://triptide.pythonanywhere.com/editprofile/update', fdata)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    });
  }

  const navigate = useNavigate();

useEffect(()=>{
  const token = localStorage.getItem("token")
  console.log(token)
  if (!token){
    navigate("/login"); 
  }
  getFormData()

},[])

const validatePassword = (password) => {  
  const hasLetters = /[a-zA-Z]/.test(password);  
  const hasNumbers = /\d/.test(password);  
  const isLongEnough = password.length >= 8;   
  if (!hasLetters && !hasNumbers) {  
    return 'Password must contain letters and numbers';  
  }  
  if (!hasLetters && !isLongEnough ) {  
    return 'must also contain letters and at least 8 symbols';  
  }  
  if (!hasNumbers && !isLongEnough) {  
    return 'must also contain digits and at least 8 symbols';  
  }  
  if (!hasLetters ) {  
    return 'Password must contain letters';  
  }  
  if (!hasNumbers) {  
    return 'Password must contain digits';  
  }  
  if (!isLongEnough) {  
    return 'Password must be at least 8 characters long';  
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
    console.log(e.target.value)

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
        <nav className="navbar">
        <Link to="/Main"> <button className="nav-button" /*onClick={() => window.history.back()}*/>Back</button></Link>
        </nav>
    
        <form className="profile-form" onSubmit={handleSubmit}>
        <h1 className="title">Edit Profile</h1>
        <hr />
          <div className='profile'>
            <img src={formData.profilePicture ? formData.profilePicture : profile} alt="profile" />
          <label className="form-label ">
            <input type="file" accept="image/*" className="file-input" onChange={(e) => {
              setFormData({ ...formData, profilePicture: e.target.files[0].name })
            }} />
            <span className="change-button">Change</span>
          </label>
          </div>
          <div className="nameSection">
          <label className="form-label">
            First Name
            <input type="text" name="firstName" className="form-input" value={formData.firstName} onChange={handleChange} />
          </label>
          <label className="form-label">
            Last Name
            <input type="text" name="lastName" className="form-input" value={formData.lastName} onChange={handleChange} />
          </label>
          </div>
          <label className="form-label">
            Username
            <input type="text" name="user_name" className="form-input" value={formData.user_name} onChange={handleChange} />
          </label>
          <label className="form-label">
            Password
            <input type="password" name="password" className="form-input" value={formData.password} onChange={handleChange} />
            {isValidPassword ? <div style={{color: "red",margin: "10px", fontSize:"11px"}}>invalid password</div> : null}
          </label>
          <label className="form-label">
            Email
            <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} />
            {isValidEmail ? <div style={{color: "red",margin: "10px", fontSize:"11px"}}>invalid email</div> : null}
          </label>
          <label className="form-label">
            Birth Date
            <input type="date" name="birthDate" className="form-input" value={formData.birthDate} onChange={handleChange} />
          </label>
          <label className="form-label">
            Gender
            <select name="gender" className="form-input" onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Others</option>
            </select>
            </label>
          <label className="form-label">
            City
            <input type="text" name="city" className="form-input" value={formData.city} onChange={handleChange} />
          </label>
          <label className="form-label">
            Phone
            <input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} />
          </label>
            <label className="form-label">
              Bio
              <textarea name="bio" className="form-textarea" value={formData.bio} onChange={handleChange} />
            </label>
            <div className='submit'>
                <button type="submit" className="submit-button">Submit</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;