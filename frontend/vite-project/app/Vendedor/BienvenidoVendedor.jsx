import { useState, useEffect } from 'react'
import { HashRouter, useNavigate } from 'react-router-dom';
import './BienvenidoVendedor.css'
const BienvenidoVendedor = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navega hacia la página anterior
    };

    const goToBuscarVendedor = () => {
        navigate('/bienvenidoVendedor/BuscarVendedor');
    }
    const goToEliminarVendedor = () => {
        navigate('/bienvenidoVendedor/EliminarVendedor');
    }
    const goToRegistrarVendedor = () => {
        navigate('/bienvenidoVendedor/RegistrarVendedor');
    }
    const goToModificarVendedor = () => {
        navigate('/bienvenidoVendedor/ModificarVendedor');
    }
    return (
        <div className='conteiner-bienvenido-vendedor'>
            <div className='ventanaTransparente-bienvenido-vendedor'>
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


                <div className="seccion-bienvenido-vendedor">
                    <h1>Bienvenido Vendedor</h1>
                </div>
                <div className='seccion-principal-bienvenido-vendedor'>
                    <h1>¿Que desea realizar?</h1>
                    <div className='botones-principal-bienvenido-vendedor'>
                        <div className="botones-principal-arriba">
                            <button onClick={goToRegistrarVendedor}>
                                Registrar Vendedor
                            </button>
                            <button onClick={goToBuscarVendedor}>
                                Buscar Vendedor
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default BienvenidoVendedor;