package isi.deso.Servicio.Implementacion;

import isi.deso.Repository.VendedorDAO;
import isi.deso.Servicio.IVendedorServicio;
import isi.deso.model.Vendedor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendedorServicio implements IVendedorServicio {

    @Autowired
    private VendedorDAO vendedorDAO;

    public void crearVendedor(Vendedor vendedor) {
        vendedorDAO.save(vendedor);
    }

    public Vendedor buscarVendedor(String dni) {
        return vendedorDAO.buscarVendedorPorDni(dni);
    }

    public List<Vendedor> obtenerTodosLosVendedores() {
        return vendedorDAO.findAll();
    }

    public void eliminarVendedor(Integer id) {
        vendedorDAO.deleteById(id);
    }
}
