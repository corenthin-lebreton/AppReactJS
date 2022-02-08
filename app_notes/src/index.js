import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import Home from './pages/Home'
import CreationNote from './pages/Notes/CreationNote'
import ModificationNote from './pages/Notes/ModificationNote'
import Statistiques from './pages/Statistiques'
import Parametres from './pages/Parametres'
import CreationCategorie from './pages/Categorie/CreationCategorie'
import ModificationCategorie from './pages/Categorie/ModificationCategorie'
import CreationCarnet from './components/Carnet/CreationCarnet'
import PageCarnetNote from './components/Carnet/PageCarnetNote'
import './styles/index.scss'

ReactDOM.render(
  <React.StrictMode>
    <main>
      <Router>
        <header className="mb-5">
          <AppNavbar />
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creation-note/:id" element={<CreationNote />} />
          <Route path="/creation-categorie" element={ <CreationCategorie />} /> 
          <Route path="/statistiques" element={<Statistiques />} />
          <Route path="/parametres" element={<Parametres />} />
          <Route path="/modification-note/:id" element={<ModificationNote />} />
          <Route path="/modification-categorie/:id" element={<ModificationCategorie />} /> 
          <Route path="/creation-carnet" element={<CreationCarnet />} />
          <Route path="page-note/:id" element={<PageCarnetNote />} />
        </Routes>
      </Router>
    </main>
  </React.StrictMode>,
  document.getElementById('root')
)