import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrarItems.css';

const RegistrarItems = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const [form, setForm] = useState({
      nombre: '',
      precio: '',
      descripcion_item: '',
      categoria: '',
      tipo_item: 'Plato',
      calorias: '',
      tamanio_ml: '',
      graduacionAlcohol: '',
      isBebidaAlcoholica: false,
      aptoVegano: false,
      aptoVegetariano: false,
      aptoCeliaco: false,
    });

    const [placeholders, setPlaceholders] = useState({
      nombre: 'Nombre',
      precio: 'Precio',
      calorias: 'Calorias',
      tamanio_ml: 'tamanio (ml)',
      graduacionAlcohol: 'graduacion alcohol',
      descripcion_item: 'Descripcion de item',
      categoria: 'Categoria',
    });

    const handleChange = (e) => {
        const { name, checked, type } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : e.target.value,
        }));
    };

    return (
        <div className='conteiner-reg-item'>
            <div className='panel-izquierdo'>
                <button className="back-button" onClick={goBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                    </svg>
                </button>

                <h1>Por favor</h1>
                <h2>Ingrese los datos del item</h2>
                <form className='formulario-item-general'>
                    <h2>Registrar Item</h2>
                    <input 
                        type="text" 
                        name="nombre"
                        placeholder={placeholders.nombre}
                        value={form.nombre}
                        className={`inputRegItem`}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        name="precio"
                        placeholder={placeholders.precio}
                        value={form.precio}
                        className={`inputRegItem`}
                        onChange={handleChange}
                    />
                    <textarea 
                        name="descripcion_item" 
                        placeholder={placeholders.descripcion_item} 
                        value={form.descripcion_item} 
                        className={'inputRegItem'} 
                        onChange={handleChange}>      
                    </textarea>
                    <div className='radio-group-tipo-item'>
                        <h3>Tipo de item</h3>
                        <label>
                            <input 
                                type="radio" 
                                name="tipo_item"
                                value="Plato"
                                checked={form.tipo_item === 'Plato'}
                                onChange={handleChange}
                            />
                            Plato
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="tipo_item" 
                                value="Bebida" 
                                checked={form.tipo_item === 'Bebida'} 
                                onChange={handleChange}
                            />
                            Bebida
                        </label>
                    </div>
                </form>
            </div> 
            <div className="panel-derecho">
                {form.tipo_item === 'Plato' && (
                    <form className="formulario-derecho-palto">
                        <h3 className="titulo-caracteristicas">Caracteristicas del Plato</h3>

                        <input 
                            type="text" 
                            name="calorias" 
                            placeholder={placeholders.calorias}
                            value={form.calorias}
                            className={`inputRegItem`}
                            onChange={handleChange}
                        />
                        <label>
                            <input 
                                type="checkbox" 
                                name="aptoCeliaco"
                                checked={form.aptoCeliaco} 
                                onChange={handleChange}
                            />
                            Sin TACC
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                name="aptoVegetariano"
                                checked={form.aptoVegetariano} 
                                onChange={handleChange}
                            />
                            Apto Vegetariano
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                name="aptoVegano"
                                checked={form.aptoVegano} 
                                onChange={handleChange}
                            />
                            Apto Vegano
                        </label>
                    </form>
                )}

                {form.tipo_item === 'Bebida' && (
                    <form className="formulario-derecho-bebida">
                        <h3 className="titulo-caracteristicas">Caracteristicas de la bebida</h3>
                        <label>
                            <input 
                                type="checkbox" 
                                name="isBebidaAlcoholica"
                                checked={form.isBebidaAlcoholica}
                                onChange={handleChange}
                            />
                            Bebida Alcoholica
                        </label>
                        {form.isBebidaAlcoholica === true && (
                            <input 
                                type="text" 
                                name="graduacionAlcohol"
                                value={form.graduacionAlcohol} 
                                placeholder={placeholders.graduacionAlcohol} 
                                onChange={handleChange} 
                            />
                        )}
                        <label>
                            <input 
                                type="checkbox" 
                                name="aptoVegano"
                                checked={form.aptoVegano} 
                                onChange={handleChange}
                            />
                            Apto Vegano
                        </label>
                    </form>
                )}
            </div>
        </div>
    );
}

export default RegistrarItems;
