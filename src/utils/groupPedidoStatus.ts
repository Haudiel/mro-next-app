import { GroupedStatus, Status } from "@/services/interfaces";

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