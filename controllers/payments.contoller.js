import PaymentService from "../services/payment.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

class PaymentController {
  createPayment = asyncHandler(async (req, res) => {
    const payment = await PaymentService.createPayment(req.body, req.user);
    return res
      .status(201)
      .json(new ApiResponse(201, payment, "Payment created successfully"));
  });

  getPaymentById = asyncHandler(async (req, res) => {
    const payment = await PaymentService.getPaymentById(req.params.id, req.user);
    return res
      .status(200)
      .json(new ApiResponse(200, payment, "Payment fetched successfully"));
  });

  updatePaymentStatus = asyncHandler(async (req, res) => {
    const payment = await PaymentService.updatePaymentStatus(
      req.params.id,
      req.body.status,
      req.user
    );
    return res
      .status(200)
      .json(new ApiResponse(200, payment, "Payment status updated successfully"));
  });

  getPaymentsByRider = asyncHandler(async (req, res) => {
    const payments = await PaymentService.getPaymentsByRider(
      req.params.rider_id,
      req.user
    );
    return res
      .status(200)
      .json(new ApiResponse(200, payments, "Payments fetched successfully"));
  });
}

export default new PaymentController();