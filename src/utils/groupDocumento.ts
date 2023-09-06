import { Pedido, GroupedPedidos } from "@/services/interfaces";

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