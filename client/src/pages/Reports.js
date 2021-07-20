import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Bar } from "react-chartjs-2";

import Footer from "../components/FooterComp";
import Header from "../components/HeaderComp";

class Reports extends Component {
  componentDidMount() {}
  data = {
    labels: this.props.vacations.filter((vac) => vac.follows.length > 0).map((vacation) => vacation.Destination),
    datasets: [
      {
        // TODO: מה זה הלייבל
        label: "# of Votes",
        data: this.props.vacations.filter((vac) => vac.follows.length > 0).map((vacation) => vacation.follows.length),
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  options = {
    indexAxis: "x",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    // responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Vacations Stars",
      },
    },
  };

  render() {
    if (this.props.user[0] === undefined) {
      return <Redirect from="/Reports" to="/" />;
    } else {
      return (
        <div>
          <div>{this.props.user[0] === undefined ? "" : <Header />}</div>
          <div className="mt-3 py-4 graph">{this.props.user[0] === undefined ? "" : <Bar data={this.data} options={this.options} className="graph my-4" />}</div>
          <div>{this.props.user[0] === undefined ? "" : <Footer />}</div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    vacations: state.vacations,
    user: state.user,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
