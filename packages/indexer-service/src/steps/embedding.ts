import { Firestore, Timestamp, FieldValue } from "@google-cloud/firestore";
import path from "path";
import {
  ChunkResult,
  ChunkWithOverlap,
  EmbeddingBatch,
  VectorDocument,
} from "../types/genai";

const EMBEDDING_MODEL = "text-embedding-004";
const MAX_TOKENS_PER_CHUNK = 1500; // Reducido para mejor overlap
const CHARS_PER_TOKEN = 4;
const MAX_CHARS_PER_CHUNK = MAX_TOKENS_PER_CHUNK * CHARS_PER_TOKEN;
const OVERLAP_SIZE = 300; // Caracteres de superposición entre chunks
const MAX_ITEMS_PER_BATCH = 100;

// Configuración del proyecto
const PROJECT_ID = "614117709322";
const LOCATION = "us-central1";
const FIRESTORE_COLLECTION = "pdf_documents_vector";
import { GoogleGenAI } from "@google/genai";

// Inicializar Firestore
const db = new Firestore({
  projectId: "backend-developer-446300",
});

// Inicializar GoogleGenAI
const ai = new GoogleGenAI({
  vertexai: true,
  project: PROJECT_ID,
  location: LOCATION || "us-central1",
});
/**
 * Divide el texto en chunks con técnica de superposición (overlap)
 * @param text Texto a dividir
 * @param maxCharsPerChunk Máximo de caracteres por chunk
 * @param overlapSize Tamaño de superposición en caracteres
 * @returns Objeto con los chunks y metadatos
 */
export function chunkTextWithOverlap(
  text: string,
  maxCharsPerChunk: number = MAX_CHARS_PER_CHUNK,
  overlapSize: number = OVERLAP_SIZE
): ChunkResult {
  const chunks: ChunkWithOverlap[] = [];

  // Dividir por párrafos primero
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  let currentChunk = "";
  let chunkStartIndex = 0;
  let chunkIndex = 0;
  let globalIndex = 0;

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].trim();
    const potentialChunk =
      currentChunk + (currentChunk ? "\n\n" : "") + paragraph;

    if (potentialChunk.length > maxCharsPerChunk && currentChunk.length > 0) {
      // Guardar el chunk actual
      chunks.push({
        text: currentChunk.trim(),
        startIndex: chunkStartIndex,
        endIndex: chunkStartIndex + currentChunk.length,
        chunkIndex: chunkIndex,
      });

      // Preparar el siguiente chunk con overlap
      const overlapText = getOverlapText(currentChunk, overlapSize);
      currentChunk = overlapText + (overlapText ? "\n\n" : "") + paragraph;
      chunkStartIndex =
        chunkStartIndex + currentChunk.length - overlapText.length;
      chunkIndex++;
    } else {
      currentChunk = potentialChunk;
      if (chunks.length === 0) {
        chunkStartIndex = globalIndex;
      }
    }

    globalIndex += paragraph.length + 2; // +2 para los saltos de línea
  }

  // Agregar el último chunk
  if (currentChunk.trim().length > 0) {
    chunks.push({
      text: currentChunk.trim(),
      startIndex: chunkStartIndex,
      endIndex: chunkStartIndex + currentChunk.length,
      chunkIndex: chunkIndex,
    });
  }

  // Dividir chunks muy largos en sub-chunks
  const finalChunks: ChunkWithOverlap[] = [];
  for (const chunk of chunks) {
    if (chunk.text.length <= maxCharsPerChunk) {
      finalChunks.push(chunk);
    } else {
      const subChunks = splitLongChunkWithOverlap(
        chunk,
        maxCharsPerChunk,
        overlapSize
      );
      finalChunks.push(...subChunks);
    }
  }

  return {
    chunks: finalChunks,
    totalChunks: finalChunks.length,
    totalCharacters: text.length,
  };
}

