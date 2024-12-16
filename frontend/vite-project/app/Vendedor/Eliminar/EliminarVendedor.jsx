import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EliminarVendedor.css';
import Cancelar from '../../Cancelar/Cancelar';

const EliminarVendedor = ({ resetForm }) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/bienvenidoVendedor/BuscarVendedor"); // Navega hacia la página anterior
    };


    const location = useLocation();

    const vendedor = location.state?.vendedor;
    console.log(vendedor);
    const [form, setForm] = useState({
        apellido: '',
        nombre: '',
        dni: ''
    });

    const [backendErrors, setBackendErrors] = useState({
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (vendedor) {
            setForm({
                apellido: vendedor.apellido || '',
                nombre: vendedor.nombre || '',
                dni: vendedor.dni
            });
        }
    }, [vendedor]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const queryParams = new URLSearchParams({
                dni: form.dni,

            }).toString();
            const response = await fetch(`/vendedor/eliminar?${queryParams}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
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
        <div className="conteinerEliminarVendedor">
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
                <h2>Confirme si desea eliminar el vendedor</h2>
            </div>
            <form onSubmit={handleSubmit} className="formularioEliminarVendedor">
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
                <h2>Eliminar Vendedor</h2>

                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={"Apellido: " + form.apellido}
                    readOnly
                    className="inputEliminarVendedor" /* Clase correcta */
                />
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={"Nombre: " + form.nombre}
                    readOnly
                    className="inputEliminarVendedor" /* Clase correcta */
                />
                <input
                    type="text"
                    name="dni"
                    placeholder="Dni"
                    value={"Dni: " + form.dni}
                    readOnly
                    className="inputEliminarVendedor" /* Clase correcta */
                />




                <div className="BotonesEliminarVendedor">
                    <button type="submit" className="botonEliminarVendedor">Eliminar</button>
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

export default EliminarVendedor;