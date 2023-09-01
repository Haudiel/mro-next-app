'use client'
import SidebarWithHeader from '@/components/side-bar';
import { useAuth } from '../contexts/AuthContext';
import { Container, Box, Text, Button } from '@chakra-ui/react';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    // <Container>
    //   <Box>
    //     <Text>Bienvenido, {user?.empleadoId}</Text>
    //     <Button onClick={logout}>Cerrar sesión</Button>
    //   </Box>
    // </Container>
    <SidebarWithHeader/>
  );
}