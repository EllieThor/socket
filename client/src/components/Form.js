import React, { Component } from "react";
import "../css/style.css";
import * as Api from "../Api/apiCalls";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";

class VacationsFormComp extends Component {
  socket;
  state = {
    endpoint: "localhost:5003",
    vacationsARR: [],
  };
  componentDidMount() {
    this.socket = socketIOClient(this.state.endpoint, { transports: ["websocket", "polling", "flashsocket"] });
  }

  // patterns OBJ
  inputsObj = {
    imageName: "",
  };

  // `vacations`-`ID`, `Destination`, `Description`, `Price`, `ImageName`, `StartDate`, `EndDate`, `createdAt`, `updatedAt`

  onChangeFN = (e) => {
    this.inputsObj[e.target.id] = e.target.value;
    console.log("new Input To inputsObj :", e.target.id, "value: ", e.target.value);
  };

  addVacationButton = () => {
    return (
      <button type="submit" className="btn btn-dark mt-3" data-bs-dismiss="modal" onClick={() => this.insertVacationToDB()}>
        Add vacation
      </button>
    );
  };

  // edit form
  saveEditedVacationButton = () => {
    return (
      <button type="submit" className="btn btn-dark mt-3" data-bs-dismiss="modal" onClick={() => this.updateVacationDetailsInDB(this.props.vacationToEdit.ID)}>
        Save Changes
      </button>
    );
  };
  // upload image
  fileChangeEvent = (e) => {
    console.log("e.target.files: ", e.target.files);
    this.imgInput = e.target.files;
  };

  uploadIMG = async () => {
    if (this.imgInput !== undefined) {
      const formData = new FormData();
      const files = this.imgInput;

      for (let i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i]["name"]);
      }

      this.imageNameForServer = files[0].name;
      let res = await Api.postRequest("/upload", formData);
      console.log("react is IMG? ", res);
    } else {
      alert("Click to upload image please");
    }
  };

  insertVacationToDB = async () => {
    // `vacations`-`ID`, `Destination`, `Description`, `Price`, `ImageName`, `StartDate`, `EndDate`, `createdAt`, `updatedAt`
    let currentObj = {
      Destination: this.vacationDestination.value,
      Description: this.vacationDescription.value,
      Price: Number(this.vacationPrice.value),
      ImageName: this.imageNameForServer,
      StartDate: this.vacationStartDate.value,
      EndDate: this.vacationEndDate.value,
    };
    console.log("currentObj: ", currentObj);
    if (currentObj.Destination === "" || currentObj.Description === "" || currentObj.Price <= 0 || currentObj.Price === undefined || currentObj.ImageName === undefined || currentObj.StartDate === undefined || currentObj.EndDate === undefined) {
      alert("All fields must be filled out");
    } else {
      try {
        let vacation = await Api.postRequest("/vacations/insertVacationToDb", currentObj);
        this.getVacationsFromDB();
        this.inputsObj = {
          imageName: "",
        };
        console.log("new vacations: ", this.props.vacations);
      } catch (err) {
        console.log("Error ", err);
        alert("Something went wrong, please try again");
      }
    }
  };

  updateVacationDetailsInDB = async (vacationId) => {
    let currentObj = {
      ID: vacationId,
      Destination: this.vacationDestination.value,
      Description: this.vacationDescription.value,
      Price: Number(this.vacationPrice.value),
      ImageName: this.imageNameForServer,
      StartDate: this.vacationStartDate.value,
      EndDate: this.vacationEndDate.value,
    };

    try {
      let vacation = await Api.postRequest("/vacations/updateVacationDetailsInDb", currentObj);
      this.getVacationsFromDB();
      let index = this.props.vacations.findIndex((vacation) => vacation.ID === vacationId);
      let arr = [...this.props.vacations];
      let vacOBJ = arr.splice(index, 1);

      let obj = {
        oldObj: vacOBJ,
        newDetailObj: currentObj,
      };
      console.log("*****form*******obj******: ", obj);

      this.socket.emit("edited vacation", obj);
      this.inputsObj = {
        imageName: "",
      };

      console.log("this.inputsObj AFTER : ", this.inputsObj);
      console.log("all vacations: ", this.props.vacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
    this.imgInput = "";
    this.vacationDestination.value = "";
    this.vacationDescription.value = "";
    this.vacationPrice.value = "";
    this.vacationStartDate.value = "";
    this.vacationEndDate.value = "";
    this.imageNameForServer = "";
  };

  render() {
    return (
      <div className="vacationForm">
        <h5>{this.props.vacationFormButtonsStatus === 0 ? "Add New Vacation" : "Edit vacation"}</h5>
        <label htmlFor="Destination">Destination:</label>
        <input type="text" id="Destination" className="form-control m-2" ref={(ref) => (this.vacationDestination = ref || "")} />
        <label htmlFor="Description">Description:</label>
        <input type="text" id="Description" className="form-control  m-2" ref={(ref) => (this.vacationDescription = ref)} />
        <label htmlFor="Price">Price:</label>
        <input type="number" id="Price" min="0" className="form-control  m-2" ref={(ref) => (this.vacationPrice = ref)} />
        <label htmlFor="StartDate">StartDate:</label>
        <input type="date" id="StartDate" className="form-control  m-2" ref={(ref) => (this.vacationStartDate = ref)} />
        <label htmlFor="EndDate">EndDate:</label>
        <input type="date" id="EndDate" className="form-control  m-2" ref={(ref) => (this.vacationEndDate = ref)} />
        <input type="file" id="filesToUpload" name="filesToUpload" onChange={(e) => this.fileChangeEvent(e)} ref={(ref) => (this.imgInput = ref)} />
        <button type="button" className="btn btn-dark btn-s" onClick={() => this.uploadIMG()}>
          <i className="fas fa-file-upload"></i>&nbsp;Upload
        </button>
        {this.props.vacationFormButtonsStatus === 0 ? this.addVacationButton() : this.saveEditedVacationButton()}
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
export default connect(mapStateToProps, mapDispatchToProps)(VacationsFormComp);
