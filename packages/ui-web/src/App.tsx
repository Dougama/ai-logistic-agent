// packages/ui-web/src/App.tsx

import { useAuth } from "./context/AuthContext";
import { AuthPage } from "./pages/AuthPage";
import { ChatLayout } from "./pages/ChatLayout"; // Recuerda que renombraste ChatPage -> ChatLayout

function App() {
  // 1. Obtenemos el estado de autenticación de nuestro contexto global.
  //    'currentUser' será un objeto de usuario de Firebase o 'null'.
  //    'loading' será 'true' solo al inicio, mientras Firebase verifica la sesión.
  const { currentUser, loading } = useAuth();

  // 2. Mientras Firebase verifica si hay una sesión activa, mostramos un mensaje genérico.
  //    Esto es importante para evitar que la página de login "parpadee" por un instante
  //    antes de redirigir a un usuario que ya estaba logueado.
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "sans-serif",
          color: "#555",
        }}
      >
        <h2>Cargando Agente de asistencia en reparto...</h2>
      </div>
    );
  }

  // 3. Una vez que sabemos el estado, aplicamos la lógica principal.
  //    Esta es la expresión clave (un operador ternario):
  //    - Si 'currentUser' existe (es "truthy"), el usuario está logueado -> mostramos el ChatLayout.
  //    - Si 'currentUser' es nulo (es "falsy"), el usuario no está logueado -> mostramos el AuthPage.
  return currentUser ? <ChatLayout /> : <AuthPage />;
}

export default App;
