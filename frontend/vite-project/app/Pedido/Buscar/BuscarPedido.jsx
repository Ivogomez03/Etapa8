import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './BuscarPedido.css';
import Cancelar from "../../Cancelar/Cancelar";
const BuscarPedido = () => {
    const navigate = useNavigate();
    const [dniVendedor, setDniVendedor] = useState("");
    const [cuitCliente, setCuitCliente] = useState("");
    const [pedidos, setPedidos] = useState([]); // Estado para almacenar los pedidos
    const [backendMessage, setBackendMessage] = useState("");
    const [mostrarDniInput, setMostrarDniInput] = useState(false); // Controla la visibilidad del input DNI
    const [mostrarCuitInput, setMostrarCuitInput] = useState(false); // Controla la visibilidad del input CUIT

    const goBack = () => {
        navigate(-1); // Navega hacia la página anterior
    };

    // Resetear formulario
    const resetFormulario = () => {
        setPedidos([]);
        setDniVendedor("");
        setCuitCliente("");
    };

    // Función para hacer la solicitud de pedidos
    const obtenerPedidos = async () => {
        if (dniVendedor) {
            try {
                const response = await axios.get('/pedido/obtenerPedidosPorVendedor', {
                    params: { dniVendedor }
                });
                setPedidos(response.data);
            } catch (error) {
                setBackendMessage("Hubo un error al obtener los pedidos.");
            }
        } else if (cuitCliente) {
            try {
                const response = await axios.get('/pedido/obtenerPedidosPorCliente', {
                    params: { cuitCliente }
                });
                setPedidos(response.data);
            } catch (error) {
                setBackendMessage("Hubo un error al obtener los pedidos.");
            }
        } else {
            setBackendMessage("Por favor ingrese un DNI de vendedor o un CUIT de cliente.");
        }
    };

    const handleDniInputChange = (e) => {
        setDniVendedor(e.target.value);
        setCuitCliente(""); // Limpiar CUIT cuando se empieza a escribir DNI
        setPedidos([]); // Limpiar pedidos
    };

    const handleCuitInputChange = (e) => {
        setCuitCliente(e.target.value);
        setDniVendedor(""); // Limpiar DNI cuando se empieza a escribir CUIT
        setPedidos([]); // Limpiar pedidos
    };

    return (
        <div className="lista-pedidos-container">
            <button className="back-button" onClick={goBack}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                </svg>
            </button>

            <div>
                {/* Botones para mostrar los inputs */}
                <button onClick={() => {
                    setMostrarDniInput(!mostrarDniInput);
                    setMostrarCuitInput(false); // Ocultar input CUIT cuando muestro DNI
                    setPedidos([]); // Limpiar tabla de pedidos
                }}>
                    {mostrarDniInput ? "Cancelar DNI" : "Ingresar DNI Vendedor"}
                </button>
                {mostrarDniInput && (
                    <div>
                        <label>DNI Vendedor: </label>
                        <input
                            className="inputBuscarPedido"
                            type="text"
                            value={dniVendedor}
                            onChange={handleDniInputChange} // Cambiar a función de manejo
                        />
                    </div>
                )}

                <button onClick={() => {
                    setMostrarCuitInput(!mostrarCuitInput);
                    setMostrarDniInput(false); // Ocultar input DNI cuando muestro CUIT
                    setPedidos([]); // Limpiar tabla de pedidos
                }}>
                    {mostrarCuitInput ? "Cancelar CUIT" : "Ingresar CUIT Cliente"}
                </button>
                {mostrarCuitInput && (
                    <div>
                        <label className="labels">Cuit Cliente: </label>
                        <input
                            className="inputBuscarPedido"
                            type="text"
                            value={cuitCliente}
                            onChange={handleCuitInputChange} // Cambiar a función de manejo
                        />
                    </div>
                )}

                {/* Botón para obtener pedidos */}
                <button onClick={obtenerPedidos}>Obtener Pedidos</button>
            </div>

            {/* Tabla de Pedidos */}
            <table className="tabla-pedidos">
                <thead>
                    <tr>
                        <th>IdPedido</th>
                        <th>Estado</th>
                        <th>Cuit Cliente</th>
                        <th>Dni Vendedor</th>
                        <th>Tipo Pago</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido) => (
                        <tr key={pedido.id}>
                            <td>{pedido.id}</td>
                            <td>{pedido.estado}</td>
                            <td>{pedido.cuitCliente}</td>
                            <td>{pedido.dniVendedor}</td>
                            <td>{pedido.pago}</td>
                            <td>{pedido.montoPago}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {backendMessage && <p>{backendMessage}</p>}
        </div>
    );
};

export default BuscarPedido;
