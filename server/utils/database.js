var mysql = require("mysql2");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("project3_ellie_thor", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
