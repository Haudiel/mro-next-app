import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { GroupedStatus } from "@/services/interfaces";
import { Badge, chakra, ChakraProvider, HStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import PDFViewer from "../pdf-viewer";
import ExportToExcelButton from "../export-excel";
import { groupPedidosByFolioStatus } from "@/utils/groupPedidoStatus";

const StatusSolicitud = () => {
  const [pedidos, setPedidos] = React.useState<GroupedStatus>({});
  console.log(pedidos);
  const [employeeNumber, setEmployeeNumber] = useState("");
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const storedEmployeeNumber = localStorage.getItem("noEmpleado");
    if (!storedEmployeeNumber) {
      // Redirigir al usuario si no está autenticado
      router.push("/"); // Asegúrate de importar el router de Next.js
    } else {
      // Si está autenticado, establece el número de empleado en el estado
      setEmployeeNumber(storedEmployeeNumber);
    }
  }, [router]);

  function getNombreCompradorPorFolio(folio: string): string | undefined {
    const ped = pedidos[folio];
    if (ped && ped.length > 0) {
      return ped[0].nombreSolicitante.trim();
    } else {
      return undefined;
    }
  }

  function getDocumentoPorFolio(folio: string): string | undefined {
    const ped = pedidos[folio];
    if (ped && ped.length > 0) {
      return ped[0].documento;
    } else {
      return undefined;
    }
  }

  function getFechaVencimientoFolio(folio: string): string | undefined {
    const ped = pedidos[folio];
    if (ped && ped.length > 0) {
      const fechaVencimiento = ped[0].fechaVencimiento.split("T");
      return fechaVencimiento[0];
    } else {
      return undefined;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7063/AdminUser/getStatus_MRO?emplid=${user?.empleadoId}`
        );
        console.log(response.data);
        const groupedPedidos = groupPedidosByFolioStatus(response.data);
        setPedidos(groupedPedidos);
        console.log(groupedPedidos);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [user?.empleadoId]);

  return (
    <>
      <ThemeProvider theme={createTheme({})}>
        <div>
          {Object.keys(pedidos).map((folioPedido) => (
            <Accordion key={folioPedido}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <ChakraProvider>
                  <HStack>
                    <chakra.div
                      display={"flex"}
                      justifyContent={'space-between'}
                    >
                      <chakra.div>
                        <chakra.h1>
                          <chakra.span fontWeight={"bold"}>
                            Nombre del solicitante:{" "}
                          </chakra.span>
                          {getNombreCompradorPorFolio(folioPedido)}
                        </chakra.h1>
                        <chakra.h1>
                          <chakra.span fontWeight={"bold"}>Folio: </chakra.span>
                          {folioPedido}
                        </chakra.h1>
                        <chakra.h1>
                          <chakra.span fontWeight={"bold"}>
                            Fecha de vencimiento:{" "}
                          </chakra.span>
                          {getFechaVencimientoFolio(folioPedido)}
                        </chakra.h1>
                      </chakra.div>
                      <chakra.div>
                        {pedidos[folioPedido].map((pedido, index) => (
                            <Badge colorScheme="green">{pedido.mro}</Badge>
                        ))}
                      </chakra.div>
                    </chakra.div>
                  </HStack>
                </ChakraProvider>
              </AccordionSummary>
              <AccordionDetails>
                <chakra.div
                  display={"flex"}
                  justifyContent={"space-between"}
                  mb={3}
                >
                  <chakra.div>
                    <ExportToExcelButton data={pedidos[folioPedido]} />
                  </chakra.div>
                  <chakra.div>
                    <PDFViewer pdf={getDocumentoPorFolio(folioPedido)} />
                  </chakra.div>
                </chakra.div>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No. Parte</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell>Descripcion</TableCell>
                        <TableCell>Frecuencia de cambio (dias)</TableCell>
                        <TableCell>Cantidad Instalada</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pedidos[folioPedido].map((pedido, index) => (
                        <TableRow key={index} hover>
                          <TableCell>{pedido.noParteFabricante}</TableCell>
                          <TableCell>{pedido.marca}</TableCell>
                          <TableCell>{pedido.descripcion}</TableCell>
                          <TableCell>{pedido.frecuenciaCambio}</TableCell>
                          <TableCell>{pedido.cantidad}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </ThemeProvider>
    </>
  );
};

export default StatusSolicitud;
