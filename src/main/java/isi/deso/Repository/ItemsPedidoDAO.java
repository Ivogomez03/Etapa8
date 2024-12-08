package isi.deso.Repository;

import isi.deso.model.ItemsPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemsPedidoDAO extends JpaRepository<ItemsPedido, Integer> {
    // Aquí puedes agregar métodos de búsqueda específicos, si es necesario
    @Query("SELECT ip FROM Vendedor v JOIN Pedido p ON p.id_vendedor = v.id_vendedor JOIN ItemsPedido ip ON ip.id_pedido = p.id_pedido WHERE v.id_vendedor = :idVendedor")
    public List<ItemsPedido> buscarPorVendedor(int idVendedor);

    @Query("SELECT ip FROM Cliente c JOIN Pedido p ON p.id_cliente = c.id_cliente JOIN ItemsPedido ip ON ip.id_pedido = p.id_pedido WHERE c.id_cliente = :idCliente")
    public List<ItemsPedido> buscarPorCliente(int idCliente);

}