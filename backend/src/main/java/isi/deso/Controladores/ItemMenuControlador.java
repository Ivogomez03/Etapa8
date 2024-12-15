package isi.deso.Controladores;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import isi.deso.DTO.ItemMenuDTO;
import isi.deso.Servicio.Implementacion.CategoriaServicio;
import isi.deso.Servicio.Implementacion.ItemMenuServicio;
import isi.deso.Servicio.Implementacion.VendedorServicio;
import isi.deso.model.Categoria;

@RestController
public class ItemMenuControlador {
    @Autowired
    ItemMenuServicio imServicio;
    @Autowired
    CategoriaServicio categoriaServicio;
    @Autowired
    VendedorServicio vendedorServicio;

    @PostMapping("/itemMenu/crear")
    public ResponseEntity<String> CrearItem(@RequestParam(required = true) String nombre,
            @RequestParam(required = true) String categoria,
            @RequestParam(required = true) double precio,
            @RequestParam(required = true) String descripcion_item,
            @RequestParam(required = true) String tipo_item,
            @RequestParam(required = true) boolean aptoVegano,
            @RequestParam(required = true) double graduacionAlcohol,
            @RequestParam(required = true) int tamanio_ml,
            @RequestParam(required = true) boolean aptoVegetariano,
            @RequestParam(required = true) boolean aptoCeliaco,
            @RequestParam(required = true) int calorias,
            @RequestParam(required = true) String dniVendedor) {

        Categoria cat = categoriaServicio.buscarCategoria(categoria);
        ItemMenuDTO itemMenuDTO = new ItemMenuDTO();
        itemMenuDTO.setNombre(nombre);
        itemMenuDTO.setCategoria(cat);
        itemMenuDTO.setPrecio(precio);
        itemMenuDTO.setDesc(descripcion_item);
        itemMenuDTO.setTipo(tipo_item);
        itemMenuDTO.setGradAlcohol(graduacionAlcohol);
        itemMenuDTO.setTamanioBebida(tamanio_ml);
        itemMenuDTO.setCalorias(calorias);
        itemMenuDTO.setEsVegano(aptoVegano);
        itemMenuDTO.setAptoCeliaco(aptoCeliaco);
        itemMenuDTO.setAptoVegetariano(aptoVegetariano);
        itemMenuDTO.setVendedor(vendedorServicio.buscarVendedorEntidad(dniVendedor));

        try {
            imServicio.agregarItem(itemMenuDTO);
            return ResponseEntity.ok("El item ha sido creado correctamente.");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/itemMenu/modificarItem")
    public ResponseEntity<String> modificarItem(@RequestParam(required = true) String nombre,
            @RequestParam(required = true) String categoria,
            @RequestParam(required = true) double precio,
            @RequestParam(required = true) String descripcion_item,
            @RequestParam(required = true) String tipo_item,
            @RequestParam(required = true) boolean aptoVegano,
            @RequestParam(required = true) double graduacionAlcohol,
            @RequestParam(required = true) int tamanio_ml,
            @RequestParam(required = true) boolean aptoVegetariano,
            @RequestParam(required = true) boolean aptoCeliaco,
            @RequestParam(required = true) int calorias,
            @RequestParam(required = true) String dniVendedor,
            @RequestParam(required = true) int idItem) {
        Categoria cat = categoriaServicio.buscarCategoria(categoria);
        ItemMenuDTO itemMenuDTO = new ItemMenuDTO();
        itemMenuDTO.setNombre(nombre);
        itemMenuDTO.setCategoria(cat);
        itemMenuDTO.setPrecio(precio);
        itemMenuDTO.setDesc(descripcion_item);
        itemMenuDTO.setTipo(tipo_item);
        itemMenuDTO.setGradAlcohol(graduacionAlcohol);
        itemMenuDTO.setTamanioBebida(tamanio_ml);
        itemMenuDTO.setCalorias(calorias);
        itemMenuDTO.setEsVegano(aptoVegano);
        itemMenuDTO.setAptoCeliaco(aptoCeliaco);
        itemMenuDTO.setAptoVegetariano(aptoVegetariano);
        itemMenuDTO.setVendedor(vendedorServicio.buscarVendedorEntidad(dniVendedor));
        try {
            imServicio.modificarItem(itemMenuDTO, idItem);
            return ResponseEntity.ok("El item ha sido modificado correctamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/itemMenu/obtenerItemsMenu")
    public ResponseEntity<List<ItemMenuDTO>> obtenerItemsMenu() {

        try {
            List<ItemMenuDTO> items = imServicio.obtenerTodosLosItems();
            return ResponseEntity.ok(items);
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(Collections.emptyList());

        }

    }

    @DeleteMapping("/itemMenu/eliminar")
    public ResponseEntity<String> eliminarItem(@RequestParam(required = true) int idItem) {

        try {
            imServicio.eliminarItem(idItem);
            return ResponseEntity.ok("El item ha sido deshabilitado correctamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/itemMenu/obtenerItemsMenuPorVendedor")
    public ResponseEntity<List<ItemMenuDTO>> obtenerItemsMenuPorVendedor(
            @RequestParam(required = true) String dniVendedor) {
        System.out.println(dniVendedor);
        try {
            List<ItemMenuDTO> items = imServicio.obtenerTodosLosItemsPorVendedor(dniVendedor);
            return ResponseEntity.ok(items);
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(Collections.emptyList());

        }

    }
}
