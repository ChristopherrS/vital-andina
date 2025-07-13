import React, { useEffect, useState } from 'react';
import AlimentosCard from '../components/AlimentosCard';
import AgregarAlimentoForm from '../components/AgregarAlimentoForm'; 
import './Alimentos.css';

const Alimentos = () => {
  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
    fetch('https://apivitalandina.puceecoexplora.com/api/alimentos')
      .then(res => res.json())
      .then(data => setAlimentos(data))
      .catch(err => console.error('Error al obtener alimentos:', err));
  }, []);

  const agregarAlimentoALaLista = (nuevoAlimento) => {
    setAlimentos([...alimentos, nuevoAlimento]);
  };

  return (
    <div className="alimentos-page">
      <section className="alimentos-hero">
        <div className="hero-text">
          <h1>🌱 Nuestros Alimentos Andinos</h1>
          <p>Descubre los ingredientes ancestrales y nutritivos de nuestra tierra.</p>
        </div>
      </section>

      {/* Formulario para sugerir alimento */}
      <AgregarAlimentoForm onAlimentoAgregado={agregarAlimentoALaLista} />

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
