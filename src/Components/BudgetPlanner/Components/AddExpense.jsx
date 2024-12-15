import React, { useState } from "react";  
import "./AddExpense.scss";  
import addBill from "../assets/addbill.png";  
import { MdAddPhotoAlternate } from "react-icons/md";  
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';  
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  
import { DatePicker } from '@mui/x-date-pickers/DatePicker';  
import dayjs from 'dayjs';  

const AddExpense = ({ setExpData, setShowAddExpense, handleExpenseListToggle }) => {  
    const [formValue, setFormValue] = useState({  
        userName: "",  
        title: "",  
        amount: "",  
        date: null,  
        description: "",  
        category: "",  
    });  

    const [uploadedImage, setUploadedImage] = useState(null);  
    const [errors, setErrors] = useState({});  
    const [splitType, setSplitType] = useState("equal");  
    const [selectedUsers, setSelectedUsers] = useState([]);  

    const categories = ["Accommodation", "Entertainment", "Groceries", "Healthcare", "Insurance", "Rent_Charges", "Restaurunt_Bars", "Shopping", "Transport", "Other"];  
    const users = ["Alice", "Bob", "Charlie", "David","nima","ghghg","gfd","hgjhg","sadsad","dfgdfgd"];  

    const handleChange = (e) => {  
        const { name, value, type, files } = e.target;  
        if (type === "file" && files.length) {  
            const file = files[0];  
            const reader = new FileReader();  
            reader.onloadend = () => {  
                setUploadedImage(reader.result);  
            };  
            reader.readAsDataURL(file);  
        } else {  
            setFormValue(prev => ({ ...prev, [name]: value }));  
            if (errors[name]) {  
                setErrors(prev => ({ ...prev, [name]: "" }));  
            }  
        }  
    };  

    const handleAddExpense = (e) => {  
        e.preventDefault();  
        setErrors({});   

        const newErrors = {};  

        if (splitType === "specificUser" && selectedUsers.length === 0) {  
            newErrors.userName = "At least one user must be selected.";  
        }  
        if (!formValue.title) {  
            newErrors.title = "Title field cannot be empty.";  
        }  
        if (!formValue.amount || isNaN(formValue.amount) || Number(formValue.amount) <= 0) {  
            newErrors.amount = "Amount must be a positive number.";  
        }  
        if (!formValue.date) {  
            newErrors.date = "Date field cannot be empty.";  
        } else if (formValue.date.isAfter(dayjs())) {  
            newErrors.date = "Date cannot be in the future.";  
        }  
        if (!formValue.category) {  
            newErrors.category = "Category field cannot be empty.";  
        }  

        if (Object.keys(newErrors).length > 0) {  
            setErrors(newErrors);  
            return;  
        }  

        const newExpense = {  
            users: splitType === "specificUser" ? selectedUsers : [formValue.userName],  
            title: formValue.title,  
            amount: Number(formValue.amount),  
            date: formValue.date,  
            description: formValue.description,  
            category: formValue.category,  
            id: Date.now(),  
            uploadedImage: uploadedImage  
        };  

        setExpData(prev => [...prev, newExpense]);  
        setShowAddExpense(false);  
        handleExpenseListToggle();  
        resetForm();  
    };  

    const resetForm = () => {  
        setFormValue({  
            userName: "",  
            title: "",  
            amount: "",  
            date: null,  
            description: "",  
            category: "",  
        });  
        setUploadedImage(null);  
        setErrors({});  
        setSplitType("equal");  
        setSelectedUsers([]);  
    };  

    const handleSplitSelection = (type) => {  
        setSplitType(type);  
        if (type === "equal") {  
            setSelectedUsers([]);  
        }  
    };  

    const handleUserSelection = (user) => {  
        setSelectedUsers(prevSelected => prevSelected.includes(user)  
            ? prevSelected.filter(u => u !== user)  
            : [...prevSelected, user]  
        );  
    };  

    return (  
        <div className="main-add-div">  
                        <form onSubmit={handleAddExpense}>  
                <div className="upload-image-section">  
                    <img  
                        src={uploadedImage || addBill}  
                        alt="Uploaded"  
                        className="smaller-image-planner"  
                    />  
                    <div className="button-container-planner">  
                        <label htmlFor="file-upload" className="file-upload-button-planner">  
                            <MdAddPhotoAlternate className='moveiconpic-planner' />  
                        </label>  
                        <input  
                            type="file"  
                            id="file-upload"  
                            onChange={handleChange}  
                            style={{ display: 'none' }}  
                        />  
                    </div>  

                    <div className="split-selection-row">  
                        <Button  
                            type="button"  
                            className={`split-button ${splitType === 'equal' ? 'active' : ''}`}  
                            onClick={() => handleSplitSelection('equal')}  
                        >  
                            Split Equally  
                        </Button>  
                        <Button  
                            type="button"  
                            className={`split-button ${splitType === 'specificUser' ? 'active' : ''}`}  
                            onClick={() => handleSplitSelection('specificUser')}  
                        >  
                            Select Users  
                        </Button>  
                    </div>  

                    {splitType === 'specificUser' && (  
                        <div className="user-selection">  
                            <h3>Select Users:</h3>  
                            <div className="user-checkboxes">  
                                {users.map((user) => (  
                                    <div className="user-checkbox" key={user}>  
                                        <label>  
                                            <input  
                                                type="checkbox"  
                                                checked={selectedUsers.includes(user)}  
                                                onChange={() => handleUserSelection(user)}  
                                            />  
                                            {user}  
                                        </label>  
                                    </div>  
                                ))}  
                            </div>  
                        </div>  
                    )}  
                </div>  

                <div className="row">  
                    <div className="form-item">  
                        <TextField  
                            type="text"  
                            name="userName"  
                            label="Paid By"  
                            variant="outlined"  
                            value={formValue.userName}  
                            placeholder="Username"  
                            onChange={handleChange}  
                            error={!!errors.userName}  
                            helperText={errors.userName}  
                        />  
                    </div>  
                    <div className="form-item">  
                        <TextField  
                            type="text"  
                            name="title"  
                            label="Title"  
                            variant="outlined"  
                            required  
                            value={formValue.title}  
                            onChange={handleChange}  
                            error={!!errors.title}  
                            helperText={errors.title}  
                        />  
                    </div>  
                </div>  

                <div className="row">  
                    <div className="form-item">  
                        <TextField  
                            type="text"  
                            name="amount"  
                            label="Amount"  
                            variant="outlined"  
                            required  
                            value={formValue.amount}  
                            onChange={handleChange}  
                            error={!!errors.amount}  
                            helperText={errors.amount}  
                        />  
                    </div>  
                    <div className="form-item">  
                        <LocalizationProvider dateAdapter={AdapterDayjs}>  
                            <DatePicker  
                                required  
                                label="Date"  
                                value={formValue.date}  
                                onChange={(newValue) => handleChange({ target: { name: 'date', value: newValue } })}  
                                renderInput={(params) => (  
                                    <TextField {...params} error={!!errors.date} helperText={errors.date} />  
                                )}  
                            />  
                        </LocalizationProvider>  
                    </div>  
                </div>  

                <div className="form-item">  
                    <FormControl variant="outlined" fullWidth>  
                        <InputLabel id="category-label" style={{ color: '#22487a' }}>Category</InputLabel>  
                        <Select  
                            name="category"  
                            labelId="category-label"  
                            label="Category"  
                            value={formValue.category}  
                            onChange={handleChange}  
                            error={!!errors.category}  
                        >  
                            <MenuItem value=""><em>Select a category</em></MenuItem>  
                            {categories.map(category => (  
                                <MenuItem key={category} value={category}>  
                                    {category}  
                                </MenuItem>  
                            ))}  
                        </Select>  
                        {errors.category && <div className="error-message">{errors.category}</div>}  
                    </FormControl>  
                </div>  

                <div className="form-item">  
                    <TextField  
                        type="text"  
                        name="description"  
                        label="Description"  
                        variant="outlined"  
                        required  
                        value={formValue.description}  
                        onChange={handleChange}  
                    />  
                </div>  

                <Button className="btn" type="submit" variant="contained">  
                    Add  
                </Button>  
            </form>  
        </div>  
    );  
};  

export default AddExpense;