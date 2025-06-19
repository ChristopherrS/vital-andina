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
      {/* Hero */}
      <section
        className="d-flex align-items-center text-white"
        style={{
          minHeight: "100vh",
          backgroundImage: "url('/Foto-chakra-copia.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "0 1rem",
        }}
      >
        <div className="container text-center" data-aos="fade-up">
          <h1 className="display-3 fw-bold mb-4">Vital Andina</h1>
          <p className="lead mb-5">
            Promoviendo la alimentación consciente y el conocimiento de los
            alimentos ancestrales.
          </p>
          <Link to="/alimentos" className="btn btn-warning btn-lg fw-semibold">
            Explorar ahora
          </Link>
        </div>
      </section>

      {/* Nutrición con identidad */}
      <section style={{ backgroundColor: '#e5f0e3' }} className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Así es como funciona nuestra nutrición</h2>
          <p className="text-muted mb-5">Conoce los pilares de una alimentación andina consciente</p>

          <div className="row row-cols-1 row-cols-md-4 g-4">
            {/* Paso 1 */}
            <div className="col">
              <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                <div className="circle bg-success text-white fw-bold mb-3"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>1</div>
                <h5 className="fw-semibold">Importancia de alimentarse bien</h5>
                <p className="text-muted small mb-3">
                  Mejora el rendimiento físico y mental. Previene enfermedades crónicas y conecta con nuestra herencia andina.
                </p>
                <Link to="/guia#1" className="btn btn-outline-success btn-sm">más</Link>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="col">
              <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                <div className="circle bg-success text-white fw-bold mb-3"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>2</div>
                <h5 className="fw-semibold">Mitos comunes</h5>
                <p className="text-muted small mb-3">
                  El chocho no engorda. La quinua y el tarwi también tienen hierro. ¡Desmintamos los mitos!
                </p>
                <Link to="/guia#2" className="btn btn-outline-success btn-sm">más</Link>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="col">
              <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                <div className="circle bg-success text-white fw-bold mb-3"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>3</div>
                <h5 className="fw-semibold">Alimentos andinos modernos</h5>
                <p className="text-muted small mb-3">
                  Desde sopas de melloco hasta hamburguesas de quinua, podemos adaptar nuestros productos a recetas actuales.
                </p>
                <Link to="/guia#3" className="btn btn-outline-success btn-sm">más</Link>
              </div>
            </div>

            {/* Paso 4 */}
            <div className="col">
              <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                <div className="circle bg-success text-white fw-bold mb-3"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>4</div>
                <h5 className="fw-semibold">Explora nuestras recetas</h5>
                <p className="text-muted small mb-3">
                  Aprende a preparar comidas nutritivas con identidad ancestral. ¡Fáciles, sanas y deliciosas!
                </p>
                <Link to="/recetas" className="btn btn-outline-success btn-sm">más</Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
