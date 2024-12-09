package isi.deso.Servicio;

public interface IValidationServicio {

    public boolean vendedorExists(String dni);

    // Validar si el vendedor es único (no existe otro con el mismo DNI)
    public boolean uniquenessValidationVendedor(String dni);

    // Validar si el cliente ya existe por su CUIT
    public boolean validarCliente(String cuit);

    // Validar si el ItemMenu es único (no existe otro con el mismo nombre)
    public boolean uniquenessValidationItemMenu(String nombre);

    // Validar que la cadena contenga solo números
    public boolean validarSoloNumeros(String string);
}
