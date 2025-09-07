import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.mysql.js";
import User from "./user.model.js";
import Vehicle from "./vehicle.model.js";

const Ride = sequelize.define(
  "Ride",
  {
    ride_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rider_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pickup_location: DataTypes.STRING,
    drop_location: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed", "cancelled"),
      defaultValue: "pending",
    },
    fare: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    ride_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "rides",
    timestamps: true,
  }
);

// Associations
Ride.belongsTo(User, { foreignKey: "rider_id", as: "rider" });
Ride.belongsTo(User, { foreignKey: "driver_id", as: "driver" });
Ride.belongsTo(Vehicle, { foreignKey: "vehicle_id", as: "vehicle" });

User.hasMany(Ride, { foreignKey: "rider_id", as: "rides_as_rider" });
User.hasMany(Ride, { foreignKey: "driver_id", as: "rides_as_driver" });
Vehicle.hasMany(Ride, { foreignKey: "vehicle_id", as: "rides" });

export default Ride;
