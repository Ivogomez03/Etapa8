import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Iconos para editar y eliminar
import "./VendedorBuscado.css"; // Archivo CSS externo

const VendedorBuscado = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navega hacia la página anterior
    };


    // Obtenemos la lista de bedeles desde location.state
    const vendedor = location.state?.vendedor || [];

    // Función para manejar la eliminación
    const handleEliminar = (vendedor) => {
        navigate(`/bienvenidoVendedor/BuscarVendedor/EliminarVendedor`, { state: { vendedor: vendedor } });

    };

    // Función para manejar la edición
    const handleModificar = (vendedor) => {
        navigate(`/bienvenidoVendedor/BuscarVendedor/ModificarVendedor`, { state: { vendedor: vendedor } });
    };

    return (
        <div className="lista-vendedor-container">
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
            <h2 className="titulo">Vendedor seleccionado</h2>
            <table className="tabla-vendedor">
                <thead>
                    <tr>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>Turno</th>
                        <th>Direccion</th>
                        <th>Latitud</th>
                        <th>Longitud</th>
                    </tr>
                </thead>
                <tbody>

                    <tr >
                        <td>{vendedor.dni}</td>
                        <td>{vendedor.apellido}</td>
                        <td>{vendedor.nombre}</td>
                        <td>{vendedor.direccion}</td>
                        <td>{vendedor.latitud}</td>
                        <td>{vendedor.longitud}</td>
                        <td>
                            <button
                                onClick={() => handleModificar(vendedor)}
                                className="btn-accion btn-editar"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleEliminar(vendedor)}
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

export default VendedorBuscado;