import { Router } from "express";
import {
  createMedition,
  deleteMedition,
  getMedition,
  getMeditions,
  updateMedition,
} from "../controllers/meditions.controller.js";

const router = Router();

// GET all meditions
router.get("/meditions", getMeditions);

// GET An Medition
router.get("/meditions/:micro_id", getMedition);

// DELETE An Medition
router.delete("/meditions/:id", deleteMedition);

// INSERT An Medition
router.post("/meditions", createMedition);

router.patch("/meditions/:id", updateMedition);

router.put("/meditions/:id", updateMedition);

export default router;
