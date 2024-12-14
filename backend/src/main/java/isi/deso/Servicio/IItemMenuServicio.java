package isi.deso.Servicio;

import isi.deso.DTO.ItemMenuDTO;
import isi.deso.model.ItemMenu;

import java.util.List;

public interface IItemMenuServicio {

    // Crear o actualizar un ItemMenu
    public void agregarItem(ItemMenuDTO itemMenu);

    public void modificarItem(ItemMenuDTO itemDTO, int id);

    public ItemMenuDTO convertirAimDTO(ItemMenu itemMenu);

    // Obtener todos los items de menú
    public List<ItemMenuDTO> obtenerTodosLosItems();

    // Eliminar un ItemMenu por ID
    public void eliminarItem(int id);

    // Buscar un ItemMenu por ID
    public ItemMenu obtenerItemPorId(Integer id);

    public List<ItemMenuDTO> obtenerPlatos(String dniVendedor);

    public List<ItemMenuDTO> obtenerPlatosSinTACC(String dniVendedor);

    public ItemMenuDTO obtenerPlato(String nombre);

    public List<ItemMenuDTO> obtenerBebidasSinAlcohol(String dniVendedor);

    public List<ItemMenuDTO> obtenerBebidasConAlcohol(String dniVendedor);

    public ItemMenuDTO obtenerBebida(String nombre);
}
