import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Alimentos from '../pages/Alimentos'
import Recetas from '../pages/Recetas'
import Guia from '../pages/Guia'
import RecetasPage from '../pages/Recetas'
import NutricionDetalle from '../pages/NutricionDetalle' // ← nuevo

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'alimentos', element: <Alimentos /> },
      { path: 'recetas', element: <RecetasPage /> },
      { path: 'guia', element: <Guia /> },
      { path: 'nutricion/:id', element: <NutricionDetalle /> } // ← nuevo
    ]
  }
])

export default router
