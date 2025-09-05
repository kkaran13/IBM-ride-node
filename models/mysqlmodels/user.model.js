import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.mysql.js";

export const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid email format",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: {
          msg: "Phone number must contain only digits",
        },
        len: {
          args: [10, 10],
          msg: "Phone number must be exactly 10 digits long",
        },
      },
    },
    role: {
      type: DataTypes.ENUM("rider", "driver"),
      allowNull: false,
      defaultValue: "rider",
      validate: {
        isIn: {
          args: [["rider", "driver"]],
          msg: "Invalid role. Allowed values are 'rider' or 'driver'.",
        },
        notNull: {
          msg: "Role is required",
        },
      },
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);
