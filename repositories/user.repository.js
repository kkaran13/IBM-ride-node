import User from "../models/mysqlmodels/user.model.js";
import bcrypt from "bcrypt";

class UserRepository {
  async createUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await User.create({ ...data, password: hashedPassword });
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findById(id) {
    return await User.findByPk(id, {
      // include: [
      //   { model: User.associations.vehicles?.target, as: "vehicles" },
      //   { model: User.associations.rides_as_rider?.target, as: "rides_as_rider" },
      //   { model: User.associations.rides_as_driver?.target, as: "rides_as_driver" },
      // ]
    });
  }

  async getAllUsers() {
    return await User.findAll({
      include: [
        { model: User.associations.vehicles?.target, as: "vehicles" },
        { model: User.associations.rides_as_rider?.target, as: "rides_as_rider" },
        { model: User.associations.rides_as_driver?.target, as: "rides_as_driver" },
      ]
    });
  }

  async updateUser(id, data) {
    const user = await this.findById(id);
    if (!user) return null;
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    return await user.update(data);
  }

  async deleteUser(id) {
    return await User.destroy({ where: { user_id: id } });
  }
}

export default new UserRepository();
