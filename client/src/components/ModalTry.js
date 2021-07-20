import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";

import LogInComp from "./FormLogInComp";
import RegistrationComp from "./FormRegisterComp";
import VacationComp from "./FormVacationComp";

class ModalTry extends Component {
  render() {
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
              <div className="modal-body">{this.props.content === 1 ? <LogInComp /> : this.props.content === 2 ? <RegistrationComp /> : this.props.content === 3 ? <VacationComp /> : "error, please reload again"}</div>
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
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,

    // vacationForm
    vacationFormButtonsStatus: state.vacationFormButtonsStatus,
    vacationToEdit: state.vacationToEdit,
    //modal
    content: state.content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser(value) {
      dispatch({
        type: "updateUser",
        payload: value,
      });
    },
    // vacation form
    updateVacationButtonsForm(value) {
      dispatch({
        type: "updateVacationButtonsForm",
        payload: value,
      });
    },
    updateVacationToForm(value) {
      dispatch({
        type: "updateVacationToForm",
        payload: value,
      });
    },
    //modal
    updateContent(value) {
      dispatch({
        type: "updateContent",
        payload: value,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalTry);
