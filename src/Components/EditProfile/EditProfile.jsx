import React, { useState, useEffect } from 'react';
import './EditProfile.css'; 
import profile from "./assets/profile.jpg"
import axios from 'axios';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    profilePicture: '',
    firstName: '',
    lastName: '',
    username: '',
    newPassword: '',
    email: '',
    bio: '',
    gender: '',
    birthDate: '',
    city: '',
    phone: '',
  });

  const getFormData = ()=>{
    axios({
          method: 'get',
          url: '',
          responseType: 'json'
        })
          .then(function (response) {
            // console.log(response)     
            setFormData({
              profilePicture: response.profilePicture,
              firstName: response.firstName,
              lastName: response.lastName,
              username: response.username,
              newPassword: response.newPassword,
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
              username: formData.username,
              newPassword: formData.newPassword,
              email: formData.email,
              bio: formData.bio,
              gender: formData.gender,
              birthDate: formData.birthDate,
              city: formData.city,
              phone: formData.phone,
    }
    axios.put('', fdata)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    });
  }
useEffect(()=>{
  // getFormData()

},[])
  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putDataForm();
    console.log(formData);
  };

  return (
    <div className="edit-profile-container">
      <nav className="navbar">
        <button className="nav-button" /*onClick={() => window.history.back()}*/>Back</button>
      </nav>
   
      <form className="profile-form" onSubmit={handleSubmit}>
      <h1 className="title">Edit Profile</h1>
      <hr />
        <div className='profile'>
          <img src={formData.profilePicture ? formData.profilePicture : profile} alt="profile" />
        <label className="form-label ">
          <input type="file" accept="image/*" className="file-input" onChange={(e) => setFormData({ ...formData, profilePicture: e.target.files[0] })} />
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
          <input type="text" name="username" className="form-input" value={formData.username} onChange={handleChange} />
        </label>
        <label className="form-label">
          Password
          <input type="password" name="newPassword" className="form-input" value={formData.newPassword} onChange={handleChange} />
        </label>
        <label className="form-label">
          Email
          <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} />
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
  );
};

export default EditProfile;