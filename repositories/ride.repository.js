import Ride from "../models/mysqlmodels/ride.model.js";
import { Op } from "sequelize";

class RideRepository {
  async create(data) {
    return await Ride.create(data);
  }

  async findById(id) {
    return await Ride.findByPk(id);
  }

  async updateStatus(id, status) {
    const ride = await this.findById(id);
    if (!ride) return null;
    return await ride.update({ status });
  }

  // Rider-specific
  async findOngoingByRider(rider_id) {
    return await Ride.findOne({
      where: { rider_id, status: { [Op.in]: ["pending", "in_progress"] } }
    });
  }

  // Driver-specific
  async findOngoingByDriver(driver_id) {
    return await Ride.findOne({
      where: { driver_id, status: { [Op.in]: ["pending", "in_progress"] } }
    });
  }

  async getPendingRides() {
    return await Ride.findAll({ where: { status: "pending" } });
  }

  async getOngoingRidesByDriver(driver_id) {
    return await Ride.findAll({
      where: { driver_id, status: { [Op.in]: ["in_progress"] } },
      order: [["createdAt", "DESC"]]
    });
  }

  async getRideHistoryByDriver(driver_id) {
    return await Ride.findAll({
      where: { driver_id, status: { [Op.in]: ["completed", "cancelled"] } },
      order: [["createdAt", "DESC"]]
    });
  }

  async getRidesByRider(rider_id) {
    return await Ride.findAll({
      where: { rider_id },
      order: [["createdAt", "DESC"]]
    });
  }

  async getRidesByDriver(driver_id) {
    return await Ride.findAll({
      where: { driver_id },
      order: [["createdAt", "DESC"]]
    });
  }

  async getAll() {
    return await Ride.findAll({ order: [["createdAt", "DESC"]] });
  }
}

export default new RideRepository();
