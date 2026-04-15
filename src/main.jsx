import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// import MouseFollower from './Compoents/mouseFollower.jsx'
createRoot(document.getElementById('root')).render(

  <StrictMode>
 
    <App />
    {/* <MouseFollower /> */}
  
  </StrictMode>
)
