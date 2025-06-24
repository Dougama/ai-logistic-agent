import React, { useState } from "react";
import { TextInput, PasswordInput, Button, Stack, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../shared/services/auth/firebase";

interface RegisterFormProps {
  onToggleMode: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <PasswordInput
          required
          label="Confirmar Contraseña"
          placeholder="Confirma tu contraseña"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.currentTarget.value)}
        />

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red">
            {error}
          </Alert>
        )}

        <Button type="submit" fullWidth loading={loading}>
          Registrarse
        </Button>
      </Stack>
    </form>
  );
};
