import React from "react"
import {
  Home,
  Zap,
  PlaySquare,
  User,
  History,
  ListVideo,
  Clock,
  ThumbsUp,
  ChevronRight,
  TrendingUp,
  ShoppingBag,
} from "lucide-react"
import styles from "./Sidebar.module.css"

const Sidebar = ({ isExpanded }) => {
  return (
    <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.section}>
        <a href="/" className={`${styles.menuItem} ${styles.active}`}>
          <Home strokeWidth={1.5} size={24} />
          <span>Home</span>
        </a>
        <a href="/shorts" className={styles.menuItem}>
          <Zap strokeWidth={1.5} size={24} />
          <span>Shorts</span>
        </a>
        <a href="/subscriptions" className={styles.menuItem}>
          <PlaySquare strokeWidth={1.5} size={24} />
          <span>Subscriptions</span>
        </a>
      </div>

      {isExpanded && (
        <>
          <div className={styles.section}>
            <div className={styles.menuHeader}>
              <span>You</span>
              <ChevronRight size={16} />
            </div>
            <a href="/history" className={styles.menuItem}>
              <History strokeWidth={1.5} size={24} />
              <span>History</span>
            </a>
            <a href="/playlists" className={styles.menuItem}>
              <ListVideo strokeWidth={1.5} size={24} />
              <span>Playlists</span>
            </a>
            <a href="/watchlater" className={styles.menuItem}>
              <Clock strokeWidth={1.5} size={24} />
              <span>Watch later</span>
            </a>
            <a href="/liked" className={styles.menuItem}>
              <ThumbsUp strokeWidth={1.5} size={24} />
              <span>Liked videos</span>
            </a>
          </div>

          <div className={styles.section}>
            <div className={styles.menuHeader}>
              <span>Subscriptions</span>
            </div>
            <a href="/channel/scaler" className={styles.menuItem}>
              <div className={styles.channelIcon}>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0moagKSucvrVKQXYZtvV3V4z3dEV8K.png"
                  alt="SCALER"
                />
              </div>
              <span>SCALER</span>
              <span className={styles.dot}>•</span>
            </a>
            <a href="/feed/subscriptions" className={styles.menuItem}>
              <ListVideo strokeWidth={1.5} size={24} />
              <span>All subscriptions</span>
            </a>
          </div>

          <div className={styles.section}>
            <div className={styles.menuHeader}>
              <span>Explore</span>
            </div>
            <a href="/trending" className={styles.menuItem}>
              <TrendingUp strokeWidth={1.5} size={24} />
              <span>Trending</span>
            </a>
            <a href="/shopping" className={styles.menuItem}>
              <ShoppingBag strokeWidth={1.5} size={24} />
              <span>Shopping</span>
            </a>
          </div>
        </>
      )}

      {!isExpanded && (
        <div className={styles.section}>
          <a href="/you" className={styles.menuItem}>
            <User strokeWidth={1.5} size={24} />
            <span>You</span>
          </a>
        </div>
      )}
    </div>
  )
}

export default Sidebar