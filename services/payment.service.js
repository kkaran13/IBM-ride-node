import PaymentRepository from "../repositories/payment.repository.js";
import ApiError from "../utils/ApiError.js";

class PaymentService {
  async createPayment(data, user) {
    const { ride_id, rider_id, amount, method, paymentId } = data;

    if (!ride_id || !rider_id || !amount || !method) {
      throw new ApiError(400, "Missing required fields");
    }

    // only allow logged-in rider to create their own payment (or admin)
    if (user.user_id !== rider_id && user.role !== "admin") {
      throw new ApiError(403, "You are not allowed to create this payment");
    }

    return await PaymentRepository.create({
      ride_id,
      rider_id,
      amount,
      method,
      paymentId,
    });
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
