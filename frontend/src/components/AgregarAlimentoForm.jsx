import React, { useState } from "react";
import "./AgregarAlimentoForm.css"; // Estilos mejorados

const AgregarAlimentoForm = ({ onAlimentoAgregado }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [beneficios, setBeneficios] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoAlimento = {
      nombre,
      descripcion,
      beneficios,
    };

    try {
      const res = await fetch("https://apivitalandina.puceecoexplora.com/api/alimentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoAlimento),
      });

      if (res.ok) {
        const data = await res.json();
        alert("✅ Alimento agregado correctamente!");
        onAlimentoAgregado(data);

        // Limpiar formulario
        setNombre("");
        setDescripcion("");
        setBeneficios("");
      } else {
        alert("❌ Error al agregar alimento");
      }
    } catch (err) {
      console.error("Error al enviar alimento:", err);
      alert("❌ Error al enviar alimento");
    }
  };

  return (
    <div className="form-container">
      <h2>🌾 Sugerir un Nuevo Alimento</h2>
      <p>¿Conoces un alimento andino que no está aquí? ¡Compártelo con nosotros!</p>
      <form className="agregar-alimento-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del alimento"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder='Beneficios (separa con comas: "Proteína, Fibra")'
          value={beneficios}
          onChange={(e) => setBeneficios(e.target.value)}
          required
        />
        <button type="submit">✨ Agregar Alimento</button>
      </form>
    </div>
  );
};

export default AgregarAlimentoForm;
