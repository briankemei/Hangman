import express from "express";
import cors from "cors";
import playersRoutes from "./routes/players.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hangman API is running");
});

app.use("/api/players", playersRoutes);

export default app;