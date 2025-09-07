import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.mysql.js";
import User from "./user.model.js";

const Vehicle = sequelize.define(
  "Vehicle",
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    registration_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    color: DataTypes.STRING,
  },
  {
    tableName: "vehicles",
    timestamps: true,
  }
);

// Association
Vehicle.belongsTo(User, { foreignKey: "driver_id", as: "driver" });
User.hasMany(Vehicle, { foreignKey: "driver_id", as: "vehicles",  onDelete: "CASCADE", onUpdate: "CASCADE" });

export default Vehicle;
