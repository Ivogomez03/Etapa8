import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EliminarItem.css';
import Cancelar from '../../Cancelar/Cancelar';

const EliminarItem = ({ resetForm }) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1); // Navega hacia la página anterior
    };


    const location = useLocation();

    const item = location.state?.item;

    const [form, setForm] = useState({
        idItem: item.idItem
    });

    const [backendErrors, setBackendErrors] = useState({
    });

    const [showModal, setShowModal] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const queryParams = new URLSearchParams({
                idItem: form.idItem,

            }).toString();
            const response = await fetch(`/itemMenu/eliminar?${queryParams}`, {
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
        <div className="conteinerEliminarItem">
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
                <h2>Confirme si desea eliminar el item</h2>
            </div>
            <form onSubmit={handleSubmit} className="formularioEliminarItem">
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
                <h2>Eliminar Item</h2>

                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={"Nombre: " + item.nombre}
                    readOnly
                    className="inputEliminarItem" /* Clase correcta */
                />
                <input
                    type="text"
                    name="precio"
                    placeholder="Precio"
                    value={"Precio: " + item.precio}
                    readOnly
                    className="inputEliminarItem" /* Clase correcta */
                />




                <div className="BotonesEliminarItem">
                    <button type="submit" className="botonEliminarItem">Eliminar</button>
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

export default EliminarItem;