import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EliminarCliente.css';
import Cancelar from '../../Cancelar/Cancelar';

const EliminarCliente = ({ resetForm }) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/bienvenidoCliente/BuscarCliente"); // Navega hacia la página anterior
    };


    const location = useLocation();

    const cliente = location.state?.cliente;
    console.log(cliente);
    const [form, setForm] = useState({
        email: '',

        cuit: ''
    });

    const [backendErrors, setBackendErrors] = useState({
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (cliente) {
            setForm({
                email: cliente.email || '',

                cuit: cliente.cuit
            });
        }
    }, [cliente]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const queryParams = new URLSearchParams({
                cuit: form.cuit,

            }).toString();
            const response = await fetch(`/cliente/eliminar?${queryParams}`, {
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
            goBack();

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setBackendErrors({ general: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.' });
        }
    };

    return (
        <div className="conteinerEliminarCliente">
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
                <h2>Confirme si desea eliminar el cliente</h2>
            </div>
            <form onSubmit={handleSubmit} className="formularioEliminarCliente">
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
                <h2>Eliminar Cliente</h2>

                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={"email: " + form.email}
                    readOnly
                    className="inputEliminarCliente" /* Clase correcta */
                />
                <input
                    type="text"
                    name="cuit"
                    placeholder="Cuit"
                    value={"cuit: " + form.cuit}
                    readOnly
                    className="inputEliminarCliente" /* Clase correcta */
                />




                <div className="BotonesEliminarCliente">
                    <button type="submit" className="botonEliminarCliente">Eliminar</button>
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

export default EliminarCliente;