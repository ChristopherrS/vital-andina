import React, { useEffect, useState } from 'react';
import AlimentosCard from '../components/AlimentosCard';
import './Alimentos.css'; // archivo CSS dedicado

const Alimentos = () => {
  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/alimentos')
      .then(res => res.json())
      .then(data => setAlimentos(data))
      .catch(err => console.error('Error al obtener alimentos:', err));
  }, []);

  return (
    <div className="alimentos-page">
      {/* Encabezado con estilo Juice Bar */}
      <section className="alimentos-hero">
        <div className="hero-text">
          <h1>🌱 Nuestros Alimentos Andinos</h1>
          <p>Descubre los ingredientes ancestrales y nutritivos de nuestra tierra.</p>
        </div>
      </section>

      {/* Tarjetas de alimentos */}
      <section className="alimentos-grid">
        {alimentos.map((alimento) => (
          <AlimentosCard key={alimento.id} alimento={alimento} />
        ))}
      </section>
    </div>
  );
};

export default Alimentos;
