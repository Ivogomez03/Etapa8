import React from "react";
import { useState, useEffect, useRef } from 'react'
import { HashRouter, useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Iconos para editar y eliminar
import "./CatalogoVendedor.css"; // Archivo CSS externo
const TablaItems = ({ dniVendedor, handleEliminar, handleModificar, goBack }) => {

    const [items, setItems] = useState([]);


    useEffect(() => {
        const obtenerDatos = async () => {
            const queryParams = new URLSearchParams({
                dniVendedor: dniVendedor

            }).toString();
            try {
                const response = await fetch(`/itemMenu/obtenerItemsMenuPorVendedor?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if (!response.ok) {
                    throw new Error(`Error de la API: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                console.log("Categorias platos obtenidas", data);

                setItems(data);
            } catch (error) {
                console.error('Error en la solicitud:', error);
                alert("Ocurrió un error en el servidor. Inténtalo de nuevo.");
            }
        };

        obtenerDatos()
    }, [dniVendedor]);

    // Filtrar items por tipo
    const bebidas = items.filter(item => item.categoria.tipo === "BEBIDA");
    const platos = items.filter(item => item.categoria.tipo !== "BEBIDA");
    return (
        <div className="lista-items-container">
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
            <h2 className="titulo">Items del vendedor {dniVendedor}</h2>
            {bebidas.length > 0 && (
                <div>
                    <h3>Bebidas</h3>
                    <table className="tabla-items">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Graduación Alcohol</th>
                                <th>Tamaño Bebida</th>
                                <th>Apto Vegano</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bebidas.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nombre}</td>
                                    <td>{item.precio}</td>
                                    <td>{item.gradAlcohol}</td>
                                    <td>{item.tamanioBebida}</td>
                                    <td>{item.esVegano ? "Sí" : "No"}</td>
                                    <td>
                                        <button
                                            onClick={() => handleModificar(item)}
                                            className="btn-accion btn-editar"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleEliminar(item.id)}
                                            className="btn-accion btn-eliminar"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {platos.length > 0 && (
                <div>
                    <h3>Platos</h3>
                    <table className="tabla-aulas">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Calorías</th>
                                <th>Apto Vegetariano</th>
                                <th>Apto Celiaco</th>
                                <th>Apto Vegano</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {platos.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nombre}</td>
                                    <td>{item.precio}</td>
                                    <td>{item.calorias}</td>
                                    <td>{item.aptoVegetariano ? "Sí" : "No"}</td>
                                    <td>{item.aptoCeliaco ? "Sí" : "No"}</td>
                                    <td>{item.esVegano ? "Sí" : "No"}</td>
                                    <td>
                                        <button
                                            onClick={() => handleModificar(dniVendedor)}
                                            className="btn-accion btn-editar"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleEliminar(dniVendedor)}
                                            className="btn-accion btn-eliminar"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {bebidas.length === 0 && platos.length === 0 && (
                <p>No hay items disponibles para este vendedor.</p>
            )}
        </div>
    )
}
const ListaItems = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navega hacia la página anterior
    };

    // Obtenemos la lista de aulas desde location.state
    const dniVendedor = location.state?.dniVendedor || [];
    console.log(dniVendedor)

    // Función para manejar la eliminación
    const handleEliminar = (dniVendedor) => {
        navigate(`/login/bienvenidoBedel/BuscarAulas/EliminarAula/${dniVendedor}`);
        console.log(`Eliminar aula con ID: ${idAula}`);
    };

    // Función para manejar la edición
    const handleModificar = (dniVendedor) => {

        navigate(`/login/bienvenidoBedel/BuscarAulas/ListaAulas/ModificarAulaMultimedio`, { state: { dniVendedor: dniVendedor } });

    };

    return (
        <>
            <TablaItems
                dniVendedor={dniVendedor}
                handleEliminar={handleEliminar}
                handleModificar={handleModificar}
                goBack={goBack}
            />

        </>
    );
};

export default ListaItems;