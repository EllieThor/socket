import React from "react";
import "../css/style.css";

const FollowIcon = (props) => {
  const isStar = props.vacation.follows.includes(props.userID);

  let addNewFollow = () => {
    return <i className="far fa-star" onClick={() => props.insertStarToDB(props.vacation.ID)}></i>;
  };
  let removeFollow = () => {
    return <i className="fas fa-star isStar" onClick={() => props.deleteStarFromDB(props.vacation.ID)}></i>;
  };
  return (
    <div className="row">
      <div className="col-6">
        <abbr title={isStar ? "Remove Star" : "Add Star"}>{isStar ? removeFollow() : addNewFollow()}</abbr>
      </div>
    </div>
  );
};

export default FollowIcon;
