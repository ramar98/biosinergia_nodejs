import { Router } from "express";
import {
  getMicros,
  getMicro_id
} from "../controllers/micros.controller.js";

const router = Router();

// GET all meditions
router.get("/micros", getMicros);

// GET An Medition
router.post("/microsmacplanta", getMicro_id);


export default router;
