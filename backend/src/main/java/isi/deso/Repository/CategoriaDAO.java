package isi.deso.Repository;

import isi.deso.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaDAO extends JpaRepository<Categoria, Integer> {

    // Buscar categoría por descripción
    Categoria findByDescripcion(String descripcion);

    // Consultar las categorías de tipo "PLATO"
    @Query("SELECT c.descripcion FROM Categoria c WHERE c.tipo = 'PLATO'")
    List<String> findPlatos();

    // Consultar las categorías de tipo "BEBIDA"
    @Query("SELECT c.descripcion FROM Categoria c WHERE c.tipo = 'BEBIDA'")
    List<String> findBebidas();
}