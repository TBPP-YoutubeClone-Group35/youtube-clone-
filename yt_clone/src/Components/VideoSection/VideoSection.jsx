import React, { useState, useEffect, useCallback } from "react";
import styles from "./VideosSection.module.css";

const API_KEY = "AIzaSyATQ7ttBqDVH-rrWcH6zttFxvYLgIsAzU4";
const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&key=${API_KEY}`;

const VideoSection = ({ query = "programming" }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVideoId, setCurrentVideoId] = useState(null);

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

  const handleVideoClick = (videoId) => {
    setCurrentVideoId(videoId);
  };

  const handleBackClick = () => {
    setCurrentVideoId(null); 
  };

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
      <div className={styles.videoPlayerWrapper}>
        {currentVideoId && (
          <div className={styles.videoPlayerContainer}>
            <div className={styles.videoPlayerHeader}>
              {/* Cross back button */}
              <button
                className={styles.closeButton}
                onClick={handleBackClick}
              >
                X
              </button>
            </div>
            <div className={styles.videoPlayer}>
              <iframe
                title="YouTube Video Player"
                src={`https://www.youtube.com/embed/${currentVideoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.iframe}
              ></iframe>
            </div>
          </div>
        )}
        <div className={styles.videoGrid}>
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className={styles.videoCard}
              onClick={() => handleVideoClick(video.id.videoId)}
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
    </div>
  );
};

export default VideoSection;