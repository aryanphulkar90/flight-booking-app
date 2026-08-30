const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Flight Object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter={}
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }
  if(query.price){
    [minPrice, maxPrice] = query.price.split("-")
    customFilter.price = {
         [Op.between]: [minPrice,(maxPrice) ? maxPrice : 20000]
     }
  }
  if(query.travellers){
    customFilter.totalSeats = {
        [Op.gte]: query.travellers
    }
  }
  if(query.tripDate){
     const eod = " 23:59:59"
     customFilter.departureTime = {
        [Op.between]: [query.tripDate,query.tripDate + eod]
     }
  }
  if(query.sort){
    const params = query.sort.split(',')
    const sortFilters = params.map((param)=>param.split('_'))
    sortFilter = sortFilters
  }
  try {
    const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights
};
