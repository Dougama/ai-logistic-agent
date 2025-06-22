import { CloudEvent, cloudEvent } from "@google-cloud/functions-framework";
import pdf from "pdf-parse";
import { Storage } from "@google-cloud/storage";
import { processPDFAndIndexVector } from "./steps/embedding";

const storage = new Storage();

/**
 * Registra una función de CloudEvent que se activa con eventos de Cloud Storage.
 * Esta función procesa un PDF subido, genera su embedding y lo guarda en Firestore.
 * @param {object} cloudEvent El objeto del evento de Cloud Storage.
 */
cloudEvent("pdfIndexer", async (cloudEvent: CloudEvent<any>) => {
  const file = cloudEvent.data;
  const { bucket, name: filePath, contentType } = file;
  const filename = filePath.split("/").pop();
  console.log(`Evento recibido: ${JSON.stringify(file)}`);
  if (!contentType || !contentType.startsWith("application/pdf")) {
    console.log(
      `El archivo ${filePath} no es un PDF. Se omite el procesamiento.`
    );
    return;
  }
  try {
    const fileBufferArray = await storage
      .bucket(bucket)
      .file(filePath)
      .download();
    const fileBuffer = fileBufferArray[0];
    console.log("Archivo PDF descargado.");
    const data = await pdf(fileBuffer);

    const textContent = data.text;
    console.log(
      `Texto extraído del PDF (${textContent.substring(0, 100)}...).`
    );
    if (!textContent) {
      console.log("No se encontró texto en el PDF. Abortando.");
      return;
    }
    await processPDFAndIndexVector(textContent, filePath, filename);
  } catch (error) {
    console.error(`Error procesando el archivo ${filePath}:`, error);
  }
});

// --- PRÓXIMOS PASOS ---
// TODO: 1. Lógica para extraer imágenes y generar descripciones con Gemini.
// TODO: 2. Lógica de "Chunking" para dividir el texto.
// TODO: 3. Lógica de "Embedding" para vectorizar cada chunk.
// TODO: 4. Lógica de "Upsert" para guardar en Vertex AI Search.
