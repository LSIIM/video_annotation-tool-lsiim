import '../../global.css'
// import VideoPlayer from '../../components/VideoPlayer'
import Header from '../../components/Header'
import Card from '@/components/Card';
import { useAuth } from '@/hooks/UseAuth';
import { Navigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
// import toast from 'react-hot-toast';

import files from '@/lsiim/files.json';

export default function Home() {

  function handleVisualize() {

  }

  function handleAnnotate() {

  }

  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to='/login' />
  return (
    <div className='flex-col h-screen w-screen overflow-x-hidden'>
      <Header />
      <div className='flex justify-center'>
        <SearchBar onClick={() => console.log('search')} />
      </div>
      <div className="grid grid-cols-2 gap-4 m-10">
        {files.map((file, i) => (
          <div key={i}>
            <Card fileInfo={file} onAnnotate={handleAnnotate} onVisualize={handleVisualize} />
          </div>
        ))}
      </div>
    </div>
  );
}