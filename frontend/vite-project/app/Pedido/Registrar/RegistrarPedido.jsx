import React, { useState, useEffect } from "react";
import { HashRouter, useNavigate } from 'react-router-dom';
import axios from "axios";
import './RegistrarPedido.css'
const GeneradorItems = () => {
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState("PLATOS");
    const [items, setItems] = useState([]);
    const [detalle, setDetalle] = useState([]);
    const [dniVendedor, setDniVendedor] = useState("");
    const [cuitCliente, setCuitCliente] = useState("");
    const [form, setForm] = useState({
        id: '',
        detalle: [],
        estado: null,
        pago: '',
        cuitCliente: '',
        dniVendedor: '',
        montoPago: '',
        credenciales: ''
    });

    const [errors, setErrors] = useState({});
    const [placeholders, setPlaceholders] = useState({});
    const [backendMessage, setBackendMessage] = useState("");
    const [animationClass, setAnimationClass] = useState("");

    // Cargar ítems según categoría
    const cargarItems = async () => {
        try {
            let url = "";
            if (categoria === "PLATOS") url = `/pedido/obtenerPlatos?dniVendedor=${dniVendedor}`;
            else if (categoria === "SIN_TACC") url = `/pedido/obtenerPlatosSinTACC?dniVendedor=${dniVendedor}`;
            else if (categoria === "BEBIDAS") url = `/pedido/obtenerBebidas?dniVendedor=${dniVendedor}`;
            else if (categoria === "BEBIDAS_ALCOHOLICAS") url = `/pedido/obtenerBebidasConAlcohol?dniVendedor=${dniVendedor}`;

            const response = await axios.get(url);
            setItems(response.data);
        } catch (error) {
            console.error("Error al cargar ítems", error);
        }
    };

    // Actualizar ítems cuando cambia la categoría
    useEffect(() => {
        if (dniVendedor || categoria === "PLATOS" || categoria === "BEBIDAS") cargarItems();
    }, [categoria, dniVendedor]);

    // Agregar ítem al detalle
    const agregarItem = (item) => {
        const existe = detalle.find((i) => i.idItem === item.idItem);
        if (existe) {
            setDetalle(
                detalle.map((i) =>
                    i.idItem === item.idItem ? { ...i, cantidad: i.cantidad + 1, precio: item.precio } : i
                )
            );
        } else {
            setDetalle([...detalle, { idItem: item.idItem, cantidad: 1, precio: item.precio }]);
        }
    };

    // Eliminar ítem del detalle
    const eliminarItem = (idItem) => {
        setDetalle(detalle.filter((i) => i.idItem !== idItem));
    };
    const calcularMontoTotal = () => {
        return detalle.reduce((total, item) => {
            return total + item.cantidad * item.precio; // Retorna la suma acumulada
        }, 0);
    };

    // Resetear formulario
    const resetFormulario = () => {
        setForm({
            id: '',
            detalle: [],
            estado: null,
            pago: '',
            cuitCliente: '',
            dniVendedor: '',
            montoPago: '',
            credenciales: ''
        });
        setDetalle([]);
    };
    const goBack = () => {
        navigate("/bienvenidoPedido"); // Navega hacia la página anterior
    };


    // Enviar pedido
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos
        const newErrors = {};
        if (!form.pago) newErrors.pago = "Completa el método de pago.";
        if (!form.cuitCliente) newErrors.cuitCliente = "Completa el CUIT del cliente.";
        if (!form.dniVendedor) newErrors.dniVendedor = "Completa el DNI del vendedor.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Preparar `detalle` para enviar al backend
        const detalleFormateado = detalle.map((item) => ({
            cantidad: item.cantidad,
            id_item: item.idItem
        }));
        const montoTotal = calcularMontoTotal();
        const formData = {
            ...form,
            detalle: detalleFormateado,
            dniVendedor: dniVendedor,
            montoPago: montoTotal
        };

        try {
            const response = await fetch('/pedido/crear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            console.log(response.status, response.statusText); // Log del estado

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
        <div className="lista-items-container">
            <button className="back-button" onClick={goBack}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                </svg>
            </button>
            <div>
                <label>DNI Vendedor: </label>
                <input
                    className="inputRegPedido"
                    type="text"
                    value={dniVendedor}
                    onChange={(e) => {
                        setDniVendedor(e.target.value);
                        setForm({ ...form, dniVendedor: e.target.value });
                    }}
                />
                <label>Cuit Cliente: </label>
                <input
                    className="inputRegPedido"
                    type="text"
                    value={cuitCliente}
                    onChange={(e) => {
                        setCuitCliente(e.target.value);
                        setForm({ ...form, cuitCliente: e.target.value });
                    }}
                />
            </div>

            {/* Categorías */}
            <div>
                <button onClick={() => setCategoria("PLATOS")}>PLATOS</button>
                <button onClick={() => setCategoria("SIN_TACC")}>SIN TACC</button>
                <button onClick={() => setCategoria("BEBIDAS")}>BEBIDAS</button>
                <button onClick={() => setCategoria("BEBIDAS_ALCOHOLICAS")}>BEBIDAS ALCOHÓLICAS</button>
            </div>

            {/* Tabla de Ítems */}
            <table className="tabla-items">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Agregar</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.idItem}>
                            <td>{item.idItem}</td>
                            <td>{item.nombre}</td>
                            <td>${item.precio}</td>
                            <td>
                                <button onClick={() => agregarItem(item)}>Agregar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Detalle */}
            <h3>Detalle de Selección</h3>
            <table className="tabla-items">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {detalle.map((d) => (
                        <tr key={d.idItem}>
                            <td>{d.idItem}</td>
                            <td>{d.cantidad}</td>
                            <td>
                                <button onClick={() => eliminarItem(d.idItem)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h4>Monto Total: ${calcularMontoTotal()}</h4>
            {/* Formulario */}
            <form onSubmit={handleSubmit}>
                <label>Método de Pago:</label>
                <input className="inputRegPedido" type="text" value={form.pago} onChange={(e) => setForm({ ...form, pago: e.target.value })} />
                <button type="submit">Registrar Pedido</button>
            </form>

            {/* Mensajes */}
            {backendMessage && <p>{backendMessage}</p>}
        </div>
    );
};

export default GeneradorItems;
