import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Recetas.css";

const Recetas = () => {
  const [recetas, setRecetas] = useState([]);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/recetas")
      .then((res) => res.json())
      .then((data) => {
        console.log("Recetas cargadas:", data); // ✅ Verificar datos
        setRecetas(data);
      })
      .catch((err) => console.error("Error al obtener recetas:", err));
  }, []);

  const abrirModal = (receta) => {
    setRecetaSeleccionada(receta);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setRecetaSeleccionada(null);
  };

  const obtenerPasosComoLista = () => {
    const pasos = recetaSeleccionada?.pasos;

    if (Array.isArray(pasos)) return pasos;
    if (typeof pasos === "string")
      return pasos
        .replace(/^{|}$/g, "")
        .split(/","|",\s*"/)
        .map((p) => p.replace(/"/g, "").trim())
        .filter((p) => p !== "");

    return [];
  };

  return (
    <div className="recetas-container">
      <h2 className="titulo-principal">🥗 Recetas Andinas</h2>
      <p className="subtitulo">Preparaciones nutritivas llenas de tradición y sabor.</p>

      <div className="recetas-lista">
        {recetas.map((receta, index) => (
          <div
            className={`receta-card-horizontal ${index % 2 === 0 ? "fondo-claro" : "fondo-oscuro"}`}
            key={receta.id}
          >
            <div className="receta-info" onClick={() => abrirModal(receta)}>
              <h3>{receta.nombre}</h3>
              <p className="descripcion">{receta.descripcion}</p>
              <span className="etiqueta">🍀 {receta.alimento_nombre}</span>
            </div>
            <div className="beneficios-info">
              <h5>✨ Beneficios</h5>
              {Array.isArray(receta.beneficios) && receta.beneficios.length > 0 ? (
                <ul>
                  {receta.beneficios.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay beneficios registrados.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal show={mostrarModal} onHide={cerrarModal} centered className="modal-receta">
        <Modal.Header closeButton>
          <Modal.Title>{recetaSeleccionada?.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Descripción:</strong> {recetaSeleccionada?.descripcion}
          </p>
          <p>
            <strong>Alimento base:</strong> {recetaSeleccionada?.alimento_nombre}
          </p>
          <hr />
          <h6>Pasos de preparación:</h6>
          {obtenerPasosComoLista().length > 0 ? (
            <ol>
              {obtenerPasosComoLista().map((paso, idx) => (
                <li key={idx}>{paso}</li>
              ))}
            </ol>
          ) : (
            <p>No hay pasos disponibles.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={cerrarModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Recetas;
