import { useState } from "react";

export default function VideoPlayer() {
  const [videoSrc, setVideoSrc] = useState("");

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoSrc(videoURL);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      {videoSrc && (
        <video controls width="600">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}