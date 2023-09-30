import axios from "axios";
import { GroupedStatus, Status, Pedido, GroupedPedidos } from "@/services/interfaces";

const BASE_URL = "https://localhost:7063/AdminUser"; // Ajusta la URL base según tus necesidades

//* OBTENER INFORMACIÓN
export function getInfoPorFolio(pedidos: any, folio: any, property: any) {
  const ped = pedidos[folio];
  if (ped && ped.length > 0) {
    const value = ped[0][property];
    if (property === "fechaVencimiento" && value) {
      // Si la propiedad es "fechaVencimiento" y hay un valor, realizar el split
      const fechaVencimiento = value.split("T");
      return fechaVencimiento[0];
    } else {
      return value !== undefined ? value.trim() : undefined;
    }
  } else {
    return undefined;
  }
}

//*FUNCIONES A BASE DE DATOS
// Función para obtener datos de aprobaciones por empleado
export async function obtenerAprobacionesPorEmpleado(empleadoId: any) {
  try {
    const response = await axios.get(
      `${BASE_URL}/ObtainAprobaciones_MRO?emplid=${empleadoId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Función para actualizar la aprobación de un pedido
export async function actualizarAprobacion(
  folioPedido: any,
  nombreAprobador: any,
  numAprobador: any
) {
  try {
    const response = await axios.put(
      `${BASE_URL}/UpdateAprobaciones?folioPedido=${folioPedido}&nmbAprob=${nombreAprobador}&numAprob=${numAprobador}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Función para actualizar un pedido rechazado
export async function actualizarRechazo(
  folioPedido: any,
  numEmpleado: any,
  nombreEmpleado: any,
  motivo: any
) {
  try {
    const response = await axios.put(
      `${BASE_URL}/UpdateRechazados?folioPedido=${folioPedido}&numEmpleado=${numEmpleado}&nombEmpleado=${nombreEmpleado}&motivo=${motivo}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

//*AGRUPACIONES
export const groupPedidosByFolioStatus = (pedidos: Status[]): GroupedStatus => {
    const grouped: GroupedStatus = {};
  
    for (const pedido of pedidos) {
      if (!grouped[pedido.folioPedido]) {
        grouped[pedido.folioPedido] = [];
      }
      grouped[pedido.folioPedido].push(pedido);
    }
  
    return grouped;
  };
  
  export const groupPedidosByFolio = (pedidos: Pedido[]): GroupedPedidos => {
    const grouped: GroupedPedidos = {};
  
    for (const pedido of pedidos) {
      if (!grouped[pedido.folioPedido]) {
        grouped[pedido.folioPedido] = [];
      }
      grouped[pedido.folioPedido].push(pedido);
    }
  
    return grouped;
  };
