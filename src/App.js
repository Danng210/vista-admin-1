/* -------- CAPTUARAR CATEGORIA -------- */
import React, { useState } from 'react';
import './App.css';
import { API_BASE_URL } from './config';

function App() {
  const [activeTab, setActiveTab] = useState('categories'); // 'dishes' or 'categories'
  const [categoryName, setCategoryName] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState(null);
  const [message, setMessage] = useState(''); // Para mostrar mensajes al usuario

  // Dummy data for categories, to simulate the UI from the image
  const categories = [
    { id: 1, name: 'Entradas', imageUrl: 'https://placehold.co/300x200/cccccc/ffffff?text=Entradas' },
    { id: 2, name: 'Platos fuertes', imageUrl: 'https://placehold.co/300x200/cccccc/ffffff?text=Platos+Fuertes' },
    { id: 3, name: 'Postres', imageUrl: 'https://placehold.co/300x200/cccccc/ffffff?text=Postres' },
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBackgroundImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBackgroundImage(null);
      setBackgroundImagePreview(null);
    }
  };

  const handleAddCategory = async () => {
    if (!categoryName || !backgroundImage) {
      setMessage('Por favor, ingresa un nombre y selecciona una imagen.');
      return;
    }

    setMessage('Subiendo categoría...');

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('backgroundImage', backgroundImage);

    try {
      const response = await fetch(`${API_BASE_URL}/manage_categorias.php`, {
        method: 'POST',
        body: formData, // FormData se encarga de establecer el 'Content-Type' correcto
      });

      const result = await response.json();

      if (result.success) {
        setMessage(result.message);
        // Reset form fields on success
        setCategoryName('');
        setBackgroundImage(null);
        setBackgroundImagePreview(null);
        // Aquí podrías recargar la lista de categorías si es necesario
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error al añadir categoría:', error);
      setMessage('Error de conexión o del servidor.');
    }
  };

  return (
    <div className="admin-container">
      <h1>Vista Admin</h1>

      <div className="tabs">
        <button
          className={activeTab === 'dishes' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('dishes')}
        >
          Platos
        </button>
        <button
          className={activeTab === 'categories' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('categories')}
        >
          Categorías
        </button>
      </div>

      {activeTab === 'dishes' && (
        <div className="content-section">
          <h2>Contenido de Platos (Ejemplo)</h2>
          <p>Aquí iría el contenido para gestionar platos.</p>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="content-section categories-section">
          <div className="category-list">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <img src={category.imageUrl} alt={category.name} className="category-image" />
                <div className="category-info">
                  <span>{category.name}</span>
                  <button className="edit-button">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="add-category-form">
            <h2>Añadir categoría</h2>
            <div className="form-group">
              <label htmlFor="categoryName">Nombre</label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Nombre de la categoría"
              />
            </div>

            <div className="form-group">
              <label>Subir foto de fondo</label>
              <div className="file-upload-box">
                {backgroundImagePreview ? (
                  <img src={backgroundImagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <>
                    <input
                      type="file"
                      id="backgroundImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                    />
                    <label htmlFor="backgroundImage" className="file-input-label">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                      </svg>
                      <span>Añadir archivo</span>
                    </label>
                  </>
                )}
              </div>
            </div>
            {message && <p className="form-message">{message}</p>} {/* Muestra el mensaje */}
            <button className="add-button" onClick={handleAddCategory}>
              Agregar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
