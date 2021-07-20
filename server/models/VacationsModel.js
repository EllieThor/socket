const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const VacationsModel = sequelize.define("vacations", {
  ID: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Destination: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  Description: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  Price: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  ImageName: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  StartDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  EndDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});
module.exports = VacationsModel;
