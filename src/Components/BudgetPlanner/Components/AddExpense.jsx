import React, { useState } from "react";
import "./AddExpense.scss";

const AddExpense = (props) => {
  const { setExpData, setShowAddExpense } = props;

  const [formValue, setFormValue] = useState({
    userName: "",
    title: "",
    amount: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    setExpData((prev) => [...prev, formValue]);
    setShowAddExpense(false);
  };
  return (
    <div className="main-add-div">
      <form action="submit">
        <div>
          <input
            type="text"
            name="userName"
            value={formValue.userName}
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="title"
            value={formValue.title}
            placeholder="Title"
            onChange={handleChange}
          />
          <input
            type="text"
            name="amount"
            value={formValue.amount}
            placeholder="Amount"
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            type="text"
            name="description"
            value={formValue.description}
            placeholder="Description"
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={formValue.date}
            onChange={handleChange}
          />
        </div>
      </form>
      <button className="btn" type="submit" onClick={handleAddExpense}>
        add
      </button>
    </div>
  );
};

export default AddExpense;
