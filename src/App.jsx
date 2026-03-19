/**
 * App — Componente raíz con routing.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PublishAd from './pages/PublishAd';
import Admin from './pages/Admin';
import ArticlePage from './pages/ArticlePage';
import Collaborators from './pages/Collaborators';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articulo/:id" element={<ArticlePage />} />
        <Route path="/colaboradores" element={<Collaborators />} />
        <Route path="/publicar-anuncio" element={<PublishAd />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
