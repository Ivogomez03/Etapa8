package isi.deso.Servicio.Implementacion;

import isi.deso.Repository.ItemMenuDAO;
import isi.deso.Repository.PlatoDAO;
import isi.deso.Servicio.IItemMenuServicio;
import isi.deso.Repository.BebidaDAO;
import isi.deso.DTO.ItemMenuDTO;
import isi.deso.model.Bebida;
import isi.deso.model.ItemMenu;
import isi.deso.model.Plato;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemMenuServicio implements IItemMenuServicio {

    @Autowired
    private ItemMenuDAO itemMenuDAO;
    private PlatoDAO platoDAO;
    private BebidaDAO bebidaDAO;

    // Crear o actualizar un ItemMenu
    public void crearItemMenu(ItemMenu itemMenu) {
        itemMenuDAO.save(itemMenu);
    }

    public void agregarItem(ItemMenuDTO itemDTO) {
        if (itemDTO.getTipo().equals("Plato")) {
            Plato plato = new Plato(itemDTO.getNombre(), itemDTO.getDesc(), itemDTO.getCategoria(), itemDTO.getPrecio(),
                    itemDTO.getCalorias(), itemDTO.isAptoCeliaco(), itemDTO.isAptoVegetariano(),
                    itemDTO.isEsVegano(), itemDTO.getVendedor());

            platoDAO.save(plato);
            // persistir
        } else {
            Bebida bebida = new Bebida(itemDTO.getNombre(), itemDTO.getDesc(), itemDTO.getCategoria(),
                    itemDTO.getPrecio(), itemDTO.getTamanioBebida(), itemDTO.getGradAlcohol(), itemDTO.isEsVegano(),
                    itemDTO.getVendedor());
            bebidaDAO.save(bebida);
            // persistir
        }
    }

    // Obtener todos los items de menú
    public List<ItemMenu> obtenerTodosLosItems() {
        return itemMenuDAO.findAll();
    }

    // Eliminar un ItemMenu por ID
    public void eliminarItemMenu(Integer id) {
        itemMenuDAO.deleteById(id);
    }

    // Buscar un ItemMenu por ID
    public ItemMenu obtenerItemPorId(Integer id) {
        return itemMenuDAO.findById(id).orElse(null);
    }

    public List<Plato> obtenerPlatos(String dniVendedor) {
        return platoDAO.obtenerPlatosPorVendedor(dniVendedor);
    }

    public List<Plato> obtenerPlatosSinTACC(String dniVendedor) {
        return platoDAO.obtenerPlatosSinTACC(dniVendedor);
    }

    public Plato obtenerPlato(String nombre) {
        return platoDAO.obtenerPlato(nombre);
    }

    public List<Bebida> obtenerBebidasSinAlcohol(String dniVendedor) {
        return bebidaDAO.findBebidasSinAlcohol(dniVendedor);
    }

    public List<Bebida> obtenerBebidasConAlcohol(String dniVendedor) {
        return bebidaDAO.findBebidasConAlcohol(dniVendedor);
    }

    public Bebida obtenerBebida(String nombre) {
        return bebidaDAO.findByNombre(nombre);
    }
}
