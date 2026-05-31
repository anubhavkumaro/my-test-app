import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
<<<<<<< HEAD
=======
  <BrowserRouter>
>>>>>>> 21ef8c3dbf9ddf31a8dc084bd84311081dbb91e3
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)