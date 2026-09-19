const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, Sequelize } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await this.model.findAll({
        where: filter,
        order:sort,
        include: [{
           model: Airplane,
           required: true
        },
        {
          model: Airport,
          as: "departureAirport",
          required: true,
          on: {
            col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), '=', Sequelize.col("departureAirport.code"))
          }
        }
    ]
    });
    return response
  }
}

module.exports = FlightRepository;