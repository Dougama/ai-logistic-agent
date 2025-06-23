// packages/ui-web/src/context/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

// 1. Definimos la forma que tendrán los datos de nuestro contexto
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

// 2. Creamos el Contexto de React
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

// 3. Creamos un "hook" personalizado para usar el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};

// 4. Creamos el componente "Proveedor" que envolverá nuestra aplicación
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged es un "oyente" de Firebase que se activa
    // cada vez que el estado de autenticación cambia (login, logout, refresco de página).
    // Esta es la magia que mantiene al usuario "logueado" entre páginas.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Dejamos de cargar una vez que sabemos si hay usuario o no
    });

    // Esta función de limpieza se ejecuta cuando el componente se desmonta,
    // para evitar fugas de memoria.
    return unsubscribe;
  }, []); // El array vacío [] asegura que este efecto se ejecute solo una vez.

  const value = { currentUser, loading };

  return (
    <AuthContext.Provider value={value}>
      {/* Solo renderizamos la aplicación cuando ya no estamos cargando el estado inicial */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
