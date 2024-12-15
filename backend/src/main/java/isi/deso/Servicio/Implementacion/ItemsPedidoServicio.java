package isi.deso.Servicio.Implementacion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import isi.deso.Repository.ItemsPedidoDAO;
import isi.deso.Repository.VendedorDAO;
import isi.deso.Repository.ClienteDAO;
import isi.deso.exception.ItemNoEncontradoException;
import isi.deso.model.Cliente;
import isi.deso.model.ItemsPedido;
import isi.deso.model.Vendedor;

public class ItemsPedidoServicio {

    @Autowired
    private VendedorDAO vendedorDAO;
    @Autowired
    private ClienteDAO clienteDAO;
    @Autowired
    private ItemsPedidoDAO itemsPedidoDAO;

    /*
     * public List<ItemsPedido> buscarPorVendedor(String dni) throws
     * ItemNoEncontradoException {
     * Vendedor v = vendedorDAO.buscarVendedorPorDni(dni);
     * int idVendedor = v.getId();
     * 
     * List<ItemsPedido> lista = itemsPedidoDAO.buscarPorVendedor(idVendedor);
     * if (lista.isEmpty())
     * throw new
     * ItemNoEncontradoException("No se ha encontrado items para el vendedor con dni "
     * + dni);
     * 
     * return lista;
     * }
     * 
     * public List<ItemsPedido> buscarPorCliente(String cuit) throws
     * ItemNoEncontradoException {
     * Cliente c = clienteDAO.buscarClientePorCuit(cuit);
     * int idCliente = c.getId();
     * 
     * List<ItemsPedido> lista = itemsPedidoDAO.buscarPorCliente(idCliente);
     * if (lista.isEmpty())
     * throw new
     * ItemNoEncontradoException("No se ha encontrado items para el cliente con cuit "
     * + cuit);
     * 
     * return lista;
     * }
     */
}