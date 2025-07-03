import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatFlotante from './components/ChatFlotante';

import Home from './pages/Home';
import Alimentos from './pages/Alimentos';
import Recetas from './pages/Recetas';
import Guia from './pages/Guia';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alimentos" element={<Alimentos />} />
        <Route path="/recetas/:id" element={<Recetas />} />
        <Route path="/guia" element={<Guia />} />
        <Route path="/recetas" element={<Recetas />} />
      </Routes>

      <Footer />
      <ChatFlotante /> {/* SIEMPRE visible en todas las páginas */}
    </Router>
  );
}

export default App;
