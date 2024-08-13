import '../../global.css'
import VideoPlayer from '../../components/VideoPlayer'
import Header from '../../components/Header'

export default function Home() {

  return (
    <div className='flex-col h-screen w-screen'>
      <Header />
      <div className='flex-col'>
        <h1>Video Player</h1>
        <VideoPlayer />
      </div>
    </div>
  );
}
