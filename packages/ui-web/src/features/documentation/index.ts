// Exportar la página
export { DocumentationPage } from "./pages";

// Exportar tipos (interfaces) - usando export type
export type { Document, DocumentsByCategory } from "./types";

// Exportar enum (valor) - sin type porque es un valor real
export { DocumentCategory } from "./types";

// Exportar servicios
export { documentationService } from "./services";

// Exportar componentes si necesitas usarlos en otros lugares
export { DocumentCard, DocumentCategories, PdfViewer } from "./components";
