import React, { useEffect, useRef } from "react";
import styles from "./YouTubePlayer.module.css";

const YouTubePlayer = ({ videoId }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const initializePlayer = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "360",
        width: "640",
        videoId: videoId,
        events: {
          onReady: (event) => {
            console.log("YouTube Player is ready");
          },
          onStateChange: (event) => {
            console.log("Player state changed:", event.data);
          },
          onError: (event) => {
            console.error("Player error:", event.data);
          },
        },
      });
    };

    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.onload = initializePlayer;
      document.body.appendChild(script);
    } else {
      initializePlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId]);

  return <div id="youtube-player"></div>;
};

export default YouTubePlayer;