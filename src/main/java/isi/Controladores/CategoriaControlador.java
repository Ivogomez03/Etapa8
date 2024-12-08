package isi.Controladores;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;

import isi.deso.DTO.CategoriaDTO;
import isi.deso.Servicio.Implementacion.CategoriaServicio;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoriaControlador {

    @Autowired
    private CategoriaServicio categoriaServicio;

    @PostMapping("/categoria/crear")
    public ResponseEntity<String> crearCategoria(@RequestBody CategoriaDTO categoriaDTO) {
        try {
            categoriaServicio.crearCategoria(categoriaDTO);
            return ResponseEntity.ok("La categoria ha sido creada correctamente.");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/categoria/obtenerLista")
    public ResponseEntity<List<String>> obtenerListaCategoria(String tipoItem) {

        try {
            List<String> lista = categoriaServicio.obtenerCategorias(tipoItem);
            return ResponseEntity.ok(lista);
        } catch (RuntimeException e) {
            List<String> errorMessage = new ArrayList<>();
            errorMessage.add("Error: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }
}
