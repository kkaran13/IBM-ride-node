import Vehicle from "../models/mysqlmodels/vehicle.model.js";
import User from "../models/mysqlmodels/user.model.js";

class VehicleRepository {
    async createVehicle(data) {
        const driver = await User.findByPk(data.driver_id);
        if (!driver) throw new Error("Driver not found");

        if (String(driver.role || "").toLowerCase() !== "driver") {
            throw new Error("User must have role 'driver' to register a vehicle");
        }

        return await Vehicle.create(data);
    }

    async findById(id) {
        return await Vehicle.findByPk(id, {
            include: [{ model: User, as: "driver" }],
        });
    }

    async getAllVehicles() {
        return await Vehicle.findAll({
            include: [{ model: User, as: "driver" }],
        });
    }

    // fetch only one driver's vehicles
    async findByDriverId(driver_id) {
        return await Vehicle.findAll({
            where: { driver_id },
            include: [{ model: User, as: "driver" }],
        });
    }

    async findByRegistrationNo(registration_number) {
        return await Vehicle.findOne({ where: { registration_number } });
    }

    async updateVehicle(id, data) {
        const vehicle = await this.findById(id);
        if (!vehicle) return null;

        if ("driver_id" in data) delete data.driver_id;

        return await vehicle.update(data);
    }

    async deleteVehicle(id) {
        return await Vehicle.destroy({ where: { vehicle_id: id } });
    }
}

export default new VehicleRepository();