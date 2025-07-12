import React, { useState } from "react";
import "./AgregarAlimentoForm.css"; // Estilos mejorados

const AgregarAlimentoForm = ({ onAlimentoAgregado }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [beneficios, setBeneficios] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("beneficios", beneficios);
    formData.append("imagen", imagen);

    try {
      const res = await fetch("http://localhost:4000/api/alimentos", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const nuevoAlimento = await res.json();
        alert("✅ Alimento agregado correctamente!");
        onAlimentoAgregado(nuevoAlimento);

        // Limpiar formulario
        setNombre("");
        setDescripcion("");
        setBeneficios("");
        setImagen(null);
        setPreview(null);
      } else {
        alert("❌ Error al agregar alimento");
      }
    } catch (err) {
      console.error("Error al enviar alimento:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="form-container">
      <h2>🌾 Sugerir un Nuevo Alimento</h2>
      <p>¿Conoces un alimento andino que no está aquí? ¡Compártelo con nosotros!</p>
      <form className="agregar-alimento-form" onSubmit={handleSubmit}>
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Vista previa" />
          </div>
        )}
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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit">✨ Agregar Alimento</button>
      </form>
    </div>
  );
};

export default AgregarAlimentoForm;
