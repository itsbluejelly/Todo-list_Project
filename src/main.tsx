// IMPORTING NECESSARY FILES
    // IMPORTING MODULES
import React from 'react'
import ReactDOM from 'react-dom/client'
    // IMPORTING COMPONENTS
import App from './App.tsx'
    // IMPORTING STYLESHEETS
import './css/index.css'
    // IMPORTING PROVIDERS
import TodoContextProvider from './contexts/TodoContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <TodoContextProvider>
        <App />
    </TodoContextProvider>
  </React.StrictMode>,
)
