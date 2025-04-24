import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import VideoSection from "./Components/VideoSection/VideoSection";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import Shorts from "./Components/Shorts/Shorts";
import "./App.css";

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [searchQuery, setSearchQuery] = useState(""); // State to track search query

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const handleSearch = (query) => {
    console.log("Search query:", query);
    setSearchQuery(query); // Update the search query state
  };

  return (
    <div className="App">
      {isAuthenticated && (
        <Navbar
          onMenuClick={toggleSidebar}
          onLogout={handleLogout}
          onSearch={handleSearch} // Pass handleSearch to Navbar
        />
      )}
      <div className="container">
        {isAuthenticated && <Sidebar isExpanded={isSidebarExpanded} />}
        <main
          className={`main-content ${
            isAuthenticated && isSidebarExpanded ? "sidebar-expanded" : ""
          }`}
        >
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <VideoSection query={searchQuery} /> // Pass searchQuery to VideoSection
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <Signup onSignup={handleSignup} />
              }
            />
            <Route path="/shorts" element={<Shorts />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;