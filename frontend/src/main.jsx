import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </SocketContextProvider>
  </StrictMode>,
)
