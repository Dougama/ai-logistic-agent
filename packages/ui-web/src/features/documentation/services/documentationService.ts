// packages/ui-web/src/features/documentation/services/documentationService.ts
import { Document, DocumentCategory, DocumentsByCategory } from "../types";

export class DocumentationService {
  // Simular datos de documentos con PDFs reales de ejemplo
  private mockDocuments: Document[] = [
    // Reparto
    {
      id: "rep-001",
      title: "Manual de Procedimientos de Reparto",
      description:
        "Guía completa sobre los procesos de distribución y entrega de mercancías",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      category: DocumentCategory.REPARTO,
      uploadedAt: new Date("2024-01-15"),
      size: "2.3 MB",
    },
    {
      id: "rep-002",
      title: "Protocolos de Entrega Segura",
      description:
        "Procedimientos de seguridad para la entrega de paquetes en diferentes situaciones",
      pdfUrl:
        "https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pdf",
      category: DocumentCategory.REPARTO,
      uploadedAt: new Date("2024-02-01"),
      size: "1.8 MB",
    },
    {
      id: "rep-003",
      title: "Optimización de Rutas de Entrega",
      description:
        "Estrategias y mejores prácticas para optimizar las rutas de reparto",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      category: DocumentCategory.REPARTO,
      uploadedAt: new Date("2024-02-20"),
      size: "3.1 MB",
    },

    // People
    {
      id: "peo-001",
      title: "Manual del Empleado",
      description:
        "Información completa sobre políticas, beneficios y procedimientos de la empresa",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      category: DocumentCategory.PEOPLE,
      uploadedAt: new Date("2024-01-10"),
      size: "4.2 MB",
    },
    {
      id: "peo-002",
      title: "Código de Conducta",
      description:
        "Normas de comportamiento y ética profesional para todos los colaboradores",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      category: DocumentCategory.PEOPLE,
      uploadedAt: new Date("2024-01-20"),
      size: "1.5 MB",
    },
    {
      id: "peo-003",
      title: "Plan de Capacitación 2024",
      description: "Programa anual de formación y desarrollo profesional",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      category: DocumentCategory.PEOPLE,
      uploadedAt: new Date("2024-03-01"),
      size: "2.7 MB",
    },

    // Seguridad
    {
      id: "seg-001",
      title: "Protocolos de Seguridad Industrial",
      description: "Medidas de seguridad y prevención de riesgos en el trabajo",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      category: DocumentCategory.SEGURIDAD,
      uploadedAt: new Date("2024-01-05"),
      size: "3.5 MB",
    },
    {
      id: "seg-002",
      title: "Plan de Emergencias",
      description: "Procedimientos de actuación ante situaciones de emergencia",
      pdfUrl:
        "https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pdf",
      category: DocumentCategory.SEGURIDAD,
      uploadedAt: new Date("2024-01-25"),
      size: "2.9 MB",
    },
    {
      id: "seg-003",
      title: "Manual de Primeros Auxilios",
      description: "Guía práctica de primeros auxilios para el personal",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      category: DocumentCategory.SEGURIDAD,
      uploadedAt: new Date("2024-02-15"),
      size: "4.1 MB",
    },

    // Flota
    {
      id: "flo-001",
      title: "Manual de Mantenimiento Vehicular",
      description:
        "Procedimientos de mantenimiento preventivo y correctivo de la flota",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      category: DocumentCategory.FLOTA,
      uploadedAt: new Date("2024-01-12"),
      size: "5.2 MB",
    },
    {
      id: "flo-002",
      title: "Normas de Conducción Segura",
      description:
        "Reglamento y mejores prácticas para conductores de la flota",
      pdfUrl:
        "https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pdf",
      category: DocumentCategory.FLOTA,
      uploadedAt: new Date("2024-02-05"),
      size: "2.4 MB",
    },
    {
      id: "flo-003",
      title: "Control de Combustible y Rutas",
      description: "Sistema de monitoreo y control de consumo de combustible",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      category: DocumentCategory.FLOTA,
      uploadedAt: new Date("2024-02-28"),
      size: "3.3 MB",
    },
  ];

  async getDocuments(): Promise<Document[]> {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.mockDocuments;
  }

  async getDocumentsByCategory(): Promise<DocumentsByCategory[]> {
    const documents = await this.getDocuments();

    const categories = Object.values(DocumentCategory);
    const documentsByCategory: DocumentsByCategory[] = categories.map(
      (category) => ({
        category,
        documents: documents.filter((doc) => doc.category === category),
      })
    );

    return documentsByCategory;
  }

  async getDocumentById(id: string): Promise<Document | null> {
    const documents = await this.getDocuments();
    return documents.find((doc) => doc.id === id) || null;
  }
}

export const documentationService = new DocumentationService();
