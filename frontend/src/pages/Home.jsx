// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

// Importa los logos de los otros proyectos
import nuevoMundoLogo from "/assets/nuevo-mundo.png";
import lluquiNawiLogo from "/assets/lluqui-nawi.png";
import alliyLogo from "/assets/alliy.png";
import yachaykunaLogo from "/assets/yachaykuna.png";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      {/* Hero principal */}
      <section
        className="d-flex align-items-center text-white"
        style={{
          minHeight: "100vh",
          backgroundImage: "url('/assets/chugchilan-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          padding: "0 1rem",
        }}
      >
        <div className="container text-center" data-aos="fade-up">
          <h1 className="display-3 fw-bold mb-4">Vital Andina</h1>
          <p className="lead mb-5">
            Promoviendo la alimentación consciente y el conocimiento de los alimentos ancestrales.
          </p>
          <Link to="/alimentos" className="btn btn-warning btn-lg fw-semibold">
            Explorar ahora
          </Link>
        </div>
      </section>

      {/* Guía nutricional */}
      <section style={{ backgroundColor: "#e5f0e3" }} className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Así es como funciona nuestra nutrición</h2>
          <p className="text-muted mb-5">
            Conoce los pilares de una alimentación andina consciente
          </p>

          <div className="row row-cols-1 row-cols-md-4 g-4">
            {/* Paso 1 */}
            <Paso
              numero="1"
              titulo="Importancia de alimentarse bien"
              descripcion="Mejora el rendimiento físico y mental. Previene enfermedades crónicas y conecta con nuestra herencia andina."
              link="/guia#1"
            />
            {/* Paso 2 */}
            <Paso
              numero="2"
              titulo="Mitos comunes"
              descripcion="El chocho no engorda. La quinua y el tarwi también tienen hierro. ¡Desmintamos los mitos!"
              link="/guia#2"
            />
            {/* Paso 3 */}
            <Paso
              numero="3"
              titulo="Alimentos andinos modernos"
              descripcion="Desde sopas de melloco hasta hamburguesas de quinua, podemos adaptar nuestros productos a recetas actuales."
              link="/guia#3"
            />
            {/* Paso 4 */}
            <Paso
              numero="4"
              titulo="Explora nuestras recetas"
              descripcion="Aprende a preparar comidas nutritivas con identidad ancestral. ¡Fáciles, sanas y deliciosas!"
              link="/recetas"
            />
          </div>
        </div>
      </section>

      {/* 🌟 Otros Proyectos */}
      <section style={{ backgroundColor: "#f9f9f9" }} className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">🌱 Otros Proyectos</h2>
          <p className="text-muted mb-5">
            Conoce más iniciativas desarrolladas con impacto social y cultural:
          </p>

          <div className="row row-cols-1 row-cols-md-2 g-4">
            <ProyectoCard
              logo={nuevoMundoLogo}
              titulo="Nuevo Mundo"
              descripcion="Busca convertirse en un referente nacional para la preservación digital y participativa del patrimonio cultural andino, inspirando a otras comunidades."
            />
            <ProyectoCard
              logo={lluquiNawiLogo}
              titulo="Lluqui Ñawi"
              descripcion="Aplicación educativa que fomenta la lectura en niños y adolescentes de comunidades rurales, fortaleciendo el aprendizaje lector y cultural mediante IA."
            />
            <ProyectoCard
              logo={alliyLogo}
              titulo="Alliy"
              descripcion="Plataforma para orientación sobre salud mental y prevención de la violencia en contextos rurales, con chatbot interactivo y recursos accesibles."
            />
            <ProyectoCard
              logo={yachaykunaLogo}
              titulo="YachaykunaLink"
              descripcion="Proyecto sobre capacitaciones a niños, jóvenes y adultos para el uso responsable de redes sociales."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Paso({ numero, titulo, descripcion, link }) {
  return (
    <div className="col" data-aos="zoom-in">
      <div className="bg-white rounded-4 shadow-sm p-4 h-100">
        <div
          className="circle bg-success text-white fw-bold mb-3"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {numero}
        </div>
        <h5 className="fw-semibold">{titulo}</h5>
        <p className="text-muted small mb-3">{descripcion}</p>
        <Link to={link} className="btn btn-outline-success btn-sm">
          más
        </Link>
      </div>
    </div>
  );
}

function ProyectoCard({ logo, titulo, descripcion }) {
  return (
    <div className="col" data-aos="fade-up">
      <div className="bg-white rounded-4 shadow-sm p-4 h-100 text-center">
        <img
          src={logo}
          alt={titulo}
          style={{ width: "100px", height: "auto", marginBottom: "1rem" }}
        />
        <h5 className="fw-semibold">{titulo}</h5>
        <p className="text-muted small">{descripcion}</p>
      </div>
    </div>
  );
}

export default Home;
