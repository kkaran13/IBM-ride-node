import VehicleRepository from "../repositories/vehicle.repository.js";
import ApiError from "../utils/ApiError.js";

class VehicleService {
    async createVehicle(data) {
        if (!data) {
            throw new ApiError(400, "Vehicle data is missing");
        }

        const { driver_id, make, model, year, registration_number, color } = data;

        if (!driver_id || !make || !model || !year || !registration_number || !color) {
            throw new ApiError(400, "All fields are required");
        }

        const existingVehicle = await VehicleRepository.findByRegistrationNo(registration_number);
        if (existingVehicle) throw new ApiError(409, "Vehicle already exists with this registration number");

        return await VehicleRepository.createVehicle(data);

    }

    async getVehicleById(id) {
        const vehicle = await VehicleRepository.findById(id);
        if (!vehicle) throw new ApiError(404, "Vehicle not found");
        return vehicle;
    }

    async getAllVehicles() {
        return await VehicleRepository.getAllVehicles();
    }

    async updateVehicle(id, data) {
        const updatedVehicle = await VehicleRepository.updateVehicle(id, data);
        if (!updatedVehicle) throw new ApiError(404, "Vehicle not found");
        return updatedVehicle;
    }

    async deleteVehicle(id) {
        const deleted = await VehicleRepository.deleteVehicle(id);
        if (!deleted) throw new ApiError(404, "Vehicle not found");
        return { message: "Vehicle deleted successfully" };
    }
}

export default new VehicleService();