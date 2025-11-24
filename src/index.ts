import express, { Application } from "express";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user.router";
import gameRoutes from "./routes/game.router";
import "dotenv/config";

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Rutas
app.use("/usuarios", userRoutes);
app.use("/juegos", gameRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API GameGestor TypeScript 🚀" });
});

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`🚀 Servidor en http://localhost:${port}`);
  });
};

startServer();
