package isi.deso.Repository;

import isi.deso.model.Vendedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendedorDAO extends JpaRepository<Vendedor, Integer> {

    // Crear y guardar un Vendedor ya está incluido con JpaRepository (save)

    // Buscar un vendedor por DNI
    @Query("SELECT v FROM Vendedor v WHERE v.dni = :dni")
    Vendedor buscarVendedorPorDni(@Param("dni") String dni);

    // Obtener todos los vendedores (ya proporcionado por JpaRepository)
    @Query("SELECT v FROM Vendedor v WHERE v.habilitado = true")
    List<Vendedor> findAll();

    // Eliminar un vendedor por ID (ya incluido con JpaRepository)
    // void deleteById(Integer id);
    boolean existsByDni(String dni);
    // Actualizar un vendedor también se hace con save
}