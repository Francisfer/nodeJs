const express = require("express");
const tourController = require("../controllers/tourController");

const router = express.Router();
router.use(express.json());
// PARAM MIDDLEWARE

// router.param("id", tourController.checkID);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
