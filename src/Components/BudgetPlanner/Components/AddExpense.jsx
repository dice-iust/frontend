import React, { useEffect, useState } from "react";  
import "./AddExpense.scss";  
import axios from "../../../api/axios.js";  
import addBill from "../assets/addbill.png";  
import { MdAddPhotoAlternate, MdArrowDropDown } from "react-icons/md";  
import { TextField, Select, MenuItem, FormControl, InputLabel, Button,Menu } from "@mui/material";  
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';  
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  
import { DatePicker } from '@mui/x-date-pickers/DatePicker';  
import dayjs from 'dayjs';  
import accommodation from "../assets/accomodation.jpg";  
import entertainment from "../assets/entertainment.jpg";  
import groceries from "../assets/groceries.jpg";  
import healthcare from "../assets/healthcare.jpg";  
import insurance from "../assets/insurance.jpg";  
import rent from "../assets/rent.jpg";  
import restaurant from "../assets/restaurant.jpg";  
import shopping from "../assets/shopping.jpg";  
import transport from "../assets/transport.jpg";  
import other from "../assets/other.jpg";  
const AddExpense = ({ setExpData, setShowAddExpense, handleExpenseListToggle, tourname }) => {  
    const [formValue, setFormValue] = useState({  
        userName: "",  
        title: "",  
        amount: "",  
        date: null,  
        description: "",  
        category: "",  
    });  
    const [participants,setparticipants]=useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);  
    const [errors, setErrors] = useState({});  
    const [splitType, setSplitType] = useState("equal");  
    const [selectedUsers, setSelectedUsers] = useState([]);  
    const [categoryImage, setCategoryImage] = useState(null); 
    const [anchorEl, setAnchorEl] = useState(null);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [data, setData] = useState([]);  // Initialize data for participants 
    const[imgcategory,setimgcategory] =useState(""); 

    const categories = [  
        { name: "Accommodation", thumbnail: accommodation },  
        { name: "Entertainment", thumbnail: entertainment },  
        { name: "Groceries", thumbnail: groceries },  
        { name: "Healthcare", thumbnail: healthcare },  
        { name: "Insurance", thumbnail: insurance },  
        { name: "Rent & Charges", thumbnail: rent },  
        { name: "Restaurant & Bars", thumbnail: restaurant },  
        { name: "Shopping", thumbnail: shopping },  
        { name: "Transport", thumbnail: transport },  
        { name: "Other", thumbnail: other },  
    ];   
    

    useEffect(() => {  
        const fetchTripData = async () => {  
            if (!tourname) {  
                setError('Tour name is required.');  
                setLoading(false);  
                return;  
            }  
            try {  
                const response = await axios.get(`https://triptide.pythonanywhere.com/planner/travels/expenses/`, {  
                    headers: {  
                        Authorization: localStorage.getItem("token"),  
                    },   
                    params: { travel_name: tourname }   
                });  
                setData(response.data.valid_participants || []);  // Ensure valid participants are set  
                setLoading(false);  // Stop loading after fetching data
                setError("") ; 
            } catch (err) {  
                console.error(err);  
                setLoading(false);  // Stop loading on error  
                if (err.response?.status === 403) {  
                    const is_part = err.response.data.is_part;   
                    setError(`Access forbidden. Is part: ${is_part}`);  
                } else {  
                    setError(err.response?.data?.detail || 'An error occurred while fetching trip data.');  
                }  
            }    
        };  
    
        fetchTripData();   
    }, [tourname]);  

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
            if (name === "category") {  
                const selectedCategory = categories.find(category => category.name === value);  
                setCategoryImage(selectedCategory ? selectedCategory.thumbnail : null);  
            } 
            setFormValue(prev => ({ ...prev, [name]: value }));  
            if (errors[name]) {  
                setErrors(prev => ({ ...prev, [name]: "" }));  
            }  
        }  
    };  

    const handleAddExpense = async (e) => {  
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
    
        const formDataImage = new FormData();  
    
        formDataImage.append('travel_name', tourname);  // Add travel name  
        formDataImage.append('amount', Number(formValue.amount));  
        formDataImage.append('created_at', formValue.date.format("YYYY-MM-DD"));  // Ensure date is formatted  
        formDataImage.append('title', formValue.title);  
        formDataImage.append('category', formValue.category);  
        formDataImage.append('payer', formValue.userName);  
        formDataImage.append('description', formValue.description);  
    
        // Determine participants based on split type and stringify the array  
        const participants = splitType === "specificUser" ? selectedUsers : data.map(participant =>participant.user_name);  
        participants.forEach(participant => {  
            formDataImage.append('participants[]', participant); // Use array notation if backend expects it this way  
        }); 
        console.log(participants);
        for (const pair of formDataImage.entries()) {  
            console.log(`${pair[0]}: ${pair[1]}`);  
        }     
        console.log('Form Data being sent:', formDataImage); // Log for debug  
    
        try {  
            const response = await axios.post("https://triptide.pythonanywhere.com/planner/travels/expenses/", formDataImage, {  
                headers: {  
                    Authorization: localStorage.getItem("token"),  
                    'Content-Type': 'multipart/form-data',  
                },  
                params: { travel_name: tourname }  
            });  
            console.log('Response from API:', response.data);

            setimgcategory(response.data.receipt_image );
            resetForm();  // Reset form after successful submission  
            handleExpenseListToggle();  // Toggle the expense list to refresh data or show feedback  
            
        } catch (error) {  
            console.error("Error adding new trip:", error.response ? error.response.data : error.message);              setError(error.response?.data.detail || 'An error occurred. Please try again.');  
        }  
    };
    const resetForm = () => {  
        setFormValue({ userName: "", title: "", amount: "", date: null, description: "", category: "" });  
        setUploadedImage(null);  
        setErrors({});  
        setSplitType("equal");  
        setSelectedUsers([]);  
        setCategoryImage(null);   
    };  

    const handleSplitSelection = (type) => {  
        setSplitType(type);  
        if (type === "equal") {  
            setSelectedUsers([]);  
        }  
    };  
    const handleCategoryClick = (event) => {  
        setAnchorEl(event.currentTarget);  
    };  

    const handleCategorySelect = (category) => {  
        
        setCategoryImage(category.thumbnail);  
        setFormValue(prev => ({ ...prev, category: category.name }));  
        setAnchorEl(null);  
    };  
    const handleUserSelection = (user) => {  
        setSelectedUsers(prevSelected =>  
            prevSelected.includes(user)  
                ? prevSelected.filter(u => u !== user) 
                : [...prevSelected, user]  
        );  
    };  

    return (  
        <div className="main-add-div">  
            {loading && <div>Loading...</div>}  
            {error && <div className="error-message">{error}</div>}  
            <form onSubmit={handleAddExpense}>  
                <div className="upload-image-section">  
                    <img  
                        src={uploadedImage || addBill}  
                        alt="Uploaded"  
                        className="smaller-image-planner"  
                    />  
                    <div className="button-container-planner">  
                        <label htmlFor="file-upload" className="file-upload-button-planner">  
                            <MdAddPhotoAlternate className="moveiconpic-planner" />  
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
                            {data.map(user => (  
                                <div key={user.id}>  
                                    <label>  
                                        <input  
                                            type="checkbox"  
                                            checked={selectedUsers.includes(user.user_name)}  
                                            onChange={() => handleUserSelection(user.user_name)}  
                                        />  
                                        {user.user_name}  
                                    </label>  
                                </div>  
                            ))}  
                        </div>  
                    )}  
                </div>  
    
                <div className="form-item category-label" onClick={handleCategoryClick} >  
                    {categoryImage ? (  
                        <img src={categoryImage} alt="Category" className="selected-category-image" />  
                    ) : (  
                        <MdArrowDropDown size={24} style={{marginTop :10}} />  
                    )}  
                </div>  

                <Menu  
                    anchorEl={anchorEl}  
                    open={Boolean(anchorEl)}  
                    onClose={() => setAnchorEl(null)}  
                >  
                    {categories.map((category) => (  
                        <MenuItem key={category.name} onClick={() => handleCategorySelect(category)}>  
                            <span>{category.name}</span>  
                            <img src={category.thumbnail} alt={category.name} style={{ width: 30, marginLeft: 10 }} />  
                        </MenuItem>  
                    ))}  
                </Menu>  
                
    

                <div className="row">  
                    <div className="form-item"> 
                    <FormControl variant="outlined" fullWidth>  
                            <InputLabel id="category-label">  
                                Paid by  
                            </InputLabel>  
                            <Select  
                                name="userName"  
                                labelId="category-label"  
                                label="Category"  
                                value={formValue.userName}  
                                onChange={handleChange}  
                                error={!!errors.category} 
                                helperText={errors.userName}  
                            >  
                                <MenuItem value="">  
                                    <em>Select Who has payed</em>  
                                </MenuItem>  
                                {data.map((category) => (  
                                    <MenuItem key={category.id} value={category.user_name}>  
                                        {category.user_name}  
                                    </MenuItem>  
                                ))}  
                            </Select>  
                            {errors.category && <div className="error-message">{errors.category}</div>}  
                        </FormControl>     
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
                    <div className="form-item bill-date">  
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
                <div>
                    <img src={imgcategory}></img>
                </div>
                <Button className="btn" type="submit" variant="contained" onClick={handleAddExpense}>  
                    Add  
                </Button>  
            </form>  
        </div>  
    );  
};  

export default AddExpense;