const express = require("express");

const { CityController } = require("../../controllers");
const { CityMiddleware } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  CityMiddleware.validateCreateRequest,
  CityController.createCity,
);

// router.get('/',AirplaneController.getAirplanes)

// router.get('/:id', AirplaneController.getAirplane)

// router.delete('/:id', AirplaneController.destroyAirplane)

module.exports = router;
