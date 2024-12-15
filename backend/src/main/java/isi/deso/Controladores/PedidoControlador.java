package isi.deso.Controladores;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import isi.deso.DTO.ItemMenuDTO;
import isi.deso.DTO.PedidoDTO;
import isi.deso.Servicio.Implementacion.ItemMenuServicio;
import isi.deso.Servicio.Implementacion.PedidoServicio;

@RestController
public class PedidoControlador {
    @Autowired
    PedidoServicio pedidoServicio;
    @Autowired
    ItemMenuServicio imServicio;

    @GetMapping("/pedido/obtenerPedidosPorCliente")
    public ResponseEntity<List<PedidoDTO>> obtenerPedidosPorCliente(
            @RequestParam(required = true) String cuitCliente) {
        try {
            List<PedidoDTO> pedidos = pedidoServicio.obtenerPedidosPorCliente(cuitCliente);
            return ResponseEntity.ok(pedidos);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
    }

    @GetMapping("/pedido/obtenerPedidosPorVendedor")
    public ResponseEntity<List<PedidoDTO>> obtenerPedidosPorVendedor(
            @RequestParam(required = true) String dniVendedor) {
        try {
            List<PedidoDTO> pedidos = pedidoServicio.obtenerPedidosPorVendedor(dniVendedor);
            return ResponseEntity.ok(pedidos);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
    }

    @GetMapping("/pedido/obtenerPlatos")
    public ResponseEntity<List<ItemMenuDTO>> obtenerPlatos(@RequestParam(required = true) String dniVendedor) {
        try {
            List<ItemMenuDTO> platos = imServicio.obtenerPlatos(dniVendedor);
            return ResponseEntity.ok(platos);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
    }

    @GetMapping("/pedido/obtenerPlatosSinTACC")
    public ResponseEntity<List<ItemMenuDTO>> obtenerPlatosSinTACC(@RequestParam(required = true) String dniVendedor) {
        try {
            List<ItemMenuDTO> platosSinTACC = imServicio.obtenerPlatosSinTACC(dniVendedor);
            return ResponseEntity.ok(platosSinTACC);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
    }

    @GetMapping("/pedido/obtenerPlato")
    public ResponseEntity<ItemMenuDTO> obtenerPlato(String nombre) {
        try {
            ItemMenuDTO plato = imServicio.obtenerPlato(nombre);
            return ResponseEntity.ok(plato);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }

    }

    @GetMapping("/pedido/obtenerBebida")
    public ResponseEntity<ItemMenuDTO> obtenerBebida(@RequestParam(required = true) String nombre) {
        try {
            ItemMenuDTO bebida = imServicio.obtenerBebida(nombre);
            return ResponseEntity.ok(bebida);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/pedido/obtenerBebidasConAlcohol")
    public ResponseEntity<List<ItemMenuDTO>> obtenerBebidasConAlcohol(
            @RequestParam(required = true) String dniVendedor) {
        try {
            List<ItemMenuDTO> bebidasConAlcohol = imServicio.obtenerBebidasConAlcohol(dniVendedor);
            return ResponseEntity.ok(bebidasConAlcohol);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
    }

    @GetMapping("/pedido/obtenerBebidas")
    public ResponseEntity<List<ItemMenuDTO>> obtenerBebidas(
            @RequestParam(required = true) String dniVendedor) {
        try {
            List<ItemMenuDTO> bebidas = imServicio.obtenerBebidas(dniVendedor);
            return ResponseEntity.ok(bebidas);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
    }

    @GetMapping("/pedido/obtenerBebidasSinAlcohol")
    public ResponseEntity<List<ItemMenuDTO>> obtenerBebidasSinAlcohol(
            @RequestParam(required = true) String dniVendedor) {
        try {
            List<ItemMenuDTO> bebidasSinAlcohol = imServicio.obtenerBebidasSinAlcohol(dniVendedor);
            return ResponseEntity.ok(bebidasSinAlcohol);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

    }

    @PostMapping("/pedido/crear")
    public ResponseEntity<String> crearPedido(@RequestBody PedidoDTO pedidoDTO) {
        try {
            pedidoServicio.crearPedido(pedidoDTO);
            return ResponseEntity.ok("El pedido ha sido creado correctamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
