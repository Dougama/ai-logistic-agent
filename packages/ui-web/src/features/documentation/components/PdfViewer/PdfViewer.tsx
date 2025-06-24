// packages/ui-web/src/features/documentation/components/PdfViewer/PdfViewer.tsx

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Group, ActionIcon, Text, LoadingOverlay } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconZoomIn,
  IconZoomOut,
  IconDownload,
  IconX,
} from "@tabler/icons-react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configurar el worker de PDF.js usando cdnjs que no tiene problemas de CORS
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  url: string;
  title: string;
  onClose: () => void;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  url,
  title,
  onClose,
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    setError("Error al cargar el PDF. Por favor, intenta de nuevo.");
    setLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const zoomIn = () => setScale((prevScale) => Math.min(prevScale + 0.2, 2.0));
  const zoomOut = () => setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));

  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Group
        justify="space-between"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "1rem",
          backdropFilter: "blur(10px)",
        }}
      >
        <Text c="white" fw={600} size="lg">
          {title}
        </Text>
        <Group gap="md">
          <ActionIcon variant="subtle" color="white" onClick={zoomOut}>
            <IconZoomOut size={20} />
          </ActionIcon>
          <Text c="white" size="sm">
            {Math.round(scale * 100)}%
          </Text>
          <ActionIcon variant="subtle" color="white" onClick={zoomIn}>
            <IconZoomIn size={20} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="white"
            onClick={() => window.open(url, "_blank")}
          >
            <IconDownload size={20} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="white" onClick={onClose}>
            <IconX size={20} />
          </ActionIcon>
        </Group>
      </Group>

      {/* PDF Content */}
      <Box
        style={{
          flex: 1,
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <LoadingOverlay visible={loading} />

        {error ? (
          <Text c="white" ta="center">
            {error}
          </Text>
        ) : (
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<Text c="white">Cargando PDF...</Text>}
            options={{
              cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
              cMapPacked: true,
            }}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        )}
      </Box>

      {/* Footer */}
      {!error && (
        <Group
          justify="center"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "1rem",
            backdropFilter: "blur(10px)",
          }}
        >
          <ActionIcon
            variant="subtle"
            color="white"
            onClick={previousPage}
            disabled={pageNumber <= 1}
          >
            <IconChevronLeft size={20} />
          </ActionIcon>
          <Text c="white" size="sm">
            Página {pageNumber} de {numPages || "--"}
          </Text>
          <ActionIcon
            variant="subtle"
            color="white"
            onClick={nextPage}
            disabled={pageNumber >= (numPages || 1)}
          >
            <IconChevronRight size={20} />
          </ActionIcon>
        </Group>
      )}
    </Box>
  );
};
