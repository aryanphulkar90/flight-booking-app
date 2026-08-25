const express = require('express')

const { CityController } = require('../../controllers')

const router = express.Router()

router.post('/', CityController.createCity)

// router.get('/',AirplaneController.getAirplanes)

// router.get('/:id', AirplaneController.getAirplane)

// router.delete('/:id', AirplaneController.destroyAirplane)

module.exports = router