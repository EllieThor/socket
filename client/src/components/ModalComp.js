import React from "react";
import ReactDOM from "react-dom";

import LogInComp from "./FormLogInComp";
import RegistrationComp from "./FormRegisterComp";
import VacationComp from "./FormVacationComp";

const Modal = (props) => {
  return (
    <div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mb-3 fw-normal text-center" id="exampleModalLabel">
                Vacations Stars
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">{props.content === 1 ? <LogInComp /> : props.content === 2 ? <RegistrationComp /> : props.content === 3 ? <VacationComp /> : "error, please reload again"}</div>
            <div className="modal-footer">
              <button type="reset" className="btn btn-dark" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// ReactDOM.render(<Modal />, document.getElementById("root"));
export default Modal;
