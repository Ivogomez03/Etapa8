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

    public ClienteDTO convertirAclienteDto(Cliente cliente);

    public void modificarCliente(ClienteDTO clienteDTO);

    public void eliminarCliente(String cuit);

}
