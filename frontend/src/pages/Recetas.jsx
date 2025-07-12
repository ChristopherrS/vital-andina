import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AgregarRecetaForm from "../components/AgregarRecetaForm"; // Formulario
import "./Recetas.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Recetas = () => {
  const [recetas, setRecetas] = useState([]);
  const [alimentos, setAlimentos] = useState([]); // 🔥 Lista de alimentos
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alimentoSeleccionado, setAlimentoSeleccionado] = useState(""); // 🍀 Alimento actual

  // 🥦 Cargar alimentos al inicio
  useEffect(() => {
    fetch(`${backendUrl}/api/alimentos`)
      .then((res) => res.json())
      .then((data) => {
        setAlimentos(data);
      })
      .catch((err) => console.error("❌ Error al obtener alimentos:", err));
  }, []);

  // 🍲 Cargar todas las recetas
  useEffect(() => {
    fetch(`${backendUrl}/api/recetas`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Recetas cargadas:", data);
        setRecetas(data);
      })
      .catch((err) => console.error("❌ Error al obtener recetas:", err));
  }, []);

  const abrirModal = (receta) => {
    setRecetaSeleccionada(receta);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setRecetaSeleccionada(null);
  };

  const agregarReceta = (nuevaReceta) => {
    setRecetas((prev) => [...prev, nuevaReceta]);
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

  // 🔍 Filtrar recetas por alimento seleccionado
  const recetasFiltradas = alimentoSeleccionado
    ? recetas.filter((receta) => receta.alimento_id === parseInt(alimentoSeleccionado))
    : recetas;

  return (
    <div className="recetas-container">
      <h2 className="titulo-principal">🥗 Recetas Andinas</h2>
      <p className="subtitulo">
        Preparaciones nutritivas llenas de tradición y sabor.
      </p>

      {/* 🔽 Dropdown para elegir alimento */}
      <div className="buscador-dropdown text-center mb-4">
        <Form.Select
          value={alimentoSeleccionado}
          onChange={(e) => setAlimentoSeleccionado(e.target.value)}
          style={{
            maxWidth: "400px",
            margin: "0 auto",
            borderRadius: "20px",
            padding: "0.6rem 1rem",
            border: "1px solid #ddd",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <option value="">🔎 Selecciona un alimento para ver sus recetas</option>
          {alimentos.map((alimento) => (
            <option key={alimento.id} value={alimento.id}>
              {alimento.nombre}
            </option>
          ))}
        </Form.Select>
      </div>

      {/* Lista de recetas */}
      <div className="recetas-lista">
        {recetasFiltradas.length > 0 ? (
          recetasFiltradas.map((receta, index) => (
            <div
              className={`receta-card-horizontal ${
                index % 2 === 0 ? "fondo-claro" : "fondo-oscuro"
              }`}
              key={receta.id}
              onClick={() => abrirModal(receta)}
            >
              <div className="receta-info">
                <h3>{receta.nombre}</h3>
                <p className="descripcion">{receta.descripcion}</p>
                <span className="etiqueta">🍀 {receta.alimento_nombre}</span>
              </div>
              <div className="beneficios-info">
                <h5>✨ Beneficios</h5>
                {Array.isArray(receta.beneficios) && receta.beneficios.length > 0 ? (
                  <ul>
                    {receta.beneficios.map((b, idx) => (
                      <li key={idx}>✔️ {b}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay beneficios registrados.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">
            {alimentoSeleccionado
              ? "No hay recetas para este alimento."
              : "Selecciona un alimento para ver sus recetas."}
          </p>
        )}
      </div>

      {/* Modal para mostrar detalles */}
      <Modal
        show={mostrarModal}
        onHide={cerrarModal}
        centered
        className="modal-receta"
      >
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

      {/* Formulario para agregar nueva receta */}
      <div className="agregar-receta-seccion">
        <h3>📜 ¿Quieres agregar una receta tuya? ¡Hazlo aquí!</h3>
        <AgregarRecetaForm onRecetaAgregada={agregarReceta} />
      </div>
    </div>
  );
};

export default Recetas;
