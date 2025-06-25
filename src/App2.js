/* -------- CAPTUARAR PRODUCTO -------- */
import React, { useState } from 'react';
import './App2.css'; // Make sure this CSS file is in the same directory

function App() {
  // State for the dish name input
  const [dishName, setDishName] = useState('');
  // State for the price input
  const [price, setPrice] = useState('');
  // State for the category dropdown
  const [category, setCategory] = useState('');
  // State for the description textarea
  const [description, setDescription] = useState('');

  // State for the dish photo file and its preview URL
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);
  // State for drag-and-drop effect on photo upload area
  const [isPhotoDragOver, setIsPhotoDragOver] = useState(false);

  // State for the 3D model file and its preview URL (for placeholder only, no actual 3D preview)
  const [selectedModelFile, setSelectedModelFile] = useState(null);
  const [isModelDragOver, setIsModelDragOver] = useState(false); // State for drag-and-drop effect on model upload area

  // Handle changes in the dish name input
  const handleDishNameChange = (event) => {
    setDishName(event.target.value);
  };

  // Handle changes in the price input
  const handlePriceChange = (event) => {
    // Allows only numbers and decimal point
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setPrice(value);
    }
  };

  // Handle changes in the category dropdown
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Handle changes in the description textarea
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Handle file selection for dish photo
  const handlePhotoFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedPhotoFile(file);
      setPhotoPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedPhotoFile(null);
      setPhotoPreviewUrl(null);
      alert('Please select a valid image file (JPG, PNG, GIF, etc.) for the dish photo.');
    }
  };

  // Handle file selection for 3D model
  const handleModelFileChange = (file) => {
    if (file) {
      setSelectedModelFile(file);
    } else {
      setSelectedModelFile(null);
      alert('Please select a file for the 3D model.');
    }
  };

  // Drag and drop handlers for dish photo
  const handlePhotoDragOver = (event) => {
    event.preventDefault();
    setIsPhotoDragOver(true);
  };

  const handlePhotoDragLeave = () => {
    setIsPhotoDragOver(false);
  };

  const handlePhotoDrop = (event) => {
    event.preventDefault();
    setIsPhotoDragOver(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handlePhotoFileChange(files[0]);
    }
  };

  // Drag and drop handlers for 3D model
  const handleModelDragOver = (event) => {
    event.preventDefault();
    setIsModelDragOver(true);
  };

  const handleModelDragLeave = () => {
    setIsModelDragOver(false);
  };

  const handleModelDrop = (event) => {
    event.preventDefault();
    setIsModelDragOver(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleModelFileChange(files[0]);
    }
  };

  // Handle the "Agregar" button click
  const handleAddClick = () => {
    if (!dishName.trim()) {
      alert('Please enter the dish name.');
      return;
    }
    if (!price.trim()) {
      alert('Please enter the price.');
      return;
    }
    if (!category) {
      alert('Please select a category.');
      return;
    }
    if (!description.trim()) {
      alert('Please enter the description.');
      return;
    }
    if (!selectedPhotoFile) {
      alert('Please upload a dish photo.');
      return;
    }
    // 3D model is optional based on the image, so no mandatory check

    console.log('Dish Name:', dishName);
    console.log('Price:', price);
    console.log('Category:', category);
    console.log('Description:', description);
    console.log('Selected Photo File:', selectedPhotoFile);
    console.log('Selected 3D Model File:', selectedModelFile);

    // Here is where you would send this data to your PHP backend
    alert('Data ready to be sent to the backend (simulated "Add")');

    // Optional: clear fields after "add"
    // setDishName('');
    // setPrice('');
    // setCategory('');
    // setDescription('');
    // setSelectedPhotoFile(null);
    // setPhotoPreviewUrl(null);
    // setSelectedModelFile(null);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Añadir plato</h1>

        <div className="content-grid">
          {/* Left Column */}
          <div className="column left-column">
            <div className="input-group">
              <label htmlFor="dish-name" className="label">Nombre</label>
              <input
                type="text"
                id="dish-name"
                className="input-field"
                value={dishName}
                onChange={handleDishNameChange}
                placeholder="Nombre del plato"
              />
            </div>

            <div className="input-group">
              <label htmlFor="price" className="label">Precio</label>
              <input
                type="text" // Use text for custom validation, or number if you want browser default
                id="price"
                className="input-field"
                value={price}
                onChange={handlePriceChange}
                placeholder="Ej. 12.50"
              />
            </div>

            <div className="input-group">
              <label htmlFor="category" className="label">Categoría</label>
              <select
                id="category"
                className="input-field select-field"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Seleccione Categoría</option>
                <option value="entradas">Entradas</option>
                <option value="platos_fuertes">Platos Fuertes</option>
                <option value="postres">Postres</option>
                <option value="bebidas">Bebidas</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="description" className="label">Descripción</label>
              <textarea
                id="description"
                className="input-field textarea-field"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Descripción del plato..."
                rows="4" // Initial number of rows
              ></textarea>
            </div>
          </div>

          {/* Right Column */}
          <div className="column right-column">
            <div className="input-group">
              <label className="label">Subir foto del platillo</label>
              <div
                className={`file-upload-area ${isPhotoDragOver ? 'drag-over' : ''}`}
                onDragOver={handlePhotoDragOver}
                onDragLeave={handlePhotoDragLeave}
                onDrop={handlePhotoDrop}
                onClick={() => document.getElementById('photo-file-input').click()}
              >
                {photoPreviewUrl ? (
                  <img src={photoPreviewUrl} alt="Dish preview" className="image-preview" />
                ) : (
                  <div className="placeholder-content">
                    <span className="upload-icon">⬆️</span>
                    <p>Añadir archivo</p>
                  </div>
                )}
                <input
                  type="file"
                  id="photo-file-input"
                  accept="image/*"
                  onChange={(e) => handlePhotoFileChange(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="label">Subir modelo 3D</label>
              <div
                className={`file-upload-area small ${isModelDragOver ? 'drag-over' : ''}`}
                onDragOver={handleModelDragOver}
                onDragLeave={handleModelDragLeave}
                onDrop={handleModelDrop}
                onClick={() => document.getElementById('model-file-input').click()}
              >
                <div className="placeholder-content">
                  <span className="upload-icon-small">⬆️</span> {/* Use a smaller icon or different one */}
                  <p>Añadir archivo</p>
                  {selectedModelFile && (
                    <span className="file-name">{selectedModelFile.name}</span>
                  )}
                </div>
                <input
                  type="file"
                  id="model-file-input"
                  onChange={(e) => handleModelFileChange(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>

        <button className="add-button" onClick={handleAddClick}>
          Agregar
        </button>
      </div>
    </div>
  );
}

export default App;
