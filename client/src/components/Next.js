import React from "react";
import "../css/style.css";

const Next = (props) => {
  let img = "http://localhost:5004/" + props.vacation.ImageName;
  return (
    <div>
      <div className="a-box">
        <div className="img-container-green">
          <div className="img-inner">
            <div className="inner-skew-purple">
              <img className="IMGNext" alt="" src="http://localhost:5004/cyprus.png" />
            </div>
          </div>
        </div>
        <div className="text-container-orange">
          <h3>A blue bird</h3>
          <div>This a demo experiment to skew image container. It looks good.</div>
        </div>
      </div>
    </div>
  );
};
export default Next;
