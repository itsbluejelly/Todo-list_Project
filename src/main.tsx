// IMPORTING NECESSARY FILES
    // IMPORTING MODULES
import React from 'react'
import ReactDOM from 'react-dom/client'
    // IMPORTING COMPONENTS
import App from './App.tsx'
    // IMPORTING STYLESHEETS
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
