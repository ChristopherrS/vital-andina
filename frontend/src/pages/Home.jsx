// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

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

export default Home; 