package isi.deso.Servicio.Implementacion;

import isi.deso.Servicio.ICategoriaServicio;
import isi.deso.Repository.CategoriaDAO;
import isi.deso.DTO.CategoriaDTO;
import isi.deso.model.Categoria;
import isi.deso.model.TipoDeItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServicio implements ICategoriaServicio {

    @Autowired
    private CategoriaDAO categoriaDAO;

    // Crear o actualizar una categoría
    public void crearCategoria(CategoriaDTO categoriaDTO) {
        Categoria categoria = new Categoria();
        categoria.setDescripcion(categoriaDTO.getDescripcion());
        if (categoriaDTO.getTipoItem().equals("PLATO")) {
            categoria.setTipo(TipoDeItem.PLATO);
        } else {
            categoria.setTipo(TipoDeItem.BEBIDA);
        }

        try {
            categoriaDAO.save(categoria);
        } catch (DataIntegrityViolationException e) {
            // Manejar la violación de integridad de datos
            throw new RuntimeException("Error al guardar la cateogira", e);
        }

    }

    // Buscar categoría por descripción
    public Categoria buscarCategoria(String descripcion) {
        return categoriaDAO.findByDescripcion(descripcion);
    }

    // Obtener categorías por tipo de ítem (Plato o Bebida)
    public List<String> obtenerCategorias(String tipoItem) throws RuntimeException {
        try {
            if (tipoItem.equals("PLATO")) {
                return categoriaDAO.findPlatos();
            } else {
                return categoriaDAO.findBebidas();
            }
        } catch (RuntimeException e) {
            throw new RuntimeException("Error al obtener las categorias", e);
        }
    }
}
