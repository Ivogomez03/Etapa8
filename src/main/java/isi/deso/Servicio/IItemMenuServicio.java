package isi.deso.Servicio;

import isi.deso.model.Bebida;
import isi.deso.model.ItemMenu;
import isi.deso.model.Plato;

import java.util.List;

public interface IItemMenuServicio {

    // Crear o actualizar un ItemMenu
    public void crearItemMenu(ItemMenu itemMenu);

    // Obtener todos los items de menú
    public List<ItemMenu> obtenerTodosLosItems();

    // Eliminar un ItemMenu por ID
    public void eliminarItemMenu(Integer id);

    // Buscar un ItemMenu por ID
    public ItemMenu obtenerItemPorId(Integer id);

    public List<Plato> obtenerPlatos(String dniVendedor);

    public List<Plato> obtenerPlatosSinTACC(String dniVendedor);

    public Plato obtenerPlato(String nombre);

    public List<Bebida> obtenerBebidasSinAlcohol(String dniVendedor);

    public List<Bebida> obtenerBebidasConAlcohol(String dniVendedor);

    public Bebida obtenerBebida(String nombre);
}
