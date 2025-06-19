import { useParams } from 'react-router-dom';

function NutricionDetalle() {
  const { id } = useParams();

  const contenido = {
    1: {
      titulo: 'Importancia de alimentarse bien',
      descripcion: 'Una alimentación adecuada mejora el rendimiento físico y mental, previene enfermedades crónicas y fortalece nuestra conexión con la herencia andina.'
    },
    2: {
      titulo: 'Mitos comunes',
      descripcion: '“El chocho engorda” y “solo la carne tiene hierro” son falsos. La quinua, el tarwi y la cañihua también aportan nutrientes clave.'
    },
    3: {
      titulo: 'Alimentos andinos modernos',
      descripcion: 'Los alimentos tradicionales pueden integrarse en platos modernos como hamburguesas de quinua, sopas de melloco o ensaladas creativas.'
    }
  };

  const item = contenido[id] || { titulo: 'Contenido no encontrado', descripcion: 'No existe información para este tema.' };

  return (
    <div className="container py-5 text-center">
      <h2 className="text-success fw-bold">{item.titulo}</h2>
      <p className="fs-5 mt-4">{item.descripcion}</p>
    </div>
  );
}

export default NutricionDetalle;
