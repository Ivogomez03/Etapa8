package isi.deso.Controladores;

import java.util.Collections;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import isi.deso.DTO.ClienteDTO;
import isi.deso.Servicio.Implementacion.ClienteServicio;

@RestController
public class ClienteControlador {
    @Autowired
    private ClienteServicio clienteServicio;

    @PostMapping("/cliente/crear")
    public ResponseEntity<String> crearCliente(@RequestBody ClienteDTO clienteDTO) {

        try {
            clienteServicio.crearCliente(clienteDTO);
            return ResponseEntity.ok("El cliente ha sido creado correctamente.");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/cliente/buscarCliente")
    public ResponseEntity<ClienteDTO> buscarCliente(@RequestParam(required = true) String cuit) {
        try {
            ClienteDTO dto = clienteServicio.buscarCliente(cuit);
            return ResponseEntity.ok(dto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/cliente/mostrarClientes")
    public ResponseEntity<List<ClienteDTO>> mostrarTodosClientes() {
        try {
            List<ClienteDTO> clientesDTO = clienteServicio.obtenerTodosLosClientes();
            return ResponseEntity.ok(clientesDTO);
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(Collections.emptyList());

        }
    }
}
