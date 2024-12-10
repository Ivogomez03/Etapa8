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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import isi.deso.DTO.VendedorDTO;
import isi.deso.Servicio.Implementacion.VendedorServicio;

@RestController
public class VendedorControlador {

    @Autowired
    VendedorServicio vendedorServicio;

    @PostMapping("/vendedor/crear")
    public ResponseEntity<String> crearVendedor(@RequestBody VendedorDTO vendedorDTO) {

        try {
            vendedorServicio.crearVendedor(vendedorDTO);
            return ResponseEntity.ok("El vendedor ha sido creado correctamente.");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/vendedor/modificar")
    public ResponseEntity<String> modificarVendedor(@RequestBody VendedorDTO vendedorDTO) {

        try {
            vendedorServicio.modificarVendedor(vendedorDTO);
            return ResponseEntity.ok("El vendedor ha sido modificado correctamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/vendedor/eliminar")
    public ResponseEntity<String> eliminarVendedor(@RequestParam(required = true) String dni) {

        try {
            vendedorServicio.eliminarVendedor(dni);
            return ResponseEntity.ok("El vendedor ha sido deshabilitado correctamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/vendedor/buscarVendedor")
    public ResponseEntity<VendedorDTO> buscarVendedor(@RequestParam(required = true) String dni) {
        try {
            VendedorDTO vendedorDTO = vendedorServicio.buscarVendedor(dni);
            return ResponseEntity.ok(vendedorDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/vendedor/mostrarVendedores")
    public ResponseEntity<List<VendedorDTO>> mostrarTodosVendedores() {
        try {
            List<VendedorDTO> vendedoresDTO = vendedorServicio.obtenerTodosLosVendedores();
            return ResponseEntity.ok(vendedoresDTO);
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(Collections.emptyList());

        }
    }
}
