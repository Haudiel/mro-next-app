import { EmployeeData, MobileProps, ValueData } from "@/services/interfaces";
import { generateFolio } from "@/utils/folio";
import {
  useDisclosure,
  Flex,
  useColorModeValue,
  IconButton,
  HStack,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  chakra,
  ModalFooter,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  Text,
} from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import { Delete } from "@mui/icons-material";
import { createTheme, Tooltip } from "@mui/material";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import MaterialReactTable, {
  MRT_Row,
  MRT_ColumnDef,
} from "material-react-table";
import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FiMenu, FiBell } from "react-icons/fi";
import { useAuth } from "@/app/contexts/AuthContext";
import { Options } from "@/services/interfaces";

const MobileNav = ({ onOpend, ...rest }: MobileProps) => {
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [valueData, setValueData] = useState<any>({});
  const [valueDataArray, setValueDataArray] = useState<ValueData[]>([]);
  const [responseMessage, setResponseMessage] = useState("");
  const btnRef = React.useRef(null);
  const { user, logout } = useAuth();
  const [base64Data, setBase64Data] = useState<string | null>(null);
  const [extension, setExtension] = useState<string | null>(null);
  const [getFolio, setFolio] = useState<string | null>(null);

  const {
    folioPedido,
    numComprador,
    compradorAsignado,
    nombreSolicitante,
    fechaSolicitud,
    fechaVencimiento,
    critico,
    noParteFabricante,
    marca,
    descripcion,
    frecuenciaCambio,
    cantidad,
    tipoProyecto,
    lineaEstacion,
    justificacionAlta,
  } = valueData;

  const handleFileInputChange = async (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var base = String(reader.result);
      const ExtensionArchivo = base.split(",")[0] + ",";
      base = base.split(",")[1];
      setBase64Data(base);
      setExtension(ExtensionArchivo);
      console.log(base);
      console.log(ExtensionArchivo);
    };
  };

  console.log(valueDataArray);
  async function sendData() {
    try {
      valueDataArray.forEach(async (value: ValueData) => {
        const response = await axios.post(
          "https://localhost:7063/AdminUser/InsertData",
          value
        );

        setResponseMessage(response.data.message);
      });
    } catch (error) {
      console.error(error);
      setResponseMessage("Error al enviar los datos");
    }
  }

  async function sendDoc() {
    try {
      var body = {
        Folio: getFolio,
        Documento: base64Data,
        Extension: extension,
      };
      const response = await axios.post(
        "https://localhost:7063/AdminUser/InsertDoc",
        body
      );
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setResponseMessage("Error al enviar los datos");
    }
  }

  const handleDeleteRow = useCallback(
    (row: MRT_Row<ValueData>) => {
      if (
        !confirm(
          `Are you sure you want to delete ${row.getValue("noParteFabricante")}`
        )
      ) {
        return;
      }
      valueDataArray.splice(row.index, 1);
      setValueDataArray([...valueDataArray]);
    },
    [valueDataArray]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7063/AdminUser/GetData?emplid=${user?.empleadoId}`
        );
        console.log(response.data);
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [user?.empleadoId]);

  const folio = generateFolio();

  const columns = useMemo<MRT_ColumnDef<ValueData>[]>(
    () => [
      {
        accessorKey: "critico", //access nested data with dot notation
        header: "Critico",
        size: 100,
      },
      {
        accessorKey: "noParteFabricante",
        header: "No. Parte",
        size: 200,
      },
      {
        accessorKey: "marca", //normal accessorKey
        header: "Marca",
        size: 150,
      },
    ],
    []
  );
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpend}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Button mt={3} ref={btnRef} onClick={onOpen} colorScheme="red">
          Crear Solicitud
        </Button>

        <Modal
          onClose={onClose}
          finalFocusRef={btnRef}
          isOpen={isOpen}
          scrollBehavior={"inside"}
          size={"xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Crear solicitud</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{
                  folioPedido: `${folio}`,
                  numComprador: ``,
                  numSolicitante: `${employeeData?.employeeID}`,
                  nombreSolicitante: `${employeeData?.name}`,
                  departamento: `${employeeData?.descr}`,
                  departmentID: `${employeeData?.departmentID}`,
                  fechaSolicitud: "",
                  fechaVencimiento: "",
                  critico: "",
                  noParteFabricante: "",
                  marca: "",
                  descripcion: "",
                  frecuenciaCambio: 0,
                  cantidad: 0,
                  compradorAsignado: "",
                  tipoProyecto: "",
                  lineaEstacion: "",
                  justificacionAlta: "",
                  documentoPDF: "",
                }}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    console.log(JSON.stringify(values, null, 2));
                    console.log(values);

                    const newValueData: ValueData = {
                      ...values,
                    };

                    setFolio(values.folioPedido);
                    setValueDataArray((prevArray) => [
                      ...prevArray,
                      newValueData,
                    ]);
                    setValueData(values);
                    // sendData();

                    actions.setSubmitting(false);
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
                    <Field name="nombreSolicitante">
                      {({ field, form }: any) => (
                        <FormControl isDisabled>
                          <FormLabel>Nombre del solicitante</FormLabel>
                          <Input {...field} placeholder="name" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="departamento">
                      {({ field, form }: any) => (
                        <FormControl isDisabled>
                          <FormLabel>Departamento</FormLabel>
                          <Input {...field} placeholder="name" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="departmentID">
                      {({ field, form }: any) => (
                        <FormControl isDisabled>
                          <FormLabel>Departamento ID</FormLabel>
                          <Input {...field} placeholder="name" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="fechaSolicitud">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Fecha de la Solicitud</FormLabel>
                          <Input
                            {...field}
                            placeholder="Select Date and Time"
                            size="md"
                            type="date"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="fechaVencimiento">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Fecha de vencimiento</FormLabel>
                          <Input
                            {...field}
                            placeholder="Select Date and Time"
                            size="md"
                            type="date"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="compradorAsignado">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Comprador a asignar</FormLabel>
                          <Select
                            {...field}
                            placeholder="Select option"
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const selectedOption = Options.find(
                                (option) => option.label === selectedValue
                              );

                              if (selectedOption) {
                                form.setFieldValue(
                                  "compradorAsignado",
                                  selectedOption.label
                                );
                                form.setFieldValue(
                                  "numComprador",
                                  selectedOption.value
                                );
                              }
                            }}
                            // Asegúrate de que el valor seleccionado sea igual a compradorAsignado
                            value={field.value}
                          >
                            {Options.map((option) => (
                              <option key={option.value} value={option.label}>
                                {option.label}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="tipoProyecto">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Tipo de proyecto</FormLabel>
                          <Input {...field} placeholder="Tipo de proyecto" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="critico">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Critico</FormLabel>
                          <Select {...field} placeholder="Seleccionar">
                            <option value="SI">Si</option>
                            <option value="NO">No</option>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="noParteFabricante">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Número de parte del fabricante</FormLabel>
                          <Input {...field} placeholder="No. Parte" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="marca">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Marca</FormLabel>
                          <Input {...field} placeholder="Marca" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="descripcion">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Descripción</FormLabel>
                          <Input {...field} placeholder="Descripción" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="frecuenciaCambio">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Frecuencia de cambio (Dias)</FormLabel>
                          <NumberInput
                            {...field}
                            min={0}
                            id="frecuenciaCambio"
                            name="frecuenciaCambio"
                            type={"number"}
                            onChange={(v) => {
                              props.setFieldValue("frecuenciaCambio", v);
                            }}
                            onBlur={props.handleBlur}
                            defaultValue={
                              props.initialValues["frecuenciaCambio"]
                            }
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
                    <Field name="cantidad">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Cantidad instalada</FormLabel>
                          <NumberInput
                            {...field}
                            min={0}
                            id="cantidad"
                            name="cantidad"
                            type={"number"}
                            onChange={(v) => {
                              props.setFieldValue("cantidad", v);
                            }}
                            onBlur={props.handleBlur}
                            defaultValue={props.initialValues["cantidad"]}
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
                    <Field name="lineaEstacion">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>
                            Linea o estación donde se utiliza el material
                          </FormLabel>
                          <Input {...field} placeholder="Linea o estación" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="justificacionAlta">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Justificación de la alta</FormLabel>
                          <Input {...field} placeholder="Justificación" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="documentoPDF">
                      {({ field, form }: any) => (
                        <FormControl isRequired>
                          <FormLabel>Agregar documento PDF</FormLabel>
                          <Input
                            multiple
                            size="md"
                            type="file"
                            onChange={handleFileInputChange}
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
              <chakra.div pt={3}>
                <ThemeProvider theme={createTheme({})}>
                  <MaterialReactTable
                    columns={columns}
                    data={valueDataArray}
                    enableColumnActions={false}
                    enableTopToolbar={false}
                    enableBottomToolbar={false}
                    enableRowActions
                    renderRowActions={({ row, table }) => (
                      <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Tooltip arrow placement="right" title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteRow(row)}
                            aria-label={""}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  />
                </ThemeProvider>
              </chakra.div>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  onClose();
                  setValueDataArray([]);
                }}
              >
                Close
              </Button>
              <Button
                ml={1}
                onClick={() => {
                  sendData();
                  sendDoc();
                  onClose();
                  setValueDataArray([]);
                }}
              >
                Enviar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={employeeData?.photo} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{employeeData?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {employeeData?.descr}
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
