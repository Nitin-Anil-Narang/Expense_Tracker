import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from '../Context/UserAuth.jsx'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter >
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
