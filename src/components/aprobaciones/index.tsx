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
import {
  Badge,
  Button,
  chakra,
  ChakraProvider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import PDFViewer from "../pdf-viewer";
import ExportToExcelButton from "../export-excel";
import { groupPedidosByFolioStatus } from "@/utils/groupPedidoStatus";

const AprobacionSolicitud = () => {
  const [pedidos, setPedidos] = React.useState<GroupedStatus>({});
  const { user, logout } = useAuth();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState(""); // Para almacenar el motivo de rechazo

  const openRejectionModal = () => {
    setIsRejectionModalOpen(true);
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  function getNombreCompradorPorFolio(folio: string): string | undefined {
    const ped = pedidos[folio];
    if (ped && ped.length > 0) {
      return ped[0].nombreSolicitante.trim();
    } else {
      return undefined;
    }
  }

  function getDepartamentoPorFolio(folio: string): string | undefined {
    const ped = pedidos[folio];
    if (ped && ped.length > 0) {
      return ped[0].departamento.trim();
    } else {
      return undefined;
    }
  }

  function getValorTotalPorFolio(folio: string): string | undefined {
    const ped = pedidos[folio];
    if (ped && ped.length > 0) {
      return ped[0].totalValor.trim();
    } else {
      return undefined;
    }
  }

  function getMonedaPorFolio(folio: string): string | undefined {
    const ped = pedidos[folio];
    if (ped && ped.length > 0) {
      return ped[0].moneda.trim();
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

  function getStatusFolio(folio: string): string | undefined {
    const ped = pedidos[folio];
    if (ped && ped.length > 0) {
      return ped[0].statusAprob.trim();
    } else {
      return undefined;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7063/AdminUser/ObtainAprobaciones_MRO?emplid=${user?.empleadoId}`
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

  async function updateAprobacion(folioPedido: string) {
    const fetchData = async () => {
      try {
        const response = await axios.put(
          `https://localhost:7063/AdminUser/UpdateAprobaciones?folioPedido=${folioPedido}&nmbAprob=${user?.name}&numAprob=${user?.empleadoId}`
        );
        console.log(response);
      } catch (error) {
        console.error("Error con los datos: ", error);
      }
    };
    fetchData();
  }

  async function updateRechazados(folioPedido: string) {
    const fetchData = async () => {
      try {
        const response = await axios.put(
          `https://localhost:7063/AdminUser/UpdateRechazados?folioPedido=${folioPedido}&numEmpleado=${user?.empleadoId}&nombEmpleado=${user?.name}&motivo=${rejectionReason}`
        );
        console.log(response);
      } catch (error) {
        console.error("Error con los datos: ", error);
      }
    };
    fetchData();
  }

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
                      justifyContent={"space-between"}
                    >
                      <chakra.div>
                        <chakra.h1>
                          <chakra.span fontWeight={"bold"}>
                            Nombre del solicitante:{" "}
                          </chakra.span>
                          {getNombreCompradorPorFolio(folioPedido)}
                        </chakra.h1>
                        <chakra.h1>
                          <chakra.span fontWeight={"bold"}>
                            Departamento solicitante: {""}
                          </chakra.span>
                          {getDepartamentoPorFolio(folioPedido)}
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
                      <chakra.div ml={5}>
                        <Badge
                          colorScheme={
                            getStatusFolio(folioPedido) === "RECHAZADO"
                              ? "red"
                              : "green"
                          }
                        >
                          {getStatusFolio(folioPedido)}
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
                <chakra.h1>
                  El costo total del pedido es:{" "}
                  {getValorTotalPorFolio(folioPedido)}{" "}
                  {getMonedaPorFolio(folioPedido)}
                </chakra.h1>
                <ChakraProvider>
                  <chakra.div pt={3} display="flex" justifyContent="flex-end">
                    <Button
                      colorScheme="green"
                      size="md"
                      onClick={openConfirmationModal}
                      mr={1}
                    >
                      Aprobar
                    </Button>
                    <Button
                      colorScheme="red"
                      size="md"
                      onClick={openRejectionModal}
                    >
                      Rechazar
                    </Button>
                  </chakra.div>
                  <Modal
                    isOpen={isConfirmationModalOpen}
                    onClose={() => setIsConfirmationModalOpen(false)}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Confirmación</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        ¿Está seguro de que desea aprobar esta solicitud?
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          colorScheme="green"
                          mr={3}
                          onClick={() => {
                            // Agrega aquí la lógica para aprobar la solicitud.
                            // Por ejemplo, puedes llamar a la función updateAprobacion(folioPedido)
                            // y luego cerrar el modal.
                            updateAprobacion(folioPedido);
                            setTimeout(() => {
                              window.location.reload();
                            }, 2000);
                            setIsConfirmationModalOpen(false);
                          }}
                        >
                          Aprobar
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => setIsConfirmationModalOpen(false)}
                        >
                          Cancelar
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                  <Modal
                    isOpen={isRejectionModalOpen}
                    onClose={() => setIsRejectionModalOpen(false)}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Rechazar Solicitud</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Textarea
                          placeholder="Motivo de rechazo"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          colorScheme="red"
                          onClick={() => setIsRejectionModalOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          colorScheme="green"
                          mr={3}
                          onClick={() => {
                            // Agrega aquí la lógica para rechazar la solicitud con el motivo proporcionado.
                            // Por ejemplo, puedes llamar a una función updateRechazo(folioPedido, rejectionReason)
                            // y luego cerrar el modal.
                            updateRechazados(folioPedido);
                            // updateRechazo(folioPedido, rejectionReason);
                            setIsRejectionModalOpen(false);
                            // También puedes restablecer el motivo de rechazo aquí si es necesario.
                            setRejectionReason("");
                            setTimeout(() => {
                              window.location.reload();
                            }, 2000);
                          }}
                        >
                          Rechazar
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </ChakraProvider>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </ThemeProvider>
    </>
  );
};

export default AprobacionSolicitud;
