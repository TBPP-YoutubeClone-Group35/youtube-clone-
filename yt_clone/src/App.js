import React, { useState } from "react"
import Navbar from "./Components/Navbar/Navbar"
import Sidebar from "./Components/Sidebar/Sidebar" 
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
          {/* Your content will go here */}
        </main>
      </div>
    </div>
  )
}

export default App