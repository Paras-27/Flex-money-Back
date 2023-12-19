import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Participant",
  },
  paymentMethod: {
    type: String,
    enum: ["card", "pay-later", "upi"],
    required: true,
  },
  card: {
    holderName: {
      type: String,
    },
    cardNo: {
      type: String,
    },
  },
  payLater: {
    payLaterDate: {
      type: Date,
    },
  },
  upiId: {
    type: String,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
