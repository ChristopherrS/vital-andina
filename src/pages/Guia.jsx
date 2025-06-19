import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLeaf, FaAppleAlt, FaCarrot, FaUsers } from "react-icons/fa";

function Guia() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-light text-dark">
      {/* Encabezado */}
      <section className="text-center py-5 bg-white shadow-sm">
        <h2 className="fw-bold mb-2">
          <FaLeaf className="text-success me-2" />
          Guía de Nutrición
        </h2>
        <p className="text-muted">Descubre cómo llevar una alimentación saludable con identidad andina</p>
      </section>

      {/* Secciones */}
      <section className="container py-5">
        {/* 1. Importancia */}
        <div className="row align-items-center py-5" data-aos="fade-up">
          <div className="col-md-6">
            <h4 className="text-success fw-bold">
              <FaAppleAlt className="me-2" />
              Importancia de alimentarse bien
            </h4>
            <ul className="mt-3">
              <li>Mejora el rendimiento físico y mental.</li>
              <li>Previene enfermedades crónicas como obesidad o diabetes.</li>
              <li>Fortalece el sistema inmunológico y el desarrollo cognitivo.</li>
              <li>Refuerza la conexión cultural con la tierra y sus productos.</li>
            </ul>
          </div>
          <div className="col-md-6">
            <img src="/assets/alimentarse.jpg" alt="Importancia" className="img-fluid rounded shadow" />
          </div>
        </div>

        {/* 2. Mitos comunes */}
        <div className="row align-items-center py-5 bg-white rounded shadow-sm" data-aos="fade-up">
          <div className="col-md-6 order-md-2">
            <h4 className="text-primary fw-bold">
              <FaUsers className="me-2" />
              Mitos comunes sobre los alimentos andinos
            </h4>
            <ul className="mt-3">
              <li><strong>“El chocho engorda”</strong> — FALSO: es una fuente excelente de proteína vegetal.</li>
              <li><strong>“Solo la carne tiene hierro”</strong> — FALSO: la quinua, el tarwi y la cañihua también lo aportan.</li>
              <li><strong>“El maíz causa diabetes”</strong> — FALSO: consumido moderadamente, es fuente de energía natural.</li>
            </ul>
          </div>
          <div className="col-md-6 order-md-1">
            <img src="/assets/mitos.jpg" alt="Mitos" className="img-fluid rounded shadow" />
          </div>
        </div>

        {/* 3. Alimentos andinos modernos */}
        <div className="row align-items-center py-5" data-aos="fade-up">
          <div className="col-md-6">
            <h4 className="text-warning fw-bold">
              <FaCarrot className="me-2" />
              Alimentos andinos modernos
            </h4>
            <p>
              Desde sopas de melloco hasta hamburguesas de quinua, los alimentos de nuestra tierra se reinventan en la cocina moderna sin perder su valor ancestral.
            </p>
            <ul>
              <li>Platos como ceviche de oca, empanadas de mashua y quinua con vegetales.</li>
              <li>Ingredientes nutritivos, adaptables y económicos.</li>
              <li>Una alternativa culturalmente rica frente a productos industrializados.</li>
            </ul>
          </div>
          <div className="col-md-6">
            <img src="/assets/modernos.jpg" alt="Modernos" className="img-fluid rounded shadow" />
          </div>
        </div>

        {/* 4. Recomendaciones prácticas */}
        <div className="row align-items-center py-5 bg-white rounded shadow-sm" data-aos="fade-up">
          <div className="col-md-6 order-md-2">
            <h4 className="text-dark fw-bold">
              🧭 Recomendaciones prácticas
            </h4>
            <ul>
              <li>Incluye al menos 3 alimentos andinos por semana en tu dieta.</li>
              <li>Reemplaza snacks procesados con frutas andinas.</li>
              <li>Lee etiquetas y evita productos ultraprocesados.</li>
              <li>Prepara recetas en familia que valoren la cocina local.</li>
            </ul>
          </div>
          <div className="col-md-6 order-md-1">
            <img src="/assets/recomendaciones.jpg" alt="Recomendaciones" className="img-fluid rounded shadow" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Guia;
