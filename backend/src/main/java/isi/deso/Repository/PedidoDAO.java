package isi.deso.Repository;

import isi.deso.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoDAO extends JpaRepository<Pedido, Integer> {

    // Consultar los pedidos de un cliente por su CUIT
    @Query("SELECT p FROM Pedido p WHERE p.cliente.id = :idCliente AND cliente.habilitado = true")
    List<Pedido> findPedidosByCliente(int idCliente);

    // Consultar los pedidos de un vendedor por su DNI
    @Query("SELECT p FROM Pedido p WHERE p.vendedor.id = :idVendedor AND vendedor.habilitado = true")
    List<Pedido> findPedidosByVendedor(int idVendedor);
}