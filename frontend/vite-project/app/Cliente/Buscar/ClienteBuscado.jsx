import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Iconos para editar y eliminar
import "./ClienteBuscado.css"; // Archivo CSS externo

const ClienteBuscado = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const goBack = () => {
        navigate("/bienvenidoCliente/BuscarCliente"); // Navega hacia la página anterior
    };


    // Obtenemos la lista de bedeles desde location.state
    const cliente = location.state?.cliente || [];

    // Función para manejar la eliminación
    const handleEliminar = (cliente) => {
        navigate(`/bienvenidoCliente/BuscarCliente/EliminarCliente`, { state: { cliente: cliente } });

    };

    // Función para manejar la edición
    const handleModificar = (cliente) => {
        navigate(`/bienvenidoCliente/BuscarCliente/ModificarCliente`, { state: { cliente: cliente } });
    };

    return (
        <div className="lista-cliente-container">
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
            <h2 className="titulo">Cliente seleccionado</h2>
            <table className="tabla-cliente">
                <thead>
                    <tr>
                        <th>Cuit</th>
                        <th>Email</th>
                        <th>Direccion</th>
                        <th>Latitud</th>
                        <th>Longitud</th>
                    </tr>
                </thead>
                <tbody>

                    <tr >
                        <td>{cliente.cuit}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.direccion}</td>
                        <td>{cliente.latitud}</td>
                        <td>{cliente.longitud}</td>
                        <td>
                            <button
                                onClick={() => handleModificar(cliente)}
                                className="btn-accion btn-editar"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleEliminar(cliente)}
                                className="btn-accion btn-eliminar"
                            >
                                <FaTrashAlt />
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};

export default ClienteBuscado;