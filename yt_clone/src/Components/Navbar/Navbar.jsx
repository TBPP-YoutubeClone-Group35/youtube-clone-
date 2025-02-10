'use client';

import React, { useState } from "react"
import { Menu, Search, Mic, LogOut } from 'lucide-react'
import { Link } from "react-router-dom"
import VoiceSearchModal from './VoiceSearchModal'
import styles from "./Navbar.module.css"

function Navbar({ onMenuClick, onLogout, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false)

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  const handleVoiceResult = (transcript) => {
    setSearchQuery(transcript)
    if (onSearch) {
      onSearch(transcript)
    }
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.start}>
          <button className={styles.menuButton} onClick={onMenuClick}>
            <Menu size={24} />
          </button>
          <Link to="/" className={styles.logo}>
            <img src="/download.png" alt="YouTube" />
          </Link>
        </div>

        <div className={styles.center}>
          <div className={styles.searchContainer}>
            <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <button type="submit" className={styles.searchButton}>
                <Search size={20} />
              </button>
            </form>
            <button
              className={styles.micButton}
              onClick={() => setIsVoiceModalOpen(true)}
            >
              <Mic size={20} />
            </button>
          </div>
        </div>

        <div className={styles.end}>
          <button className={styles.logoutButton} onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <VoiceSearchModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onResult={handleVoiceResult}
      />
    </>
  )
}

export default Navbar