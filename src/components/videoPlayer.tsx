import { useState } from "react";

interface Props {
  url: string;
}

export default function VideoPlayer({url}: Props) {

  return (
    <div>
        <video controls width="600">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    </div>
  );
}