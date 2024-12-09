package isi.deso.Servicio.Implementacion;

import isi.deso.DTO.ClienteDTO;
import isi.deso.Repository.ClienteDAO;
import isi.deso.Servicio.IClienteServicio;
import isi.deso.model.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteServicio implements IClienteServicio {

    @Autowired
    private ClienteDAO clienteDAO;

    // Crear o actualizar un cliente
    public void crearCliente(ClienteDTO clienteDTO) {
        Cliente cliente = new Cliente(clienteDTO.getEmail(), clienteDTO.getCuit(), clienteDTO.getDireccion(),
                clienteDTO.getLatitud(), clienteDTO.getLongitud());
        try {
            clienteDAO.save(cliente);
        } catch (DataIntegrityViolationException e) {
            // Manejar la violación de integridad de datos
            throw new RuntimeException("Error al guardar el cliente", e);
        }
    }

    // Buscar un cliente por CUIT
    public ClienteDTO buscarCliente(String cuit) {
        Cliente cliente = clienteDAO.buscarClientePorCuit(cuit);
        if (cliente == null)
            throw new IllegalArgumentException("No se ha encontrado el cliente con el cuit " + cuit);

        return convertirAclienteDto(cliente);
    }

    // Obtener todos los clientes
    public List<ClienteDTO> obtenerTodosLosClientes() {
        List<Cliente> clientes = clienteDAO.findAll();
        if (clientes.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron clientes.");
        }
        return clientes.stream()
                .map(this::convertirAclienteDto)
                .collect(Collectors.toList());
    }

    public ClienteDTO convertirAclienteDto(Cliente cliente) {
        ClienteDTO clienteDTO = new ClienteDTO();
        clienteDTO.setCuit(cliente.getCuit());
        clienteDTO.setDireccion(cliente.getDireccion());
        clienteDTO.setEmail(cliente.getEmail());
        clienteDTO.setLatitud(cliente.getCoordenadas().getLat());
        clienteDTO.setLongitud(cliente.getCoordenadas().getLng());
        return clienteDTO;

    }

    // Eliminar un cliente por ID
    public void eliminarCliente(Integer id) {
        clienteDAO.deleteById(id);
    }
}