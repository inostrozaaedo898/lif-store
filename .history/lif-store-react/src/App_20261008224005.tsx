import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Partidos from './pages/Partidos'
import Posiciones from './pages/Posiciones'
import Noticias from './pages/Noticias'
import Jugadores from './pages/Jugadores'
import Pendiente from './pages/Pendiente'
import RutaAdmin from './components/RutaAdmin'
import Admin from './pages/Admin'

const paginasPendientes = [
  { path: 'complejos', titulo: 'Complejos' },
  { path: 'entradas', titulo: 'Entradas' },
  { path: 'actas', titulo: 'Actas' },
  { path: 'contacto', titulo: 'Contacto' },
  { path: 'solicitud', titulo: 'Solicitud' },
  { path: 'registro', titulo: 'Registro' },
  { path: 'login', titulo: 'Ingresar' },
  { path: 'perfil', titulo: 'Mi Perfil' },
  { path: 'carrito', titulo: 'Carrito' },
]

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="partidos" element={<Partidos />} />
        <Route path="posiciones" element={<Posiciones />} />
        <Route path="noticias" element={<Noticias />} />
        <Route path="jugadores" element={<Jugadores />} />
        {paginasPendientes.map((p) => (
          <Route key={p.path} path={p.path} element={<Pendiente titulo={p.titulo} />} />
        ))}
        <Route element={<RutaAdmin />}>
        <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<Pendiente titulo="404 - Página no encontrada" />} />
      </Route>
    </Routes>
  )
}

export default App