export interface Document {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  category: DocumentCategory;
  uploadedAt: Date;
  size?: string;
}

// Este es un enum (valor), no un tipo
export enum DocumentCategory {
  REPARTO = "Reparto",
  PEOPLE = "People",
  SEGURIDAD = "Seguridad",
  FLOTA = "Flota",
}

export interface DocumentsByCategory {
  category: DocumentCategory;
  documents: Document[];
}
