"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { Container, Box, Button, Input } from "@chakra-ui/react";

export default function LoginPage() {
  const { login } = useAuth();
  const [empleadoId, setEmpleadoId] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    login(empleadoId);
    router.push("/dashboard"); // Redirigir a la página de dashboard después del inicio de sesión
  };

  return (
    <Container>
      <Box>
        <Input
          placeholder="Número de empleado"
          value={empleadoId}
          onChange={(e) => setEmpleadoId(e.target.value)}
        />
        <Button onClick={handleLogin}>Iniciar sesión</Button>
      </Box>
    </Container>
  );
}
