import RideRepository from "../repositories/ride.repository.js";
import UserRepository from "../repositories/user.repository.js";
import VehicleRepository from "../repositories/vehicle.repository.js";
import ApiError from "../utils/ApiError.js";

class RideService {

  // Ride Methods
  async createRide(data, rider_id) {
    const { pickup_location, drop_location, fare } = data;

    if (!pickup_location || !drop_location || !fare) {
      throw new ApiError(400, "Pickup, drop and fare are required");
    }

    const rider = await UserRepository.findById(rider_id);
    if (!rider || rider.role !== "rider") {
      throw new ApiError(403, "Only riders can request rides");
    }

    const existingRide = await RideRepository.findOngoingByRider(rider_id);
    if (existingRide) {
      throw new ApiError(409, "You already have an ongoing ride");
    }

    return await RideRepository.create({
      rider_id,
      driver_id: null, 
      vehicle_id: null,       
      pickup_location,
      drop_location,
      fare,
      status: "pending"
    });
  }

  // Driver Methods 
  async getPendingRidesForDriver() {
    return await RideRepository.getPendingRides();
  }

  async acceptRide(ride_id, driver_id, vehicle_id) {
    const ride = await RideRepository.findById(ride_id);
    console.log(ride_id);
    if (!ride) throw new ApiError(404, "Ride not found");
    if (ride.status !== "pending") throw new ApiError(409, "Ride already accepted");

    const driverBusy = await RideRepository.findOngoingByDriver(driver_id);
    if (driverBusy) throw new ApiError(409, "Driver already on another ride");

    const vehicle = await VehicleRepository.findById(vehicle_id);
    console.log(vehicle);
    if (!vehicle || vehicle.driver_id !== driver_id) {
      throw new ApiError(400, "Invalid vehicle for this driver");
    }

    return await ride.update({
      driver_id,
      vehicle_id,
      status: "in_progress"
    });
  }

  async updateRideStatus(rideId, status, userId, role) {
    const ride = await RideRepository.findById(rideId);
    console.log(ride);
    if (!ride) throw new ApiError(404, "Ride not found");
 
    const validStatuses = ["pending", "in_progress", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      throw new ApiError(400, `Invalid status. Allowed: ${validStatuses.join(", ")}`);
    }
      
    ride.status = status;
    await ride.save();
    return ride;
  }

  async getOngoingRides(driver_id) {
    return await RideRepository.getOngoingRidesByDriver(driver_id);
  }

  async getRideHistory(driver_id) {
    return await RideRepository.getRideHistoryByDriver(driver_id);
  }

// General
  async getRide(ride_id) {
    const ride = await RideRepository.findById(ride_id);
    if (!ride) throw new ApiError(404, "Ride not found");
    return ride;
  }

  async listRides(user_id, role) {
    if (role === "rider") {
      return await RideRepository.findByRider(user_id);
    }
    if (role === "driver") {
      return await RideRepository.findByDriver(user_id);
    }
    throw new ApiError(403, "Invalid role for listing rides");
  }
}

export default new RideService();
