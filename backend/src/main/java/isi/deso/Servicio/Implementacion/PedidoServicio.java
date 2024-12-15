package isi.deso.Servicio.Implementacion;

import isi.deso.Repository.PedidoDAO;
import isi.deso.Repository.ClienteDAO;
import isi.deso.Repository.VendedorDAO;
import isi.deso.Servicio.IPedidoServicio;
import isi.deso.Repository.ItemMenuDAO;
import isi.deso.DTO.ItemsPedidoDTO;
import isi.deso.DTO.PedidoDTO;
import isi.deso.model.Cliente;
import isi.deso.model.Estado;
import isi.deso.model.ItemMenu;
import isi.deso.model.ItemsPedido;
import isi.deso.model.Pago;
import isi.deso.model.Pedido;
import isi.deso.model.TipoPago;
import isi.deso.model.Vendedor;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServicio implements IPedidoServicio {

    @Autowired
    private PedidoDAO pedidoDAO;

    @Autowired
    private ClienteDAO clienteDAO;

    @Autowired
    private VendedorDAO vendedorDAO;

    @Autowired
    private ItemMenuDAO itemMenuDAO;

    public void crearPedido(PedidoDTO pedidoDTO) {
        Cliente cliente = clienteDAO.buscarClientePorCuit(pedidoDTO.getCuitCliente());
        Vendedor vendedor = vendedorDAO.buscarVendedorPorDni(pedidoDTO.getDniVendedor());
        TipoPago tipoDePago = TipoPago.valueOf(pedidoDTO.getPago());
        Pago pago = new Pago(pedidoDTO.getMontoPago(), tipoDePago, pedidoDTO.getCredenciales());

        Pedido pedido = new Pedido();
        pedido.setPago(pago);
        pedido.setCliente(cliente);
        pedido.setVendedor(vendedor);
        pedido.setEstado(Estado.PENDIENTE);
        for (ItemsPedidoDTO dto : pedidoDTO.getDetalle()) {
            ItemMenu itemMenu = itemMenuDAO.findById(dto.getId_item())
                    .orElseThrow(() -> new RuntimeException("ItemMenu no encontrado"));
            itemMenu.setId(dto.getId_item()); // Aquí debes establecer el ItemMenu correspondiente, ajustado según tu
                                              // lógica
            ItemsPedido itemsPedido = new ItemsPedido();
            itemsPedido.setCantidad(dto.getCantidad());
            itemsPedido.setItemMenu(itemMenu);
            itemsPedido.setPedido(pedido);
            pedido.getDetalle().add(itemsPedido);
        }

        // Llamar al DAO para persistir el pedido en la base de datos
        try {
            pedidoDAO.save(pedido);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error al guardar el pedido");
        }
    }

    public List<PedidoDTO> obtenerPedidosPorVendedor(String dniVendedor) {
        int idVendedor = vendedorDAO.buscarVendedorPorDni(dniVendedor).getId();
        System.out.println("El id del vendedor es: " + idVendedor);
        List<Pedido> pedidos = pedidoDAO.findPedidosByVendedor(idVendedor);
        System.out.println("Los pedidos son:  " + pedidos);
        if (pedidos.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron pedidos del vendedor con dni " + dniVendedor);
        }
        return pedidos.stream()
                .map(this::convertirApedidoDTO)
                .collect(Collectors.toList());

    }

    public List<PedidoDTO> obtenerPedidosPorCliente(String cuitCliente) {
        int idCliente = clienteDAO.buscarClientePorCuit(cuitCliente).getId();
        List<Pedido> pedidos = pedidoDAO.findPedidosByCliente(idCliente);
        if (pedidos.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron pedidos del cliente con el cuit " + cuitCliente);
        }
        return pedidos.stream()
                .map(this::convertirApedidoDTO)
                .collect(Collectors.toList());

    }

    public ItemsPedidoDTO convertirAitemsPedidoDTO(ItemsPedido itemPedido) {
        ItemsPedidoDTO itemsPedidoDTO = new ItemsPedidoDTO();
        if (itemPedido != null) {
            itemsPedidoDTO.setCantidad(itemPedido.getCantidad());
            if (itemPedido.getItemMenu() != null) {
                itemsPedidoDTO.setId_item(itemPedido.getItemMenu().getId());
            }
        }
        return itemsPedidoDTO;
    }

    public PedidoDTO convertirApedidoDTO(Pedido pedido) {
        PedidoDTO pedidoDTO = new PedidoDTO();

        List<ItemsPedido> itemsPedidos = pedido.getDetalle();
        if (itemsPedidos != null) {
            List<ItemsPedidoDTO> itemsPedidosDTO = itemsPedidos.stream()
                    .map(this::convertirAitemsPedidoDTO)
                    .collect(Collectors.toList());
            pedidoDTO.setDetalle(itemsPedidosDTO);
        } else {
            pedidoDTO.setDetalle(new ArrayList<>()); // Asigna una lista vacía si el detalle es nulo
        }

        if (pedido.getPago() != null) {
            pedidoDTO.setPago(pedido.getPago().getTipoPago().name());
            pedidoDTO.setMontoPago(pedido.getPago().getMonto());
            pedidoDTO.setCredenciales(pedido.getPago().getCredencial());
        }

        if (pedido.getCliente() != null) {
            pedidoDTO.setCuitCliente(pedido.getCliente().getCuit());
        }

        if (pedido.getVendedor() != null) {
            pedidoDTO.setDniVendedor(pedido.getVendedor().getDni());
        }

        pedidoDTO.setId(pedido.getId());
        pedidoDTO.setEstado(pedido.getEstado());

        System.out.println("El pedido dto es: " + pedidoDTO);

        return pedidoDTO;
    }

}
