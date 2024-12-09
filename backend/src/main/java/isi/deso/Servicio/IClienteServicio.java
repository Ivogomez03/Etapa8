package isi.deso.Servicio;

import java.util.List;

import isi.deso.DTO.ClienteDTO;
import isi.deso.model.Cliente;

public interface IClienteServicio {

    public void crearCliente(ClienteDTO cliente);

    // Buscar un cliente por CUIT
    public ClienteDTO buscarCliente(String cuit);

    // Obtener todos los clientes
    public List<ClienteDTO> obtenerTodosLosClientes();

    // Eliminar un cliente por ID
    public void eliminarCliente(Integer id);

    public ClienteDTO convertirAclienteDto(Cliente cliente);

}
