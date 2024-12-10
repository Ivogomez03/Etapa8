import { useState, useEffect, useRef } from 'react'
import { HashRouter, useNavigate } from 'react-router-dom';
import './BuscarVendedor.css';
import Cancelar from '../../Cancelar/Cancelar';


const BuscarVendedor = ({ resetForm }) => {
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
        dni: '',

    });

    const [placeholders, setPlaceholders] = useState({
        dni: "Dni",

    });

    const [errors, setErrors] = useState({
        dni: false,

    });


    const resetFormulario = () => {
        setForm({
            dni: '',

        });
        setPlaceholders({
            dni: "Dni",

        })
        setErrors({
            dni: false,


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
        if (!form.dni) {
            newErrors.dni = true;
            setPlaceholders(prev => ({ ...prev, dni: "Completa el dni." }));
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
                dni: form.dni,

            }).toString();
            console.log("URL construida:", `/vendedor/buscarVendedor?${queryParams}`);

            const response = await fetch(`/vendedor/buscarVendedor?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                // Redirigir al vendedor y pasar los datos con `state`
                navigate("/bienvenidoVendedor/BuscarVendedor/VendedorBuscado", { state: { vendedor: data } });
                resetFormulario();
            } else {
                console.error('Error en la respuesta:', response.status);
                alert("No se pudieron cargar los vendedores.");
            }

        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert("Ocurrió un error en el servidor. Inténtalo de nuevo.");
        }
    }
    return (
        <div className='conteiner-principal-busqueda-vendedor'>
            <div className="seccion-bienvenida-busqueda-vendedor">
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
                <h1>Busqueda de vendedor</h1>
                <p>Indique el parametro de busqueda</p>

            </div>
            <div className="conteiner-busqueda-vendedor">
                <h1>Parámetros</h1>
                <form onSubmit={handleSubmit} className="form-busqueda-vendedor">
                    <input
                        type="text"
                        name="dni"
                        placeholder={placeholders.dni}
                        value={form.dni}
                        onChange={handleChange}
                        className={`input-BV ${errors.dni ? 'input-error-BV' : ''}`}
                    />
                    {errors.dni && <span className="error-message-BV">Completa el dni.</span>}


                    <div className='BotonesBusquedaVendedor'>
                        <button className='botonBusquedaVendedor' type="submit">Buscar</button>
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

export default BuscarVendedor;