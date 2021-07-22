import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
import { Redirect } from "react-router-dom";
import moment from "moment";

import Header from "../components/HeaderComp";
import Nav from "../components/NavComp";
import NextVacationComp from "../components/NextVacationComp";
import Next from "../components/Next";
import MostPopularComp from "../components/MostPopularComp";
import Footer from "../components/FooterComp";
class Home extends Component {
  componentDidMount() {
    this.getVacationsFromDB();
  }
  // patterns OBJ
  inputsObj = {
    nearestVacIndex: 0,
    threeVacations: [],
  };

  updateContent = (value) => {
    this.props.updateContent(value);
  };

  getVacationsFromDB = async () => {
    try {
      let vacations = await Api.postRequest(`/vacations/getVacationsFromDb`);
      let allVacations = vacations.data;

      // next vacation
      const dateToCheckFor = moment();
      let nearestDate;

      allVacations.forEach((date, i) => {
        let diff = moment(date.StartDate).diff(moment(dateToCheckFor), "days");
        if (diff > 0) {
          if (nearestDate) {
            if (moment(date.StartDate).diff(moment(nearestDate), "days") < 0) {
              nearestDate = date.StartDate;
              this.nearestVacIndex = i;
            }
          } else {
            nearestDate = date.StartDate;
            this.nearestVacIndex = i;
          }
        }
      });
      // 3 popular
      let vacTest = [...allVacations];
      this.threeVacations = vacTest.sort((a, b) => b.follows.length - a.follows.length).slice(0, 3);
      console.log("this.threeVacations: ", this.threeVacations);

      // vacations array
      this.props.updateVacations(allVacations);
      console.log("all vacations after map: ", this.props.vacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again: ", err);
    }
  };

  render() {
    if (this.props.user[0] !== undefined) {
      return <Redirect from="/" to="/Vacations" />;
    } else {
      return (
        <div className="container-fluid">
          {/* <div className="row">
            <Header />
          </div> */}
          <div className="row">{<Nav user={this.props.user[0]} updateContent={this.updateContent} content={this.props.content} />}</div>

          {/* text image */}
          <div className="row">row 1</div>
          <h2 className="text-center py-5 homeTitle">Our next vacation</h2>
          <div className="row">{this.props.vacations[this.nearestVacIndex] === undefined ? "" : <NextVacationComp vacation={this.props.vacations[this.nearestVacIndex]} />}</div>
          {/* <div className="row">{this.props.vacations[this.nearestVacIndex] === undefined ? "" : <Next vacation={this.props.vacations[this.nearestVacIndex]} />}</div> */}
          <h2 className="text-center py-5 homeTitle">The three most popular vacations</h2>
          <div className="row mb-5">{this.props.vacations === undefined ? "" : <MostPopularComp vacations={this.threeVacations} />}</div>
          <div className="row mt-2">
            <Footer />
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    vacations: state.vacations,
    user: state.user,

    // vacationForm
    // TODO: addVsEdit
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
