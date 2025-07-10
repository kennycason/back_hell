import React, { useState } from 'react';
import { videos } from '../data/videos';
import './VideoPlayer.css';

const VideoPlayer: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const currentVideo = videos[currentVideoIndex];

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setShowNotes(false);
  };

  const previousVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setShowNotes(false);
  };

  const goToVideo = (index: number) => {
    setCurrentVideoIndex(index);
    setShowNotes(false);
  };

  return (
    <div className="video-player-container">
      <div className="video-main">
        <div className="video-info">
          <h2 className="exercise-title">{currentVideo.title}</h2>
        </div>
        <div className="video-player-aspect">
          <iframe
            src={`https://www.youtube.com/embed/${currentVideo.id}?rel=0&modestbranding=1`}
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="youtube-iframe"
          />
        </div>
        <div className="video-info">
          {showNotes && currentVideo.notes && (
            <div className="video-notes">
              <ul>
                {currentVideo.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="video-controls always-visible">
          <button 
            className="control-btn prev-btn" 
            onClick={previousVideo}
            aria-label="Previous video"
          >
            ← Previous
          </button>
          {currentVideo.notes && (
            <button
              className="notes-toggle-btn"
              onClick={() => setShowNotes((prev) => !prev)}
            >
              {showNotes ? 'Hide Notes' : 'Show Notes'}
            </button>
          )}
          <button 
            className="control-btn next-btn" 
            onClick={nextVideo}
            aria-label="Next video"
          >
            Next →
          </button>
        </div>
      </div>
      <div className="video-playlist">
        <h3>Exercise Playlist</h3>
        <div className="playlist-items">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`playlist-item ${index === currentVideoIndex ? 'active' : ''}`}
              onClick={() => goToVideo(index)}
            >
              <div className="playlist-item-number">{index + 1}</div>
              <div className="playlist-item-content">
                <h4>{video.title}</h4>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer; 