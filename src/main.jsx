import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// /1 .. /5 pick a color/font theme (see index.css); anything else falls back to /1.
const theme = window.location.pathname.match(/^\/([1-5])\/?$/)?.[1] ?? '1'
document.documentElement.dataset.theme = theme

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
