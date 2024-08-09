import './Home.css'
import { VideoPlayer } from '../components/videoPlayer.tsx'

export default function Home() {

  return (
    <div className="App">
      <h1>Video Player</h1>
      <VideoPlayer />
    </div>
  );
}
