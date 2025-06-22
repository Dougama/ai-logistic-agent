import { SearchServiceClient } from "@google-cloud/discoveryengine";

// --- CONFIGURACIÓN ---
const PROJECT_ID =
  process.env.GCP_PROJECT_ID_NAME || process.env.GCP_PROJECT_ID;
const LOCATION = process.env.GCP_SEARCH_LOCATION;
const DATA_STORE_ID = process.env.GCP_DATA_STORE_ID;

// --- VALIDACIÓN ---
if (!PROJECT_ID || !LOCATION || !DATA_STORE_ID) {
  throw new Error(
    "Faltan variables de entorno para Vertex AI Search: GCP_PROJECT_ID, GCP_SEARCH_LOCATION, GCP_DATA_STORE_ID"
  );
}

// --- CLIENTE DE LA API ---
const searchClient = new SearchServiceClient();

// --- FUNCIÓN ÚNICA Y SIMPLIFICADA ---
export const searchWithVertexAI = async (
  userQuery: string
): Promise<string> => {
  // Construimos el nombre completo del recurso
  const servingConfig = `projects/${PROJECT_ID}/locations/${LOCATION}/collections/default_collection/dataStores/${DATA_STORE_ID}/servingConfigs/default_search`;

  // Construimos la petición de búsqueda
  const request = {
    servingConfig,
    query: userQuery,
    pageSize: 5,
    contentSearchSpec: {
      summarySpec: {
        summaryResultCount: 5,
        includeCitations: true,
      },
    },
  };

  console.log("Enviando petición a la API de Vertex AI Search...");

  try {
    const [response]: any = await searchClient.search(request);
    if (!response.summary?.summaryText) {
      console.log(
        "Vertex AI Search no devolvió un resumen. Devolviendo el primer resultado."
      );
      // Fallback: si no hay resumen, devolvemos el texto del primer resultado encontrado
      return (
        response.results?.[0]?.document?.derivedStructData?.fields
          ?.extractive_answers?.listValue?.values?.[0]?.structValue?.fields
          ?.content?.stringValue ||
        "No he podido encontrar una respuesta específica en los documentos."
      );
    }

    console.log("Resumen de Vertex AI Search recibido.");
    return response.summary.summaryText;
  } catch (err: any) {
    console.error("ERROR al buscar en Vertex AI Search:", err);
    return "Lo siento, ha ocurrido un error al consultar la base de conocimiento.";
  }
};
