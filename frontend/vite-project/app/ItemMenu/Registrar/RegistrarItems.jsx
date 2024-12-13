import { useState, useEffect, useRef } from 'react'
import { HashRouter, useNavigate, useLocation } from 'react-router-dom';
import './RegistrarItems.css';
import Select from 'react-select';
import Cancelar from '../../Cancelar/Cancelar';

const ListaCaracteristicasPlatos = ({ form, handleChange }) => {

    const [caracteristicas, setCaracteristicas] = useState([]);
    const queryParams = new URLSearchParams({
        tipoItem: form.tipo_item

    }).toString();

    useEffect(() => {
        const obtenerDatos = async () => {
            const queryParams = new URLSearchParams({
                tipoItem: form.tipo_item

            }).toString();
            try {
                const response = await fetch(`/categoria/obtenerLista?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if (!response.ok) {
                    throw new Error(`Error de la API: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                console.log("Categorias platos obtenidas", data);

                setCaracteristicas(data);
            } catch (error) {
                console.error('Error en la solicitud:', error);
                alert("Ocurrió un error en el servidor. Inténtalo de nuevo.");
            }
        };

        obtenerDatos()
    }, [form.tipo_item]);

    /*
    const caracteristicas = [
        {id:1, descripcion: "Pizzas", tipo: "PLATO"},
        {id:2, descripcion: "Hamburguesas", tipo: "PLATO"}
    ]   
    */

    return (
        <div className="Formulario-Lista-Categoria-Platos">
            <h1>Categoria {form.tipo_item}</h1>
            <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className={`select-RRP`}
            >
                <option value="" disabled>Selecciona un Item</option>
                {caracteristicas.map((car, index) => (
                    <option key={index} value={car}>{car}</option>
                ))}
            </select>
        </div>
    )
}

const CrearCategoriaNueva = ({form, handleChange, placeholders}) =>{
    
    const handleCategoriaChange = (e) => {
        handleChange(e); // Actualiza el formulario con el valor de la nueva categoría
    };

    const [formCategoriaNueva, setForm] = useState({
        descripcion:form.categoria,
        tipoItem:form.tipo_item
    });

    const handleSubmitCategoria = async () => {
        try{
            const response = await fetch(`/categoria/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formCategoriaNueva),
            });
            if (response.ok) {
                alert('Categoría creada exitosamente');
            } else {
                alert('Error al crear la categoría');
            }
        }
        catch (error) {
            console.error('Error al enviar la categoría:', error);
            alert('Error al enviar la categoría');
        }
    }


    return(
    <div>
        <h1>Nueva categoira</h1>  
        <input 
        type="text" 
        className='descripcionCategoriaNueva'
        placeholder={placeholders.categoria}
        value={form.categoria}
        onChange={handleCategoriaChange}
        />
        <button onClick={handleSubmitCategoria}>Crear Categoria</button>
    </div>
    )}

const FormularioPlato = ({ form, handleChange, placeholders }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <form className="formulario-derecho-palto">
            <h3 className="titulo-caracteristicas">Características del Plato</h3>
            <input
                type="text"
                name="calorias"
                placeholder={placeholders.calorias}
                value={form.calorias}
                className="inputRegItem"
                onChange={handleChange}
            />
            {['aptoCeliaco', 'aptoVegetariano', 'aptoVegano'].map((name) => (
                <label key={name}>
                    <input
                        type="checkbox"
                        name={name}
                        checked={form[name]}
                        onChange={handleChange}
                    />
                    {name.replace('apto', '').replace(/([A-Z])/g, ' $1')}
                </label>
            ))}
            
            {!isChecked && <ListaCaracteristicasPlatos form={form} handleChange={handleChange} />}
            <div>
                <label>
                    <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={handleCheckboxChange}
                    />
                    Nueva categoria
                </label>
            </div>
            {isChecked && <CrearCategoriaNueva form={form} handleChange={handleChange} placeholders={placeholders}/>}
        </form>
    );
};

const FormularioBebida = ({ form, handleChange, placeholders }) => (
    <form className="formulario-derecho-bebida">
        <h3 className="titulo-caracteristicas">Características de la Bebida</h3>
        <label>
            <input
                type="checkbox"
                name="isBebidaAlcoholica"
                checked={form.isBebidaAlcoholica}
                onChange={handleChange}
            />
            Bebida Alcohólica
        </label>
        {form.isBebidaAlcoholica && (
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
        {ListaCaracteristicasPlatos({ form, handleChange })}
    </form>
);
const RegistrarItems = ({ resetForm }) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/bienvenidoVendedor/BuscarVendedor");
    }
    const location = useLocation();
    const dniVendedor = location.state?.dniVendedor;
    console.log(dniVendedor)
    const [showModal, setShowModal] = useState(false);  // Estado para controlar el modal
    const mostrar = () => {
        setShowModal(true);
    }

    const handleCancel = () => {
        setShowModal(false);  // Cierra el modal sin hacer nada
    };

    // Función cuando se confirma la cancelación
    const handleConfirmCancel = () => {
        setShowModal(false);  // Cierra el modal
        resetFormulario();
        navigate(-1);

        console.log("Formulario cancelado");
    };
    const [form, setForm] = useState({
        nombre: '',
        precio: '',
        descripcion_item: '',
        categoria: '',
        tipo_item: 'PLATO',
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
    const [errors, setErrors] = useState({
        nombre: false,
        precio: false,
        descripcion_item: false,
        categoria: '',
        tipo_item: false,
        calorias: false,
        tamanio_ml: false,
        graduacionAlcohol: false,
        isBebidaAlcoholica: false,
        aptoVegano: false,
        aptoVegetariano: false,
        aptoCeliaco: false,
    });
    const [animationClass, setAnimationClass] = useState('');

    const [backendMessage, setBackendMessage] = useState('');

    const resetFormulario = () => {
        setForm({
            nombre: '',
            precio: '',
            descripcion_item: '',
            categoria: '',
            tipo_item: 'PLATO',
            calorias: '',
            tamanio_ml: '',
            graduacionAlcohol: '',
            isBebidaAlcoholica: false,
            aptoVegano: false,
            aptoVegetariano: false,
            aptoCeliaco: false,
        });
        setPlaceholders({
            nombre: 'Nombre',
            precio: 'Precio',
            calorias: 'Calorias',
            tamanio_ml: 'tamanio (ml)',
            graduacionAlcohol: 'graduacion alcohol',
            descripcion_item: 'Descripcion de item',
            categoria: 'Categoria',
        })
        setErrors({
            nombre: false,
            precio: false,
            descripcion_item: false,
            categoria: '',
            tipo_item: false,
            calorias: false,
            tamanio_ml: false,
            graduacionAlcohol: false,
            isBebidaAlcoholica: false,
            aptoVegano: false,
            aptoVegetariano: false,
            aptoCeliaco: false,

        });
        setBackendMessage('');
    };
    useEffect(() => {
        if (resetForm) {
            resetForm.current = resetFormulario;
        }
    }, [resetForm]);


    const handleChange = (e) => {
        const { name, checked, type } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        console.log("El dto es: ", { ...form, dniVendedor });
        e.preventDefault();
        const newErrors = { ...errors };

        // Validaciones locales
        if (!form.nombre) {
            newErrors.nombre = true;
            setPlaceholders(prev => ({ ...prev, nombre: "Completa el nombre." }));
        }
        if (!form.precio) {
            newErrors.precio = true;
            setPlaceholders(prev => ({ ...prev, precio: "Completa el precio." }));
        }
        if (!form.descripcion_item) {
            newErrors.descripcion_item = true;
            setPlaceholders(prev => ({ ...prev, direccion: "Completa la descripcion del item." }));
        }
        if (!form.categoria) {
            newErrors.categoria = true;
            setPlaceholders(prev => ({ ...prev, categoria: "Completa la categoria." }));
        }

        // Actualizar el estado de errores
        setErrors(newErrors);

        // Si hay errores, detener el envío
        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        try {
            console.log("El dto es")
            const queryParams = new URLSearchParams({
                nombre: form.nombre,
                precio: form.precio,
                descripcion_item: form.descripcion_item,
                categoria: form.categoria,
                tipo_item: form.tipo_item,
                calorias: form.calorias != '' ? form.calorias : 0,
                tamanio_ml: form.tamanio_ml != '' ? form.tamanio_ml : 0,
                graduacionAlcohol: form.graduacionAlcohol != '' ? form.graduacionAlcohol : 0,
                isBebidaAlcoholica: form.isBebidaAlcoholica,
                aptoVegano: form.aptoVegano,
                aptoVegetariano: form.aptoVegetariano,
                aptoCeliaco: form.aptoCeliaco,
                dniVendedor: dniVendedor

            }).toString();
            const response = await fetch(`/itemMenu/crear?${queryParams}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });


            if (!response.ok) {
                const errorMessage = await response.text();

                console.log(errorMessage)
                console.error('Error del servidor:', errorMessage);
                return;
            }

            setBackendMessage("Item creado exitosamente.");

            setAnimationClass('fade-in'); // Agregar clase de animación

            setTimeout(() => {
                setAnimationClass('fade-out'); // Iniciar fade out después de 2 segundos
                resetFormulario(); // Limpiar formulario
            }, 2000); // Esperar 2 segundos antes de hacer fade out
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setBackendMessage("Ocurrió un error en el servidor. Inténtalo de nuevo.");
        }
    }

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
                <form className='formulario-item-general' onSubmit={handleSubmit}>
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
                                value="PLATO"
                                checked={form.tipo_item === 'PLATO'}
                                onChange={handleChange}
                            />
                            Plato
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="tipo_item"
                                value="BEBIDA"
                                checked={form.tipo_item === 'BEBIDA'}
                                onChange={handleChange}
                            />
                            Bebida
                        </label>
                    </div>
                </form>
            </div>
            <div className="panel-derecho">
                {form.tipo_item === 'PLATO' && (
                    <FormularioPlato form={form} handleChange={handleChange} placeholders={placeholders} />
                )}
                {form.tipo_item === 'BEBIDA' && (
                    <FormularioBebida form={form} handleChange={handleChange} placeholders={placeholders} />
                )}
                <div className='BotonesItems'>
                    <button className='botonRegItem' type="submit" onClick={handleSubmit}>Registrar</button>
                    <button className='botonCancelar' onClick={mostrar}>Cancelar</button>
                </div>
            </div>



            {backendMessage == "Item creado exitosamente." && <div className={`backend-message-exito ${animationClass}`}>{backendMessage}</div>}
            {showModal && (
                <Cancelar
                    onCancel={handleCancel}
                    onConfirm={handleConfirmCancel}
                />
            )}
        </div>

    );
}

export default RegistrarItems;
