import React, {useState} from 'react'
import './ExpenseUserList.scss'
import { MdKeyboardArrowDown } from "react-icons/md"; 
import ExpenseDetails from './ExpenseDetails';
import {detailsDataJson} from '../../../api/jsondata/planner'


const NewExpense = (props) => {
  const [showDetails, setShowDetails] = useState(false) 
  const [detailsData, setDetailsData] = useState({})

  const handleShowDetails = (id) =>{
    setShowDetails(prev => !prev)
    const findData = detailsDataJson.find((item)=>item.id === id)
    setDetailsData(findData)
  }

  return (
      <>
        <div className={showDetails ? 'newExpense-box-showDetails' : 'newExpense-box' }>
          <div className='profile-expense'>
            <div><img src={props.profilePic} alt="profile-img" /></div>
            <div className="">{props.username}</div>
          </div>
          <div className="">{props.title}</div>
          <div className='amount-box'>
            <div className="amount"><span>Amount</span></div>
            <div className="">{props.price} $</div>
          </div>
          <MdKeyboardArrowDown className='arrowIcon' onClick={() =>handleShowDetails(props.id)}/>
        </div>
        {showDetails ?  <ExpenseDetails data={detailsData}/> : null}
      </>
  )
}

export default NewExpense
