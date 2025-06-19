// src/pages/Alimentos.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Alimentos() {
  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
    async function fetchAlimentos() {
      const { data, error } = await supabase.from("alimentos").select("*");
      if (error) {
        console.error("Error al cargar alimentos:", error);
      } else {
        setAlimentos(data);
      }
    }

    fetchAlimentos();
  }, []);

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <h2 className="text-success fw-bold text-center mb-5">Nuestros Alimentos</h2>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {alimentos.map((alimento) => (
            <div key={alimento.id} className="col">
              <div className="card h-100 border-0 shadow-lg rounded-4">
                <div className="card-body text-center">
                  <h4 className="card-title fw-bold text-dark">{alimento.nombre}</h4>
                  <p className="text-muted small">{alimento.descripcion || "Alimento tradicional andino."}</p>
                  {alimento.beneficios?.length > 0 && (
                    <div className="d-flex justify-content-center flex-wrap mt-3">
                      {alimento.beneficios.map((etiqueta, i) => (
                        <span
                          key={i}
                          className="badge rounded-pill bg-success text-white m-1 px-3 py-2"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {etiqueta}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Alimentos;