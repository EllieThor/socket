import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import Modal from "./ModalComp";

class Header extends Component {
  componentDidMount() {}

  globalObj = {
    welcomeTime: "",
  };

  addVacationClicked = () => {
    // witch button
    this.props.updateVacationButtonsForm(0);
    //update modal content
    this.props.updateContent(3);
    //witch vacation edit
    // this.props.updateVacationToForm({});
    // console.log("AFTER UPDATE vacationToEdit : ", this.props.vacationToEdit);
  };

  updateContent = (value) => {
    this.props.updateContent(value);
  };
  // logOut
  logOutIconClicked = () => {
    this.props.updateUser([]);
  };

  render() {
    switch (Number(moment().format("H"))) {
      case 22:
      case 23:
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        this.globalObj.welcomeTime = "Good Night, ";
        break;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
        this.globalObj.welcomeTime = "Good Morning, ";
        break;
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        this.globalObj.welcomeTime = "Good Afternoon, ";
        break;
      case 19:
      case 20:
      case 21:
        this.globalObj.welcomeTime = "Good Evening, ";
        break;
      default:
        this.globalObj.welcomeTime = "Hello, ";
    }
    return (
      <div className="headerS p-4 pb-2">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="navbar-brand">
              <h2 className="logo">Vacation Stars</h2>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto pe-5 me-5">
                <h5 className="welcome me-2 pe-4"> {this.props.user[0] === undefined ? "" : this.globalObj.welcomeTime + this.props.user[0].FirstName + " " + this.props.user[0].LastName}</h5>
                <div className="row">
                  <div className="col-4">
                    {this.props.user[0] === undefined ? (
                      <abbr title="Log In">
                        <i className="fas fa-user-circle fa-2x iconsColor" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.updateContent(1)}></i>
                      </abbr>
                    ) : this.props.user[0].Role === 1 && window.location.pathname === "/Vacations" ? (
                      <Link to="/Reports">
                        <abbr title="Reports">
                          <i className="far fa-chart-bar fa-2x  iconsColor"></i>
                        </abbr>
                      </Link>
                    ) : this.props.user[0].Role === 1 && window.location.pathname === "/Reports" ? (
                      <Link to="/Vacations">
                        <abbr title="Back to Vacation">
                          <i className="fas fa-map-marked-alt fa-2x  iconsColor"></i>
                        </abbr>
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-4">
                    {(this.props.user[0] === undefined ? "" : this.props.user[0].Role) === 1 && window.location.pathname === "/Vacations" ? (
                      <abbr title="Add New Vacation">
                        {/* <i className="fas fa-plus fa-2x iconsColor" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.addVacationClicked()}></i> */}
                        <i className="fas fa-plus fa-2x iconsColor" data-bs-toggle="modal" data-bs-target="#vacationModal" onClick={() => this.addVacationClicked()}></i>
                      </abbr>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-4">
                    {this.props.user[0] === undefined ? (
                      <abbr title="Register">
                        <i className="fas fa-user-plus fa-2x iconsColor" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.updateContent(2)}></i>
                      </abbr>
                    ) : (
                      <Link to="/">
                        <abbr title="Log Out">
                          <i className="fas fa-sign-out-alt fa-2x iconsColor" onClick={this.logOutIconClicked}></i>
                        </abbr>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="row">
          <Modal content={this.props.content} />
          {/* <ModalTRY content={this.props.content} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
