import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import participantRoute from "./routes/participants.js";
import postRoute from "./routes/payments.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/enroll", participantRoute);
app.use("/api/payment", postRoute);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Yoga Backend</h1>");
});

app.listen("5000", () => {
  console.log("server running at port 5000");
});
