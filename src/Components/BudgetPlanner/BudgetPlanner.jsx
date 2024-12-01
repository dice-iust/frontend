import React, { useEffect, useState } from 'react'
import ExpenseUserList from './Components/ExpenseUserList'
import AddExpense from './Components/AddExpense'
import {expenseData} from '../../api/jsondata/planner'
import pic from '../../public/UserDefaultImage/profile.jpg'


const BudgetPlanner = () => {
    const [expData, setExpData] = useState([])
    useEffect(() => {
        setExpData(expenseData)
    }, [])

    const newExpense = {
        srcPic: pic,
        amount: '120',
        username: 'parmis',
        title: 'supermarket',
        id: '4', // Make sure you use a unique id
    };

    const handleAddExpense = () =>{
        
       
    }
    console.log(expData)

  return (
    <div>
        <button onClick={handleAddExpense}>Add Expenses</button>
        {expData.map((item)=>{
            return(
                <ExpenseUserList username={item.username}
                                 title={item.title}
                                 price={item.amount}
                                 profilePic={item.srcPic}
                                 id={item.id}
                                 key={item.id}
                                 setExpData={setExpData}
                                  /> 
            )
        })}
        <AddExpense setExpData={setExpData}/>
    </div>
  )
}

export default BudgetPlanner
