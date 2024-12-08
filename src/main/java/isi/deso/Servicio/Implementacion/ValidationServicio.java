package isi.deso.Servicio.Implementacion;

import isi.deso.Repository.ClienteDAO;
import isi.deso.Repository.ItemMenuDAO;
import isi.deso.Repository.VendedorDAO;
import isi.deso.Servicio.IValidationServicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ValidationServicio implements IValidationServicio {

    @Autowired
    private VendedorDAO vendedorDAO;

    @Autowired
    private ClienteDAO clienteDAO;

    @Autowired
    private ItemMenuDAO itemMenuDAO;

    // Validar si el vendedor existe en la base de datos
    public boolean vendedorExists(String dni) {
        return vendedorDAO.existsByDni(dni);
    }

    // Validar si el vendedor es único (no existe otro con el mismo DNI)
    public boolean uniquenessValidationVendedor(String dni) {
        return !vendedorDAO.existsByDni(dni);
    }

    // Validar si el cliente ya existe por su CUIT
    public boolean validarCliente(String cuit) {
        return clienteDAO.existsByCuit(cuit);
    }

    // Validar si el ItemMenu es único (no existe otro con el mismo nombre)
    public boolean uniquenessValidationItemMenu(String nombre) {
        return !itemMenuDAO.existsByNombre(nombre);
    }

    // Validar que la cadena contenga solo números
    public boolean validarSoloNumeros(String string) {
        return string.matches("\\d+");
    }
}