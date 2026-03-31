import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ManageProvider } from './Components/AdminPage/ManageProperty.tsx'
import { PropertyProvider } from './Components/AdminPage/AddProperty.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <PropertyProvider>
      <ManageProvider>
         <App />
    </ManageProvider>
    </PropertyProvider>
    
   
    </BrowserRouter>
    
  </StrictMode>,
)
