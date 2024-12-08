package isi.deso.Servicio;

import java.util.List;

import isi.deso.model.Cliente;

public interface IClienteServicio {

    public void crearCliente(Cliente cliente);

    // Buscar un cliente por CUIT
    public Cliente buscarCliente(String cuit);

    // Obtener todos los clientes
    public List<Cliente> obtenerTodosLosClientes();

    // Eliminar un cliente por ID
    public void eliminarCliente(Integer id);
}
