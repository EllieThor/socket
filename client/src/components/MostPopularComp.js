import React from "react";
import "../css/style.css";
const MostPopularComp = (props) => {
  let vacationCard =
    props.vacations === undefined
      ? ""
      : props.vacations.map((vacation, i) => {
          let img = "http://localhost:5004/" + vacation.ImageName;
          return (
            <div key={i} className="col-sm-12 col-md-6 col-xl-4 py-2 text-center">
              <div className="a-box">
                <div className="img-container">
                  <div className="img-inner">
                    <div className="inner-skew">
                      <img src={img} alt={vacation.ImageName} />
                    </div>
                  </div>
                </div>
                <div className="text-container">
                  <h2 className="card-text">{i === 0 ? "First Place" : i === 1 ? "Second Place" : i === 2 ? "Third Place" : ""}</h2>
                  <h3>{vacation.Destination}</h3>
                  <div>{vacation.Description}</div>
                  <h4>{vacation.Price}&#36;</h4>
                </div>
              </div>
            </div>
          );
        });

  return <div className="row">{vacationCard}</div>;
};

export default MostPopularComp;
