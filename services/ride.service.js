import RideRepository from "../repositories/ride.repository.js";
import UserRepository from "../repositories/user.repository.js";
import VehicleRepository from "../repositories/vehicle.repository.js";
import ApiError from "../utils/ApiError.js";

class RideService {
  async createRide(rideData) {
  if (!rideData) {
    throw new ApiError(400, "Ride data is missing");
  }

  const { rider_id, driver_id, vehicle_id, pickup_location, drop_location } = rideData;

  if (!rider_id || !driver_id || !vehicle_id || !pickup_location || !drop_location) {
    throw new ApiError(400, "All fields are required");
  }

  // Validate rider exists
  const rider = await UserRepository.findById(rider_id);
  if (!rider || rider.role !== "rider") {
    throw new ApiError(400, "Invalid rider");
  }

  // Validate driver exists
  const driver = await UserRepository.findById(driver_id);
  if (!driver || driver.role !== "driver") {
    throw new ApiError(400, "Invalid driver");
  }

  // Validate vehicle exists and belongs to driver
  const vehicle = await VehicleRepository.findById(vehicle_id);
  if (!vehicle || vehicle.user_id !== driver.id) {
    throw new ApiError(400, "Invalid vehicle or not assigned to driver");
  }

  // Check driver availability
  const ongoingRide = await RideRepository.findOngoingByDriver(driver_id);
  if (ongoingRide) {
    throw new ApiError(409, "Driver is currently busy with another ride");
  }
  return await RideRepository.createRide(rideData);
  }
  async getRide(ride_id) {
    const ride = await RideRepository.findById(ride_id);
    if (!ride) throw new ApiError(404, "Ride not found");
    return ride;
  }

  async listRides() {
    return await RideRepository.getAll();
  }

  async updateRideStatus(ride_id, status) {
    if(status!== "in_progress" && status!== "completed" &&  status!=="cancelled"){
        throw new ApiError(409,"Not a valid status");
    }
    const updated = await RideRepository.updateStatus(ride_id, status);
    if (!updated) throw new ApiError(404, "Ride not found or status not updated");
    return { message: "Ride status updated successfully" };
  }

  // async deleteRide(ride_id) {
  //   const deleted = await RideRepository.deleteRide(ride_id);
  //   if (!deleted) throw new ApiError(404, "Ride not found");
  //   return { message: "Ride deleted successfully" };
  // }
}

export default new RideService();