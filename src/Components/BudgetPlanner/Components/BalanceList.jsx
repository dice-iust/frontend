import React from 'react';  
import './BalanceList.scss'; // Optional: Style your component  

const BalanceList = ({ balances, setBalances }) => {  
    const handleMarkAsPaid = (id) => {  
        setBalances((prev) => prev.filter(item => item.id !== id));  
    };  

    return (  
        <div className="w3-container">  
        <h2 style={{color:"#22487a"}}>My Trips</h2>  
  
        <div className="w3-row">  
          <div className={`tablink ${activeTab === 'London' ? 'w3-border-red' : ''}`} onClick={() => openCity('London')}>  
            Current  
          </div>  
          <div className={`tablink ${activeTab === 'Paris' ? 'w3-border-red' : ''}`} onClick={() => openCity('Paris')}>  
            Future  
          </div>  
          <div className={`tablink ${activeTab === 'Tokyo' ? 'w3-border-red' : ''}`} onClick={() => openCity('Tokyo')}>  
            Past  
          </div>  
        </div>  
  
        {activeTab === 'London' && (  
        <div className="city">  
            <h2 style={{ color: "#22487a" }}>Current Trips</h2>  
            <br/>     
            <div className="tour-list-container2">  
                {datacurrent && datacurrent.length >= 1 ? (  
                    <div className="balance-list">  
                        <h2>Balance List</h2>  
                        {balances.length === 0 ? (  
                            <p>No outstanding balances.</p>  
                        ) : (  
                            balances.map((item) => (  
                                <div key={item.id} className="balance-item" style={{ color: item.type === 'owing' ? 'red' : 'green' }}>  
                                    <p><strong style={{ color: '#5767aa' }}>{item.name}:</strong> ${item.amount}</p>  
                                    <button onClick={() => handleMarkAsPaid(item.id)}>Mark as Paid</button>  
                                </div>  
                            ))  
                        )}  
                    </div>  
                ) : (  
                    <div style={{ textAlign: "center" }}>   
                        <br/>   
                        <p style={{ fontWeight: "bold", fontSize: "20px" }}>You have no current trips!</p>  
                        <img src={dataphoto} alt="No trips" />  
                    </div>  
                )}    
            </div>   
        </div>  
    )}
  
        {activeTab === 'Paris' && (  
          <div className="city">  
            <h2 style={{color:"#22487a"}}>Future Trips</h2>  
            <br/>     
              <div className="tour-list-container2">  
                  {datafuture && datafuture.length>=1 ? (  
                      <div className="tour-list2">  
                          {datafuture.map((tour) => (  
                              <div key={tour.travel_is.Id} className="tour-card2">  
                                  <div className="tour-image-container2">  
                                      <img  
                                          src={tour.travel_is.image_url}  
                                          alt={`Image of ${tour.name}`}  
                                          className="tour-image2"  
                                      />  
                                      {tour.travel_is.admin && (  
                                          <div className="tour-admin2">  
                                              <img  
                                                  src={tour.travel_is.admin.phrofile_image}   
                                                  alt={`Profile of ${tour.travel_is.admin.user_name}`}  
                                                  className="admin-photo2"  
                                              />  
                                              {tour.travel_is.admin.user_name}   
                                          </div>  
                                      )}  
                                  </div>  
                                  <div className="tour-info2">  
                                      <p className="tour-meta3">  
                                          <span className="tour-name2">{tour.travel_is.name}</span>  
                                          <div className={`trip-type2 ${tour.travel_is.mode}`}>  
                                              <GrMoney aria-hidden="true" />{" "}  
                                              {tour.travel_is.mode.charAt(0).toUpperCase() + tour.travel_is.mode.slice(1)}  
                                          </div>  
                                      </p>  
                                      <div className="tour-details2">  
                                          <p className="tour-route2">  
                                              <span className="tour-text2">{tour.travel_is.start_place} {getTransportationIcon(tour.travel_is.transportation)} {tour.travel_is.destination}</span>  
                                          </p>  
                                      </div>  
                                      <div className="tour-meta7">  
                                          <p className="tour-dates2">  
                                              <FaRegCalendar className='moveicon3' />  
                                              <span>{formatDate(tour.travel_is.start_date)}</span>  
                                          </p>  
                                          <p className="tour-length2" style={{ textAlign: "left" }}>  
                                              <FaUndoAlt className='moveicon3' />  
                                              {formatDate(tour.travel_is.end_date)}  
                                          </p>  
                                      </div>   
                                  </div>  
                              </div>  
                          ))}  
                      </div>  
                  ) : (  
                      <div style={{ textAlign: "center"}}> 
                      <br/> 
                      <p style={{ fontWeight: "bold", fontSize: "20px"}}>You have no future trips!</p>  
                          <img src={dataphoto} alt="No trips" />  
  
                  </div>
                  )}    
              </div> 
          </div>  
        )}  
  
        {activeTab === 'Tokyo' && (  
          <div className="city">  
            <h2 style={{color:"#22487a"}}>Past Trips</h2>  
            <br/>     
              <div className="tour-list-container2">  
                  {datapast && datapast.length>=1 ? (  
                      <div className="tour-list2">  
                          {datapast.map((tour) => (  
                              <div key={tour.travel_is.Id} className="tour-card2">  
                                  <div className="tour-image-container2">  
                                      <img  
                                          src={tour.travel_is.image_url}  
                                          alt={`Image of ${tour.name}`}  
                                          className="tour-image2"  
                                      />  
                                      {tour.travel_is.admin && (  
                                          <div className="tour-admin2">  
                                              <img  
                                                  src={tour.travel_is.admin.phrofile_image}   
                                                  alt={`Profile of ${tour.travel_is.admin.user_name}`}  
                                                  className="admin-photo2"  
                                              />  
                                              {tour.travel_is.admin.user_name}   
                                          </div>  
                                      )}  
                                  </div>  
                                  <div className="tour-info2">  
                                      <p className="tour-meta3">  
                                          <span className="tour-name2">{tour.travel_is.name}</span>  
                                          <div className={`trip-type2 ${tour.travel_is.mode}`}>  
                                              <GrMoney aria-hidden="true" />{" "}  
                                              {tour.travel_is.mode.charAt(0).toUpperCase() + tour.travel_is.mode.slice(1)}  
                                          </div>  
                                      </p>  
                                      <div className="tour-details2">  
                                          <p className="tour-route2">  
                                              <span className="tour-text2">{tour.travel_is.start_place} {getTransportationIcon(tour.travel_is.transportation)} {tour.travel_is.destination}</span>  
                                          </p>  
                                      </div>  
                                      <div className="tour-meta7">  
                                          <p className="tour-dates2">  
                                              <FaRegCalendar className='moveicon3' />  
                                              <span>{formatDate(tour.travel_is.start_date)}</span>  
                                          </p>  
                                          <p className="tour-length2" style={{ textAlign: "left" }}>  
                                              <FaUndoAlt className='moveicon3' />  
                                              {formatDate(tour.travel_is.end_date)}  
                                          </p>  
                                      </div>   
                                  </div>  
                              </div>  
                          ))}  
                      </div>  
                  ) : (  
                      <div style={{ textAlign: "center"}}> 
                      <br/> 
                      <p style={{ fontWeight: "bold", fontSize: "20px"}}>You have no past trips!</p>  
                          <img src={dataphoto} alt="No trips" />  
  
                  </div>
                  )}    
              </div> 
          </div>  
        )}  
      </div>   
    );  
  };   

export default BalanceList;