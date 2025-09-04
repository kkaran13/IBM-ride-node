import {Schema,model}  from "mongoose";

const paymentSchema = new Schema({
  ride_id: {
    type: Number,     // store MySQL ride_id
    required: true,
    index: true
  },
  rider_id: {
    type: Number,     // store MySQL rider_id
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed", "refunded"], 
    default: "pending"
  },
  method: {
    type: String,
    enum: ["cash", "card", "upi", "wallet"],
    required: true
  },
  transactionId: {
    type: String,    // external payment gateway ID (like Razorpay/Stripe txn_id)
    unique: true,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Automatically update `updatedAt` on save
paymentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Payment = model("Payment", paymentSchema);

export default Payment;
