import { useState, useEffect, useRef } from 'react'
import { HashRouter, useNavigate } from 'react-router-dom';
import './RegistrarVendedor.css';
import Cancelar from '../../Cancelar/Cancelar';



const RegistrarVendedor = ({ resetForm }) => {

    const navigate = useNavigate();

    const onlyLetters = (value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value);
    const onlyNumbers = (str) => /^[0-9]*$/.test(str);

    const goToLogin = () => {
        navigate('/login');
    };

    const goBack = () => {
        navigate(-1); // Navega hacia la página anterior
    };

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
        apellido: '',
        nombre: '',
        direccion: '',
        dni: '',
        longitud: '',
        latitud: '',
        items: []
    });

    const [placeholders, setPlaceholders] = useState({
        apellido: 'Apellido',
        nombre: 'Nombre',
        direccion: 'Dirección',
        dni: 'Dni',
        longitud: 'Longitud',
        latitud: 'Latitud',
        items: 'Items de menú'
    });

    const [errors, setErrors] = useState({
        apellido: false,
        nombre: false,
        direccion: false,
        dni: false,
        longitud: false,
        latitud: false,
        items: false
    });
    const [animationClass, setAnimationClass] = useState('');

    const [backendMessage, setBackendMessage] = useState('');

    const resetFormulario = () => {
        setForm({
            apellido: '',
            nombre: '',
            direccion: '',
            dni: '',
            longitud: '',
            latitud: '',
            items: []
        });
        setPlaceholders({
            apellido: 'Apellido',
            nombre: 'Nombre',
            direccion: 'Dirección',
            dni: 'Dni',
            longitud: 'Longitud',
            latitud: 'Latitud',
            items: 'Items de menú'
        })
        setErrors({
            apellido: false,
            nombre: false,
            direccion: false,
            dni: false,
            longitud: false,
            latitud: false,
            items: false

        });
        setBackendMessage('');
    };
    useEffect(() => {
        if (resetForm) {
            resetForm.current = resetFormulario;
        }
    }, [resetForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validar que ciertos campos acepten solo letras
        if (["nombre", "apellido"].includes(name)) {
            if (!onlyLetters(value)) {
                return; // Salir si el valor contiene caracteres no permitidos
            }
        }
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
        if (!form.apellido || form.apellido.length > 50) {
            newErrors.apellido = true;
            setPlaceholders(prev => ({ ...prev, apellido: "Completa el apellido (máximo 50 caracteres)." }));
        }
        if (!form.nombre || form.nombre.length > 50) {
            newErrors.nombre = true;
            setPlaceholders(prev => ({ ...prev, nombre: "Completa el nombre (máximo 50 caracteres)." }));
        }
        if (!form.dni) {
            newErrors.dni = true;
            setPlaceholders(prev => ({ ...prev, dni: "Completa el dni." }));
        }
        if (!form.direccion || form.direccion.length > 100) {
            newErrors.direccion = true;
            setPlaceholders(prev => ({ ...prev, direccion: "Completa la dirección (máximo 100 caracteres)." }));
        }
        if (!form.latitud) {
            newErrors.latitud = true;
            setPlaceholders(prev => ({ ...prev, latitud: "Completa la latitud." }));
        }
        if (!form.longitud) {
            newErrors.longitud = true;
            setPlaceholders(prev => ({ ...prev, longitud: "Completa la longitud." }));
        }

        // Actualizar el estado de errores
        setErrors(newErrors);

        // Si hay errores, detener el envío
        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        try {
            const response = await fetch('/vendedor/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorMessage = await response.text();

                setBackendErrors({ general: errorMessage });
                console.error('Error del servidor:', errorMessage);
                return;
            }

            setBackendMessage("Vendedor creado exitosamente.");

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
        <div className='conteiner-reg-vendedor'>
            <div className='panel-izquierdo'>
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

                <h1>Por favor</h1>
                <h2>Ingrese los datos solicitados</h2>
            </div>
            <form onSubmit={handleSubmit} className='formulario'>
                <h2>Registrar Vendedor</h2>

                <input
                    type="text"
                    name="apellido"
                    placeholder={placeholders.apellido}
                    value={form.apellido}
                    onChange={handleChange}
                    className={`inputRegVendedor ${errors.apellido ? 'input-error' : ''}`}
                />

                <input
                    type="text"
                    name="nombre"
                    placeholder={placeholders.nombre}
                    value={form.nombre}
                    onChange={handleChange}
                    className={`inputRegVendedor ${errors.nombre ? 'input-error' : ''}`}
                />

                <input
                    type="text"
                    name="direccion"
                    placeholder={placeholders.direccion}
                    value={form.direccion}
                    onChange={handleChange}
                    className={`inputRegVendedor ${errors.direccion ? 'input-error' : ''}`}
                />
                <input
                    type="text"
                    name="latitud"
                    placeholder={placeholders.latitud}
                    value={form.latitud}
                    onChange={handleChange}
                    className={`inputRegVendedor ${errors.latitud ? 'input-error' : ''}`}
                />
                <input
                    type="text"
                    name="longitud"
                    placeholder={placeholders.longitud}
                    value={form.longitud}
                    onChange={handleChange}
                    className={`inputRegVendedor ${errors.longitud ? 'input-error' : ''}`}
                />
                <input
                    type="text"
                    name="dni"
                    placeholder={placeholders.dni}
                    value={form.dni}
                    onChange={handleChange}
                    className={`inputRegVendedor ${errors.dni ? 'input-error' : ''}`}
                />


                <div className='BotonesVendedor'>
                    <button className='botonRegVendedor' type="submit">Registrar</button>
                    <button className='botonCancelar' onClick={mostrar}>Cancelar</button>
                </div>
                {backendMessage == "Vendedor creado exitosamente." && <div className={`backend-message-exito ${animationClass}`}>{backendMessage}</div>}
            </form>
            {showModal && (
                <Cancelar
                    onCancel={handleCancel}
                    onConfirm={handleConfirmCancel}
                />
            )}
        </div>


    );
};

export default RegistrarVendedor;