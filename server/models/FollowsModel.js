const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const FollowsModel = sequelize.define("follows", {
  FollowID: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // userID: {
  //   type: Sequelize.INTEGER(11),
  //   allowNull: false,
  // },
  // vacationId: {
  //   type: Sequelize.INTEGER(11),
  //   allowNull: false,
  // },
});
module.exports = FollowsModel;
