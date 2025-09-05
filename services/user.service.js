import UserRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt"

class UserService {
  async createUser(data) {
    if (!data) {
      throw new ApiError(400, "data is missing");
    }
    const { email, full_name, phone, role, password } = data;

    if (!email || !full_name || !phone || !role || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) throw new ApiError(409, "Email already exists");

    return await UserRepository.createUser(data);
  }

  async login(email, password) {
    
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new ApiError(401, "Invalid email or password");
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(401, "Invalid email or password");

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" }
    );

    return { user, token };
  }

  async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }

  async getAllUsers() {
    return await UserRepository.getAllUsers();
  }

  async updateUser(id, data) {
    const user = await UserRepository.updateUser(id, data);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }

  async deleteUser(id) {
    const deleted = await UserRepository.deleteUser(id);
    if (!deleted) throw new ApiError(404, "User not found");
    return { message: "User deleted successfully" };
  }
}

export default new UserService();