/**
 * Obtiene texto de superposición del final de un chunk
 * @param text Texto del chunk
 * @param overlapSize Tamaño de superposición
 * @returns Texto de superposición
 */
function getOverlapText(text: string, overlapSize: number): string {
  if (text.length <= overlapSize) {
    return text;
  }

  // Intentar cortar en una oración completa
  const lastPart = text.slice(-overlapSize);
  const sentenceMatch = lastPart.match(/[.!?]\s+(.*)$/);

  if (sentenceMatch && sentenceMatch[1].length > 50) {
    return sentenceMatch[1];
  }

  return lastPart;
}

/**
 * Divide un chunk muy largo en sub-chunks con overlap
 * @param chunk Chunk largo a dividir
 * @param maxChars Máximo de caracteres por sub-chunk
 * @param overlapSize Tamaño de superposición
 * @returns Array de sub-chunks
 */
function splitLongChunkWithOverlap(
  chunk: ChunkWithOverlap,
  maxChars: number,
  overlapSize: number
): ChunkWithOverlap[] {
  const subChunks: ChunkWithOverlap[] = [];
  const words = chunk.text.split(" ");

  let currentSubChunk = "";
  let subChunkIndex = 0;
  let startIndex = chunk.startIndex;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const potentialSubChunk =
      currentSubChunk + (currentSubChunk ? " " : "") + word;

    if (potentialSubChunk.length > maxChars && currentSubChunk.length > 0) {
      subChunks.push({
        text: currentSubChunk.trim(),
        startIndex: startIndex,
        endIndex: startIndex + currentSubChunk.length,
        chunkIndex: chunk.chunkIndex + subChunkIndex,
      });

      // Preparar siguiente sub-chunk con overlap
      const overlapText = getOverlapText(currentSubChunk, overlapSize);
      currentSubChunk = overlapText + (overlapText ? " " : "") + word;
      startIndex = startIndex + currentSubChunk.length - overlapText.length;
      subChunkIndex++;
    } else {
      currentSubChunk = potentialSubChunk;
    }
  }

  if (currentSubChunk.trim().length > 0) {
    subChunks.push({
      text: currentSubChunk.trim(),
      startIndex: startIndex,
      endIndex: startIndex + currentSubChunk.length,
      chunkIndex: chunk.chunkIndex + subChunkIndex,
    });
  }

  return subChunks;
}

/**
 * Organiza los chunks en batches para procesamiento de embeddings
 * @param chunks Array de chunks
 * @param maxItemsPerBatch Máximo de items por batch
 * @returns Array de batches
 */
export function createEmbeddingBatches(
  chunks: ChunkWithOverlap[],
  maxItemsPerBatch: number = MAX_ITEMS_PER_BATCH
): EmbeddingBatch[] {
  const batches: EmbeddingBatch[] = [];

  for (let i = 0; i < chunks.length; i += maxItemsPerBatch) {
    const batchChunks = chunks.slice(i, i + maxItemsPerBatch);
    batches.push({
      contents: batchChunks,
      batchIndex: Math.floor(i / maxItemsPerBatch),
      totalBatches: Math.ceil(chunks.length / maxItemsPerBatch),
    });
  }

  return batches;
}

/**
 * Genera embeddings para los chunks usando GoogleGenAI
 * @param batches Array de batches a procesar
 * @param onProgress Callback de progreso
 * @returns Array de embeddings
 */
