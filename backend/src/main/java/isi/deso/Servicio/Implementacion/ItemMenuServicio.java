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
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemMenuServicio implements IItemMenuServicio {

    @Autowired
    private ItemMenuDAO itemMenuDAO;
    @Autowired
    private PlatoDAO platoDAO;
    @Autowired
    private BebidaDAO bebidaDAO;

    public void agregarItem(ItemMenuDTO itemDTO) {
        if (itemDTO.getTipo().equals("PLATO")) {
            Plato plato = new Plato(itemDTO.getNombre(), itemDTO.getDesc(), itemDTO.getCategoria(), itemDTO.getPrecio(),
                    itemDTO.getCalorias(), itemDTO.isAptoCeliaco(), itemDTO.isAptoVegetariano(),
                    itemDTO.isEsVegano(), itemDTO.getVendedor());
            try {
                platoDAO.save(plato);
            } catch (DataIntegrityViolationException e) {
                throw new RuntimeException("Error al guardar el plato", e);
            }

        } else {
            Bebida bebida = new Bebida(itemDTO.getNombre(), itemDTO.getDesc(), itemDTO.getCategoria(),
                    itemDTO.getPrecio(), itemDTO.getTamanioBebida(), itemDTO.getGradAlcohol(), itemDTO.isEsVegano(),
                    itemDTO.getVendedor());

            try {
                bebidaDAO.save(bebida);
            } catch (DataIntegrityViolationException e) {
                throw new RuntimeException("Error al guardar el plato", e);
            }

        }
    }

    // Obtener todos los items de menú
    public List<ItemMenuDTO> obtenerTodosLosItems() {
        List<ItemMenu> items = itemMenuDAO.findAll();

        if (items.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron items.");
        }
        return items.stream()
                .map(this::convertirAimDTO)
                .collect(Collectors.toList());

    }

    public List<ItemMenuDTO> obtenerTodosLosItemsPorVendedor(String dni) {
        List<ItemMenu> items = itemMenuDAO.buscarItemsPorVendedor(dni);

        if (items.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron items.");
        }
        return items.stream()
                .map(this::convertirAimDTO)
                .collect(Collectors.toList());

    }

    public void modificarItem(ItemMenuDTO itemDTO, int idItem) {

        ItemMenu item = this.obtenerItemPorId(idItem);
        if (item == null || !item.isHabilitado()) {
            throw new RuntimeException("No se ha encontrado el item con el nombre proporcionado");
        }
        item.setPrecio(itemDTO.getPrecio());
        item.setDescripcion(itemDTO.getDesc());
        try {
            itemMenuDAO.save(item);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error al modificar el item");
        }
    }

    public ItemMenuDTO convertirAimDTO(ItemMenu itemMenu) {
        ItemMenuDTO itemMenuDTO = new ItemMenuDTO();
        itemMenuDTO.setNombre(itemMenu.getNombre());
        itemMenuDTO.setCategoria(itemMenu.getCategoria());
        itemMenuDTO.setPrecio(itemMenu.getPrecio());
        itemMenuDTO.setDesc(itemMenu.getDescripcion());
        itemMenuDTO.setEsVegano(itemMenu.getAptoVegano());
        itemMenuDTO.setVendedor(itemMenu.getVendedor());
        itemMenuDTO.setIdItem(itemMenu.getId());
        if (itemMenu instanceof Bebida) {
            Bebida bebida = (Bebida) itemMenu;
            itemMenuDTO.setGradAlcohol(bebida.getGraduacionAlcohol());
            itemMenuDTO.setTamanioBebida(bebida.getTamanio());

            itemMenuDTO.setEsVegano(bebida.getAptoVegano());

        }
        if (itemMenu instanceof Plato) {
            Plato plato = (Plato) itemMenu;
            itemMenuDTO.setTipo("Plato");
            itemMenuDTO.setAptoCeliaco(plato.isAptoCeliaco());
            itemMenuDTO.setAptoVegetariano(plato.isAptoVegetariano());
            itemMenuDTO.setCalorias(plato.getCalorias());
        }
        return itemMenuDTO;

    }

    // Buscar un ItemMenu por ID
    public ItemMenu obtenerItemPorId(Integer id) {
        return itemMenuDAO.findById(id).orElse(null);
    }

    public List<ItemMenuDTO> obtenerPlatos(String dniVendedor) {
        List<Plato> platos = platoDAO.obtenerPlatosPorVendedor(dniVendedor);
        if (platos.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron platos del vendedor con dni " + dniVendedor);
        }
        return platos.stream()
                .map(this::convertirAimDTO)
                .collect(Collectors.toList());
    }

    public List<ItemMenuDTO> obtenerBebidas(String dniVendedor) {
        List<Bebida> bebidas = bebidaDAO.findBebidas(dniVendedor);
        if (bebidas.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron bebidas del vendedor con dni " + dniVendedor);
        }
        return bebidas.stream()
                .map(this::convertirAimDTO)
                .collect(Collectors.toList());
    }

    public List<ItemMenuDTO> obtenerPlatosSinTACC(String dniVendedor) {
        List<Plato> platos = platoDAO.obtenerPlatosSinTACC(dniVendedor);
        if (platos.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron platos del vendedor con dni " + dniVendedor);
        }
        return platos.stream()
                .map(this::convertirAimDTO)
                .collect(Collectors.toList());
    }

    public ItemMenuDTO obtenerPlato(String nombre) {
        Plato plato = platoDAO.obtenerPlato(nombre);
        if (plato == null)
            throw new RuntimeException("Error al encontrar el plato con nombre " + nombre);
        return convertirAimDTO(plato);
    }

    public List<ItemMenuDTO> obtenerBebidasSinAlcohol(String dniVendedor) {
        List<Bebida> bebidas = bebidaDAO.findBebidasSinAlcohol(dniVendedor);
        if (bebidas.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron bebidas del vendedor con dni " + dniVendedor);
        }
        return bebidas.stream()
                .map(this::convertirAimDTO)
                .collect(Collectors.toList());
    }

    public List<ItemMenuDTO> obtenerBebidasConAlcohol(String dniVendedor) {
        List<Bebida> bebidas = bebidaDAO.findBebidasConAlcohol(dniVendedor);
        if (bebidas.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron bebidas del vendedor con dni " + dniVendedor);
        }
        return bebidas.stream()
                .map(this::convertirAimDTO)
                .collect(Collectors.toList());
    }

    public ItemMenuDTO obtenerBebida(String nombre) {
        Bebida bebida = bebidaDAO.findByNombre(nombre);
        if (bebida == null)
            throw new RuntimeException("Error al encontrar la bebida con nombre " + nombre);
        return convertirAimDTO(bebida);

    }

    public void eliminarItem(int id) {
        ItemMenu item = itemMenuDAO.findByIdAndHabilitadoTrue(id);
        if (item == null) {
            throw new RuntimeException("No se ha encontrado el item ");
        }
        item.setHabilitado(false);
        itemMenuDAO.save(item);
    }
}
