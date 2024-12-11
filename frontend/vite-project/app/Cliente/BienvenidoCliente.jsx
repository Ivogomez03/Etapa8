import { useState, useEffect } from 'react'
import { HashRouter, useNavigate } from 'react-router-dom';
import './BienvenidoCliente.css'

const BienvenidoCliente = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navega hacia la página anterior
    };

    const goToBuscarCliente = () => {
        navigate('/bienvenidoCliente/BuscarCliente');
    }

    const goToRegistrarCliente = () => {
        navigate('/bienvenidoCliente/RegistrarCliente');
    }

    return (

        <div className='conteiner-bienvenido-cliente'>
            
            <div className='ventanaTransparente-bienvenido-cliente'>
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


                <div className="seccion-bienvenido-cliente">
                    <h1>Bienvenido Cliente</h1>
                </div>
                <div className='seccion-principal-bienvenido-cliente'>
                    <h1>¿Que desea realizar?</h1>
                    <div className='botones-principal-bienvenido-cliente'>
                        <div className="botones-principal-arriba">
                            <button onClick={goToRegistrarCliente}>
                                Registrar Cliente
                            </button>
                            <button onClick={goToBuscarCliente}>
                                Buscar Cliente
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}
export default BienvenidoCliente;