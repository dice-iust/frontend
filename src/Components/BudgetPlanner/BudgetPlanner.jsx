import React, { useEffect, useState } from "react";
import ExpenseUserList from "./Components/ExpenseUserList";
import AddExpense from "./Components/AddExpense";
import { expenseData } from "../../api/jsondata/planner";
import pic from "../../public/UserDefaultImage/profile.jpg";

const BudgetPlanner = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expData, setExpData] = useState([]);

  useEffect(() => {
    setExpData(expenseData);
  }, []);

  const handleAddExpense = () => {
    setShowAddExpense((prev) => !prev);
  };

  return (
    <div>
      <button onClick={handleAddExpense}>Add Expenses</button>

      {showAddExpense ? (
        <AddExpense
          setExpData={setExpData}
          setShowAddExpense={setShowAddExpense}
        />
      ) : null}

      {expData.map((item) => {
        return (
          <ExpenseUserList
            username={item.username}
            title={item.title}
            price={item.amount}
            id={item.id}
            date={item.date}
            description={item.description}
            key={item.id}
            setExpData={setExpData}
          />
        );
      })}
    </div>
  );
};

export default BudgetPlanner;
