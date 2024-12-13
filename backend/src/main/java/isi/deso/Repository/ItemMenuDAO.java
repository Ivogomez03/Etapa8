package isi.deso.Repository;

import isi.deso.model.ItemMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface ItemMenuDAO extends JpaRepository<ItemMenu, Integer> {

    // Buscar todos los items de menú
    List<ItemMenu> findAll();

    @Query("SELECT im FROM ItemMenu im JOIN Vendedor v ON im.id_vendedor = v.id_vendedor WHERE v.dni = :dni AND v.habilitado = true")
    List<ItemMenu> buscarItemsPorVendedor(@Param("dni") String dni);

    boolean existsByNombre(String nombre);
    // Consultar item por su id (lo hace JpaRepository automáticamente con
    // findById())
    // Optional<ItemMenu> findById(Integer id);
}
