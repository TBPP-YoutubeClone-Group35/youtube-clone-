import React, { useState, useEffect, useCallback } from "react";
import YouTubePlayer from "./YouTubePlayer"; // Import the YouTubePlayer component
import styles from "./VideosSection.module.css";
import { ArrowLeft, X } from "lucide-react"; 

const API_KEY = "AIzaSyATQ7ttBqDVH-rrWcH6zttFxvYLgIsAzU4";
const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&key=${API_KEY}`;

const VideoSection = ({ query = "programming" }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null); // Track selected video ID

  const fetchVideos = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}&q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.items && Array.isArray(data.items)) {
        setVideos(data.items);
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
    fetchVideos();
  }, [fetchVideos]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (videos.length === 0) {
    return <div className={styles.noVideos}>No videos found for "{query}"</div>;
  }

  return (
    <div className={styles.videoSection}>
      {selectedVideoId && ( // Render YouTubePlayer if a video is selected
        <div className={styles.playerContainer}>
          <YouTubePlayer videoId={selectedVideoId} />
          <button
            className={styles.backButton}
            onClick={() => setSelectedVideoId(null)} // Deselect video
          >
            <X /> {/* Use X icon */}
          </button>
        </div>
      )}
      <div className={styles.videoGrid}>
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className={styles.videoCard}
            onClick={() => setSelectedVideoId(video.id.videoId)} // Set selected video ID on click
          >
            <img
              src={video.snippet.thumbnails.medium.url || "/placeholder.svg"}
              alt={video.snippet.title}
              className={styles.thumbnail}
            />
            <div className={styles.videoInfo}>
              <h3 className={styles.videoTitle}>{video.snippet.title}</h3>
              <p className={styles.channelTitle}>{video.snippet.channelTitle}</p>
              <p className={styles.videoMeta}>
                {new Date(video.snippet.publishTime).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;