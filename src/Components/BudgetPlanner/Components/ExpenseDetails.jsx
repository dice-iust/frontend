import React from 'react'

const ExpenseDetails = (props) => {
    const {data}=props
  return (
      <div className='details-box'>
          <ul className='details-list'>
              <li><span>Date:</span>{data.date}</li>
              <li><span>Description:</span>{data.description}</li>
          </ul>
      </div>
  )
}

export default ExpenseDetails
