import { useState, useEffect, useRef } from 'react'
import { HashRouter, useNavigate } from 'react-router-dom';
import './BuscarCliente.css';
import Cancelar from '../../Cancelar/Cancelar';


const BuscarCliente = ({ resetForm }) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navega hacia la página anterior
    };

    const onlyLetters = (value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value);

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
        cuit: '',

    });

    const [placeholders, setPlaceholders] = useState({
        cuit: "Cuit",

    });

    const [errors, setErrors] = useState({
        cuit: false,

    });


    const resetFormulario = () => {
        setForm({
            cuit: '',

        });
        setPlaceholders({
            cuit: "Cuit",

        })
        setErrors({
            cuit: false,


        });

    };
    useEffect(() => {
        if (resetForm) {
            resetForm.current = resetFormulario;
        }
    }, [resetForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;


        console.log({ ...form })
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: false // Resetea el estado de error al cambiar el input
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = { ...errors };

        // Validaciones locales
        if (!form.cuit) {
            newErrors.cuit = true;
            setPlaceholders(prev => ({ ...prev, cuit: "Completa el cuit." }));
        }



        // Actualizar el estado de errores
        setErrors(newErrors);

        // Si hay errores, detener el envío
        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        try {
            // Construir los parámetros para la URL
            const queryParams = new URLSearchParams({
                cuit: form.cuit,

            }).toString();
            console.log("URL construida:", `/cliente/buscarCliente?${queryParams}`);

            const response = await fetch(`/cliente/buscarCliente?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                // Redirigir al cliente y pasar los datos con `state`
                navigate("/bienvenidoCliente/BuscarCliente/ClienteBuscado", { state: { cliente: data } });
                resetFormulario();
            } else {
                console.error('Error en la respuesta:', response.status);
                alert("No se pudieron cargar los clientes.");
            }

        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert("Ocurrió un error en el servidor. Inténtalo de nuevo.");
        }
    }
    return (
        <div className='conteiner-principal-busqueda-cliente'>
            <div className="seccion-bienvenida-busqueda-cliente">
                <button className="back-button" onClick={goBack}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="32"
                        height="32"
                    >
                        <path
                            d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"
                        />
                    </svg>
                </button>
                <h1>Busqueda de Cliente</h1>
                <p>Indique el parametro de busqueda</p>

            </div>
            <div className="conteiner-busqueda-cliente">
                <h1>Parámetros</h1>
                <form onSubmit={handleSubmit} className="form-busqueda-cliente">
                    <input
                        type="text"
                        name="cuit"
                        placeholder={placeholders.cuit}
                        value={form.cuit}
                        onChange={handleChange}
                        className={`input-BC ${errors.cuit ? 'input-error-BC' : ''}`}
                    />
                    {errors.cuit && <span className="error-message-BC">Completa el cuit.</span>}


                    <div className='BotonesBusquedaCliente'>
                        <button className='botonBusquedaCliente' type="submit">Buscar</button>
                        <button className='botonCancelarBusq' onClick={mostrar}>Cancelar</button>
                    </div>

                </form>
                {showModal && (
                    <Cancelar
                        onCancel={handleCancel}
                        onConfirm={handleConfirmCancel}
                    />
                )}


            </div>
        </div>
    )
}

export default BuscarCliente;