package isi.deso.Repository;

import isi.deso.model.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClienteDAO extends JpaRepository<Cliente, Integer> {

    // Buscar un cliente por CUIT
    @Query("SELECT c FROM Cliente c WHERE c.cuit = :cuit AND c.habilitado = true")
    Cliente buscarClientePorCuit(@Param("cuit") String cuit);

    boolean existsByCuit(String cuit);

    // Obtener todos los clientes (lo hace JpaRepository automáticamente con
    @Query("SELECT c FROM Cliente c WHERE c.habilitado = true")
    List<Cliente> findAll();

}