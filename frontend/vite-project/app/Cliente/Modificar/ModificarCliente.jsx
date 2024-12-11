import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ModificarCliente.css';
import Cancelar from '../../Cancelar/Cancelar';

const ModificarCliente = ({ resetForm }) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1); // Navega hacia la página anterior
    };

    const onlyLetters = (value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value);
    const onlyNumbers = (str) => /^[0-9]*$/.test(str);

    const location = useLocation();

    const cliente = location.state?.cliente;
    console.log(cliente);
    const [form, setForm] = useState({
        email: '',
        longitud: '',
        latitud: '',
        direccion: '',
        cuit: ''
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (cliente) {
            setForm({
                email: cliente.email || '',
                longitud: cliente.longitud || '',
                latitud: cliente.latitud || '',
                direccion: cliente.direccion || '',
                cuit: cliente.cuit || ''
            });
        }
    }, [cliente]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log({ ...form })

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            const response = await fetch(`/cliente/modificar`, {
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
        <div className="conteiner-mod-cliente">
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
                <h2>Modificar Cliente</h2>
                <input
                    type="text"
                    name="cuit"
                    placeholder="Cuit (solo lectura) "
                    value={form.cuit + " (solo lectura)"}
                    onChange={handleChange}
                    className="inputModCliente" /* Clase correcta */
                    readOnly
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="inputModCliente" /* Clase correcta */
                />


                <input
                    type="text"
                    name="latitud"
                    placeholder="Latitud"
                    value={form.latitud}
                    onChange={handleChange}
                    className="inputModCliente" /* Clase correcta */
                />

                <input
                    type="text"
                    name="longitud"
                    placeholder="Longitud"
                    value={form.longitud}
                    onChange={handleChange}
                    className="inputModCliente" /* Clase correcta */
                />
                <input
                    type="text"
                    name="direccion"
                    placeholder="Direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    className="inputModCliente" /* Clase correcta */

                />


                <div className="BotonesCliente">
                    <button type="submit" className="botonModCliente">Modificar</button>
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

export default ModificarCliente;