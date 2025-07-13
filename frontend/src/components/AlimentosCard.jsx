import React from "react";
import { useNavigate } from "react-router-dom";

const AlimentosCard = ({ alimento }) => {
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://apivitalandina.puceecoexplora.com";

  // Verificar si tiene imagen o no
  const tieneImagen = alimento.imagen_url && alimento.imagen_url.trim() !== "";

  // Construir URL solo si existe imagen
  const imagenUrl =
    tieneImagen && alimento.imagen_url.startsWith("http")
      ? alimento.imagen_url
      : tieneImagen
      ? `${backendUrl}${alimento.imagen_url}`
      : null;

  const verRecetas = () => {
    navigate("/recetas");
  };

  return (
    <div
      className={`alimento-card ${!tieneImagen ? "alimento-sugerido" : ""}`}
      onClick={verRecetas}
    >
      {tieneImagen ? (
        <div
          className="alimento-img"
          style={{ backgroundImage: `url(${imagenUrl})` }}
        ></div>
      ) : (
        <div className="alimento-sugerido-header">
          🌱 <span>Alimento Sugerido</span>
        </div>
      )}
      <div className="alimento-content">
        <h3>{alimento.nombre}</h3>
        <p>{alimento.descripcion}</p>
      </div>
    </div>
  );
};

export default AlimentosCard;
