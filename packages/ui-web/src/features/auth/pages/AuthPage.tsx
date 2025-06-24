import React, { useState } from "react";
import { Stack, Title, Text, Paper, Anchor } from "@mantine/core";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => setIsLogin(!isLogin);

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

        {isLogin ? (
          <LoginForm onToggleMode={toggleMode} />
        ) : (
          <RegisterForm onToggleMode={toggleMode} />
        )}

        <Text c="dimmed" ta="center" size="sm" mt="md">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <Anchor onClick={toggleMode} style={{ cursor: "pointer" }}>
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};
