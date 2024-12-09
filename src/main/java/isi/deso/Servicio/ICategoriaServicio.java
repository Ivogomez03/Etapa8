package isi.deso.Servicio;

import isi.deso.model.Categoria;
import java.util.List;
import isi.deso.DTO.CategoriaDTO;

public interface ICategoriaServicio {

    // Crear o actualizar una categoría
    public void crearCategoria(CategoriaDTO categoriaDTO);

    // Buscar categoría por descripción
    public Categoria buscarCategoria(String descripcion);

    // Obtener categorías por tipo de ítem (Plato o Bebida)
    public List<String> obtenerCategorias(String tipoItem);
}
