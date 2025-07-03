import React from 'react';
import { useNavigate } from 'react-router-dom';
 

const AlimentosCard = ({ alimento }) => {
  const navigate = useNavigate();

  const verRecetas = () => {
    navigate('/recetas');
  };

  return (
    <div className="alimento-card" onClick={verRecetas}>
      <div className="alimento-img" style={{ backgroundImage: `url(${alimento.imagen_url || "/assets/default-food.jpg"})` }}>
        {/* Puedes usar alimento.imagen_url si tu API trae imágenes */}
      </div>
      <div className="alimento-content">
        <h3>{alimento.nombre}</h3>
        <p>{alimento.descripcion}</p>
      </div>
    </div>
  );
};

export default AlimentosCard;
