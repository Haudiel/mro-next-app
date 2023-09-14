import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
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
  TextField,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { groupPedidosByFolio } from "@/utils/groupPedido";
import { GroupedPedidos, Pedido, UpdateSolicitud } from "@/services/interfaces";
import {
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  useDisclosure,
  chakra,
  HStack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import * as XLSX from "xlsx";
// import MyComponent from "../export-xlsx";
import PDFViewer from "../pdf-viewer";
import ExportToExcelButton from "../export-excel";

const TablaCard = () => {
  const [pedidos, setPedidos] = React.useState<GroupedPedidos>({});
  console.log(pedidos);
  const [employeeNumber, setEmployeeNumber] = useState("");
  const router = useRouter();
  const { user, logout } = useAuth();
  //CHAKRA
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

  const [updateSolicitud, setUpdateSolicitud] = useState<UpdateSolicitud[]>([]);
  const [responseMessage, setResponseMessage] = useState("");

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

  async function sendData() {
    try {
      console.log(updateSolicitud);
      updateSolicitud.forEach(async (value: UpdateSolicitud) => {
        console.log(value);
        const response = await axios.post(
          "https://localhost:7063/AdminUser/UpdateSolicitud",
          value
        );

        setResponseMessage(response.data.message);
      });
    } catch (error) {
      console.error(error);
      setResponseMessage("Error al enviar los datos");
    }
  }

  const handleOpenModal = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPedido(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7063/AdminUser/ObtainSolicitud?emplid=${user?.empleadoId}`
        );
        console.log(response.data);
        const groupedPedidos = groupPedidosByFolio(response.data);
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
                <HStack>
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
                </HStack>
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
                        <TableCell>Acciones</TableCell>
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
                          <TableCell>
                            <Button onClick={() => handleOpenModal(pedido)}>
                              Llenar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <ChakraProvider>
                  <chakra.div pt={3} display="flex" justifyContent="flex-end">
                    <Button colorScheme="red" size="md" onClick={sendData}>
                      Enviar
                    </Button>
                  </chakra.div>
                </ChakraProvider>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </ThemeProvider>
      <ChakraProvider>
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          scrollBehavior={"inside"}
          size={"xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Pedido</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{
                  folioPedido: `${selectedPedido?.folioPedido}`,
                  noParteFabricante: `${selectedPedido?.noParteFabricante}`,
                  descripcion: `${selectedPedido?.descripcion}`,
                  tiempoEntrega: 0,
                  piezaRetorno: 0,
                  maxPz: 0,
                  um: "",
                  commodity: 0,
                  gpoCompra: 0,
                  spcs: "",
                  costoUnitario: 0,
                  moneda: "",
                  stdPack: 0,
                  indicador: "",
                  proyeed: "",
                  mro: "",
                }}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    console.log(values);

                    const updateSolicitud: UpdateSolicitud = {
                      ...values,
                    };

                    setUpdateSolicitud((prevArray) => [
                      ...prevArray,
                      updateSolicitud,
                    ]);
                    actions.setSubmitting(false);
                    handleCloseModal();
                  }, 1000);
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="folioPedido">
                      {({ field, form }: any) => (
                        <FormControl isDisabled>
                          <FormLabel>Folio</FormLabel>
                          <Input {...field} placeholder="name" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="noParteFabricante">
                      {({ field, form }: any) => (
                        <FormControl isDisabled>
                          <FormLabel>No. Parte del fabricante</FormLabel>
                          <Input {...field} placeholder="name" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="descripcion">
                      {({ field, form }: any) => (
                        <FormControl isDisabled>
                          <FormLabel>Descripción</FormLabel>
                          <Input {...field} placeholder="name" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="tiempoEntrega">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Tiempo de entrega (Dias)</FormLabel>
                          <NumberInput
                            {...field}
                            min={0}
                            id="tiempoEntrega"
                            name="tiempoEntrega"
                            type={"number"}
                            onChange={(v) => {
                              props.setFieldValue("tiempoEntrega", v);
                            }}
                            onBlur={props.handleBlur}
                            defaultValue={props.initialValues["tiempoEntrega"]}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="piezaRetorno">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Pieza de retorno</FormLabel>
                          <NumberInput
                            {...field}
                            min={0}
                            id="piezaRetorno"
                            name="piezaRetorno"
                            type={"number"}
                            onChange={(v) => {
                              props.setFieldValue("piezaRetorno", v);
                            }}
                            onBlur={props.handleBlur}
                            defaultValue={props.initialValues["piezaRetorno"]}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="maxPz">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Maximo de piezas</FormLabel>
                          <NumberInput
                            {...field}
                            min={0}
                            id="maxPz"
                            name="maxPz"
                            type={"number"}
                            onChange={(v) => {
                              props.setFieldValue("maxPz", v);
                            }}
                            onBlur={props.handleBlur}
                            defaultValue={props.initialValues["maxPz"]}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="um">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Unidad de medida</FormLabel>
                          <Select {...field} placeholder="Seleccionar">
                            <option value="PZ">PZ</option>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="commodity">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Commodity</FormLabel>
                          <NumberInput
                            {...field}
                            min={0}
                            id="commodity"
                            name="commodity"
                            type={"number"}
                            onChange={(v) => {
                              props.setFieldValue("commodity", v);
                            }}
                            onBlur={props.handleBlur}
                            defaultValue={props.initialValues["commodity"]}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="gpoCompra">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Grupo de compra</FormLabel>
                          <NumberInput
                            {...field}
                            min={0}
                            id="gpoCompra"
                            name="gpoCompra"
                            type={"number"}
                            onChange={(v) => {
                              props.setFieldValue("gpoCompra", v);
                            }}
                            onBlur={props.handleBlur}
                            defaultValue={props.initialValues["gpoCompra"]}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="importancia">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Importancia</FormLabel>
                          <Select {...field} placeholder="Seleccionar">
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="spcs">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>SP / CS</FormLabel>
                          <Select {...field} placeholder="Seleccionar">
                            <option value="SP">SP</option>
                            <option value="CS">CS</option>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="costoUnitario">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Costo Unitario</FormLabel>
                          <NumberInput
                            {...field}
                            min={0}
                            id="costoUnitario"
                            name="costoUnitario"
                            type={"number"}
                            onChange={(v) => {
                              props.setFieldValue("costoUnitario", v);
                            }}
                            onBlur={props.handleBlur}
                            defaultValue={props.initialValues["costoUnitario"]}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="moneda">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Moneda</FormLabel>
                          <Select {...field} placeholder="Seleccionar">
                            <option value="USD">USD</option>
                            <option value="MXN">MXN</option>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="stdPack">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>STDPACK</FormLabel>
                          <NumberInput
                            {...field}
                            min={0}
                            id="stdPack"
                            name="stdPack"
                            type={"number"}
                            onChange={(v) => {
                              props.setFieldValue("stdPack", v);
                            }}
                            onBlur={props.handleBlur}
                            defaultValue={props.initialValues["stdPack"]}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="indicador">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Indicador</FormLabel>
                          <Input {...field} placeholder="Indicador" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="proyeed">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Proyeed</FormLabel>
                          <Input {...field} placeholder="Proyeed" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="mro">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>MRO</FormLabel>
                          <Input {...field} placeholder="MRO" />
                        </FormControl>
                      )}
                    </Field>
                    <ModalFooter>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={handleCloseModal}
                      >
                        Cerrar
                      </Button>
                      <Button
                        colorScheme="teal"
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </>
  );
};

export default TablaCard;
