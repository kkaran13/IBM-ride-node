import PaymentRepository from "../repositories/payment.repository.js";
import RideRepository from "../repositories/ride.repository.js";
import ApiError from "../utils/ApiError.js";

class PaymentService {
  async createPayment(data, user) {
    const { ride_id, method, paymentId } = data;

    const ride = await RideRepository.findById(ride_id);
    if (!ride) throw new ApiError(404, "Ride not found");

    if (ride.rider_id !== user.user_id && user.role !== "admin") {
      throw new ApiError(403, "Not allowed to pay for this ride");
    }

    if (["pending", "in_progress", "cancelled"].includes(ride.status)) {
      throw new ApiError(403, "Your ride is either ongoing or cancelled (Not allowed to pay)");
    }

    const validMethods = ["card", "cash", "upi", "wallet"];
    if (!validMethods.includes(method)) {
      throw new ApiError(400, `Invalid method. Allowed: ${validMethods.join(", ")}`);
    }

    return await PaymentRepository.create({
      ride_id,
      rider_id: ride.rider_id,
      amount: ride.fare,
      method,
      paymentId,
    });
  }

  async getPaymentById(id, user) {
    const payment = await PaymentRepository.findOne(id);
    if (!payment) throw new ApiError(404, "Payment not found");

    if (user.user_id !== payment.rider_id && user.role !== "rider") {
      throw new ApiError(403, "You are not allowed to access this payment");
    }

    return payment;
  }

async updatePaymentStatus(id, status, user) {

  if (!status){
    throw new ApiError(400,"required data is missing. eg : (status) ")
  }

  const validStatus = ["success" , "failed" , "refunded"]

  if (!validStatus.includes(status)) {
    throw new ApiError(400, `Invalid payment status. Allowed:  ${validStatus.join(", ")}`);
  }

  const payment = await PaymentRepository.findByPaymentId(id);
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
