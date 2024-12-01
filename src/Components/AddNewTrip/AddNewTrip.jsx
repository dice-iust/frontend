import React, { useState } from 'react';
import { TextField, MenuItem, Button, FormHelperText, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';

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
    console.log(errors,'errors')  // To handle error messages

    const validateField = (name, value) => {
        const newErrors = { ...errors };  // Copy current errors

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
        <div>
            <form onSubmit={handleAddTrip}>
                <div className='trip-pic'>
                    <TextField
                        type="file"
                        name="picture"
                        variant="outlined"
                        onChange={handleFileChange}
                    />
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
                    />
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

                <div className="trip-description">
                    <TextField
                        value={tripData.description}
                        label="Description"
                        variant="outlined"
                        name="description"
                        onChange={handleChange}
                        multiline
                        rows={5}
                        required
                        error={!!errors.description}
                        helperText={errors.description}
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

                <div className="trip-group">
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
                    />
                </div>

                <div className="trip-status">
                    <TextField
                        id="status"
                        select
                        label="Status"
                        value={tripData.status}
                        name='status'
                        onChange={handleChange}
                        required
                        error={!!errors.status}
                        helperText={errors.status}
                    >
                        <MenuItem value="Fancy">Fancy</MenuItem>
                        <MenuItem value="Economy">Economy</MenuItem>
                    </TextField>
                </div>

                <div className="trip-state">
                    <TextField
                        id="state"
                        select
                        label="State"
                        value={tripData.state}
                        name='state'
                        onChange={handleChange}
                        required
                        error={!!errors.state}
                        helperText={errors.state}
                    >
                        <MenuItem value="Public">Public</MenuItem>
                        <MenuItem value="Private">Private</MenuItem>
                    </TextField>
                </div>

                <div className="trip-state">
                    <TextField
                        id="transportation"
                        select
                        label="Transportation Method"
                        value={tripData.transportation}
                        name="transportation"
                        onChange={handleChange}
                        required
                        error={!!errors.transportation}
                        helperText={errors.transportation}
                    >
                        <MenuItem value="Bus">Bus</MenuItem>
                        <MenuItem value="Car">Car</MenuItem>
                    </TextField>
                </div>

                <Button type="submit" variant="contained" onClick={handleAddTrip}>Submit</Button>
            </form>
        </div>
    );
};

export default AddNewTrip;
