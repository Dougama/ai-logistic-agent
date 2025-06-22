# # Habilitamos la API necesaria para el peering de VPC
# resource "google_project_service" "servicenetworking" {
#   service = "servicenetworking.googleapis.com"
#   disable_on_destroy = false
# }

# # 1. Creamos nuestra propia red virtual (VPC)
# resource "google_compute_network" "main" {
#   name                    = var.vpc_network_name
#   auto_create_subnetworks = false # Recomendado para control manual
#   depends_on              = [google_project_service.servicenetworking]
# }

# # 2. Creamos una subred dentro de nuestra VPC
# resource "google_compute_subnetwork" "main" {
#   name          = "${var.vpc_network_name}-sub"
#   ip_cidr_range = "10.0.0.0/24" # Rango de IP interno
#   network       = google_compute_network.main.id
# }

# # 3. Asignamos un rango de IPs para que los servicios de Google lo usen
# resource "google_compute_global_address" "private_service_range" {
#   name          = "private-service-range-for-gcp"
#   purpose       = "VPC_PEERING"
#   address_type  = "INTERNAL"
#   ip_version    = "IPV4"
#   network       = google_compute_network.main.id
#   address       = "192.168.0.0" # Rango de IP reservado
#   prefix_length = 16
# }

# # 4. Creamos la conexión de Peering (el "túnel" privado)
# resource "google_service_networking_connection" "main" {
#   network                 = google_compute_network.main.id
#   service                 = "servicenetworking.googleapis.com"
#   reserved_peering_ranges = [google_compute_global_address.private_service_range.name]
# }