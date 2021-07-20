const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const UsersModel = sequelize.define("users", {
  ID: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  FirstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  LastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Role: {
    type: Sequelize.INTEGER(1),
    allowNull: true,
  },
});
module.exports = UsersModel;
