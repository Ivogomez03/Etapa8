package isi.deso.Servicio.Implementacion;

import isi.deso.Repository.ClienteDAO;
import isi.deso.Servicio.IClienteServicio;
import isi.deso.model.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteServicio implements IClienteServicio {

    @Autowired
    private ClienteDAO clienteDAO;

    // Crear o actualizar un cliente
    public void crearCliente(Cliente cliente) {
        clienteDAO.save(cliente);
    }

    // Buscar un cliente por CUIT
    public Cliente buscarCliente(String cuit) {
        return clienteDAO.buscarClientePorCuit(cuit);
    }

    // Obtener todos los clientes
    public List<Cliente> obtenerTodosLosClientes() {
        return (List<Cliente>) clienteDAO.findAll(); // Hacemos un cast porque findAll() devuelve un Iterable
    }

    // Eliminar un cliente por ID
    public void eliminarCliente(Integer id) {
        clienteDAO.deleteById(id);
    }
}