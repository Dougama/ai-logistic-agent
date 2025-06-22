// packages/orchestrator-api/src/api/controllers/chatController.ts

import { Request, Response } from "express";
import { handleChatPrompt } from "../../services/chatService";

export const postChatMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { prompt, history = [] } = req.body;
    if (!prompt) {
      res.status(400).json({ error: 'El campo "prompt" es requerido.' });
      return;
    }
    const chatId = req.params.chatId;
    const assistantResponse = await handleChatPrompt({
      prompt,
      chatId,
      history,
    });
    res.status(200).json(assistantResponse);
  } catch (error) {
    console.error("Error en el controlador de chat:", error);
    res
      .status(500)
      .json({ error: "Ha ocurrido un error interno en el servidor." });
  }
};
