import React from 'react';
import { Menu, Search, Mic, Plus, Bell } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.start}>
        <button className={styles.menuButton}>
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
              <input 
                type="text" 
                placeholder="Search"
                className={styles.searchInput}
              />
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
  );
};

export default Navbar;