import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  validateEmail,
  validateUsername
} from "../controllers/users.controller.js";

const router = Router();

// GET all Users
router.get("/users", getUsers);

// GET An User
router.get("/users/:id", getUser);

router.get("/user/username/:username", validateUsername)

router.get("/user/email/:email", validateEmail)

// DELETE An User
router.delete("/users/:id", deleteUser);

// INSERT An User
router.post("/users", createUser);

router.patch("/users/:id", updateUser);

export default router;
