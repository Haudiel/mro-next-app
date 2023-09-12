"use client";
import { useAuth } from "../contexts/AuthContext";
import SidebarWithHeaderTwo from "@/components/side-bar-two";

export default function SolicitudPage() {
  const { user, logout } = useAuth();

  return (
    // <Container>
    //   <Box>
    //     <Text>Bienvenido, {user?.empleadoId}</Text>
    //     <Button onClick={logout}>Cerrar sesión</Button>
    //   </Box>
    // </Container>
    <SidebarWithHeaderTwo />
  );
}
