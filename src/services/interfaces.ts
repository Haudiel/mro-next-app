import { FlexProps, BoxProps } from "@chakra-ui/react"
import { IconType } from "react-icons"

export interface LinkItemProps {
    name: string
    icon: IconType
    href: string
}

export interface NavItemProps extends FlexProps {
    icon: IconType
    children: React.ReactNode
}

export interface MobileProps extends FlexProps {
    onOpend: () => void,
}

export interface SidebarProps extends BoxProps {
    onClose: () => void
}

export interface EmployeeData {
    employeeID: string;
    name: string;
    supervisor: string;
    descr: string;
    photo: string;
    status: string;
}

export interface ValueData {
    nombreSolicitante: string;
    departamento: string;
    critico: string;
    noParteFabricante: string;
    marca: string;
    descripcion: string;
    frecuenciaCambio: number;
    cantidad: number;
    fechaSolicitud: string;
    fechaVencimiento: string;
    lineaEstacion: string;
    justificacionAlta: string;
    folioPedido: string;
    compradorAsignado: string;
    tipoProyecto: string;
    documentoPDF: string;
}

export interface UpdateSolicitud {
    folioPedido: string;
    noParteFabricante: string;
    descripcion: string;
    tiempoEntrega: number,
    piezaRetorno: number,
    maxPz: number,
    um: string,
    commodity: number,
    gpoCompra: number,
    spcs: string,
    costoUnitario: number,
    moneda: string,
    stdPack: number,
    indicador: string,
    proyeed: string,
    mro: string
}

export type Pedido = {
    folioPedido: string;
    nombreSolicitante: string;
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
};

export type GroupedPedidos = {
    [folioPedido: string]: Pedido[];
};