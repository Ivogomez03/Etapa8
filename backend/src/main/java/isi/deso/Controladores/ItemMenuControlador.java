package isi.deso.Controladores;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
            @RequestParam(required = true) String descripcionCategoria,
            @RequestParam(required = true) double precio,
            @RequestParam(required = true) String desc,
            @RequestParam(required = true) String tipo,
            @RequestParam(required = true) boolean esVegano,
            @RequestParam(required = true) double gradAlcohol,
            @RequestParam(required = true) int tamanioBebida,
            @RequestParam(required = true) boolean aptoVegetariano,
            @RequestParam(required = true) boolean aptoCeliaco,
            @RequestParam(required = true) int Calorias,
            @RequestParam(required = true) String dniVendedor) {

        Categoria categoria = categoriaServicio.buscarCategoria(descripcionCategoria);
        ItemMenuDTO itemMenuDTO = new ItemMenuDTO();
        itemMenuDTO.setNombre(nombre);
        itemMenuDTO.setCategoria(categoria);
        itemMenuDTO.setPrecio(precio);
        itemMenuDTO.setDesc(desc);
        itemMenuDTO.setTipo(tipo);
        itemMenuDTO.setGradAlcohol(gradAlcohol);
        itemMenuDTO.setTamanioBebida(tamanioBebida);
        itemMenuDTO.setCalorias(Calorias);
        itemMenuDTO.setEsVegano(esVegano);
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

    @GetMapping("/itemMenu/obtenerItemsMenu")
    public ResponseEntity<List<ItemMenuDTO>> obtenerItemsMenu() {

        try {
            List<ItemMenuDTO> items = imServicio.obtenerTodosLosItems();
            return ResponseEntity.ok(items);
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(Collections.emptyList());

        }

    }
}
