import { ChatMessage } from "shared-types";
import { Firestore, Timestamp } from "@google-cloud/firestore";
import { aiGenerateContent } from "./genaiService";
import { searchSimilarEmbeddingsVector } from "../lib/process-query";

const firestore = new Firestore();

interface ChatRequest {
  prompt: string;
  chatId?: string;
}

const buildAugmentedPrompt = (
  prompt: string,
  history: ChatMessage[],
  contextChunks: any[]
): string => {
  const historyText = history
    .map(
      (msg) => `${msg.role === "user" ? "Humano" : "Asistente"}: ${msg.content}`
    )
    .join("\n");

  const contextText = contextChunks
    .map((neighbor) => neighbor.text) // Suponiendo que el ID es el texto del chunk
    .join("\n---\n");

  return `
    <HISTORIAL_CONVERSACION>
    ${historyText}
    </HISTORIAL_CONVERSACION>

    <CONTEXTO_DOCUMENTOS>
    ${
      contextText ||
      "No se encontró contexto relevante en la informacion proporcinada."
    }
    </CONTEXTO_DOCUMENTOS>

    <PREGUNTA_USUARIO>
    Basándote en el HISTORIAL y el CONTEXTO, responde a la siguiente pregunta:
    ${prompt}
    </PREGUNTA_USUARIO>
    <INSTRUCCIONES>
    1. Si te hacen una pregunta fuera de contexto, indica que no estas autorizado para responder ese tipo de preguntas solo sobre procesos de ruta.
    </INSTRUCCIONES>
  `;
};

interface ChatRequest {
  prompt: string;
  history: ChatMessage[];
  chatId?: string;
}

export const handleChatPrompt = async (
  request: ChatRequest
): Promise<ChatMessage & { chatId: string }> => {
  console.log(
    `Recibido prompt: "${request.prompt}", para el chat ID: ${
      request.chatId || "Nuevo Chat"
    }`
  );

  let chatId = request.chatId;
  const chatsCollection = firestore.collection("chats");

  // 1. Si no hay chatId, creamos una nueva conversación
  if (!chatId) {
    const chatDocRef = await chatsCollection.add({
      title: request.prompt.substring(0, 40) + "...",
      createdAt: Timestamp.now(),
    });
    chatId = chatDocRef.id;
    console.log(`Nuevo chat creado con ID: ${chatId}`);
  }

  const messagesCollection = chatsCollection.doc(chatId).collection("messages");

  // 2. Guardamos el nuevo mensaje del usuario
  const userMessageData = {
    role: "user" as const,
    content: request.prompt,
    timestamp: Timestamp.now(),
  };
  await messagesCollection.add(userMessageData);

  // 3. Recuperamos el historial reciente para el contexto
  const historySnapshot = await messagesCollection
    .orderBy("timestamp", "desc")
    .limit(10)
    .get();
  const history = historySnapshot.docs
    .map((doc) => doc.data() as ChatMessage)
    .reverse();
  // 4. Ejecutamos el pipeline de RAG

  const similarChunks = await searchSimilarEmbeddingsVector(request.prompt);
  const augmentedPrompt = buildAugmentedPrompt(
    request.prompt,
    history,
    similarChunks
  );

  const assistantText = await aiGenerateContent(augmentedPrompt);

  // 5. Guardamos la respuesta del asistente
  const assistantMessageData = {
    role: "assistant" as const,
    content: assistantText,
    timestamp: Timestamp.now(),
  };
  const assistantDocRef = await messagesCollection.add(assistantMessageData);

  // 6. Actualizamos la fecha del chat y devolvemos la respuesta
  await chatsCollection.doc(chatId).update({ lastUpdatedAt: Timestamp.now() });

  return {
    id: assistantDocRef.id,
    role: "assistant",
    content: assistantText,
    timestamp: new Date(),
    chatId: chatId,
  };
};
