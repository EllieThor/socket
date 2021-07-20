const VacationsModel = require("../models/VacationsModel");
const FollowsModel = require("../models/FollowsModel");

// `vacations`-`ID`, `Destination`, `Description`, `Price`, `ImageName`, `StartDate`, `EndDate`, `createdAt`, `updatedAt`
// `follows`-`FollowID`, `createdAt`, `updatedAt`, `userID`, `vacationID`

// CREATE (vacations)
exports.insertVacationToDb = async (req, res, next) => {
  await VacationsModel.create(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// READ (vacations)
exports.getVacationsFromDb = async (req, res, next) => {
  await VacationsModel.findAll({ include: [{ model: FollowsModel, attributes: ["userID"] }] })
    .then((result) => {
      console.log("VacationsModel result: ", result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// UPDATE (vacations)
exports.updateVacationDetailsInDb = async (req, res) => {
  await VacationsModel.update(req.body, { where: { ID: req.body.ID } })
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

// DELETE (vacations)
exports.deleteVacationFromDb = async (req, res) => {
  await VacationsModel.destroy({ where: { ID: req.body.ID } })
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};
