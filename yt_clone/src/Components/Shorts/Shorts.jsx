import React, { useState, useEffect, useCallback } from "react";
import YouTubePlayer from "../VideoSection/YouTubePlayer"; // Import the YouTubePlayer component
import styles from "./Shorts.module.css";
import { X } from "lucide-react";

const API_KEY = "AIzaSyATQ7ttBqDVH-rrWcH6zttFxvYLgIsAzU4";
const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&videoDuration=short&key=${API_KEY}`;

const Shorts = ({ query = "shorts" }) => {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShortId, setSelectedShortId] = useState(null); // Track selected short ID

  const fetchShorts = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}&q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.items && Array.isArray(data.items)) {
        setShorts(data.items);
      } else {
        setError("Unexpected data structure from API");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchShorts();
  }, [fetchShorts]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (shorts.length === 0) {
    return <div className={styles.noShorts}>No shorts found for "{query}"</div>;
  }

  return (
    <div className={styles.shortsContainer}>
      {selectedShortId && ( // Render YouTubePlayer if a short is selected
        <div className={styles.playerContainer}>
          <YouTubePlayer videoId={selectedShortId} />
          <button
            className={styles.backButton}
            onClick={() => setSelectedShortId(null)} // Deselect short
          >
            <X /> {/* Use X icon */}
          </button>
        </div>
      )}
      <div className={styles.shortsGrid}>
        {shorts.map((short) => (
          <div
            key={short.id.videoId}
            className={styles.shortCard}
            onClick={() => setSelectedShortId(short.id.videoId)} // Set selected short ID on click
          >
            <img
              src={short.snippet.thumbnails.medium.url || "/placeholder.svg"}
              alt={short.snippet.title}
              className={styles.thumbnail}
            />
            <div className={styles.shortInfo}>
              <h3 className={styles.shortTitle}>{short.snippet.title}</h3>
              <p className={styles.channelTitle}>{short.snippet.channelTitle}</p>
              <p className={styles.shortMeta}>
                {new Date(short.snippet.publishTime).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shorts;