
import React from "react";
import PickMeals from "../Assets/group.png";
import ChooseMeals from "../Assets/map.png";
import DeliveryMeals from "../Assets/manage-money.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Explore Together",
      text: " Find the perfect group to explore the world with! Whether you're looking for adventure, relaxation, or cultural experiences, our platform connects like-minded travelers",
    },
    {
      image: ChooseMeals,
      title: "Find the Best Destination",
      text:"Explore the world's hidden gems and popular destinations with our travel guide!  Discover adventurous activities, local favorites, and travel tips to make your next trip unforgettable.",
    },
    {
      image: DeliveryMeals,
      title: "Manage expenses",
      text: "Take control of your travel expenses with our Travel Budget Calculator! Easily estimate the total cost of your trip. ",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
