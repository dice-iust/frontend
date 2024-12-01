import React, { useState } from 'react'

const AddExpense = (props) => {
    const {setExpData} = props

    const [formValue, setFormValue] = useState({
        expensePic :'',
        userName: '',
        title:'',
        amount:'',
        description: '',
        date:'',
    })

    const handleChange = (e) =>{
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }
    
    const handleAddExpense = (e)=>{
        e.preventDefault();
        setExpData((prev)=>([...prev,formValue]))
    }
    
  return (
    <>
      <form action="submit">
        <div className="expense-input">
            <input type="file" name='expensePic' value={formValue.expensePic} onChange={handleChange}/>
        </div>
        <div className="expense-input">
            <input type="text" name='userName' value={formValue.userName} placeholder='Username' onChange={handleChange}/>
        </div>
        <div className="expense-input">
            <input type="text" name='title' value={formValue.title} placeholder='Title' onChange={handleChange}/>
        </div>
        <div className="expense-input">
            <input type="text" name='amount' value={formValue.amount} placeholder='Amount' onChange={handleChange}/>
        </div>
        <div className="expense-input">
            <textarea type="text" name='description' value={formValue.description} placeholder='Description' onChange={handleChange}/>
        </div>
        <div className="expense-input">
            <input type="date" name='date' value={formValue.date} onChange={handleChange}/>
        </div>
        <button className="btn" type='submit' onClick={handleAddExpense}>add</button>
      </form>
    </>
  )
}

export default AddExpense
