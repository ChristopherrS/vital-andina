import React from "react";
import "./Guia.css"; // Asegúrate de crear y adaptar este archivo si no existe
import { FaAppleAlt, FaSeedling, FaCarrot, FaTint, FaEgg, FaFireAlt } from "react-icons/fa";
import { GiFruitBowl, GiCook, GiMeal } from "react-icons/gi";

const Guia = () => {
  return (
    <div className="guia-container">
      {/* Hero */}
      <section className="guia-hero">
        <div className="hero-content">
          <h1>Guía de Alimentación Andina</h1>
          <p>
            Consejos prácticos para una nutrición saludable basada en nuestras raíces culturales, de acuerdo a la guía del Ministerio de Salud del Ecuador.
          </p>
        </div>
      </section>

      {/* Secciones */}
      <section className="guia-section green-bg">
        <div className="card">
          <FaAppleAlt className="icon" />
          <h2>Horarios de Comida</h2>
          <p>Se recomienda mantener cinco tiempos de comida: desayuno, refrigerios, almuerzo y merienda.</p>
        </div>
        <div className="card">
          <GiFruitBowl className="icon" />
          <h2>Frutas y Verduras</h2>
          <p>Fuente principal de vitaminas A y C. Consumir al menos 2 porciones diarias fortalece el sistema inmune.</p>
        </div>
        <div className="card">
          <FaCarrot className="icon" />
          <h2>Cereales y Tubérculos</h2>
          <p>Optar por avena, arroz, quinua, plátano verde. Aportan energía y fibra.</p>
        </div>
      </section>

      <section className="guia-section">
        <div className="card">
          <FaEgg className="icon" />
          <h2>Proteínas Saludables</h2>
          <p>Incluir huevos, carnes, leche y leguminosas como lentejas, fréjol o chocho.</p>
        </div>
        <div className="card">
          <FaTint className="icon" />
          <h2>Hidratación</h2>
          <p>Beber al menos 8 vasos de agua natural al día. Evitar bebidas azucaradas.</p>
        </div>
        <div className="card">
          <FaFireAlt className="icon" />
          <h2>Cocción Saludable</h2>
          <p>Hervido, al vapor o al horno. Reducir el uso de sal y grasas.</p>
        </div>
      </section>

      <section className="guia-section purple-bg">
        <h2 className="subtitulo">Desayunos  Saludables</h2>
        <div className="menu-opciones">
          <div className="item">
            <GiMeal className="icon-lg" />
            <p>Leche + pan + huevo + fruta natural</p>
          </div>
          <div className="item">
            <GiCook className="icon-lg" />
            <p>Avena con leche + tostadas + fruta</p>
          </div>
          <div className="item">
            <GiMeal className="icon-lg" />
            <p>Yogur + tortilla de verde + fruta</p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="guia-footer-cta">
        <h2>Conecta con tu bienestar ancestral</h2>
        <p>Explora nuestras recetas y guía nutricional para una vida más saludable.</p>
        <a href="/recetas" className="guia-btn">Ver Recetas</a>
      </section>
    </div>
  );
};

export default Guia;
