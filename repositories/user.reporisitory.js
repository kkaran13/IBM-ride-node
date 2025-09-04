// repositories/user.repository.js
import Payment from "../models/mongodbmodels/payment.model.js"; 

class UserRepository {
  async findById(userId) {
    return await Payment.findOne({ _id: userId });
  }
}


export default new UserRepository();
