// packages/ui-web/src/hooks/useWindowSize.ts
import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    // Limpiamos el event listener cuando el componente se desmonta
    return () => window.removeEventListener("resize", handleResize);
  }, []); // El array vacío asegura que el efecto solo se ejecute al montar/desmontar

  return windowSize;
}
