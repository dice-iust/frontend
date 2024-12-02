import React, { useState } from "react";
import "./ExpenseUserList.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import ExpenseDetails from "./ExpenseDetails";

const NewExpense = (props) => {
  const { username, title, price, id, date, description } = props;
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails((prev) => !prev);
    // const findData = detailsDataJson.find((item) => item.id === id);
    // setDetailsData(findData);
  };

  return (
    <>
      <div
        // className="newExpense-box"
        className={
          showDetails ? "newExpense-box-showDetails" : "newExpense-box"
        }
      >
        <div className="expense-box">
          <span>Username</span>
          <div className="">{username}</div>
        </div>

        <div className="expense-box">
          <span>Title</span>
          <div className="">{title}</div>
        </div>

        <div className="expense-box">
          <span>Amount</span>
          <div className="">{price} $</div>
        </div>

        <MdKeyboardArrowDown
          className="arrowIcon"
          onClick={() => handleShowDetails()}
        />
      </div>
      {/* {showDetails ? <ExpenseDetails data={detailsData} /> : null} */}
      {showDetails ? (
        <div className="details-box">
          <div className="expense-box">
            <span>Description:</span>
            <div className="">{description}</div>
          </div>
          <div className="expense-box">
            <span>Date:</span>
            <div className="">{date}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NewExpense;
