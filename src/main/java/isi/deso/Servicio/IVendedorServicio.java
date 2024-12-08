package isi.deso.Servicio;

import java.util.List;

import isi.deso.model.Vendedor;

public interface IVendedorServicio {
    public void crearVendedor(Vendedor vendedor);

    public Vendedor buscarVendedor(String dni);

    public List<Vendedor> obtenerTodosLosVendedores();

    public void eliminarVendedor(Integer id);
}
