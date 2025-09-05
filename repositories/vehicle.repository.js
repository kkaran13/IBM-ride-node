import Vehicle from "../models/mysqlmodels/vehicle.model.js";
import { User } from "../models/mysqlmodels/user.model.js";

class VehicleRepository {
    // CREATE vehicle (only if driver exists & role is driver)
    async createVehicle(data) {
        const driver = await User.findByPk(data.driver_id);
        if (!driver) {
            throw new Error("Driver not found");
        }
        if (driver.role !== "driver") {
            throw new Error("User must have role 'driver' to register a vehicle");
        }

        return await Vehicle.create(data);
    }

    // GET vehicle by ID (with driver info)
    async findById(id) {
        return await Vehicle.findByPk(id, {
            include: [{ model: User, as: "driver" }],
        });
    }

    // GET all vehicles (with driver info)
    async getAllVehicles() {
        return await Vehicle.findAll({
            include: [{ model: User, as: "driver" }],
        });
    }

    // 🔍 FIND vehicle by registration number
    async findByRegistrationNo(registration_number) {
        return await Vehicle.findOne({ where: { registration_number } });
    }

    // UPDATE vehicle
    async updateVehicle(id, data) {
        const vehicle = await this.findById(id);
        if (!vehicle) return null;

        return await vehicle.update(data);
    }

    // DELETE vehicle
    async deleteVehicle(id) {
        return await Vehicle.destroy({ where: { vehicle_id: id } });
    }
}

export default new VehicleRepository();