import React, { useState } from "react";  
import "./AddExpense.scss";  

const AddExpense = (props) => {  
    const { setExpData, setShowAddExpense, handleExpenseListToggle } = props;  

    const [formValue, setFormValue] = useState({  
        userName: "",  
        title: "",  
        amount: "",  
        date: "",  
        description: "",  
        category: ""  
    });  

    const [selectedImage, setSelectedImage] = useState("");  
    const [uploadedImage, setUploadedImage] = useState(null);  
    const [errors, setErrors] = useState({});  
    const [splitType, setSplitType] = useState("equal"); // New state for split type  
    const [selectedUsers, setSelectedUsers] = useState([]); // State for selected users  

    const categories = ["Accommodation", "Entertainment", "Groceries", "Healthcare", "Insurance",
      "Rent_Charges","Restaurunt_Bars","Shopping","Transport", "Other"];  

    // Sample user list (replace this with real data)  
    const users = ["Alice", "Bob", "Charlie", "David", "Eva"];  

    const categoryImages = {  
        Accommodation: "https://example.com/accommodation.jpg",  
        Entertainment: "https://example.com/entertainment.jpg",  
        Groceries: "https://example.com/groceries.jpg",  
        Healthcare: "https://example.com/healthcare.jpg",  
        Insurance: "https://example.com/insurance.jpg",  
        Rent: "https://example.com/Rent_Charges.jpg",  
        Restaurunt: "https://example.com/Restaurunt_Bars.jpg",  
        Shopping: "https://example.com/shopping.jpg",  
        Transport: "https://example.com/transport.jpg",  
        Other: "https://example.com/other.jpg"  
    };  

    const handleChange = (e) => {  
        const { name, value, type, files } = e.target;  
        if (type === "file") {  
            const file = files[0];  
            if (file) {  
                setUploadedImage(URL.createObjectURL(file));  
            }  
        } else {  
            setFormValue((prev) => ({  
                ...prev,  
                [name]: value  
            }));  

            if (name === "category") {  
                setSelectedImage(categoryImages[value] || "");  
            }  

            if (errors[name]) {  
                setErrors((prev) => ({ ...prev, [name]: "" }));  
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
        } else if (new Date(formValue.date) > new Date()) {  
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
            users: splitType === "specificUser" ? selectedUsers : [formValue.userName], // Use selected users or the single user  
            title: formValue.title,  
            amount: Number(formValue.amount),  
            date: formValue.date,  
            description: formValue.description,  
            category: formValue.category,  
            id: Date.now(),  
            uploadedImage: uploadedImage  
        };  

        setExpData((prev) => [...prev, newExpense]);  
        setShowAddExpense(false);  
        handleExpenseListToggle();  
        setFormValue({  
            userName: "",  
            title: "",  
            amount: "",  
            date: "",  
            description: "",  
            category: ""  
        });  
        setSelectedImage("");  
        setUploadedImage(null);  
        setErrors({});  
        setSplitType("equal"); // Resetting split type after submission  
        setSelectedUsers([]); // Resetting selected users  
    };  

    const handleSplitSelection = (type) => {  
        setSplitType(type);  
        if (type === "equal") {  
            setSelectedUsers([]); // Reset selected users when switching to equal  
        }  
    };  

    const handleUserSelection = (user) => {  
        setSelectedUsers((prevSelected) => {  
            if (prevSelected.includes(user)) {  
                return prevSelected.filter(u => u !== user); // Remove user if already selected  
            } else {  
                return [...prevSelected, user]; // Add user to the selection  
            }  
        });  
    };  

    return (  
        <div className="main-add-div">  
            <form onSubmit={handleAddExpense}>  

                {/* Split Selection Row */}  
                <div className="split-selection-row">  
                    <button   
                        type="button"   
                        className={`split-button ${splitType === 'equal' ? 'active' : ''}`}   
                        onClick={() => handleSplitSelection('equal')}  
                    >  
                        Split Equally  
                    </button>  
                    <button   
                        type="button"   
                        className={`split-button ${splitType === 'specificUser' ? 'active' : ''}`}   
                        onClick={() => handleSplitSelection('specificUser')}  
                    >  
                        Select Users  
                    </button>  
                </div>  

                {/* Conditional rendering of user selection when splitting by specific users */}  
                {splitType === 'specificUser' && (  
                    <div className="user-selection">  
                        <h3>Select Users:</h3>  
                        {users.map((user) => (  
                            <div key={user}>  
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
                )}  

                <div className="row">  
                    <div className="form-item">  
                        <label htmlFor="userName" style={{ color: '#22487a' }}>Paid By</label>  
                        <input  
                            type="text"  
                            name="userName"  
                            id="userName"  
                            value={formValue.userName}  
                            placeholder="Username"  
                            onChange={handleChange}  
                        />  
                        {errors.userName && <div className="error-message">{errors.userName}</div>}  
                    </div>  
                    <div className="form-item">  
                        <label htmlFor="title" style={{ color: '#22487a' }}>Title</label>  
                        <input  
                            type="text"  
                            name="title"  
                            id="title"  
                            value={formValue.title}  
                            placeholder="Title"  
                            onChange={handleChange}  
                        />  
                        {errors.title && <div className="error-message">{errors.title}</div>}  
                    </div>  
                </div>  

                <div className="row">  
                    <div className="form-item">  
                        <label htmlFor="amount" style={{ color: '#22487a' }}>Amount</label>  
                        <input  
                            type="text"  
                            name="amount"  
                            id="amount"  
                            value={formValue.amount}  
                            placeholder="Amount"  
                            onChange={handleChange}  
                        />  
                        {errors.amount && <div className="error-message">{errors.amount}</div>}  
                    </div>  
                    <div className="form-item">  
                        <label htmlFor="date" style={{ color: '#22487a' }}>Date</label>  
                        <input  
                            type="date"  
                            name="date"  
                            id="date"  
                            value={formValue.date}  
                            onChange={handleChange}  
                        />  
                        {errors.date && <div className="error-message">{errors.date}</div>}  
                    </div>  
                </div>  

                <div className="form-item">  
                    <label htmlFor="category" style={{ color: '#22487a' }}>Category</label>  
                    <select  
                        name="category"  
                        id="category"  
                        value={formValue.category}  
                        onChange={handleChange}  
                    >  
                        <option value="">Select a category</option>  
                        {categories.map((category) => (  
                            <option key={category} value={category}>  
                                {category}  
                            </option>  
                        ))}  
                    </select>  
                    {errors.category && <div className="error-message">{errors.category}</div>}  
                </div>  

                {selectedImage && (  
                    <div className="category-image">  
                        <img src={selectedImage} alt={formValue.category} style={{ width: "100px", height: "auto", marginTop: "10px" }} />  
                    </div>  
                )}  

                <div className="form-item">  
                    <label htmlFor="uploadedImage" style={{ color: "#22487a" }}>Upload Image of Bill</label>  
                    <input  
                        type="file"  
                        name="uploadedImage"  
                        id="uploadedImage"  
                        accept="image/*"  
                        onChange={handleChange}  
                    />  
                </div>  

                {uploadedImage && (  
                    <div className="uploaded-image-preview">  
                        <img src={uploadedImage} alt="Uploaded bill" style={{ width: "100px", height: "auto", marginTop: "10px" }} />  
                    </div>  
                )}  

                <div className="form-item">  
                    <label htmlFor="description" style={{ color: "#22487a" }}>Description</label>  
                    <textarea  
                        name="description"  
                        id="description"  
                        value={formValue.description}  
                        placeholder="Description"  
                        onChange={handleChange}  
                    />  
                </div>  

                <button className="btn" type="submit">  
                    Add  
                </button>  
            </form>  
        </div>  
    );  
};  

export default AddExpense;