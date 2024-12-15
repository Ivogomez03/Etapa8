import { useState, useEffect } from 'react'
import { HashRouter, useNavigate } from 'react-router-dom';
import './BienvenidoPedido.css'

const BienvenidoPedido = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navega hacia la página anterior
    };

    const goToBuscarPedido = () => {
        navigate('/bienvenidoPedido/BuscarPedido');
    }
    const goToEliminarPedido = () => {
        navigate('/bienvenidoPedidoEliminarPedido');
    }
    const goToRegistrarPedido = () => {
        navigate('/bienvenidoPedido/RegistrarPedido');
    }
    const goToModificarPedido = () => {
        navigate('/bienvenidoPedido/ModificarPedido');
    }
    return (
        <div className='conteiner-bienvenido-pedido'>
            <div className='ventanaTransparente-bienvenido-pedido'>
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


                <div className="seccion-bienvenido-pedido">
                    <h1>Bienvenido Pedido</h1>
                </div>
                <div className='seccion-principal-bienvenido-pedido'>
                    <h1>¿Que desea realizar?</h1>
                    <div className='botones-principal-bienvenido-pedido'>
                        <div className="botones-principal-arriba">
                            <button onClick={goToRegistrarPedido}>
                                Registrar Pedido
                            </button>
                            <button onClick={goToBuscarPedido}>
                                Buscar Pedido
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default BienvenidoPedido;