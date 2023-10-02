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
import { useAuth } from "@/app/contexts/AuthContext";
import PDFViewer from "../pdf-viewer";
import ExportToExcelButton from "../export-excel";
import { groupPedidosByFolioStatus } from "@/utils/groupPedidoStatus";
import { getInfoPorFolio, getStatusMROByEmployeeId } from "@/utils/functions";

const StatusSolicitud = () => {
  const [pedidos, setPedidos] = React.useState<GroupedStatus>({});

  console.log(pedidos);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatusMROByEmployeeId(user?.empleadoId);
        console.log(response);
        const groupedPedidos = groupPedidosByFolioStatus(response);
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
                      justifyContent={"space-around"}
                    >
                      <chakra.div>
                        <chakra.h1>
                          <chakra.span fontWeight={"bold"}>
                            Nombre del solicitante:{" "}
                          </chakra.span>
                          {getInfoPorFolio(pedidos, folioPedido, 'nombreSolicitante')}
                        </chakra.h1>
                        <chakra.h1>
                          <chakra.span fontWeight={"bold"}>Folio: </chakra.span>
                          {folioPedido}
                        </chakra.h1>
                        <chakra.h1>
                          <chakra.span fontWeight={"bold"}>
                            Fecha de vencimiento:{" "}
                          </chakra.span>
                          {getInfoPorFolio(pedidos, folioPedido, 'fechaVencimiento')}
                        </chakra.h1>
                      </chakra.div>
                      <chakra.div
                        ml={5}
                      >
                        <Badge
                          colorScheme={
                            getInfoPorFolio(pedidos, folioPedido, 'statusAprob') === "RECHAZADO"
                              ? "red"
                              : "green"
                          }
                        >
                          {getInfoPorFolio(pedidos, folioPedido, 'statusAprob')}
                        </Badge>
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
                    <PDFViewer pdf={getInfoPorFolio(pedidos, folioPedido, 'documento')} />
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
