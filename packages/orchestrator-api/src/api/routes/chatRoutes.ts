// packages/orchestrator-api/src/api/routes/chatRoutes.ts

import { Router } from "express";
import { postChatMessage } from "../controllers/chatController";

const router = Router();
router.post("/:chatId?", postChatMessage);

export default router;
