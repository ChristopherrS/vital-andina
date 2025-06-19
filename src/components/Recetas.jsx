import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function Recetas() {
  const [recetas, setRecetas] = useState([])

  useEffect(() => {
    async function fetchRecetas() {
      const { data, error } = await supabase.from('recetas').select('*')
      if (error) {
        console.error('Error al cargar recetas:', error)
      } else {
        console.log('RECETAS: ',data)
        setRecetas(data)
      }
    }

    fetchRecetas()
  }, [])

  return (
    <div className="container py-5">
      <h2 className="mb-5 text-success text-center">Recetas Saludables</h2>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {recetas.map((receta) => (
          <div key={receta.id} className="col">
            <div className="card h-100 shadow-sm border-0">
              {receta.imagen_url && (
                <img
                  src={receta.imagen_url}
                  alt={receta.nombre}
                  className="card-img-top"
                  style={{
                    height: '250px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '0.5rem',
                    borderTopRightRadius: '0.5rem'
                  }}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/vite.svg'
                  }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title fw-bold text-primary">{receta.nombre}</h5>
                <p className="card-text">{receta.descripcion}</p>

                {receta.ingredientes?.length > 0 && (
                  <>
                    <p className="fw-semibold mt-3">🥬 Ingredientes:</p>
                    <ul className="small ps-3">
                      {receta.ingredientes.map((item, idx) => (
                        <li key={idx}>✅ {item}</li>
                      ))}
                    </ul>
                  </>
                )}

                {receta.pasos?.length > 0 && (
                  <>
                    <p className="fw-semibold mt-3">👨‍🍳 Pasos:</p>
                    <ol className="small ps-3">
                      {receta.pasos.map((paso, idx) => (
                        <li key={idx}>{paso}</li>
                      ))}
                    </ol>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recetas
