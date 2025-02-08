import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Sidebar from "./Components/Sidebar/Sidebar"
import VideoSection from "./Components/VideoSection/VideoSection"
import Login from "./Components/Login/Login"
import Signup from "./Components/Login/Signup"
import "./App.css"

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded)
  }

  const handleLogin = () => {
    // Implement your login logic here
    setIsAuthenticated(true)
  }

  const handleSignup = () => {
    // Implement your signup logic here
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <div className="App">
      {isAuthenticated && <Navbar onMenuClick={toggleSidebar} onLogout={handleLogout} />}
      <div className="container">
        {isAuthenticated && <Sidebar isExpanded={isSidebarExpanded} />}
        <main className={`main-content ${isAuthenticated && isSidebarExpanded ? "sidebar-expanded" : ""}`}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <VideoSection /> : <Navigate to="/login" replace />} />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/" replace /> : <Signup onSignup={handleSignup} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App