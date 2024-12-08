package isi.deso.Servicio.Implementacion;

import isi.deso.Repository.PedidoDAO;
import isi.deso.Repository.ClienteDAO;
import isi.deso.Repository.VendedorDAO;
import isi.deso.Servicio.IPedidoServicio;
import isi.deso.Repository.ItemMenuDAO;
import isi.deso.DTO.ItemsPedidoDTO;
import isi.deso.DTO.PedidoDTO;
import isi.deso.model.Cliente;
import isi.deso.model.ItemMenu;
import isi.deso.model.ItemsPedido;
import isi.deso.model.Pago;
import isi.deso.model.Pedido;
import isi.deso.model.TipoPago;
import isi.deso.model.Vendedor;
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
        pedidoDAO.save(pedido);
    }

}
