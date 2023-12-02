const express = require("express");
const tourController = require("./../controllers/tourController");
const router = express.Router();

// PARAM MIDDLEWARE
// 1.
router.param("id", (req, res, next, val) => {
  // 2.
  console.log(`Tour id is ${val}`);
  next();
});

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
