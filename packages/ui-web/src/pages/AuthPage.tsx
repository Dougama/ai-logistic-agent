// packages/ui-web/src/pages/AuthPage.tsx

import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  TextInput,
  Button,
  PasswordInput,
  Stack,
  Title,
  Text,
  Paper,
} from "@mantine/core";

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Para alternar entre login y registro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuthAction = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Limpiamos errores anteriores
    setLoading(true);

    try {
      if (isLogin) {
        // Lógica para Iniciar Sesión
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario ha iniciado sesión con éxito!");
      } else {
        // Lógica para Registrarse
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado con éxito!");
      }
      // Si la operación es exitosa, el "oyente" de estado de Auth que crearemos después
      // se encargará de redirigir al usuario a la página de chat.
    } catch (err: any) {
      console.error("Error de autenticación:", err);
      setError(err.message); // Mostramos el mensaje de error de Firebase
    } finally {
      setLoading(false); // Reseteamos el estado de carga
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f1f3f5",
      }}
    >
      <Paper
        shadow="md"
        p="xl"
        withBorder
        radius="md"
        style={{ width: "400px" }}
      >
        <Title order={2} ta="center" mb="md">
          {isLogin ? "Bienvenido" : "Crear Cuenta"}
        </Title>
        <Text c="dimmed" size="sm" ta="center" mb="xl">
          {isLogin
            ? "Inicia sesión para continuar"
            : "Rellena los campos para registrarte"}
        </Text>

        <form onSubmit={handleAuthAction}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="tu@email.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <PasswordInput
              required
              label="Contraseña"
              placeholder="Tu contraseña"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            {error && (
              <Text color="red" size="sm" ta="center">
                {error}
              </Text>
            )}
            <Button type="submit" fullWidth mt="md" loading={loading}>
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </Button>
          </Stack>
        </form>

        {/* <Text color="dimmed" ta="center" size="sm" mt="md">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
            }}
            style={{ color: "#1971c2", textDecoration: "none" }}
          >
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </a>
        </Text> */}
      </Paper>
    </div>
  );
};
