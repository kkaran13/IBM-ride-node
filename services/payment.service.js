import PaymentRepository from "../repositories/payment.repository.js";
import ApiError from "../utils/ApiError.js";
import Ride from "../models/mysqlmodels/ride.model.js";
import Payment from "../models/mongodbmodels/payment.model.js";

class PaymentService {
static async createPayment(data, user) {
    const { ride_id, amount, method, paymentId } = data;

    const ride = await Ride.findByPk(ride_id);
    if (!ride) throw new ApiError(404, "Ride not found");

    if (ride.rider_id !== user.user_id && user.role !== "admin") {
      throw new ApiError(403, "Not allowed to pay for this ride");
    }

    const payment = await Payment.create({
      ride_id,
      rider_id: ride.rider_id,
      amount,
      method,
      paymentId,
    });

    return payment;
  }

  static async getPaymentById(paymentId, user) {
    const payment = await Payment.findById(paymentId);
    if (!payment) throw new ApiError(404, "Payment not found");

    if (payment.rider_id !== user.user_id && user.role !== "admin") {
      throw new ApiError(403, "Not allowed to access this payment");
    }

    return payment;
  }

  async getPaymentById(id, user) {
    const payment = await PaymentRepository.findById(id);
    if (!payment) throw new ApiError(404, "Payment not found");

    if (user.user_id !== payment.rider_id && user.role !== "admin") {
      throw new ApiError(403, "You are not allowed to access this payment");
    }

    return payment;
  }

  async updatePaymentStatus(id, status, user) {
    if (!["pending", "success", "failed", "refunded"].includes(status)) {
      throw new ApiError(400, "Invalid payment status");
    }

    const payment = await PaymentRepository.findById(id);
    if (!payment) throw new ApiError(404, "Payment not found");

    if (user.user_id !== payment.rider_id && user.role !== "admin") {
      throw new ApiError(403, "You are not allowed to update this payment");
    }

    payment.status = status;
    payment.updatedAt = Date.now();

    return await PaymentRepository.update(payment);
  }

  async getPaymentsByRider(rider_id, user) {
    if (user.user_id !== parseInt(rider_id) && user.role !== "admin") {
      throw new ApiError(403, "You are not allowed to view these payments");
    }

    return await PaymentRepository.findByRider(rider_id);
  }
}

export default new PaymentService();
