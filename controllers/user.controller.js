import UserService from "../services/user.service.js";
import  {asyncHandler}  from "../utils/asyncHandler.js";
import  ApiResponse  from "../utils/ApiResponse.js";

class UserController {

  createUser = asyncHandler(async (req, res) => {
    const user = await UserService.createUser(req.body);
    res.status(201).json(new ApiResponse(201, user, "User created successfully"));
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);
    res.cookie("access_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60, // 1 hour
      sameSite: "strict",
    });

    // Also return token in response body if needed
    res.status(200).json(new ApiResponse(200, { user: result.user, token: result.token }, "Login successful"));
  });

  getUserById = asyncHandler(async (req, res) => {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(new ApiResponse(200, user));
  });

  getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserService.getAllUsers();
    res.status(200).json(new ApiResponse(200, users));
  });

  updateUser = asyncHandler(async (req, res) => {
    const user = await UserService.updateUser(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
  });

  deleteUser = asyncHandler(async (req, res) => {
    const result = await UserService.deleteUser(req.params.id);
    res.status(200).json(new ApiResponse(200, result));
  });
}

export default new UserController();
