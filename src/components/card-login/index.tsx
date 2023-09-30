import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Card,
  CardBody,
  Image,
  Center,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Collapse,
} from "@chakra-ui/react";
import { useAuth } from "@/app/contexts/AuthContext";

interface ResponseData {
  mensaje: string;
}

const LoginForm = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [empleadoId, setEmpleadoId] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    // Ocultar cualquier mensaje de error previo
    setShowErrorAlert(false);

    // Llamar a la función de inicio de sesión (supongo que devuelve un booleano)
    const loginSuccessful = await login(empleadoId);

    if (loginSuccessful) {
      // Si el inicio de sesión es exitoso, mostrar el Alert de éxito
      setShowSuccessAlert(true);
      // Redirigir a la página de dashboard después del inicio de sesión
      router.push("/dashboard");
    } else {
      // Si el inicio de sesión falla, mostrar el Alert de error
      setShowErrorAlert(true);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center" // Centrar verticalmente
      alignItems="center" // Centrar horizontalmente
      width="100vw"
      height="70vh"
    >
      <Card maxW="sm" w="35%">
        <CardBody>
          <Box p={4}>
            <VStack spacing={4} align="stretch">
              <Center>
                <Image
                  src="https://companieslogo.com/img/orig/MGA-61d0a782.png?t=1637168982"
                  w="50%"
                />
              </Center>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  focusBorderColor="black"
                  type="text"
                  value={empleadoId}
                  onChange={(e) => setEmpleadoId(e.target.value)}
                />
              </FormControl>
              <Button colorScheme="red" onClick={handleLogin} w="100%">
                Login
              </Button>
              {showSuccessAlert && (
                <Collapse in={showSuccessAlert} animateOpacity>
                  <Alert
                    status="success"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="150px"
                    borderRadius={10}
                    mt={4}
                  >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                      ¡Acceso permitido!
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                      Has obtenido acceso con éxito.
                    </AlertDescription>
                  </Alert>
                </Collapse>
              )}
              {showErrorAlert && (
                <Collapse in={showErrorAlert} animateOpacity>
                  <Alert
                    status="error"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="150px"
                    borderRadius={10}
                    mt={4}
                  >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                      Error de acceso
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                      No tienes acceso. Verifica tus credenciales.
                    </AlertDescription>
                  </Alert>
                </Collapse>
              )}
            </VStack>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default LoginForm;
