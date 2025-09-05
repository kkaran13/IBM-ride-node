import Ride from "../models/mysqlmodels/ride.model.js";

class RideRepository {
  async createRide(data) {
    return await Ride.create({
      rider_id: data.rider_id,
      driver_id: data.driver_id,
      vehicle_id: data.vehicle_id,
      pickup_location: data.pickup_location,
      drop_location: data.drop_location,
      status: data.status || "pending",
      fare: data.fare || 0.0,
    });
  }

  async getAll() {
    return await Ride.findAll({
      include: [
        { model: Ride.associations.rider?.target, as: "rider" },
        { model: Ride.associations.driver?.target, as: "driver" },
        { model: Ride.associations.vehicle?.target, as: "vehicle" },
      ],
    });
  }

  async updateStatus(id, status) {
    const ride = await this.findById(id);
    if (!ride) return null;
    return await ride.update({ status });
  }

  async findOngoingByDriver(driver_id) {
    return await Ride.findOne({
      where: { driver_id, status: "in_progress" },
    });
  }

  // async deleteRide(id) {
  //   return await Ride.destroy({ where: { ride_id: id } });
  // }
}

export default new RideRepository();
