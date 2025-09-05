import Payment from "../models/mongodbmodels/payment.model.js";

class PaymentRepository {
  async create(paymentData) {
    return await Payment.create(paymentData);
  }

  async findById(id) {
    return await Payment.findById(id);
  }

  async update(payment) {
    return await payment.save();
  }

  async findByRider(rider_id) {
    return await Payment.find({ rider_id });
  }
}

export default new PaymentRepository();
