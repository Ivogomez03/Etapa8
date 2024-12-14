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

    @Query("SELECT im FROM ItemMenu im WHERE im.vendedor.dni = :dni AND im.vendedor.habilitado = true AND im.habilitado = true")
    List<ItemMenu> buscarItemsPorVendedor(@Param("dni") String dni);

    ItemMenu findByIdAndHabilitadoTrue(int id);

    ItemMenu findByNombreAndHabilitadoTrue(String nombre);

    boolean existsByNombre(String nombre);
    // Consultar item por su id (lo hace JpaRepository automáticamente con
    // findById())
    // Optional<ItemMenu> findById(Integer id);
}