export async function generateEmbeddingsRecursivelyNoOptimization(
  batches: EmbeddingBatch[],
  onProgress?: (current: number, total: number, batchIndex: number) => void
): Promise<{ embedding: number[]; chunk: ChunkWithOverlap }[]> {
  const allEmbeddings: { embedding: number[]; chunk: ChunkWithOverlap }[] = [];
  const model = ai.models;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];

    try {
      for (const chunk of batch.contents) {
        const result = await model.embedContent({
          model: EMBEDDING_MODEL,
          contents: [chunk.text],
        });

        if (!result || !result.embeddings || result.embeddings.length === 0) {
          throw new Error(
            `No se generaron embeddings para el chunk: ${chunk.chunkIndex}`
          );
        }
        allEmbeddings.push({
          embedding: result.embeddings[0].values!,
          chunk: chunk,
        });

        // Pausa entre llamadas
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      if (onProgress) {
        onProgress(i + 1, batches.length, batch.batchIndex);
      }

      // Pausa entre batches
      if (i < batches.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (error: any) {
      console.error(`Error procesando batch ${i}:`, error);
      throw new Error(`Error en batch ${i}: ${error.message}`);
    }
  }

  return allEmbeddings;
}

async function generateEmbeddingsRecursively(
  batches: EmbeddingBatch[]
): Promise<{ embedding: number[]; chunk: ChunkWithOverlap }[]> {
  const allEmbeddings: { embedding: number[]; chunk: ChunkWithOverlap }[] = [];

  const model = ai.models;

  for (const batch of batches) {
    console.log(`🔄 Procesando batch de ${batch.contents.length} chunks...`);

    // La preparación de los requests es correct

    try {
      // --- CAMBIO DEFINITIVO Y CORRECTO ---
      // El método se llama 'embedContents' (en plural)
      const result = await model.embedContent({
        model: EMBEDDING_MODEL,
        contents: batch.contents.map((chunk) => chunk.text),
      });

      const embeddingsFromApi = result.embeddings;

      if (
        !embeddingsFromApi ||
        embeddingsFromApi.length !== batch.contents.length
      ) {
        throw new Error(
          `El batch embedding no devolvió la cantidad esperada de resultados.`
        );
      }

      for (let i = 0; i < embeddingsFromApi.length; i++) {
        allEmbeddings.push({
          embedding: embeddingsFromApi[i].values!,
          chunk: batch.contents[i],
        });
      }

      // Mantenemos una pausa para respetar los límites de RPM (Requests Per Minute)
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error procesando un batch de embeddings:`, error);
      throw error;
    }
  }

  return allEmbeddings;
}

/**
 * Indexa embeddings en Firestore usando Vector Search
 * @param embeddings Array de embeddings con chunks
 * @param documentName Nombre del documento
 * @param filePath Ruta del archivo
 * @param collectionName Nombre de la colección
 * @returns Array de IDs de documentos creados
 */
export async function indexEmbeddingsInFirestoreVector(
  embeddings: { embedding: number[]; chunk: ChunkWithOverlap }[],
  documentName: string,
  filePath: string,
  collectionName: string = FIRESTORE_COLLECTION
): Promise<string[]> {
  const documentIds: string[] = [];
  const documentId = `doc_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const createdAt = Timestamp.now();

  try {
    const batch = db.batch();
    const collectionRef = db.collection(collectionName);

    for (let i = 0; i < embeddings.length; i++) {
      const { embedding, chunk } = embeddings[i];

      const vectorDoc: VectorDocument = {
        documentName,
        chunkIndex: chunk.chunkIndex,
        text: chunk.text,
        embedding: FieldValue.vector(embedding), // Vector field para Firestore
        metadata: {
          totalChunks: embeddings.length,
          chunkLength: chunk.text.length,
          startIndex: chunk.startIndex,
          endIndex: chunk.endIndex,
          createdAt,
          filePath,
          documentId,
        },
      };

      const docRef = collectionRef.doc();
      batch.set(docRef, vectorDoc);
      documentIds.push(docRef.id);
    }

    await batch.commit();
    console.log(
      `✅ Indexados ${embeddings.length} embeddings en Firestore Vector Search`
    );
    return documentIds;
  } catch (error: any) {
    console.error("❌ Error indexando embeddings:", error);
    throw new Error(
      `Error indexando en Firestore Vector Search: ${error.message}`
    );
  }
}

/**
 * Procesa PDF completo e indexa en Firestore Vector Search
 * @param filePath Ruta del archivo PDF
 * @param documentName Nombre del documento
 * @param collectionName Nombre de la colección
 * @returns Información del procesamiento
 */
export async function processPDFAndIndexVector(
  text: string,
  filePath: string,
  documentName?: string,
  collectionName: string = FIRESTORE_COLLECTION
): Promise<{
  documentIds: string[];
  totalChunks: number;
  documentId: string;
  processingTime: number;
}> {
  const startTime = Date.now();

  try {
    console.log("📄 Iniciando procesamiento completo del PDF...");

    // 1. Extraer texto del PDF
    console.log(`📝 Texto extraído: ${text.length} caracteres`);

    // 2. Dividir en chunks con overlap
    const chunkResult = chunkTextWithOverlap(text);
    console.log(`📊 Chunks creados: ${chunkResult.totalChunks} con overlap`);

    // 3. Crear batches para embeddings
    const batches = createEmbeddingBatches(chunkResult.chunks);
    console.log(`📦 Batches creados: ${batches.length}`);

    // 4. Generar embeddings
    const embeddings = await generateEmbeddingsRecursively(batches);

    // 5. Indexar en Firestore Vector Search
    const docName = documentName || path.basename(filePath);
    const documentIds = await indexEmbeddingsInFirestoreVector(
      embeddings,
      docName,
      filePath,
      collectionName
    );

    const processingTime = Date.now() - startTime;
    const documentId = `doc_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    console.log(`✅ Procesamiento completo finalizado en ${processingTime}ms`);

    return {
      documentIds,
      totalChunks: chunkResult.totalChunks,
      documentId,
      processingTime,
    };
  } catch (error: any) {
    throw new Error(`Error en procesamiento completo: ${error.message}`);
  }
}

/**
 * Obtiene documentos indexados
 * @param collectionName Nombre de la colección
 * @returns Array de documentos indexados
 */
export async function getIndexedDocuments(
  collectionName: string = FIRESTORE_COLLECTION
): Promise<
  Array<{
    documentId: string;
    documentName: string;
    totalChunks: number;
    createdAt: FirebaseFirestore.Timestamp;
    filePath: string;
  }>
> {
  try {
    const querySnapshot = await db.collection(collectionName).get();
    const documentsMap = new Map();

    querySnapshot.forEach((doc) => {
      const data = doc.data() as VectorDocument;
      const docId = data.metadata.documentId;

      if (!documentsMap.has(docId)) {
        documentsMap.set(docId, {
          documentId: docId,
          documentName: data.documentName,
          totalChunks: data.metadata.totalChunks,
          createdAt: data.metadata.createdAt,
          filePath: data.metadata.filePath,
        });
      }
    });

    return Array.from(documentsMap.values());
  } catch (error: any) {
    throw new Error(`Error obteniendo documentos indexados: ${error.message}`);
  }
}

/**
 * Elimina embeddings de un documento
 * @param documentId ID del documento
 * @param collectionName Nombre de la colección
 * @returns Número de documentos eliminados
 */
export async function deleteDocumentEmbeddings(
  documentId: string,
  collectionName: string = FIRESTORE_COLLECTION
): Promise<number> {
  try {
    const querySnapshot = await db
      .collection(collectionName)
      .where("metadata.documentId", "==", documentId)
      .get();

    if (querySnapshot.empty) {
      console.log(
        `⚠️ No se encontraron embeddings para el documento ${documentId}`
      );
      return 0;
    }

    const batch = db.batch();
    let deletedCount = 0;

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
      deletedCount++;
    });

    await batch.commit();
    console.log(
      `🗑️ Eliminados ${deletedCount} embeddings del documento ${documentId}`
    );
    return deletedCount;
  } catch (error: any) {
    throw new Error(`Error eliminando embeddings: ${error.message}`);
  }
}
