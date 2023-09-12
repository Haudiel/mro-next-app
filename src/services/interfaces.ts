import { FlexProps, BoxProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

export interface MobileProps extends FlexProps {
  onOpend: () => void;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export interface EmployeeData {
  employeeID: string;
  name: string;
  supervisor: string;
  descr: string;
  photo: string;
  status: string;
  departmentID: string;
}

export interface ValueData {
  folioPedido: string;
  numComprador: string;
  compradorAsignado: string;
  numSolicitante: string;
  nombreSolicitante: string;
  departamento: string;
  departmentID: string;
  critico: string;
  noParteFabricante: string;
  marca: string;
  descripcion: string;
  frecuenciaCambio: number;
  cantidad: number;
  fechaSolicitud: string;
  fechaVencimiento: string;
  tipoProyecto: string;
  lineaEstacion: string;
  justificacionAlta: string;
  documentoPDF: string;
}

export interface UpdateSolicitud {
  folioPedido: string;
  noParteFabricante: string;
  descripcion: string;
  tiempoEntrega: number;
  piezaRetorno: number;
  maxPz: number;
  um: string;
  commodity: number;
  gpoCompra: number;
  spcs: string;
  costoUnitario: number;
  moneda: string;
  stdPack: number;
  indicador: string;
  proyeed: string;
  mro: string;
}

export type Pedido = {
  folioPedido: string;
  nombreSolicitante: string;
  departamento: string;
  departmentID: string;
  numeroSolicitante: string;
  critico: string;
  noParteFabricante: string;
  marca: string;
  descripcion: string;
  frecuenciaCambio: string;
  cantidad: string;
  fechaSolicitud: string;
  fechaVencimiento: string;
  tipoProyecto: string;
  lineaEstacion: string;
  justificacionAlta: string;
  tiempoEntrega: string;
  piezaRetorno: string;
  maxPz: string;
  um: string;
  commodity: string;
  gpoCompra: string;
  importancia: string;
  spcs: string;
  costoUnitario: string;
  moneda: string;
  stdPack: string;
  indicador: string;
  proyeed: string;
  mro: string;
  totalValor: string;
  nmbAprob1: string;
  nmbAprob2: string;
  nmbAprob3: string;
  nmbAprob4: string;
  nmbAprob5: string;
  nmbAprob6: string;
  documento: string;
  extension: string;
};

export type Status = {
  folioPedido: string;
  nombreSolicitante: string;
  departamento: string;
  departmentID: string;
  numeroSolicitante: string;
  critico: string;
  noParteFabricante: string;
  marca: string;
  descripcion: string;
  frecuenciaCambio: string;
  cantidad: string;
  fechaSolicitud: string;
  fechaVencimiento: string;
  tipoProyecto: string;
  lineaEstacion: string;
  justificacionAlta: string;
  tiempoEntrega: string;
  piezaRetorno: string;
  maxPz: string;
  um: string;
  commodity: string;
  gpoCompra: string;
  importancia: string;
  spcs: string;
  costoUnitario: string;
  moneda: string;
  stdPack: string;
  indicador: string;
  proyeed: string;
  mro: string;
  totalValor: string;
  nmbAprob1: string;
  nmbAprob2: string;
  nmbAprob3: string;
  nmbAprob4: string;
  nmbAprob5: string;
  nmbAprob6: string;
  statusAprob: string;
  documento: string;
  extension: string;
};

export type GroupedPedidos = {
  [folioPedido: string]: Pedido[];
};

export type GroupedStatus = {
  [folioPedido: string]: Status[];
};

export interface CardPedido {
  folioPedido: string;
  nombreSolicitante: string;
  // Otros campos del pedido si es necesario
}

export const Options = [
  { value: "9789", label: "ARAIZA VILLEGAS, MARIO LUIS" },
  { value: "7237", label: "ZAPIAIN SALAZAR, SILVIA LIZETH" },
  { value: "14241", label: "ESPINOZA ALDAMA, JAVIER EDUARDO" },
  { value: "14246", label: "BARRAGAN BARRERA, DIANA GUADALUPE" },
  { value: "14239", label: "MORALES TANORI, LORENZO" },
  { value: "13990", label: "CHAIN QUINTANA, ALONDRA BERENICE" },
  { value: "14266", label: "AMAYA CANO, ROBERTO LOOREDAN" },
  { value: "14240", label: "ANDUAGA LOPEZ, KENDRA ISAMAR" },
  { value: "14308", label: "LOPEZ RASCON, DIANA CAROLINA" },
  { value: "14404", label: "RENDON ESPINOZA, OSCAR IVAN" },
  { value: "14470", label: "ALVAREZ VEJAR, PABLO" },
  { value: "14512", label: "FRANCO FLORES, MARIA FERNANDA" },
  { value: "13698", label: "PADILLA VEGA, KARINA GUADALUPE" },
  { value: "14567", label: "URQUIJO CAJIGAS, MARIA GUADALUPE" },
  { value: "14562", label: "VALENZUELA COTA, BIANKA ARIANNA" },
  { value: "14631", label: "AYALA BACA, NADYA" },
  { value: "14580", label: "MIRAMONTES CORONA, IGNACIO DE JESUS" },
  { value: "14521", label: "MORENO ENCINAS, MARTIN ALEJANDRO" },
  { value: "13928", label: "ZAMBRANO VERDUGO, JUAN HIRAM" },
  { value: "13924", label: "MIRANDA ALVAREZ, YANIRA ISABEL" },
  { value: "14732", label: "MORALES ROMERO, LUIS EDUARDO" },
  { value: "14244", label: "GURROLA FELIX, PERLA VERONICA" },
  { value: "15077", label: "MALDONADO BURRUEL, ZAYRA ELENA" },
  { value: "13804", label: "TRUJILLO QUINTERO, SERGIO ANSELMO" },
  { value: "14016", label: "VALENZUELA HUILAJOPO, ALEJO" },
  { value: "15289", label: "FELIX QUINTANA, ROXANA" },
  { value: "14248", label: "TAPIA SILVA, LUIS RAMON" },
  { value: "14242", label: "VALENZUELA VALENZUELA, VICTOR MANUEL" },
  { value: "14514", label: "ALVAREZ MOLINA, CRISTIAN IVAN" },
  { value: "14245", label: "MIRELES DE LA TORRE, FRANCISCA GUADALUPE" },
  { value: "14243", label: "JIMENEZ MARTINEZ, MARIA GUADALUPE" },
  { value: "13460", label: "HERNANDEZ SALCIDO, LUIS PEDRO" },
];
