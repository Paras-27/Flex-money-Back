import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    enrollmentDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Participant = mongoose.model("Participant", ParticipantSchema);

export default Participant;
