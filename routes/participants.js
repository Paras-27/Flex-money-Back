import express from "express";
import Participant from "../models/Participant.js";

const router = express.Router();

router.post("/", async (req, res) => {
  // console.log(req.body);
  const newParticipant = new Participant({
    name: req.body.name,
    dateOfBirth: req.body.dob,
    batch: req.body.selectedBatch,
    gender: req.body.Gender,
    enrollmentDate: req.body.enrollmentDate,
  });

  try {
    const savedParticipant = await newParticipant.save();
    res.status(200).json(savedParticipant);
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:participantId", async (req, res) => {
  const participants = req.params.participantId;
  // console.log(typeof participantId);
  try {
    const payments = await Participant.find({ _id: participants });
    // console.log(payments);
    res.status(200).json(payments[0]);
  } catch (err) {
    res.status(400).json(err);
    // console.log(err);
  }
});

export default router;
