import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";

class RegistrationComp extends Component {
  componentDidMount() {}
  // patterns OBJ
  inputsObj = {};

  onChangeFN = (e) => {
    this.inputsObj[e.target.id] = e.target.value;
    console.log("new Input To inputsObj :", e.target.id, "value: ", e.target.value);
  };

  insertUserToDB = async () => {
    let currentObj = {
      FirstName: this.inputsObj.FirstName,
      LastName: this.inputsObj.LastName,
      Email: this.inputsObj.Email,
      Password: this.inputsObj.Password,
      Role: 0,
    };

    if (currentObj.FirstName === undefined || currentObj.LastName === undefined || currentObj.Email === undefined || currentObj.Password === undefined) {
      alert("All fields must be filled out");
    } else {
      try {
        let user = await Api.postRequest("/users/insertUserToDb", currentObj);
        if (user.statusText === "OK") {
          if (user.data.name === "SequelizeUniqueConstraintError") {
            alert("user is already exists, Please try another email");
          } else {
            console.log("insert user answer: ", user.data);
            let OBJ = {
              Email: user.data.Email,
              Password: user.data.Password,
            };
            try {
              let user = await Api.postRequest(`/users/getUserFromDb`, OBJ);
              this.props.updateUser(user.data);
            } catch (err) {
              console.log("Error ", err);
              alert("Something went wrong, please try again");
            }
          }
        } else {
          alert("something went wrong, please try again");
        }
      } catch (err) {
        console.log("Error ", err);
        alert("Something went wrong, please try again");
      }
    }
  };

  render() {
    return (
      <div>
        <div className="container p-3 mt-3">
          <div className="row">
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>
            <div className="col">
              <label htmlFor="FirstName">First Name:</label>
              <input type="text" id="FirstName" className="form-control" onChange={(e) => this.onChangeFN(e)} />
              <label htmlFor="Email">Email:</label>
              <input type="email" id="Email" className="form-control" onChange={(e) => this.onChangeFN(e)} />
            </div>
            <div className="col">
              <label htmlFor="LastName">Last Name:</label>
              <input type="text" id="LastName" className="form-control" onChange={(e) => this.onChangeFN(e)} />
              <label htmlFor="Password">Password:</label>
              <input type="password" id="Password" className="form-control" onChange={(e) => this.onChangeFN(e)} />
            </div>
            <button className="btn btn-dark mt-3" data-bs-dismiss="modal" onClick={() => this.insertUserToDB()}>
              add user
            </button>
          </div>
        </div>
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
    // graph
    vacationsNames: state.vacationsNames,
    numberOfStars: state.numberOfStars,
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
    // graph
    updateVacationsNames(value) {
      dispatch({
        type: "updateVacationsNames",
        payload: value,
      });
    },
    updateNumberOfStars(value) {
      dispatch({
        type: "updateNumberOfStars",
        payload: value,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationComp);
