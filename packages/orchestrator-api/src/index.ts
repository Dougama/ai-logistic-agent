import express, { Request, Response } from "express";

// Definir el tipo para nuestras variables de entorno si es necesario
interface ProcessEnv {
  PORT?: string;
}

const app = express();
const PORT = (process.env as ProcessEnv).PORT || 8080;

app.use(express.json());

// Endpoint de Health Check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date() });
});

// Futuro endpoint de chat
// import { chatController } from './api/controllers/chatController';
// app.post('/chat', chatController);

app.listen(PORT, () => {
  console.log(`Orchestrator API (TS) listening on port ${PORT}`);
});
