import { Router } from "express";
import {
  createPlant,
  deletePlant,
  getPlant,
  getPlants,
  updatePlant,
} from "../controllers/plants.controller.js";

const router = Router();

// GET all plants
router.get("/plants", getPlants);

// GET An Plant
router.get("/plants/:id", getPlant);

// DELETE An Plant
router.delete("/plants/:id", deletePlant);

// INSERT An Plant
router.post("/plants", createPlant);

router.patch("/plants/:id", updatePlant);

export default router;
