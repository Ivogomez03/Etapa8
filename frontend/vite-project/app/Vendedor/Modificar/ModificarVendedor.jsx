import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ModificarVendedor.css';
import Cancelar from '../../Cancelar/Cancelar';

const ModificarVendedor = ({ resetForm }) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1); // Navega hacia la página anterior
    };

    const onlyLetters = (value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value);
    const onlyNumbers = (str) => /^[0-9]*$/.test(str);

    const location = useLocation();

    const vendedor = location.state?.vendedor;
    console.log(vendedor);
    const [form, setForm] = useState({
        apellido: '',
        nombre: '',
        longitud: '',
        latitud: '',
        direccion: '',
        dni: ''
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (vendedor) {
            setForm({
                apellido: vendedor.apellido || '',
                nombre: vendedor.nombre || '',
                longitud: vendedor.longitud || '',
                latitud: vendedor.latitud || '',
                direccion: vendedor.direccion || '',
                dni: vendedor.dni || ''
            });
        }
    }, [vendedor]);


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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            const response = await fetch(`/vendedor/modificar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                // Procesar mensaje de error del backend
                const errorMessage = await response.text();
                setBackendErrors({ general: errorMessage });
                console.error('Error del servidor:', errorMessage);
                return;
            }

            const result = await response.text(); // Mensaje de éxito
            console.log('Éxito:', result);
            alert(result); // O redirigir si es necesario

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setBackendErrors({ general: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.' });
        }
    };

    return (
        <div className="conteiner-mod-vendedor">
            <div className="panel-izquierdo">
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
            <form onSubmit={handleSubmit} className="formulario">
                <h2>Modificar Vendedor</h2>
                <input
                    type="text"
                    name="dni"
                    placeholder="Dni (solo lectura) "
                    value={form.dni + " (solo lectura)"}
                    onChange={handleChange}
                    className="inputModVendedor" /* Clase correcta */
                    onlyRead
                />
                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    className="inputModVendedor" /* Clase correcta */
                />
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="inputModVendedor" /* Clase correcta */
                />

                <input
                    type="text"
                    name="latitud"
                    placeholder="Latitud"
                    value={form.latitud}
                    onChange={handleChange}
                    className="inputModVendedor" /* Clase correcta */
                />

                <input
                    type="text"
                    name="longitud"
                    placeholder="Longitud"
                    value={form.longitud}
                    onChange={handleChange}
                    className="inputModVendedor" /* Clase correcta */
                />
                <input
                    type="text"
                    name="direccion"
                    placeholder="Direccion (solo lectura) "
                    value={form.direccion + " (solo lectura)"}
                    onChange={handleChange}
                    className="inputModVendedor" /* Clase correcta */
                    onlyRead
                />


                <div className="BotonesVendedor">
                    <button type="submit" className="botonModVendedor">Modificar</button>
                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="botonCancelar"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
            {showModal && (
                <Cancelar
                    onCancel={() => setShowModal(false)}
                    onConfirm={() => navigate(-1)}
                />
            )}
        </div>
    );
};

export default ModificarVendedor;