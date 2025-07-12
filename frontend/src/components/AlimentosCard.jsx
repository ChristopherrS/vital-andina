import React from "react";
import { useNavigate } from "react-router-dom";

const AlimentosCard = ({ alimento }) => {
  const navigate = useNavigate();

  // URL base del backend desde .env
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // Construir URL de la imagen
  const imagenUrl =
    alimento.imagen_url.startsWith("http") // ✅ Si ya es una URL externa completa
      ? alimento.imagen_url
      : `${backendUrl}${alimento.imagen_url}`; // ✅ Si es una ruta relativa (uploads)

  const verRecetas = () => {
    navigate("/recetas");
  };

  return (
    <div className="alimento-card" onClick={verRecetas}>
      <div
        className="alimento-img"
        style={{
          backgroundImage: `url(${imagenUrl || "/assets/default-food.jpg"})`,
        }}
      ></div>
      <div className="alimento-content">
        <h3>{alimento.nombre}</h3>
        <p>{alimento.descripcion}</p>
      </div>
    </div>
  );
};

export default AlimentosCard;
