import '../../global.css'
// import VideoPlayer from '../../components/VideoPlayer'
import Header from '../../components/Header'
import Card from '@/components/Card';
import { useAuth } from '@/hooks/UseAuth';
import { Navigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
// import toast from 'react-hot-toast';

import fakeFiles from '@/lsiim/files.json';
import toast from 'react-hot-toast';

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
      {fakeFiles.map((file, i) => (
        <div key={i} className=''>
          <Card title={file.title} annotations={file.annotations} videoUrl={file.videoUrl} onAnnotate={handleAnnotate} onVisualize={handleVisualize} />
        </div>
      ))}
    </div>
  );
}
// { albums?.map((album, i) => (
//   <div key={i}>
//     <div style={{'--bg-fundo': `url(${album.images[0].url})`} as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-[220px] h-[220px] rounded-md hover:scale-[1.15] transition">
//       <div onClick={() => openModal(album.name)} className="flex flex-col h-full justify-between items-center backdrop-brightness-50 shadow-white">
//         <div /> 
//         <h1 className="text-2xl font-semibold text-center text-white line-clamp-2 max-w-full px-3">{album.name}</h1>
//         <div className="flex justify-between items-center w-full mb-2">
//           <div></div>
//           <h1 className="text-2xl font-semibold text-center text-white mr-4">R$ {album.value}</h1>
//         </div>
//       </div>
//     </div>
//     {albumModals[album.name] && (
//       <div><CustomModal isOpen={true} album={album} onClose={() => closeModal(album.name)} /></div>
//     )}
//   </div>
// ))}