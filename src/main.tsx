// IMPORTING NECESSARY FILES
    // IMPORTING MODULES
import React from 'react'
import ReactDOM from 'react-dom/client'
    // IMPORTING COMPONENTS
import App from './App.tsx'
    // IMPORTING STYLESHEETS
import './css/index.css'
    // IMPORTING PROVIDERS
import { Provider } from 'react-redux'
    // IMPORTING STORES
import Store from './redux/Store.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <Provider store={Store}>
        <App />
    </Provider>
  </React.StrictMode>,
)
