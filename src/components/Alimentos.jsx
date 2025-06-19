import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function Alimentos() {
  const [alimentos, setAlimentos] = useState([])

  useEffect(() => {
    async function fetchAlimentos() {
      const { data, error } = await supabase.from('alimentos').select('*')
      if (error) {
        console.error('Error al cargar alimentos:', error)
      } else {
        setAlimentos(data)
      }
    }

    fetchAlimentos()
  }, [])

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-success text-center">Nuestros Alimentos</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {alimentos.map((alimento) => (
          <div key={alimento.id} className="col">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                {/* Imagen más grande y centrada */}
                <img
                  src={alimento.imagen_url}
                  alt={alimento.nombre}
                  className="mb-3"
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                <h5 className="card-title fw-bold">{alimento.nombre}</h5>
                <p className="card-text">{alimento.descripcion}</p>

                {/* Beneficios (etiquetas) */}
                {alimento.beneficios?.length > 0 && (
                  <div className="d-flex justify-content-center flex-wrap mt-2">
                    {alimento.beneficios.map((b, i) => (
                      <span key={i} className="badge bg-success text-white m-1">
                        {b}
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
  )
}

export default Alimentos
