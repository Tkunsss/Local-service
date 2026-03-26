import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import PostService from './pages/PostService.jsx'
import './index.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Home />
        <Services />
        <ServiceDetail />
        <PostService />
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

export default App
