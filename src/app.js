import express from "express";
import morgan from "morgan";
import cors from "cors";

import plantsRoutes from "./routes/plants.routes.js";
import usersRoutes from "./routes/users.routes.js";
import meditionsRoutes from "./routes/meditions.routes.js";
import authRoutes from "./routes/auth.routes.js";
import indexRoutes from "./routes/index.routes.js";
import controlsRoutes from "./routes/controls.routes.js"
import microsRoutes from "./routes/micros.routes.js"

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/", indexRoutes);
app.use("/api", usersRoutes);
app.use("/api", plantsRoutes);
app.use("/api", meditionsRoutes);
app.use("/api", authRoutes);
app.use("/api", controlsRoutes)
app.use("/api", microsRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
