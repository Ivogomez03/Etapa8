import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrarPedido.css';
import Cancelar from '../../Cancelar/Cancelar';

const RegistrarPedido = ({ resetForm }) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navega hacia la página anterior
    };

    const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
    const mostrar = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false); // Cierra el modal sin hacer nada
    };

    const handleConfirmCancel = () => {
        setShowModal(false); // Cierra el modal
        resetFormulario();
        navigate(-1);

        console.log("Formulario cancelado");
    };

    const [form, setForm] = useState({
        id: '',
        detalle: [{ cantidad: '', id_item: '' }],
        estado: '',
        pago: '',
        cuitCliente: '',
        dniVendedor: '',
        montoPago: '',
        credenciales: ''
    });

    const [placeholders, setPlaceholders] = useState({
        id: 'ID del Pedido',
        estado: 'Estado',
        pago: 'Método de Pago',
        cuitCliente: 'CUIT del Cliente',
        dniVendedor: 'DNI del Vendedor',
        montoPago: 'Monto a Pagar',
        credenciales: 'Credenciales de Pago'
    });

    const [errors, setErrors] = useState({
        id: false,
        estado: false,
        pago: false,
        cuitCliente: false,
        dniVendedor: false,
        montoPago: false,
        credenciales: false
    });

    const [backendMessage, setBackendMessage] = useState('');
    const [animationClass, setAnimationClass] = useState('');

    const resetFormulario = () => {
        setForm({
            id: '',
            detalle: [{ cantidad: '', id_item: '' }],
            estado: '',
            pago: '',
            cuitCliente: '',
            dniVendedor: '',
            montoPago: '',
            credenciales: ''
        });
        setErrors({
            id: false,
            estado: false,
            pago: false,
            cuitCliente: false,
            dniVendedor: false,
            montoPago: false,
            credenciales: false
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
        setForm({
            ...form,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: false // Resetea el estado de error al cambiar el input
        });
    };

    const handleDetalleChange = (index, field, value) => {
        const newDetalle = [...form.detalle];
        newDetalle[index][field] = value;
        setForm({ ...form, detalle: newDetalle });
    };

    const addDetalle = () => {
        setForm({
            ...form,
            detalle: [...form.detalle, { cantidad: '', id_item: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = { ...errors };

        if (!form.pago) {
            newErrors.pago = true;
            setPlaceholders(prev => ({ ...prev, pago: "Completa el método de pago." }));
        }
        if (!form.cuitCliente) {
            newErrors.cuitCliente = true;
            setPlaceholders(prev => ({ ...prev, cuitCliente: "Completa el CUIT del cliente." }));
        }
        if (!form.dniVendedor) {
            newErrors.dniVendedor = true;
            setPlaceholders(prev => ({ ...prev, dniVendedor: "Completa el DNI del vendedor." }));
        }
        if (!form.montoPago) {
            newErrors.montoPago = true;
            setPlaceholders(prev => ({ ...prev, montoPago: "Completa el monto." }));
        }

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        try {
            const response = await fetch('/pedido/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Error del servidor:', errorMessage);
                setBackendMessage("Error: " + errorMessage);
                return;
            }

            setBackendMessage("Pedido creado exitosamente.");
            setAnimationClass('fade-in');

            setTimeout(() => {
                setAnimationClass('fade-out');
                resetFormulario();
            }, 2000);
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setBackendMessage("Ocurrió un error en el servidor. Inténtalo de nuevo.");
        }
    };

    return (
        <div className='conteiner-reg-pedido'>
            <div className='panel-izquierdo'>
                <button className="back-button" onClick={goBack}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="32"
                        height="32"
                    >
                        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                    </svg>
                </button>

                <h1>Por favor</h1>
                <h2>Ingrese los datos del pedido</h2>
            </div>
            <form onSubmit={handleSubmit} className='formulario'>
                <h2>Registrar Pedido</h2>

                <input
                    type="text"
                    name="pago"
                    placeholder={placeholders.pago}
                    value={form.pago}
                    onChange={handleChange}
                    className={`inputRegPedido ${errors.pago ? 'input-error' : ''}`}
                />

                <input
                    type="text"
                    name="cuitCliente"
                    placeholder={placeholders.cuitCliente}
                    value={form.cuitCliente}
                    onChange={handleChange}
                    className={`inputRegPedido ${errors.cuitCliente ? 'input-error' : ''}`}
                />

                <input
                    type="text"
                    name="dniVendedor"
                    placeholder={placeholders.dniVendedor}
                    value={form.dniVendedor}
                    onChange={handleChange}
                    className={`inputRegPedido ${errors.dniVendedor ? 'input-error' : ''}`}
                />

                <input
                    type="text"
                    name="montoPago"
                    placeholder={placeholders.montoPago}
                    value={form.montoPago}
                    onChange={handleChange}
                    className={`inputRegPedido ${errors.montoPago ? 'input-error' : ''}`}
                />

                <h3>Detalle del Pedido</h3>
                {form.detalle.map((item, index) => (
                    <div key={index} className='detalle-item'>
                        <input
                            type="number"
                            name="cantidad"
                            placeholder="Cantidad"
                            value={item.cantidad}
                            onChange={handleDetalleChange}
                            className={`inputRegPedido`}
                        />
                        <input
                            type="number"
                            name="id_item"
                            placeholder="Id item"
                            value={item.id_item}
                            onChange={handleDetalleChange}
                            className={`inputRegPedido`}
                        />
                    </div>
                ))}
                <div className='BotonesPedido'>
                    <button className='botonRegPedido' type="submit">Crear</button>

                    <button className='botonCancelar' onClick={mostrar}>Cancelar</button>
                </div>
                {backendMessage == "Pedido creado exitosamente." && <div className={`backend-message-exito ${animationClass}`}>{backendMessage}</div>}
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

export default RegistrarPedido;
