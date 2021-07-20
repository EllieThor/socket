import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";

class LogInComp extends Component {
  componentDidMount() {}
  // patterns OBJ
  inputsObj = {};

  onChangeFN = (e) => {
    this.inputsObj[e.target.id] = e.target.value;
    console.log("new Input To inputsObj :", e.target.id, "value: ", e.target.value);
  };

  getUserFromDB = async () => {
    let OBJ = {
      Email: this.inputsObj.userEmail,
      Password: this.inputsObj.userPassword,
    };
    try {
      let user = await Api.postRequest(`/users/getUserFromDb`, OBJ);
      this.props.updateUser(user.data);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  updateContent = (value) => {
    this.props.updateContent(value);
  };

  render() {
    return (
      <div className="container p-3 mt-3">
        <h1 className="h3 mb-3 fw-normal">Please Log In</h1>
        <input type="email" id="userEmail" className="form-control m-2" placeholder="Email address" required="" autoFocus="" onChange={(e) => this.onChangeFN(e)} />
        <input type="password" id="userPassword" className="form-control  m-2" placeholder="Password" required="" autoComplete="" onChange={(e) => this.onChangeFN(e)} />
        <button className="w-100 btn btn-lg m-2 btn-dark" data-bs-dismiss="modal" onClick={() => this.getUserFromDB()}>
          Log in
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    vacations: state.vacations,
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
    updateVacations(value) {
      dispatch({
        type: "updateVacations",
        payload: value,
      });
    },
    updateUser(value) {
      dispatch({
        type: "updateUser",
        payload: value,
      });
    },

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

export default connect(mapStateToProps, mapDispatchToProps)(LogInComp);
