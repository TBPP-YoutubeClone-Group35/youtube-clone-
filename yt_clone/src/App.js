import React, { useState } from "react"
import Navbar from "./Components/Navbar/Navbar"
import Sidebar from "./Components/Sidebar/Sidebar"
import VideoSection from "./Components/VideoSection/VideoSection"
import Login from "./Components/login-signup/login"
import Signup from "./Components/login-signup/signup"

import "./App.css"

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded)
  }

  return (
    <div className="App">
      <Navbar onMenuClick={toggleSidebar} />
      <div className="container">
        <Sidebar isExpanded={isSidebarExpanded} />
        <main className={`main-content ${isSidebarExpanded ? "sidebar-expanded" : ""}`}>
          <VideoSection />
        </main>
      </div>
    </div>
  )
}

export default App