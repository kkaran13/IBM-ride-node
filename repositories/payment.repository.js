import Payment from "../models/mongodbmodels/payment.model.js";

class PaymentRepository {
  async create(paymentData) {
    return await Payment.create(paymentData);
  }

  async findByPaymentId(paymentId) {
    return await Payment.findOne({ paymentId });
  }

  async update(payment) {
    return await payment.save();
  }

  async findByRider(rider_id) {
    return await Payment.find({ rider_id });
  }

  async findByRideId(ride_id) {
    return await Payment.findOne({ ride_id });
  }

}

export default new PaymentRepository();
