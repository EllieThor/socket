import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/HeaderComp";
import SingleVacationCard from "../components/SingleVacCardCopm";
import Footer from "../components/FooterComp";
import Modal from "../components/ModalComp";

import VacationComp from "../components/FormVacationComp";

import socketIOClient from "socket.io-client";

class Vacations extends Component {
  socket;
  state = {
    endpoint: "localhost:5003",
    vacationsARR: [],
    currentVacOBJ: {
      ID: 0,
      Destination: "",
      Description: "",
      Price: 0,
      ImageName: "",
      StartDate: "",
      EndDate: "",
      follows: [],
    },
  };
  componentDidMount() {
    this.socket = socketIOClient(this.state.endpoint, { transports: ["websocket", "polling", "flashsocket"] });
    // this.socket = socketIOClient(this.state.endpoint);

    this.socket.on("after_delete_vacation", (newVacationsARR) => {
      console.log("newVacationsARR : ", newVacationsARR);
      this.props.updateVacations(newVacationsARR);
      console.log("this.props.vacations: ", this.props.vacations);
    });

    this.socket.on("after_edit_vacation", (ob) => {
      if (ob !== ob.newDetailObj) {
        console.log("###vacation####: ob.newDetailObj: ", ob.newDetailObj.ID);
        console.log("###vacation####: ob.oldObj: ", ob.oldObj);

        let theOldObj = ob.oldObj[0];
        // console.log("^^^^^^^^^^^^^^^^^^: ", theOldObj[0]);
        let newOB = {};
        for (let obP in ob.newDetailObj) {
          newOB[obP] = ob.newDetailObj[obP];
        }
        console.log("obPobPobPobPobPobP", newOB, "6^^^^^^^6", theOldObj);
        // let editedOb = { ...ob.oldObj, ...newOB };
        let editedOb = Object.assign(theOldObj, newOB);

        console.log("propertypropertypropertyproperty", editedOb);

        let index = this.props.vacations.findIndex((vacation) => vacation.ID === ob.newDetailObj.ID);
        let arr = [...this.props.vacations];
        arr.splice(index, 1, editedOb);
        console.log("aeeeeee:", arr);
        let arr2 = [...arr];
        console.log("arr2: ", arr2);
        // this.aa(arr2);
        // this.props.updateVacations(arr2);
        // console.log(this.props.vacation);
      }
    });

    // FIXME: with id not work
    // this.socket.on("id to delete", (vacationID) => {
    //   // let index = this.props.vacations.findIndex((vacation) => vacation.ID === vacationID);
    //   // let arrARR = [...this.props.vacations];
    //   // arrARR.splice(index, 1);
    //   //  [...this.props.vacations.splice(index, 1)];
    //   let index = this.props.vacations.findIndex((vac) => vac.ID === vacationID);
    //   console.log("index!!!!: ", index);
    //   let newArr = [...this.props.vacations];
    //   newArr.splice(index, 1);
    //   console.log("newArr: ", newArr);

    //   // this.props.updateVacations(newArr);
    //   console.log("this.props.vacations: ", this.props.vacations);
    // });

    // this.getVacationsFromDB();
  }

  // aa = (ob) => {
  //   console.log("%%%%%%%%%%%%%%%% :", ob);
  //   // this.props.updateVacations(ob);
  // };
  getVacationsFromDB = async () => {
    try {
      let vacations = await Api.postRequest(`/vacations/getVacationsFromDb`);
      let allVacations = vacations.data;

      // map on vacations array in order to edit follows array In each of the items
      allVacations.map((item, i) => {
        let followsArr = item.follows;
        let usersIDs = [];
        // map on followsArr array in order to convert followsArr from array of objects to arr of usersId's numbers
        followsArr.map((id, i) => {
          let testing = Object.values(followsArr[i]);
          usersIDs.push(...testing);
        });
        item.follows = usersIDs;

        // sorting
        let isUserExist = item.follows.includes(this.props.user[0] === undefined ? 0 : this.props.user[0].ID);
        if (isUserExist) {
          allVacations.splice(i, 1);
          allVacations.unshift(item);
        }
      });

      // vacations array
      this.props.updateVacations(allVacations);

      console.log("all vacations: ", allVacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again: ", err);
    }
  };

  insertStarToDB = async (vacationID) => {
    let currentObj = {
      vacationID: vacationID,
      userID: this.props.user[0].ID,
    };

    try {
      let userFallow = await Api.postRequest("/users/insertStar", currentObj);
      console.log("if user star: ", userFallow);
      this.getVacationsFromDB();
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  deleteStarFromDB = async (vacationID) => {
    let currentObj = {
      vacationID: vacationID,
      userID: this.props.user[0].ID,
    };
    try {
      let vacation = await Api.postRequest("/users/deleteStar", currentObj);
      this.getVacationsFromDB();
      console.log("all vacations: ", this.props.vacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  // vacation form buttons
  editVacationClicked = (vacationObj) => {
    // this.props.updateVacationToForm({});
    // console.log("AFTER DELETE vacationToEdit : ", this.props.vacationToEdit);

    // witch button
    this.props.updateVacationButtonsForm(1);

    //witch vacation edit
    this.props.updateVacationToForm(vacationObj);
    console.log(" vacationObj : ", vacationObj);
    console.log("AFTER UPDATE vacationToEdit : ", this.props.vacationToEdit);

    //update modal content
    this.props.updateContent(3);
  };

  deleteVacationFromDB = async (vacationID) => {
    let currentObj = {
      ID: vacationID,
    };
    console.log("currentObj: ", currentObj);

    try {
      let vacation = await Api.postRequest("/vacations/deleteVacationFromDb", currentObj);
      ///////

      let index = this.props.vacations.findIndex((vacation) => vacation.ID === vacationID);
      this.props.vacations.splice(index, 1);
      this.socket.emit("delete vacation", this.props.vacations);
      // FIXME: with id not work
      // // let index = this.props.vacations.findIndex((vacation) => vacation.ID === vacationID);
      // // this.props.vacations.splice(index, 1);
      // this.socket.emit("delete with id", vacationID);

      ////////
      this.getVacationsFromDB();
      console.log("vacationID: ", vacationID);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  render() {
    if (this.props.user[0] === undefined) {
      return <Redirect from="/Vacations" to="/" />;
    } else {
      return (
        <div>
          <div>{this.props.user[0] === undefined ? "" : <Header />}</div>
          {/* <div>{this.props.user[0] === undefined ? "" : <VacationComp />}</div> */}
          <div className="container">
            <div className="row mt-3">{this.props.user[0] === undefined ? "" : <SingleVacationCard user={this.props.user[0]} vacations={this.props.vacations} insertStarToDB={this.insertStarToDB} deleteStarFromDB={this.deleteStarFromDB} deleteVacationFromDB={this.deleteVacationFromDB} editVacationClicked={this.editVacationClicked} />}</div>
          </div>
          <div className="footer">{this.props.user[0] === undefined ? "" : <Footer />}</div>
          <div className="row">
            <Modal content={this.props.content} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Vacations);
