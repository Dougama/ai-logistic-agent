import { FindNeighborsApiResponse, FindNeighborsParams } from "shared-types";

/**
 * Llama al endpoint findNeighbors de Vertex AI Vector Search usando fetch.
 * @param params Parámetros necesarios para la llamada API.
 * @returns Una promesa que se resuelve con la respuesta de la API.
 */
export async function findNeighborsWithFetch(
  params: FindNeighborsParams
): Promise<FindNeighborsApiResponse> {
  const {
    accessToken,
    publicEndpointDomainName,
    projectId,
    location,
    indexEndpointId,
    requestBody,
  } = params;

  // Construye la URL del API endpoint [1]
  const apiUrl = `https://${publicEndpointDomainName}/v1/projects/${projectId}/locations/${location}/indexEndpoints/${indexEndpointId}:findNeighbors`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorBodyText = await response.text();
      throw new Error(
        `La solicitud a la API falló con el estado ${response.status} (${response.statusText}). Cuerpo: ${errorBodyText}`
      );
    }

    const data: FindNeighborsApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error al llamar a la API findNeighbors:", error);
    throw error; // Relanza el error para que el llamador pueda manejarlo
  }
}
