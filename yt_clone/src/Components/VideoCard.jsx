import React from "react";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
       <div className="thumbnail">
        <img src={video.thumbnail} alt={video.title} className="thumbnail-img" />
        <span className="duration">{video.duration}</span>
       </div>

      <div className="details">
        <img src={video.channelIcon} alt={video.channelName} className="channel-icon" />
        <div className="info">
          <h3 className="video-title">{video.title}</h3>
          <p className="channel-name">{video.channelName}</p>
          <p className="stats">{video.views} views • {video.uploadDate}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
