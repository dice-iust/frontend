import React, { useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Radio, RadioGroup, FormControlLabel, FormLabel,FormControl, FormHelperText } from '@mui/material';
import axios from 'axios';
import "./AddNewTrip.scss";

const AddNewTrip = () => {
    const [tripData, setTripData] = useState({
        picture: '',
        title: '',
        description: '',
        startDate: null,
        endDate: null,
        groupNo: '',
        status: '',
        transportation: '',
        destination: '',
        startingPoint: '',
        state: '',
    });
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        switch (name) {
            case 'title':
                newErrors.title = value ? '' : 'Title is required';
                break;
            case 'description':
                newErrors.description = value ? '' : 'Description is required';
                break;
            case 'startDate':
                newErrors.startDate = value ? '' : 'Start Date is required';
                break;
            case 'endDate':
                newErrors.endDate = value ? '' : 'End Date is required';
                break;
            case 'groupNo':
                newErrors.groupNo = value ? '' : 'Participants count is required';
                break;
            case 'status':
                newErrors.status = value ? '' : 'Status is required';
                break;
            case 'transportation':
                newErrors.transportation = value ? '' : 'Transportation method is required';
                break;
            case 'destination':
                newErrors.destination = value ? '' : 'Destination is required';
                break;
            case 'startingPoint':
                newErrors.startingPoint = value ? '' : 'Starting point is required';
                break;
            case 'state':
                newErrors.state = value ? '' : 'State is required';
                break;
            default:
                break;
        }
        setErrors(newErrors);  // Update the errors state dynamically
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripData({ ...tripData, [name]: value });
        validateField(name, value);  // Validate the field on change
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setTripData({ ...tripData, picture: URL.createObjectURL(file) });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(tripData).forEach((key) => {
            if (!tripData[key] && key !== 'picture') {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const postTripData = async () => {
        const formDataImage = new FormData();

        if (image) {
            formDataImage.append('picture', image);
        }

        formDataImage.append('title', tripData.title);
        formDataImage.append('description', tripData.description);
        formDataImage.append('startDate', tripData.startDate.format('YYYY-MM-DD'));
        formDataImage.append('endDate', tripData.endDate.format('YYYY-MM-DD'));
        formDataImage.append('groupNo', tripData.groupNo);
        formDataImage.append('status', tripData.status);
        formDataImage.append('transportation', tripData.transportation);
        formDataImage.append('destination', tripData.destination);
        formDataImage.append('startingPoint', tripData.startingPoint);
        formDataImage.append('state', tripData.state);

        try {
            const response = await axios.post("https://triptide.pythonanywhere.com/editprofile/update_2/", formDataImage, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
        } catch (error) {
            console.error("Error adding new trip:", error);
        }
    };

    const handleAddTrip = (e) => {
        e.preventDefault();
        if (validateForm()) {
            postTripData();
        }
    };

    return (
        <div className='newtrip'>
            <form onSubmit={handleAddTrip}>
                <div className='trip-pic'>
                    <TextField
                        type="file"
                        name="picture"
                        variant="outlined"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="trip-status-state-wrapper">  
                <div className="trip-state">  
                    <FormLabel component="legend">State</FormLabel>  
                    <RadioGroup  
                        aria-label="state"  
                        name="state"  
                        value={tripData.state}  
                        onChange={handleChange}  
                    >  
                    <FormControlLabel  
                            value="Private"  
                            control={<Radio />}  
                            label="Private"  
                    />  
                    <FormControlLabel  
                            value="Public"  
                            control={<Radio />}  
                            label="Public"  
                    />  
                    </RadioGroup>  
                    {errors.state && <FormHelperText error>{errors.state}</FormHelperText>}  
                </div>


                <div className="trip-status">  
                    <FormLabel component="legend">Status</FormLabel>  
                    <RadioGroup  
                        aria-label="status"  
                        name="status"  
                        value={tripData.status}  
                        onChange={handleChange}  
                    >  
                    <FormControlLabel  
                            value="Fancy"  
                            control={<Radio />}  
                            label="Fancy"  
                    />  
                    <FormControlLabel  
                            value="Budget-friendly"  
                            control={<Radio />}  
                            label="Budget-friendly"  
                    />  
                    </RadioGroup>  
                    {errors.status && <FormHelperText error>{errors.status}</FormHelperText>}  
                </div>
                </div>


                <div className="trip-title">
                    <TextField
                        value={tripData.title}
                        label="Title"
                        variant="outlined"
                        name="title"
                        onChange={handleChange}
                        required
                        error={!!errors.title}
                        helperText={errors.title}
                        style={{ marginRight: '20px' }}
                    />
                    <TextField
                        type="number"
                        label="Participants"
                        variant="outlined"
                        name="groupNo"
                        value={tripData.groupNo}
                        onChange={handleChange}
                        required
                        error={!!errors.groupNo}
                        helperText={errors.groupNo}
                        style={{ marginRight: '20px' }}
                    />
                    <TextField
                        id="transportation"
                        select
                        label="Transportation"
                        value={tripData.transportation}
                        name="transportation"
                        onChange={handleChange}
                        required
                        error={!!errors.transportation}
                        helperText={errors.transportation}
                    >
                        <MenuItem value="Bus">Bus</MenuItem>
                        <MenuItem value="Car">Car</MenuItem>
                        <MenuItem value="Car">Plane</MenuItem>
                        <MenuItem value="Car">Train</MenuItem>
                    </TextField>
                </div>


                <div className="trip-location">
                    <TextField
                        value={tripData.startingPoint}
                        label="Starting Point"
                        variant="outlined"
                        name="startingPoint"
                        onChange={handleChange}
                        required
                        error={!!errors.startingPoint}
                        helperText={errors.startingPoint}
                        style={{ marginRight: '20px' }}
                    />
                    <TextField
                        value={tripData.destination}
                        label="Destination"
                        variant="outlined"
                        name="destination"
                        onChange={handleChange}
                        required
                        error={!!errors.destination}
                        helperText={errors.destination}
                    />
                </div>


                <div className="trip-date">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            required
                            value={tripData.startDate}
                            label="Start from"
                            slotProps={{
                                textField: {
                                error:!!errors.startDate,
                                required: true,
                                helperText:errors.startDate
                                },
                              }}
                            onChange={(value) => { setTripData({ ...tripData, startDate: value }); validateField('startDate', value) }}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={tripData.endDate}
                            label="End at"
                            slotProps={{
                                textField: {
                                error:!!errors.endDate,
                                required: true,
                                helperText:errors.endDate
                                },
                              }}
                            onChange={(value) => { setTripData({ ...tripData, endDate: value }); validateField('endDate', value) }}
    
                        />
                    </LocalizationProvider>
                </div>

                
                <div className="trip-description">
                    <TextField
                        value={tripData.description}
                        label="Description"
                        variant="outlined"
                        name="description"
                        onChange={handleChange}
                        multiline
                        rows={2}
                        required
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                </div>

                

                

                <Button type="submit" variant="contained" onClick={handleAddTrip}>Submit</Button>
            </form>
        </div>
    );
};

export default AddNewTrip;
