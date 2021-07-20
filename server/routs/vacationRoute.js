const express = require("express");
const router = express.Router();
const VacationsController = require("../controllers/vacationsController");

// `vacations`-`ID`, `Destination`, `Description`, `Price`, `ImageName`, `StartDate`, `EndDate`, `createdAt`, `updatedAt`

router.post("/getVacationsFromDb", VacationsController.getVacationsFromDb);
router.post("/insertVacationToDb", VacationsController.insertVacationToDb);
router.post("/updateVacationDetailsInDb", VacationsController.updateVacationDetailsInDb);
router.post("/deleteVacationFromDb", VacationsController.deleteVacationFromDb);

module.exports = router;
