import express from "express";
import Payment from "../models/Payment.js";
import Participant from "../models/Participant.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { participant, paymentMethod, paymentData } = req.body;
    // console.log(paymentData);
    const existingParticipant = await Participant.findById(participant);
    if (!existingParticipant) {
      return res.status(404).json({ error: "Participant not found" });
    }

    let paymentDetails = {};
    switch (paymentMethod) {
      case "card":
        paymentDetails = {
          card: {
            holderName: paymentData.holderName,
            cardNo: paymentData.cardNumber,
          },
        };
        break;
      case "pay-later":
        paymentDetails = {
          payLater: {
            payLaterDate: paymentData.paylaterDate,
          },
        };
        break;
      case "upi":
        paymentDetails = {
          upiId: paymentData.upiId,
        };
        break;
      default:
        return res.status(400).json({ error: "Invalid payment method" });
    }

    const newPayment = new Payment({
      participant,
      paymentMethod,
      ...paymentDetails,
    });
    const savedPayment = await newPayment.save();

    res.status(201).json(savedPayment);
  } catch (error) {
    // console.error("Error processing payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:participantId", async (req, res) => {
  const participants = req.params.participantId;
  // console.log(typeof participantId);
  try {
    const payments = await Payment.find({ participant: participants });

    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json(err);
    // console.log(err);
  }
});

export default router;
