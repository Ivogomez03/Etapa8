import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ModificarItem.css';
import Cancelar from '../../Cancelar/Cancelar';

const ModificarItem = ({ resetForm }) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1); // Navega hacia la página anterior
    };

    const onlyLetters = (value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value);
    const onlyNumbers = (str) => /^[0-9]*$/.test(str);

    const location = useLocation();

    const item = location.state?.item;
    const dniVendedor = location.state?.dniVendedor;
    console.log(item);
    const [form, setForm] = useState({
        nombre: '',
        precio: '',
        descripcion_item: '',
        categoria: '',
        tipo_item: 'PLATO',
        calorias: '',
        tamanio_ml: '',
        graduacionAlcohol: '',
        isBebidaAlcoholica: false,
        aptoVegano: false,
        aptoVegetariano: false,
        aptoCeliaco: false,
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (item) {
            setForm({
                nombre: item.nombre,
                precio: item.precio,
                descripcion_item: item.desc,
                categoria: item.categoria,
                tipo_item: item.categoria.tipo,
                calorias: item.calorias,
                tamanio_ml: item.tamanioBebida,
                graduacionAlcohol: item.gradAlcohol,
                isBebidaAlcoholica: item.isBebidaAlcoholica,
                aptoVegano: item.esVegano,
                aptoVegetariano: item.aptoVegetariano,
                aptoCeliaco: item.aptoCeliaco,
            });
        }
    }, [item]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log({ ...form })

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const [backendMessage, setBackendMessage] = useState('');
    const [animationClass, setAnimationClass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams({
            nombre: form.nombre,
            precio: form.precio,
            descripcion_item: form.descripcion_item,
            categoria: form.categoria,
            tipo_item: form.tipo_item,
            calorias: form.calorias != '' ? form.calorias : 0,
            tamanio_ml: form.tamanio_ml != '' ? form.tamanio_ml : 0,
            graduacionAlcohol: form.graduacionAlcohol != '' ? form.graduacionAlcohol : 0,
            isBebidaAlcoholica: form.isBebidaAlcoholica,
            aptoVegano: form.aptoVegano,
            aptoVegetariano: form.aptoVegetariano,
            aptoCeliaco: form.aptoCeliaco,
            dniVendedor: dniVendedor,
            idItem: item.idItem

        }).toString();


        try {
            const response = await fetch(`/itemMenu/modificarItem?${queryParams}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                // Procesar mensaje de error del backend
                const errorMessage = await response.text();
                setBackendMessage(errorMessage);
                console.error('Error del servidor:', errorMessage);
                return;
            }

            const result = await response.text(); // Mensaje de éxito
            console.log('Éxito:', result);
            alert(result); // O redirigir si es necesario

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setBackendMessage("Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde");
        }
    };

    return (
        <div className="conteiner-mod-item">
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
                <h2>Modificar Item</h2>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre (solo lectura) "
                    value={form.nombre + " (solo lectura)"}
                    onChange={handleChange}
                    className="inputModItem" /* Clase correcta */
                    readOnly
                />
                <input
                    type="text"
                    name="tipo"
                    placeholder="Tipo"
                    value={form.categoria.tipo + " (solo lectura)"}
                    onChange={handleChange}
                    className="inputModItem" /* Clase correcta */
                    readOnly
                />
                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={form.precio}
                    onChange={handleChange}
                    className="inputModItem"
                />
                <input
                    type="text"
                    name="descripcion_item"
                    placeholder="Descripcion item"
                    value={form.descripcion_item}
                    onChange={handleChange}
                    className="inputModItem"
                />

                <div className="BotonesItem">
                    <button type="submit" className="botonModIttem">Modificar</button>
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

export default ModificarItem;