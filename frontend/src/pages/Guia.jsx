import React from "react";
import "./Guia.css";
import { FaAppleAlt, FaSeedling, FaCarrot, FaTint, FaEgg, FaFireAlt, FaHeart, FaRunning, FaBalanceScale, FaUserMd } from "react-icons/fa";
import { GiFruitBowl, GiCook, GiMeal, GiOlive, GiAncientSword } from "react-icons/gi";

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

      {/* Secciones principales */}
      <section className="guia-section green-bg">
        <div className="card">
          <FaAppleAlt className="icon" />
          <h2>Horarios de Comida</h2>
          <p>Mantener cinco tiempos de comida: desayuno, refrigerios, almuerzo y merienda.</p>
        </div>
        <div className="card">
          <GiFruitBowl className="icon" />
          <h2>Frutas y Verduras</h2>
          <p>Fuente principal de vitaminas A y C. Consumir al menos 2 porciones diarias fortalece el sistema inmune.</p>
        </div>
        <div className="card">
          <FaCarrot className="icon" />
          <h2>Cereales y Tubérculos</h2>
          <p>Optar por avena, arroz, quinua, plátano verde. Aportan energía y fibra para un día activo.</p>
        </div>
      </section>

      <section className="guia-section">
        <div className="card">
          <FaEgg className="icon" />
          <h2>Proteínas Saludables</h2>
          <p>Incluir huevos, carnes magras, leche y leguminosas como lentejas, fréjol o chocho.</p>
        </div>
        <div className="card">
          <GiOlive className="icon" />
          <h2>Grasas Buenas</h2>
          <p>Consumir aguacate, frutos secos y aceites vegetales como oliva para la salud cardiovascular.</p>
        </div>
        <div className="card">
          <FaTint className="icon" />
          <h2>Hidratación</h2>
          <p>Beber al menos 8 vasos de agua natural al día. Evitar bebidas azucaradas y energizantes.</p>
        </div>
      </section>

      {/* Alimentos ancestrales */}
      <section className="guia-section purple-bg">
        <h2 className="subtitulo">Alimentos Ancestrales</h2>
        <div className="menu-opciones">
          <div className="item">
            <GiAncientSword className="icon-lg" />
            <p>Quinua: fuente de proteína vegetal y aminoácidos esenciales.</p>
          </div>
          <div className="item">
            <GiAncientSword className="icon-lg" />
            <p>Amaranto: alto en hierro, ideal para combatir la anemia.</p>
          </div>
          <div className="item">
            <GiAncientSword className="icon-lg" />
            <p>Chocho: rico en calcio, fortalece huesos y músculos.</p>
          </div>
        </div>
      </section>

      {/* Desayunos */}
      <section className="guia-section light-bg">
        <h2 className="subtitulo">Desayunos Saludables</h2>
        <div className="menu-opciones">
          <div className="item">
            <GiMeal className="icon-lg" />
            <p>Leche + pan integral + huevo + fruta natural</p>
          </div>
          <div className="item">
            <GiCook className="icon-lg" />
            <p>Avena con leche + tostadas de quinua + fruta</p>
          </div>
          <div className="item">
            <GiMeal className="icon-lg" />
            <p>Yogur natural + tortilla de verde + fruta fresca</p>
          </div>
        </div>
      </section>

      {/* Consejos adicionales */}
      <section className="guia-section orange-bg">
        <div className="card">
          <FaHeart className="icon" />
          <h2>Mitos Alimentarios</h2>
          <p>Evita pensar que “más proteína” siempre es mejor o que “sin gluten” es necesario para todos.</p>
        </div>
        <div className="card">
          <FaRunning className="icon" />
          <h2>Actividad Física</h2>
          <p>Complementa la alimentación con al menos 30 minutos de actividad diaria.</p>
        </div>
        <div className="card">
          <FaBalanceScale className="icon" />
          <h2>Balance y Moderación</h2>
          <p>No elimines grupos de alimentos. Consume de todo, en las porciones correctas.</p>
        </div>
      </section>

      {/* CTA final */}
      <section className="guia-footer-cta">
        <h2>Conecta con tu bienestar ancestral</h2>
        <p>Explora nuestras recetas y guía nutricional para una vida más saludable.</p>
        <a href="/recetas" className="guia-btn">Ver Recetas</a>
      </section>

      {/* ⚕️ Mensaje de recomendación */}
      <section className="guia-profesional-cta">
        <FaUserMd className="icon" />
        <h3>Recuerda:</h3>
        <p>
          Esta guía brinda consejos generales. Para una evaluación más profunda y personalizada, acude siempre a un profesional de la salud o nutrición.
        </p>
      </section>
    </div>
  );
};

export default Guia;
