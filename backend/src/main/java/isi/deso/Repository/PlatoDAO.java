package isi.deso.Repository;

import isi.deso.model.Plato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlatoDAO extends JpaRepository<Plato, Integer> {

    // Consultar platos de un vendedor por DNI
    @Query("SELECT p FROM Plato p JOIN p.vendedor v WHERE v.dni = :dni")
    List<Plato> obtenerPlatosPorVendedor(@Param("dni") String dni);

    // Consultar platos aptos para celíacos de un vendedor por DNI
    @Query("SELECT p FROM Plato p JOIN p.vendedor v WHERE v.dni = :dni AND p.aptoCeliaco = true")
    List<Plato> obtenerPlatosSinTACC(@Param("dni") String dni);

    // Consultar un plato por su nombre
    @Query("SELECT p FROM Plato p WHERE p.nombre = :nombre")
    Plato obtenerPlato(@Param("nombre") String nombre);
}