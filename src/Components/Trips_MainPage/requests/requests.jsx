import React from 'react';  
import './requests.scss';  

const mockRequests = [  
  { id: 1, name: 'John Doe', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s' },  
  { id: 2, name: 'Jane Smith', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s' },  
  { id: 3, name: 'Alice Johnson', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s' },  
  { id: 4, name: 'Bob Brown', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s' },  
];  

const RequestsPage = () => {  
  const handleConfirm = (id) => {  
    console.log(`Confirmed request from user ID: ${id}`);  
  };  

  const handleDelete = (id) => {  
    console.log(`Deleted request from user ID: ${id}`);  
  };  

  return (  
     
        <div className="requests-page">  
          <h1>User Requests</h1>  
          <div className="requests-container">  
            {mockRequests.map((request) => (  
              <div className="request-card" key={request.id}>  
                <div className="card-content">  
                  <img src={request.photo} alt={request.name} className="user-photo" />  
                  <div className="user-info">  
                    <h2 className="user-name">{request.name}</h2>  
                    <div className="button-group">  
                      <button  
                        className="confirm-button"  
                        onClick={() => handleConfirm(request.id)}  
                      >  
                        Confirm  
                      </button>  
                      <button  
                        className="delete-button"  
                        onClick={() => handleDelete(request.id)}  
                      >  
                        Delete  
                      </button>  
                    </div>  
                  </div>  
                </div>  
              </div>  
            ))}  
          </div>  
        </div>  
      );  
    };  
  

export default RequestsPage;