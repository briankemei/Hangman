
import express from "express";
import {
  getPlayer,
  createPlayer,
  updatePlayer
} from "../controllers/playersController.js";

const router = express.Router();

router.get("/:name", getPlayer);
router.post("/", createPlayer);
router.put("/:name", updatePlayer);

export default router;