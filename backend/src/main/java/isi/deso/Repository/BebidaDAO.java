package isi.deso.Repository;

import isi.deso.model.Bebida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BebidaDAO extends JpaRepository<Bebida, Integer> {

        // Consultar las bebidas sin alcohol de un vendedor específico
        @Query("SELECT b FROM ItemMenu im JOIN Bebida b ON im.id = b.id " +
                        "JOIN Vendedor v ON im.vendedor.id = v.id " +
                        "WHERE v.dni = :dniVendedor AND b.graduacionAlcohol = 0")
        List<Bebida> findBebidasSinAlcohol(String dniVendedor);

        // Consultar una bebida por su nombre
        @Query("SELECT b FROM ItemMenu im JOIN Bebida b ON im.id = b.id " +
                        "WHERE im.nombre = :nombre")
        Bebida findByNombre(String nombre);

        // Consultar las bebidas con alcohol de un vendedor específico
        @Query("SELECT b FROM ItemMenu im JOIN Bebida b ON im.id = b.id " +
                        "JOIN Vendedor v ON im.vendedor.id = v.id " +
                        "WHERE v.dni = :dniVendedor AND b.graduacionAlcohol > 0")
        List<Bebida> findBebidasConAlcohol(String dniVendedor);
}
