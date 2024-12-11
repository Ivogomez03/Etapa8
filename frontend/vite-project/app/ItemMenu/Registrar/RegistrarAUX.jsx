import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrarItems.css';

const ItemForm = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goBack = () => {
    navigate(-1); // Navega hacia la página anterior
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías manejar el envío del formulario
    console.log({
      itemName,
      itemType,
      calories,
      isVegetarian,
      isCeliac,
      sizeMl,
      isAlcoholic,
      alcoholContent,
    });
  };

  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [calories, setCalories] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isCeliac, setIsCeliac] = useState(false);
  const [sizeMl, setSizeMl] = useState('');
  const [isAlcoholic, setIsAlcoholic] = useState(false);
  const [alcoholContent, setAlcoholContent] = useState('');

  const handleItemNameChange = (e) => setItemName(e.target.value);
  const handleItemTypeChange = (e) => setItemType(e.target.value);
  const handleCaloriesChange = (e) => setCalories(e.target.value);
  const handleIsVegetarianChange = (e) => setIsVegetarian(e.target.checked);
  const handleIsCeliacChange = (e) => setIsCeliac(e.target.checked);
  const handleSizeMlChange = (e) => setSizeMl(e.target.value);
  const handleIsAlcoholicChange = (e) => setIsAlcoholic(e.target.checked);
  const handleAlcoholContentChange = (e) => setAlcoholContent(e.target.value);

  return (
    <div> 
      <form onSubmit={handleSubmit}>
      <h1>Formulario de Item</h1>

      {/* Campo de texto para ingresar el nombre del item */}
      <label htmlFor="itemName">Nombre del Item:</label>
      <input className="Nombre Item"
        type="text"
        id="itemName"
        
        value={itemName}
        onChange={handleItemNameChange}
        placeholder="Ingrese el nombre del item"
      />

      {/* Grupo de radio buttons mutuamente excluyentes */}
      <div>
        <label>
          <input
            type="radio"
            name="itemType"
            value="plato"
            checked={itemType === 'plato'}
            onChange={handleItemTypeChange}
          />
          Plato
        </label>

        <label>
          <input
            type="radio"
            name="itemType"
            value="bebida"
            checked={itemType === 'bebida'}
            onChange={handleItemTypeChange}
          />
          Bebida
        </label>
      </div>

      {/* Sección de campos para Plato */}
      {itemType === 'plato' && (
        <div>
          <h2>Datos del Plato</h2>
          <label htmlFor="calories">Calorías:</label>
          <input
            type="text"
            id="calories"
            value={calories}
            onChange={handleCaloriesChange}
            placeholder="Ingrese las calorías del plato"
          />

          <label>
            <input
              type="checkbox"
              checked={isVegetarian}
              onChange={handleIsVegetarianChange}
            />
            Apto Vegetariano
          </label>

          <label>
            <input
              type="checkbox"
              checked={isCeliac}
              onChange={handleIsCeliacChange}
            />
            Apto Celíaco
          </label>
        </div>
      )}

      {/* Sección de campos para Bebida */}
      {itemType === 'bebida' && (
        <div>
          <h2>Datos de la Bebida</h2>
          <label htmlFor="sizeMl">Tamaño (ml):</label>
          <input
            type="text"
            id="sizeMl"
            value={sizeMl}
            onChange={handleSizeMlChange}
            placeholder="Ingrese el tamaño en mililitros"
          />

          <label>
            <input
              type="checkbox"
              checked={isAlcoholic}
              onChange={handleIsAlcoholicChange}
            />
            Bebida Alcohólica
          </label>

          {isAlcoholic && (
            <div>
              <label htmlFor="alcoholContent">Graduación de Alcohol (%):</label>
              <input
                type="text"
                id="alcoholContent"
                value={alcoholContent}
                onChange={handleAlcoholContentChange}
                placeholder="Ingrese la graduación de alcohol"
              />
            </div>
          )}
        </div>
      )}

      <button type="submit">Enviar</button>
    </form>
  </div>
    
  );
};

export default ItemForm;
