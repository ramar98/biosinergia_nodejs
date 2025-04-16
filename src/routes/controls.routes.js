import { Router } from "express";
import {
  getControls,
  getControl,
  updateControl
} from "../controllers/controls.controller.js";

const router = Router();

// GET all meditions
router.get("/controls", getControls);

// GET An Medition
router.get("/controls/:micro_id", getControl);

router.patch("/controls/:micro_id", updateControl);

router.put("/controls/:micro_id", updateControl);

export default router;
