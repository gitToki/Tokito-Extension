import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Top from './components/top/top_ext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Top />
    <App />
  </StrictMode>,
)
