package isi.deso.Servicio.Implementacion;

import isi.deso.DTO.VendedorDTO;
import isi.deso.Repository.VendedorDAO;
import isi.deso.Servicio.IVendedorServicio;
import isi.deso.model.Vendedor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendedorServicio implements IVendedorServicio {

    @Autowired
    private VendedorDAO vendedorDAO;

    public void crearVendedor(VendedorDTO vendedorDTO) {
        Vendedor vendedor = new Vendedor(vendedorDTO.getNombre(), vendedorDTO.getApellido(), vendedorDTO.getDireccion(),
                vendedorDTO.getDni(), vendedorDTO.getLatitud(), vendedorDTO.getLongitud(), vendedorDTO.getItems());
        try {
            vendedorDAO.save(vendedor);

        } catch (DataIntegrityViolationException e) {
            // Manejar la violación de integridad de datos
            throw new RuntimeException("Error al guardar el vendedor", e);
        }

    }

    public VendedorDTO convertirAvendedorDto(Vendedor vendedor) {
        VendedorDTO vendedorDTO = new VendedorDTO();
        vendedorDTO.setNombre(vendedor.getNombre());
        vendedorDTO.setApellido(vendedor.getApellido());
        vendedorDTO.setItems(vendedor.getItems());
        vendedorDTO.setDireccion(vendedor.getDireccion());
        vendedorDTO.setDni(vendedor.getDni());
        vendedorDTO.setLatitud(vendedor.getCoordenadas().getLat());
        vendedorDTO.setLongitud(vendedor.getCoordenadas().getLng());
        return vendedorDTO;

    }

    public Vendedor buscarVendedorEntidad(String dni) {
        Vendedor vendedor = vendedorDAO.buscarVendedorPorDni(dni);
        if (vendedor == null) {
            throw new IllegalArgumentException("No se encontró un vendedor con el DNI proporcionado.");
        }
        return vendedor;
    }

    public VendedorDTO buscarVendedor(String dni) {
        Vendedor vendedor = vendedorDAO.buscarVendedorPorDni(dni);
        if (vendedor == null)
            throw new IllegalArgumentException("No se ha encontrado el vendedor con el dni " + dni);

        return convertirAvendedorDto(vendedor);
    }

    public List<VendedorDTO> obtenerTodosLosVendedores() {
        List<Vendedor> vendedores = vendedorDAO.findAll();
        if (vendedores.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron vendedores.");
        }
        return vendedores.stream()
                .map(this::convertirAvendedorDto)
                .collect(Collectors.toList());
    }

    public void eliminarVendedor(Integer id) {
        vendedorDAO.deleteById(id);
    }
}
