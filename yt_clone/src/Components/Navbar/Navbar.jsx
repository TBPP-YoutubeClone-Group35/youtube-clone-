import React from "react"
import { Menu, Search, Mic, Plus, Bell } from "lucide-react"
import styles from "./Navbar.module.css"

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.start}>
        <button className={styles.menuButton} onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <a href="/" className={styles.logo}>
          <img
            src="data:image/png;base64,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"
            alt="YouTube"
            className={styles.logoImage}
          />
        </a>
      </div>

      <div className={styles.center}>
        <div className={styles.searchContainer}>
          <form className={styles.searchForm}>
            <div className={styles.searchWrapper}>
              <input type="text" placeholder="Search" className={styles.searchInput} />
            </div>
            <button type="submit" className={styles.searchButton}>
              <Search size={20} />
            </button>
          </form>
          <button className={styles.micButton}>
            <Mic size={20} />
          </button>
        </div>
      </div>

      <div className={styles.end}>
        <button className={styles.iconButton}>
          <Plus size={20} />
        </button>
        <button className={styles.iconButton}>
          <Bell size={20} />
        </button>
        <button className={styles.avatarButton}>
          <div className={styles.avatar}></div>
        </button>
      </div>
    </nav>
  )
}

export default Navbar