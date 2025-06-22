# en infrastructure/vertex_ai.tf

# Añadimos un "data source" para obtener el número de nuestro proyecto automáticamente
data "google_project" "current" {}

# 1. Creamos el Índice Vectorial (CON LA DIMENSIÓN CORRECTA)
resource "google_vertex_ai_index" "protocols_index" {
  display_name = "protocolos-logistica-idx-public"
  description  = "Índice para los protocolos de logística"
  project      = var.gcp_project_id
  region       = var.gcp_region
  
  metadata {
    # IMPORTANTE: Asegúrate de que los archivos en este bucket contienen
    # embeddings generados con text-embedding-004 (768 dimensiones).
    contents_delta_uri = "gs://ia-agent/logistics-files/"
    config {
      # --- ESTA ES LA CORRECCIÓN CLAVE ---
      # El modelo text-embedding-004 produce vectores de 768 dimensiones.
      dimensions                  = 768 # <-- CORREGIDO
      
      approximate_neighbors_count = 150
      distance_measure_type       = "COSINE_DISTANCE"
      feature_norm_type           = "UNIT_L2_NORM"
      algorithm_config {
        tree_ah_config {
          leaf_node_embedding_count = 0 
        }
      }
    }
  }
}

# 2. Creamos el Endpoint
resource "google_vertex_ai_index_endpoint" "protocols_endpoint" {
  display_name = "logistics-index-endpoint"
  project      = var.gcp_project_id
  region       = var.gcp_region
  
  # La configuración de red (network) es para endpoints privados.
  # Si usas un endpoint público, está bien mantenerla comentada.
  # network = "projects/${data.google_project.current.number}/global/networks/${var.vpc_network_name}"
}

# 3. Desplegamos el Índice en el Endpoint (usando el comando gcloud)
resource "null_resource" "deploy_index_via_gcloud" {
  depends_on = [
    google_vertex_ai_index.protocols_index,
    google_vertex_ai_index_endpoint.protocols_endpoint
  ]

  provisioner "local-exec" {
    # Este comando despliega el índice creado en el endpoint.
    # El ID estático --deployed-index-id="deployed_protocols_v1" es una buena práctica.
    command = <<-EOT
      gcloud ai index-endpoints deploy-index ${google_vertex_ai_index_endpoint.protocols_endpoint.id} \
        --index=${google_vertex_ai_index.protocols_index.id} \
        --display-name="deployment_v1" \
        --deployed-index-id="deployed_protocols_v1" \
        --project=${var.gcp_project_id} \
        --region=${var.gcp_region}
    EOT
  }
}

# --- SALIDAS (OUTPUTS) ---
output "vertex_ai_index_endpoint_id" {
  description = "El ID numérico del endpoint del índice, para usar en el .env"
  value       = google_vertex_ai_index_endpoint.protocols_endpoint.id
}