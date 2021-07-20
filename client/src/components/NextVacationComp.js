import React from "react";
import "../css/style.css";
const NextVacationComp = (props) => {
  let img = "http://localhost:5004/" + props.vacation.ImageName;
  return (
    <div>
      <div className="mb-3 nextVacationCard  mx-auto">
        <div className="row">
          <div className="col-lg-6">
            <div className="card-body">
              <h4 className="card-title">
                Dates: {props.vacation.StartDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}-{props.vacation.EndDate === null ? "" : props.vacation.StartDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}
              </h4>
              <h4 className="card-title">{props.vacation.Destination}</h4>
              <p className="card-title">{props.vacation.Description}</p>
              <h5 className="card-title">Price: {props.vacation.Price}&#36;</h5>
            </div>
          </div>
          <div className="col-lg-6 nextVacationDiv">
            <img src={img} className="nextVacationImg" alt={props.vacation.Destination} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextVacationComp;
