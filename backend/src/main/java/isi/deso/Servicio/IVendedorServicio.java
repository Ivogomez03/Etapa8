package isi.deso.Servicio;

import java.util.List;

import isi.deso.DTO.VendedorDTO;
import isi.deso.model.Vendedor;

public interface IVendedorServicio {
    public void crearVendedor(VendedorDTO vendedor);

    public VendedorDTO buscarVendedor(String dni);

    public void modificarVendedor(VendedorDTO vendedor);

    public List<VendedorDTO> obtenerTodosLosVendedores();

    public void eliminarVendedor(String dni);

    public Vendedor buscarVendedorEntidad(String dni);

    public VendedorDTO convertirAvendedorDto(Vendedor vendedor);
}
