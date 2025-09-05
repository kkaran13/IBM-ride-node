import UserService from "../services/user.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

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
    const requestedId = req.params.id;
    const loggedInUserId = String(req.user.user_id); // comes from JWT

    if (requestedId !== loggedInUserId) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Forbidden: You can only access your own profile"));
    }

    const user = await UserService.getUserById(requestedId);
    res.status(200).json(new ApiResponse(200, user));
  });

  updateUser = asyncHandler(async (req, res) => {
    const requestedId = req.params.id;
    const loggedInUserId = String(req.user.user_id);

    if (requestedId !== loggedInUserId) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Forbidden: You can only update your own profile"));
    }

    const user = await UserService.updateUser(requestedId, req.body);
    res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
  });

  // getAllUsers = asyncHandler(async (req, res) => {
  //   const users = await UserService.getAllUsers();
  //   res.status(200).json(new ApiResponse(200, users));
  // });

  deleteUser = asyncHandler(async (req, res) => {
    const requestedId = req.params.id;
    const loggedInUserId = String(req.user.user_id);

    if (requestedId !== loggedInUserId) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Forbidden: You can only delete your own profile"));
    }
    const result = await UserService.deleteUser(req.params.id);
    res.status(200).json(new ApiResponse(200, result));
  });
}

export default new UserController();
